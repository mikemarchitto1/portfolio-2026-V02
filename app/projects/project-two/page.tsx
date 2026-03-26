"use client";

import {
  Box,
  CssBaseline,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@/components/project-three/mui-compat";

import ActionAreaCard from "@/components/project-three/ActionAreaCard";
import ProjectCard from "@/components/project-card/project-card";
import ProjectHero from "@/components/project-hero/project-hero";
import ProjectOverview from "@/components/project-overview/project-overview";
import ProjectSectionHeader from "@/components/project-section-header/project-section-header";
import Footer from "@/components/footer/footer";
import { getNextCaseStudyHomeCard } from "@/lib/portfolio-projects";

import "../../styles/App.css";

const image_hero = "/assets/project_two/hero.png";
const image_redlines = "/assets/project_two/microsoft_redline.png";
const image_designsystem = "/assets/project_two/microsoft_designsystem.png";
const image_audit = "/assets/project_two/microsoft_audit.png";
const image_uiexplore = "/assets/project_two/microsoft_uiexplore.png";
const image_wireframe = "/assets/project_two/microsoft_wireframe.png";
const image_empathy = "/assets/project_two/microsoft_empathymap.png";
const image_finaldesign = "/assets/project_two/microsoft_cie.png";

const muiTheme = createTheme();

function Work() {
    const nextProject = getNextCaseStudyHomeCard("/projects/project-two");

    return (
        <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-[1328px] mx-auto">
        <div className="w-full min-w-0 flex flex-col pt-0 pb-4 md:pt-0 md:pb-8 lg:pt-0 lg:pb-0 px-0 lg:px-16 bg-transparent">

            <ProjectHero
              title="Microsoft Hits dolor sit amet consectegtur."
              tags={[
                "Infotech",
                "UX Research Repository",
                "2019",
                "UI/UX Designer",
              ]}
            />

            <Grid container spacing={2} sx={{ paddingBottom: 10, }}>

                <Grid item xs={12} >
                    <Box sx={{ height: 520, borderRadius: '16px', overflow: 'hidden' }}>
                        <ActionAreaCard
                            thumbnail={image_hero}
                            thumbHeight={"520"}
                        // name={'GloriFi'}
                        // descriptions={'GloriFi is a fintech startup offering banking and credit cards with a focus on financial wellness information via their mobile and web application.'}
                        // route={'/designSystem'} 
                        />
                    </Box>
                </Grid>


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
                            name={'Microsoft HITS'} 
                            descriptions={''} 
                            route={'/designSystem'} />
                    </Box>
                </Grid> */}





            </Grid>



            <ProjectOverview
              situation="The objective of the Microsoft HITS team is to enhance the usability and functionality of the legacy system within a six-month timeline. The team plans to achieve this goal by implementing a new design system and style guide in the redesign and reskinning of the system."
              task="Create an enhanced web tool software that utilizes Microsofts branding standards to help attract and engage more users within the organization."
              result="Following the launch, the findings of the qualitative research indicated that the level of satisfaction among users had increased, primarily because the design of the product was less obtrusive, and it allowed users to have greater control over the narrative of their reports."
            />

            <ProjectSectionHeader title="Research" className="mt-32" />


            <Grid container spacing={4} sx={{ paddingTop: 16, }}>
                <Grid item xs={12} sm={4} md={4} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={2}>
                    Workshops
                    </Typography>
                    <Typography variant="body1" component="p" color="text.primary">
                    To enhance our user experience, I engaged in empathy mapping workshops which gave me an immersive opportunity to gain a deeper understanding of our target audience.                    </Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={8}>
                    <img src={image_empathy} className="w-full h-[504px] rounded-[16px] object-cover" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>
            </Grid>


            <Grid container spacing={4} sx={{ paddingTop: 16, }}>
                <Grid item xs={12} sm={8} md={8}>
                    <img src={image_audit} className="w-full h-[504px] rounded-[16px] object-cover" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>

                <Grid item xs={12} sm={4} md={4} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={2}>
                    Legacy Audit
                    </Typography>
                    <Typography variant="body1" component="p" color="text.primary">
                    To comply with the new design direction, I audited the HITS legacy version to identify areas where changes could be made.                    
                    </Typography>
                </Grid>


            </Grid>


            <ProjectSectionHeader title="Information Architecture" className="mt-[128px]" />

            <Grid container spacing={4} sx={{ paddingTop: 16, }}>
                <Grid item xs={12} sm={4} md={4} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={2}>
                        Wireframe Flows
                    </Typography>
                    <Typography variant="body1" component="p" color="text.primary">
                    Collaborating with stakeholders, I created low to medium-fidelity wireframes as a strategic tool to extract valuable insights and better understand the intricacies of the design goals.
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={8}>
                    <img src={image_wireframe} className="w-full h-[504px] rounded-[16px] object-cover" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>
            </Grid>


            <ProjectSectionHeader title="Visual Design" className="mt-32" />

            <Grid container spacing={4} sx={{ paddingTop: 16, }}>
                <Grid item xs={12} sm={4} md={4} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={2}>
                        Design System
                    </Typography>
                    <Typography variant="body1" component="p" color="text.primary">
                    I crafted a series of reusable UI components that could be seamlessly integrated throughout the product design cycle so we could maintain a consistent and streamlined user experience.
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={8}>
                    <img src={image_designsystem} className="w-full h-[504px] rounded-[16px] object-cover" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>
            </Grid>


            <Grid container spacing={4} sx={{ paddingTop: 16, }}>
                <Grid item xs={12} sm={8} md={8}>
                    <img src={image_uiexplore} className="w-full h-[504px] rounded-[16px] object-cover" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>

                <Grid item xs={12} sm={4} md={4} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={2}>
                        UI Exploration
                    </Typography>
                    <Typography variant="body1" component="p" color="text.primary">
                    By considering every element of the wireframes and incorporating relevant design elements, I was able to ensure that the resulting mockups were both visually appealing and functional, bringing the wireframes to life and providing a clear representation of the final product.
                    </Typography>
                </Grid>


            </Grid>


            <Grid container spacing={4} sx={{ paddingTop: 16, }}>
                <Grid item xs={12} sm={4} md={4} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={2}>
                    UI Specs
                    </Typography>
                    <Typography variant="body1" component="p" color="text.primary">
                    In order to promote smooth and efficient teamwork during the implementation of the design system, the team decided to use Redline documentation as a way of communicating important information about the structure and functionality of all the components within the system.             
                     </Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={8}>
                    <img src={image_redlines} className="w-full h-[504px] rounded-[16px] object-cover" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>
            </Grid>



            <ProjectSectionHeader title="Product Shipped" className="mt-[128px]" />

            <Grid container spacing={2} sx={{ paddingTop: 16, }}>
                <Grid item xs={12} sm={6} md={6} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={0}>
                    Content Ingestion Editor
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6} >
                    <Typography variant="body1" component="p" color="text.primary" className="mb-8">
                    This customizable tool facilitates the ingestion, editing, and collaborative management of UX research content for Microsoft,  providing valuable insights and data to the organization.
                                            </Typography>
                </Grid>

                <Grid item xs={12}>
                    <img src={image_finaldesign} className="w-full rounded-[16px]" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>
            </Grid>


            <Grid container spacing={4} sx={{ paddingTop: 16, }}>

                <Grid item xs={12} lg={5} sx={{ marginTop: 0, paddingBottom: 0 }}>
                    <Box sx={{ width: '100%', }}>
                        <Typography variant="h2" color="text.primary" mb={2}>Next Project</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} lg={7} sx={{ marginTop: 0, paddingBottom: 0 }}>
                    <Box sx={{ width: '100%', minWidth: 0 }}>
                        {nextProject ? (
                            <ProjectCard {...nextProject} layout="vertical" />
                        ) : null}
                    </Box>
                </Grid>

            </Grid>




        </div>
        </div>
        </div>
        <Footer />
        </ThemeProvider>
    );
}

export default Work;
