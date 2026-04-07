import "server-only";

import {
  ChatKitServer,
  CustomStreamError,
  type AssistantMessageContent,
  type Store,
  type ThreadItem,
  type ThreadMetadata,
  type ThreadStreamEvent,
  type UserMessageItem,
} from "chatkit-node-backend-sdk";

import { buildRagSystemContent } from "@/lib/rag/build-rag-system-content";
import { getRelevantChunks } from "@/lib/rag/get-relevant-chunks";
import {
  extractLastUserText,
  mergeRagSystemIntoMessages,
} from "@/lib/rag/merge-chat-messages";
import {
  buildOpenAIChatCompletionPayload,
  normalizeMessagesForOpenAI,
} from "@/lib/openai-chat-request";

const OPENAI_CHAT_COMPLETIONS =
  "https://api.openai.com/v1/chat/completions";

export type PortfolioChatKitContext = {
  apiKey: string;
  defaultModel: string;
};

function threadItemsToOpenAIMessages(items: ThreadItem[]): unknown[] {
  const out: unknown[] = [];
  for (const item of items) {
    if (item.type === "user_message") {
      const text = item.content
        .filter((c) => c.type === "input_text")
        .map((c) => c.text)
        .join("\n");
      out.push({ role: "user", content: text });
    } else if (item.type === "assistant_message") {
      const text = item.content
        .filter((c) => c.type === "output_text")
        .map((c) => c.text)
        .join("\n");
      out.push({ role: "assistant", content: text });
    }
  }
  return out;
}

