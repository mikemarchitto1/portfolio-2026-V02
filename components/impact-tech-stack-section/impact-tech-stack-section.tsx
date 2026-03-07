"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { StatCounter } from "@/components/stat-counter/stat-counter";
import { useScrollTriggerOnce } from "@/components/stat-counter/use-scroll-trigger-once";

const metrics = [
  { value: "10", label: "Years" },
  { value: "4", label: "Products" },
  { value: "27", label: "Testings" },
  { value: "3", label: "AI Works" },
];

export default function ImpactTechStackSection() {
  const { ref: statsTriggerRef, triggered: statsTriggered } =
    useScrollTriggerOnce();

  return (
    <section className="w-full min-w-0 min-h-0 md:min-h-[520px] py-6 md:py-9 lg:py-12 bg-transparent">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-[1328px] mx-auto min-h-0 md:min-h-[520px]">
          <div className="w-full mb-0 py-4 px-0 lg:px-16 bg-transparent">
            <h1 className="text-h2 font-light text-left text-foreground">
              Impact Stats and Tech Stack
            </h1>
          </div>

          <div className="w-full min-w-0 flex flex-col py-4 md:py-8 lg:py-16 px-0 lg:px-16 bg-transparent">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Metrics */}
              <div className="p-0 flex flex-col min-h-0 bg-transparent">
                <Card className="border-0 shadow-none bg-transparent p-0 gap-0 w-full flex-1 flex flex-col min-h-0">
                  <CardContent className="p-0 flex flex-col min-h-0 flex-1">
                    <div ref={statsTriggerRef} className="numbers-anchor p-0 w-full flex-1 flex flex-col min-h-0">
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

              {/* Tech Stack */}
              <div className="p-0 flex flex-col min-h-0">
                <Card className="rounded-2xl shadow-elevation pt-6 px-6 pb-6 md:pt-10 md:px-8 md:pb-10 lg:pt-16 lg:px-12 lg:pb-12 w-full min-w-0 flex-1 min-h-0 flex flex-col overflow-hidden bg-white border-0 gap-0">
                  <CardContent className="p-0">
                    <div className="grid w-full min-w-0 max-w-full grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 lg:gap-x-[56px] gap-y-4 md:gap-y-8 lg:gap-y-[52px] grid-auto-rows-[56px] md:grid-auto-rows-[72px] lg:grid-auto-rows-[80px] items-stretch content-start">
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
