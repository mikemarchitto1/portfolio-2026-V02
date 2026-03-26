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

const image_hero = "/assets/project_three/hero.png";
const image_compaudit = "/assets/project_three/eddiebauer_audit.png";
const image_designsystem = "/assets/project_three/eddiebauer_designsystem.png";
const image_uiexplore = "/assets/project_three/eddiebauer_uiexplore.png";
const image_wireframe = "/assets/project_three/eddiebauer_wireframe.png";
const image_promo = "/assets/project_three/eddiebauer_promo.png";
const image_icons = "/assets/project_three/eddiebauer_icons.png";
const image_finaldesign = "/assets/project_three/eddiebauer_pdp.png";

const muiTheme = createTheme();

function Work() {
    const nextProject = getNextCaseStudyHomeCard("/projects/project-three");

    return (
        <ThemeProvider theme={muiTheme}>
        <CssBaseline />
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


            </Grid>



            <ProjectOverview
              situation="Eddie Bauer aims to revamp their Ecommerce platform with new features and brand aesthetics within six months, in order to enhance their marketing strategy and generate more leads."
              task="Build a stronger contemporary brand with current signature technologies, engage the outdoor apparel community, and create a product description page and branded design system that cater to the users' interests."
              result="Following the launch, the findings of the qualitative research indicated that the level of satisfaction among users had increased, primarily because the design of the product was less obtrusive, and it allowed users to have greater control over the narrative of their reports."
            />







            <ProjectSectionHeader title="Research" className="mt-32" />


            <Grid container spacing={4} sx={{ paddingTop: 16, }}>
                <Grid item xs={12} sm={4} md={4} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={2}>
                    Workshops
                    </Typography>
                    <Typography variant="body1" component="p" color="text.primary">
                    I carefully reviewed several outdoor clothing and ecommerce experiences, evaluating patterns, content structure, and usability gaps to identify opportunities for improvement.
                     </Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={8}>
                    <img src={image_compaudit} className="w-full rounded-[16px]" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>
            </Grid>


            <Grid container spacing={4} sx={{ paddingTop: 16, }}>
                <Grid item xs={12} sm={8} md={8}>
                    <img src={image_compaudit} className="w-full rounded-[16px]" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>

                <Grid item xs={12} sm={4} md={4} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={2}>
                    Competitive Audit
                    </Typography>
                    <Typography variant="body1" component="p" color="text.primary">
                    In order to gain a deeper understanding for designs in the context of outdoor clothing websites, I conducted an audit and examined patterns and strategies to engage customers.                   
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
                    I collaborated closely with our UX designers to audit wireframes with the aim of gaining valuable insight into the user experience and to identify any areas that required improvement.                    </Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={8}>
                    <img src={image_wireframe} className="w-full rounded-[16px]" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>
            </Grid>


            <ProjectSectionHeader title="Visual Design" className="mt-[128px]" />

            <Grid container spacing={4} sx={{ paddingTop: 16, }}>
                <Grid item xs={12} sm={4} md={4} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={2}>
                        Design System
                    </Typography>
                    <Typography variant="body1" component="p" color="text.primary">
                    In order to ensure that the user experience remained consistent, I made styles and UI components that could be handed off to the development team, resulting in a more polished and user-friendly end result.                    </Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={8}>
                    <img src={image_designsystem} className="w-full rounded-[16px]" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>
            </Grid>


            <Grid container spacing={4} sx={{ paddingTop: 16, }}>
                <Grid item xs={12} sm={8} md={8}>
                    <img src={image_uiexplore} className="w-full rounded-[16px]" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>

                <Grid item xs={12} sm={4} md={4} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={2}>
                        UI Exploration
                    </Typography>
                    <Typography variant="body1" component="p" color="text.primary">
                    To create appealing mockups, I invented brand styles and design components to inform and bring the wireframes to life, reflecting the brand's values and aesthetic.
                    </Typography>
                </Grid>


            </Grid>


            <ProjectSectionHeader title="Product Shipped" className="mt-[128px]" />


            <Grid container spacing={2} sx={{ paddingTop: 8, }}>
                <Grid item xs={12} sm={6} md={6} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={0}>
                    Promotions Carousel
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={6} >
                    <Typography variant="body1" component="p" color="text.primary">
                    Various reusable components were created for this carousel module so that customers can browse promotions.                
                        </Typography>
                </Grid>

                <Grid item xs={12}>
                    <img src={image_promo} className="w-full rounded-[16px]" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>
            </Grid>


            <Grid container spacing={2} sx={{ paddingTop: 8, }}>
                <Grid item xs={12} sm={6} md={6} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={0}>
                    System Iconography
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={6} >
                    <Typography variant="body1" component="p" color="text.primary">
                    To unify the brand's image, I created custom system icons that matched the brand's aesthetic.                       
                     </Typography>
                </Grid>

                <Grid item xs={12}>
                    <img src={image_icons} className="w-full rounded-[16px]" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>
            </Grid>


            <Grid container spacing={2} sx={{ paddingTop: 8, }}>
                <Grid item xs={12} sm={6} md={6} >
                    <Typography variant="h3" component="h3" color="text.primary" mb={0}>
                    Product Details Page
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={6} >
                    <Typography variant="body1" component="p" color="text.primary">
                    The product page's modern and minimalistic design gives a sophisticated impression. The search function helps users navigate reviews and questions, boosting customer confidence in purchasing decisions.                        </Typography>
                </Grid>

                <Grid item xs={12}>
                    <img src={image_finaldesign} className="w-full rounded-[16px]" width={'100%'} height={'100%'} alt='Large Pizza' />
                </Grid>
            </Grid>



            <Grid container spacing={4} sx={{ paddingTop: 9, }}>

                <Grid item xs={12} lg={5} sx={{ marginTop: 0, paddingBottom: 0}}>
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
