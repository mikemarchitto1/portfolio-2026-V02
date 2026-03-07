import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="text-foreground w-full">
      {/* 1. SECTION — full bleed */}
      <section className="w-full py-12 bg-transparent">
        {/* 2. GUTTER */}
        <div className="w-full px-4 md:px-8 lg:px-16">
          {/* 3. MAX-WIDTH */}
          <div className="max-w-[1328px] mx-auto">
            {/* 4. CONTENT WRAPPER — 64px padding, visible band */}
            <div className="w-full min-w-0 flex flex-col py-4 md:py-8 lg:py-16 px-0 lg:px-16 bg-transparent">
              {/* Let's Talk band */}
              <div className="w-full bg-transparent py-12 md:py-16">
                <div className="w-full min-w-0 text-left flex flex-col">
                  <div className="w-fit p-0 m-0">
                    <h1 className="text-h1 font-light text-foreground p-0 m-0 tracking-[0]">
                      Let's Talk
                    </h1>
                  </div>
                  <div className="max-w-[528px] p-0 m-0 mt-4">
                    <h5 className="text-h5 max-w-[528px] font-light text-foreground p-0 m-0">
                      <span className="tracking-[-0.04em]">I{"'"}m</span> interested in creative partnerships that grow from meaningful work.
                    </h5>
                  </div>
                </div>
              </div>

              {/* Buttons band */}
              <div className="w-full bg-transparent py-8 md:py-12">
                <div className="w-full flex flex-col sm:flex-row justify-between items-end gap-4">
                  <div className="hidden sm:flex flex-col sm:flex-row flex-wrap gap-4">
                    <Button className="nav-button" variant="outline" size="lg" asChild>
                      <a href="mailto:hello@carlwalker.com">Email Mike</a>
                    </Button>

                    <Button className="nav-button" variant="outline" size="lg" asChild>
                      <a href="/resume.pdf" download>
                        Download Resume
                      </a>
                    </Button>

                    <Button className="nav-button" variant="outline" size="lg" asChild>
                      <a
                        href="https://linkedin.com/in/carlwalker"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Connect on LinkedIn
                      </a>
                    </Button>
                  </div>
                  <img
                    src={
                      theme === "light"
                        ? "/images/crown works-up-b.svg"
                        : "/images/crown works-up-w.svg"
                    }
                    alt="Crown Works"
                    className="hidden h-[76px] w-auto shrink-0 object-contain object-right translate-y-[6px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
