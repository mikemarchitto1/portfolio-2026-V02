"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card/project-card";
import HeroHeadline from "@/components/hero-headline/hero-headline";

/* ---------------------------------------------
   FOOTER
---------------------------------------------- */
function Footer() {
  return (
    <footer className="p-4 md:p-8 lg:p-16 bg-violet-50 text-black">
      <div className="w-full max-w-[1200px] mx-auto text-left flex flex-col">
        <h1 className="text-h1 font-light text-black">Let’s Connect</h1>

        <h4 className="text-h4 max-w-[50%] font-light text-black pt-3 pb-16">
          If you like building meaningful things, I'm open to creative partnerships.
        </h4>

        <div className="flex flex-col sm:flex-row justify-start gap-3">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-black text-black hover:bg-black/10 hover:text-black"
            asChild
          >
            <a href="mailto:hello@carlwalker.com">Email Mike</a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-black text-black hover:bg-black/10 hover:text-black"
            asChild
          >
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-black text-black hover:bg-black/10 hover:text-black"
            asChild
          >
            <a
              href="https://linkedin.com/in/carlwalker"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------
   METRICS
---------------------------------------------- */
const metrics = [
  { value: "10", label: "Years Working" },
  { value: "4", label: "Launches" },
  { value: "350", label: "Testing Hours" },
  { value: "3", label: "AI Experiments" },
];

/* ---------------------------------------------
   PROJECTS
---------------------------------------------- */
const projects = [
  {
    title: "Nutrilucent",
    description:
      "Created an internal research repository by leading end-to-end UX work from foundation of research through UI design and agile handoff.",
    image: "/images/thumb-small-nutrilucent.png",
    href: "/nutrilucent",
  },
  {
    title: "GloriFi",
    description:
      "Redesigned website with custom iconography, product focused visuals, and a more intuitive shopping experience.",
    image: "/images/thumb-small-glorifi.png",
    href: "/glorifi",
  },
  {
    title: "National Restaurant Association",
    description:
      "Created an internal research repository by leading end-to-end UX work from foundation of research through UI design and agile handoff.",
    image: "/images/thumb-small-nationalrestaurantassociation.png",
    href: "/nra",
  },
  {
    title: "Microsoft Admin Software",
    description:
      "Redesigned website with custom iconography, product focused visuals, and a more intuitive shopping experience.",
    image: "/images/thumb-small-microsoftadmin.png",
    href: "/microsoft-admin",
  },
  {
    title: "Microsoft Hits Software",
    description:
      "Redesigned website with custom iconography, product focused visuals, and a more intuitive shopping experience.",
    image: "/images/thumb-small-microsofthits.png",
    href: "/microsoft-hits",
  },
  {
    title: "Eddie Bauer",
    description:
      "Created an internal research repository by leading end-to-end UX work from foundation of research through UI design and agile handoff.",
    image: "/images/thumb-small-eddiebauer.png",
    href: "/eddiebauer",
  },
];

/* ---------------------------------------------
   PROJECTS GRID — responsive grid; cards use natural height, no stretch
---------------------------------------------- */
function ProjectsGrid({
  projects,
}: {
  projects: Array<{
    title: string;
    description: string;
    image: string;
    href?: string;
  }>;
}) {
  return (
    <div
      className="w-full h-full min-h-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 m-0 p-0 items-stretch auto-rows-fr"
    >
      {projects.map((project, i) => (
        <ProjectCard
          key={i}
          title={project.title}
          description={project.description}
          image={project.image}
          href={project.href}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------
   PAGE
---------------------------------------------- */
export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroHeadline />

        {/* HERO BODY */}
        <section className="p-4 md:p-8 lg:p-16 bg-yellow-50">
          <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-start">
            <div className="max-w-xl">
              <div>
                <h2 className="text-h2 font-light pb-5">About me</h2>
              </div>

              <div className="space-y-5 text-body1">
                <p>
                  I’m originally from Chicago, where I studied graphic design at UIC—a program rooted in Swiss and International design principles. That foundation shaped my early work in marketing and communications, where I developed a strong sense of visual design and story telling. I’ve always been drawn to typography, simple communication, and design that’s useful.
                </p>
                <p>
                  After relocating to Seattle, I moved into UX, drawn to digital design and the need for better product experiences. Over the years, I've worked across corporations, agencies, and startups—advocating for user‑centered design. I'm recently exploring how AI is reshaping creative work through automation, prototyping, and collaboration.
                </p>
                <p>
                  Currently based in Miami, I’m a cyclist and outdoors enthusiast who finds peace on the trail. Time outside helps reset and balance my life. Whether riding through city streets or remote gravel paths, I’m always looking for great scenic routes to the next bike camping destination.
                </p>
              </div>
            </div>

            <div className="w-full">
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src="/images/profile-king-1.png"
                  alt="Mike profile"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="pt-6">
                <blockquote className="text-foreground text-center font-normal">
                  <p className="italic text-body2">&ldquo;A king is a man who turns hope into action.&rdquo;</p>
                  <cite className="not-italic pt-2 block text-body2">&mdash; Ralph Waldo Emerson</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="p-4 md:p-8 lg:p-16 bg-pink-50">
          <div className="w-full max-w-[1200px] mx-auto">
            <div className="pb-8">
              <h2 className="text-h2 font-light">
                Experience
              </h2>
            </div>
            {/* Column subtitles — body2 all caps; column spans match content below for flush alignment */}
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-8 lg:gap-x-12 pb-4 text-body2 !font-medium uppercase text-foreground">
              <span className="col-span-1 md:col-span-2 lg:col-span-3">TENURE</span>
              <span className="col-span-1 md:col-span-2 lg:col-span-3">OUTPUT</span>
              <span className="col-span-1 md:col-span-2 lg:col-span-2">DESIGN</span>
              <span className="col-span-1 md:col-span-1 lg:col-span-2">DEVELOPMENT</span>
              <span className="col-span-1 md:col-span-1 lg:col-span-2">INFRASTRUCTURE</span>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-8 lg:gap-x-12 gap-y-6 items-stretch">
              {/* NUMERIC ROWS — vertical alignment anchor for logos */}
              <div className="numbers-anchor col-span-4 md:col-span-4 lg:col-span-6 h-full">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 md:gap-x-8 lg:gap-x-12 gap-y-3 md:gap-y-5 lg:gap-y-5 min-w-0">
                  {metrics.map((metric, i) => (
                    <div key={i} className="col-span-1 md:col-span-2 lg:col-span-3">
                      <div className="text-h1 font-light -mb-1">
                        {metric.value === "10" ? (
                          <span className="tracking-[-0.04em]">10</span>
                        ) : (
                          metric.value
                        )}
                      </div>
                      <div className="text-h4 font-normal text-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LOGOS — top aligns with .numbers-anchor; h-full matches left column height; offset down 64px */}
              <div className="col-span-4 md:col-span-4 lg:col-span-6 h-full pt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 md:gap-x-8 lg:gap-x-12 gap-y-[26px] md:gap-y-[34px] lg:gap-y-[34px] min-w-0 content-start items-center">
                {/* Row 1: Figma, Cursor, OpenAI */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-figma.svg"
                    alt="Figma"
                    className="w-[97px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-cursor.svg"
                    alt="Cursor"
                    className="w-[112px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-openai.svg"
                    alt="OpenAI"
                    className="w-[104px] h-auto object-contain object-left"
                  />
                </div>
                {/* Row 2: Webflow, Next.js, Claude */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-webflow.svg"
                    alt="Webflow"
                    className="w-[122px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-next.svg"
                    alt="Next.js"
                    className="w-[90px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-claude.svg"
                    alt="Claude"
                    className="w-[109px] h-auto object-contain object-left"
                  />
                </div>
                {/* Row 3: Shopify, TailwindCSS, Hugging Face */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-shopify.svg"
                    alt="Shopify"
                    className="w-[106px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-tailwindcss.svg"
                    alt="Tailwind CSS"
                    className="w-[154px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-huggingface.svg"
                    alt="Hugging Face"
                    className="w-[151px] h-auto object-contain object-left"
                  />
                </div>
                {/* Row 4: n8n, Github, Vercel */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-n8n.svg"
                    alt="n8n"
                    className="w-[102px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-github.svg"
                    alt="GitHub"
                    className="w-[103px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-vercel.svg"
                    alt="Vercel"
                    className="w-[97px] h-auto object-contain object-left"
                  />
                </div>
                {/* Row 5: Material+Fluent, React+TS+shadcn, Ollama+OpenRouter */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 flex items-center gap-x-[28px]">
                  <img
                    src="/images/logo-material.svg"
                    alt="Material UI"
                    className="w-[32px] h-auto object-contain object-left"
                  />
                  <img
                    src="/images/logo-fluent.svg"
                    alt="Fluent UI"
                    className="w-[15px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2 flex items-center gap-x-[28px]">
                  <img
                    src="/images/logo-react.svg"
                    alt="React"
                    className="w-[38px] h-auto object-contain object-left"
                  />
                  <img
                    src="/images/logo-typescript.svg"
                    alt="TypeScript"
                    className="w-[29px] h-auto object-contain object-left"
                  />
                  <img
                    src="/images/logo-shadcn.svg"
                    alt="Shadcn UI"
                    className="w-[24px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2 flex items-center gap-x-[28px]">
                  <img
                    src="/images/logo-ollama.svg"
                    alt="Ollama"
                    className="w-[24px] h-auto object-contain object-left"
                  />
                  <img
                    src="/images/logo-openrouter.svg"
                    alt="OpenRouter"
                    className="w-[24px] h-auto object-contain object-left"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT CARDS — section fills viewport height; cards stretch to fill */}
        <section className="bg-[#B0A3FF] m-0 p-0 min-h-screen flex flex-col">
          <h2 className="text-body2 !font-medium uppercase text-foreground pl-4 md:pl-8 lg:pl-16 pr-4 md:pr-8 lg:pr-16 pt-0 pb-0 -mb-6 flex-none">
            PROJECTS
          </h2>
          <div className="w-full m-0 p-0 flex-1 min-h-0">
            <ProjectsGrid projects={projects} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
