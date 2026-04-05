"use client";

import HeroSection from "@/components/hero-section/hero-section";
import ImpactTechStackSection from "@/components/impact-tech-stack-section/impact-tech-stack-section";
import ClientsSection from "@/components/clients-section/clients-section";
import Footer from "@/components/footer/footer";
import { HOME_PROJECT_CARDS } from "@/lib/portfolio-projects";

export default function Home() {
  return (
    <>
      <main className="min-h-screen min-w-0 pb-4">
        {/* Hero */}
        <HeroSection />

        <div className="mt-[4px]">
          <ImpactTechStackSection />
        </div>

        <div className="pt-1">
          <ImpactTechStackSection title="Companies" hideStats />
        </div>

        <div className="mt-4">
          <ClientsSection projects={HOME_PROJECT_CARDS} />
        </div>
      </main>

      <Footer />
    </>
  );
}
