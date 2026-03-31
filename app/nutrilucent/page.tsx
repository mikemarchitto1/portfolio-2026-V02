"use client";

/**
 * Nutrilucent case study — structure cloned from GloriFi (`/projects/project-one`).
 * Replace copy and image paths with Nutrilucent-specific assets when ready.
 */

import ActionAreaCard from "@/components/project-three/ActionAreaCard";
import Footer from "@/components/footer/footer";
import ProjectCard from "@/components/project-card/project-card";
import ProjectHero from "@/components/project-hero/project-hero";
import ProjectOverview from "@/components/project-overview/project-overview";
import ProjectSectionHeader from "@/components/project-section-header/project-section-header";
import { getNextCaseStudyHomeCard } from "@/lib/portfolio-projects";

/** Template: same GloriFi asset paths until Nutrilucent imagery is added. */
const image_hero = "/images/nutrilucent-hero.png";

export default function NutrilucentCaseStudy() {
  const nextProject = getNextCaseStudyHomeCard("/nutrilucent");

  return (
    <>
      <main className="min-h-screen min-w-0">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="max-w-[1328px] mx-auto">
            <div className="w-full min-w-0 flex flex-col pt-0 pb-4 md:pt-0 md:pb-8 lg:pt-0 lg:pb-16 px-0 lg:px-16 bg-transparent">
              <ProjectHero
                title="A luminous product system for clinical nutrition"
                subtitle="Nutrilucent unifies packaging, product architecture, and digital experience to express clinical trust and luminous vitality."
                tags={[
                  "Health & Wellness",
                  "Packaging",
                  "Product Design",
                  "UX Design",
                  "Brand",
                  "Design System",
                ]}
              />

              <div className="grid grid-cols-12 gap-4 pb-20">
                <div className="col-span-12">
                  <div className="h-[520px] overflow-hidden rounded-[16px]">
                    <ActionAreaCard thumbnail={image_hero} thumbHeight={"520"} />
                  </div>
                </div>
              </div>

              <ProjectOverview
                situation="Nutrilucent’s goal is to shape a cohesive product and packaging story that resonates with clinical audiences and retail partners. This case study documents research, Information Architecture and visual systems used to align the brand with its science-forward positioning."
                task="I guided research, User Interface direction, and early build decisions to clarify packaging hierarchy, product architecture, and interface patterns, ensuring every touchpoint communicates trust and vitality while supporting Nutrilucent’s emerging brand direction."
                intro="This project is an active work in progress, focused for now on early research and initial brand identity. Future phases will expand the full Nutrilucent ecosystem."
                result="This placeholder section will be updated with launch metrics, research outcomes, and adoption insights once Nutrilucent progresses into its next phase, allowing the full experience to be evaluated and measured against the goals defined in discovery."
              />

              <ProjectSectionHeader
                title="Discovery"
                intro="I led qualitative and competitive research to understand expectations around clinical nutrition, retail packaging, and digital discovery in the wellness category."
                className="mt-32"
              />

              <div className="grid grid-cols-12 gap-8 mt-32">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Research Plan</h3>
                  <p className="text-body1 text-foreground">
                    I reviewed adjacent brands and packaging systems to identify patterns,
                    opportunities, and gaps Nutrilucent could own. This established a baseline
                    for differentiation and informed later IA and visual decisions.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/nutrilucent-researchplan.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent research plan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/nutrilucent-stakeint.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent stakeholder interview"
                  />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Stakeholder Interview</h3>
                  <p className="text-body1 text-foreground">
                    I reviewed adjacent brands and packaging systems to identify patterns,
                    opportunities, and gaps Nutrilucent could own. This established a baseline
                    for differentiation and informed later IA and visual decisions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Insights Matrix</h3>
                  <p className="text-body1 text-foreground">
                    I facilitated workshops to align stakeholders on audience needs, brand
                    voice, and success metrics. Synthesis informed personas, journey maps,
                    and prioritized experience pillars for Nutrilucent.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/nutrilucent-stakeobservinsight.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent workshops"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/nutrilucent-empathymap.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent empathy map"
                  />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Empathy Map</h3>
                  <p className="text-body1 text-foreground">
                    I reviewed adjacent brands and packaging systems to identify patterns,
                    opportunities, and gaps Nutrilucent could own. This established a baseline
                    for differentiation and informed later IA and visual decisions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Stakeholder Interview Debrief</h3>
                  <p className="text-body1 text-foreground">
                    I facilitated workshops to align stakeholders on audience needs, brand
                    voice, and success metrics. Synthesis informed personas, journey maps,
                    and prioritized experience pillars for Nutrilucent.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/nutrilucent-stakedebrief.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent stakeholder interview debrief"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/nutrilucent-snapshot.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent snapshot"
                  />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Snapshot</h3>
                  <p className="text-body1 text-foreground">
                    I reviewed adjacent brands and packaging systems to identify patterns,
                    opportunities, and gaps Nutrilucent could own. This established a baseline
                    for differentiation and informed later IA and visual decisions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Competitive Audit</h3>
                  <p className="text-body1 text-foreground">
                    I facilitated workshops to align stakeholders on audience needs, brand
                    voice, and success metrics. Synthesis informed personas, journey maps,
                    and prioritized experience pillars for Nutrilucent.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/nutrilucent-compaudit.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent competitive audit"
                  />
                </div>
              </div>

              <ProjectSectionHeader
                title="Branding"
                intro="I defined a scalable system for typography, color, spacing, and components—aligned to Nutrilucent’s luminous, clinical brand language."
                className="mt-32"
              />

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Design System</h3>
                  <p className="text-body1 text-foreground">
                    A shared UI framework accelerates delivery and keeps experiences
                    consistent across web and collateral touchpoints. Replace with
                    Nutrilucent system details when finalized.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/glorifi-designsystem.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent design system"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 mt-[128px] pt-0">
                <div className="col-span-12 sm:col-span-4 md:col-span-4 order-1 lg:order-2">
                  <h3 className="text-h3 text-foreground mb-4">UI Exploration</h3>
                  <p className="text-body1 text-foreground">
                    Explorations applied brand and system components to key screens—
                    validating hierarchy, density, and accessibility before build.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8 order-2 lg:order-1">
                  <img
                    src="/images/glorifi-uiexploration.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent UI exploration"
                  />
                </div>
              </div>

              <ProjectSectionHeader
                title="Product Features"
                intro="Placeholder feature narrative for Nutrilucent—replace with product-specific highlights when content and imagery are ready."
                className="mt-[128px]"
              />

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 text-left min-w-0 mb-4">
                  <h3 className="text-h3 text-foreground mb-4">Today</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                    Placeholder section—replace with Nutrilucent feature copy and imagery
                    (e.g. hero campaign, daily digest, or retail moment).
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src="/images/glorifi-today.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent feature"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 text-left min-w-0 mb-4">
                  <h3 className="text-h3 text-foreground mb-4">Snapshot</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                    Placeholder section—replace with Nutrilucent dashboard or summary
                    experience description.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src="/images/glorifi-snapshot.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent feature"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 text-left min-w-0 mb-4">
                  <h3 className="text-h3 text-foreground mb-4">Rewards</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                    Placeholder section—replace with loyalty, community, or partner program
                    story for Nutrilucent.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src="/images/glorifi-rewards.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent feature"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 text-left min-w-0 mb-4">
                  <h3 className="text-h3 text-foreground mb-4">Accounts</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                    Placeholder section—replace with account, subscription, or commerce
                    flow narrative for Nutrilucent.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src="/images/glorifi-accounts.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Nutrilucent feature"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 mt-[128px]">
                <div className="col-span-12 lg:col-span-5 pb-0">
                  <div className="w-full">
                    <h2 className="text-h2 text-foreground mb-4">Next Project</h2>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-7 pb-0 min-w-0">
                  {nextProject ? <ProjectCard {...nextProject} layout="vertical" /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
