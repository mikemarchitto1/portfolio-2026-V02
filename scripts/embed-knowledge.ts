/**
 * Reads markdown under `knowledge/`, chunks (~500 tokens), embeds with OpenAI,
 * writes `knowledge/vectors.json`. Requires OPENAI_API_KEY.
 *
 * Usage: npm run knowledge:embed
 */

import { config as loadEnv } from "dotenv";
import { resolve } from "node:path";
loadEnv({ path: resolve(process.cwd(), ".env.local") });
loadEnv({ path: resolve(process.cwd(), ".env") });

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import OpenAI from "openai";

import type { VectorRecord } from "../lib/rag/types";
import { EMBEDDING_MODEL } from "../lib/rag/model-constants";

const root = process.cwd();
const knowledgeDir = join(root, "knowledge");

/** ~500 tokens at ~4 chars/token */
const MAX_CHUNK_CHARS = 2000;

function collectMarkdownFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === "vectors.json") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      out.push(...collectMarkdownFiles(p));
    } else if (name.endsWith(".md")) {
      out.push(p);
    }
  }
  return out;
}

function chunkMarkdown(
  text: string,
  sourceRel: string
): { id: string; source: string; text: string }[] {
  const paragraphs = text.split(/\n\n+/);
  const chunks: { id: string; source: string; text: string }[] = [];
  let buf = "";
  let idx = 0;

  const flush = () => {
    const t = buf.trim();
    if (t) {
      chunks.push({
        id: `${sourceRel.replace(/[^a-zA-Z0-9]+/g, "-")}-${idx++}`,
        source: sourceRel,
        text: t,
      });
      buf = "";
    }
  };

  for (const p of paragraphs) {
    const next = buf ? `${buf}\n\n${p}` : p;
    if (next.length > MAX_CHUNK_CHARS && buf) {
      flush();
    }
    if (p.length > MAX_CHUNK_CHARS) {
      for (let i = 0; i < p.length; i += MAX_CHUNK_CHARS) {
        chunks.push({
          id: `${sourceRel.replace(/[^a-zA-Z0-9]+/g, "-")}-${idx++}`,
          source: sourceRel,
          text: p.slice(i, i + MAX_CHUNK_CHARS),
        });
      }
      continue;
    }
    buf = buf ? `${buf}\n\n${p}` : p;
  }
  flush();
  return chunks;
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    console.error("Set OPENAI_API_KEY to run embedding.");
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey });
  const mdFiles = collectMarkdownFiles(knowledgeDir);
  if (mdFiles.length === 0) {
    console.error("No .md files found under knowledge/");
    process.exit(1);
  }

  const allChunks: { id: string; source: string; text: string }[] = [];
  for (const abs of mdFiles) {
    const rel = relative(root, abs).replace(/\\/g, "/");
    const text = readFileSync(abs, "utf8");
    allChunks.push(...chunkMarkdown(text, rel));
  }

  const records: VectorRecord[] = [];
  const batchSize = 64;
  for (let i = 0; i < allChunks.length; i += batchSize) {
    const batch = allChunks.slice(i, i + batchSize);
    const res = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: batch.map((c) => c.text),
    });
    const sorted = [...res.data].sort((a, b) => a.index - b.index);
    for (let j = 0; j < batch.length; j++) {
      const emb = sorted[j]?.embedding;
      if (!emb) {
        throw new Error(`Missing embedding for chunk ${batch[j].id}`);
      }
      records.push({
        id: batch[j].id,
        source: batch[j].source,
        text: batch[j].text,
        embedding: emb,
      });
    }
  }

  const outPath = join(knowledgeDir, "vectors.json");
  writeFileSync(
    outPath,
    JSON.stringify(
      {
        embeddingModel: EMBEDDING_MODEL,
        records,
      },
      null,
      0
    )
  );
  console.log(`Wrote ${records.length} chunks to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
