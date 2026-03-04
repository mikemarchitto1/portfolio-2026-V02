"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NavButton } from "@/components/ui/nav-button";
import ProjectCard from "@/components/project-card/project-card";
import Header from "@/components/header/header";
import { StatCounter } from "@/components/stat-counter/stat-counter";
import { useScrollTriggerOnce } from "@/components/stat-counter/use-scroll-trigger-once";
import { useTheme } from "@/hooks/use-theme";

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
  const { theme } = useTheme();
  return (
    <footer className="text-foreground w-full bg-[oklch(88%_0.09_25)] dark:bg-[oklch(24%_0.07_25)]">
      <div className="w-full max-w-[1328px] mx-auto px-4 md:px-8 lg:px-16 py-6 md:py-8">
        <div className="w-full min-w-0 bg-[oklch(88%_0.10_175)] dark:bg-[oklch(28%_0.08_175)] text-left flex flex-col">
            <div className="w-fit p-0 m-0">
              <h1 className="text-h1 font-light text-foreground p-0 m-0" style={{ letterSpacing: 0 }}>Let’s Talk</h1>
            </div>
            <div className="max-w-[528px] p-0 m-0">
              <h5 className="text-h5 max-w-[528px] font-light text-foreground p-0 m-0">
                I{"\u2019"}m interested in creative partnerships that grow from meaningful work.
              </h5>
            </div>
        </div>
      </div>

      <div className="w-full bg-[oklch(88%_0.09_265)] dark:bg-[oklch(26%_0.07_265)]">
        <div className="max-w-[1328px] mx-auto p-4 md:p-8 lg:p-16 flex flex-col sm:flex-row justify-between items-end gap-4">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <NavButton size="lg" asChild>
              <a href="mailto:hello@carlwalker.com">Email Mike</a>
            </NavButton>

            <NavButton size="lg" asChild>
              <a href="/resume.pdf" download>
                Download Resume
              </a>
            </NavButton>

            <NavButton size="lg" asChild>
              <a
                href="https://linkedin.com/in/carlwalker"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </a>
            </NavButton>
          </div>
          <img
            src={
              theme === "light"
                ? "/images/crown works-up-b.svg"
                : "/images/crown works-up-w.svg"
            }
            alt="Crown Works"
            className="hidden h-[76px] w-auto shrink-0 object-contain object-right translate-y-[6px]"
          />
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
    title: "Microsoft Admin",
    description:
      "Redesigned website with custom iconography, product focused visuals, and a more intuitive shopping experience.",
    image: "/images/thumb-large-microsoftadmin.png",
    href: "/microsoft-admin",
  },
  {
    title: "Microsoft Hits",
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
      className="w-full min-w-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 items-stretch"
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
    <div className="w-full min-w-0 p-4 md:p-8 lg:p-16 bg-[oklch(88%_0.10_120)] dark:bg-[oklch(26%_0.08_120)]">
      <div className="w-full min-w-0 grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-0 md:min-h-[448px] rounded-2xl overflow-hidden shadow-elevation">
        {/* Left: product image — 50% */}
        <div className="relative w-full h-full min-h-[240px] md:min-h-[320px] overflow-hidden rounded-t-2xl md:rounded-t-none md:rounded-l-2xl bg-[oklch(86%_0.09_210)] dark:bg-[oklch(24%_0.07_210)]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* Right: text panel — 50%, 64px internal padding */}
        <div className="flex flex-col justify-center overflow-hidden rounded-b-2xl rounded-br-2xl md:rounded-b-none md:rounded-r-2xl md:rounded-tr-2xl md:rounded-br-2xl bg-[oklch(88%_0.11_340)] dark:bg-[oklch(26%_0.09_340)] p-4 md:p-8 lg:p-16 text-left">
          <h3 className="text-h6 md:text-h5 font-medium text-foreground dark:text-black color:text-black m-0 mb-2">{title}</h3>
          <p className="text-body1 text-foreground dark:text-black color:text-black m-0 mb-8">{description}</p>
          <Button
            variant="outline"
            size="lg"
            className="project-card-cta w-fit rounded-full border border-foreground text-foreground hover:bg-foreground/[0.02] hover:text-foreground dark:bg-black dark:border-black dark:text-white dark:hover:bg-black/90 color:border-transparent color:bg-[oklch(28%_0.055_155)] color:text-white color:hover:bg-[oklch(20%_0.04_155)] color:hover:text-white"
            asChild
          >
            {href ? (
              <span>See Case Study</span>
            ) : (
              <a href="#">See Case Study</a>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
  if (href) {
    return (
      <a href={href} className="block w-full min-w-0 no-underline text-foreground dark:text-black color:text-black">
        {content}
      </a>
    );
  }
  return <div className="w-full min-w-0">{content}</div>;
}

/* ---------------------------------------------
   PAGE
---------------------------------------------- */
export default function Home() {
  const { ref: statsTriggerRef, triggered: statsTriggered } =
    useScrollTriggerOnce();
  const { theme } = useTheme();

  return (
    <>
      <main className="min-h-screen min-w-0">
        <Header />

        {/* HERO BODY — full-width wrapper + internal max-width (no max-w + px on same element) */}
        <section className="hero w-full min-w-0 bg-[oklch(93%_0.08_75)] dark:bg-[oklch(30%_0.07_75)]">
          <div className="w-full px-4 md:px-8 lg:px-16">
            <div className="max-w-[1328px] mx-auto py-8 md:py-16 lg:py-24">
          <div className="w-full min-w-0 grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
            <div className="w-full min-w-0 text-foreground bg-[oklch(90%_0.12_75)] dark:bg-[oklch(32%_0.09_75)]">
              <h1 className="hero-h1 text-h4 md:text-h3 lg:text-h1 font-light text-foreground" style={{ letterSpacing: 0, fontFamily: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif' }}>Hi, I{"\u2019"}m Mike</h1>
              <h5 className="text-body1 md:text-h6 lg:text-h5 font-light text-foreground max-w-[528px]">I design digital experiences for startups and global brands.</h5>
              <div className="text-body1 space-y-4 text-foreground mt-8">
                <p>
                  I{"\u2019"}m from Chicago, where I studied graphic design at UIC, a school rooted in Swiss and International design principles. These studies shaped my early work in visual storytelling. After moving to Seattle, I transitioned into UX design, working across corporations, agencies, and startups. Now based in Miami, I balance my work with AI-driven design exploration and time outdoors cycling.
                </p>
              </div>
            </div>

            <div className="w-full min-w-0 flex flex-col h-full gap-0 bg-[oklch(90%_0.10_140)] dark:bg-[oklch(28%_0.08_140)]">
              <div className="w-full flex-1 min-h-0 rounded-2xl shadow-elevation mb-6 overflow-hidden">
                <div className="w-full h-full min-h-[280px] rounded-2xl overflow-hidden relative">
                  <Image
                    src="/images/knight-wide.png"
                    alt="Mike profile"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <blockquote className="profile-quote shrink-0 text-foreground font-light text-center px-4 md:px-6 mb-8">
                <p className="italic">&ldquo;A king is a man who turns hope into action.&rdquo;</p>
                <cite className="not-italic block opacity-80">— Ralph Waldo Emerson</cite>
              </blockquote>
            </div>
          </div>
            </div>
          </div>
        </section>

        {/* FEATURED WORK — single project entry in white block */}
        <section className="hidden px-4 md:px-8 lg:px-16 pt-0 py-8 md:py-16 lg:py-24 bg-[oklch(91%_0.09_55)] dark:bg-[oklch(30%_0.07_55)]">
          <div className="w-full max-w-[1200px] mx-auto">
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

        {/* IMPACT METRICS AND TECH STACK — full-width wrapper + internal max-width (no max-w + p on same element) */}
        <section className="w-full min-w-0 min-h-0 md:min-h-[520px] py-8 md:py-16 lg:py-24 bg-[oklch(92%_0.07_200)] dark:bg-[oklch(28%_0.06_200)]">
          <div className="w-full px-4 md:px-8 lg:px-16">
            <div className="max-w-[1328px] mx-auto min-h-0 md:min-h-[520px]">
          <div className="w-full mb-6 py-4 px-4 md:px-6 bg-[oklch(88%_0.10_220)] dark:bg-[oklch(30%_0.08_220)]">
            <h2 className="text-h5 md:text-h4 lg:text-h2 font-light text-left text-foreground">
              Impact and Tech Stack
            </h2>
          </div>
          <div className="w-full min-w-0 flex flex-col p-16 bg-[oklch(90%_0.08_170)] dark:bg-[oklch(28%_0.07_170)]">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Impact Metrics */}
              <div className="p-0 text-black flex flex-col min-h-0 bg-[oklch(88%_0.11_165)] dark:bg-[oklch(26%_0.09_165)]">
                <div
                  ref={statsTriggerRef}
                  className="numbers-anchor p-0 w-full flex-1 flex flex-col min-h-0"
                >
                  <div className="grid grid-cols-2 grid-rows-[1fr_1fr] gap-4 min-w-0 items-stretch flex-1 min-h-0">
                    {metrics.map((metric, i) => (
                      <StatCounter
                        key={i}
                        value={Number(metric.value)}
                        label={metric.label}
                        startAnimation={statsTriggered}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="p-0 text-foreground flex flex-col min-h-0">
                <div className="rounded-2xl shadow-elevation pt-16 px-12 pb-12 w-full min-w-0 flex-1 min-h-0 flex flex-col overflow-hidden bg-[oklch(88%_0.11_300)] dark:bg-[oklch(26%_0.09_300)]">
                <div className="grid w-full min-w-0 max-w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[56px] gap-y-[52px] grid-auto-rows-[80px] items-stretch content-start">
                {/* Row 1: Figma, Cursor, OpenAI */}
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-figma.svg"
                    alt="Figma"
                    className="w-full max-w-[89px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-cursor.svg"
                    alt="Cursor"
                    className="w-full max-w-[96px] h-auto object-contain object-center shrink-0 translate-y-[2px]"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-openai.svg"
                    alt="OpenAI"
                    className="w-full max-w-[91px] h-auto object-contain object-center shrink-0 translate-y-[2px]"
                  />
                </div>
                {/* Row 2: Webflow, Next.js, Claude */}
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-webflow.svg"
                    alt="Webflow"
                    className="w-full max-w-[111px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-next.svg"
                    alt="Next.js"
                    className="w-full max-w-[80px] h-auto object-contain object-center shrink-0"
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
                    className="w-full max-w-[93px] h-auto object-contain object-center shrink-0 -translate-y-[4px]"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-framer.svg"
                    alt="Framer"
                    className="w-full max-w-[93px] h-auto object-contain object-center shrink-0 -translate-y-[1px]"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-adobe.svg"
                    alt="Adobe"
                    className="w-full max-w-[62px] h-auto object-contain object-center shrink-0 -translate-y-[3px]"
                  />
                </div>
                {/* Row 4: n8n, Github, Vercel */}
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-n8n.svg"
                    alt="n8n"
                    className="w-full max-w-[91px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-github.svg"
                    alt="GitHub"
                    className="w-full max-w-[90px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src="/images/logo-vercel.svg"
                    alt="Vercel"
                    className="w-full max-w-[86px] h-auto object-contain object-center shrink-0 translate-y-[1px]"
                  />
                </div>
                {/* Last row: col 1 = Material+Fluent+Tailwind, col 2 = React+TS+shadcn, col 3 = Ollama+OpenRouter+Hugging Face */}
                <div className="flex h-full w-full items-center justify-center gap-x-[16px]">
                  <img
                    src="/images/logo-material.svg"
                    alt="Material UI"
                    className="w-full max-w-[27px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-fluent.svg"
                    alt="Fluent UI"
                    className="w-full max-w-[17px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-tailwindcss.svg"
                    alt="Tailwind CSS"
                    className="w-full max-w-[29px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center gap-x-[16px]">
                  <img
                    src="/images/logo-react.svg"
                    alt="React"
                    className="w-full max-w-[30px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-typescript.svg"
                    alt="TypeScript"
                    className="w-full max-w-[26px] h-auto object-contain object-center shrink-0"
                  />
                  <img
                    src="/images/logo-shadcn.svg"
                    alt="Shadcn UI"
                    className="w-full max-w-[23px] h-auto object-contain object-center shrink-0"
                  />
                </div>
                <div className="flex h-full w-full items-center justify-center gap-x-[16px]">
                  <img
                    src="/images/logo-ollama.svg"
                    alt="Ollama"
                    className="m-0 block w-full max-w-[19px] h-auto object-contain object-center shrink-0 p-0"
                  />
                  <img
                    src="/images/logo-huggingface.svg"
                    alt="Hugging Face"
                    className="m-0 block w-full max-w-[25px] h-auto object-contain object-center shrink-0 p-0"
                  />
                  <img
                    src="/images/logo-openrouter.svg"
                    alt="OpenRouter"
                    className="m-0 block w-full max-w-[21px] h-auto object-contain object-center shrink-0 p-0"
                  />
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
            </div>
          </div>
        </section>

        {/* PROJECT CARDS — max-w wrapper with no horizontal padding; padding only on inner so total ≤ 1328px */}
        <section className="w-full min-w-0 flex flex-col pt-8 md:pt-16 lg:pt-24 pb-8 md:pb-16 lg:pb-24 bg-[oklch(91%_0.08_280)] dark:bg-[oklch(28%_0.07_280)]">
          <div className="w-full max-w-[1328px] mx-auto flex flex-col min-w-0">
            <div className="w-full min-w-0 px-4 md:px-8 lg:px-16 py-4 mb-10 bg-[oklch(86%_0.11_260)] dark:bg-[oklch(28%_0.09_260)]">
              <h2 className="text-h5 md:text-h4 lg:text-h2 font-light text-left text-foreground m-0 p-0">Clients</h2>
            </div>
            <div className="w-full min-w-0 flex flex-col gap-12">
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
        <section className="hidden flex flex-col pt-16 bg-[oklch(90%_0.08_160)] dark:bg-[oklch(28%_0.07_160)]">
          <div className="w-full flex flex-col min-w-0">
            <div className="w-full px-4 md:px-8 lg:px-16 py-2 mb-0">
              <h2 className="text-h2 font-light text-left text-foreground m-0 p-0">Clients</h2>
            </div>
            <ProjectsGrid projects={projects} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
