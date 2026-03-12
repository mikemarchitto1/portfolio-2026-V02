"use client";

import HeroSection from "@/components/hero-section/hero-section";
import ImpactTechStackSection from "@/components/impact-tech-stack-section/impact-tech-stack-section";
import ClientsSection from "@/components/clients-section/clients-section";
import Footer from "@/components/footer/footer";

const projects = [
  {
    title: "Nutrilucent",
    description:
      "Created an internal research repository by leading end-to-end UX work from foundation of research through UI design and agile handoff.",
    image: "/images/thumb-large-nutrilucent.png",
    href: "/nutrilucent",
  },
  {
    title: "AI Labs",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/images/thumb-large-ai experiments.png",
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

export default function Home() {
  return (
    <>
      <main className="min-h-screen min-w-0">
        {/* Hero */}
        <HeroSection />

        {/* IMPACT + TECH STACK */}
        <ImpactTechStackSection />

        {/* Clients */}
        <ClientsSection projects={projects} />
      </main>

      <Footer />
    </>
  );
}
