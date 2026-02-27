"use client";

import React from "react";
import Image from "next/image";
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
    <header className="sticky top-0 z-40 border-b border-foreground/20 bg-transparent text-foreground">
      <div className="min-h-16 flex items-center justify-start gap-2 p-4 md:p-8 lg:p-16 max-w-[1200px] mx-auto">
          <Image
            src="/images/logo_mmpd.svg"
            alt="MMPD"
            width={32}
            height={32}
            className="h-8 w-auto shrink-0"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenLeftSidebar}
            aria-label="Open sidebar"
            className="rounded-full text-button text-foreground hover:bg-foreground/[0.02] hover:text-foreground [&_svg]:text-foreground color:text-[#1E5280] color:[&_svg]:text-[#1E5280] color:hover:bg-[#1E5280]/20 color:hover:text-[#1E5280]"
          >
            <PanelLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenCalendar}
            aria-label="Open calendar"
            className="rounded-full text-button text-foreground hover:bg-foreground/[0.02] hover:text-foreground [&_svg]:text-foreground color:text-[#1E5280] color:[&_svg]:text-[#1E5280] color:hover:bg-[#1E5280]/20 color:hover:text-[#1E5280]"
          >
            <Calendar className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenChat}
            aria-label="Open chat"
            className="rounded-full text-button text-foreground hover:bg-foreground/[0.02] hover:text-foreground [&_svg]:text-foreground color:text-[#1E5280] color:[&_svg]:text-[#1E5280] color:hover:bg-[#1E5280]/20 color:hover:text-[#1E5280]"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
      </div>
    </header>
  );
}
