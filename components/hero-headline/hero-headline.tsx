import { Button } from "@/components/ui/button";
import { PanelLeft, Calendar, MessageCircle } from "lucide-react";

export default function HeroHeadline() {
  return (
    <section className="w-full m-0 p-[16px] md:p-[32px] lg:p-[64px]">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex items-center justify-start gap-3 mb-16">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border border-border"
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border border-border"
          >
            <Calendar className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full flex items-center gap-2 border border-border"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-body1 font-normal">Let’s Chat</span>
          </Button>
        </div>
        <h1 className="text-h1 font-light mb-6">Hi, I’m Mike</h1>
        <p className="text-h4 font-light max-w-[66.666%]">
          I design insightful digital experiences for startups and global
          brands.
        </p>
      </div>
    </section>
  );
}
