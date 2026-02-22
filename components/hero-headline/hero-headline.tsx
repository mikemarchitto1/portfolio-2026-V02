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
    <section className={`p-16 text-black ${bg(showBackgroundColors, "#fef9c3")}`}>
      <div className="w-full max-w-[1200px] mx-auto">
        <div className={`flex items-center justify-start gap-4 flex-wrap ${showBackgroundColors ? "bg-white" : ""}`}>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border border-black text-black hover:bg-black/10 hover:text-black"
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border border-black text-black hover:bg-black/10 hover:text-black"
          >
            <Calendar className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full flex items-center gap-2 border border-black text-black hover:bg-black/10 hover:text-black"
          >
            <BrainCircuit className="h-5 w-5 shrink-0" />
            <span className="text-body1 font-medium">AI Exploration</span>
          </Button>
          <Button
            variant="outline"
            className="rounded-full flex items-center gap-2 border border-black text-black hover:bg-black/10 hover:text-black"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-body1 font-medium">Let's Chat</span>
          </Button>
        </div>
        <div className="mt-16">
          <div className={bg(showBackgroundColors, "#f9e2f9")}>
            <h1 className="text-h1 font-light">Hi, I'm Mike</h1>
          </div>
          <div className={bg(showBackgroundColors, "#e0f2f7")}>
            <h4 className="text-h4 font-light text-foreground max-w-[720px]">I design meaningful digital experiences for startups and global brands.</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
