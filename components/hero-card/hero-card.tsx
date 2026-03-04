"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Hero module built with shadcn Card primitives.
 * Mirrors the existing Hero content and layout; placed above the original Hero.
 */
export default function HeroCard() {
  return (
    <section className="w-full max-w-[1328px] mx-auto" aria-label="Hero introduction">
      <div className="w-full max-w-[1328px] mx-auto py-8 md:py-16 lg:py-24 px-4 md:px-8 lg:px-16">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
          {/* Left: text block as shadcn Card */}
          <div className="w-full min-w-0 pb-8 md:pb-16 lg:pb-24 pr-0 md:pr-8 lg:pr-16">
            <Card className="rounded-lg border bg-card text-card-foreground shadow-sm h-full">
              <CardHeader className="space-y-2">
                <CardTitle className="text-h4 md:text-h3 lg:text-h1 font-light text-foreground whitespace-nowrap tracking-normal">
                  Hi, I{"\u2019"}m Mike
                </CardTitle>
                <CardDescription className="text-body1 md:text-h6 lg:text-h5 font-light text-foreground max-w-[528px]">
                  I design digital experiences for startups and global brands.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-body1 text-foreground space-y-4">
                <p>
                  I{"\u2019"}m from Chicago, where I studied graphic design at UIC, a school rooted in Swiss and International design principles. These studies shaped my early work in visual storytelling. After moving to Seattle, I transitioned into UX design, working across corporations, agencies, and startups. Now based in Miami, I balance my work with AI-driven design exploration and time outdoors cycling.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right: profile image + pull quote as shadcn Card */}
          <div className="w-full min-w-0 flex flex-col h-full">
            <Card className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col h-full overflow-hidden">
              <CardContent className="p-0 flex-1 min-h-0">
                <div className="w-full aspect-[4/3] min-h-[280px] relative">
                  <Image
                    src="/images/knight-wide.png"
                    alt="Mike profile"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-center justify-center text-center pt-6 pb-8 px-4 md:px-6 border-t-0">
                <blockquote className="profile-quote text-foreground font-light m-0">
                  <p className="italic text-body2">&ldquo;A king is a man who turns hope into action.&rdquo;</p>
                  <cite className="not-italic block opacity-80 text-body2 mt-1">— Ralph Waldo Emerson</cite>
                </blockquote>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
