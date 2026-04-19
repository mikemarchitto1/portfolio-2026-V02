"use client";

import ActionAreaCard from "@/components/project-three/ActionAreaCard";
import Footer from "@/components/footer/footer";
import ProjectCard from "@/components/project-card/project-card";
import ProjectHero from "@/components/project-hero/project-hero";
import ProjectOverview from "@/components/project-overview/project-overview";
import ProjectSectionHeader from "@/components/project-section-header/project-section-header";
import { getNextCaseStudyHomeCard } from "@/lib/portfolio-projects";

const image_hero = "/images/servsafe-hero.png";

export default function ServSafeCaseStudy() {
  const nextProject = getNextCaseStudyHomeCard("/projects/servsafe");

  return (
    <>
      <main className="min-h-screen min-w-0">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="max-w-[1328px] mx-auto">
            <div className="w-full min-w-0 flex flex-col pt-0 pb-4 md:pt-0 md:pb-8 lg:pt-0 lg:pb-16 px-0 lg:px-16 bg-transparent">
              <ProjectHero
                title="Food safety training and certification made clearer"
                subtitle="ServSafe strengthens learning flows, usability, and intuitive training experiences for teams and learners across the food service industry."
                tags={[
                  "Foodservice",
                  "Website",
                  "Training",
                  "Product Strategy",
                  "UX Design",
                  "Design System",
                ]}
              />

              <div className="grid grid-cols-12 gap-4 pb-20">
                <div className="col-span-12">
                  <div className="h-[504px] overflow-hidden rounded-[16px]">
                    <ActionAreaCard thumbnail={image_hero} thumbHeight={"520"} />
                  </div>
                </div>
              </div>

              <ProjectOverview
                situation="ServSafe standardizes food‑safety training and certification through clearer learning paths, improved usability, and scalable experiences. By refining how learners engage with content, the platform strengthens consistency, accessibility, and overall trust."
                task="Design a cohesive training and certification experience that supports learners and administrators with predictable navigation, strong hierarchy, and trust‑building patterns woven consistently throughout the broader product ecosystem."
                intro="This project improved a web‑based enterprise training platform by clarifying workflows, strengthening the visual system, and making training content easier to find and complete."
                result="Following launch, the platform supported improved completion rates and more consistent adoption of food‑safety practices across participating organizations, reinforcing clearer workflows and strengthening long‑term training outcomes overall."
              />

              <ProjectSectionHeader
                title="Discovery"
                intro="A series of research activities were conducted to understand user expectations around food safety training and certification workflows."
                className="mt-32"
              />

              <div className="grid grid-cols-12 gap-8 mt-32">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">System audit</h3>
                  <p className="text-body1 text-foreground">
                    ServSafe’s training and certification products were examined to
                    understand their structure, content flow, and overall user experience.
                    This review provided clarity on how the existing system supports
                    learners and administrators, and highlighted opportunities to improve
                    usability, navigation, and task completion across the platform.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/servsafe-systemaudit.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="System audit"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-8 md:col-span-8 order-2 sm:order-1">
                  <img
                    src="/images/servsafe-workshops.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Workshop synthesis"
                  />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4 order-1 sm:order-2">
                  <h3 className="text-h3 text-foreground mb-4">Workshops</h3>
                  <p className="text-body1 text-foreground">
                    Empathy mapping workshops were done to comprehend our users better.
                    The workshops aided in creating personas that reflect distinct
                    qualities and motivations, revealing areas for improvement and leading
                    to a better user experience.
                  </p>
                </div>
              </div>

              <ProjectSectionHeader
              title="Information architecture"
                intro="The core navigation, content hierarchy, and user flows were mapped to ensure the experience remained intuitive, predictable, and aligned with established user mental models."
                className="mt-32"
              />

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">User flows</h3>
                  <p className="text-body1 text-foreground">
                  User flows mapped the key decision paths learners take, clarifying steps, branches, and system responses so the team could validate logic early and remove friction.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/servsafe-userflows.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="UI explorations"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 mt-[128px] pt-0">
                <div className="col-span-12 sm:col-span-8 md:col-span-8 order-2 sm:order-1">
                  <img
                    src="/images/servsafe-wireframeflows.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Design system"
                  />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4 order-1 sm:order-2">
                  <h3 className="text-h3 text-foreground mb-4">Wireframe flows</h3>
                  <p className="text-body1 text-foreground">
                  Wireframe flows translated those paths into screen‑level structure, showing layout, hierarchy, and interactions across the journey before moving into high‑fidelity design.
                  </p>
                </div>
              </div>


              <ProjectSectionHeader
              title="Visual design"
                intro="A scalable design system was developed to unify typography, color, spacing, and component patterns across mobile and web, ensuring consistency and predictability throughout the product experience."
                className="mt-32"
              />

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">UI exploration</h3>
                  <p className="text-body1 text-foreground">
                    Brand styles and existing design system components were applied to
                    produce consistent, visually aligned mockups. This process ensured
                    that the resulting product direction remained cohesive, effective, and
                    fully aligned with established brand guidelines and design principles.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/servsafe-uiexploration.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="UI explorations"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 mt-[128px] pt-0">
                <div className="col-span-12 sm:col-span-8 md:col-span-8 order-2 sm:order-1">
                  <img
                    src="/images/servsafe_designsystem.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Design system"
                  />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4 order-1 sm:order-2">
                  <h3 className="text-h3 text-foreground mb-4">Design system</h3>
                  <p className="text-body1 text-foreground">
                    This UI framework streamlined the team’s workflow by offering
                    ready‑made components and reinforcing established interface standards.
                    It also supported smoother long‑term maintenance and updates while
                    preserving the overall stability and consistency of the site.
                  </p>
                </div>
              </div>

              <ProjectSectionHeader
                title="Testing"
                intro="The interactive flow was reviewed to assess clarity, ease of navigation, and overall usability. This evaluation surfaced opportunities to strengthen the experience and better align it with user expectations."
                className="mt-[128px]"
              />

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Prototyping</h3>
                  <p className="text-body1 text-foreground">
                    High‑fidelity screens were organized into an interactive flow that
                    demonstrated the intended behaviors and end‑to‑end journey. This step
                    made it possible to validate structure and interaction logic before
                    moving into refinement.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/servsafe-prototype.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Prototyping"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 mt-[128px] pt-0">
                <div className="col-span-12 sm:col-span-8 md:col-span-8 order-2 sm:order-1">
                  <img
                    src="/images/servsafe_observinsights.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Observations and insights"
                  />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4 order-1 sm:order-2">
                  <h3 className="text-h3 text-foreground mb-4">Observations and insights</h3>
                  <p className="text-body1 text-foreground">
                    Testing surfaced several opportunities to improve clarity, reduce
                    friction, and strengthen the overall flow. These insights guided a
                    focused round of refinements to ensure the experience felt intuitive,
                    consistent, and aligned with user expectations.
                  </p>
                </div>
              </div>

              <ProjectSectionHeader
              title="Product shipped"
                intro="A refined, intuitive training experience built on clearer workflows, consistent design, and streamlined paths that help learners complete courses and manage certifications with confidence."
                className="mt-[128px]"
              />

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 text-left min-w-0 mb-4">
                  <h3 className="text-h3 text-foreground mb-4">Dashboard</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                  The dashboard brings courses, certifications, and exam activity into one clear view. Learners can quickly see what’s required, track progress, and take action without navigating multiple pages.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src="/images/servsafe-dashboard.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Dashboard"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 text-left min-w-0 mb-4">
                  <h3 className="text-h3 text-foreground mb-4">Login</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                  The login flow provides a straightforward entry point into the ServSafe training platform, with clear fields, simple choices, and predictable steps that help users create an account quickly and confidently.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src="/images/servsafe-login.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Login"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 text-left min-w-0 mb-4">
                  <h3 className="text-h3 text-foreground mb-4">Profile settings</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                  A structured settings interface allows learners to manage key account details with clarity and consistency. Standardized components and clear validation patterns ensure secure updates and reduce support overhead.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src="/images/servsafe-profilesettings.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Rewards feature"
                  />
                </div>
              </div>

              

              <div className="grid grid-cols-12 gap-8 mt-[128px]">
                <div className="col-span-12 lg:col-span-5 pb-0">
                  <div className="w-full">
                    <h2 className="text-h2 text-foreground mb-4">Next project</h2>
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
