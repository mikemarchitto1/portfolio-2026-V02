"use client";

import { cn } from "@/lib/utils";

const DEFAULT_INTRO =
  "Lorem ipsum dolor sit amet consectetur. Sed at tincidunt tempor sagittis erat congue ut rhoncus.";

export type ProjectSectionHeaderProps = {
  title: string;
  intro?: string;
  className?: string;
};

/** H2 + H4 block matching the Overview section lead pattern. */
export default function ProjectSectionHeader({
  title,
  intro = DEFAULT_INTRO,
  className,
}: ProjectSectionHeaderProps) {
  return (
    <div className={cn("w-full text-left min-w-0", className)}>
      <h2 className="text-h2 font-light text-foreground">{title}</h2>
      <h4 className="text-h4 text-foreground mt-4 max-w-4xl">{intro}</h4>
    </div>
  );
}
