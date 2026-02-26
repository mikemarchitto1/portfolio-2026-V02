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
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Chat</SheetTitle>
          <SheetDescription>
            Start a conversation. This panel slides in from the right and overlays the page.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-auto py-4">
          {children ?? (
            <div className="text-muted-foreground text-sm">
              <p>Chat UI goes here.</p>
            </div>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
