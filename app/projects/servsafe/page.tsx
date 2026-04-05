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
                title="Food safety training and certification, made clearer"
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
                intro="I conducted a series of research activities to understand user expectations around food safety training and certification workflows."
                className="mt-32"
              />

              <div className="grid grid-cols-12 gap-8 mt-32">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">System Audit</h3>
                  <p className="text-body1 text-foreground">
                    I carefully reviewed several banking and financial apps, evaluating
                    their features and identifying areas for improvement. This helped me
                    gain a comprehensive understanding of the app landscape.
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
                title="Information Architecture"
                intro="I mapped the core navigation, content hierarchy, and user flows to ensure the experience remained intuitive, predictable, and aligned with user mental models."
                className="mt-[128px]"
              />

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Wireframe Flows</h3>
                  <p className="text-body1 text-foreground">
                    I created user flows and wireframes, examining the design process
                    and identifying areas for improvement. We discussed potential
                    issues and brainstormed solutions to ensure a seamless and
                    user-friendly experience.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src="/images/servsafe-wireframeflows.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Wireframes"
                  />
                </div>
              </div>

              <ProjectSectionHeader
                title="Visual Design"
                intro="I created a scalable design system that unified typography, color, spacing, and component patterns across mobile and web."
                className="mt-32"
              />

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">UI Exploration</h3>
                  <p className="text-body1 text-foreground">
                    I used our brand styles and design system components to create
                    consistent and visually appealing mockups. This approach ensured
                    that our final product was effective and aligned with our brand's
                    guidelines and design principles.
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
                    src="/images/glorifi-designsystem.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Design system"
                  />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4 order-1 sm:order-2">
                  <h3 className="text-h3 text-foreground mb-4">Design System</h3>
                  <p className="text-body1 text-foreground">
                    This UI framework saved time and effort for the team by providing
                    pre-built components and promoting best UI practices. The framework
                    also allowed for easier maintenance and updates without compromising
                    the site's integrity.
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
                    src="/images/servsafe-wireframeflows.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Insights and iteration"
                  />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4 order-1 sm:order-2">
                  <h3 className="text-h3 text-foreground mb-4">Insights and Iteration</h3>
                  <p className="text-body1 text-foreground">
                    Testing surfaced several opportunities to improve clarity, reduce
                    friction, and strengthen the overall flow. These insights guided a
                    focused round of refinements to ensure the experience felt intuitive,
                    consistent, and aligned with user expectations.
                  </p>
                </div>
              </div>

              <ProjectSectionHeader
                title="Product Shipped"
                intro="The final product delivered a cohesive financial experience that combined news, insights, rewards, and account management into a polished, user‑friendly interface."
                className="mt-[128px]"
              />

              <div className="grid grid-cols-12 gap-8 pt-32">
                <div className="col-span-12 text-left min-w-0 mb-4">
                  <h3 className="text-h3 text-foreground mb-4">Today</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                    This news feed presents global and financial news with a TikTok-style
                    swipe interface. It's easy to browse and visually engaging for both
                    casual readers and investors who want to stay informed.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src="/images/glorifi-today.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Today feature"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 text-left min-w-0 mb-4">
                  <h3 className="text-h3 text-foreground mb-4">Snapshot</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                    This dashboard helps you view income, expenses, investments, and
                    debts. You can monitor progress, identify improvement areas, and
                    make informed decisions.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src="/images/glorifi-snapshot.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Snapshot feature"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 text-left min-w-0 mb-4">
                  <h3 className="text-h3 text-foreground mb-4">Rewards</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                    We redesigned and reskinned the vendor loyalty feature so users get
                    rewards and discounts from their favorite service providers.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src="/images/glorifi-rewards.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Rewards feature"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 text-left min-w-0 mb-4">
                  <h3 className="text-h3 text-foreground mb-4">Accounts</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                    Reusable marketing cards and user flow screens simplify banking
                    account opening. This approach helps users select the right account
                    and quickly complete the task.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src="/images/glorifi-accounts.png"
                    className="w-full h-auto rounded-[16px] object-contain"
                    alt="Accounts feature"
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
