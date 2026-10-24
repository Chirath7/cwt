export interface ArchitectureStep {
  label: string;
  detail: string;
}

export interface Product {
  id: string;
  tag: string;
  name: string;
  fullName: string;
  tagline: string;
  overview: string;
  coreQuestion: string;
  capabilities: string[];
  businessValue: string[];
  applicationAreas?: string[];
  audiences: string[];
  conversationStarter: string;
  infographic: {
    src: string;
    title: string;
    caption: string;
    w: number;
    h: number;
  };
  architecture?: ArchitectureStep[];
}

export const products: Product[] = [
  {
    id: "banking-analytics",
    tag: "ANALYTICS",
    name: "Banking Analytics",
    fullName: "Banking Analytics Platform",
    tagline: "A modern data and analytics platform for banks",
    overview:
      "A modern data and analytics platform designed for banks to consolidate data, enable advanced analytics, and deliver actionable insights for better decision making, risk management, customer engagement and operational efficiency.",
    coreQuestion:
      "How can a bank turn fragmented core-banking, digital-channel, CRM and card data into one trusted source for decisions?",
    capabilities: [
      "Customer Analytics — segmentation, behaviour and lifetime-value insights.",
      "Risk & Compliance Analytics — credit risk, fraud detection and regulatory reporting.",
      "Product & Portfolio Analytics — performance, profitability and growth across products.",
      "Operational Analytics — branch, process and staff efficiency.",
      "Executive Dashboards — real-time KPI visibility for management.",
      "Advanced Analytics & AI/ML — predictive models and anomaly detection.",
    ],
    businessValue: [
      "Improved decision-making with a single, trusted data source.",
      "Stronger risk and compliance oversight.",
      "Better customer engagement through data-driven insights.",
      "Higher operational efficiency across branches and teams.",
    ],
    audiences: [
      "Executive Management",
      "Risk & Compliance Teams",
      "Business Units",
      "Branch Managers",
      "Data & Analytics Teams",
    ],
    conversationStarter:
      "Which of your banking data sources are you still reconciling manually today?",
    infographic: {
      src: "/infographics/products/product-01-banking-analytics.webp",
      title: "Banking Analytics Platform",
      caption: "A modern data and analytics platform for banks",
      w: 1536,
      h: 1024,
    },
    architecture: [
      {
        label: "Source Systems",
        detail: "Core Banking, Digital Channels, CRM, Cards & Payments, External Data",
      },
      {
        label: "Data Ingestion & Integration",
        detail:
          "Batch and real-time ingestion with data-quality checks, ADF ETL/ELT pipelines, Event Hub / Kafka streaming",
      },
      {
        label: "Data Platform",
        detail:
          "Azure Data Lake Storage Gen2, Azure Synapse Data Warehouse, Databricks/Fabric analytics layer, Power BI semantic model",
      },
      {
        label: "Consumption",
        detail: "BI & Reporting, Advanced Analytics & AI, Data Governance & Security",
      },
    ],
  },

  {
    id: "insurance-analytics",
    tag: "ANALYTICS",
    name: "Insurance Analytics",
    fullName: "Insurance Analytics Platform",
    tagline: "End-to-end insurance analytics and insight reporting",
    overview:
      "An end-to-end insurance analytics and insight reporting platform that consolidates data from multiple systems, enables advanced analytics, and delivers actionable insights to improve underwriting, claims, risk management, customer experience and overall business performance.",
    coreQuestion:
      "How can an insurer unify claims, underwriting and policy data into one reporting layer that actually drives decisions?",
    capabilities: [
      "Claims Analytics — end-to-end claims processing insights and loss analysis.",
      "Underwriting Insights — risk assessment performance and portfolio analysis.",
      "Policy & Customer Analytics — retention, loyalty and cross-sell opportunities.",
      "Financial & Actuarial Reporting — profitability, loss ratios and reserves.",
      "Operational Dashboards — team performance and processing efficiency.",
      "Regulatory & Compliance Reporting — automated regulatory submissions.",
    ],
    businessValue: [
      "Improved underwriting accuracy through data-driven risk insight.",
      "Faster, clearer claims decisions.",
      "Stronger risk management across the portfolio.",
      "Better customer experience and retention.",
      "Improved regulatory reporting accuracy and consistency.",
    ],
    audiences: [
      "Executive Management",
      "Underwriting Teams",
      "Claims Teams",
      "Actuarial & Risk Teams",
      "Compliance",
    ],
    conversationStarter:
      "How long does it currently take your team to go from raw claims data to a decision-ready report?",
    infographic: {
      src: "/infographics/products/product-02-insurance-analytics.webp",
      title: "Insurance Analytics Platform",
      caption: "End-to-end insurance analytics and insight reporting",
      w: 1536,
      h: 1024,
    },
  },

  {
    id: "customer-data-platform",
    tag: "PLATFORM",
    name: "Customer Data Platform",
    fullName: "Customer Data Platform (CDP)",
    tagline: "Unify · Analyze · Activate · Build Lasting Customer Relationships",
    overview:
      "A centralized customer data platform that unifies customer data across multiple channels, creates a single customer view, enables advanced analytics and segmentation, and drives personalized customer experiences to increase engagement, loyalty and revenue.",
    coreQuestion:
      "What would it take to see one true view of every customer across every channel you operate in?",
    capabilities: [
      "Single Customer View — unified customer profile from all data sources.",
      "Cross-Channel Data Unification — merge online, offline, mobile and branch data.",
      "Advanced Segmentation — dynamic segments for targeting and personalization.",
      "Personalization & Activation — drive campaigns and experiences from unified data.",
      "Customer Analytics — lifetime value, churn prediction and behaviour insights.",
    ],
    businessValue: [
      "Higher engagement through relevant, personalized experiences.",
      "Stronger customer loyalty and retention.",
      "Increased revenue through targeted activation.",
      "More accurate segmentation for marketing and service teams.",
    ],
    audiences: [
      "Marketing Teams",
      "Customer Experience Teams",
      "Business Units",
      "Executive Management",
    ],
    conversationStarter:
      "If you combined every channel's customer data today, how many different 'versions' of the same customer would you find?",
    infographic: {
      src: "/infographics/products/product-03-customer-data-platform.webp",
      title: "Customer Data Platform (CDP)",
      caption: "Unify, analyze and activate customer data across channels",
      w: 1536,
      h: 1024,
    },
  },

  {
    id: "cdns",
    tag: "GOVERNMENT",
    name: "CDNS",
    fullName: "Customs Document Notification System (CDNS)",
    tagline: "Real-time notification alerts for Sri Lanka Customs document events",
    overview:
      "A real-time notification system for Sri Lanka Customs that automatically alerts stakeholders about key document events, status changes, required actions and approvals.",
    coreQuestion:
      "How do you make sure the right person is notified the moment a declaration, permit or cargo status actually changes?",
    capabilities: [
      "Real-Time Event Alerts — instant notification on declaration and cargo-status changes.",
      "Multi-Channel Notifications — Email, SMS and in-app alert delivery.",
      "Status Change Tracking — Declaration Accepted, Document Query, Permit Approved, Cargo Released.",
      "Action & Approval Alerts — proactive notifications for required actions.",
    ],
    businessValue: [
      "Faster response to document events across the trade chain.",
      "Fewer missed approvals and status changes.",
      "Improved stakeholder communication between Customs and trade.",
      "Average clearance time reduced from 4.2 to 1.8 days — approximately 57% faster.",
    ],
    applicationAreas: [
      "Import declaration status enquiries.",
      "Consignee and declarant information access.",
      "Cargo-status communication.",
      "Document-related notifications.",
      "Integration with Customs declaration platforms.",
    ],
    audiences: [
      "Customs Officers",
      "Trading Companies / Importers & Exporters",
      "Clearing Agents",
      "Government Stakeholders",
    ],
    conversationStarter:
      "How are document-status updates reaching your team today — and how much is getting missed?",
    infographic: {
      src: "/infographics/products/product-04-cdns.webp",
      title: "Customs Document Notification System",
      caption: "Real-time notification alerts for Sri Lanka Customs document events",
      w: 1536,
      h: 1024,
    },
  },

  {
    id: "dat",
    tag: "GOVERNMENT",
    name: "DAT",
    fullName: "Customs Data Analytics Tool (DAT)",
    tagline: "Trade, cargo and revenue analytics for Sri Lanka Customs",
    overview:
      "A comprehensive data analytics platform for Sri Lanka Customs that consolidates, analyses and visualizes trade, cargo and revenue data to enable faster decision-making, risk detection and improved operational efficiency.",
    coreQuestion:
      "Where is Customs losing time and revenue in the trade and cargo pipeline, and how fast can that be seen?",
    capabilities: [
      "Trade Data Analytics — import/export volumes, trends and patterns.",
      "Cargo Analytics — processing times, throughput and anomaly detection.",
      "Revenue Analytics — collection performance, trends and variance analysis.",
      "Risk Detection — identification and flagging of high-risk consignments.",
      "Executive Dashboards — real-time KPIs for Customs leadership.",
    ],
    businessValue: [
      "Faster decisions with consolidated, real-time operational data.",
      "Better risk detection across trade and cargo.",
      "Measurable clearance-time improvement — average 3.2 days (-28%).",
      "Total revenue visibility of LKR 245.8B tracked (+12%).",
    ],
    audiences: [
      "Customs Executives",
      "Risk & Compliance Officers",
      "Operations Teams",
    ],
    conversationStarter:
      "Where in your Customs operations do you most need better data to make faster, more accurate decisions?",
    infographic: {
      src: "/infographics/products/product-05-dat.webp",
      title: "Customs Data Analytics Tool (DAT)",
      caption: "Trade, cargo and revenue analytics for Sri Lanka Customs",
      w: 1536,
      h: 1024,
    },
  },

  {
    id: "enterprise-financial-analytics",
    tag: "FINANCE",
    name: "Enterprise Financial Analytics",
    fullName: "Enterprise Financial Data Analytics Platform",
    tagline: "Integrated financial analytics for enterprise-wide decision making",
    overview:
      "An integrated financial data analytics platform that consolidates financial data across the enterprise, provides real-time insights, advanced analytics and predictive capabilities to support strategic decision making, financial planning, risk management and regulatory reporting.",
    coreQuestion:
      "How can finance move from static monthly reports to real-time, predictive visibility across the whole enterprise?",
    capabilities: [
      "Financial Consolidation — unified P&L, balance sheet and cash-flow across entities.",
      "Real-Time Insights — live financial dashboards replacing static periodic reports.",
      "Predictive Analytics — forecasting, scenario modelling and trend analysis.",
      "Financial Planning & Forecasting — budgeting, variance analysis and target tracking.",
      "Risk Management — exposure monitoring and early-warning indicators.",
      "Regulatory Reporting — automated submissions and compliance tracking.",
    ],
    businessValue: [
      "Faster strategic decisions with real-time financial visibility.",
      "Stronger financial planning through predictive analytics.",
      "Improved risk management across the enterprise.",
      "More reliable and consistent regulatory reporting.",
    ],
    audiences: [
      "CFO & Finance Leadership",
      "Financial Planning & Analysis Teams",
      "Risk Management",
      "Compliance",
    ],
    conversationStarter:
      "How current is the financial data your leadership team is making decisions on right now?",
    infographic: {
      src: "/infographics/products/product-06-enterprise-financial-analytics.webp",
      title: "Enterprise Financial Data Analytics Platform",
      caption: "Integrated financial analytics for enterprise-wide decision making",
      w: 1536,
      h: 1024,
    },
  },

  {
    id: "healthcare-slcp",
    tag: "HEALTHCARE",
    name: "Healthcare Analytics",
    fullName: "Healthcare Analytics Platform",
    tagline: "Consolidated healthcare analytics for better patient outcomes",
    overview:
      "A comprehensive healthcare analytics platform that consolidates data from hospitals, clinics, laboratories, and public health systems to deliver actionable insights, improve patient outcomes, optimize operations, and support evidence-based decision making.",
    coreQuestion:
      "How can disconnected hospital, clinic and lab data come together into one evidence base for better care decisions?",
    capabilities: [
      "Clinical Data Consolidation — unified patient records from hospitals, clinics and labs.",
      "Patient Outcome Analytics — outcomes tracking, readmission and care-quality metrics.",
      "Operational Optimization — bed utilization, staffing efficiency and throughput.",
      "Public Health Reporting — population health trends and disease surveillance.",
      "Evidence-Based Decision Support — dashboards for clinical and management decisions.",
    ],
    businessValue: [
      "Improved patient outcomes through data-driven care insights.",
      "Optimized hospital and clinic operations.",
      "Better evidence-based decisions at every level of the health system.",
      "Stronger public health visibility and reporting.",
    ],
    audiences: [
      "Hospitals & Healthcare Networks",
      "Clinics & Primary Care Centers",
      "Laboratories & Diagnostics",
      "Ministry of Health & Regulators",
      "Insurance Providers",
    ],
    conversationStarter:
      "How much of your clinical and operational data is still siloed across different hospital systems today?",
    infographic: {
      src: "/infographics/products/product-07-healthcare-slcp.webp",
      title: "Healthcare Analytics Platform",
      caption: "Consolidated healthcare analytics for better patient outcomes",
      w: 1536,
      h: 1024,
    },
  },

  {
    id: "ai-auction-bidding",
    tag: "AI",
    name: "AI Auction Bidding",
    fullName: "AI Auction Bidding Platform",
    tagline: "AI-powered bidding intelligence for global tea auctions",
    overview:
      "An AI-powered auction bidding platform that provides real-time market intelligence, predictive analytics and bidding strategy recommendations to help tea buyers and exporters make smarter, faster and more profitable bidding decisions in global tea auctions.",
    coreQuestion:
      "How do tea buyers turn auction-day guesswork into a data-backed bidding strategy in real time?",
    capabilities: [
      "Real-Time Market Intelligence — live auction data, lot information and market signals.",
      "Predictive Price Analytics — AI-driven price forecasting for upcoming lots.",
      "Bidding Strategy Recommendations — data-backed guidance on when and how much to bid.",
      "Auction Performance Tracking — win/loss analysis and portfolio performance.",
    ],
    businessValue: [
      "Smarter, faster bidding decisions backed by real-time data.",
      "Improved procurement profitability.",
      "Reduced reliance on gut-feel and manual market tracking.",
    ],
    audiences: [
      "Tea Exporters (Buyers)",
      "Procurement Teams",
      "Management & Executives",
      "Market Analysts & Traders",
    ],
    conversationStarter:
      "How much of your current bidding strategy relies on experience versus real-time market data?",
    infographic: {
      src: "/infographics/products/product-08-ai-auction-bidding.webp",
      title: "AI Auction Bidding Platform",
      caption: "AI-powered bidding intelligence for global tea auctions",
      w: 1536,
      h: 1024,
    },
  },

  {
    id: "green-market-csiap",
    tag: "AGRICULTURE",
    name: "Green Market",
    fullName: "Green Market Solution",
    tagline: "A Digital Platform for Sustainable Agriculture and Fair Trade",
    overview:
      "Green Market is a digital platform that connects farmers, suppliers, buyers and consumers, enabling transparent, efficient and sustainable agricultural trade. It provides real-time market information, product listing, pricing, order management, logistics support and data-driven insights to improve income for farmers and ensure access to quality, traceable produce.",
    coreQuestion:
      "How can farmers get fair, transparent access to buyers and real-time market prices instead of relying on middlemen?",
    capabilities: [
      "Digital Marketplace — buy and sell fresh produce, agro products and value-added goods.",
      "Real-Time Market Information — live prices, demand trends and market insights.",
      "Farmer & Supplier Management — onboarding, verification and profile management.",
      "Order & Logistics Management — order tracking, delivery coordination and cold-chain support.",
      "Quality & Traceability — certification and farm-to-market traceability.",
      "Analytics & Reporting — market trends, sales performance and supply-chain analytics.",
      "Mobile & Web Access — Android, iOS and web portal.",
    ],
    businessValue: [
      "Higher farmer income — +28% income growth vs. last season.",
      "More efficient supply chain with 12.5K metric tons traded monthly.",
      "Better market access and reduced dependence on middlemen.",
      "Reduced post-harvest loss.",
      "Support for sustainable agriculture and food security.",
    ],
    audiences: [
      "Farmers & Producer Groups",
      "Agri Suppliers & Cooperatives",
      "Traders & Wholesalers",
      "Retailers & Supermarkets",
      "Government & Regulatory Bodies",
      "NGOs & Development Partners",
    ],
    conversationStarter:
      "How much of your current produce pricing depends on a middleman rather than real market data?",
    infographic: {
      src: "/infographics/products/product-09-green-market-csiap.webp",
      title: "Green Market Solution",
      caption: "A Digital Platform for Sustainable Agriculture and Fair Trade",
      w: 1536,
      h: 1024,
    },
    architecture: [
      {
        label: "User Channels",
        detail:
          "Web Portal (Farmers/Buyers), Mobile App (Android/iOS), Partner Systems (APIs), Admin Portal (Government/NGOs)",
      },
      {
        label: "Application Layer",
        detail:
          "Marketplace & Trading Engine, User & Supplier Management, Order & Logistics Management, Pricing & Market Information, Payment & Settlement Integration, Analytics & Reporting",
      },
      {
        label: "Data Layer",
        detail:
          "Transactional Database, Analytics Database (Azure/Databricks), Data Lake (market/weather data), External Data APIs (weather, government)",
      },
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
