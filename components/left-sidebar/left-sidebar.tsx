"use client";

import React from "react";
import Link from "next/link";
import { Sun, Moon, Palette, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SIDEBAR_WIDTH = 232;

const PROJECTS = [
  { label: "Nutrilucent", href: "/nutrilucent" },
  { label: "GloriFi", href: "/glorifi" },
  { label: "National Restaurant Association", href: "/nra" },
  { label: "Microsoft Admin", href: "/microsoft-admin" },
  { label: "Microsoft Hits", href: "/microsoft-hits" },
  { label: "Eddie Bauer", href: "/eddiebauer" },
] as const;

export default function LeftSidebar({
  open,
  onClose,
  width = SIDEBAR_WIDTH,
}: {
  open: boolean;
  onClose: () => void;
  width?: number;
}) {
  return (
    <aside
      className="h-full w-[var(--sidebar-width)] min-w-[var(--sidebar-width)] shrink-0 flex flex-col bg-background text-foreground overflow-hidden shadow-elevation"
      style={{ "--sidebar-width": `${width}px` } as React.CSSProperties}
      aria-hidden={!open}
    >
      <div className="flex h-full w-[var(--sidebar-width)] min-w-[var(--sidebar-width)] flex-col p-4">
          {/* Top row: mark left, close button right */}
          <div className="flex items-start justify-between shrink-0 pt-0 pb-4">
            <img
              src="/images/monogram_mm.svg"
              alt="MM"
              className="h-10 w-auto object-contain object-left"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-12 w-12 min-h-12 min-w-12 p-0 rounded-none border-0 bg-transparent hover:bg-accent hover:text-accent-foreground [&_svg]:size-5 flex items-center justify-center"
              aria-label="Close sidebar"
            >
              <X className="size-5" />
            </Button>
          </div>

          {/* Icon menu - sun, moon, palette in a row, 16px apart */}
          <nav className="flex flex-row gap-5 shrink-0 pb-8" aria-label="Theme and preferences">
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-auto min-w-0 min-h-0 p-0 rounded-none border-0 bg-transparent hover:bg-accent hover:!text-gray-500 [&_svg]:size-5"
              aria-label="Light mode"
            >
              <Sun className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-auto min-w-0 min-h-0 p-0 rounded-none border-0 bg-transparent hover:bg-accent hover:!text-gray-500 [&_svg]:size-5"
              aria-label="Dark mode"
            >
              <Moon className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-auto min-w-0 min-h-0 p-0 rounded-none border-0 bg-transparent hover:bg-accent hover:!text-gray-500 [&_svg]:size-5"
              aria-label="Palette"
            >
              <Palette className="size-5" />
            </Button>
          </nav>

          {/* Projects - full width, height hugs content */}
          <div className="flex shrink-0 flex-col gap-1 pl-0 py-2 w-full mt-14">
            <h2 className="text-sm font-bold text-foreground pb-2">
              Projects
            </h2>
            <ul className="flex flex-col gap-1">
              {PROJECTS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className="block py-2 text-button text-foreground no-underline transition-colors hover:bg-accent hover:!text-gray-500"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
  );
}

export { SIDEBAR_WIDTH };
