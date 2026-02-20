import React from "react";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <div>
      <h1>Project: {params.slug}</h1>
      {/* Project Content */}
    </div>
  );
}
