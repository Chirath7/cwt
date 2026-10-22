export type ProductTag = "RISK" | "INSIGHT" | "NOTIFY";
export type ProductId = "arms" | "dat" | "cdns";

export interface Domain {
  domain: string;
  question: string;
}

export interface ArchitectureStep {
  label: string;
  detail: string;
}

export interface CustomsProduct {
  id: ProductId;
  tag: ProductTag;
  name: string;
  fullName: string;
  tagline: string;
  proposition: string;
  coreQuestion: string;
  overview: string;
  capabilities: string[];
  capabilitiesNote?: string;
  businessValue: string[];
  applicationAreas?: string[];
  futureEnhancements: string[];
  slReference: string;
  slReferenceUnconfirmed?: boolean;
  audiences: string[];
  conversationStarter: string;
  infographic: {
    src: string;
    title: string;
    caption: string;
    w: number;
    h: number;
  };
  domains?: Domain[];
  architecture?: ArchitectureStep[];
}

export const customsIntro = {
  coreMessage:
    "CWT helps Customs administrations turn operational data into intelligence, intelligence into better decisions, and digital information into more transparent Customs operations.",
  introParagraph:
    "Creative Web Technologies (CWT), Sri Lanka, develops digital solutions that help Customs administrations strengthen risk management, turn operational data into actionable intelligence, and improve access to Customs-related information. Our Sri Lanka Customs experience provides a practical foundation for complementing existing Customs platforms and national digital-transformation priorities.",
};

export const productSummaryRows = [
  { name: "ARMS", tag: "RISK" as ProductTag,    role: "Identify, assess and prioritise Customs risks",              strategicValue: "Targeted controls"   },
  { name: "DAT",  tag: "INSIGHT" as ProductTag, role: "Turn Customs data into actionable intelligence",             strategicValue: "Better decisions"    },
  { name: "CDNS", tag: "NOTIFY" as ProductTag,  role: "Make declaration, document and cargo status visible",        strategicValue: "Improved visibility" },
];

export const sharedApproach = [
  { title: "Risk-based operations",     body: "Focus scrutiny where it is warranted." },
  { title: "Data-driven intelligence",  body: "Convert operational data into usable information." },
  { title: "Digital visibility",        body: "Better access to declaration and cargo status." },
  { title: "Integrated architecture",   body: "Complement existing platforms (e.g. ASYCUDA World) rather than replace them." },
  { title: "A foundation for AI",       body: "Document processing, anomaly detection, predictive analytics, decision support." },
];

