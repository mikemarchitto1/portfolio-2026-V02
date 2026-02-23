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
    <footer className="p-4 md:p-8 lg:p-16 text-black bg-[#e6e6e6]">
      <div className="w-full max-w-[1200px] mx-auto text-left flex flex-col">
        <div className={bg("#e0f2f7")}>
          <h1 className="text-h1 font-light text-black">Let’s Connect</h1>
        </div>

        <div className={bg("#fef9c3")}>
          <h4 className="text-h4 max-w-[720px] font-light text-black">
          I'm interested in creative partnerships that are grounded in meaningful work.
          </h4>
        </div>

        <div className={`flex flex-col sm:flex-row justify-start gap-3 ${bg("#f9e2f9")} mt-16`}>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-black text-black hover:bg-black/[0.02] hover:text-black"
            asChild
          >
            <a href="mailto:hello@carlwalker.com">Email Mike</a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-black text-black hover:bg-black/[0.02] hover:text-black"
            asChild
          >
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-black text-black hover:bg-black/[0.02] hover:text-black"
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
  { value: "10", label: "Working Years" },
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
      className="w-full h-full min-h-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 m-0 p-0 items-stretch auto-rows-fr"
    >
      {projects.map((project, i) => (
        <ProjectCard
          key={i}
          title={project.title}
          description={project.description}
          image={project.image}
          href={project.href}
          className={SHOW_BACKGROUND_COLORS ? ["bg-[#e0f2f7]", "bg-[#faf5ff]", "bg-[#fef9c3]", "bg-[#d1fae5]", "bg-[#fce7f3]", "bg-[#e0e7ff]"][i] : ""}
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

        {/* HERO BODY + EXPERIENCE + TOOLS — gradient profile → Tools → Experience (light to dark) */}
        <div
          className="min-h-screen"
          style={{
            background: "linear-gradient(to bottom left, #FBF6F3 0%, #F2F2F0 35%, #E8E6E4 100%)",
          }}
        >
        {/* HERO BODY — full bleed: no horizontal padding so both columns touch viewport edges */}
        <section className="px-0">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <div className="w-full min-w-0 p-16 bg-[#f6f6f6] text-black">
              <div className={`${bg("#e0f2f7")} mb-[40px]`}>
                <h2 className="text-h2 font-light text-black">About Me</h2>
              </div>
              <div className="text-body1 space-y-4 text-black">
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

            <div className="w-full min-w-0 p-16 bg-[#f6f6f6]">
              <div className="relative w-full aspect-square overflow-hidden pt-16">
                <Image
                  src="/images/profile-king-1.png"
                  alt="Mike profile"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <blockquote className="mt-6 text-body2 text-black font-light text-center">
                <p className="italic">&ldquo;A king is a man who turns hope into action.&rdquo;</p>
                <cite className="not-italic mt-2 block text-black/80">— Ralph Waldo Emerson</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* EXPERIENCE — full width, 50/50 grid so Tools aligns flush with hero image left edge; no top/bottom padding so flush with hero and Projects */}
        <section className="pb-0 pt-0 px-0">
          <div className="w-full grid grid-cols-2 gap-0">
            {/* Experience module */}
            <div className="p-16 bg-black text-white">
              <div className="mb-[28px]">
                <h2 className="text-h2 font-light text-left text-white">
                  Experience
                </h2>
              </div>
              <div className="numbers-anchor">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-0 min-w-0">
                  {metrics.map((metric, i) => (
                    <div key={i} className={`col-span-1 md:col-span-2 lg:col-span-3 ${i < 2 ? "mb-6" : ""}`}>
                      <div className="text-h1 font-light -mb-1 py-0 text-white">
                        {metric.value === "10" ? (
                          <span className="tracking-[-0.04em]">10</span>
                        ) : (
                          metric.value
                        )}
                      </div>
                      <div className="text-h4 font-normal text-white">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools module */}
            <div className="p-16 bg-[#e6e6e6] text-black">
              <div className={`${bg("#fef9c3")} py-0 mb-7`}>
                <h2 className="text-h2 font-light text-left py-0 text-black">
                  Tools
                </h2>
              </div>
              <div className="pt-5 grid grid-cols-3 gap-x-12 gap-y-12 min-w-0 content-start items-center [&>*:nth-child(3n+2)]:-ml-2 [&>*:nth-child(3n)]:ml-2">
                {/* Row 1: Figma, Cursor, OpenAI */}
                <div className={`min-w-0 flex items-center justify-start ${bg("#e0f2f7")}`}>
                  <img
                    src="/images/logo-figma.svg"
                    alt="Figma"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                <div className={`min-w-0 flex items-center justify-start ${bg("#fef9c3")}`}>
                  <img
                    src="/images/logo-cursor.svg"
                    alt="Cursor"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                <div className={`min-w-0 flex items-center justify-start ${bg("#f9e2f9")}`}>
                  <img
                    src="/images/logo-openai.svg"
                    alt="OpenAI"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                {/* Row 2: Webflow, Next.js, Claude */}
                <div className={`min-w-0 flex items-center justify-start ${bg("#d1fae5")}`}>
                  <img
                    src="/images/logo-webflow.svg"
                    alt="Webflow"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                <div className={`min-w-0 flex items-center justify-start ${bg("#fce7f3")}`}>
                  <img
                    src="/images/logo-next.svg"
                    alt="Next.js"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                <div className={`min-w-0 flex items-center justify-start ${bg("#fef9c3")}`}>
                  <img
                    src="/images/logo-claude.svg"
                    alt="Claude"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                {/* Row 3: Shopify, TailwindCSS, Hugging Face */}
                <div className={`min-w-0 flex items-center justify-start ${bg("#f0fdf4")}`}>
                  <img
                    src="/images/logo-shopify.svg"
                    alt="Shopify"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                <div className={`min-w-0 flex items-center justify-start ${bg("#f5f0f4")}`}>
                  <img
                    src="/images/logo-tailwindcss.svg"
                    alt="Tailwind CSS"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                <div className={`min-w-0 flex items-center justify-start ${bg("#faf5ff")}`}>
                  <img
                    src="/images/logo-huggingface.svg"
                    alt="Hugging Face"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                {/* Row 4: n8n, Github, Vercel */}
                <div className={`min-w-0 flex items-center justify-start ${bg("#e0f2f7")}`}>
                  <img
                    src="/images/logo-n8n.svg"
                    alt="n8n"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                <div className={`min-w-0 flex items-center justify-start ${bg("#fef9c3")}`}>
                  <img
                    src="/images/logo-github.svg"
                    alt="GitHub"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                <div className={`min-w-0 flex items-center justify-start ${bg("#f9e2f9")}`}>
                  <img
                    src="/images/logo-vercel.svg"
                    alt="Vercel"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                {/* Row 5: Material+Fluent, React+TS+shadcn, Ollama+OpenRouter */}
                <div className={`min-w-0 flex items-center justify-start gap-x-4 ${bg("#d1fae5")}`}>
                  <img
                    src="/images/logo-material.svg"
                    alt="Material UI"
                    className="max-w-full h-auto object-contain object-left"
                  />
                  <img
                    src="/images/logo-fluent.svg"
                    alt="Fluent UI"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                <div className={`min-w-0 flex items-center justify-start gap-x-4 ${bg("#fce7f3")}`}>
                  <img
                    src="/images/logo-react.svg"
                    alt="React"
                    className="max-w-full h-auto object-contain object-left"
                  />
                  <img
                    src="/images/logo-typescript.svg"
                    alt="TypeScript"
                    className="max-w-full h-auto object-contain object-left"
                  />
                  <img
                    src="/images/logo-shadcn.svg"
                    alt="Shadcn UI"
                    className="max-w-full h-auto object-contain object-left"
                  />
                </div>
                <div className={`min-w-0 flex items-center justify-start gap-x-[16px] ${bg("#fef9c3")}`}>
                  <img
                    src="/images/logo-ollama.svg"
                    alt="Ollama"
                    className="max-w-full h-auto object-contain object-left"
                  />
                  <img
                    src="/images/logo-openrouter.svg"
                    alt="OpenRouter"
                    className="max-w-full h-auto object-contain object-left scale-[1.35]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>

        {/* PROJECT CARDS — no top padding so flush with Experience/Tools above */}
        <section className={`pt-0 p-0 flex flex-col ${bg("#f5f0f4")}`}>
          <div className="w-full max-w-[1200px] mx-auto flex-1 min-h-0 flex flex-col w-full">
            <div className="flex-1 min-h-0 -mx-4 md:-mx-8 lg:-mx-16 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] lg:w-[calc(100%+8rem)] bg-[#f6f6f6]">
              <h2 className="text-h2 font-light text-left py-0 pt-4 md:pt-8 lg:pt-16 px-4 md:px-8 lg:px-16 text-black">Projects</h2>
              <ProjectsGrid projects={projects} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
