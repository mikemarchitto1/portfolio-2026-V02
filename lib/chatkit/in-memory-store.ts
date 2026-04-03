import "server-only";

import {
  NotFoundError,
  Store,
  type Attachment,
  type Page,
  type ThreadItem,
  type ThreadMetadata,
} from "chatkit-node-backend-sdk";

type ActiveThread = ThreadMetadata & { id: string };

/**
 * In-memory ChatKit store for the thread/message protocol.
 * Swap for a persistent Store in multi-instance production deployments.
 */
export class InMemoryChatKitStore extends Store<unknown> {
  private readonly threads = new Map<string, ActiveThread>();
  private readonly items = new Map<string, ThreadItem[]>();
  private readonly attachments = new Map<string, Attachment>();

  async loadThread(threadId: string, context: unknown): Promise<ThreadMetadata> {
    void context;
    const t = this.threads.get(threadId);
    if (!t) throw new NotFoundError(`Thread not found: ${threadId}`);
    return { ...t };
  }

  async saveThread(thread: ThreadMetadata, context: unknown): Promise<void> {
    void context;
    this.threads.set(thread.id, {
      ...thread,
      id: thread.id,
    } as ActiveThread);
  }

  async deleteThread(threadId: string, context: unknown): Promise<void> {
    void context;
    this.threads.delete(threadId);
    this.items.delete(threadId);
  }

  async loadThreads(
    limit: number,
    after: string | null,
    order: "asc" | "desc",
    context: unknown
  ): Promise<Page<ThreadMetadata>> {
    void context;
    let list = [...this.threads.values()].sort((a, b) =>
      a.created_at.localeCompare(b.created_at)
    );
    if (order === "desc") {
      list = list.reverse();
    }
    let start = 0;
    if (after) {
      const i = list.findIndex((t) => t.id === after);
      start = i === -1 ? 0 : i + 1;
    }
    const data = list.slice(start, start + limit);
    return {
      data,
      has_more: start + limit < list.length,
      after: data.length ? data[data.length - 1]!.id : null,
    };
  }

  async loadThreadItems(
    threadId: string,
    after: string | null,
    limit: number,
    order: "asc" | "desc",
    context: unknown
  ): Promise<Page<ThreadItem>> {
    void context;
    if (!this.threads.has(threadId)) {
      throw new NotFoundError(`Thread not found: ${threadId}`);
    }
    const raw = this.items.get(threadId) ?? [];
    let ordered = [...raw].sort((a, b) =>
      a.created_at.localeCompare(b.created_at)
    );
    if (order === "desc") {
      ordered = ordered.reverse();
    }
    let start = 0;
    if (after) {
      const i = ordered.findIndex((it) => it.id === after);
      start = i === -1 ? 0 : i + 1;
    }
    const data = ordered.slice(start, start + limit);
    return {
      data,
      has_more: start + limit < ordered.length,
      after: data.length ? data[data.length - 1]!.id : null,
    };
  }

  async addThreadItem(threadId: string, item: ThreadItem, context: unknown): Promise<void> {
    void context;
    if (!this.threads.has(threadId)) {
      throw new NotFoundError(`Thread not found: ${threadId}`);
    }
    const list = this.items.get(threadId) ?? [];
    list.push(item);
    this.items.set(threadId, list);
  }

  async saveItem(threadId: string, item: ThreadItem, context: unknown): Promise<void> {
    void context;
    if (!this.threads.has(threadId)) {
      throw new NotFoundError(`Thread not found: ${threadId}`);
    }
    const list = this.items.get(threadId) ?? [];
    const idx = list.findIndex((i) => i.id === item.id);
    if (idx === -1) {
      list.push(item);
    } else {
      list[idx] = item;
    }
    this.items.set(threadId, list);
  }

  async loadItem(threadId: string, itemId: string, context: unknown): Promise<ThreadItem> {
    void context;
    const list = this.items.get(threadId) ?? [];
    const item = list.find((i) => i.id === itemId);
    if (!item) throw new NotFoundError(`Item not found: ${itemId}`);
    return item;
  }

  async deleteThreadItem(threadId: string, itemId: string, context: unknown): Promise<void> {
    void context;
    const list = this.items.get(threadId);
    if (!list) return;
    this.items.set(
      threadId,
      list.filter((i) => i.id !== itemId)
    );
  }

  async saveAttachment(attachment: Attachment, context: unknown): Promise<void> {
    void context;
    this.attachments.set(attachment.id, attachment);
  }

  async loadAttachment(attachmentId: string, context: unknown): Promise<Attachment> {
    void context;
    const a = this.attachments.get(attachmentId);
    if (!a) throw new NotFoundError(`Attachment not found: ${attachmentId}`);
    return a;
  }

  async deleteAttachment(attachmentId: string, context: unknown): Promise<void> {
    void context;
    this.attachments.delete(attachmentId);
  }
}
