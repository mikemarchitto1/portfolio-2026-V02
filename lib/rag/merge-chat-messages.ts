type ChatMessage = {
  role?: string;
  content?: unknown;
};

/**
 * Drops prior system messages and prepends the RAG system message.
 */
export function mergeRagSystemIntoMessages(
  messages: unknown[],
  ragSystemContent: string
): unknown[] {
  const rest = messages.filter((m) => {
    const msg = m as ChatMessage;
    return msg?.role !== "system";
  });

  return [{ role: "system", content: ragSystemContent }, ...rest];
}

export function extractLastUserText(messages: unknown[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i] as ChatMessage;
    if (m.role !== "user") continue;
    const c = m.content;
    if (typeof c === "string") return c;
    if (Array.isArray(c)) {
      const parts = c as Array<{ type?: string; text?: string }>;
      return parts
        .map((p) =>
          (p?.type === "text" || p?.type === "input_text") &&
          typeof p.text === "string"
            ? p.text
            : ""
        )
        .join("");
    }
  }
  return "";
}
