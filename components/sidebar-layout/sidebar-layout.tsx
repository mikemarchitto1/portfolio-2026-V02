"use client";

import React, { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

let SidebarLayout: React.FC<{ children: React.ReactNode }>;
try {
  const IMAGE_PATHS_TO_CHECK = [
    "/images/panel-left.svg",
    "/images/crown-black.svg",
    "/images/crown-white.svg",
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
