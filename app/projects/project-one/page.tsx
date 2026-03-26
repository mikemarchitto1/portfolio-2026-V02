"use client";

import ActionAreaCard from "@/components/project-three/ActionAreaCard";
import Footer from "@/components/footer/footer";
import ProjectCard from "@/components/project-card/project-card";
import ProjectHero from "@/components/project-hero/project-hero";
import ProjectOverview from "@/components/project-overview/project-overview";
import ProjectSectionHeader from "@/components/project-section-header/project-section-header";
import { getNextCaseStudyHomeCard } from "@/lib/portfolio-projects";

const image_hero = "/assets/project_one/hero.png";
const image_compaudit = "/assets/project_one/glorifi_compaudit.png";
const image_designsystem = "/assets/project_one/glorifi_designsystem.png";
const image_personas = "/assets/project_one/glorifi_personas.png";
const image_uiexplore = "/assets/project_one/glorifi_uiexplore.png";
const image_wireframe = "/assets/project_one/glorifi_wireframe.png";
const image_today = "/assets/project_one/glorifi_today.png";
const image_snapshot = "/assets/project_one/glorifi_snapshot.png";
const image_rewards = "/assets/project_one/glorifi_rewards.png";
const image_accounts = "/assets/project_one/glorifi_accounts.png";

export default function Work() {
  const nextProject = getNextCaseStudyHomeCard("/projects/project-one");

  return (
    <>
      <main className="min-h-screen min-w-0">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="max-w-[1328px] mx-auto">
            <div className="w-full min-w-0 flex flex-col pt-0 pb-4 md:pt-0 md:pb-8 lg:pt-0 lg:pb-16 px-0 lg:px-16 bg-transparent">
              <ProjectHero
                title="GloriFi ipsum dolor sit amet consectegtur."
                tags={["Fintech", "Mobile app", "Website", "2022", "UX Design"]}
              />

              <div className="grid grid-cols-12 gap-4 pb-20">
                <div className="col-span-12">
                  <div className="h-[520px] overflow-hidden rounded-[16px]">
                    <ActionAreaCard thumbnail={image_hero} thumbHeight={"520"} />
                  </div>
                </div>
              </div>

              <ProjectOverview
                situation="GloriFi’s goal is to offer a functional financial banking app that focuses on financial wellness information via their mobile and web application. The timeline is to launch a beta and MVP application in eight months to validate market interest and secure more funding."
                task="Design a global financial news feed and financial data insights hub that engages the U.S. cultural and financial communities by building trust, security, and privacy when opening bank accounts."
                result="Following the initial release, which involved a successful launch of the app, it was reported that more than 40,000 individuals had downloaded the application, which was a significant achievement, as it ranked 11th among all financial apps available on the market."
              />

              <ProjectSectionHeader title="Research" className="mt-32" />

              <div className="grid grid-cols-12 gap-8 pt-16">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Workshops</h3>
                  <p className="text-body1 text-foreground">
                    I carefully reviewed several banking and financial apps, evaluating
                    their features and identifying areas for improvement. This helped me
                    gain a comprehensive understanding of the app landscape.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src={image_compaudit}
                    className="w-full h-[520px] rounded-[16px] object-cover"
                    alt="Workshop synthesis"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 mt-32">
                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src={image_personas}
                    className="w-full h-[520px] rounded-[16px] object-cover"
                    alt="Personas"
                  />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Competitive Audit</h3>
                  <p className="text-body1 text-foreground">
                    I joined empathy mapping workshops to comprehend our users better.
                    The workshops aided me in creating personas that reflect their
                    distinct qualities and motivations, revealing areas for improvement
                    and leading to a better user experience.
                  </p>
                </div>
              </div>

              <ProjectSectionHeader title="Design System" className="mt-40" />

              <div className="grid grid-cols-12 gap-8 pt-16">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Branding</h3>
                  <p className="text-body1 text-foreground">
                    This UI framework saved time and effort for the team by providing
                    pre-built components and promoting best UI practices. The framework
                    also allowed for easier maintenance and updates without compromising
                    the site's integrity.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src={image_designsystem}
                    className="w-full h-[520px] rounded-[16px] object-cover"
                    alt="Design system"
                  />
                </div>
              </div>

              <ProjectSectionHeader title="Information Architecture" className="mt-40" />

              <div className="grid grid-cols-12 gap-8 pt-16">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Wireframe Flows</h3>
                  <p className="text-body1 text-foreground">
                    I worked with UX designers to review user flows and wireframes,
                    examining the design process and identifying areas for improvement.
                    We discussed potential issues and brainstormed solutions to ensure
                    a seamless and user-friendly experience.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src={image_wireframe}
                    className="w-full h-[520px] rounded-[16px] object-cover"
                    alt="Wireframes"
                  />
                </div>
              </div>

              <ProjectSectionHeader title="UI Explorations" className="mt-20" />

              <div className="grid grid-cols-12 gap-8 pt-16">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                  <h3 className="text-h3 text-foreground mb-4">Mockups</h3>
                  <p className="text-body1 text-foreground">
                    I used our brand styles and design system components to create
                    consistent and visually appealing mockups. This approach ensured
                    that our final product was effective and aligned with our brand's
                    guidelines and design principles.
                  </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                  <img
                    src={image_uiexplore}
                    className="w-full h-[520px] rounded-[16px] object-cover"
                    alt="UI explorations"
                  />
                </div>
              </div>

              <ProjectSectionHeader title="Features" className="mt-40" />

              <div className="grid grid-cols-12 gap-8 pt-16">
                <div className="col-span-12 text-left min-w-0">
                  <h3 className="text-h3 text-foreground mb-4">Today</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                    This news feed presents global and financial news with a TikTok-style
                    swipe interface. It's easy to browse and visually engaging for both
                    casual readers and investors who want to stay informed.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src={image_today}
                    className="w-full h-auto rounded-[16px]"
                    alt="Today feature"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-16">
                <div className="col-span-12 text-left min-w-0">
                  <h3 className="text-h3 text-foreground mb-4">Snapshot</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                    This dashboard helps you view income, expenses, investments, and
                    debts. You can monitor progress, identify improvement areas, and
                    make informed decisions.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src={image_snapshot}
                    className="w-full h-auto rounded-[16px]"
                    alt="Snapshot feature"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-16">
                <div className="col-span-12 text-left min-w-0">
                  <h3 className="text-h3 text-foreground mb-4">Rewards</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                    We redesigned and reskinned the vendor loyalty feature so users get
                    rewards and discounts from their favorite service providers.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src={image_rewards}
                    className="w-full h-auto rounded-[16px]"
                    alt="Rewards feature"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 pt-16">
                <div className="col-span-12 text-left min-w-0">
                  <h3 className="text-h3 text-foreground mb-4">Accounts</h3>
                  <p className="text-body1 text-foreground w-full lg:w-1/2">
                    Reusable marketing cards and user flow screens simplify banking
                    account opening. This approach helps users select the right account
                    and quickly complete the task.
                  </p>
                </div>

                <div className="col-span-12">
                  <img
                    src={image_accounts}
                    className="w-full h-auto rounded-[16px]"
                    alt="Accounts feature"
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8 mt-[72px]">
                <div className="col-span-12 lg:col-span-5 pb-0">
                  <div className="w-full">
                    <h2 className="text-h2 text-foreground mb-4">Next Project</h2>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-7 pb-40 min-w-0">
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