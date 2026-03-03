"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Global nav button: dark-mode style (white bg, black text, outline icons)
 * in header and footer across all themes. Use for nav actions and CTAs
 * that should share this consistent look.
 */
function NavButton({
  className,
  variant = "outline",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={variant}
      className={cn("nav-button", className)}
      {...props}
    />
  );
}

export { NavButton };
