"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Calendar, Download, Linkedin, Mail, MessageCircle, Menu, Moon, Palette, Sun } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/use-theme";
import { SIDEBAR_PROJECTS } from "@/lib/projects";
import { ChatPanel } from "@/components/chat-panel/chat-panel";
import { SchedulingDialog } from "@/components/scheduling-dialog/scheduling-dialog";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

console.log("🔥 MODULE LOAD:", "header");

const navIconClass = "h-5 w-5 shrink-0";

const themeButtonClass =
  "sidebar-icon-btn flex w-auto items-center justify-center gap-2 h-auto min-w-0 min-h-0 p-0 rounded-none border-0 bg-transparent hover:bg-transparent dark:hover:bg-transparent [&_svg]:size-5 [&_svg]:text-black dark:[&_svg]:text-white dark:hover:[&_svg]:text-white color:[&_svg]:!text-white color:[&_svg]:stroke-white color:hover:[&_svg]:text-[oklch(38%_0.065_155)] color:hover:text-[#2d5a45]";

function MobileMenuCrown() {
  const { theme } = useTheme();
  const crownSrc =
    theme === "light" ? "/images/crown-black.svg" : "/images/crown-white.svg";
  return (
    <div className="mb-6">
      <img
        src={crownSrc}
        alt=""
        className="h-10 w-auto shrink-0"
        width={40}
        height={40}
      />
    </div>
  );
}

function MobileMenuThemeSwitcher() {
  const { setTheme } = useTheme();
  return (
    <nav
      className="mobile-menu-theme-nav flex flex-row gap-6 shrink-0 w-full mb-8"
      aria-label="Theme and preferences"
    >
      <Button
        variant="ghost"
        size="icon"
        className={themeButtonClass}
        aria-label="Light mode"
        onClick={() => setTheme("light")}
      >
        <Sun className="size-5 shrink-0" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={themeButtonClass}
        aria-label="Dark mode"
        onClick={() => setTheme("dark")}
      >
        <Moon className="size-5 shrink-0" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={themeButtonClass}
        aria-label="Color mode"
        onClick={() => setTheme("color")}
      >
        <Palette className="size-5 shrink-0" />
      </Button>
    </nav>
  );
}

function NavItems({
  onItemClick,
  hideSidebarToggle,
  hideAIExploration,
  hideIcons,
  scheduleOpen,
  setScheduleOpen,
  chatOpen,
  setChatOpen,
}: {
  onItemClick?: () => void;
  hideSidebarToggle?: boolean;
  hideAIExploration?: boolean;
  hideIcons?: boolean;
  scheduleOpen?: boolean;
  setScheduleOpen?: (open: boolean) => void;
  chatOpen?: boolean;
  setChatOpen?: (open: boolean) => void;
}) {
  const { toggle } = useSidebar();
  return (
    <>
      {!hideSidebarToggle && (
        <Button
          className="nav-button"
          variant="outline"
          size="icon"
          onClick={() => {
            toggle();
            onItemClick?.();
          }}
          aria-label="Toggle sidebar"
        >
          <img src="/images/panel-left.svg" alt="" className="h-5 w-5" />
        </Button>
      )}
      {!hideAIExploration && (
        <Button className="nav-button flex items-center gap-2" variant="outline" onClick={onItemClick}>
          {!hideIcons && <BrainCircuit className={navIconClass} />}
          <span className="text-button">AI Works</span>
        </Button>
      )}
      {setScheduleOpen != null && (
        <SchedulingDialog
          open={scheduleOpen}
          onOpenChange={setScheduleOpen}
          trigger={
            <Button className="nav-button flex items-center gap-2" variant="outline" aria-label="Open calendar" onClick={onItemClick}>
              {!hideIcons && <Calendar className={navIconClass} />}
              <span className="text-button">Schedule</span>
            </Button>
          }
        />
      )}
      {setChatOpen != null && (
        <ChatPanel
          open={chatOpen}
          onOpenChange={setChatOpen}
          trigger={
            <Button className="nav-button flex items-center gap-2" variant="outline" onClick={onItemClick}>
              {!hideIcons && <MessageCircle className={navIconClass} />}
              <span className="text-button">Let{"\u2019"}s Chat</span>
            </Button>
          }
        />
      )}
    </>
  );
}

