"use client";

import * as React from "react";
import Script from "next/script";
import {
  ChatKit,
  useChatKit,
  type ChatKitControl,
  type UseChatKitOptions,
} from "@openai/chatkit-react";

const ChatKitControlContext = React.createContext<ChatKitControl | null>(null);

export function useChatKitControl(): ChatKitControl {
  const ctx = React.useContext(ChatKitControlContext);
  if (!ctx) {
    throw new Error("useChatKitControl must be used within ChatKitProvider");
  }
  return ctx;
}

/**
 * ChatKit is one web component (`<openai-chatkit>`) that includes transcript + composer.
 * `Chat` / `Composer` here are thin layout wrappers; Composer is a no-op slot.
 */
export function ChatKitProvider({ children }: { children: React.ReactNode }) {
  const domainKey = process.env.NEXT_PUBLIC_CHATKIT_DOMAIN_KEY ?? "";

  const options: UseChatKitOptions = {
    api: {
      url: "/api/chat",
      domainKey,
    },
    header: { enabled: false },
    startScreen: {
      greeting: "Hello. What are you curious about today?",
      prompts: [],
    },
    composer: {
      placeholder: "Type a message…",
    },
    threadItemActions: {
      feedback: false,
    },
  };

  const kit = useChatKit(options);

  return (
    <ChatKitControlContext.Provider value={kit.control}>
      <Script
        src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
        strategy="afterInteractive"
      />
      {children}
    </ChatKitControlContext.Provider>
  );
}

export type ChatProps = Omit<React.ComponentProps<typeof ChatKit>, "control">;

export function Chat(props: ChatProps) {
  const control = useChatKitControl();
  return <ChatKit {...props} control={control} />;
}

export function Composer(_props: { className?: string }) {
  return null;
}
