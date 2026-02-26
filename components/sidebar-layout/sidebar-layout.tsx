"use client";

import React from "react";
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context";
import LeftSidebar, { SIDEBAR_WIDTH } from "@/components/left-sidebar/left-sidebar";

function SidebarLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen } = useSidebar();
  return (
    <>
      {/* Sidebar: fixed on left edge, overlay panel */}
      <div
        className="fixed left-0 top-0 z-50 h-full transition-[transform] duration-300 ease-in-out"
        style={{
          width: SIDEBAR_WIDTH,
          transform: open ? "translateX(0)" : "translateX(-100%)",
        }}
        aria-hidden={!open}
      >
        <LeftSidebar
          open={open}
          onClose={() => setOpen(false)}
          width={SIDEBAR_WIDTH}
        />
      </div>
      {/* Main content: no margin-left, translateX, or width; natural responsive margin only */}
      <div className="min-h-screen">
        {children}
      </div>
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
      <SidebarLayoutInner>{children}</SidebarLayoutInner>
    </SidebarProvider>
  );
}
