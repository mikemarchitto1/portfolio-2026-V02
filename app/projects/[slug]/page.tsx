import React from "react";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <div className="w-full min-w-0 max-w-[1328px] mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-16 lg:py-24">
      <h1>Project: {params.slug}</h1>
      {/* Project Content */}
    </div>
  );
}
