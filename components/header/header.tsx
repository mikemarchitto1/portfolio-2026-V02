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
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

console.log("🔥 MODULE LOAD:", "header");

const navIconClass = "h-5 w-5 shrink-0";

const themeButtonClass =
  "sidebar-icon-btn flex h-8 w-8 min-h-8 min-w-8 items-center justify-center gap-2 p-0 rounded-md border bg-transparent border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)] text-foreground hover:text-sidebar-accent-foreground transition-colors hover:[&_svg]:text-sidebar-accent-foreground [&_svg]:size-5 [&_svg]:text-current [&_svg]:transition-colors";

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
  const { theme, setTheme } = useTheme();
  return (
    <nav
      className="mobile-menu-theme-nav flex flex-row gap-2 shrink-0 w-full mb-8 -ml-1"
      aria-label="Theme and preferences"
    >
      <Button
        variant="ghost"
        size="icon"
        className={themeButtonClass}
        aria-label="Light mode"
        aria-pressed={theme === "light"}
        data-state={theme === "light" ? "on" : "off"}
        onClick={() => setTheme("light")}
      >
        <Sun className="size-5 shrink-0" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={themeButtonClass}
        aria-label="Dark mode"
        aria-pressed={theme === "dark"}
        data-state={theme === "dark" ? "on" : "off"}
        onClick={() => setTheme("dark")}
      >
        <Moon className="size-5 shrink-0" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={themeButtonClass}
        aria-label="Color mode"
        aria-pressed={theme === "color"}
        data-state={theme === "color" ? "on" : "off"}
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
  deferRadixTriggers = false,
}: {
  onItemClick?: () => void;
  hideSidebarToggle?: boolean;
  hideAIExploration?: boolean;
  hideIcons?: boolean;
  scheduleOpen?: boolean;
  setScheduleOpen?: (open: boolean) => void;
  chatOpen?: boolean;
  setChatOpen?: (open: boolean) => void;
  /** When true, render static buttons for Schedule/Chat to avoid Radix ID hydration mismatch */
  deferRadixTriggers?: boolean;
}) {
  const { toggle } = useSidebar();
  return (
    <>
      {!hideSidebarToggle && (
        <Button
          className="nav-button bg-transparent border border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]"
          variant="outline"
          size="icon"
          onClick={() => {
            toggle();
            onItemClick?.();
          }}
          aria-label="Toggle sidebar"
        >
          <img
            src="/images/panel-left.svg"
            alt=""
            className="h-5 w-5 dark:[filter:invert(1)] color:[filter:invert(1)]"
          />
        </Button>
      )}
      <Button className="nav-button flex items-center gap-2 bg-transparent border border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]" variant="outline" asChild>
        <a href="mailto:hello@carlwalker.com" className="text-button">
          Email
        </a>
      </Button>
      <Button className="nav-button flex items-center gap-2 bg-transparent border border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]" variant="outline" asChild>
        <a href="/resume.pdf" download className="text-button">
          Resume
        </a>
      </Button>
      <Button className="nav-button flex items-center gap-2 bg-transparent border border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]" variant="outline" asChild>
        <a
          href="https://linkedin.com/in/carlwalker"
          target="_blank"
          rel="noopener noreferrer"
          className="text-button"
        >
          LinkedIn
        </a>
      </Button>
      {setScheduleOpen != null &&
        (deferRadixTriggers ? (
          <Button className="nav-button flex items-center gap-2 bg-transparent border border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]" variant="outline" aria-label="Open calendar">
            {!hideIcons && <Calendar className={navIconClass} />}
            <span className="text-button">Schedule</span>
          </Button>
        ) : (
          <SchedulingDialog
            open={scheduleOpen}
            onOpenChange={setScheduleOpen}
            trigger={
              <Button className="nav-button flex items-center gap-2 bg-transparent border border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]" variant="outline" aria-label="Open calendar" onClick={onItemClick}>
                {!hideIcons && <Calendar className={navIconClass} />}
                <span className="text-button">Schedule</span>
              </Button>
            }
          />
        ))}
      {setChatOpen != null &&
        (deferRadixTriggers ? (
          <Button className="nav-button flex items-center gap-2 bg-transparent border border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]" variant="outline">
            {!hideIcons && <MessageCircle className={navIconClass} />}
            <span className="text-button">Chat</span>
          </Button>
        ) : (
          <ChatPanel
            open={chatOpen}
            onOpenChange={setChatOpen}
            trigger={
              <Button className="nav-button flex items-center gap-2 bg-transparent border border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]" variant="outline" onClick={onItemClick}>
                {!hideIcons && <MessageCircle className={navIconClass} />}
                <span className="text-button">Chat</span>
              </Button>
            }
          />
        ))}
    </>
  );
}

