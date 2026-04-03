import "server-only";

import { EMBEDDING_MODEL } from "./model-constants";

const OPENAI_EMBEDDINGS_URL = "https://api.openai.com/v1/embeddings";

export { EMBEDDING_MODEL };

/**
 * Creates a single embedding vector for the given text using OpenAI.
 */
export async function createEmbedding(text: string, apiKey: string): Promise<number[]> {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("createEmbedding: empty text");
  }

  const res = await fetch(OPENAI_EMBEDDINGS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: trimmed,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(
      `OpenAI embeddings failed: ${res.status} ${errText.slice(0, 500)}`
    );
  }

  const data = (await res.json()) as {
    data?: Array<{ embedding?: number[] }>;
  };
  const embedding = data.data?.[0]?.embedding;
  if (!embedding?.length) {
    throw new Error("OpenAI embeddings: missing embedding in response");
  }
  return embedding;
}
