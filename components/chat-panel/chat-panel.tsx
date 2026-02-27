"use client";

import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
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
    className="flex items-center gap-2 border border-black text-black hover:bg-black/[0.02] hover:text-black [&_svg]:text-black"
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
        className="chat-sheet flex w-full flex-col sm:max-w-md border-0 text-black dark:text-white color:text-white"
        closeButtonClassName="color:text-white color:hover:text-[#1E5882] color:[&_svg]:text-white color:hover:[&_svg]:text-[#1E5882]"
      >
        <SheetHeader>
          <SheetTitle className="text-black dark:text-white color:text-white">Hello!</SheetTitle>
          <SheetDescription className="text-black dark:text-white color:text-white">
            Whenever you're ready, go ahead and start the conversation. I'm here and excited to chat with you.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-auto px-4 py-4">
          {children ?? (
            <div className="text-black dark:text-white color:text-white">
              <ChatBubble
                variant="received"
                className="bg-gray-200 dark:bg-muted color:bg-[#0E1A3A]/80 text-black dark:text-white color:text-white border border-gray-300 dark:border-gray-700 color:border-white/20"
              >
                <ChatBubbleMessage>What would you like to explore today?</ChatBubbleMessage>
              </ChatBubble>
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="border-black dark:border-white color:border-white color:bg-[#08122E] color:hover:bg-[#0E1A3A] text-black dark:text-white color:text-white color:hover:text-white hover:bg-foreground/[0.02] hover:text-foreground">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
