"use client";

import ActionAreaCard from "@/components/project-three/ActionAreaCard";
import ProjectCard from "@/components/project-card/project-card";
import ProjectHero from "@/components/project-hero/project-hero";
import ProjectOverview from "@/components/project-overview/project-overview";
import ProjectSectionHeader from "@/components/project-section-header/project-section-header";
import Footer from "@/components/footer/footer";
import { getNextCaseStudyHomeCard } from "@/lib/portfolio-projects";

import "../../styles/App.css";

const image_hero = "/images/microsofthits-hero.png";
const image_redlines = "/images/microsofthits_uispecs.png";
const image_designsystem = "/images/microsofthits_designsystem.png";
const image_audit = "/images/microsofthits_systemaudit.png";
const image_uiexplore = "/images/microsofthits_uiexploration.png";
const image_wireframe = "/images/microsofthits_wireframeflows.png";
const image_empathy = "/images/microsofthits_workshops.png";
const image_finaldesign = "/images/microsofthits-contentingestioneditor.png";

function Work() {
    const nextProject = getNextCaseStudyHomeCard("/projects/microsofthits");

    return (
        <>
        <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-[1328px] mx-auto">
        <div className="w-full min-w-0 flex flex-col pt-0 pb-4 md:pt-0 md:pb-8 lg:pt-0 lg:pb-16 px-0 lg:px-16 bg-transparent">

            <ProjectHero
              title="A research repository built to streamline discovery"
              subtitle="The Microsoft Hits experience enhances research ingestion, improves navigation, and introduces a consistent visual system."
              tags={[
                "Enterprise",
                "Internal Software",
                "Website",
                "Research Ops",
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


                {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box sx={{ height: 400, backgroundColor: 'black' }}>
                        <ActionAreaCard 
                            thumbnail={image_hero} 
                            name={'Silverback MMA'} 
                            descriptions={'Brandon Dudley is a professional mixed martial artist specializing in one on one training.'} 
                            route={'/designSystem'} />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box sx={{ height: 400, backgroundColor: 'red' }}>
                    <ActionAreaCard 
                            thumbnail={image_hero} 
                            name={'Eddie Bauer'} 
                            descriptions={''} 
                            route={'/designSystem'} />
                    </Box>
                </Grid>

                <Grid item xs={12} >
                    <Box sx={{ height: 400, backgroundColor: 'blue' }}>
                        <ActionAreaCard 
                            thumbnail={image_hero} 
                            name={'Microsoft Hits'} 
                            descriptions={''} 
                            route={'/designSystem'} />
                    </Box>
                </Grid> */}





            </div>



            <ProjectOverview
              situation="Microsoft's internal engineering teams relied on a legacy data intelligence repository that was throttled by rigid search structures and high workflow friction. The existing tool lacked a cohesive system foundation, severely limiting cross-organizational knowledge sharing and user visibility."
              task="As a Product Designer, my mandate was to architect a high-performance web platform that integrated corporate system standards to scale adoption. I owned the structural overhaul of the search patterns, complex data filtering interfaces, and the end-to-end user navigation layout."
              action="Conducted system audits, stakeholder interviews, and empathy mapping to isolate the core operational bottlenecks of the legacy layout. From these findings, I refactored the platform's information architecture and engineered a unified layout system that optimized the data-ingestion workflow."
              result="The redesigned repository significantly accelerated cross-functional knowledge discovery by giving technical teams greater control over complex data views. Post-launch qualitative evaluations confirmed a substantial lift in internal user satisfaction, directly driven by the cleaner, less obtrusive design framework."
            />

            <ProjectSectionHeader
              title="Discovery"
              intro="I conducted foundational research to understand how teams interacted with the legacy system, identifying friction points and opportunities for improvement."
              className="mt-12 md:mt-32"
            />


            <div className="grid grid-cols-12 gap-8 pt-12 md:pt-[128px]">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h3 className="text-h3 text-foreground mb-4">System audit</h3>
                    <p className="text-body1 text-foreground">
                    To comply with the new design direction Microsoft Hits was audited to identify areas where changes could be made.
                    </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                    <img
                      src={image_audit}
                      className="w-full h-auto rounded-[16px] object-contain"
                      width={"100%"}
                      height={"100%"}
                      alt="Large Pizza"
                    />
                </div>
            </div>


            <div className="grid grid-cols-12 gap-8 pt-12 md:pt-[128px]">
                <div className="col-span-12 sm:col-span-8 md:col-span-8 order-2 sm:order-1">
                    <img
                      src={image_empathy}
                      className="w-full h-auto rounded-[16px] object-contain"
                      width={"100%"}
                      height={"100%"}
                      alt="Large Pizza"
                    />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4 order-1 sm:order-2">
                    <h3 className="text-h3 text-foreground mb-4">Workshops</h3>
                    <p className="text-body1 text-foreground">
                    To enhance our user experience, I engaged in empathy mapping workshops which gave me an immersive opportunity to gain a deeper understanding of our target audience.
                    </p>
                </div>
            </div>


            <ProjectSectionHeader
              title="Information architecture"
              intro="I restructured the navigation and content hierarchy to reduce cognitive load and make key workflows easier to discover and complete."
              className="mt-12 md:mt-[128px]"
            />

            <div className="grid grid-cols-12 gap-8 pt-12 md:pt-[128px]">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h3 className="text-h3 text-foreground mb-4">Wireframe flows</h3>
                    <p className="text-body1 text-foreground">
                    Collaborating with stakeholders, I created low to medium fidelity wireframes as a strategic tool to extract valuable insights and better understand the intricacies of the design goals.
                    </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                    <img
                      src={image_wireframe}
                      className="w-full h-auto rounded-[16px] object-contain"
                      width={"100%"}
                      height={"100%"}
                      alt="Large Pizza"
                    />
                </div>
            </div>


            <ProjectSectionHeader
              title="Visual design"
              intro="I applied Microsoft’s design principles to create a cleaner, more accessible interface that supports clarity, consistency, and long‑term scalability."
              className="mt-12 md:mt-32"
            />

            <div className="grid grid-cols-12 gap-8 pt-12 md:pt-[128px]">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h3 className="text-h3 text-foreground mb-4">UI exploration</h3>
                    <p className="text-body1 text-foreground">
                    By considering every element of the wireframes and incorporating relevant design elements, I was able to ensure that the resulting mockups were both visually appealing and functional, bringing the wireframes to life and providing a clear representation of the final product.
                    </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                    <img
                      src={image_uiexplore}
                      className="w-full h-auto rounded-[16px] object-contain"
                      width={"100%"}
                      height={"100%"}
                      alt="Large Pizza"
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8 mt-12 md:mt-[128px] pt-0">
                <div className="col-span-12 sm:col-span-8 md:col-span-8 order-2 sm:order-1">
                    <img
                      src={image_designsystem}
                      className="w-full h-auto rounded-[16px] object-contain"
                      width={"100%"}
                      height={"100%"}
                      alt="Large Pizza"
                    />
                </div>

                <div className="col-span-12 sm:col-span-4 md:col-span-4 order-1 sm:order-2">
                    <h3 className="text-h3 text-foreground mb-4">Design system</h3>
                    <p className="text-body1 text-foreground">
                    I crafted a series of reusable UI components that could be seamlessly integrated throughout the product design cycle so we could maintain a consistent and streamlined user experience.
                    </p>
                </div>
            </div>


            <div className="grid grid-cols-12 gap-8 pt-12 md:pt-[128px]">
                <div className="col-span-12 sm:col-span-4 md:col-span-4">
                    <h3 className="text-h3 text-foreground mb-4">UI specs</h3>
                    <p className="text-body1 text-foreground">
                    To promote smooth and efficient teamwork during the implementation of the design system we decided to use Redline documentation as a way of communicating important information about the structure and functionality of all components.
                    </p>
                </div>

                <div className="col-span-12 sm:col-span-8 md:col-span-8">
                    <img
                      src={image_redlines}
                      className="w-full h-auto rounded-[16px] object-contain"
                      width={"100%"}
                      height={"100%"}
                      alt="Large Pizza"
                    />
                </div>
            </div>



            <ProjectSectionHeader
              title="Product shipped"
              intro="The final release delivered a modernized research platform that improved usability, reduced friction, and enabled teams to work more efficiently."
              className="mt-12 md:mt-[128px]"
            />

            <div className="grid grid-cols-12 gap-4 pt-12 md:pt-[128px]">
                <div className="col-span-12 lg:col-span-6 text-left min-w-0">
                    <h3 className="text-h3 text-foreground mb-0">
                      Content ingestion editor
                    </h3>
                    <p className="text-body1 text-foreground mt-4 mb-8">
                      This customizable tool facilitates the ingestion, editing, and collaborative management of UX research content for Microsoft, providing valuable insights and data to the organization.
                    </p>
                </div>

                <div className="col-span-12">
                    <img
                      src={image_finaldesign}
                      className="w-full rounded-[16px]"
                      width={"100%"}
                      height={"100%"}
                      alt="Large Pizza"
                    />
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
