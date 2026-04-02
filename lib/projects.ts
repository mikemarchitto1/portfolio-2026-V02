export type SidebarProjectItem = {
  label: string;
  /** When omitted, the row is display-only (no navigation). */
  href?: string;
};

export const SIDEBAR_PROJECTS: SidebarProjectItem[] = [
  { label: "Nutrilucent", href: "/nutrilucent" },
  { label: "GloriFi", href: "/projects/project-one" },
  { label: "ServSafe" },
  { label: "Microsoft Hits", href: "/projects/project-two" },
  { label: "Eddie Bauer", href: "/projects/project-three" },
];
