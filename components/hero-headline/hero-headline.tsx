"use client";

import { Button } from "@/components/ui/button";
import { BrainCircuit } from "@/components/icons/brain-circuit";
import { Calendar, MessageCircle } from "lucide-react";
import { useSidebar } from "@/contexts/sidebar-context";

const bg = (show: boolean, hex: string) => (show ? `bg-[${hex}]` : "");

export default function HeroHeadline({
  showBackgroundColors = false,
}: {
  showBackgroundColors?: boolean;
}) {
  const { toggle } = useSidebar();
  return (
    <section className={`pt-4 pr-16 pb-16 pl-16 text-foreground w-screen max-w-none ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] ${bg(showBackgroundColors, "#fef9c3")}`}>
      <div className={`w-full max-w-[1200px] mx-auto flex items-center justify-start gap-4 flex-wrap ${showBackgroundColors ? "bg-white" : ""}`}>
          <Button
            variant="outline"
            size="icon"
            onClick={toggle}
            className="border border-foreground text-foreground hover:bg-foreground/[0.02] hover:text-foreground [&_svg]:text-foreground"
            aria-label="Toggle sidebar"
          >
            <img src="/images/panel-left.svg" alt="" className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border border-foreground text-foreground hover:bg-foreground/[0.02] hover:text-foreground [&_svg]:text-foreground"
          >
            <Calendar className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border border-black text-black hover:bg-black/[0.02] hover:text-black [&_svg]:text-black"
          >
            <BrainCircuit className="h-5 w-5 shrink-0" />
            <span className="text-button">AI Exploration</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border border-black text-black hover:bg-black/[0.02] hover:text-black [&_svg]:text-black"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-button">Let's Chat</span>
          </Button>
      </div>
    </section>
  );
}
