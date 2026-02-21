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
    <footer className="w-full m-0 p-[16px] md:p-[32px] lg:p-[64px]">
      <div className="w-full max-w-[1200px] mx-auto text-left">
        <h1 className="text-h1 font-light mb-6">Let’s Connect</h1>

        <h4 className="text-h4 max-w-[66.666%] mb-16 font-light">
          I like teams that build meaningful things. If you’re exploring a new
          idea, I’m open to contract work and creative partnerships.
        </h4>

        <div className="flex flex-col sm:flex-row justify-start gap-3">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-border"
            asChild
          >
            <a href="mailto:hello@carlwalker.com">Email Mike</a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-border"
            asChild
          >
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full border border-border"
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
   PAGE
---------------------------------------------- */
export default function Home() {
  return (
    <>
      <main className="min-h-screen m-0">
        <HeroHeadline />

        {/* HERO BODY */}
        <section className="w-full m-0 p-[16px] md:p-[32px] lg:p-[64px]">
          <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 items-start">
            <div className="max-w-xl">
              <h2 className="text-h2 font-light mb-5">About me</h2>

              <div className="space-y-5 text-body1">
                <p>
                  I’m originally from Chicago, where I studied graphic design at UIC—a program rooted in Swiss and International design principles. That foundation shaped my early work in marketing and communications, where I developed a strong sense of visual design and story telling. I’ve always been drawn to typography, simple communication, and design that’s useful.
                </p>
                <p>
                  Currently based in Miami, I’m a cyclist and outdoors enthusiast who finds peace on the trail. Time outside helps reset and balance my life. Whether riding through city streets or remote gravel paths, I’m always looking for great scenic routes to the next bike camping destination.
                </p>
                <p>
                  Currently based in Miami, I’m a cyclist and outdoors enthusiast who finds peace on the trail. Time outside helps reset and balance my life. Whether riding through city streets or remote gravel paths, I’m always looking for great scenic routes to the next bike camping destination.
                </p>
              </div>
            </div>

            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src="/images/thumb-large-profile.png"
                alt="Mike profile"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* EXPERIENCE + TECH STACK — title, metadata, and logos in one component */}
        <section className="w-full m-0 p-[16px] md:p-[32px] lg:p-[64px]">
          <div className="w-full max-w-[1200px] mx-auto">
            <h2 className="text-h2 font-light mb-6">
              Experience and Tech Stack
            </h2>
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-8 lg:gap-x-12 items-start">
              {/* METADATA — responsive cols and gutters */}
              <div className="col-span-4 md:col-span-4 lg:col-span-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 md:gap-x-8 lg:gap-x-12 gap-y-4 md:gap-y-6 lg:gap-y-6 min-w-0">
                {metrics.map((metric, i) => (
                  <div key={i} className="col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="text-h1 font-light mb-2">
                      {metric.value}
                    </div>
                    <div className="text-h4 font-normal text-foreground">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* LOGOS — responsive cols and gutters */}
              <div className="col-span-4 md:col-span-4 lg:col-span-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 md:gap-x-8 lg:gap-x-12 gap-y-4 md:gap-y-8 lg:gap-y-8 min-w-0 items-center pt-6">
                {/* Row 1: Figma, n8n, Tailwind */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-figma.svg"
                    alt="Figma"
                    className="w-[117px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-n8n.svg"
                    alt="n8n"
                    className="w-[122px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-tailwindcss.svg"
                    alt="Tailwind CSS"
                    className="w-[154px] h-auto object-contain object-left"
                  />
                </div>
                {/* Row 2: Cursor, GitHub, Shopify */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-cursor.svg"
                    alt="Cursor"
                    className="w-[132px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-github.svg"
                    alt="GitHub"
                    className="w-[125px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-shopify.svg"
                    alt="Shopify"
                    className="w-[144px] h-auto object-contain object-left"
                  />
                </div>
                {/* Row 3: Webflow, Vercel, Hugging Face */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-webflow.svg"
                    alt="Webflow"
                    className="w-[144px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-vercel.svg"
                    alt="Vercel"
                    className="w-[119px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-huggingface.svg"
                    alt="Hugging Face"
                    className="w-[151px] h-auto object-contain object-left"
                  />
                </div>
                {/* Row 4: Next.js, Claude, OpenAI */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-next.svg"
                    alt="Next.js"
                    className="w-[114px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-claude.svg"
                    alt="Claude"
                    className="w-[129px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                  <img
                    src="/images/logo-openai.svg"
                    alt="OpenAI"
                    className="w-[112px] h-auto object-contain object-left"
                  />
                </div>
                {/* Row 5: 3 columns, each with a pair — Column 1: React+TS, Column 2: shadcn+Ollama, Column 3: Material+Fluent */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2 flex items-center gap-x-[28px]">
                  <img
                    src="/images/logo-react.svg"
                    alt="React"
                    className="w-[46px] h-auto object-contain object-left"
                  />
                  <img
                    src="/images/logo-typescript.svg"
                    alt="TypeScript"
                    className="w-[37px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2 flex items-center gap-x-[28px]">
                  <img
                    src="/images/logo-shadcn.svg"
                    alt="Shadcn UI"
                    className="w-[32px] h-auto object-contain object-left"
                  />
                  <img
                    src="/images/logo-ollama.svg"
                    alt="Ollama"
                    className="w-[32px] h-auto object-contain object-left"
                  />
                  <img
                    src="/images/logo-openrouter.svg"
                    alt="OpenRouter"
                    className="w-[32px] h-auto object-contain object-left"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-2 flex items-center gap-x-[28px]">
                  <img
                    src="/images/logo-material.svg"
                    alt="Material UI"
                    className="w-[40px] h-auto object-contain object-left"
                  />
                  <img
                    src="/images/logo-fluent.svg"
                    alt="Fluent UI"
                    className="w-[23px] h-auto object-contain object-left"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT CARDS — wrapper: no padding; grid: full width, gap only; cards: internal padding only */}
        <section className="w-full max-w-[1328px] mx-auto m-0 p-0">
          <div className="w-full grid grid-cols-1 md:grid-cols-3">
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
        </section>
      </main>

      <Footer />
    </>
  );
}
