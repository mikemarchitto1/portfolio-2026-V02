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
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={1200}
          height={800}
          className="w-full h-auto object-cover"
        />
      </div>

      <h4 className="text-h4 font-light text-foreground">{title}</h4>

      <p className="text-body1 text-foreground">{description}</p>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block no-underline text-foreground hover:opacity-90 transition-opacity"
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}
