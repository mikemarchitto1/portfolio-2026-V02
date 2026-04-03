import { NextRequest, NextResponse } from "next/server";

import { buildRagSystemContent } from "@/lib/rag/build-rag-system-content";
import { getRelevantChunks } from "@/lib/rag/get-relevant-chunks";
import {
  extractLastUserText,
  mergeRagSystemIntoMessages,
} from "@/lib/rag/merge-chat-messages";
import {
  buildOpenAIChatCompletionPayload,
  coerceMessagesArray,
  normalizeMessagesForOpenAI,
  type JsonRecord,
} from "@/lib/openai-chat-request";

export const runtime = "nodejs";

const OPENAI_CHAT_COMPLETIONS = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-4.1-mini";

function jsonError(message: string, status: number, extra?: JsonRecord) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const defaultModel = process.env.MODEL_NAME?.trim() || DEFAULT_MODEL;

  if (!apiKey) {
    return jsonError("Missing OPENAI_API_KEY", 500);
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return jsonError("Expected Content-Type: application/json", 415);
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

  let body = raw as JsonRecord;

  const coerced = coerceMessagesArray(body);
  if (!coerced) {
    if (process.env.NODE_ENV === "development") {
      console.error("[/api/chat] Missing messages; body keys:", Object.keys(body));
    }
    return jsonError("Missing or invalid messages array", 400);
  }

  const messagesNormalized = normalizeMessagesForOpenAI(coerced);
  body = { ...body, messages: messagesNormalized };

  const messages = body.messages as unknown[];

  const model =
    typeof body.model === "string" && body.model.trim() !== ""
      ? body.model
      : defaultModel;

  if (!model) {
    return jsonError(
      "Missing model: set MODEL_NAME or include model in the request body",
      400
    );
  }

  let ragMessages = messages;
  try {
    const lastUser = extractLastUserText(messages);
    if (lastUser) {
      const chunks = await getRelevantChunks(lastUser, { apiKey });
      const systemContent = buildRagSystemContent(chunks);
      ragMessages = mergeRagSystemIntoMessages(messages, systemContent);
    }
  } catch (err) {
    const detail = err instanceof Error ? err.message : "RAG retrieval failed";
    if (process.env.NODE_ENV === "development") {
      console.error("[/api/chat] RAG failed:", detail);
    }
    return jsonError("Retrieval or embedding failed", 502, { detail });
  }

  const upstreamBody = buildOpenAIChatCompletionPayload(
    body,
    ragMessages,
    model,
    true
  );

  let upstream: Response;
  try {
    upstream = await fetch(OPENAI_CHAT_COMPLETIONS, {
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
      console.error("[/api/chat] OpenAI fetch failed:", detail);
    }
    return jsonError("Failed to reach the OpenAI API", 502, { detail });
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
    return jsonError("OpenAI API returned an error", upstream.status, {
      detail: errText.slice(0, 2000) || upstream.statusText,
    });
  }

  if (!upstream.body) {
    return jsonError("Empty response from OpenAI API", 502);
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
