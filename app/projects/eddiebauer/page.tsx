"use client";

import ActionAreaCard from "@/components/project-three/ActionAreaCard";
import ProjectCard from "@/components/project-card/project-card";
import ProjectHero from "@/components/project-hero/project-hero";
import ProjectOverview from "@/components/project-overview/project-overview";
import ProjectSectionHeader from "@/components/project-section-header/project-section-header";
import Footer from "@/components/footer/footer";
import { getNextCaseStudyHomeCard } from "@/lib/portfolio-projects";

import "../../styles/App.css";

const image_hero = "/images/eddiebauer-hero.png";
const image_workshops = "/images/eddiebauer-workshops.png";
const image_compaudit = "/images/eddiebauer-competitiveaudit.png";
const image_wireframe = "/images/eddiebauer_wireframeflows.png";
const image_designsystem = "/images/eddiebauer-designsystem.png";
const image_uiexplore = "/images/eddiebauer-uiexploration.png";
const image_systemicons = "/images/eddiebauer-systemiconography.png";
const image_productdetails = "/images/eddiebauer-productdetails.png";

function Work() {
    const nextProject = getNextCaseStudyHomeCard("/projects/eddiebauer");

    return (
        <>
        <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-[1328px] mx-auto">
        <div className="w-full min-w-0 flex flex-col pt-0 pb-4 md:pt-0 md:pb-8 lg:pt-0 lg:pb-16 px-0 lg:px-16 bg-transparent">

            <ProjectHero
              title="An ecommerce experience to modernize the brand"
              subtitle="The Eddie Bauer Ecommerce platform design enhances product discovery, strengthens brand identity, and improves the overall shopping experience."
              tags={[
                "Ecommerce",
                "Website",
                "Cross Platform",
                "Product Strategy",
                "UX Design",
                "Design System",
              ]}
            />

            <div className="grid grid-cols-12 gap-4 pb-0 md:pb-[80px]">

                <div className="col-span-12">
                    <div className="h-[520px] rounded-[16px] overflow-hidden">
                        <ActionAreaCard
                            thumbnail={image_hero}
                            thumbHeight={"520"}
                        // name={'GloriFi'}
                        // descriptions={'GloriFi is a fintech startup offering banking and credit cards with a focus on financial wellness information via their mobile and web application.'}
                        // route={'/designSystem'} 
                        />
                    </div>
                </div>


            </div>



            <ProjectOverview
              title="Situation"
              situationLabel="Task"
              taskLabel="Action"
              situation="Build a stronger contemporary brand with current signature technologies, engage the outdoor apparel community, and create a product description page and branded design system that cater to the users' interests while reinforcing long‑term loyalty and trust."
              task="Discovery research, competitive audits, and workshops clarified customer needs and UX gaps. These insights shaped the IA, wireframes, updated visuals, and a cohesive design system with custom icons, resulting in a cleaner, more intuitive Ecommerce experience."
              intro="Modernized Ecommerce experience by improving UX patterns, updating brand visuals, and creating a more intuitive product journey to strengthen marketing performance and long‑term customer engagement."
              result="After launch, task completion got faster, PDP drop‑offs decreased, and users consistently described the new experience as clearer and more modern. The design system also cut design and dev time because teams finally had consistent components to build with."
            />







            <ProjectSectionHeader
              title="Discovery"
              intro="I analyzed customer behavior, ecommerce patterns, and outdoor retail trends to identify opportunities for a more engaging and conversion‑friendly experience."
              className="mt-12 md:mt-32"
            />


            <div className="grid grid-cols-12 gap-8 pt-12 md:pt-[128px]">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h3 className="text-h3 text-foreground mb-4">Competitive audit</h3>
                    <p className="text-body1 text-foreground">
                    In order to gain a deeper understanding for designs in the context of outdoor clothing websites, I conducted an audit and examined patterns and strategies to engage customers.
                    </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                    <img src={image_compaudit} className="w-full h-auto rounded-[16px] object-contain" alt="Competitive audit" />
                </div>
            </div>


            <div className="grid grid-cols-12 gap-8 pt-12 md:pt-[128px]">
                <div className="col-span-12 sm:col-span-8 md:col-span-8 order-2 sm:order-1">
                    <img src={image_workshops} className="w-full h-auto rounded-[16px] object-contain" alt="Workshops" />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4 order-1 sm:order-2">
                    <h3 className="text-h3 text-foreground mb-4">Workshops</h3>
                    <p className="text-body1 text-foreground">
                    Facilitated a series of cross-functional workshops guiding teams through pattern reviews, content evaluation, and usability discussions to uncover opportunities for a more cohesive and intuitive product experience.
                    </p>
                </div>
            </div>



            <ProjectSectionHeader
              title="Information architecture"
              intro="I refined the site structure and product hierarchy to make browsing easier and ensure customers could quickly find relevant gear and apparel."
              className="mt-12 md:mt-[128px]"
            />

            <div className="grid grid-cols-12 gap-8 pt-12 md:pt-[128px]">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h3 className="text-h3 text-foreground mb-4">Wireframe flows</h3>
                    <p className="text-body1 text-foreground">
                    I created wireframes with the aim of gaining valuable insight into the user experience of customers and to identify any areas that required improvement.
                    </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                    <img src={image_wireframe} className="w-full h-auto rounded-[16px] object-contain" alt="Wireframe flows" />
                </div>
            </div>


            <ProjectSectionHeader
              title="Visual design"
              intro="I developed updated visual styles and UI components that modernized the brand while maintaining its heritage and outdoor identity."
              className="mt-12 md:mt-[128px]"
            />

            <div className="grid grid-cols-12 gap-8 pt-12 md:pt-[128px]">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h3 className="text-h3 text-foreground mb-4">UI exploration</h3>
                    <p className="text-body1 text-foreground">
                    Key components were designed utilizing the design system to bring wireframes to life. This ensured mockups were visually cohesive and aligned with the brand’s values and aesthetic.
                    </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                    <img src={image_uiexplore} className="w-full h-auto rounded-[16px] object-contain" alt="UI exploration" />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8 mt-12 md:mt-[128px] pt-0">
                <div className="col-span-12 sm:col-span-8 md:col-span-8 order-2 sm:order-1">
                    <img src={image_systemicons} className="w-full h-auto rounded-[16px] object-contain" alt="System icons" />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4 order-1 sm:order-2">
                    <h3 className="text-h3 text-foreground mb-4">System icons</h3>
                    <p className="text-body1 text-foreground">
                    Crafting a custom system icon library strengthened the brand’s visual language, ensured consistent interaction patterns across the product, and provided development with a unified, scalable asset package that supports a clear and intuitive user experience.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8 mt-12 md:mt-[128px] pt-0">
                <div className="col-span-12 sm:col-span-8 md:col-span-8 order-2 sm:order-1">
                    <img
                      src={image_designsystem}
                      className="w-full h-auto rounded-[16px] object-contain"
                      alt="Design system"
                    />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4 order-1 sm:order-2">
                    <h3 className="text-h3 text-foreground mb-4">Design system</h3>
                    <p className="text-body1 text-foreground">
                    To maintain a consistent user experience, styles and UI components were established and documented for seamless handoff to development, resulting in a polished and cohesive interface.
                    </p>
                </div>
            </div>


            <ProjectSectionHeader
              title="Product shipped"
              intro="The final experience delivered a cleaner, more cohesive ecommerce platform with reusable components that support ongoing marketing and merchandising needs."
              className="mt-12 md:mt-[128px]"
            />


            <div className="grid grid-cols-12 gap-4 pt-12 md:pt-[128px]">
                <div className="col-span-12 lg:col-span-6 text-left min-w-0">
                    <h3 className="text-h3 text-foreground mb-0">Product details</h3>
                    <p className="text-body1 text-foreground mt-4 mb-8">
                      The product details page now has a modern and minimalistic design giving a sophisticated impression. The search function helps users navigate reviews and questions, boosting customer confidence in purchasing decisions.
                    </p>
                </div>

                <div className="col-span-12">
                    <img src={image_productdetails} className="w-full rounded-[16px]" width={"100%"} height={"100%"} alt="Large Pizza" />
                </div>
            </div>



            <div className="grid grid-cols-12 gap-8 pt-12 md:pt-[128px]">

                <div className="col-span-12 lg:col-span-5">
                    <div className="w-full">
                        <h2 className="text-h2 text-foreground mb-4">Next project</h2>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-7 min-w-0">
                    <div className="w-full min-w-0">
                        {nextProject ? <ProjectCard {...nextProject} layout="vertical" /> : null}
                    </div>
                </div>

            </div>




        </div>
        </div>
        </div>
        <Footer />
        </>
    );
}

export default Work;
