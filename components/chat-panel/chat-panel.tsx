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
import { Input } from "@/components/ui/input";
import { ChatBubble, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import { MessageCircle } from "lucide-react";

console.log("🔥 MODULE LOAD:", "chat-panel");

type ChatPanelProps = {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

let ChatPanel: React.FC<ChatPanelProps>;
try {
  const defaultTrigger = (
    <Button
      variant="outline"
      className="flex items-center gap-2 color:border-transparent color:bg-[oklch(28%_0.055_155)] color:text-white color:hover:bg-[oklch(20%_0.04_155)] color:[&_svg]:text-white"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-button">Let{"\u2019"}s Chat</span>
    </Button>
  );

  ChatPanel = function ChatPanel({ trigger = defaultTrigger, children, open, onOpenChange }: ChatPanelProps) {
    console.log("🔥 COMPONENT RENDER:", "ChatPanel");
    console.log("MOUNT:", "ChatPanel");
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side="right"
          className="chat-sheet flex w-full max-w-full flex-col sm:max-w-md border-0 bg-sidebar dark:bg-sidebar text-black dark:text-white color:text-white"
          closeButtonClassName="color:text-white color:hover:text-[oklch(38%_0.065_155)] color:[&_svg]:text-white color:hover:[&_svg]:text-[oklch(38%_0.065_155)]"
        >
          <SheetTitle className="sr-only">Chat</SheetTitle>
          <SheetHeader className="gap-6">
            <h6 className="text-subtitle1 font-medium text-black dark:text-white color:text-white font-sans">
              Chat Assistant
            </h6>
            <p className="sr-only text-body2 text-black dark:text-white color:text-white">
              Hello!
            </p>
          </SheetHeader>
          <div className="flex-1 overflow-auto px-4 pt-[104px] pb-4 min-w-0">
            {children ?? (
              <div className="text-black dark:text-white color:text-white">
                <ChatBubble
                  variant="received"
                  className="bg-gray-100 dark:bg-muted color:bg-[oklch(22%_0.045_155)] text-black dark:text-white color:text-white border border-[oklch(32%_0_0)] dark:border-[oklch(36%_0_0)] color:border-[oklch(32%_0.05_155)]"
                >
                  <ChatBubbleMessage>Hello. What are you curious about today?</ChatBubbleMessage>
                </ChatBubble>
              </div>
            )}
          </div>
          <div className="shrink-0 px-4 pb-4 min-w-0">
            <Input
              type="text"
              placeholder="Type a message…"
              aria-label="Chat message"
              className="chat-input-unified-field h-12 w-full rounded-md border border-black color:border-[oklch(28%_0.055_155)] bg-white px-4 py-3 text-body2 text-black placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-black focus:ring-offset-0"
            />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" className="chat-sheet-close-pill border-0 bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent text-black dark:text-white color:text-black hover:text-foreground">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  };
} catch (err) {
  console.error("🔥 MODULE ERROR in chat-panel:", err);
  throw err;
}

export { ChatPanel };
