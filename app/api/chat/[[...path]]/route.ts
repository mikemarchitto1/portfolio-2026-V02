import { NextRequest, NextResponse } from "next/server";
import { debugEnvFileStatus, readServerEnv } from "@/lib/server-env-local";

export const runtime = "nodejs";

/**
 * Model-agnostic LLM proxy for ChatKit (`api.url`) and OpenAI-compatible clients.
 *
 * Env:
 * - DEEPSEEK_API_KEY — primary Bearer token (DeepSeek)
 * - LLM_API_KEY — optional override for other OpenAI-compatible providers
 * - MODEL_NAME — merged into JSON when body has `messages` but no `model`
 * - LLM_CHAT_COMPLETIONS_URL — full default upstream URL (default: DeepSeek chat completions)
 * - LLM_BASE_URL — optional origin only; used when `/api/chat/...` has extra path segments
 */
const DEFAULT_DEEPSEEK_CHAT_COMPLETIONS =
  "https://api.deepseek.com/v1/chat/completions";

/** Uses `process.env` then `.env.local` on disk (Turbopack dev fallback). */
function getDefaultChatCompletionsUrl(): string {
  return (
    readServerEnv("LLM_CHAT_COMPLETIONS_URL") || DEFAULT_DEEPSEEK_CHAT_COMPLETIONS
  );
}

function getApiKey(): string | null {
  const key = readServerEnv("DEEPSEEK_API_KEY") || readServerEnv("LLM_API_KEY");
  // #region agent log
  fetch("http://127.0.0.1:7559/ingest/7444ee45-a2ad-4c62-b96b-1da1dcfaad47", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "bf37aa",
    },
    body: JSON.stringify({
      sessionId: "bf37aa",
      location: "route.ts:getApiKey",
      message: "getApiKey result",
      data: { keyLen: key?.length ?? 0 },
      timestamp: Date.now(),
      hypothesisId: "H1-H4",
      runId: "post-fix",
    }),
  }).catch(() => {});
  // #endregion
  return key || null;
}

function parseOrigin(urlString: string): string | null {
  try {
    const u = new URL(urlString);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.origin;
  } catch {
    return null;
  }
}

function buildTargetUrl(req: NextRequest, pathSegments: string[] | undefined): URL | null {
  const segs = pathSegments?.filter(Boolean) ?? [];
  const defaultCompletions = getDefaultChatCompletionsUrl();

  let target: URL;
  if (segs.length === 0) {
    try {
      target = new URL(defaultCompletions);
    } catch {
      return null;
    }
  } else {
    let origin: string | null = null;
    const baseEnv = readServerEnv("LLM_BASE_URL");
    if (baseEnv) {
      try {
        origin = new URL(baseEnv.replace(/\/+$/, "")).origin;
      } catch {
        return null;
      }
    } else {
      origin = parseOrigin(defaultCompletions);
    }
    if (!origin) return null;
    target = new URL(segs.join("/"), `${origin}/`);
  }

  target.search = new URL(req.url).search;
  return target;
}

function forwardableResponseHeaders(upstream: Headers): Headers {
  const out = new Headers();
  for (const name of [
    "content-type",
    "cache-control",
    "x-request-id",
    "openai-version",
    "openai-processing-ms",
  ]) {
    const v = upstream.get(name);
    if (v) out.set(name, v);
  }
  return out;
}

async function prepareBody(
  req: NextRequest,
  method: string,
  buf: ArrayBuffer
): Promise<ArrayBuffer | undefined> {
  if (method === "GET" || method === "HEAD") return undefined;
  if (buf.byteLength === 0) return undefined;

  const ct = req.headers.get("content-type") ?? "";
  if (!ct.includes("application/json")) return buf;

  try {
    const text = new TextDecoder().decode(buf);
    const data = JSON.parse(text) as Record<string, unknown>;
    const modelName = readServerEnv("MODEL_NAME");
    if (
      data &&
      typeof data === "object" &&
      Array.isArray(data.messages) &&
      (data.model === undefined || data.model === null || data.model === "") &&
      modelName
    ) {
      data.model = modelName;
    }
    return new TextEncoder().encode(JSON.stringify(data)).buffer;
  } catch {
    return buf;
  }
}

async function proxy(req: NextRequest, pathSegments: string[] | undefined): Promise<Response> {
  const apiKey = getApiKey();
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[/api/chat] Set DEEPSEEK_API_KEY (or LLM_API_KEY) in .env.local — see .env.example"
      );
      console.error("[/api/chat] env file debug:", debugEnvFileStatus());
    }
    return NextResponse.json(
      {
        error: "Missing DEEPSEEK_API_KEY (set LLM_API_KEY for other providers)",
        ...(process.env.NODE_ENV === "development"
          ? {
              devHint:
                "Server reads env files from disk only. If the key is only in an unsaved editor buffer, save `.env.local` and restart `next dev`.",
              envDebug: debugEnvFileStatus(),
            }
          : {}),
      },
      { status: 500 }
    );
  }

  const target = buildTargetUrl(req, pathSegments);
  if (!target) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[/api/chat] Invalid LLM_CHAT_COMPLETIONS_URL or LLM_BASE_URL — check .env.local"
      );
    }
    return NextResponse.json(
      { error: "Invalid LLM_CHAT_COMPLETIONS_URL or LLM_BASE_URL" },
      { status: 500 }
    );
  }

  const method = req.method.toUpperCase();
  const rawBody =
    method === "GET" || method === "HEAD" ? undefined : await req.arrayBuffer();
  const body = rawBody ? await prepareBody(req, method, rawBody) : undefined;

  const headers = new Headers();
  for (const h of ["accept", "content-type", "accept-language"]) {
    const v = req.headers.get(h);
    if (v) headers.set(h, v);
  }
  headers.set("authorization", `Bearer ${apiKey}`);

  let upstream: Response;
  try {
    upstream = await fetch(target.toString(), {
      method,
      headers,
      body:
        method === "GET" || method === "HEAD" || body === undefined
          ? undefined
          : body,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upstream fetch failed";
    if (process.env.NODE_ENV === "development") {
      console.error("[/api/chat] Fetch to LLM failed:", message);
    }
    return NextResponse.json(
      { error: "Upstream LLM request failed", detail: message },
      { status: 502 }
    );
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: forwardableResponseHeaders(upstream.headers),
  });
}

type RouteCtx = { params: Promise<{ path?: string[] }> };

export async function GET(req: NextRequest, ctx: RouteCtx) {
  const { path } = await ctx.params;
  return proxy(req, path);
}

export async function POST(req: NextRequest, ctx: RouteCtx) {
  const { path } = await ctx.params;
  return proxy(req, path);
}

export async function PUT(req: NextRequest, ctx: RouteCtx) {
  const { path } = await ctx.params;
  return proxy(req, path);
}

export async function PATCH(req: NextRequest, ctx: RouteCtx) {
  const { path } = await ctx.params;
  return proxy(req, path);
}

export async function DELETE(req: NextRequest, ctx: RouteCtx) {
  const { path } = await ctx.params;
  return proxy(req, path);
}

export async function OPTIONS(req: NextRequest, ctx: RouteCtx) {
  const { path } = await ctx.params;
  return proxy(req, path);
}
