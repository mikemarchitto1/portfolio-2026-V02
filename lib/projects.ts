export type SidebarProjectItem = {
  label: string;
  /** When omitted, the row is display-only (no navigation). */
  href?: string;
};

export const SIDEBAR_PROJECTS: SidebarProjectItem[] = [
  { label: "Nutrilucent", href: "/projects/nutrilucent" },
  { label: "GloriFi", href: "/projects/glorifi" },
  { label: "ServSafe", href: "/projects/servsafe" },
  { label: "Microsoft Hits", href: "/projects/microsofthits" },
  { label: "Eddie Bauer", href: "/projects/eddiebauer" },
];
