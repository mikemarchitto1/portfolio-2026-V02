"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProjectCardFiftyFifty({
  title,
  description,
  image,
  href,
}: {
  title: string;
  description: string;
  image: string;
  href?: string;
}) {
  const content = (
    <div className="w-full min-w-0 p-4 md:p-8 lg:p-16 bg-[oklch(88%_0.10_120)] dark:bg-[oklch(26%_0.08_120)]">
      <div className="w-full min-w-0 grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-0 md:min-h-[448px] rounded-2xl overflow-hidden shadow-elevation">

        <div className="relative w-full h-full min-h-[240px] md:min-h-[320px] overflow-hidden rounded-t-2xl md:rounded-t-none md:rounded-l-2xl bg-[oklch(86%_0.09_210)] dark:bg-[oklch(24%_0.07_210)]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center overflow-hidden rounded-b-2xl md:rounded-b-none md:rounded-r-2xl bg-[oklch(88%_0.11_340)] dark:bg-[oklch(26%_0.09_340)] p-4 md:p-8 lg:p-16 text-left">
          <h3 className="text-h6 md:text-h5 font-medium text-foreground m-0 mb-2">
            {title}
          </h3>

          <p className="text-body1 text-foreground m-0 mb-8">
            {description}
          </p>

          <Button
            variant="outline"
            size="lg"
            className="project-card-cta w-fit rounded-full border border-foreground text-foreground hover:bg-foreground/[0.02]"
            asChild
          >
            {href ? <a href={href}>See Case Study</a> : <span>See Case Study</span>}
          </Button>
        </div>

      </div>
    </div>
  );

  return <div className="w-full min-w-0">{content}</div>;
}
