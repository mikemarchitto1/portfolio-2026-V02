import React from "react";
import { NavButton } from "@/components/ui/nav-button";
import { useTheme } from "@/hooks/use-theme";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="text-foreground w-full">
      <div className="w-full max-w-[1328px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="w-full min-w-0 py-0 text-left flex flex-col">
          <div className="w-fit p-0 m-0">
            <h1
              className="text-h1 font-light text-foreground p-0 m-0"
              style={{ letterSpacing: 0 }}
            >
              Let’s Talk
            </h1>
          </div>
          <div className="max-w-[528px] p-0 m-0">
            <h5 className="text-h5 max-w-[528px] font-light text-foreground p-0 m-0">
              I{"’"}m interested in creative partnerships that grow from meaningful work.
            </h5>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="max-w-[1328px] mx-auto p-4 md:p-8 lg:p-16 flex flex-col sm:flex-row justify-between items-end gap-4">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <NavButton size="lg" asChild>
              <a href="mailto:hello@carlwalker.com">Email Mike</a>
            </NavButton>

            <NavButton size="lg" asChild>
              <a href="/resume.pdf" download>
                Download Resume
              </a>
            </NavButton>

            <NavButton size="lg" asChild>
              <a
                href="https://linkedin.com/in/carlwalker"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </a>
            </NavButton>
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
    </footer>
  );
}
