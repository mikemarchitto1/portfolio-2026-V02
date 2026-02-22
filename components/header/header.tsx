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
    <header className="sticky top-0 z-40 border-b border-black/20 !bg-violet-50 text-black [&_*]:text-black [&_*]:hover:text-black">
      <div className="min-h-16 flex items-center justify-start gap-2 p-4 md:p-8 lg:p-16 max-w-[1200px] mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenLeftSidebar}
            aria-label="Open sidebar"
            className="text-black hover:bg-black/10 hover:text-black [&_svg]:text-black"
          >
            <PanelLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenCalendar}
            aria-label="Open calendar"
            className="text-black hover:bg-black/10 hover:text-black [&_svg]:text-black"
          >
            <Calendar className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenChat}
            aria-label="Open chat"
            className="text-black hover:bg-black/10 hover:text-black [&_svg]:text-black"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
      </div>
    </header>
  );
}
