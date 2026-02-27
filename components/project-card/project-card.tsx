import Image from "next/image";
import { Button } from "@/components/ui/button";

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
      className={`overflow-hidden rounded-2xl shadow-elevation flex flex-col flex-1 min-h-0 w-full p-[64px] ${className ?? "bg-white"}`}
      data-project-card-content
    >
      <div className="inner-card group flex flex-col gap-0 flex-1 min-h-0 items-center text-center">
        <div className="flex flex-col flex-1 min-h-0 items-center text-center w-full">
          <div className="relative overflow-hidden shrink-0 w-full">
            <div
              className="absolute inset-0 z-20 bg-foreground/5 opacity-0 transition-opacity duration-200 ease-out pointer-events-none group-hover:opacity-100 dark:bg-black/5 color:bg-black/5"
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

          <h5 className={`text-h5 font-medium text-foreground dark:text-black color:text-black mt-[16px] shrink-0 ${titleClassName ?? ""}`}>{title}</h5>

          <p className={`text-body1 text-foreground dark:text-black color:text-black mt-[8px] flex-1 min-h-0 ${descriptionClassName ?? ""}`}>{description}</p>
        </div>

        <Button
          asChild
          variant="default"
          size="lg"
          className="mt-6 w-fit shrink-0 bg-foreground text-background hover:bg-gray-800 transition-colors duration-200 dark:bg-black dark:text-white dark:hover:bg-gray-800 color:bg-[#4A1F7A] color:text-white color:hover:bg-[#4A1F7A]/90"
        >
          <span>See Case Study</span>
        </Button>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block w-full min-w-0 h-full min-h-0 no-underline text-foreground dark:text-black color:text-black flex flex-col items-stretch"
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
