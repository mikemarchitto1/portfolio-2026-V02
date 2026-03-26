"use client";

import Tag from "@/components/ui/tag";
import { cn } from "@/lib/utils";

const DEFAULT_TITLE = "Lorem ipsum dolor sit amet consectegtur.";
const DEFAULT_SUBTITLE =
  "Lorem ipsum dolor sit amet consectetur. Sed at tincidunt tempor sagittis erat congue ut rhoncus.";

export type ProjectHeroProps = {
  tags: string[];
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function ProjectHero({
  tags,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  className,
}: ProjectHeroProps) {
  return (
    <section
      className={cn(
        "pt-[17px] md:pt-[33px] lg:pt-[65px] pb-[48px] mb-20 text-left min-w-0",
        className
      )}
    >
      <h1 className="text-h1 font-light tracking-[0] text-foreground min-w-0">
        {title}
      </h1>
      <h4 className="text-h4 text-foreground mt-4 max-w-3xl">
        {subtitle}
      </h4>
      <div
        className="project-hero-metadata mt-[48px] flex flex-row flex-wrap items-center gap-2"
        aria-label="Project metadata"
      >
        {tags.map((label, i) => (
          <Tag key={`${label}-${i}`}>{label}</Tag>
        ))}
      </div>
    </section>
  );
}
