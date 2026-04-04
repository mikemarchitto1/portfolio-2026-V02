export type HomeProjectCard = {
  title: string;
  description: string;
  image: string;
  href?: string;
  /** Overrides default “See Case Study” CTA (e.g. Coming Soon when no case study yet). */
  ctaLabel?: string;
};

/** Same list as the home page Projects section — single source of truth. */
export const HOME_PROJECT_CARDS: HomeProjectCard[] = [
  {
    title: "Nutrilucent",
    description:
      "Wellness retailer specializing in nutritional supplements and cosmetic products, grounded in research and product systems that convey trust and vitality.",
    image: "/images/nutrilucent-thumb.png",
    href: "/projects/nutrilucent",
  },
  {
    title: "AI Labs",
    description:
      "Dedicated space for exploring emerging AI technologies, experimenting with new creative workflows, and documenting studies that expand modern design.",
    image: "/images/ailabs-thumb.png",
    ctaLabel: "Coming Soon",
  },
  {
    title: "GloriFi",
    description:
      "Fintech startup focused on modernizing mobile and web banking product experiences that clarify financial information and strengthen the brand's digital presence.",
    image: "/images/glorifi-thumb.png",
    href: "/projects/glorifi",
  },
  {
    title: "ServSafe",
    description:
      "Industry standard food safety training and certification platform strengthened through clearer learning flows, improved usability and more intuitive training experiences.",
    image: "/images/servsafe-thumb.png",
    href: "/projects/servsafe",
  },
  {
    title: "Microsoft Hits",
    description:
      "Research repository platform designed to make it easier for teams to access, share, and reuse insights through clearer navigation, consistent structure, and improved usability.",
    image: "/images/microsoft-thumb.png",
    href: "/projects/microsofthits",
  },
  {
    title: "Eddie Bauer",
    description:
      "Ecommerce experience design for product pages, interaction patterns, and design‑system to create a cohesive and effective shopping journey.",
    image: "/images/eddiebauer-thumb.png",
    href: "/projects/eddiebauer",
  },
];

const CASE_STUDY_HREFS = [
  "/projects/nutrilucent",
  "/projects/glorifi",
  "/projects/servsafe",
  "/projects/microsofthits",
  "/projects/eddiebauer",
] as const;

function normalizePath(path: string) {
  const p = path.split("?")[0] ?? path;
  if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
  return p;
}

/** Next case study in rotation (Nutrilucent → GloriFi → ServSafe → Microsoft Hits → Eddie Bauer → Nutrilucent). */
export function getNextCaseStudyHomeCard(currentHref: string): HomeProjectCard | undefined {
  const key = normalizePath(currentHref);
  const order = CASE_STUDY_HREFS as readonly string[];
  const i = order.indexOf(key);
  if (i === -1) return undefined;
  const nextHref = CASE_STUDY_HREFS[(i + 1) % CASE_STUDY_HREFS.length];
  return HOME_PROJECT_CARDS.find((p) => p.href === nextHref);
}
