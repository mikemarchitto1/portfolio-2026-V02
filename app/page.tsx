"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card/project-card";
import HeroHeadline from "@/components/hero-headline/hero-headline";

/* ---------------------------------------------
   BACKGROUND COLORS TOGGLE
   Set to true to show design/debug background colors on containers.
   Prompt "turn background colors on" → true, "turn background colors off" → false.
---------------------------------------------- */
const SHOW_BACKGROUND_COLORS = false;
const bg = (hex: string) => (SHOW_BACKGROUND_COLORS ? `bg-[${hex}]` : "");

/* ---------------------------------------------
   FOOTER
---------------------------------------------- */
function Footer() {
  return (
    <footer className="p-4 md:p-8 lg:p-16 text-foreground w-screen max-w-none ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)]">
      <div className="w-full max-w-[1200px] mx-auto text-left flex flex-col">
        <div className={bg("#e0f2f7")}>
          <h1 className="text-h1 font-light text-foreground">Let’s Connect</h1>
        </div>

        <div className={bg("#fef9c3")}>
          <h5 className="text-h5 max-w-[528px] font-light text-foreground">
          I'm interested in creative partnerships shaped by purposeful work.
          </h5>
        </div>

        <div className={`flex flex-col sm:flex-row justify-start gap-3 ${bg("#f9e2f9")} mt-16`}>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-foreground text-foreground hover:bg-foreground/[0.02] hover:text-foreground"
            asChild
          >
            <a href="mailto:hello@carlwalker.com">Email Mike</a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-foreground text-foreground hover:bg-foreground/[0.02] hover:text-foreground"
            asChild
          >
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-foreground text-foreground hover:bg-foreground/[0.02] hover:text-foreground"
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
  { value: "4", label: "Product Builds" },
  { value: "350", label: "Testing Hours" },
  { value: "3", label: "AI Explorations" },
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
      className="w-full min-w-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 items-stretch"
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
        <HeroHeadline showBackgroundColors={SHOW_BACKGROUND_COLORS} />

        {/* HERO BODY — full bleed: no horizontal padding so both columns touch viewport edges */}
        <section className="px-0">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <div className="w-full min-w-0 p-16 text-foreground">
              <div className={`${bg("#e0f2f7")} mb-[40px]`}>
                <h2 className="text-h2 font-light text-foreground">About Me</h2>
              </div>
              <div className="text-body1 space-y-4 text-foreground">
                <p className={bg("#fef9c3")}>
                  I’m originally from Chicago, where I studied graphic design at UIC—a program rooted in Swiss and International design principles. That foundation shaped my early work in marketing and communications, where I developed a strong sense of visual design and story telling. I've always been drawn to typography, simple communication, and design that's useful.
                </p>
                <p className={bg("#f9e2f9")}>
                  After relocating to Seattle, I moved into UX, drawn to digital design and the need for better product experiences. Over the years, I’ve worked across corporations, agencies, and startups—advocating for user‑centered design. I'm recently exploring how AI is reshaping creative work through automation, prototyping, and collaboration.
                </p>
                <p className={bg("#e0e7ff")}>
                  Currently based in Miami, I’m a cyclist and outdoors enthusiast who finds peace on the trail. Time outside helps reset and balance my life. Whether riding through city streets or remote gravel paths, I’m always looking for great scenic routes to the next bike camping destination.
                </p>
              </div>
            </div>

            <div className="w-full min-w-0 p-16">
              <div className="relative w-full aspect-square overflow-hidden rounded-lg pt-16">
                <Image
                  src="/images/profile-king-1.png"
                  alt="Mike profile"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <blockquote className="mt-6 text-body2 text-foreground font-light text-center">
                <p className="italic">&ldquo;A king is a man who turns hope into action.&rdquo;</p>
                <cite className="not-italic mt-2 block text-foreground/80">— Ralph Waldo Emerson</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* EXPERIENCE — full width, 50/50 grid so Tools aligns flush with hero image left edge; no top/bottom padding so flush with hero and Projects */}
        <section className="pb-0 pt-0 px-0">
          <div className="w-full grid grid-cols-2 gap-0">
            {/* Experience module — column stretches to match Tech Stack; metadata box fills and adds space at bottom */}
            <div className="p-16 text-black flex flex-col min-h-0">
              <div className="mb-[28px]">
                <h2 className="text-h2 font-light text-left text-inherit">
                  Impact Metrics
                </h2>
              </div>
              <div className="numbers-anchor bg-black text-white pt-[28px] px-[48px] pb-[48px] rounded-lg w-full mt-5 flex-1 min-h-0 flex flex-col">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-0 min-w-0 justify-items-center items-start">
                  {metrics.map((metric, i) => (
                    <div key={i} className={`col-span-1 md:col-span-2 lg:col-span-3 text-center ${i < 2 ? "mb-8" : ""}`}>
                      <div className="text-h1 font-light -mb-1 !py-0 text-inherit">
                        {metric.value === "10" ? (
                          <span className="tracking-[-0.04em]">10</span>
                        ) : (
                          metric.value
                        )}
                      </div>
                      <div className="text-h5 font-normal text-inherit">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools module */}
            <div className="p-16 text-foreground flex flex-col min-h-0">
              <div className={`${bg("#fef9c3")} py-0 mb-7`}>
                <h2 className="text-h2 font-light text-left py-0 text-foreground">
                  Tech Stack
                </h2>
              </div>
              <div className="bg-white p-4 md:p-8 lg:p-12 rounded-lg w-full mt-5 flex-1 min-h-0 flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <div className="grid w-max max-w-full mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[40px] gap-y-[40px] grid-auto-rows-[80px] items-stretch content-start">
                {/* Row 1: Figma, Cursor, OpenAI */}
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-figma.svg"
                    alt="Figma"
                    className="w-[86px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-cursor.svg"
                    alt="Cursor"
                    className="w-[94px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-openai.svg"
                    alt="OpenAI"
                    className="w-[88px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                {/* Row 2: Webflow, Next.js, Claude */}
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-webflow.svg"
                    alt="Webflow"
                    className="w-[112px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-next.svg"
                    alt="Next.js"
                    className="w-[80px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-claude.svg"
                    alt="Claude"
                    className="w-[94px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                {/* Row 3: Shopify, Framer, Adobe — extra 2px above for spacing */}
                <div className="flex h-full w-full items-center justify-center mt-0.5">
                  <img
                    src="/images/logo-shopify.svg"
                    alt="Shopify"
                    className="w-[90px] h-auto object-contain object-center shrink-0 -translate-y-[4px]"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center mt-0.5">
                  <img
                    src="/images/logo-framer.svg"
                    alt="Framer"
                    className="w-[88px] h-auto object-contain object-center shrink-0 -translate-y-[2px]"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center mt-0.5">
                  <img
                    src="/images/logo-adobe.svg"
                    alt="Adobe"
                    className="w-[62px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                {/* Row 4: n8n, Github, Vercel */}
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-n8n.svg"
                    alt="n8n"
                    className="w-[82px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-github.svg"
                    alt="GitHub"
                    className="w-[86px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-vercel.svg"
                    alt="Vercel"
                    className="w-[82px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                {/* Last row: col 1 = Material+Fluent+Tailwind, col 2 = React+TS+shadcn, col 3 = Ollama+OpenRouter+Hugging Face */}
                <div className="flex h-full w-full items-center justify-center gap-x-[16px]">
                  <img
                    src="/images/logo-material.svg"
                    alt="Material UI"
                    className="w-[24px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-fluent.svg"
                    alt="Fluent UI"
                    className="w-[14px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-tailwindcss.svg"
                    alt="Tailwind CSS"
                    className="w-[26px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center gap-x-[16px]">
                  <img
                    src="/images/logo-react.svg"
                    alt="React"
                    className="w-[28px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-typescript.svg"
                    alt="TypeScript"
                    className="w-[24px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-shadcn.svg"
                    alt="Shadcn UI"
                    className="w-[22px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center gap-x-[16px]">
                  <img
                    src="/images/logo-ollama.svg"
                    alt="Ollama"
                    className="w-[18px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-openrouter.svg"
                    alt="OpenRouter"
                    className="w-[20px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-huggingface.svg"
                    alt="Hugging Face"
                    className="w-[32px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT CARDS — lightened grey */}
        <section className="flex flex-col pt-[64px]">
          <div className="w-full flex flex-col min-w-0">
            <h2 className="text-h2 font-light text-left text-foreground px-[64px]">Projects</h2>
            <ProjectsGrid projects={projects} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
