import { Button } from "@/components/ui/button";
import { BrainCircuit } from "@/components/icons/brain-circuit";
import { PanelLeft, Calendar, MessageCircle } from "lucide-react";

const bg = (show: boolean, hex: string) => (show ? `bg-[${hex}]` : "");

export default function HeroHeadline({
  showBackgroundColors = false,
}: {
  showBackgroundColors?: boolean;
}) {
  return (
    <section className={`p-16 text-foreground w-screen max-w-none ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] ${bg(showBackgroundColors, "#fef9c3")}`}>
      <div className="w-full max-w-[1200px] mx-auto">
        <div className={`flex items-center justify-start gap-4 flex-wrap ${showBackgroundColors ? "bg-white" : ""}`}>
          <Button
            variant="outline"
            size="icon"
            className="border border-foreground text-foreground hover:bg-foreground/[0.02] hover:text-foreground [&_svg]:text-foreground"
          >
            <PanelLeft className="h-5 w-5" />
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
      </div>
    </section>
  );
}
