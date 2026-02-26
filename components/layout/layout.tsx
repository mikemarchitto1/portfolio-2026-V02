import { ReactNode } from "react";
import SidebarLayout from "@/components/sidebar-layout/sidebar-layout";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarLayout>
      <div className="w-full max-w-[1328px] mx-auto">
        {children}
      </div>
    </SidebarLayout>
  );
}
