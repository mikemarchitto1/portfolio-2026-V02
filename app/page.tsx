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
    <header className="w-full" style={{ backgroundColor: "white" }}>
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
    <footer className="w-full mt-32" style={{ backgroundColor: "white" }}>
      <div className="max-w-[1200px] mx-auto px-4 py-16 text-left">
        <h1 className="text-h1 font-light mb-6">Let’s Connect</h1>

        <h4 className="text-h4 max-w-2xl mb-12 font-light">
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
   METRICS
---------------------------------------------- */
const metrics = [
  { value: "10", label: "Years Working" },
  { value: "4", label: "Launches" },
  { value: "8,000", label: "Hours Designing" },
  { value: "3", label: "AI Experiments" },
];

/* ---------------------------------------------
   PROJECTS
---------------------------------------------- */
const projects = [
  {
    title: "Nutrilucent",
    description:
      "Created an internal research repository by leading end-to-end UX work.",
    image: "/images/thumb-small-nutrilucent.png",
    href: "/nutrilucent",
  },
  {
    title: "GloriFi",
    description:
      "Redesigned website with custom iconography and product-focused visuals.",
    image: "/images/thumb-small-glorifi.png",
    href: "/glorifi",
  },
  {
    title: "National Restaurant Association",
    description:
      "Created an internal research repository for enterprise teams.",
    image: "/images/thumb-small-nationalrestaurantassociation.png",
    href: "/nra",
  },
  {
    title: "Microsoft Admin Software",
    description: "Redesigned admin tools for clarity and usability.",
    image: "/images/thumb-small-microsoftadmin.png",
    href: "/microsoft-admin",
  },
  {
    title: "Microsoft Hits Software",
    description: "Improved product visuals and shopping experience.",
    image: "/images/thumb-small-microsofthits.png",
    href: "/microsoft-hits",
  },
  {
    title: "Eddie Bauer",
    description: "Led UX research and UI design for internal tools.",
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

      <main className="min-h-screen">
        {/* HERO HEADLINE */}
        <section
          className="py-24 md:py-32 px-4"
          style={{ backgroundColor: "white" }}
        >
          <div className="max-w-[1200px] mx-auto">
            <h1 className="text-h1 font-light mb-6">Hi, I’m Mike</h1>
            <p className="text-h4 font-light max-w-3xl">
              I design insightful digital experiences for startups and global
              brands.
            </p>
          </div>
        </section>

        {/* HERO BODY */}
        <section className="py-12 px-4" style={{ backgroundColor: "white" }}>
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="max-w-xl">
              <h2 className="text-h2 font-light mb-12">About me</h2>

              <div className="space-y-8 text-body1 leading-relaxed">
                <p>
                  I’m originally from Chicago, where I studied graphic design at
                  UIC.
                </p>
                <p>After relocating to Seattle, I moved into UX.</p>
                <p>
                  Currently based in Miami, I’m a cyclist and outdoors
                  enthusiast.
                </p>
              </div>
            </div>

            <div className="relative h-[500px] w-full">
              <Image
                src="/images/thumb-large-profile.png"
                alt="Mike profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* EXPERIENCE + TECH STACK */}
        <section
          className="py-24 px-4"
          style={{
            backgroundColor: "red",
            minHeight: "500px",
            border: "4px solid black",
          }}
        >
          <div className="max-w-[1200px] mx-auto">
            {/* TITLE BLOCK */}
            <div
              style={{
                backgroundColor: "blue",
                padding: "20px",
                border: "3px solid black",
                marginBottom: "48px",
              }}
            >
              <h2 className="text-h2 font-light">Experience and Tech Stack</h2>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-12 gap-x-12 gap-y-16">
              {/* META */}
              <div
                className="col-span-12 md:col-span-6"
                style={{
                  backgroundColor: "green",
                  padding: "20px",
                  border: "3px solid black",
                }}
              >
                <div className="grid grid-cols-2 gap-x-12 gap-y-[48px]">
                  {metrics.map((metric, i) => (
                    <div
                      key={i}
                      style={{ border: "2px dashed black", padding: "10px" }}
                    >
                      <h1 className="text-h1 font-light mb-2">
                        {metric.value}
                      </h1>
                      <h4 className="text-h4 font-normal">{metric.label}</h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* LOGOS */}
              <div
                className="col-span-12 md:col-span-6"
                style={{
                  backgroundColor: "yellow",
                  padding: "20px",
                  border: "3px solid black",
                }}
              >
                <div className="grid grid-cols-3 gap-x-12 gap-y-[48px] items-start">
                  <Image
                    src="/images/logo-figma.svg"
                    alt="Figma"
                    width={97}
                    height={40}
                  />
                  <Image
                    src="/images/logo-n8n.svg"
                    alt="n8n"
                    width={103}
                    height={40}
                  />
                  <Image
                    src="/images/logo-tailwindcss.svg"
                    alt="TailwindCSS"
                    width={146}
                    height={40}
                  />

                  <Image
                    src="/images/logo-cursor.svg"
                    alt="Cursor"
                    width={109}
                    height={40}
                  />
                  <Image
                    src="/images/logo-github.svg"
                    alt="GitHub"
                    width={101}
                    height={40}
                  />
                  <Image
                    src="/images/logo-shopify.svg"
                    alt="Shopify"
                    width={107}
                    height={40}
                  />

                  <Image
                    src="/images/logo-webflow.svg"
                    alt="Webflow"
                    width={119}
                    height={40}
                  />
                  <Image
                    src="/images/logo-vercel.svg"
                    alt="Vercel"
                    width={100}
                    height={40}
                  />
                  <Image
                    src="/images/logo-huggingface.svg"
                    alt="Hugging Face"
                    width={100}
                    height={40}
                  />

                  <div className="flex gap-x-4">
                    <Image
                      src="/images/logo-react.svg"
                      alt="React"
                      width={36}
                      height={40}
                    />
                    <Image
                      src="/images/logo-typescript.svg"
                      alt="TypeScript"
                      width={29}
                      height={40}
                    />
                  </div>

                  <div className="flex gap-x-4">
                    <Image
                      src="/images/logo-shadcn.svg"
                      alt="shadcn"
                      width={22}
                      height={40}
                    />
                    <Image
                      src="/images/logo-ollama.svg"
                      alt="Ollama"
                      width={22}
                      height={40}
                    />
                  </div>

                  <div className="flex gap-x-4">
                    <Image
                      src="/images/logo-material.svg"
                      alt="Material"
                      width={32}
                      height={40}
                    />
                    <Image
                      src="/images/logo-fluent.svg"
                      alt="Fluent"
                      width={18}
                      height={40}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT CARDS */}
        <section className="py-24 px-4" style={{ backgroundColor: "white" }}>
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
