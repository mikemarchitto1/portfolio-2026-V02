import Image from "next/image";

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  href?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  href,
  className,
  titleClassName,
  descriptionClassName,
}: ProjectCardProps) {
  const content = (
    <div
      className={`overflow-hidden flex flex-col flex-1 min-h-0 w-full p-[64px] ${className ?? "bg-transparent"}`}
      data-project-card-content
    >
      <div className="inner-card group flex flex-col gap-0 flex-1 min-h-0">
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 z-20 bg-foreground/5 opacity-0 transition-opacity duration-200 ease-out pointer-events-none group-hover:opacity-100"
            aria-hidden
          />
          <Image
            src={image}
            alt={title}
            width={1200}
            height={800}
            className="w-full h-auto object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
          />
        </div>

        <h5 className={`text-h5 font-medium text-foreground mt-[16px] ${titleClassName ?? ""}`}>{title}</h5>

        <p className={`text-body1 text-foreground mt-[8px] ${descriptionClassName ?? ""}`}>{description}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block w-full min-w-0 h-full min-h-0 no-underline text-foreground flex flex-col items-stretch"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="block w-full min-w-0 h-full min-h-0 flex flex-col items-stretch">
      {content}
    </div>
  );
}
