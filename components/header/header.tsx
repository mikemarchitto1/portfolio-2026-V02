"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BrainCircuit } from "@/components/icons/brain-circuit";
import { Calendar, MessageCircle } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { ChatPanel } from "@/components/chat-panel/chat-panel";
import { SchedulingDialog } from "@/components/scheduling-dialog/scheduling-dialog";
/* Light/dark/color button colors come from globals.css */
const navButtonClass =
  "dark:!text-black dark:bg-background dark:border-white dark:hover:bg-white/10 color:border-transparent color:text-white color:[&_svg]:text-white";
const navIconClass = "h-5 w-5 shrink-0";

export default function Header() {
  const { toggle } = useSidebar();
  return (
    <header className="sticky top-0 z-50 w-full min-w-0 bg-transparent text-foreground">
      <div className="min-h-16 w-full min-w-0 max-w-[1328px] mx-auto flex items-center justify-start gap-2 py-4 px-16">
        <div className="flex min-w-0 flex-wrap items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggle}
            className={`${navButtonClass} color:[&_img]:invert`}
            aria-label="Toggle sidebar"
          >
            <img src="/images/panel-left.svg" alt="" className="h-5 w-5" />
          </Button>
          <SchedulingDialog
            trigger={
              <Button
                variant="outline"
                size="icon"
                className={`${navButtonClass} [&_svg]:text-black dark:[&_svg]:text-black`}
                aria-label="Open calendar"
              >
                <Calendar className={navIconClass} />
              </Button>
            }
          />
          <Button
            variant="outline"
            className={`flex items-center gap-2 ${navButtonClass} [&_svg]:text-black dark:[&_svg]:text-black`}
          >
            <BrainCircuit className={navIconClass} />
            <span className="text-button">AI Exploration</span>
          </Button>
          <ChatPanel
            trigger={
              <Button
                variant="outline"
                className={`flex items-center gap-2 ${navButtonClass} [&_svg]:text-black dark:[&_svg]:text-black`}
              >
                <MessageCircle className={navIconClass} />
                <span className="text-button">Let{"\u2019"}s Chat</span>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  );
}
