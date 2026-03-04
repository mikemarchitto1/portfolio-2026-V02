"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Sun, Moon, Palette, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "@/hooks/use-theme";

console.log("🔥 MODULE LOAD:", "sidebar-layout");

let SidebarLayout: React.FC<{ children: React.ReactNode }>;
try {
  const PROJECTS = [
    { label: "Nutrilucent", href: "/nutrilucent" },
    { label: "GloriFi", href: "/glorifi" },
    { label: "National Restaurant Association", href: "/nra" },
    { label: "Microsoft Admin", href: "/microsoft-admin" },
    { label: "Microsoft Hits", href: "/microsoft-hits" },
    { label: "Eddie Bauer", href: "/eddiebauer" },
  ] as const;

  function SidebarHeaderContent() {
    const { setOpen } = useSidebar();
    const { theme } = useTheme();
    const logoSrc =
      theme === "light" ? "/images/crown-draw-b.svg" : "/images/crown-draw-w.svg";
    return (
      <div className="flex items-start justify-between shrink-0 pt-0 pb-4">
        <img
          src={logoSrc}
          alt="Crown"
          className="h-[40px] w-auto object-contain object-left"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(false)}
          className="sidebar-icon-btn h-12 w-12 min-h-12 min-w-12 p-0 rounded-none border-0 bg-transparent hover:bg-transparent dark:hover:bg-transparent [&_svg]:size-5 [&_svg]:text-black dark:[&_svg]:text-white dark:hover:[&_svg]:text-white color:[&_svg]:!text-white color:[&_svg]:stroke-white color:hover:[&_svg]:text-[oklch(38%_0.065_155)] color:hover:text-[#2d5a45] flex items-center justify-center"
          aria-label="Close sidebar"
        >
          <X className="size-5" />
        </Button>
      </div>
    );
  }

  function SidebarContentArea() {
    const { setOpen } = useSidebar();
    const { setTheme } = useTheme();
    return (
      <>
        <nav
          className="flex flex-row gap-4 shrink-0 pb-8"
          aria-label="Theme and preferences"
        >
          <Button
            variant="ghost"
            size="icon"
            className="sidebar-icon-btn h-auto w-auto min-w-0 min-h-0 p-0 rounded-none border-0 bg-transparent hover:bg-transparent dark:hover:bg-transparent [&_svg]:size-5 [&_svg]:text-black dark:[&_svg]:text-white dark:hover:[&_svg]:text-white color:[&_svg]:!text-white color:[&_svg]:stroke-white color:hover:[&_svg]:text-[oklch(38%_0.065_155)] color:hover:text-[#2d5a45]"
            aria-label="Light mode"
            onClick={() => setTheme("light")}
          >
            <Sun className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="sidebar-icon-btn h-auto w-auto min-w-0 min-h-0 p-0 rounded-none border-0 bg-transparent hover:bg-transparent dark:hover:bg-transparent [&_svg]:size-5 [&_svg]:text-black dark:[&_svg]:text-white dark:hover:[&_svg]:text-white color:[&_svg]:!text-white color:[&_svg]:stroke-white color:hover:[&_svg]:text-[oklch(38%_0.065_155)] color:hover:text-[#2d5a45]"
            aria-label="Dark mode"
            onClick={() => setTheme("dark")}
          >
            <Moon className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="sidebar-icon-btn h-auto w-auto min-w-0 min-h-0 p-0 rounded-none border-0 bg-transparent hover:bg-transparent dark:hover:bg-transparent [&_svg]:size-5 [&_svg]:text-black dark:[&_svg]:text-white dark:hover:[&_svg]:text-white color:[&_svg]:!text-white color:[&_svg]:stroke-white color:hover:[&_svg]:text-[oklch(38%_0.065_155)] color:hover:text-[#2d5a45]"
            aria-label="Color mode"
            onClick={() => setTheme("color")}
          >
            <Palette className="size-5" />
          </Button>
        </nav>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-body2 !font-bold">Clients</SidebarGroupLabel>
          <SidebarMenu>
            {PROJECTS.map(({ label, href }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton asChild>
                  <Link href={href} onClick={() => setOpen(false)}>
                    {label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </>
    );
  }

  const IMAGE_PATHS_TO_CHECK = [
    "/images/panel-left.svg",
    "/images/crown-draw-b.svg",
    "/images/crown-draw-w.svg",
    "/images/crown works-up-b.svg",
    "/images/crown works-up-w.svg",
  ];

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
        <div className="flex w-full min-w-0 overflow-x-hidden">
          <Sidebar>
            <SidebarHeader>
              <SidebarHeaderContent />
            </SidebarHeader>
            <SidebarContent>
              <SidebarContentArea />
            </SidebarContent>
            <SidebarFooter />
          </Sidebar>
          <main className="min-h-screen min-w-0 w-full max-w-full overflow-x-hidden">{children}</main>
        </div>
      </SidebarProvider>
    );
  };
} catch (err) {
  console.error("🔥 MODULE ERROR in sidebar-layout:", err);
  throw err;
}

export default SidebarLayout;
