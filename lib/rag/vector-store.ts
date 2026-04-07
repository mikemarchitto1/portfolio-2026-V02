import "server-only";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

import type { VectorStoreFile } from "./types";

const VECTORS_REL = join("knowledge", "vectors.json");

export function getVectorStorePath(): string {
  return join(process.cwd(), VECTORS_REL);
}

export function loadVectorStore(): VectorStoreFile | null {
  const p = getVectorStorePath();
  if (!existsSync(p)) {
    return null;
  }
  try {
    const raw = readFileSync(p, "utf8");
    const parsed = JSON.parse(raw) as VectorStoreFile;
    if (!parsed || !Array.isArray(parsed.records)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
