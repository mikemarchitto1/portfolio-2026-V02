import "server-only";

import type { VectorStoreFile } from "./types";
import vectorsJson from "@/knowledge/vectors.json";

export function loadVectorStore(): VectorStoreFile | null {
  const parsed = vectorsJson as VectorStoreFile;
  if (!parsed || !Array.isArray(parsed.records)) {
    return null;
  }
  return parsed;
}
