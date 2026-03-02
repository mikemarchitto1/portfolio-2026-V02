"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const METRICS = [
  { value: "10", label: "Years Working" },
  { value: "4", label: "Product Builds" },
  { value: "350", label: "Testing Hours" },
  { value: "3", label: "AI Explorations" },
];

const TECH_ITEMS: { src: string; alt: string }[] = [
  { src: "/images/logo-figma.svg", alt: "Figma" },
  { src: "/images/logo-cursor.svg", alt: "Cursor" },
  { src: "/images/logo-openai.svg", alt: "OpenAI" },
  { src: "/images/logo-webflow.svg", alt: "Webflow" },
  { src: "/images/logo-next.svg", alt: "Next.js" },
  { src: "/images/logo-claude.svg", alt: "Claude" },
  { src: "/images/logo-shopify.svg", alt: "Shopify" },
  { src: "/images/logo-framer.svg", alt: "Framer" },
  { src: "/images/logo-adobe.svg", alt: "Adobe" },
  { src: "/images/logo-n8n.svg", alt: "n8n" },
  { src: "/images/logo-github.svg", alt: "GitHub" },
  { src: "/images/logo-vercel.svg", alt: "Vercel" },
  { src: "/images/logo-material.svg", alt: "Material UI" },
  { src: "/images/logo-fluent.svg", alt: "Fluent UI" },
  { src: "/images/logo-tailwindcss.svg", alt: "Tailwind CSS" },
  { src: "/images/logo-react.svg", alt: "React" },
  { src: "/images/logo-typescript.svg", alt: "TypeScript" },
  { src: "/images/logo-shadcn.svg", alt: "Shadcn UI" },
  { src: "/images/logo-ollama.svg", alt: "Ollama" },
  { src: "/images/logo-huggingface.svg", alt: "Hugging Face" },
  { src: "/images/logo-openrouter.svg", alt: "OpenRouter" },
];

/**
 * Impact and Tech Stack module built with shadcn Card primitives.
 * Mirrors the existing module content and layout; placed above the original.
 */
export default function ImpactTechCard() {
  return (
    <section
      className="w-full min-h-[520px]"
      aria-labelledby="impact-tech-card-heading"
    >
      <div className="w-full max-w-[1328px] mx-auto min-h-[520px] p-16">
        <div className="w-full flex flex-col">
          <h2
            id="impact-tech-card-heading"
            className="text-h2 font-light text-left text-foreground w-full mb-16"
          >
            Impact and Tech Stack
          </h2>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Impact metrics — one Card per metric */}
            <div className="grid grid-cols-2 grid-rows-2 gap-4 min-w-0">
              {METRICS.map((metric, i) => (
                <Card
                  key={i}
                  className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-body1 font-medium text-foreground">
                      {metric.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <span className="text-h1 font-light text-foreground">
                      {metric.value}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Right: Tech stack — one Card per logo + label */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 min-w-0">
              {TECH_ITEMS.map((item, i) => (
                <Card
                  key={i}
                  className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center min-h-[80px]"
                >
                  <CardContent className="flex flex-col items-center justify-center pt-6 pb-2">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-12 h-auto object-contain shrink-0"
                    />
                  </CardContent>
                  <CardFooter className="pt-0 pb-4 justify-center">
                    <CardDescription className="text-caption text-center">
                      {item.alt}
                    </CardDescription>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
