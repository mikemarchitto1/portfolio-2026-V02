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
    <footer className="text-foreground w-screen max-w-none ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)]">
      <div className="w-full max-w-[1328px] mx-auto px-16">
        <div className="w-[calc(100%+8rem)] max-w-none -ml-16 -mr-16 px-16 py-0 text-left flex flex-col">
            <div className="w-fit p-0 m-0">
              <h1 className="text-h1 font-light text-foreground p-0 m-0" style={{ letterSpacing: 0 }}>Let’s Talk</h1>
            </div>
            <div className="max-w-[528px] p-0 m-0">
              <h5 className="text-h5 max-w-[528px] font-light text-foreground p-0 m-0">
                I'm interested in creative partnerships built through meaningful work.
              </h5>
            </div>
        </div>
      </div>

      <div className="w-full">
        <div className="max-w-[1328px] mx-auto p-16 flex flex-col sm:flex-row justify-start gap-4">
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
    image: "/images/thumb-large-nutrilucent.png",
    href: "/nutrilucent",
  },
  {
    title: "GloriFi",
    description:
      "Redesigned website with custom iconography, product focused visuals, and a more intuitive shopping experience.",
    image: "/images/thumb-large-glorifi.png",
    href: "/glorifi",
  },
  {
    title: "National Restaurant Association",
    description:
      "Created an internal research repository by leading end-to-end UX work from foundation of research through UI design and agile handoff.",
    image: "/images/thumb-large-nationalrestaurantassociation.png",
    href: "/nra",
  },
  {
    title: "Microsoft Admin Software",
    description:
      "Redesigned website with custom iconography, product focused visuals, and a more intuitive shopping experience.",
    image: "/images/thumb-large-microsoftadmin.png",
    href: "/microsoft-admin",
  },
  {
    title: "Microsoft Hits Software",
    description:
      "Redesigned website with custom iconography, product focused visuals, and a more intuitive shopping experience.",
    image: "/images/thumb-large-microsofthits.png",
    href: "/microsoft-hits",
  },
  {
    title: "Eddie Bauer",
    description:
      "Created an internal research repository by leading end-to-end UX work from foundation of research through UI design and agile handoff.",
    image: "/images/thumb-large-eddiebauer.png",
    href: "/eddiebauer",
  },
];

/* ---------------------------------------------
   PROJECTS GRID — responsive grid; cards use natural height, no stretch (hidden)
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
   PROJECT CARD 50/50 — image left, text + CTA right (screenshot layout)
---------------------------------------------- */
function ProjectCardFiftyFifty({
  title,
  description,
  image,
  href,
}: {
  title: string;
  description: string;
  image: string;
  href?: string;
}) {
  const content = (
    <div className="w-full p-[64px]">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-[448px] rounded-2xl overflow-hidden shadow-elevation">
        {/* Left: product image — 50% */}
        <div className="relative w-full h-full min-h-[320px] overflow-hidden rounded-t-2xl md:rounded-t-none md:rounded-l-2xl bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* Right: white panel — 50%, 64px internal padding */}
        <div className="flex flex-col justify-center overflow-hidden rounded-b-2xl rounded-br-2xl md:rounded-b-none md:rounded-r-2xl md:rounded-tr-2xl md:rounded-br-2xl bg-white p-[64px] text-left">
          <h3 className="text-h5 font-medium text-foreground m-0 mb-2">{title}</h3>
          <p className="text-body1 text-foreground m-0 mb-8">{description}</p>
          {href ? (
            <span
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-button h-[48px] min-h-[48px] px-[24px] py-[12px] w-fit bg-foreground text-background transition-colors duration-200 hover:bg-gray-800"
              aria-hidden
            >
              See Case Study
            </span>
          ) : (
            <Button
              asChild
              variant="default"
              size="lg"
              className="w-fit bg-foreground text-background hover:bg-gray-800 transition-colors duration-200"
            >
              <a href="#">See Case Study</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} className="block w-full no-underline text-foreground">
        {content}
      </a>
    );
  }
  return <div className="w-full">{content}</div>;
}

