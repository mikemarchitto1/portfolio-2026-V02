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
  console.log("[RAG_DEBUG] getRelevantChunks_enter", {
    runId: "pre-fix",
    queryLength: q.length,
    topK,
    hasApiKey: Boolean(apiKey),
  });
  // #region agent log
  fetch('http://127.0.0.1:7561/ingest/7444ee45-a2ad-4c62-b96b-1da1dcfaad47',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f12903'},body:JSON.stringify({sessionId:'f12903',runId:'pre-fix',hypothesisId:'H2',location:'lib/rag/get-relevant-chunks.ts:28',message:'getRelevantChunks entered',data:{queryLength:q.length,topK,hasApiKey:Boolean(apiKey)},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  if (!q) {
    return [];
  }

  const store = loadVectorStore();
  console.log("[RAG_DEBUG] vector_store_loaded", {
    runId: "pre-fix",
    hasStore: Boolean(store),
    recordsCount: store?.records?.length ?? 0,
  });
  // #region agent log
  fetch('http://127.0.0.1:7561/ingest/7444ee45-a2ad-4c62-b96b-1da1dcfaad47',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f12903'},body:JSON.stringify({sessionId:'f12903',runId:'pre-fix',hypothesisId:'H1',location:'lib/rag/get-relevant-chunks.ts:35',message:'vector store loaded in retrieval',data:{hasStore:Boolean(store),recordsCount:store?.records?.length??0},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
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
  const top = scored.slice(0, topK);
  console.log("[RAG_DEBUG] retrieval_scored", {
    runId: "pre-fix",
    scoredCount: scored.length,
    topCount: top.length,
    topFirstSource: top[0]?.source ?? null,
    topFirstScore: top[0]?.score ?? null,
  });
  // #region agent log
  fetch('http://127.0.0.1:7561/ingest/7444ee45-a2ad-4c62-b96b-1da1dcfaad47',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f12903'},body:JSON.stringify({sessionId:'f12903',runId:'pre-fix',hypothesisId:'H4',location:'lib/rag/get-relevant-chunks.ts:52',message:'retrieval scored results',data:{scoredCount:scored.length,topCount:top.length,topFirstSource:top[0]?.source??null,topFirstScore:top[0]?.score??null},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  return top;
}
