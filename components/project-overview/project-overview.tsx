"use client";

import { cn } from "@/lib/utils";

const DEFAULT_INTRO =
  "Lorem ipsum dolor sit amet consectetur. Sed at tincidunt tempor sagittis erat congue ut rhoncus.";

export type ProjectOverviewProps = {
  situation: string;
  task: string;
  result: string;
  intro?: string;
  className?: string;
};

export default function ProjectOverview({
  situation,
  task,
  result,
  intro = DEFAULT_INTRO,
  className,
}: ProjectOverviewProps) {
  return (
    <section className={cn("w-full pt-12 text-left min-w-0", className)}>
      <h2 className="text-h2 font-light text-foreground">Overview</h2>
      <h4 className="text-h4 text-foreground mt-4 max-w-4xl">{intro}</h4>
      <div className="mt-10 md:mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-12">
        <div className="min-w-0">
          <h3 className="text-h3 text-foreground mb-3">Situation</h3>
          <p className="text-body1 text-foreground">{situation}</p>
        </div>
        <div className="min-w-0">
          <h3 className="text-h3 text-foreground mb-3">Task</h3>
          <p className="text-body1 text-foreground">{task}</p>
        </div>
        <div className="min-w-0">
          <h3 className="text-h3 text-foreground mb-3">Result</h3>
          <p className="text-body1 text-foreground">{result}</p>
        </div>
      </div>
    </section>
  );
}
