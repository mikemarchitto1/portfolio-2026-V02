import "server-only";

import type { VectorStoreFile } from "./types";
import vectorsJson from "@/knowledge/vectors.json";

export function loadVectorStore(): VectorStoreFile | null {
  const parsed = vectorsJson as VectorStoreFile;
  // #region agent log
  fetch('http://127.0.0.1:7561/ingest/7444ee45-a2ad-4c62-b96b-1da1dcfaad47',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f12903'},body:JSON.stringify({sessionId:'f12903',runId:'pre-fix',hypothesisId:'H1',location:'lib/rag/vector-store.ts:7',message:'loadVectorStore invoked',data:{hasParsed:Boolean(parsed),recordsCount:Array.isArray(parsed?.records)?parsed.records.length:-1},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  if (!parsed || !Array.isArray(parsed.records)) {
    return null;
  }
  return parsed;
}
