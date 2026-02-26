"use client";

import React from "react";
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
  return (
    <div className="flex items-start justify-between shrink-0 pt-0 pb-4">
      <img
        src="/images/monogram_mm.svg"
        alt="MM"
        className="h-10 w-auto object-contain object-left"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(false)}
        className="h-12 w-12 min-h-12 min-w-12 p-0 rounded-none border-0 bg-transparent hover:bg-accent hover:text-accent-foreground [&_svg]:size-5 flex items-center justify-center"
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
        className="flex flex-row gap-5 shrink-0 pb-8"
        aria-label="Theme and preferences"
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-auto w-auto min-w-0 min-h-0 p-0 rounded-none border-0 bg-transparent hover:bg-accent hover:!text-gray-500 [&_svg]:size-5"
          aria-label="Light mode"
          onClick={() => setTheme("light")}
        >
          <Sun className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-auto w-auto min-w-0 min-h-0 p-0 rounded-none border-0 bg-transparent hover:bg-accent hover:!text-gray-500 [&_svg]:size-5"
          aria-label="Dark mode"
          onClick={() => setTheme("dark")}
        >
          <Moon className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-auto w-auto min-w-0 min-h-0 p-0 rounded-none border-0 bg-transparent hover:bg-accent hover:!text-gray-500 [&_svg]:size-5"
          aria-label="Color mode"
          onClick={() => setTheme("color")}
        >
          <Palette className="size-5" />
        </Button>
      </nav>

      <SidebarGroup className="mt-14">
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
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

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarHeaderContent />
        </SidebarHeader>
        <SidebarContent>
          <SidebarContentArea />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <main className="min-h-screen">{children}</main>
    </SidebarProvider>
  );
}