async function* streamChatCompletionDeltas(
  body: ReadableStream<Uint8Array> | null
): AsyncGenerator<string, void, unknown> {
  if (!body) return;
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data: ")) continue;
        const data = trimmed.slice(6);
        if (data === "[DONE]") return;
        try {
          const json = JSON.parse(data) as {
            choices?: Array<{ delta?: { content?: string | null } }>;
          };
          const delta = json.choices?.[0]?.delta?.content;
          if (typeof delta === "string" && delta.length > 0) {
            yield delta;
          }
        } catch {
          /* ignore malformed SSE frames */
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export class PortfolioChatKitServer extends ChatKitServer<PortfolioChatKitContext> {
  constructor(store: Store<PortfolioChatKitContext>) {
    super(store);
  }

  async *respond(
    thread: ThreadMetadata,
    inputUserMessage: UserMessageItem | null,
    context: PortfolioChatKitContext
  ): AsyncGenerator<ThreadStreamEvent> {
    if (!inputUserMessage) {
      return;
    }

    const page = await this.store.loadThreadItems(
      thread.id,
      null,
      1000,
      "asc",
      context
    );
    const baseMessages = threadItemsToOpenAIMessages(page.data);

    let ragMessages = baseMessages;
    try {
      const lastUser = extractLastUserText(baseMessages);
      console.log("[RAG_DEBUG] extracted_last_user", {
        runId: "pre-fix",
        baseMessagesCount: baseMessages.length,
        lastUserLength: lastUser.length,
      });
      // #region agent log
      fetch('http://127.0.0.1:7561/ingest/7444ee45-a2ad-4c62-b96b-1da1dcfaad47',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f12903'},body:JSON.stringify({sessionId:'f12903',runId:'pre-fix',hypothesisId:'H3',location:'lib/chatkit/portfolio-chatkit-server.ts:117',message:'chatkit extracted last user text',data:{baseMessagesCount:baseMessages.length,lastUserLength:lastUser.length},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      if (lastUser) {
        const chunks = await getRelevantChunks(lastUser, {
          apiKey: context.apiKey,
        });
        console.log("[RAG_DEBUG] retrieval_completed", {
          runId: "pre-fix",
          chunksCount: chunks.length,
          firstChunkSource: chunks[0]?.source ?? null,
        });
        // #region agent log
        fetch('http://127.0.0.1:7561/ingest/7444ee45-a2ad-4c62-b96b-1da1dcfaad47',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f12903'},body:JSON.stringify({sessionId:'f12903',runId:'pre-fix',hypothesisId:'H4',location:'lib/chatkit/portfolio-chatkit-server.ts:123',message:'chatkit retrieval completed',data:{chunksCount:chunks.length,firstChunkSource:chunks[0]?.source??null},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        const systemContent = buildRagSystemContent(chunks);
        ragMessages = mergeRagSystemIntoMessages(baseMessages, systemContent);
      }
    } catch (err) {
      const detail = err instanceof Error ? err.message : "RAG failed";
      console.error("[RAG_DEBUG] rag_exception", {
        runId: "pre-fix",
        detail,
      });
      // #region agent log
      fetch('http://127.0.0.1:7561/ingest/7444ee45-a2ad-4c62-b96b-1da1dcfaad47',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f12903'},body:JSON.stringify({sessionId:'f12903',runId:'pre-fix',hypothesisId:'H5',location:'lib/chatkit/portfolio-chatkit-server.ts:130',message:'chatkit rag exception',data:{detail},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      throw new CustomStreamError(
        `Retrieval or embedding failed: ${detail}`,
        false
      );
    }

    const normalized = normalizeMessagesForOpenAI(ragMessages);
    const inference = inputUserMessage.inference_options ?? {};
    const model =
      (typeof inference.model === "string" && inference.model.trim() !== ""
        ? inference.model
        : null) ?? context.defaultModel;

    const upstreamBody = buildOpenAIChatCompletionPayload(
      {},
      normalized,
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
          Authorization: `Bearer ${context.apiKey}`,
        },
        body: JSON.stringify(upstreamBody),
      });
    } catch (err) {
      const detail = err instanceof Error ? err.message : "Network error";
      throw new CustomStreamError(
        `Failed to reach the OpenAI API: ${detail}`,
        true
      );
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      throw new CustomStreamError(
        `OpenAI API error (${upstream.status}): ${errText.slice(0, 1500)}`,
        true
      );
    }

    if (!thread.title) {
      const titleText = inputUserMessage.content
        .filter((c): c is { type: "input_text"; text: string } => c.type === "input_text")
        .map((c) => c.text)
        .join(" ")
        .trim();
      if (titleText) {
        thread.title =
          titleText.length > 50 ? `${titleText.slice(0, 50)}…` : titleText;
      }
    }

    const assistantId = this.store.generateItemId("message", thread, context);
    const createdAt = new Date().toISOString();

    yield {
      type: "thread.item.added",
      item: {
        type: "assistant_message",
        id: assistantId,
        thread_id: thread.id,
        created_at: createdAt,
        content: [],
      },
    };

    const emptyContent: AssistantMessageContent = {
      type: "output_text",
      text: "",
      annotations: [],
    };

    yield {
      type: "thread.item.updated",
      item_id: assistantId,
      update: {
        type: "assistant_message.content_part.added",
        content_index: 0,
        content: emptyContent,
      },
    };

    let accumulated = "";
    for await (const delta of streamChatCompletionDeltas(upstream.body)) {
      accumulated += delta;
      yield {
        type: "thread.item.updated",
        item_id: assistantId,
        update: {
          type: "assistant_message.content_part.text_delta",
          content_index: 0,
          delta,
        },
      };
    }

    const finalContent: AssistantMessageContent = {
      type: "output_text",
      text: accumulated,
      annotations: [],
    };

    yield {
      type: "thread.item.updated",
      item_id: assistantId,
      update: {
        type: "assistant_message.content_part.done",
        content_index: 0,
        content: finalContent,
      },
    };

    yield {
      type: "thread.item.done",
      item: {
        type: "assistant_message",
        id: assistantId,
        thread_id: thread.id,
        created_at: createdAt,
        content: [finalContent],
      },
    };
  }
}
