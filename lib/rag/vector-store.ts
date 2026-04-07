import "server-only";

import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { VectorStoreFile } from "./types";

export function loadVectorStore(): VectorStoreFile | null {
  const candidates = [
    join(process.cwd(), "knowledge", "vectors.json"),
    resolve(__dirname, "../../knowledge/vectors.json"),
    resolve(__dirname, "../../../knowledge/vectors.json"),
  ];

  for (const p of candidates) {
    if (!existsSync(p)) continue;
    try {
      const parsed = JSON.parse(readFileSync(p, "utf8")) as VectorStoreFile;
      if (parsed && Array.isArray(parsed.records)) {
        return parsed;
      }
    } catch {
      // try next candidate
    }
  }

  return null;
}
