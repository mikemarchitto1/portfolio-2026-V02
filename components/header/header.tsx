"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "@/components/icons/brain-circuit";
import { Calendar, MessageCircle } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { ChatPanel } from "@/components/chat-panel/chat-panel";
import { SchedulingDialog } from "@/components/scheduling-dialog/scheduling-dialog";

const navButtonClass =
  "bg-background border border-foreground text-foreground hover:bg-foreground/[0.06] hover:text-foreground [&_svg]:text-foreground dark:bg-background dark:border-white dark:text-white dark:hover:bg-white/10 dark:[&_svg]:text-white color:border-transparent color:bg-[#1e3d2e] color:text-white color:hover:bg-[#1a3528] color:hover:text-white color:[&_svg]:text-white";

export default function Header() {
  const { toggle } = useSidebar();
  return (
    <header className="sticky top-0 z-50 bg-transparent text-foreground">
      <div className="min-h-16 flex items-center justify-start gap-2 py-4 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-4 flex-wrap">
          <Button
            variant="outline"
            size="icon"
            onClick={toggle}
            className={`${navButtonClass} dark:[&_img]:invert color:[&_img]:invert`}
            aria-label="Toggle sidebar"
          >
            <img src="/images/panel-left.svg" alt="" className="h-5 w-5" />
          </Button>
          <SchedulingDialog
            trigger={
              <Button
                variant="outline"
                size="icon"
                className={navButtonClass}
                aria-label="Open calendar"
              >
                <Calendar className="h-5 w-5" />
              </Button>
            }
          />
          <Button
            variant="outline"
            className={`flex items-center gap-2 ${navButtonClass}`}
          >
            <BrainCircuit className="h-5 w-5 shrink-0" />
            <span className="text-button">AI Exploration</span>
          </Button>
          <ChatPanel
            trigger={
              <Button
                variant="outline"
                className={`flex items-center gap-2 ${navButtonClass}`}
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-button">Let{"\u2019"}s Chat</span>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  );
}
