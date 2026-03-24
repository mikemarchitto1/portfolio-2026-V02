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
import { MessageCircle } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { ChatKitProvider, Chat } from "./chatkit-provider";

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
    const { theme } = useTheme();
    console.log("🔥 COMPONENT RENDER:", "ChatPanel");
    console.log("MOUNT:", "ChatPanel");
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          id="chat-panel"
          side="right"
          className="chat-sheet flex h-full w-full max-w-full flex-col p-0 sm:w-full sm:max-w-full md:w-full md:max-w-full lg:max-w-md border-0 bg-background color:bg-sidebar-background text-sidebar-foreground"
          closeButtonClassName="absolute top-6 right-6 h-8 w-8 min-h-8 min-w-8 p-0 rounded-md border-0 bg-transparent hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(42%_0.035_165)] text-foreground hover:text-sidebar-accent-foreground !data-[state=open]:bg-transparent transition-colors flex items-center justify-center [&_svg]:text-current [&_svg]:transition-colors hover:[&_svg]:text-sidebar-accent-foreground"
        >
          <SheetTitle className="sr-only">Chat</SheetTitle>
          <SheetHeader className="shrink-0 gap-6 px-6 pt-6 pr-14">
            <h6 className="text-subtitle1 font-medium text-foreground font-sans">
              Chat Assistant
            </h6>
            <p className="sr-only text-body2 text-foreground">
              Hello!
            </p>
          </SheetHeader>
          {/* Full-bleed horizontally so ChatKit iframe aligns with sheet edges; chrome uses 24px (px-6) */}
          <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-hidden">
            {children ?? (
              <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col px-4">
                <ChatKitProvider key={theme}>
                  <div className="flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-hidden">
                    <Chat className="min-h-0 min-w-0 w-full flex-1" />
                  </div>
                </ChatKitProvider>
              </div>
            )}
          </div>
          <SheetFooter className="mt-10 shrink-0 px-6 pb-6">
            <SheetClose asChild>
              <Button variant="outline" className="text-button chat-sheet-close-pill bg-transparent border border-[oklch(92%_0_0)] focus-visible:border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]">
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
