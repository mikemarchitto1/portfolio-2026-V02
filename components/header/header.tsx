"use client";

import React from "react";
import { NavButton } from "@/components/ui/nav-button";
import { BrainCircuit } from "@/components/icons/brain-circuit";
import { Calendar, MessageCircle } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { ChatPanel } from "@/components/chat-panel/chat-panel";
import { SchedulingDialog } from "@/components/scheduling-dialog/scheduling-dialog";

const navIconClass = "h-5 w-5 shrink-0";

export default function Header() {
  const { toggle } = useSidebar();
  return (
    <header className="sticky top-0 z-50 w-full min-w-0 bg-transparent text-foreground">
      <div className="min-h-16 w-full min-w-0 max-w-[1328px] mx-auto flex items-center justify-start gap-2 py-4 px-16">
        <div className="flex min-w-0 flex-wrap items-center gap-4">
          {/* Panel icon: black SVG, no invert so it stays black on white nav button */}
          <NavButton
            size="icon"
            onClick={toggle}
            aria-label="Toggle sidebar"
          >
            <img src="/images/panel-left.svg" alt="" className="h-5 w-5" />
          </NavButton>
          <SchedulingDialog
            trigger={
              <NavButton size="icon" aria-label="Open calendar">
                <Calendar className={navIconClass} />
              </NavButton>
            }
          />
          <NavButton className="flex items-center gap-2">
            <BrainCircuit className={navIconClass} />
            <span className="text-button">AI Exploration</span>
          </NavButton>
          <ChatPanel
            trigger={
              <NavButton className="flex items-center gap-2">
                <MessageCircle className={navIconClass} />
                <span className="text-button">Let{"\u2019"}s Chat</span>
              </NavButton>
            }
          />
        </div>
      </div>
    </header>
  );
}
