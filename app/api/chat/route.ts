import { NextRequest, NextResponse } from "next/server";

import { getPortfolioChatKitServer } from "@/lib/chatkit/get-chatkit-server";
import type { PortfolioChatKitContext } from "@/lib/chatkit/portfolio-chatkit-server";

export const runtime = "nodejs";

const DEFAULT_MODEL = "gpt-4.1-mini";

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const defaultModel = process.env.MODEL_NAME?.trim() || DEFAULT_MODEL;

  if (!apiKey) {
    return jsonError("Missing OPENAI_API_KEY", 500);
  }

  let body: Buffer;
  try {
    body = Buffer.from(await req.arrayBuffer());
  } catch {
    return jsonError("Invalid request body", 400);
  }

  if (!body.length) {
    return jsonError("Empty body", 400);
  }

  const server = getPortfolioChatKitServer();
  const context: PortfolioChatKitContext = {
    apiKey,
    defaultModel,
  };

  let result: Awaited<ReturnType<typeof server.process>>;
  try {
    result = await server.process(body, context);
  } catch (err) {
    const message = err instanceof Error ? err.message : "ChatKit processing failed";
    if (process.env.NODE_ENV === "development") {
      console.error("[/api/chat] server.process failed:", err);
    }
    return jsonError(message, 500);
  }

  if (result.isStreaming) {
    const outHeaders = new Headers();
    outHeaders.set("Content-Type", "text/event-stream; charset=utf-8");
    outHeaders.set("Cache-Control", "no-cache, no-transform");
    outHeaders.set("Connection", "keep-alive");
    return new Response(
      readableStreamFromAsyncIterator(result[Symbol.asyncIterator]()),
      { status: 200, headers: outHeaders }
    );
  }

  return NextResponse.json(result.toJSON());
}

function readableStreamFromAsyncIterator(
  iter: AsyncIterable<string>
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of iter) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (e) {
        controller.error(e);
      }
    },
  });
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST for ChatKit." },
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
