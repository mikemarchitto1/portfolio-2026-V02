import Image from "next/image";

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  href?: string;
  className?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  href,
  className,
}: ProjectCardProps) {
  const content = (
    <div
      className={`overflow-hidden flex flex-col w-full h-full min-h-0 p-4 md:p-8 lg:p-16 gap-4 ${className ?? "bg-transparent"}`}
      data-project-card-content
    >
      {/* Content box: overlay + group hover trigger (hover only when mouse is on content) */}
      <div className="group relative flex flex-col gap-4 flex-1 min-h-0">
        {/* Hover overlay: starts flush (inset-0), expands 24px on hover; inset + opacity only */}
        <div
          className="absolute inset-0 z-20 bg-black/5 opacity-0 transition-all duration-200 ease-out pointer-events-none group-hover:opacity-100 group-hover:-top-[24px] group-hover:-left-[24px] group-hover:-right-[24px] group-hover:-bottom-[24px]"
          aria-hidden
        />
        <div className="overflow-hidden relative z-10">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={800}
            className="w-full h-auto object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
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
        className="block w-full h-full min-h-0 no-underline text-foreground flex flex-col items-stretch"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="block w-full h-full min-h-0 flex flex-col items-stretch">
      {content}
    </div>
  );
}
