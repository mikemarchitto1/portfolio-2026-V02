"use client";

import React from "react";
import { NavButton } from "@/components/ui/nav-button";
import { BrainCircuit } from "@/components/icons/brain-circuit";
import { Calendar, MessageCircle } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { ChatPanel } from "@/components/chat-panel/chat-panel";
import { SchedulingDialog } from "@/components/scheduling-dialog/scheduling-dialog";

console.log("🔥 MODULE LOAD:", "header");

let Header: React.FC;
try {
  const navIconClass = "h-5 w-5 shrink-0";

  Header = function Header() {
    console.log("🔥 COMPONENT RENDER:", "Header");
    console.log("MOUNT:", "Header");
    const { toggle } = useSidebar();
    return (
      <header className="sticky top-0 z-50 w-full min-w-0 bg-[oklch(94%_0.08_250)]/95 dark:bg-[oklch(24%_0.07_250)]/95 text-foreground backdrop-blur-sm">
        <div className="min-h-16 w-full min-w-0 max-w-[1328px] mx-auto flex items-center justify-start gap-2 py-4 px-4 md:px-8 lg:px-16">
          <div className="flex min-w-0 flex-wrap items-center gap-4">
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
  };
} catch (err) {
  console.error("🔥 MODULE ERROR in header:", err);
  throw err;
}

export default Header;
