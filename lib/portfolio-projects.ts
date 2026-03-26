export type HomeProjectCard = {
  title: string;
  description: string;
  image: string;
  href?: string;
};

/** Same list as the home page Projects section — single source of truth. */
export const HOME_PROJECT_CARDS: HomeProjectCard[] = [
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
    href: "/projects/project-one",
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
    href: "/projects/project-two",
  },
  {
    title: "Eddie Bauer",
    description:
      "Created an internal research repository by leading end-to-end UX work from foundation of research through UI design and agile handoff.",
    image: "/images/thumb-large-eddiebauer.png",
    href: "/projects/project-three",
  },
];

const CASE_STUDY_HREFS = [
  "/projects/project-one",
  "/projects/project-two",
  "/projects/project-three",
] as const;

function normalizePath(path: string) {
  const p = path.split("?")[0] ?? path;
  if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
  return p;
}

/** Next case study in rotation (GloriFi → Microsoft Hits → Eddie Bauer → GloriFi). */
export function getNextCaseStudyHomeCard(currentHref: string): HomeProjectCard | undefined {
  const key = normalizePath(currentHref);
  const order = CASE_STUDY_HREFS as readonly string[];
  const i = order.indexOf(key);
  if (i === -1) return undefined;
  const nextHref = CASE_STUDY_HREFS[(i + 1) % CASE_STUDY_HREFS.length];
  return HOME_PROJECT_CARDS.find((p) => p.href === nextHref);
}
