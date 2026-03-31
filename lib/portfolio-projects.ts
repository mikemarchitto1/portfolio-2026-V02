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
      "UX Founder driving research, UI design and build to shape packaging, product architecture, and visual systems that express clinical trust and luminous vitality.",
    image: "/images/nutrilucent-thumb.png",
    href: "/nutrilucent",
  },
  {
    title: "AI Labs",
    description:
      "Dedicated space for exploring emerging AI technologies, experimenting with new creative workflows, and documenting studies that expand modern design.",
    image: "/images/thumb-large-ai experiments.png",
  },
  {
    title: "GloriFi",
    description:
      "Fintech startup focused on modernizing mobile and web banking product experiences that clarify financial information and strengthen the brand's digital presence.",
    image: "/images/glorifi-thumb.png",
    href: "/projects/project-one",
  },
  {
    title: "National Restaurant Association",
    description:
      "ServSafe products improve learning flows, refine usability, and shape clearer interfaces that help restaurant professionals complete essential food‑safety training.",
    image: "/images/nationalrestaurantassociation-thumb.png",
    href: "/nra",
  },
  {
    title: "Microsoft HITS",
    description:
      "Research repository platform focused on streamlining operational workflows, improving clarity, usability, and interaction patterns to help teams work more efficiently.",
    image: "/images/microsofthits-thumb.png",
    href: "/projects/project-two",
  },
  {
    title: "Eddie Bauer",
    description:
      "Ecommerce experience design for product pages, interaction patterns, and design‑system to create a cohesive and effective shopping journey.",
    image: "/images/eddiebauer-thumb.png",
    href: "/projects/project-three",
  },
];

const CASE_STUDY_HREFS = [
  "/nutrilucent",
  "/projects/project-one",
  "/projects/project-two",
  "/projects/project-three",
] as const;

function normalizePath(path: string) {
  const p = path.split("?")[0] ?? path;
  if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
  return p;
}

/** Next case study in rotation (Nutrilucent → GloriFi → Microsoft HITS → Eddie Bauer → Nutrilucent). */
export function getNextCaseStudyHomeCard(currentHref: string): HomeProjectCard | undefined {
  const key = normalizePath(currentHref);
  const order = CASE_STUDY_HREFS as readonly string[];
  const i = order.indexOf(key);
  if (i === -1) return undefined;
  const nextHref = CASE_STUDY_HREFS[(i + 1) % CASE_STUDY_HREFS.length];
  return HOME_PROJECT_CARDS.find((p) => p.href === nextHref);
}
