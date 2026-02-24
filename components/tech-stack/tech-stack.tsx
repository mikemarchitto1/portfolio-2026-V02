"use client";

import Image from "next/image";

const LOGO_MAP: Record<string, string> = {
  Figma: "/images/logo-figma.svg",
  Webflow: "/images/logo-webflow.svg",
  Shopify: "/images/logo-shopify.svg",
  shopify: "/images/logo-shopify.svg",
  n8n: "/images/logo-n8n.svg",
  "Llama Tool": "/images/logo-ollama.svg",
  CURSOR: "/images/logo-cursor.svg",
  "NEXT.JS": "/images/logo-next.svg",
  tailwindcss: "/images/logo-tailwindcss.svg",
  GitHub: "/images/logo-github.svg",
  OpenAI: "/images/logo-openai.svg",
  Claude: "/images/logo-claude.svg",
  "Hugging Face": "/images/logo-huggingface.svg",
  Vercel: "/images/logo-vercel.svg",
  TypeScript: "/images/logo-typescript.svg",
};

export function TechStack() {
  return (
    <section className="space-y-6">
      <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
        Tech Stack
      </h2>

      <div className="grid grid-cols-4 gap-x-12 gap-y-6">
        {/* COLUMN 1 */}
        <div className="flex flex-col items-start gap-4">
          <TechItem name="Figma" />
          <TechItem name="Webflow" />
          <TechItem name="Shopify" />
          <TechItem name="n8n" />
          <TechItem name="Llama Tool" />
        </div>

        {/* COLUMN 2 */}
        <div className="flex flex-col items-start gap-4">
          <TechItem name="CURSOR" />
          <TechItem name="NEXT.JS" />
          <TechItem name="tailwindcss" />
          <TechItem name="GitHub" />
          <TechItem name="Framer" />
        </div>

        {/* COLUMN 3 */}
        <div className="flex flex-col items-start gap-4">
          <TechItem name="OpenAI" />
          <TechItem name="Claude" />
          <TechItem name="Hugging Face" />
          <TechItem name="Vercel" />
          <TechItem name="TypeScript" />
        </div>

        {/* COLUMN 4 */}
        <div className="flex flex-col items-start gap-4">
          <TechItem name="Cat Tool" />
        </div>
      </div>
    </section>
  );
}

function TechItem({ name }: { name: string }) {
  const logo = LOGO_MAP[name];
  const isLarger = name === "tailwindcss" || name === "Hugging Face";
  const isMedium = name === "Claude";
  const size = isLarger ? 88 : isMedium ? 56 : 32;

  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-0 leading-none">
      <div
        className="inline-flex shrink-0 items-center justify-center rounded bg-pink-200 overflow-hidden p-0"
        style={{ width: size, height: size }}
      >
        {logo ? (
          <Image
            src={logo}
            alt=""
            width={size}
            height={size}
            className="object-contain block"
            style={{ width: size, height: size }}
          />
        ) : null}
      </div>
      <span className="text-sm text-neutral-900 leading-none">{name}</span>
    </div>
  );
}
