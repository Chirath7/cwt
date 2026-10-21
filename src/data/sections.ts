export const SL_CUSTOMS_LOGO = "/logo/sl-customs.png";

export interface Infographic {
  src: string;
  title: string;
  caption?: string;
  w: number;
  h: number;
}

export interface SectionData {
  id: string;
  order: number;
  title: string;
  blurb: string;
  badge?: string;
  cover: Infographic;
  extras?: Infographic[];
}

const img = (
  src: string,
  title: string,
  caption?: string,
  w = 1536,
  h = 1024,
): Infographic => ({ src: `/infographics/${src}`, title, caption, w, h });

export const sections: SectionData[] = [
  {
    id: "cwt-2-0",
    order: 1,
    title: "CWT 2.0",
    blurb: "Data, Cloud, AI and Optimization for a better tomorrow.",
    cover: img("cwt-2-0.webp", "CWT 2.0", "The complete platform: Data · Cloud · AI · Optimization"),
  },
  {
    id: "crew",
    order: 2,
    title: "CWT Crew",
    blurb: "The people, verticals and value chain behind every delivery.",
    cover: img("crew.webp", "CWT Corporate Structure", "Our people, verticals and value chain", 1400, 1286),
  },
  {
    id: "customs",
    order: 3,
    title: "CWT Customs",
    blurb: "Digital solutions built with and for Sri Lanka Customs.",
    badge: SL_CUSTOMS_LOGO,
    cover: img("customs-01-arms.webp", "ARMS", "Automated Risk Management System", 1312, 1199),
    extras: [
      img("customs-02-cdns 1.webp", "CDNS NextGen", "Customs Declaration & Notification System"),
      img("customs-03-dat 1.webp", "DAT", "Data Analytics Tool"),
      img("customs-04-edge.webp", "Customs Edge", "Real-time intelligence at the border"),
      img("customs-05-risk.webp", "Risk Management", "Integrated risk-scoring framework", 1312, 1199),
      img("customs-06-agentic-ai.webp", "Agentic AI", "AI-powered autonomous customs workflows"),
      img("customs-07-oga.webp", "OGA / AD Licence Upgrade", "Other Government Agency & Advance Declaration"),
      img("customs-08-roster.webp", "Operational Roster Engine", "Automated staff scheduling & roster management"),
    ],
  },
  {
    id: "customers",
    order: 4,
    title: "CWT Customers",
    blurb: "Trusted by leading organisations, with the success stories to prove it.",
    cover: img("customers.webp", "Customers & Success Stories", "Trusted by leading organisations"),
  },
  {
    id: "products",
    order: 5,
    title: "CWT Products",
    blurb: "Industry-focused solutions that unlock value from data.",
    cover: img("products.webp", "Product Portfolio", "Industry-focused solutions that unlock value from data"),
  },
  {
    id: "training",
    order: 6,
    title: "CWT Training",
    blurb: "Professional training in Power BI and Agentic AI.",
    cover: img("training-powerbi-basic.webp", "Power BI Basic", "Foundation skills for data visualisation"),
    extras: [
      img("training-powerbi-intermediate.webp", "Power BI Intermediate", "Intermediate analytics and reporting"),
      img("training-powerbi-advanced.webp", "Power BI Advanced", "Advanced DAX, Power Query and deployment"),
      img("training-agentic.webp", "Agentic AI Training", "Professional training in Agentic AI"),
    ],
  },
];
