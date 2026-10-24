export const SL_CUSTOMS_LOGO = "/logo/sl-customs.png";

export interface Infographic {
  src: string;
  title: string;
  caption?: string;
  w: number;
  h: number;
  videoUrl?: string;
  action?: "dat-explorer";
  /** When set, clicking this card navigates to the route instead of opening a lightbox. */
  route?: string;
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
  opts?: { videoUrl?: string; action?: "dat-explorer"; route?: string },
): Infographic => ({
  src: `/infographics/${src}`,
  title,
  caption,
  w,
  h,
  videoUrl: opts?.videoUrl,
  action: opts?.action,
  route: opts?.route,
});

export const sections: SectionData[] = [
  {
    id: "cwt-2-0",
    order: 1,
    title: "CWT 2.0",
    blurb: "We leverage the power of Data, Cloud, AI, and Optimization to build intelligent, scalable, and efficient solutions that solve real-world challenges, drive innovation, and create a smarter, more sustainable future.",
    cover: img("cwt-2-0.webp", "CWT 2.0", "The complete platform: Data · Cloud · AI · Optimization"),
  },
  {
    id: "customs",
    order: 2,
    title: " Customs",
    blurb: "Digital solutions built with and for Sri Lanka Customs.",
    badge: SL_CUSTOMS_LOGO,
    cover: img("customs/customs-01-arms.webp", "ARMS", "Automated Risk Management System", 1312, 1199, { route: "/customs/arms" }),
    extras: [
      img("customs/customs-02-cdns 1.webp", "CDNS", "Customs Document Notification System", 1536, 1024, { route: "/customs/cdns" }),
      img("customs/customs-03-dat 1.webp", "DAT", "Data Analytics Tool", 1536, 1024, { action: "dat-explorer", route: "/customs/dat" }),
    ],
  },
  {
    id: "customers",
    order: 3,
    title: " Our Customers",
    blurb: "Trusted by leading organisations, with the success stories to prove it.",
    cover: img("customers.webp", "Customers & Success Stories", "Trusted by leading organisations"),
  },
  {
    id: "products",
    order: 4,
    title: "Our Products",
    blurb: "Industry-focused solutions that unlock value from data.",
    cover: img("products.webp", "Product Portfolio", "Industry-focused solutions that unlock value from data"),
  },
  {
    id: "training",
    order: 5,
    title: "Our Training",
    blurb: "Professional training in Power BI and Agentic AI.",
    cover: img("training-powerbi-basic.webp", "Power BI Basic", "Foundation skills for data visualisation"),
    extras: [
      img("training-powerbi-intermediate.webp", "Power BI Intermediate", "Intermediate analytics and reporting"),
      img("training-powerbi-advanced.webp", "Power BI Advanced", "Advanced DAX, Power Query and deployment"),
      img("training-agentic.webp", "Agentic AI Training", "Professional training in Agentic AI"),
    ],
  },
  {
    id: "crew",
    order: 6,
    title: "CWT Crew",
    blurb: "We bring together people, industry expertise, and interconnected value chains to streamline operations, strengthen collaboration, and deliver meaningful outcomes at every stage of the journey.",
    cover: img("crew.webp", "CWT Corporate Structure", "Our people, verticals and value chain", 1400, 1286),
  },
];
