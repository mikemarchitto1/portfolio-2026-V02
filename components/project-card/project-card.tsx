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
      className="relative overflow-hidden p-4 md:p-8 lg:p-16 flex flex-1 flex-col gap-0 min-h-[var(--project-card-min-height,0)]"
      data-project-card-content
    >
      {/* Overlay anchored to content container; covers content box + 24px overlap; clipped so does not extend into padding */}
      <div
        className="absolute inset-4 md:inset-8 lg:inset-16 group-hover:inset-[-8px] md:group-hover:inset-[8px] lg:group-hover:inset-[40px] z-20 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
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

      <h4 className="text-h4 font-light text-foreground relative z-10 pt-[17px]">{title}</h4>

      <p className="text-body1 text-foreground relative z-10 pt-[9px]">{description}</p>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="group block w-full no-underline text-foreground flex flex-col min-h-0"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group block w-full flex flex-col min-h-0">
      {content}
    </div>
  );
}
