import "server-only";
import vectors from "@/knowledge/vectors.json";
import type { VectorStoreFile } from "./types";

/**
 * Production-safe vector store loader.
 * Next.js bundles `vectors.json` automatically when imported.
 */
export function loadVectorStore(): VectorStoreFile | null {
  if (!vectors || !Array.isArray(vectors.records)) {
    return null;
  }
  return vectors;
}
