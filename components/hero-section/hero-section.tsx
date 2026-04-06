"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="hero w-full min-w-0 pt-6 pb-6 md:pt-9 md:pb-9 lg:pt-16 lg:pb-0 bg-transparent">
      <div className="content w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-[1328px] mx-auto">

          {/* OUTER BOX */}
          <div className="w-full min-w-0 flex flex-col py-4 md:py-8 lg:py-16 px-0 lg:px-16 bg-transparent">

            {/* INNER GRID: left column 50% so profile card starts at center */}
            <div className="w-full min-w-0 flex flex-col md:flex-row gap-16 items-stretch">
              {/* LEFT — exactly 50% so profile left edge is at center */}
              <div className="w-full md:w-[calc(50%-4rem)] md:min-w-0 shrink-0 text-foreground bg-transparent">
                <h1 className="text-h1 font-light tracking-[0] whitespace-nowrap">
                  Hi, <span className="tracking-[-0.04em]">I'm</span> Mike
                </h1>
                <h4 className="text-h4 max-w-[528px] text-foreground">
                  I design modern digital experiences for startups and global brands.
                </h4>
                <div className="text-body1 space-y-4 mt-7">
                  <p>
                    I’m from Chicago, where I studied graphic design at UIC, a program grounded in Swiss and International design principles. That foundation shaped my early approach to visual storytelling. After moving to Seattle, I transitioned into UX design and spent several years working across corporations, agencies, and startups, learning how research helps create more authentic user experiences. I’m now based in Miami, balancing product design with AI‑driven exploration and time outdoors cycling in the warm coastal environment.
                  </p>
                </div>
              </div>

              {/* RIGHT — shadcn Card wrapping profile image + quote */}
              <div className="w-full md:flex-1 md:min-w-0 flex flex-col h-full gap-0 bg-transparent">
                <Card className="flex flex-col flex-1 gap-0 border-0 bg-transparent p-0 shadow-none">
                  {/* Image area: same min-height and rounding as original */}
                  <div className="w-full flex-1 min-h-0">
                    {/* Native img + one clipping box: Next/Image fill wrappers often ignore rounded clipping */}
                    <div
                      className={cn(
                        "relative isolate w-full min-h-[376px] md:min-h-[440px]",
                        "overflow-hidden rounded-2xl",
                        /* bg-card: contrasts with page bg so rounded letterboxing reads */
                        "bg-card"
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/profile.png"
                        alt="Mike profile"
                        width={1600}
                        height={1200}
                        className={cn(
                          "absolute inset-0 h-full w-full object-cover object-center",
                          "rounded-2xl"
                        )}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                      />
                    </div>
                  </div>
                  <CardContent className="hidden p-0" aria-hidden="true">
                    <blockquote className="profile-quote text-body2 text-foreground font-light text-center m-0 p-0 mb-8">
                      <p className="italic text-foreground [font-size:var(--text-body2)] [line-height:24px]">
                        "A king is a man who turns hope into action."
                      </p>
                      <cite className="not-italic block text-foreground [font-size:var(--text-body2)] [line-height:24px]">
                        — Ralph Waldo Emerson
                      </cite>
                    </blockquote>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