let Header: React.FC;
try {
  Header = function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

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
      <header className="fixed top-0 left-0 right-0 z-50 w-full min-w-0 bg-background text-foreground">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="max-w-[1328px] mx-auto">
            <div className="w-full min-w-0 flex items-center justify-between gap-2 py-4 px-0 lg:px-16">
              <div className="hidden lg:flex min-w-0 flex-wrap items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="nav-button h-12 min-h-12 px-6 py-0 bg-transparent border border-[oklch(92%_0_0)] dark:border-[oklch(30%_0.01_264)] color:border-[oklch(40%_0.035_165)] hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)]"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open menu"
                >
                  <img
                    src="/images/panel-left.svg"
                    alt=""
                    className="h-5 w-5 dark:[filter:invert(1)] color:[filter:invert(1)]"
                  />
                </Button>
                <NavItems
                  hideSidebarToggle
                  hideAIExploration
                  hideIcons
                  scheduleOpen={scheduleOpen}
                  setScheduleOpen={setScheduleOpen}
                  chatOpen={chatOpen}
                  setChatOpen={setChatOpen}
                  deferRadixTriggers={!mounted}
                />
              </div>
              <div className="flex lg:hidden items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="hamburger-trigger inline-flex h-12 min-h-12 w-12 min-w-12 items-center justify-center rounded-none border-0 bg-transparent p-0 shadow-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 shrink-0 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          id="mobile-menu-sheet"
          side="left"
          className="mobile-menu-sheet w-full max-w-full sm:max-w-full lg:max-w-[280px] bg-sidebar border-border text-sidebar-foreground"
          closeButtonClassName="h-8 w-8 min-h-8 min-w-8 p-0 rounded-md border-0 bg-transparent hover:bg-[var(--sidebar-hover)] dark:hover:bg-[oklch(30%_0.01_264)] color:hover:bg-[oklch(40%_0.035_165)] text-foreground hover:text-sidebar-accent-foreground !data-[state=open]:bg-transparent transition-colors flex items-center justify-center [&_svg]:text-current [&_svg]:transition-colors hover:[&_svg]:text-sidebar-accent-foreground"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex flex-col items-start p-4">
                      <MobileMenuCrown />
                      <MobileMenuThemeSwitcher />
                      <div className="mt-[4px] w-full pl-0 min-w-0">
                        <SidebarGroup>
                          <SidebarGroupLabel className="text-subtitle1 font-medium mb-2 ml-[2px]">
                            Projects
                          </SidebarGroupLabel>
                          <SidebarMenu className="mobile-menu-clients-list gap-0 mt-0 w-full">
                            {SIDEBAR_PROJECTS[0] && (
                              <SidebarMenuItem key={SIDEBAR_PROJECTS[0].href} className="w-full">
                                <SidebarMenuButton asChild>
                                  <Link
                                    href={SIDEBAR_PROJECTS[0].href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="no-underline w-full"
                                  >
                                    {SIDEBAR_PROJECTS[0].label}
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            )}
                            <SidebarMenuItem className="w-full">
                              <SidebarMenuButton>
                                AI Labs
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            {SIDEBAR_PROJECTS.slice(1).map(({ label, href }) => (
                              <SidebarMenuItem key={href} className="w-full">
                                <SidebarMenuButton asChild>
                                  <Link
                                    href={href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="no-underline w-full"
                                  >
                                    {label}
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </SidebarGroup>
                      </div>
                      <SidebarGroup>
                        <SidebarGroupLabel className="text-subtitle1 font-medium mb-2 mt-6 ml-[2px]">
                          Connect
                        </SidebarGroupLabel>
                        <SidebarMenu
                          className="mobile-menu-connect-nav gap-0 items-start w-full pl-0 min-w-0"
                          aria-label="Main"
                        >
                          <SidebarMenuItem className="w-full">
                            <SidebarMenuButton asChild>
                              <a
                                href="mailto:"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Email Mike"
                                className="no-underline w-full"
                              >
                                Email
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem className="w-full">
                            <SidebarMenuButton asChild>
                              <a
                                href="/resume.pdf"
                                download
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Download Resume"
                                className="no-underline w-full"
                              >
                                Resume
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem className="w-full">
                            <SidebarMenuButton asChild>
                              <a
                                href="https://linkedin.com/in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Connect on LinkedIn"
                                className="no-underline w-full"
                              >
                                LinkedIn
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem className="w-full">
                            <SidebarMenuButton
                              aria-label="Open calendar"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setScheduleOpen(true);
                              }}
                            >
                              Schedule
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem className="w-full">
                            <SidebarMenuButton
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setChatOpen(true);
                              }}
                            >
                              Chat
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroup>
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
