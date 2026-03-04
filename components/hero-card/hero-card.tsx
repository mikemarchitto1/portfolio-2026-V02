"use client";

import Image from "next/image";

export default function HeroCard() {
  return (
    <section className="w-full min-w-0 py-12 bg-transparent">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-[1328px] mx-auto">

          {/* OUTER BOX */}
          <div className="w-full min-w-0 flex flex-col p-16 bg-transparent">

            {/* INNER GRID: left column 50% so profile card starts at center */}
            <div className="w-full min-w-0 flex flex-col md:flex-row md:gap-16 items-stretch">
              {/* LEFT — exactly 50% so profile left edge is at center */}
              <div className="w-full md:w-[calc(50%-4rem)] md:min-w-0 shrink-0 text-foreground bg-transparent">
                <h1 className="text-h4 md:text-h3 lg:text-h1 font-light" style={{ letterSpacing: 0 }}>
                  Hi, <span className="tracking-[-0.04em]">I’m</span> Mike
                </h1>
                <h5 className="text-body1 md:text-h6 lg:text-h5 font-light max-w-[528px]">
                  I design digital experiences for startups and global brands.
                </h5>
                <div className="text-body1 space-y-4 mt-7">
                  <p>
                    <span className="tracking-[-0.04em]">I’m</span> from Chicago, where I studied graphic design at UIC, a school rooted in Swiss and International design principles. These studies shaped my early work in visual storytelling. After moving to Seattle, I transitioned into UX design, working across corporations, agencies, and startups. Now based in Miami, I balance my work with AI-driven design exploration and time outdoors cycling.
                  </p>
                </div>
              </div>

              {/* RIGHT — fills remainder so its left edge is at center */}
              <div className="w-full md:flex-1 md:min-w-0 flex flex-col h-full gap-0 bg-transparent">
                <div className="w-full flex-1 min-h-0 rounded-2xl overflow-hidden mb-6">
                  <div className="w-full h-full min-h-[376px] relative rounded-2xl overflow-hidden">
                    <Image
                      src="/images/knight-wide.png"
                      alt="Mike profile"
                      fill
                      className="object-cover object-center"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                <blockquote className="text-foreground font-light text-center mb-8">
                  <p className="italic">“A king is a man who turns hope into action.”</p>
                  <cite className="not-italic block opacity-80">— Ralph Waldo Emerson</cite>
                </blockquote>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
