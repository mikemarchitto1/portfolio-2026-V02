"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StatCounter } from "@/components/stat-counter/stat-counter";
import { useScrollTriggerOnce } from "@/components/stat-counter/use-scroll-trigger-once";
import { cn } from "@/lib/utils";

const metrics = [
  { value: "10", label: "Years" },
  { value: "4", label: "Products" },
  { value: "27", label: "Testings" },
  { value: "3", label: "AI Labs" },
];

/** Full tech stack grid — Impact Stats and Tech Stack section only */
function ImpactStatsTechStackLogos() {
  return (
    <>
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

      {/* Row 4: n8n, GitHub, Vercel */}
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

      {/* Row 5: Material, Fluent, Tailwind */}
      <div className="flex h-full w-full items-center justify-center gap-x-[16px]">
        <img
          src="/images/logo-material.svg"
          alt="Material"
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

      {/* Row 6: React, TypeScript, Shadcn */}
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

      {/* Row 7: Ollama, Hugging Face, OpenRouter */}
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
    </>
  );
}

/** Slim grid + centered layout — Companies section only */
function CompaniesTechStackLogos() {
  const cell =
    "flex w-full min-h-0 h-full items-center justify-center";

  return (
    <>
      <div className={cell}>
        <img
          src="/images/logo-starbucks.png"
          alt="Starbucks"
          className="max-h-[104px] md:max-h-[120px] lg:max-h-[128px] w-full max-w-[197px] h-auto object-contain object-center shrink-0"
        />
      </div>
      <div className={cell}>
        <img
          src="/images/logo-microsoft.png"
          alt="Microsoft"
          className="max-h-[104px] md:max-h-[120px] lg:max-h-[128px] w-full max-w-[172px] h-auto object-contain object-center shrink-0"
        />
      </div>
      <div className={cell}>
        <img
          src="/images/logo-eddiebauer.png"
          alt="Eddie Bauer"
          className="max-h-[104px] md:max-h-[120px] lg:max-h-[128px] w-full max-w-[211px] h-auto object-contain object-center shrink-0 translate-y-1"
        />
      </div>

      <div className={cell}>
        <img
          src="/images/logo-morningstar.png"
          alt="Morningstar"
          className="w-full max-w-[191px] h-auto object-contain object-center shrink-0"
        />
      </div>
      <div className={cell}>
        <img
          src="/images/logo-siff.png"
          alt="SIFF"
          className="w-full max-w-[212px] h-auto object-contain object-center shrink-0"
        />
      </div>
      <div className={cell}>
        <img
          src="/images/logo-fermilab.png"
          alt="Fermilab"
          className="w-[180px] h-auto object-contain object-center shrink-0"
        />
      </div>
    </>
  );
}

type ImpactTechStackSectionProps = {
  title?: string;
  /** When true, hides the stat counters and expands the logo grid to full width (e.g. Companies). */
  hideStats?: boolean;
};

export default function ImpactTechStackSection({
  title = "Impact Stats and Tech Stack",
  hideStats = false,
}: ImpactTechStackSectionProps) {
  const { ref: statsTriggerRef, triggered: statsTriggered } =
    useScrollTriggerOnce();

  return (
    <section
      className={cn(
        "w-full min-w-0 min-h-0 py-6 md:py-9 lg:pt-16 lg:pb-0 bg-transparent",
        !hideStats && "md:min-h-[480px]"
      )}
    >
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div
          className={cn(
            "max-w-[1328px] mx-auto min-h-0",
            !hideStats && "md:min-h-[480px]"
          )}
        >
          <div className="w-full mb-0 py-4 px-0 lg:px-16 lg:pb-0 bg-transparent">
            <h2 className="text-h2 font-light text-left text-foreground">
              {title}
            </h2>
          </div>

          <div className="w-full min-w-0 flex flex-col py-4 md:py-8 lg:py-16 px-0 lg:px-16 bg-transparent">
            <div
              className={cn(
                "w-full grid gap-4",
                hideStats ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
              )}
            >
              {/* Metrics */}
              {!hideStats && (
                <div className="p-0 flex flex-col min-h-0 bg-transparent md:min-h-[480px]">
                  <Card className="border-0 shadow-none bg-transparent p-0 gap-0 w-full flex-1 flex flex-col min-h-0 md:min-h-[480px] md:h-full">
                    <CardContent className="p-0 flex flex-col min-h-0 flex-1">
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
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Tech Stack */}
              <div
                className={cn(
                  "p-0 flex flex-col min-h-0 w-full min-w-0",
                  hideStats && "h-full self-stretch",
                  !hideStats && "md:min-h-[480px]"
                )}
              >
                <Card
                  className={cn(
                    "rounded-2xl w-full min-w-0 flex-1 flex flex-col overflow-hidden bg-[oklch(100%_0_0)] border-0 gap-0",
                    hideStats
                      ? "py-4 px-4 md:py-8 md:px-8 lg:py-12 lg:px-12 min-h-0 md:min-h-[480px]"
                      : "pt-4 px-4 pb-4 md:pt-8 md:px-8 md:pb-8 lg:pt-[72px] lg:px-12 lg:pb-12 min-h-0 md:min-h-[480px]"
                  )}
                >
                  <CardContent
                    className={cn(
                      "p-0 w-full",
                      hideStats && "flex flex-1 flex-col justify-center min-h-0"
                    )}
                  >
                    <div
                      className={cn(
                        "logo-columns-grid grid w-full min-w-0 grid-cols-2 lg:grid-cols-3 grid-auto-rows-[56px] md:grid-auto-rows-[72px] lg:grid-auto-rows-[80px]",
                        hideStats
                          ? "content-center max-w-none items-center justify-items-center gap-x-4 gap-y-[88px] md:gap-y-[104px] lg:gap-x-[56px] lg:gap-y-[128px]"
                          : "content-start max-w-xl lg:max-w-4xl mx-auto items-stretch gap-x-4 gap-y-4 md:gap-y-8 lg:gap-[56px]"
                      )}
                    >
                      {hideStats ? (
                        <CompaniesTechStackLogos />
                      ) : (
                        <ImpactStatsTechStackLogos />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
