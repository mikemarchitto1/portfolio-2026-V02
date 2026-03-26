"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  href?: string;
  /** Default: side-by-side on md+ (home). `vertical`: image on top, copy + CTA below (case study “Next project”). */
  layout?: "horizontal" | "vertical";
};

export default function ProjectCard({
  title,
  description,
  image,
  href,
  layout = "horizontal",
}: ProjectCardProps) {
  const imageArea = (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[oklch(100%_0_0)]",
        layout === "vertical"
          ? "min-h-[240px] aspect-[16/10] shrink-0 rounded-t-2xl"
          : "h-full min-h-[240px] md:min-h-[320px] rounded-t-2xl md:rounded-t-none md:rounded-l-2xl",
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );

  const textCard = (
    <Card
      className={cn(
        "flex flex-col justify-center overflow-hidden bg-[oklch(100%_0_0)] border-0 shadow-none p-0 gap-0",
        layout === "vertical"
          ? "rounded-b-2xl rounded-t-none"
          : "rounded-b-2xl md:rounded-b-none md:rounded-r-2xl",
      )}
    >
      <CardContent
        className={cn(
          "flex flex-col justify-center text-left bg-[oklch(100%_0_0)]",
          layout === "vertical" ? "p-4 md:p-8" : "p-4 md:p-8 lg:p-16",
        )}
      >
        <h4 className="text-h4 text-[oklch(0%_0_0)] m-0 mb-2">{title}</h4>

        <p className="text-body1 text-[oklch(0%_0_0)] m-0 mb-8">{description}</p>

        <Button
          variant="black"
          size="lg"
          className="project-card-cta w-fit rounded-full"
          asChild
        >
          {href ? (
            <a href={href} className="text-button">
              See Case Study
            </a>
          ) : (
            <span className="text-button">See Case Study</span>
          )}
        </Button>
      </CardContent>
    </Card>
  );

  if (layout === "vertical") {
    return (
      <div className="w-full min-w-0 rounded-2xl overflow-hidden bg-[oklch(100%_0_0)] flex flex-col">
        {imageArea}
        {textCard}
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="w-full min-w-0 grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-0 md:min-h-[448px] rounded-2xl overflow-hidden bg-[oklch(100%_0_0)]">
        {imageArea}
        {textCard}
      </div>
    </div>
  );
}
