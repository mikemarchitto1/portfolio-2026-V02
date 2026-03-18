"use client";

import * as React from "react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

console.log("🔥 MODULE LOAD: SidebarProvider");
console.log("🔥 MODULE LOAD: useSidebar");

let SidebarProvider: (props: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => React.ReactElement;
let useSidebar: () => {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  width: number;
};
let Sidebar: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
let SidebarHeader: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
let SidebarContent: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
let SidebarFooter: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
let SidebarGroup: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
let SidebarGroupLabel: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
>;
let SidebarMenu: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLUListElement> & React.RefAttributes<HTMLUListElement>
>;
let SidebarMenuItem: React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLLIElement> & React.RefAttributes<HTMLLIElement>
>;
let SidebarMenuButton: React.ForwardRefExoticComponent<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    variant?: "default" | "text";
    ref?: React.Ref<HTMLButtonElement>;
  }
>;
let SidebarTrigger: React.ForwardRefExoticComponent<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    ref?: React.Ref<HTMLButtonElement>;
  }
>;

try {
  const SIDEBAR_WIDTH = 280;

  type SidebarContextValue = {
    open: boolean;
    setOpen: (open: boolean) => void;
    toggle: () => void;
    width: number;
  };

  const SidebarContext = React.createContext<SidebarContextValue | null>(null);
  console.log("🔥 MODULE LOAD: sidebar-context");

  useSidebar = function useSidebarImpl() {
    console.log("🔥 HOOK CALL: useSidebar");
    const ctx = React.useContext(SidebarContext);
    if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
    return ctx;
  };

  SidebarProvider = function SidebarProvider({
    children,
    defaultOpen = false,
  }: {
    children: React.ReactNode;
    defaultOpen?: boolean;
  }) {
    console.log("🔥 COMPONENT RENDER: SidebarProvider");
    const [open, setOpen] = React.useState(defaultOpen);
    const toggle = React.useCallback(() => setOpen((o) => !o), []);
    const value = React.useMemo(
      () => ({ open, setOpen, toggle, width: SIDEBAR_WIDTH }),
      [open, toggle]
    );
    React.useEffect(() => {
      console.log("🔥 EFFECT: SidebarProvider");
    });
    return (
      <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
    );
  };

  Sidebar = React.forwardRef<
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
          className="h-full min-w-0 w-full flex flex-col bg-sidebar-background text-sidebar-foreground overflow-hidden border-r border-border"
          style={{ width }}
        >
          {children}
        </aside>
      </div>
    );
  });

  SidebarHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(function SidebarHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-sidebar="header"
        className={cn("flex shrink-0 flex-col", className)}
        {...props}
      />
    );
  });

  SidebarContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(function SidebarContent({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-sidebar="content"
        className={cn("flex flex-1 flex-col overflow-auto", className)}
        {...props}
      />
    );
  });

  SidebarFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(function SidebarFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-sidebar="footer"
        className={cn("flex shrink-0 flex-col", className)}
        {...props}
      />
    );
  });

  SidebarGroup = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(function SidebarGroup({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn("flex w-full flex-col", className)}
        {...props}
      />
    );
  });

  SidebarGroupLabel = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >(function SidebarGroupLabel({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-sidebar="group-label"
        className={cn("text-subtitle2 text-foreground", className)}
        {...props}
      />
    );
  });

  SidebarMenu = React.forwardRef<
    HTMLUListElement,
    React.HTMLAttributes<HTMLUListElement>
  >(function SidebarMenu({ className, ...props }, ref) {
    return (
      <ul
        ref={ref}
        data-sidebar="menu"
        className={cn("flex flex-col list-none p-0 m-0", className)}
        {...props}
      />
    );
  });

  SidebarMenuItem = React.forwardRef<
    HTMLLIElement,
    React.HTMLAttributes<HTMLLIElement>
  >(function SidebarMenuItem({ className, ...props }, ref) {
    return (
      <li
        ref={ref}
        data-sidebar="menu-item"
        className={cn("list-none w-full", className)}
        {...props}
      />
    );
  });

  SidebarMenuButton = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; variant?: "default" | "text" }
  >(function SidebarMenuButton({ className, asChild = false, variant = "default", children, ...props }, ref) {
    const baseClasses =
      "flex w-full -ml-[6px] items-center gap-2 rounded-md border-0 bg-transparent py-2 px-2 text-button text-left no-underline outline-none ring-sidebar-ring transition-colors hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:size-5 [&_svg]:text-current hover:[&_svg]:text-sidebar-accent-foreground [&_svg]:transition-colors";
    const hoverBg =
      "absolute inset-y-0 -left-1 -right-1 rounded-md bg-[var(--sidebar-hover)] color:bg-[oklch(42%_0.035_165)] opacity-0 group-hover:opacity-100 transition pointer-events-none";

    if (asChild) {
      return (
        <div
          data-sidebar="menu-button"
          className={cn("relative group", baseClasses)}
        >
          <div className={hoverBg} aria-hidden />
          <Slot.Root
            ref={ref as React.Ref<HTMLButtonElement>}
            className={cn("relative z-10 flex min-w-0 flex-1 items-center gap-2", className)}
            {...props}
          >
            {children}
          </Slot.Root>
        </div>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        data-sidebar="menu-button"
        type="button"
        className={cn("relative group", baseClasses, className)}
        {...props}
      >
        <div className={hoverBg} aria-hidden />
        <span className="relative z-10 flex min-w-0 flex-1 items-center gap-2">
          {children}
        </span>
      </button>
    );
  });

  SidebarTrigger = React.forwardRef<
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
} catch (err) {
  console.error("🔥 MODULE ERROR in SidebarProvider:", err);
  throw err;
}

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
