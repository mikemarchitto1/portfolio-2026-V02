import { Button } from "@/components/ui/button";
import { BrainCircuit } from "@/components/icons/brain-circuit";
import { PanelLeft, Calendar, MessageCircle } from "lucide-react";

export default function HeroHeadline() {
  return (
    <section className="m-0 py-[16px] md:py-[32px] lg:py-[64px] text-white">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex items-center justify-start gap-3 mb-16">
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
            <span className="text-body1 font-medium">Let’s Chat</span>
          </Button>
        </div>
        <h1 className="text-h1 font-light mb-1 text-black">Hi, I’m Mike</h1>
        <p className="text-h4 font-light max-w-[50%] text-black">
          I design insightful digital experiences for startups and global
          brands.
        </p>
      </div>
    </section>
  );
}
