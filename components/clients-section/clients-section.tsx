"use client";

import React from "react";
import ProjectCardFiftyFifty from "@/components/project-card/project-card-fifty-fifty";

export type ClientsSectionProps = {
  projects: Array<{
    title: string;
    description: string;
    image: string;
    href?: string;
  }>;
};

export default function ClientsSection({ projects }: ClientsSectionProps) {
  return (
    <section className="w-full min-w-0 flex flex-col py-12 bg-[oklch(91%_0.08_280)] dark:bg-[oklch(28%_0.07_280)]">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-[1328px] mx-auto flex flex-col min-w-0">
          <div className="w-full min-w-0 px-4 md:px-8 lg:px-16 py-4 mb-0 bg-[oklch(86%_0.11_260)] dark:bg-[oklch(28%_0.09_260)]">
            <h2 className="text-h5 md:text-h4 lg:text-h2 font-light text-left text-foreground m-0 p-0">
              Clients
            </h2>
          </div>

          <div className="w-full min-w-0 flex flex-col p-16 gap-12 bg-[oklch(88%_0.10_120)] dark:bg-[oklch(26%_0.08_120)]">
            {projects.map((project, i) => (
              <ProjectCardFiftyFifty
                key={i}
                title={project.title}
                description={project.description}
                image={project.image}
                href={project.href}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
