"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { SIDEBAR_PROJECTS } from "@/lib/projects";
import { SchedulingDialog } from "@/components/scheduling-dialog/scheduling-dialog";
import { Sun, Moon, Palette } from "lucide-react";
import Header from "@/components/header/header";

const themeButtonClass =
  "sidebar-icon-btn flex h-8 w-8 min-h-8 min-w-8 items-center justify-center gap-2 p-0 rounded-md !border-0 !border-transparent !outline-none bg-transparent hover:bg-[var(--sidebar-hover)] text-foreground hover:text-sidebar-accent-foreground transition-colors hover:[&_svg]:text-sidebar-accent-foreground [&_svg]:size-5 [&_svg]:text-current [&_svg]:transition-colors";

let SidebarLayout: React.FC<{ children: React.ReactNode }>;
try {
  const IMAGE_PATHS_TO_CHECK = [
    "/images/panel-left.svg",
    "/images/crown-black.svg",
    "/images/crown-white.svg",
  ];

  function SidebarCrown() {
    const { resolvedTheme } = useTheme();
    const crownSrc =
      resolvedTheme === "light" ? "/images/crown-black.svg" : "/images/crown-white.svg";
    return (
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring rounded-md"
          aria-label="Home"
        >
          <img
            suppressHydrationWarning
            src={crownSrc}
            alt=""
            className="h-10 w-auto shrink-0"
            width={40}
            height={40}
          />
        </Link>
      </div>
    );
  }

  const themeBtnNoBorderStyle: React.CSSProperties = {
    border: "none",
    outline: "none",
    outlineOffset: 0,
    boxShadow: "none",
  };

  function SidebarThemeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme();
    return (
      <nav
        className="mobile-menu-theme-nav flex flex-row gap-2 shrink-0 w-full mb-8"
        aria-label="Theme and preferences"
      >
        <Button
          variant="ghost"
          size="icon"
          className={themeButtonClass}
          style={themeBtnNoBorderStyle}
          aria-label="Light mode"
          aria-pressed={resolvedTheme === "light"}
          data-state={resolvedTheme === "light" ? "on" : "off"}
          suppressHydrationWarning
          onClick={() => setTheme("light")}
        >
          <Sun className="size-5 shrink-0" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={themeButtonClass}
          style={themeBtnNoBorderStyle}
          aria-label="Dark mode"
          aria-pressed={resolvedTheme === "dark"}
          data-state={resolvedTheme === "dark" ? "on" : "off"}
          suppressHydrationWarning
          onClick={() => setTheme("dark")}
        >
          <Moon className="size-5 shrink-0" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={themeButtonClass}
          style={themeBtnNoBorderStyle}
          aria-label="Color mode"
          aria-pressed={resolvedTheme === "color"}
          data-state={resolvedTheme === "color" ? "on" : "off"}
          suppressHydrationWarning
          onClick={() => setTheme("color")}
        >
          <Palette className="size-5 shrink-0" />
        </Button>
      </nav>
    );
  }

  SidebarLayout = function SidebarLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    console.log("🔥 COMPONENT RENDER:", "SidebarLayout");
    console.log("MOUNT:", "SidebarLayout");
    useEffect(() => {
      console.log("EFFECT:", "SidebarLayout");
      IMAGE_PATHS_TO_CHECK.forEach((path) => {
        const img = new Image();
        img.onerror = () => console.error("Missing image:", path);
        img.src = path;
      });
    }, []);
    return (
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="px-2 py-4">
            <div className="ps-sidebar-crown-row">
              <SidebarCrown />
            </div>
            <div className="ps-sidebar-theme-row ms-[2px]">
              <SidebarThemeSwitcher />
            </div>
          </SidebarHeader>
          <SidebarContent className="px-2 py-4 -mt-[72px]">
            <SidebarGroup>
              <SidebarGroupLabel className="text-subtitle1 font-medium mb-2 ps-[calc(var(--sidebar-menu-text-inset,0.25rem)+4px)]">
                Projects
              </SidebarGroupLabel>
              <SidebarMenu className="gap-0">
                {SIDEBAR_PROJECTS[0]?.href != null && (
                  <SidebarMenuItem key={SIDEBAR_PROJECTS[0].href}>
                    <SidebarMenuButton variant="text" asChild>
                      <Link
                        href={SIDEBAR_PROJECTS[0].href}
                        className="text-button text-foreground no-underline w-full"
                      >
                        {SIDEBAR_PROJECTS[0].label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                <SidebarMenuItem>
                  <SidebarMenuButton variant="text">
                    AI Labs
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {SIDEBAR_PROJECTS.slice(1).map((item) => (
                  <SidebarMenuItem key={item.href ?? item.label}>
                    {item.href ? (
                      <SidebarMenuButton variant="text" asChild>
                        <Link
                          href={item.href}
                          className="text-button text-foreground no-underline w-full"
                        >
                          {item.label}
                        </Link>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton variant="text" type="button">
                        {item.label}
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel className="text-subtitle1 font-medium mb-2 mt-6 ps-[calc(var(--sidebar-menu-text-inset,0.25rem)+4px)]">
                Connect
              </SidebarGroupLabel>
              <SidebarMenu className="gap-0">
                <SidebarMenuItem>
                  <SidebarMenuButton variant="text" asChild>
                    <a href="mailto:mikemarchitto@gmail.com" aria-label="Email Mike" className="text-button text-foreground no-underline w-full">
                      Email
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton variant="text" asChild>
                    <a
                      href="/images/mikemarchitto_cv.pdf"
                      download="mikemarchitto_cv.pdf"
                      aria-label="Download Resume"
                      className="text-button text-foreground no-underline w-full"
                    >
                      Resume
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton variant="text" asChild>
                    <a
                      href="https://www.linkedin.com/in/mikemarchitto/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Connect on LinkedIn"
                      className="text-button text-foreground no-underline w-full"
                    >
                      LinkedIn
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SchedulingDialog
                    trigger={
                      <SidebarMenuButton variant="text">Schedule</SidebarMenuButton>
                    }
                  />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col w-full min-w-0 overflow-x-clip">
          <Header />
          <main className="min-h-screen min-w-0 w-full max-w-full overflow-x-clip flex-1 pt-16">{children}</main>
        </div>
      </SidebarProvider>
    );
  };
} catch (err) {
  console.error("🔥 MODULE ERROR in sidebar-layout:", err);
  throw err;
}

export default SidebarLayout;
