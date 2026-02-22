import Image from "next/image";

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  href?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  href,
}: ProjectCardProps) {
  const content = (
    <div
      className="overflow-hidden flex flex-col w-full h-full min-h-0 p-4 md:p-8 lg:p-16 gap-4"
      data-project-card-content
    >
      {/* Content box: overlay is positioned relative to this (excludes card padding) */}
      <div className="relative flex flex-col gap-4 flex-1 min-h-0">
        {/* Hover overlay: covers content box only, expands 24px beyond; fade only */}
        <div
          className="absolute -top-[24px] -left-[24px] -right-[24px] -bottom-[24px] z-20 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
          aria-hidden
        />
        <div className="overflow-hidden relative z-10">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>

        <h4 className="text-h4 font-light text-foreground relative z-10">{title}</h4>

        <p className="text-body1 text-foreground relative z-10">{description}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="group block w-full h-full min-h-0 no-underline text-foreground flex flex-col items-stretch"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group block w-full h-full min-h-0 flex flex-col items-stretch">
      {content}
    </div>
  );
}
