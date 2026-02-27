"use client";

import { Button } from "@/components/ui/button";
import { BrainCircuit } from "@/components/icons/brain-circuit";
import { Calendar, MessageCircle } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { ChatPanel } from "@/components/chat-panel/chat-panel";
import { SchedulingDialog } from "@/components/scheduling-dialog/scheduling-dialog";
const bg = (show: boolean, hex: string) => (show ? `bg-[${hex}]` : "");

export default function HeroHeadline({
  showBackgroundColors = false,
}: {
  showBackgroundColors?: boolean;
}) {
  const { toggle } = useSidebar();
  return (
    <section className={`pt-4 pr-16 pb-16 pl-16 text-foreground w-screen max-w-none ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] ${bg(showBackgroundColors, "#fef9c3")}`}>
      <div className={`w-full max-w-[1200px] mx-auto flex items-center justify-between gap-4 flex-wrap ${showBackgroundColors ? "bg-white" : ""}`}>
          <div className="flex items-center gap-4 flex-wrap">
          <Button
            variant="outline"
            size="icon"
            onClick={toggle}
            className="border border-foreground text-foreground hover:bg-foreground/[0.02] hover:text-foreground [&_svg]:text-foreground dark:border-white dark:text-white dark:hover:bg-white/10 dark:[&_svg]:text-white dark:[&_img]:invert color:border-transparent color:bg-[#1E5280] color:text-white color:hover:bg-[#1E5882] color:hover:text-white color:[&_svg]:text-white color:[&_img]:invert"
            aria-label="Toggle sidebar"
          >
            <img src="/images/panel-left.svg" alt="" className="h-5 w-5" />
          </Button>
          <SchedulingDialog
            trigger={
              <Button
                variant="outline"
                size="icon"
                className="border border-foreground text-foreground hover:bg-foreground/[0.02] hover:text-foreground [&_svg]:text-foreground dark:border-white dark:text-white dark:hover:bg-white/10 dark:[&_svg]:text-white color:border-transparent color:bg-[#1E5280] color:text-white color:hover:bg-[#1E5882] color:hover:text-white color:[&_svg]:text-white"
                aria-label="Open calendar"
              >
                <Calendar className="h-5 w-5" />
              </Button>
            }
          />
          <Button
            variant="outline"
            className="flex items-center gap-2 border border-foreground text-foreground hover:bg-foreground/[0.02] hover:text-foreground [&_svg]:text-foreground dark:border-white dark:text-white dark:hover:bg-white/10 dark:[&_svg]:text-white color:border-transparent color:bg-[#1E5280] color:text-white color:hover:bg-[#1E5882] color:hover:text-white color:[&_svg]:text-white"
          >
            <BrainCircuit className="h-5 w-5 shrink-0" />
            <span className="text-button">AI Exploration</span>
          </Button>
          <ChatPanel
            trigger={
              <Button
                variant="outline"
                className="flex items-center gap-2 border border-foreground text-foreground hover:bg-foreground/[0.02] hover:text-foreground [&_svg]:text-foreground dark:border-white dark:text-white dark:hover:bg-white/10 dark:[&_svg]:text-white color:border-transparent color:bg-[#1E5280] color:text-white color:hover:bg-[#1E5882] color:hover:text-white color:[&_svg]:text-white"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-button">Let&apos;s Chat</span>
              </Button>
            }
          />
          </div>
      </div>
    </section>
  );
}
