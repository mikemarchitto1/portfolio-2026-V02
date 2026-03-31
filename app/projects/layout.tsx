import type { ReactNode } from "react";

/**
 * Segment layout for all case-study routes under `/projects/*`.
 * Theme normalization (no global "color" mode on these pages) is handled in
 * {@link ThemeProvider} via pathname — this file is the route boundary for future per-project tokens.
 */
export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return children;
}