let Header: React.FC;
try {
  Header = function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);

    useEffect(() => {
      const mq = window.matchMedia("(min-width: 1024px)");
      let wasDesktop = mq.matches;
      const onMediaChange = () => {
        const isDesktop = mq.matches;
        if (!wasDesktop && isDesktop) setMobileMenuOpen(false);
        wasDesktop = isDesktop;
      };
      mq.addEventListener("change", onMediaChange);
      return () => mq.removeEventListener("change", onMediaChange);
    }, []);

    console.log("🔥 COMPONENT RENDER:", "Header");
    console.log("MOUNT:", "Header");
    return (
      <>
      <header className="sticky top-0 z-50 w-full min-w-0 bg-transparent text-foreground backdrop-blur-sm">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="max-w-[1328px] mx-auto">
            <div className="w-full min-w-0 flex items-center justify-between gap-2 py-4 px-0 lg:px-16 bg-transparent">
              <div className="hidden lg:flex min-w-0 flex-wrap items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="nav-button h-12 min-h-12 px-6 py-0"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <img src="/images/panel-left.svg" alt="" className="h-5 w-5" />
                </Button>
                <NavItems hideSidebarToggle hideIcons scheduleOpen={scheduleOpen} setScheduleOpen={setScheduleOpen} chatOpen={chatOpen} setChatOpen={setChatOpen} />
              </div>
              <div className="flex lg:hidden items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="hamburger-trigger inline-flex h-12 min-h-12 w-12 min-w-12 items-center justify-center rounded-none border-0 bg-transparent p-0 shadow-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 shrink-0 text-black dark:text-white color:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="left"
          className="mobile-menu-sheet w-full max-w-full sm:max-w-full lg:max-w-[280px] bg-background dark:border-[oklch(26%_0_0)]"
          closeButtonClassName="text-black dark:text-white color:text-white [&_svg]:text-black dark:[&_svg]:text-white color:[&_svg]:text-white"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex flex-col items-start p-4">
                      <MobileMenuCrown />
                      <MobileMenuThemeSwitcher />
                      <div className="mt-[76px] w-full pl-0 min-w-0">
                        <p className="text-subtitle1 font-medium mb-2">Clients</p>
                        <ul className="mobile-menu-clients-list flex flex-col gap-1 m-0 mt-0 w-full">
                          {SIDEBAR_PROJECTS.map(({ label, href }) => (
                            <li key={href} className="w-full">
                              <Button
                                className="nav-button flex items-center justify-start gap-2 w-full"
                                variant="outline"
                                asChild
                              >
                                <Link
                                  href={href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-button text-foreground no-underline"
                                >
                                  {label}
                                </Link>
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-subtitle1 font-medium mb-2 mt-6">Experiments</p>
                      <nav
                        className="mobile-menu-connect-nav flex flex-col gap-3 items-start w-full pl-0 min-w-0"
                        aria-label="Experiments"
                      >
                        <Button
                          className="nav-button flex items-center gap-2"
                          variant="outline"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="text-button">AI Works</span>
                        </Button>
                      </nav>
                      <p className="text-subtitle1 font-medium mb-2 mt-6">Connect</p>
                      <nav
                        className="mobile-menu-connect-nav flex flex-col gap-3 items-start w-full pl-0 min-w-0"
                        aria-label="Main"
                      >
                        <Button
                          className="nav-button flex items-center gap-2"
                          variant="outline"
                          asChild
                        >
                          <a
                            href="mailto:"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Email Mike"
                          >
                            <span className="text-button">Email Mike</span>
                          </a>
                        </Button>
                        <Button
                          className="nav-button flex items-center gap-2"
                          variant="outline"
                          asChild
                        >
                          <a
                            href="/resume.pdf"
                            download
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Download Resume"
                          >
                            <span className="text-button">Download Resume</span>
                          </a>
                        </Button>
                        <Button
                          className="nav-button flex items-center gap-2"
                          variant="outline"
                          asChild
                        >
                          <a
                            href="https://linkedin.com/in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Connect on LinkedIn"
                          >
                            <span className="text-button">Connect on LinkedIn</span>
                          </a>
                        </Button>
                        <Button
                          className="nav-button flex items-center gap-2"
                          variant="outline"
                          aria-label="Open calendar"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setScheduleOpen(true);
                          }}
                        >
                          <span className="text-button">Schedule</span>
                        </Button>
                        <Button
                          className="nav-button flex items-center gap-2"
                          variant="outline"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setChatOpen(true);
                          }}
                        >
                          <span className="text-button">Let{"\u2019"}s Chat</span>
                        </Button>
                      </nav>
          </div>
        </SheetContent>
      </Sheet>
      </>
    );
  };
} catch (err) {
  console.error("🔥 MODULE ERROR in header:", err);
  throw err;
}

export default Header;
