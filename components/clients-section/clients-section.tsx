"use client";

import React from "react";
import ProjectCard from "@/components/project-card/project-card";

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
    <section className="w-full min-w-0 flex flex-col py-6 md:py-9 lg:py-12 bg-transparent">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-[1328px] mx-auto flex flex-col min-w-0">
          <div className="w-full min-w-0 px-0 lg:px-16 py-4 mb-0 bg-transparent">
            <h1 className="text-h2 font-light text-left text-foreground m-0 p-0">
              Clients
            </h1>
          </div>

          <div className="w-full min-w-0 flex flex-col py-4 md:py-8 lg:py-16 px-0 lg:px-16 gap-8 md:gap-16 lg:gap-[240px] bg-transparent">
            {projects.map((project, i) => (
              <ProjectCard
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