/* ---------------------------------------------
   PAGE
---------------------------------------------- */
export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <HeroHeadline showBackgroundColors={SHOW_BACKGROUND_COLORS} />

        {/* HERO BODY — content aligned to grid (pr-16 aligns blue box right edge with Impact/logos section) */}
        <section className="w-screen max-w-none ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)]">
          <div className="w-full max-w-[1328px] mx-auto pr-16">
          <div className="w-full grid grid-cols-1 md:grid-cols-[664px_1fr] gap-0 items-stretch">
            <div className="w-full min-w-0 p-16 text-foreground">
              <h1 className="text-h1 font-light text-foreground whitespace-nowrap" style={{ letterSpacing: 0 }}>Hi, I'm Mike</h1>
              <h5 className="text-h5 font-light text-foreground max-w-[528px]">I design digital experiences for startups and global brands.</h5>
              <div className="text-body1 space-y-4 text-foreground mt-8">
                <p>
                  I'm originally from Chicago, where I studied graphic design at UIC, a school rooted in Swiss and International design principles. This shaped my early work in visual storytelling. After moving to Seattle, I shifted into UX, working across corporations, agencies, and startups to create user‑centered digital experiences. Now based in Miami, I balance my work with cycling and time outdoors, often exploring new routes and bike‑camping destinations.
                </p>
              </div>
            </div>

            <div className="w-full min-w-0 p-16 flex flex-col h-full min-h-0 bg-palette-yellow/80 rounded-2xl shadow-elevation">
              {/* Image area: circle centered in remaining space above quote */}
              <div className="flex-1 min-h-0 flex items-center justify-center mb-10">
                <div className="relative h-full max-h-full max-w-full aspect-square overflow-hidden rounded-full mt-[28px]">
                  <Image
                    src="/images/profile-king-1.png"
                    alt="Mike profile"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <blockquote className="profile-quote shrink-0 text-body2 text-foreground font-light text-center">
                <p className="italic">&ldquo;A king is a man who turns hope into action.&rdquo;</p>
                <cite className="not-italic block text-foreground/80">— Ralph Waldo Emerson</cite>
              </blockquote>
            </div>
          </div>
          </div>
        </section>

        {/* FEATURED WORK — single project entry in white block */}
        <section className="hidden px-4 md:px-8 lg:px-16 pt-0 pb-16">
          <div className="w-full max-w-[1200px] mx-auto pt-16">
            <div className="w-fit mb-10">
              <h2 className="text-h2 font-light text-left text-foreground p-0 m-0">Featured Work</h2>
            </div>
            <div className="overflow-hidden flex flex-col group">
              <div className="w-full relative overflow-hidden">
                <div
                  className="absolute inset-0 z-20 bg-foreground/5 opacity-0 transition-opacity duration-200 ease-out pointer-events-none group-hover:opacity-100"
                  aria-hidden
                />
                <Image
                  src="/images/hero-glorifi.png"
                  alt="GloriFi banking app"
                  width={1200}
                  height={675}
                  className="w-full h-auto object-contain block transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-4 items-start">
                <div className="w-fit p-0 m-0">
                  <h3 className="text-h5 font-medium text-foreground text-left p-0 m-0">GloriFi</h3>
                </div>
                <div className="p-0 m-0">
                  <p className="text-body1 text-foreground text-left p-0 m-0">
                    Led end-to-end UX for FinTech products, from wireframes and prototypes to hi-fidelity screens and a unified design system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT METRICS AND TECH STACK — content aligned to grid */}
        <section className="w-screen max-w-none ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] mt-24 mb-6">
          <div className="w-full max-w-[1328px] mx-auto p-16 pb-16 min-h-[520px]">
          <div className="w-full flex flex-col">
            <div className="w-full mb-[72px]">
              <h2 className="text-h2 font-light text-left text-foreground">
                Impact and Tech Stack
              </h2>
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
              {/* Impact Metrics */}
              <div className="p-0 text-black flex flex-col min-h-0">
                <div className="numbers-anchor p-0 w-full flex-1 flex flex-col min-h-0">
                  <div className="grid grid-cols-2 grid-rows-[1fr_1fr] gap-4 min-w-0 items-stretch flex-1 min-h-0">
                    {metrics.map((metric, i) => {
                      const blockBg = "bg-white";
                      const textInherit = "text-foreground";
                      return (
                      <div key={i} className={`w-full h-full min-h-0 flex flex-col items-center justify-center text-center p-[48px] pt-[36px] rounded-2xl shadow-elevation ${blockBg} ${textInherit}`}>
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
                    );})}
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="p-0 text-foreground flex flex-col min-h-0">
                <div className="bg-white rounded-2xl shadow-elevation p-4 md:p-8 lg:p-12 pt-7 md:pt-11 lg:pt-15 pb-6 md:pb-10 lg:pb-[56px] w-full flex-1 min-h-0 flex flex-col">
                <div className="grid w-max max-w-full mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[56px] gap-y-[52px] grid-auto-rows-[80px] items-stretch content-start">
                {/* Row 1: Figma, Cursor, OpenAI */}
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-figma.svg"
                    alt="Figma"
                    className="w-[89px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-cursor.svg"
                    alt="Cursor"
                    className="w-[96px] h-auto object-contain object-center shrink-0 translate-y-[2px]"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-openai.svg"
                    alt="OpenAI"
                    className="w-[91px] h-auto object-contain object-center shrink-0 translate-y-[2px]"
                  />
                </div>
                {/* Row 2: Webflow, Next.js, Claude */}
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-webflow.svg"
                    alt="Webflow"
                    className="w-[111px] h-auto object-contain object-center shrink-0"
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
                    className="w-[96px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                {/* Row 3: Shopify, Framer, Adobe */}
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-shopify.svg"
                    alt="Shopify"
                    className="w-[93px] h-auto object-contain object-center shrink-0 -translate-y-[4px]"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-framer.svg"
                    alt="Framer"
                    className="w-[93px] h-auto object-contain object-center shrink-0 -translate-y-[1px]"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-adobe.svg"
                    alt="Adobe"
                    className="w-[62px] h-auto object-contain object-center shrink-0 -translate-y-[3px]"
                  />
                </div>
                {/* Row 4: n8n, Github, Vercel */}
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-n8n.svg"
                    alt="n8n"
                    className="w-[91px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-github.svg"
                    alt="GitHub"
                    className="w-[90px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-vercel.svg"
                    alt="Vercel"
                    className="w-[86px] h-auto object-contain object-center shrink-0 translate-y-[1px]"
                  />
                </div>
                {/* Last row: col 1 = Material+Fluent+Tailwind, col 2 = React+TS+shadcn, col 3 = Ollama+OpenRouter+Hugging Face */}
                <div className="flex h-full w-full items-center justify-center gap-x-[16px]">
                  <img
                    src="/images/logo-material.svg"
                    alt="Material UI"
                    className="w-[27px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-fluent.svg"
                    alt="Fluent UI"
                    className="w-[17px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-tailwindcss.svg"
                    alt="Tailwind CSS"
                    className="w-[29px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center gap-x-[16px]">
                  <img
                    src="/images/logo-react.svg"
                    alt="React"
                    className="w-[30px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-typescript.svg"
                    alt="TypeScript"
                    className="w-[26px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-shadcn.svg"
                    alt="Shadcn UI"
                    className="w-[23px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center gap-x-[16px]">
                  <img
                    src="/images/logo-ollama.svg"
                    alt="Ollama"
                    className="m-0 block w-[19px] h-auto object-contain object-center shrink-0 p-0"
                  />
                  <img
                    src="/images/logo-huggingface.svg"
                    alt="Hugging Face"
                    className="m-0 block w-[25px] h-auto object-contain object-center shrink-0 p-0"
                  />
                  <img
                    src="/images/logo-openrouter.svg"
                    alt="OpenRouter"
                    className="m-0 block w-[21px] h-auto object-contain object-center shrink-0 p-0"
                  />
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </section>

        {/* PROJECT CARDS — full-bleed grey bg; content aligned to grid */}
        <section className="w-screen max-w-none ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] flex flex-col pt-16 pb-[92px]">
          <div className="w-full max-w-[1328px] mx-auto flex flex-col min-w-0">
            <div className="w-full px-[64px] py-2 mb-0">
              <h2 className="text-h2 font-light text-left text-foreground m-0 p-0">Projects</h2>
            </div>
            <div className="w-full flex flex-col gap-12">
              {projects.map((project, i) => (
                <ProjectCardFiftyFifty
                  key={i}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  href={project.href}
                />
              ))}
            </div>
          </div>
        </section>

        {/* PROJECT CARDS GRID (original) — hidden */}
        <section className="hidden flex flex-col pt-16">
          <div className="w-full flex flex-col min-w-0">
            <div className="w-full px-[64px] py-2 mb-0">
              <h2 className="text-h2 font-light text-left text-foreground m-0 p-0">Projects</h2>
            </div>
            <ProjectsGrid projects={projects} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
