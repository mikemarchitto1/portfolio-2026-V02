import type { Theme } from "@/lib/theme-types";

export const PROJECTS_ROUTE_PREFIX = "/projects";
export const NUTRILUCENT_ROUTE_PREFIX = "/nutrilucent";

/** Case-study routes: `/projects`, `/projects/...` — neutral only (no global color mode). */
export function isProjectsRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return (
    pathname === PROJECTS_ROUTE_PREFIX ||
    pathname.startsWith(`${PROJECTS_ROUTE_PREFIX}/`)
  );
}

function isNutrilucentRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  return pathname === NUTRILUCENT_ROUTE_PREFIX;
}

function isNeutralCaseStudyRoute(pathname: string | null | undefined): boolean {
  return isProjectsRoute(pathname) || isNutrilucentRoute(pathname);
}

/**
 * User preference + pathname → theme applied on `<html>` and for UI that must match paint.
 * On `/projects/*`, `color` is treated as `light` so case studies never use the color palette.
 */
export function resolveThemeForRoute(
  preference: Theme,
  pathname: string | null | undefined
): Theme {
  if (!isNeutralCaseStudyRoute(pathname)) return preference;
  if (preference === "color") return "light";
  return preference;
}
