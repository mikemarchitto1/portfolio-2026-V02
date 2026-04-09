"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { SchedulingDialog } from "@/components/scheduling-dialog/scheduling-dialog";
import { ChatTrigger } from "@/components/chat-panel/chat-panel";

export default function Footer() {
  const { resolvedTheme } = useTheme();

  return (
    <footer className="text-foreground w-full">
      {/* 1. SECTION — full bleed */}
      <section className="w-full pt-2 pb-6 md:py-9 lg:pt-0 lg:pb-12 bg-transparent">
        {/* 2. GUTTER */}
        <div className="w-full px-4 md:px-8 lg:px-16">
          {/* 3. MAX-WIDTH */}
          <div className="max-w-[1328px] mx-auto">
            {/* 4. CONTENT WRAPPER — 64px padding, visible band */}
            <div className="w-full min-w-0 flex flex-col py-4 md:py-8 lg:py-16 px-0 lg:px-16 bg-transparent">
              {/* Let's Connect band */}
              <div className="w-full bg-transparent pt-6 pb-2 md:pt-10 md:pb-6 lg:pt-0 lg:pb-12">
                <div className="w-full min-w-0 text-left flex flex-col">
                  <div className="w-fit p-0 m-0">
                    <h1 className="text-h1 font-light text-foreground p-0 m-0 tracking-[0]">
                      Let's Connect
                    </h1>
                  </div>
                  <div className="max-w-[576px] p-0 m-0 mt-4">
                    <h4 className="text-h4 max-w-[576px] text-foreground p-0 m-0">
                      <span className="tracking-[-0.04em]">I{"'"}m</span> interested in creative partnerships that grow from meaningful work.
                    </h4>
                  </div>
                </div>
              </div>

              {/* Buttons band */}
              <div className="w-full bg-transparent pt-0 pb-4 md:pt-4 md:pb-8 lg:pt-8 lg:pb-12">
                <div className="w-full flex flex-col sm:flex-row justify-between items-end gap-4">
                  <div className="hidden lg:flex flex-col sm:flex-row flex-wrap gap-4">
                    <Button className="nav-button bg-transparent border border-[oklch(92%_0_0)] focus-visible:border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]" variant="outline" size="lg" asChild>
                      <a href="mailto:mikemarchitto@gmail.com" className="text-button">Email</a>
                    </Button>

                    <Button className="nav-button bg-transparent border border-[oklch(92%_0_0)] focus-visible:border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]" variant="outline" size="lg" asChild>
                      <a
                        href="/images/mikemarchitto_cv.pdf"
                        download="mikemarchitto_cv.pdf"
                        className="text-button"
                      >
                        Resume
                      </a>
                    </Button>

                    <Button className="nav-button bg-transparent border border-[oklch(92%_0_0)] focus-visible:border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]" variant="outline" size="lg" asChild>
                      <a
                        href="https://www.linkedin.com/in/mikemarchitto/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-button"
                      >
                        LinkedIn
                      </a>
                    </Button>

                    <SchedulingDialog
                      trigger={
                        <Button
                          className="nav-button bg-transparent border border-[oklch(92%_0_0)] focus-visible:border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]"
                          variant="outline"
                          size="lg"
                        >
                          <span className="text-button">Schedule</span>
                        </Button>
                      }
                    />
                    <ChatTrigger>
                      <Button
                        className="nav-button bg-transparent border border-[oklch(92%_0_0)] focus-visible:border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]"
                        variant="outline"
                        size="lg"
                        aria-label="Open chat"
                      >
                        <span className="text-button">Chat</span>
                      </Button>
                    </ChatTrigger>
                  </div>
                  <img
                    suppressHydrationWarning
                    src={
                      resolvedTheme === "light"
                        ? "/images/crown-black.svg"
                        : "/images/crown-white.svg"
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
