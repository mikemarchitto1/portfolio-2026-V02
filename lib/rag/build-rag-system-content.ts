import "server-only";

import { PORTFOLIO_ASSISTANT_INSTRUCTIONS } from "./portfolio-system-prompt";
import type { RetrievedChunk } from "./types";

/**
 * Builds the full system message text: assistant rules + retrieved chunks.
 */
export function buildRagSystemContent(chunks: RetrievedChunk[]): string {
  if (!chunks.length) {
    return `${PORTFOLIO_ASSISTANT_INSTRUCTIONS}

## Retrieved context
(No matching passages were found in the knowledge base. Say that you do not have portfolio text for this question.)`;
  }

  const blocks = chunks.map(
    (c) =>
      `### Source: ${c.source} (relevance ${(c.score * 100).toFixed(1)}%)\n${c.text}`
  );

  return `${PORTFOLIO_ASSISTANT_INSTRUCTIONS}

## Retrieved context
${blocks.join("\n\n---\n\n")}`;
}
