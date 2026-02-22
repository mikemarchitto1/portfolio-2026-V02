import { Button } from "@/components/ui/button";
import { BrainCircuit } from "@/components/icons/brain-circuit";
import { PanelLeft, Calendar, MessageCircle } from "lucide-react";

export default function HeroHeadline() {
  return (
    <section className="p-4 md:p-8 lg:p-16 bg-violet-50 text-white">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex items-center justify-start gap-3 pb-16">
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
        <h1 className="text-h1 font-light text-black">Hi, I’m Mike</h1>
        <p className="text-h4 font-light max-w-[50%] text-black pt-3">
          I design insightful digital experiences for startups and global
          brands.
        </p>
      </div>
    </section>
  );
}
