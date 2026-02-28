"use client";

import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChatBubble, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import { MessageCircle } from "lucide-react";

type ChatPanelProps = {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
};

const defaultTrigger = (
  <Button
    variant="outline"
    className="flex items-center gap-2 color:border-transparent color:bg-[#1e3d2e] color:text-white color:hover:bg-[#1a3528] color:[&_svg]:text-white"
  >
    <MessageCircle className="h-5 w-5" />
    <span className="text-button">Let&apos;s Chat</span>
  </Button>
);

export function ChatPanel({ trigger = defaultTrigger, children }: ChatPanelProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="chat-sheet flex w-full flex-col sm:max-w-md border-0 bg-sidebar dark:bg-sidebar text-black dark:text-white color:text-white"
        closeButtonClassName="color:text-white color:hover:text-[#2d5a45] color:[&_svg]:text-white color:hover:[&_svg]:text-[#2d5a45]"
      >
        <SheetTitle className="sr-only">Chat</SheetTitle>
        <SheetHeader>
          <p className="text-body2 text-black dark:text-white color:text-white">
            Hello!
            <br />
            <br />
            Whenever you&apos;re ready, go ahead and start the conversation.
          </p>
        </SheetHeader>
        <div className="flex-1 overflow-auto px-4 py-4">
          {children ?? (
            <div className="text-black dark:text-white color:text-white">
              <ChatBubble
                variant="received"
                className="bg-gray-100 dark:bg-muted color:bg-[#153020]/90 text-black dark:text-white color:text-white border border-gray-300 dark:border-neutral-600 color:border-[#1e3d2e]"
              >
                <ChatBubbleMessage>What would you like to explore today?</ChatBubbleMessage>
              </ChatBubble>
            </div>
          )}
        </div>
        <div className="shrink-0 px-4 pb-4">
          <input
            type="text"
            placeholder="Type a message…"
            aria-label="Chat message"
            className="chat-input-unified-field w-full rounded-md border border-black bg-white px-4 py-3 text-body2 text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-black focus:ring-offset-0"
          />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="border-black dark:border-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent color:border-[#1e3d2e] color:bg-[#0f261c] color:hover:bg-[#1a3d2e] text-black dark:text-white color:text-white color:hover:text-white hover:text-foreground">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
