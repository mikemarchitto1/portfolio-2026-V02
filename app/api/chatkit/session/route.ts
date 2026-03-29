import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const OPENAI_CHATKIT_SESSIONS = "https://api.openai.com/v1/chatkit/sessions";

type SessionBody = {
  user?: string;
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const workflowId = process.env.WORKFLOW_ID?.trim();

  if (!apiKey) {
    return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
  }
  if (!workflowId) {
    return NextResponse.json({ error: "Missing WORKFLOW_ID" }, { status: 500 });
  }

  let parsed: SessionBody = {};
  try {
    const raw = await req.json();
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      parsed = raw as SessionBody;
    }
  } catch {
    parsed = {};
  }

  const user =
    typeof parsed.user === "string" && parsed.user.trim() !== ""
      ? parsed.user.trim()
      : `anon-${crypto.randomUUID()}`;

  let upstream: Response;
  try {
    upstream = await fetch(OPENAI_CHATKIT_SESSIONS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Beta": "chatkit_beta=v1",
      },
      body: JSON.stringify({
        user,
        workflow: { id: workflowId },
        // API allows max 600 seconds (10 min); larger values return 400 (often with empty `{}` body).
        expires_after: { anchor: "created_at", seconds: 600 },
      }),
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Network error";
    if (process.env.NODE_ENV === "development") {
      console.error("[/api/chatkit/session] OpenAI fetch failed:", detail);
    }
    return NextResponse.json(
      { error: "Failed to reach OpenAI", detail },
      { status: 502 }
    );
  }

  const text = await upstream.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!upstream.ok) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "[/api/chatkit/session] OpenAI error:",
        upstream.status,
        text || "(empty body)"
      );
    }
    const payload =
      data && typeof data === "object" && !Array.isArray(data)
        ? (data as Record<string, unknown>)
        : {};
    const extracted =
      typeof payload.error === "string"
        ? payload.error
        : payload.error &&
            typeof payload.error === "object" &&
            payload.error !== null &&
            "message" in payload.error
          ? String((payload.error as { message?: unknown }).message)
          : null;
    return NextResponse.json(
      {
        ...payload,
        error: extracted ?? (text?.trim() || `OpenAI returned ${upstream.status}`),
      },
      { status: upstream.status }
    );
  }

  if (
    !data ||
    typeof data !== "object" ||
    typeof (data as { client_secret?: unknown }).client_secret !== "string"
  ) {
    return NextResponse.json(
      { error: "Invalid session response from OpenAI" },
      { status: 502 }
    );
  }

  return NextResponse.json({
    client_secret: (data as { client_secret: string }).client_secret,
  });
}