export const customsProducts: Record<ProductId, CustomsProduct> = {
  arms: {
    id: "arms",
    tag: "RISK",
    name: "ARMS",
    fullName: "Automated Risk Management System",
    tagline: "Smarter Risk Assessment. Better Targeting. More Effective Customs Control.",
    proposition:
      "Help Customs move from transaction-based processing towards structured, intelligence-informed risk management.",
    coreQuestion: "Where should Customs focus its attention?",
    overview:
      "ARMS supports identifying, assessing and prioritising risks in declarations, cargo movements and trade transactions — so officers can concentrate scrutiny where it matters, complementing existing Customs processing platforms.",
    capabilities: [
      "Risk profiling — defined criteria applied to declarations, cargo and trade data.",
      "Risk assessment and prioritisation — rank transactions by risk.",
      "Rules and criteria management — configurable, refined with Customs experts.",
      "Inspection decision support — informs, never replaces, officer authority.",
      "Revenue protection support — valuation, classification, declaration-inconsistency risks.",
      "Operational risk visibility — monitoring of activity and outcomes.",
      "Integration — complements platforms like ASYCUDA World, subject to assessment.",
    ],
    businessValue: [
      "Stronger risk-based controls and prioritisation of high-risk consignments.",
      "More effective use of inspection and enforcement resources.",
      "Stronger revenue protection and more consistent risk assessment.",
      "Identification of suspicious patterns and anomalies.",
      "Faster legitimate trade through targeted controls.",
      "Foundation for AI-assisted risk management.",
    ],
    futureEnhancements: [
      "Predictive risk scoring.",
      "ML-assisted anomaly detection.",
      "Historical risk-pattern analysis.",
      "Intelligent document extraction.",
      "Risk-model performance monitoring.",
      "Explainable decision support.",
    ],
    slReference:
      "CWT has contributed to the ARMS initiative at Sri Lanka Customs, part of the wider digital-strengthening effort.",
    slReferenceUnconfirmed: true,
    audiences: [
      "Risk Management Directorates",
      "Intelligence & Enforcement Units",
      "Cargo Examination teams",
      "Revenue Protection Divisions",
      "Customs IT teams",
      "Senior management",
    ],
    conversationStarter:
      "We'd welcome a discussion on how administrations can strengthen risk-based targeting and use operational data more effectively to support inspection and enforcement decisions.",
    infographic: {
      src: "/infographics/customs-01-arms.webp",
      title: "ARMS",
      caption: "Automated Risk Management System",
      w: 1312,
      h: 1199,
    },
  },

  dat: {
    id: "dat",
    tag: "INSIGHT",
    name: "DAT",
    fullName: "Data Analytics Tool",
    tagline: "From Customs Data to Operational Intelligence.",
    proposition:
      "Transform fragmented operational data into trusted information that supports better decisions.",
    coreQuestion: "What does the operational data tell us?",
    overview:
      "Customs generates large volumes of data across declarations, cargo, revenue, valuation, warehousing and investigations — often spread across systems. DAT adds a structured analytical layer that consolidates this into reports and dashboards, without replacing operational systems.",
    capabilities: [
      "Data integration and consolidation.",
      "Data engineering and transformation.",
      "Data warehouse and analytical models.",
      "Interactive BI dashboards (Sri Lanka uses Microsoft Power BI).",
      "Revenue analytics.",
      "Cargo and declaration analytics.",
      "Valuation and trade analytics.",
      "Management information and KPIs.",
      "Investigation and risk analytics.",
      "Secure, role-based access.",
    ],
    businessValue: [
      "One consolidated view of operational information.",
      "Less reliance on fragmented, manual reports.",
      "Better management visibility and more consistent reporting.",
      "Stronger revenue and trade analysis; exceptions surfaced.",
      "Foundation for advanced and AI-enabled analytics.",
    ],
    futureEnhancements: [
      "Advanced statistics and outlier detection.",
      "Predictive revenue and workload analysis.",
      "Automated data-quality monitoring.",
      "AI-assisted insights.",
      "Natural-language querying.",
      "Cross-functional intelligence.",
    ],
    slReference:
      "CWT delivered DAT for Sri Lanka Customs with 16 analytical dashboard deliverables covering revenue, valuation, cargo, import/export, risk, investigations, warehousing and declarations.",
    audiences: [
      "Directors General & senior management",
      "Revenue/Valuation Divisions",
      "Risk/Intelligence teams",
      "Import/Export Operations",
      "Investigation Units",
      "Planning/Performance teams",
      "Customs IT/Analytics units",
    ],
    conversationStarter:
      "Our Sri Lanka Customs implementation includes 16 delivered dashboard deliverables. We'd be glad to exchange experience on Customs data integration, analytics and management reporting.",
    infographic: {
      src: "/infographics/customs-03-dat 1.webp",
      title: "DAT",
      caption: "Data Analytics Tool",
      w: 1536,
      h: 1024,
    },
    domains: [
      { domain: "Revenue collection",         question: "How is revenue performing vs history/targets?" },
      { domain: "Import analysis",             question: "What patterns are emerging across imports?" },
      { domain: "Export analysis",             question: "How are export activity and volumes changing?" },
      { domain: "Cargo movements",             question: "What trends show across cargo processing?" },
      { domain: "Valuation",                   question: "Which patterns warrant closer examination?" },
      { domain: "Risk management",             question: "Which indicators inform risk-based decisions?" },
      { domain: "Investigation",               question: "What information supports selected cases?" },
      { domain: "Warehousing",                 question: "Which patterns need attention?" },
      { domain: "Declaration analysis",        question: "What trends and exceptions appear?" },
      { domain: "Management performance",      question: "Which indicators show performance best?" },
    ],
    architecture: [
      { label: "Operational source systems",  detail: "Approved interfaces & secure connections" },
      { label: "Secure data extraction",      detail: "" },
      { label: "Transformation & validation", detail: "ETL / ELT" },
      { label: "Analytical data platform",    detail: "Microsoft SQL Server" },
      { label: "BI dashboards",               detail: "Power BI · Power BI Report Server (on-prem)" },
      { label: "Decision-makers",             detail: "" },
    ],
  },

  cdns: {
    id: "cdns",
    tag: "NOTIFY",
    name: "CDNS",
    fullName: "Customs Document Notification System",
    tagline: "Better Visibility. Timely Notifications. More Transparent Customs Processes.",
    proposition:
      "Make relevant Customs declaration and cargo-status information easier to access, helping Customs and trade stakeholders coordinate their activities more effectively.",
    coreQuestion: "How can declaration and cargo status be made visible to the people who need it?",
    overview:
      "The Customs Document Notification System (CDNS) is a digital notification and information-access solution designed to improve visibility of Customs declaration status, document-related information, and associated cargo movements for authorized users. International trade involves multiple participants — importers, exporters, consignees, declarants, Customs officers, and logistics providers — who need timely, reliable information to coordinate their activities. When status updates are fragmented, stakeholders must make repeated enquiries or wait for information from other parties. CDNS provides a digital channel through which authorized users can access relevant status information and receive notifications associated with Customs declarations and cargo processes, supporting more transparent communication between Customs and trade participants.",
    capabilities: [
      "Digital Notification Services — provide a digital mechanism for notifying authorized users about relevant declaration, document, or cargo-status information.",
      "Customs Declaration Status Visibility — enable users to view relevant declaration status information through an online interface, subject to authorization and system integration.",
      "Cargo Movement Visibility — support access to associated cargo-movement information where the relevant data is available and integrated.",
      "Trader and Declarant Access — provide a digital access channel for eligible stakeholders, such as consignees and declarants, to obtain information relevant to their activities.",
      "Reduced Dependence on Manual Enquiries — make relevant status information available digitally, reducing the need for repeated telephone calls, emails, and other manual follow-ups.",
      "Improved Communication and Coordination — support more timely information-sharing between Customs-related stakeholders, helping them coordinate subsequent operational activities.",
      "Digital Information Access — provide an online service through which authorized users can access relevant information without relying exclusively on traditional paper-based communication.",
      "Transparency and Traceability Support — improve visibility of declaration and cargo status, helping stakeholders understand the progress of relevant Customs processes.",
    ],
    capabilitiesNote:
      "The extent of historical records, audit trails, workflow automation, and notification channels depends on the configured implementation.",
    businessValue: [
      "Improve visibility of Customs declaration status.",
      "Provide traders and declarants with more convenient access to information.",
      "Reduce avoidable manual status enquiries.",
      "Improve coordination among trade participants.",
      "Support more transparent Customs-related processes.",
      "Improve the accessibility of relevant operational information.",
      "Strengthen digital engagement with the trading community.",
      "Support wider paperless and digital-trade initiatives.",
    ],
    applicationAreas: [
      "Import declaration status enquiries.",
      "Consignee and declarant information access.",
      "Cargo-status communication.",
      "Document-related notifications.",
      "Digital communication with trade stakeholders.",
      "Integration with Customs declaration platforms.",
      "Wider paperless Customs and trade-facilitation initiatives.",
    ],
    futureEnhancements: [],
    slReference:
      "CDNS has been introduced in the Sri Lanka Customs environment. The publicly accessible service provides a reference for understanding the solution's operational context and stakeholder-facing approach. The system is intended to improve access to Customs document and declaration-status information for relevant users. Its implementation demonstrates how a dedicated digital notification service can complement a Customs administration's wider operational systems and trade-facilitation objectives. For international discussions, CWT can use this Sri Lankan implementation as a starting point for exploring the needs, integration requirements, and stakeholder-access arrangements of other Customs administrations.",
    audiences: [
      "Importers and Exporters",
      "Consignees and Declarants",
      "Customs Officers",
      "Customs Service and Helpdesk Teams",
      "Freight Forwarders and Logistics Stakeholders",
      "Customs IT and Digital Services Teams",
    ],
    conversationStarter:
      "Make relevant Customs declaration and cargo-status information easier to access, helping Customs and trade stakeholders coordinate their activities more effectively — we'd welcome a conversation on how this applies to your environment.",
    infographic: {
      src: "/infographics/customs-02-cdns 1.webp",
      title: "CDNS",
      caption: "Customs Document Notification System",
      w: 1536,
      h: 1024,
    },
  },
};

export const PRODUCT_ORDER: ProductId[] = ["arms", "dat", "cdns"];
