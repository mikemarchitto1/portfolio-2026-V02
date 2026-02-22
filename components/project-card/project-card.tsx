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
    <div className="relative overflow-hidden p-[16px] md:p-[32px] lg:p-[64px] flex flex-col gap-4 m-0">
      <div
        className="absolute -inset-[8px] md:inset-[8px] lg:inset-[40px] z-20 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
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
        className="group block w-full m-0 no-underline text-foreground"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group block w-full m-0">
      {content}
    </div>
  );
}
