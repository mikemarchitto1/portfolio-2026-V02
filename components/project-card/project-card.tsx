"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProjectCard({
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
    <div className="w-full min-w-0 grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-0 md:min-h-[448px] rounded-2xl overflow-hidden shadow-elevation bg-white dark:bg-zinc-900">
      <div className="relative w-full h-full min-h-[240px] md:min-h-[320px] overflow-hidden rounded-t-2xl md:rounded-t-none md:rounded-l-2xl bg-white dark:bg-zinc-900">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <Card className="flex flex-col justify-center overflow-hidden rounded-b-2xl md:rounded-b-none md:rounded-r-2xl bg-white border-0 shadow-none p-0 gap-0">
        <CardContent className="flex flex-col justify-center p-4 md:p-8 lg:p-16 text-left">
          <h3 className="text-h4 text-black m-0 mb-2">
            {title}
          </h3>

          <p className="text-body1 text-black m-0 mb-8">
            {description}
          </p>

          <Button
            variant="outline"
            size="lg"
            className="project-card-cta w-fit rounded-full border border-black text-black hover:bg-black/[0.06]"
            asChild
          >
            {href ? <a href={href}>See Case Study</a> : <span>See Case Study</span>}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return <div className="w-full min-w-0">{content}</div>;
}
