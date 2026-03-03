"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const SIDEBAR_WIDTH = 280;

type SidebarContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  width: number;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}

const SidebarProvider = function SidebarProvider({
  children,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const toggle = React.useCallback(() => setOpen((o) => !o), []);
  const value = React.useMemo(
    () => ({ open, setOpen, toggle, width: SIDEBAR_WIDTH }),
    [open, toggle]
  );
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function Sidebar({ className, children, ...props }, ref) {
  const { open, width } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn("fixed left-0 top-0 z-[60] h-full min-w-0 overflow-x-hidden transition-[transform] duration-300 ease-in-out", className)}
      style={{
        width: width,
        transform: open ? "translateX(0)" : "translateX(-100%)",
      }}
      aria-hidden={!open}
      data-state={open ? "open" : "closed"}
      {...props}
    >
      <aside
        className="h-full min-w-0 w-full flex flex-col bg-sidebar text-sidebar-foreground overflow-hidden shadow-elevation border-r border-[oklch(92%_0_0)] dark:border-[oklch(26%_0_0)] color:border-[oklch(28%_0.05_155)]"
        style={{ width }}
      >
        {children}
      </aside>
    </div>
  );
});

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex shrink-0 flex-col gap-2 p-4 md:p-8 lg:p-16", className)}
      {...props}
    />
  );
});

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn("flex flex-1 flex-col gap-2 overflow-auto p-4 md:p-8 lg:p-16", className)}
      {...props}
    />
  );
});

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex shrink-0 flex-col gap-2 p-4 md:p-8 lg:p-16", className)}
      {...props}
    />
  );
});

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
});

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function SidebarGroupLabel({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-sidebar="group-label"
      className={cn("text-subtitle2 text-foreground px-0 py-2", className)}
      {...props}
    />
  );
});

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(function SidebarMenu({ className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn("flex flex-col gap-1 list-none p-0 m-0", className)}
      {...props}
    />
  );
});

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(function SidebarMenuItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn("list-none", className)}
      {...props}
    />
  );
});

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(function SidebarMenuButton({ className, asChild = false, ...props }, ref) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      ref={ref as React.Ref<HTMLButtonElement>}
      data-sidebar="menu-button"
      className={cn(
        "flex w-full items-center gap-2 rounded-none border-0 bg-transparent py-2 text-button text-foreground no-underline transition-colors hover:bg-transparent hover:text-accent [&_svg]:size-5 color:hover:text-[oklch(38%_0.065_155)]",
        className
      )}
      {...props}
    />
  );
});

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(function SidebarTrigger({ className, asChild = false, ...props }, ref) {
  const { toggle } = useSidebar();
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      data-sidebar="trigger"
      aria-label="Toggle sidebar"
      onClick={toggle}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    />
  );
});

export {
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
  SidebarTrigger,
  useSidebar,
};
