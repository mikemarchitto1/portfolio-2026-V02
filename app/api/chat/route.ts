import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const DEEPSEEK_CHAT_COMPLETIONS = "https://api.deepseek.com/v1/chat/completions";

type JsonRecord = Record<string, unknown>;

function jsonError(message: string, status: number, extra?: JsonRecord) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const defaultModel = process.env.MODEL_NAME;

  if (!apiKey?.trim()) {
    return jsonError("Missing DEEPSEEK_API_KEY", 500);
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return jsonError("Expected a JSON object body", 400);
  }

  const body = raw as JsonRecord;

  if (!Array.isArray(body.messages)) {
    return jsonError("Missing or invalid messages array", 400);
  }

  const model =
    typeof body.model === "string" && body.model.trim() !== ""
      ? body.model
      : defaultModel?.trim() || "";

  if (!model) {
    return jsonError(
      "Missing model: set MODEL_NAME or include model in the request body",
      400
    );
  }

  const upstreamBody: JsonRecord = {
    ...body,
    model,
    stream: true,
  };

  let upstream: Response;
  try {
    upstream = await fetch(DEEPSEEK_CHAT_COMPLETIONS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(upstreamBody),
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Network error";
    if (process.env.NODE_ENV === "development") {
      console.error("[/api/chat] DeepSeek fetch failed:", detail);
    }
    return jsonError("Failed to reach the language model API", 502, { detail });
  }

  const ct = upstream.headers.get("content-type") ?? "";

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => "");
    let parsed: unknown;
    try {
      parsed = errText ? JSON.parse(errText) : null;
    } catch {
      parsed = null;
    }
    if (parsed && typeof parsed === "object") {
      return NextResponse.json(parsed, { status: upstream.status });
    }
    return jsonError("Language model API returned an error", upstream.status, {
      detail: errText.slice(0, 2000) || upstream.statusText,
    });
  }

  if (!upstream.body) {
    return jsonError("Empty response from language model API", 502);
  }

  const outHeaders = new Headers();
  outHeaders.set(
    "Content-Type",
    ct.includes("text/event-stream") ? ct : "text/event-stream; charset=utf-8"
  );
  outHeaders.set("Cache-Control", "no-cache, no-transform");
  outHeaders.set("Connection", "keep-alive");
  const xRequestId = upstream.headers.get("x-request-id");
  if (xRequestId) outHeaders.set("x-request-id", xRequestId);

  return new Response(upstream.body, {
    status: upstream.status,
    headers: outHeaders,
  });
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST for chat completions." },
    { status: 405, headers: { Allow: "POST, OPTIONS" } }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}
