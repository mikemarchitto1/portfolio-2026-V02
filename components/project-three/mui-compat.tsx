"use client";

import React from "react";

/**
 * MUI -> Tailwind/CSS compat layer.
 *
 * This is intentionally minimal: it only implements the primitives and prop
 * patterns used by `app/projects/project-{one,two,three}/page.tsx`.
 */

const MUI_SPACING_UNIT_PX = 8;

function toPxIfNumber(val: unknown) {
  return typeof val === "number" ? `${val}px` : undefined;
}

function sxToStyle(sx: Record<string, unknown> | undefined) {
  if (!sx) return undefined;
  const style: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(sx)) {
    if (value === undefined) continue;

    // Translate MUI spacing-ish values (padding/margin keys) using the
    // MUI spacing unit (8px).
    const isPaddingOrMargin =
      key.startsWith("padding") || key.startsWith("margin");

    if (isPaddingOrMargin && typeof value === "number") {
      style[key as any] = value * MUI_SPACING_UNIT_PX;
      continue;
    }

    // Translate certain MUI shorthand keys.
    if (key === "paddingY" && typeof value === "number") {
      style.paddingTop = value * MUI_SPACING_UNIT_PX;
      style.paddingBottom = value * MUI_SPACING_UNIT_PX;
      continue;
    }
    if (key === "paddingX" && typeof value === "number") {
      style.paddingLeft = value * MUI_SPACING_UNIT_PX;
      style.paddingRight = value * MUI_SPACING_UNIT_PX;
      continue;
    }
    if (key === "marginY" && typeof value === "number") {
      style.marginTop = value * MUI_SPACING_UNIT_PX;
      style.marginBottom = value * MUI_SPACING_UNIT_PX;
      continue;
    }
    if (key === "marginX" && typeof value === "number") {
      style.marginLeft = value * MUI_SPACING_UNIT_PX;
      style.marginRight = value * MUI_SPACING_UNIT_PX;
      continue;
    }

    // For plain numeric style properties (e.g. Box height), treat them as px.
    if (typeof value === "number") {
      style[key as any] = value;
      continue;
    }

    style[key as any] = value;
  }

  return style;
}

export function CssBaseline() {
  return null;
}

export function createTheme() {
  return {};
}

export function ThemeProvider({
  children,
}: {
  theme: unknown;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export function Container({
  children,
  className,
  maxWidth: _maxWidth,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { maxWidth?: string }) {
  return (
    <div
      className={`w-full px-4 md:px-8 lg:px-16 ${className ?? ""}`}
      {...rest}
    >
      <div className="max-w-[1328px] mx-auto">{children}</div>
    </div>
  );
}

export function Stack({
  children,
  className,
  sx,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  sx?: Record<string, unknown>;
}) {
  return (
    <div
      className={`flex flex-col ${className ?? ""}`}
      style={sxToStyle(sx)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Box({
  children,
  sx,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  sx?: Record<string, unknown>;
}) {
  return (
    <div
      className={className ?? ""}
      style={sxToStyle(sx)}
      {...rest}
    >
      {children}
    </div>
  );
}

function colSpanClass(span: number | undefined) {
  if (span == null) return "";
  // Tailwind uses 1..12; project code uses 3/4/6/12.
  return `col-span-${span}`;
}

export function Grid({
  container,
  item,
  spacing,
  xs,
  sm,
  md,
  lg,
  sx,
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  container?: boolean;
  item?: boolean;
  spacing?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  sx?: Record<string, unknown>;
}) {
  const style = sxToStyle(sx);

  if (container) {
    const gapPx =
      typeof spacing === "number" ? spacing * MUI_SPACING_UNIT_PX : undefined;
    return (
      <div
        className={`grid grid-cols-12 ${className ?? ""}`}
        style={{ ...(style ?? {}), gap: gapPx }}
        {...rest}
      >
        {children}
      </div>
    );
  }

  if (item) {
    // Note: breakpoints use Tailwind defaults, which are close enough for
    // this project's existing layouts.
    const cls = [
      colSpanClass(xs),
      sm != null ? `sm:${colSpanClass(sm)}` : "",
      md != null ? `md:${colSpanClass(md)}` : "",
      lg != null ? `lg:${colSpanClass(lg)}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={cls} style={style} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-12 ${className ?? ""}`} style={style} {...rest}>
      {children}
    </div>
  );
}

export function Typography({
  variant,
  component,
  color,
  className,
  children,
  sx,
  mb,
  mt,
  ...rest
}: {
  variant?: string;
  component?: keyof HTMLElementTagNameMap;
  color?: string;
  className?: string;
  children?: React.ReactNode;
  sx?: Record<string, unknown>;
  mb?: number;
  mt?: number;
} & React.HTMLAttributes<HTMLElement>) {
  const Tag = (component ?? "div") as keyof HTMLElementTagNameMap;

  // Best-effort mapping to your app's global type scale.
  const variantClass =
    variant === "h1" || variant === "h2"
      ? "text-h2"
      : variant === "h3"
        ? "text-h3"
        : variant === "h4"
          ? "text-h4"
          : variant === "h6"
            ? "text-h6"
            : variant === "subtitle1"
              ? "text-subtitle1"
              : variant === "subtitle2"
                ? "text-subtitle2"
                : variant === "body1"
                  ? "text-body1"
                  : variant === "body2"
                    ? "text-body2"
                    : "";

  const colorClass =
    color === "text.primary" ? "text-foreground" : "";

  const style: React.CSSProperties = {
    ...(sxToStyle(sx) as React.CSSProperties | undefined),
    ...(typeof mb === "number"
      ? { marginBottom: mb * MUI_SPACING_UNIT_PX }
      : null),
    ...(typeof mt === "number"
      ? { marginTop: mt * MUI_SPACING_UNIT_PX }
      : null),
  };

  // If the caller provides their own className (your top title does), it
  // should win visually.
  const mergedClass = [variantClass, colorClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={mergedClass} style={style} {...rest}>
      {children}
    </Tag>
  );
}

