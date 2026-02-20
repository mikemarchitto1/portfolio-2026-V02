"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PanelLeft, Calendar, MessageCircle } from "lucide-react";
import ProjectCard from "@/components/project-card/project-card";

/* ---------------------------------------------
   HEADER
---------------------------------------------- */
function Header() {
  return (
    <header className="w-full bg-background">
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-start gap-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 border border-border"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 border border-border"
        >
          <Calendar className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          className="rounded-full h-12 px-5 flex items-center gap-2 border border-border"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-body1 font-normal">Let’s Chat</span>
        </Button>
      </div>
    </header>
  );
}

/* ---------------------------------------------
   FOOTER
---------------------------------------------- */
function Footer() {
  return (
    <footer className="w-full bg-background mt-32">
      <div className="max-w-[1200px] mx-auto px-4 py-16 text-left">
        <h1 className="text-h1 font-light mb-6 text-foreground">
          Let’s Connect
        </h1>

        <h4 className="text-h4 text-muted-foreground max-w-2xl mb-12 font-light">
          I like teams that build meaningful things. If you’re exploring a new
          idea, I’m open to contract work and creative partnerships.
        </h4>

        <div className="flex flex-col sm:flex-row justify-start gap-4">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-12 px-6 border border-border"
            asChild
          >
            <a href="mailto:hello@carlwalker.com">Email Mike</a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-12 px-6 border border-border"
            asChild
          >
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full h-12 px-6 border border-border"
            asChild
          >
            <a
              href="https://linkedin.com/in/carlwalker"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on Linkedin
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------------------
   METRICS + LOGOS
---------------------------------------------- */
const metrics = [
  { value: "10", label: "Years of Experience" },
  { value: "4", label: "Products launched" },
  { value: "10,000", label: "Hours Designing" },
  { value: "3", label: "AI Experiments" },
];

const techLogos = [
  "/images/logo-figma.svg",
  "/images/logo-n8n.svg",
  "/images/logo-tailwindcss.svg",
  "/images/logo-cursor.svg",
  "/images/logo-github.svg",
  "/images/logo-shopify.svg",
  "/images/logo-webflow.svg",
  "/images/logo-vercel.svg",
  "/images/logo-huggingface.svg",
  "/images/logo-next.svg",
  "/images/logo-claude.svg",
  "/images/logo-openai.svg",
  "/images/logo-react.svg",
  "/images/logo-typescript.svg",
  "/images/logo-ollama.svg",
  "/images/logo-material.svg",
  "/images/logo-fluent.svg",
];

/* ---------------------------------------------
   PROJECT CARDS — FIXED WITH REAL FILENAMES
---------------------------------------------- */
const projects = [
  {
    title: "Nutrilucent",
    description:
      "Created an internal research repository by leading end-to-end UX work from foundational research through UI design and agile handoff.",
    image: "/images/thumb-small-nutrilucent.png",
    href: "/nutrilucent",
  },
  {
    title: "GloriFi",
    description:
      "Redesigned website with custom iconography, product-focused visuals, and a more intuitive shopping experience.",
    image: "/images/thumb-small-glorifi.png",
    href: "/glorifi",
  },
  {
    title: "National Restaurant Association",
    description:
      "Created an internal research repository by leading end-to-end UX work from foundational research through UI design and agile handoff.",
    image: "/images/thumb-small-nationalrestaurantassociation.png",
    href: "/nra",
  },
  {
    title: "Microsoft Admin Software",
    description:
      "Redesigned website with custom iconography, product-focused visuals, and a more intuitive shopping experience.",
    image: "/images/thumb-small-microsoftadmin.png",
    href: "/microsoft-admin",
  },
  {
    title: "Microsoft Hits Software",
    description:
      "Redesigned website with custom iconography, product-focused visuals, and a more intuitive shopping experience.",
    image: "/images/thumb-small-microsofthits.png",
    href: "/microsoft-hits",
  },
  {
    title: "Eddie Bauer",
    description:
      "Created an internal research repository by leading end-to-end UX work from foundational research through UI design and agile handoff.",
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
      <Header />

      <main className="min-h-screen bg-background">
        {/* HERO HEADLINE */}
        <section className="py-24 md:py-32 px-4">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="text-h1 font-light mb-6 text-foreground max-w-4xl">
              Hi, I’m Mike
            </h1>

            <p className="text-h4 font-light text-muted-foreground max-w-3xl">
              I design insightful digital experiences for startups and global
              brands.
            </p>
          </div>
        </section>

        {/* HERO BODY */}
        <section className="py-12 px-4">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="max-w-xl">
              <h2 className="text-h2 font-light mb-12 text-foreground">
                About me
              </h2>

              <div className="space-y-8 text-body1 leading-relaxed text-foreground">
                <p>
                  I’m originally from Chicago, where I studied graphic design at
                  UIC—a program rooted in Swiss and international design
                  principles.
                </p>

                <p>
                  After relocating to Seattle, I moved into UX, drawn to digital
                  design and the need for better product experiences.
                </p>

                <p>
                  Currently based in Miami, I’m a cyclist and outdoors
                  enthusiast who finds peace on the trail.
                </p>
              </div>
            </div>

            <div className="relative h-[500px] w-full">
              <Image
                src="/images/thumb-large-profile.png"
                alt="Mike profile"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* EXPERIENCE + TECH STACK */}
        <section className="py-24 px-4">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-h2 font-light mb-12 text-foreground">
              Experience and Tech Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              {/* LEFT: METRICS */}
              <div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-[48px]">
                  {metrics.map((metric, i) => (
                    <div key={i}>
                      <h1 className="text-h1 font-light text-foreground mb-2">
                        {metric.value}
                      </h1>
                      <h4 className="text-h4 text-foreground font-normal">
                        {metric.label}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: LOGOS */}
              <div className="grid grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-[48px]">
                {techLogos.map((logo, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center p-4 md:p-5"
                  >
                    <Image
                      src={logo}
                      alt="Tech Logo"
                      width={40}
                      height={40}
                      className="opacity-90"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT CARDS */}
        <section className="py-24 px-4">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
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
