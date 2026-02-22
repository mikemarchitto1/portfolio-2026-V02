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
      className="relative overflow-hidden flex flex-col w-full h-full min-h-0 p-4 md:p-8 lg:p-16 gap-4 bg-white"
      data-project-card-content
    >
      {/* Overlay anchored to content container; clipped to padding */}
      <div
        className="absolute inset-4 md:inset-8 lg:inset-16 z-20 group-hover:inset-[-8px] md:group-hover:inset-2 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
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
