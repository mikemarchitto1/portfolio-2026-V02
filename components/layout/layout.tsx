import { ReactNode } from "react";
import SidebarLayout from "@/components/sidebar-layout/sidebar-layout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout>
      {/* Main wrapper: fixed-width grid (Figma frame); no full-bleed. overflow-x-hidden prevents any horizontal scroll. */}
      <div className="w-full min-w-0 max-w-[1328px] mx-auto overflow-x-hidden">
        {children}
      </div>
    </SidebarLayout>
  );
}
