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
    <section className="w-full min-w-0 flex flex-col py-12 bg-transparent">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-[1328px] mx-auto flex flex-col min-w-0">
          <div className="w-full min-w-0 px-4 md:px-8 lg:px-16 py-4 mb-0 bg-transparent">
            <h2 className="text-h5 md:text-h4 lg:text-h2 font-light text-left text-foreground m-0 p-0">
              Clients
            </h2>
          </div>

          <div className="w-full min-w-0 flex flex-col p-16 gap-[240px] bg-transparent">
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
