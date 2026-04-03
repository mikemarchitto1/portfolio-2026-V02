/**
 * Normalize ChatKit / mixed client payloads into OpenAI Chat Completions–safe requests.
 */

export type JsonRecord = Record<string, unknown>;

/** Fields OpenAI Chat Completions accepts; extra ChatKit fields are dropped to avoid 400s. */
const PASSTHROUGH_KEYS = [
  "temperature",
  "top_p",
  "max_tokens",
  "max_completion_tokens",
  "frequency_penalty",
  "presence_penalty",
  "seed",
  "stop",
  "n",
  "logit_bias",
  "user",
  "response_format",
  "tools",
  "tool_choice",
  "parallel_tool_calls",
] as const;

/**
 * Coerce message content parts to OpenAI-compatible `{ type: "text", text }` where needed.
 */
export function normalizeMessagesForOpenAI(messages: unknown): unknown[] {
  if (!Array.isArray(messages)) {
    return [];
  }
  return messages.map((m) => {
    if (!m || typeof m !== "object" || Array.isArray(m)) return m;
    const msg = m as JsonRecord;
    const role = msg.role;
    const content = msg.content;
    if (typeof content === "string") {
      return { role, content };
    }
    if (!Array.isArray(content)) {
      return { role, content: content == null ? "" : String(content) };
    }
    const parts = content.map((p) => {
      if (typeof p === "string") return { type: "text" as const, text: p };
      if (!p || typeof p !== "object") return { type: "text" as const, text: "" };
      const part = p as JsonRecord;
      const t = part.type;
      const text =
        typeof part.text === "string"
          ? part.text
          : typeof part.text === "number"
            ? String(part.text)
            : "";
      if (t === "text" || t === "input_text") {
        return { type: "text" as const, text };
      }
      return { type: "text" as const, text: text || JSON.stringify(part) };
    });
    return { role, content: parts };
  });
}

/**
 * If ChatKit omits `messages`, try common alternate keys.
 */
export function coerceMessagesArray(body: JsonRecord): unknown[] | null {
  const raw = body.messages;
  if (Array.isArray(raw) && raw.length > 0) {
    return raw;
  }
  const input = body.input;
  if (typeof input === "string" && input.trim()) {
    return [{ role: "user", content: input.trim() }];
  }
  const prompt = body.prompt;
  if (typeof prompt === "string" && prompt.trim()) {
    return [{ role: "user", content: prompt.trim() }];
  }
  const query = body.query;
  if (typeof query === "string" && query.trim()) {
    return [{ role: "user", content: query.trim() }];
  }
  return null;
}

export function buildOpenAIChatCompletionPayload(
  incoming: JsonRecord,
  messages: unknown[],
  model: string,
  stream: boolean
): JsonRecord {
  const out: JsonRecord = {
    model,
    messages,
    stream,
  };
  for (const k of PASSTHROUGH_KEYS) {
    if (incoming[k] !== undefined) {
      out[k] = incoming[k];
    }
  }
  return out;
}
