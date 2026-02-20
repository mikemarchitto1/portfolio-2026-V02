"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PanelLeft, Calendar, MessageCircle } from "lucide-react";

interface HeaderProps {
  onOpenLeftSidebar?: () => void;
  onOpenCalendar?: () => void;
  onOpenChat?: () => void;
}

export default function Header({
  onOpenLeftSidebar,
  onOpenCalendar,
  onOpenChat,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="h-16 flex items-center justify-start gap-2 px-4 md:px-16 max-w-[1200px] mx-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenLeftSidebar}
          aria-label="Open sidebar"
        >
          <PanelLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenCalendar}
          aria-label="Open calendar"
        >
          <Calendar className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onOpenChat}
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
