import "server-only";

import { createEmbedding } from "./embeddings";
import { loadVectorStore } from "./vector-store";
import { cosineSimilarity } from "./similarity";
import type { RetrievedChunk } from "./types";

const DEFAULT_TOP_K = 5;

/**
 * Returns the top K most relevant knowledge chunks for the user query.
 * Uses embeddings in `knowledge/vectors.json` (run `npm run knowledge:embed` to build).
 */
export async function getRelevantChunks(
  query: string,
  options?: { topK?: number; apiKey?: string }
): Promise<RetrievedChunk[]> {
  const topK = options?.topK ?? DEFAULT_TOP_K;
  const apiKey =
    options?.apiKey?.trim() ||
    process.env.OPENAI_API_KEY?.trim() ||
    "";

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required for retrieval embeddings");
  }

  const q = query.trim();
  if (!q) {
    return [];
  }

  const store = loadVectorStore();
  if (!store?.records?.length) {
    return [];
  }

  const queryEmbedding = await createEmbedding(q, apiKey);

  const scored = store.records
    .filter((r) => r.embedding?.length && r.text?.trim())
    .map((r) => ({
      text: r.text,
      source: r.source,
      score: cosineSimilarity(queryEmbedding, r.embedding),
    }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}
