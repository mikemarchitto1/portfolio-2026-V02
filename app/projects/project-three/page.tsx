"use client";

import ActionAreaCard from "@/components/project-three/ActionAreaCard";
import ProjectCard from "@/components/project-card/project-card";
import ProjectHero from "@/components/project-hero/project-hero";
import ProjectOverview from "@/components/project-overview/project-overview";
import ProjectSectionHeader from "@/components/project-section-header/project-section-header";
import Footer from "@/components/footer/footer";
import { getNextCaseStudyHomeCard } from "@/lib/portfolio-projects";

import "../../styles/App.css";

const image_hero = "/assets/project_three/hero.png";
const image_compaudit = "/assets/project_three/eddiebauer_audit.png";
const image_designsystem = "/assets/project_three/eddiebauer_designsystem.png";
const image_uiexplore = "/assets/project_three/eddiebauer_uiexplore.png";
const image_wireframe = "/assets/project_three/eddiebauer_wireframe.png";
const image_promo = "/assets/project_three/eddiebauer_promo.png";
const image_icons = "/assets/project_three/eddiebauer_icons.png";
const image_finaldesign = "/assets/project_three/eddiebauer_pdp.png";

function Work() {
    const nextProject = getNextCaseStudyHomeCard("/projects/project-three");

    return (
        <>
        <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-[1328px] mx-auto">
        <div className="w-full min-w-0 flex flex-col pt-0 pb-4 md:pt-0 md:pb-8 lg:pt-0 lg:pb-0 px-0 lg:px-16 bg-transparent">

            <ProjectHero
              title="Eddie Bauer dolor sit amet consectegtur."
              tags={[
                "Ecommerce",
                "Website Redesign",
                "2018",
                "UI/UX Designer",
              ]}
            />

            <div className="grid grid-cols-12 gap-4 pb-[80px]">

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
              situation="Eddie Bauer aims to revamp their Ecommerce platform with new features and brand aesthetics within six months, in order to enhance their marketing strategy and generate more leads."
              task="Build a stronger contemporary brand with current signature technologies, engage the outdoor apparel community, and create a product description page and branded design system that cater to the users' interests."
              result="Following the launch, the findings of the qualitative research indicated that the level of satisfaction among users had increased, primarily because the design of the product was less obtrusive, and it allowed users to have greater control over the narrative of their reports."
            />







            <ProjectSectionHeader title="Research" className="mt-32" />


            <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h3 className="text-h3 text-foreground mb-4">Workshops</h3>
                    <p className="text-body1 text-foreground">
                    I carefully reviewed several outdoor clothing and ecommerce experiences, evaluating patterns, content structure, and usability gaps to identify opportunities for improvement.
                    </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                    <img src={image_compaudit} className="w-full h-[540px] rounded-[16px] object-cover" width={"100%"} height={"100%"} alt="Large Pizza" />
                </div>
            </div>


            <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                    <img src={image_compaudit} className="w-full h-[540px] rounded-[16px] object-cover" width={"100%"} height={"100%"} alt="Large Pizza" />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h3 className="text-h3 text-foreground mb-4">Competitive Audit</h3>
                    <p className="text-body1 text-foreground">
                    In order to gain a deeper understanding for designs in the context of outdoor clothing websites, I conducted an audit and examined patterns and strategies to engage customers.
                    </p>
                </div>

            </div>



            <ProjectSectionHeader title="Information Architecture" className="mt-[128px]" />

            <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h3 className="text-h3 text-foreground mb-4">Wireframe Flows</h3>
                    <p className="text-body1 text-foreground">
                    I collaborated closely with our UX designers to audit wireframes with the aim of gaining valuable insight into the user experience and to identify any areas that required improvement.
                    </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                    <img src={image_wireframe} className="w-full h-[540px] rounded-[16px] object-cover" width={"100%"} height={"100%"} alt="Large Pizza" />
                </div>
            </div>


            <ProjectSectionHeader title="Visual Design" className="mt-[128px]" />

            <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h3 className="text-h3 text-foreground mb-4">Design System</h3>
                    <p className="text-body1 text-foreground">
                    In order to ensure that the user experience remained consistent, I made styles and UI components that could be handed off to the development team, resulting in a more polished and user-friendly end result.
                    </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                    <img src={image_designsystem} className="w-full h-[540px] rounded-[16px] object-cover" width={"100%"} height={"100%"} alt="Large Pizza" />
                </div>
            </div>


            <div className="grid grid-cols-12 gap-8 pt-[128px]">
                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                    <img src={image_uiexplore} className="w-full h-[540px] rounded-[16px] object-cover" width={"100%"} height={"100%"} alt="Large Pizza" />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h3 className="text-h3 text-foreground mb-4">UI Exploration</h3>
                    <p className="text-body1 text-foreground">
                    To create appealing mockups, I invented brand styles and design components to inform and bring the wireframes to life, reflecting the brand's values and aesthetic.
                    </p>
                </div>


            </div>


            <ProjectSectionHeader title="Product Shipped" className="mt-[128px]" />


            <div className="grid grid-cols-12 gap-4 pt-[128px]">
                <div className="col-span-12 lg:col-span-6 text-left min-w-0">
                    <h3 className="text-h3 text-foreground mb-0">Promotions Carousel</h3>
                    <p className="text-body1 text-foreground mt-4 mb-8">
                      Various reusable components were created for this carousel module so that customers can browse promotions.
                    </p>
                </div>

                <div className="col-span-12">
                    <img src={image_promo} className="w-full rounded-[16px]" width={"100%"} height={"100%"} alt="Large Pizza" />
                </div>
            </div>


            <div className="grid grid-cols-12 gap-4 pt-[128px]">
                <div className="col-span-12 lg:col-span-6 text-left min-w-0">
                    <h3 className="text-h3 text-foreground mb-0">System Iconography</h3>
                    <p className="text-body1 text-foreground mt-4 mb-8">
                      To unify the brand's image, I created custom system icons that matched the brand's aesthetic.
                    </p>
                </div>

                <div className="col-span-12">
                    <img src={image_icons} className="w-full rounded-[16px]" width={"100%"} height={"100%"} alt="Large Pizza" />
                </div>
            </div>


            <div className="grid grid-cols-12 gap-4 pt-[128px]">
                <div className="col-span-12 lg:col-span-6 text-left min-w-0">
                    <h3 className="text-h3 text-foreground mb-0">Product Details Page</h3>
                    <p className="text-body1 text-foreground mt-4 mb-8">
                      The product page's modern and minimalistic design gives a sophisticated impression. The search function helps users navigate reviews and questions, boosting customer confidence in purchasing decisions.
                    </p>
                </div>

                <div className="col-span-12">
                    <img src={image_finaldesign} className="w-full rounded-[16px]" width={"100%"} height={"100%"} alt="Large Pizza" />
                </div>
            </div>



            <div className="grid grid-cols-12 gap-8 pt-[128px]">

                <div className="col-span-12 lg:col-span-5">
                    <div className="w-full">
                        <h2 className="text-h2 text-foreground mb-4">Next Project</h2>
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
