import "server-only";

import { InMemoryChatKitStore } from "@/lib/chatkit/in-memory-store";
import { PortfolioChatKitServer } from "@/lib/chatkit/portfolio-chatkit-server";

let server: PortfolioChatKitServer | null = null;

/** Process-local singleton; use a persistent Store for multi-instance deployments. */
export function getPortfolioChatKitServer(): PortfolioChatKitServer {
  if (!server) {
    server = new PortfolioChatKitServer(new InMemoryChatKitStore());
  }
  return server;
}
