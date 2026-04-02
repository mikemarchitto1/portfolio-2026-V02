"use client";

import HeroSection from "@/components/hero-section/hero-section";
import ImpactTechStackSection from "@/components/impact-tech-stack-section/impact-tech-stack-section";
import ClientsSection from "@/components/clients-section/clients-section";
import Footer from "@/components/footer/footer";
import { HOME_PROJECT_CARDS } from "@/lib/portfolio-projects";

export default function Home() {
  return (
    <>
      <main className="min-h-screen min-w-0">
        {/* Hero */}
        <HeroSection />

        {/* IMPACT + TECH STACK — 64px gap below hero */}
        <div className="mt-16">
          <ImpactTechStackSection />
        </div>

        <div className="pt-12">
          <ImpactTechStackSection title="Companies" hideStats />
        </div>

        {/* Clients */}
        <ClientsSection projects={HOME_PROJECT_CARDS} />
      </main>

      <Footer />
    </>
  );
}
