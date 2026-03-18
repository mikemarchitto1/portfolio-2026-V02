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
    <Button variant="outline" className="text-button flex items-center gap-2">
      <MessageCircle className="h-5 w-5" />
      <span className="text-button">Chat</span>
    </Button>
  );

  ChatPanel = function ChatPanel({ trigger = defaultTrigger, children, open, onOpenChange }: ChatPanelProps) {
    console.log("🔥 COMPONENT RENDER:", "ChatPanel");
    console.log("MOUNT:", "ChatPanel");
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          id="chat-panel"
          side="right"
          className="chat-sheet flex w-full max-w-full flex-col sm:w-full sm:max-w-full md:w-full md:max-w-full lg:max-w-md border-0 bg-sidebar text-sidebar-foreground p-4"
          closeButtonClassName="h-8 w-8 min-h-8 min-w-8 p-0 rounded-md border-0 bg-transparent hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(42%_0.035_165)] text-foreground hover:text-sidebar-accent-foreground !data-[state=open]:bg-transparent transition-colors flex items-center justify-center [&_svg]:text-current [&_svg]:transition-colors hover:[&_svg]:text-sidebar-accent-foreground"
        >
          <SheetTitle className="sr-only">Chat</SheetTitle>
          <SheetHeader className="gap-6">
            <h6 className="text-subtitle1 font-medium text-foreground font-sans">
              Chat Assistant
            </h6>
            <p className="sr-only text-body2 text-foreground">
              Hello!
            </p>
          </SheetHeader>
          <div className="flex-1 overflow-auto pt-[88px] min-w-0">
            {children ?? (
              <div className="text-foreground">
                <ChatBubble
                  variant="received"
                  className="border border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(44%_0.035_165)]"
                >
                  <ChatBubbleMessage>Hello. What are you curious about today?</ChatBubbleMessage>
                </ChatBubble>
              </div>
            )}
          </div>
          <div className="shrink-0 min-w-0">
            <Input
              type="text"
              placeholder="Type a message…"
              aria-label="Chat message"
              className="chat-input-unified-field h-12 w-full rounded-md border border-[oklch(92%_0_0)] color:border-[oklch(44%_0.035_165)] bg-[oklch(94%_0_0)] color:bg-[oklch(30%_0.035_165)] dark:bg-[oklch(26%_0.01_264)] dark:border-[oklch(30%_0.01_264)] dark:text-white dark:placeholder:text-[oklch(70%_0.01_264)] px-4 py-3 text-body2 text-foreground placeholder:text-muted-foreground color:text-[oklch(66%_0.035_165)] color:placeholder:text-[oklch(66%_0.035_165)] outline-none shadow-[0_0_0_1px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(92%_0_0)] color:focus-visible:ring-[oklch(44%_0.035_165)] dark:focus-visible:ring-[oklch(30%_0.01_264)] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <SheetFooter className="mt-10">
            <SheetClose asChild>
              <Button variant="outline" className="text-button chat-sheet-close-pill bg-transparent border border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]">
                Close
              </Button>
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
