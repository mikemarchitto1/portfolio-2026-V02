/** One embedded segment from a knowledge markdown file. */
export type VectorRecord = {
  id: string;
  /** Relative path e.g. `knowledge/bio.md` */
  source: string;
  text: string;
  embedding: number[];
};

export type VectorStoreFile = {
  embeddingModel: string;
  records: VectorRecord[];
};

export type RetrievedChunk = {
  text: string;
  source: string;
  score: number;
};
