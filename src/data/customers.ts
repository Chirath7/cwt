export interface CaseStudyInfographic {
  src: string;
  title: string;
  caption: string;
  w: number;
  h: number;
}

export interface CaseStudy {
  tagline: string;
  overview: string;
  objectives: string[];
  stakeholders: string[];
  keyFeatures: string[];
  businessImpact: { label: string; detail: string }[];
  techStack?: string[];
  architecture?: { label: string; detail: string }[];
  sampleMetrics?: { label: string; value: string }[];
  futureEnhancements?: string[];
  quote?: { text: string; author: string };
  infographic: CaseStudyInfographic;
}

export interface Customer {
  id: string;
  name: string;
  category: string;
  description: string;
  caseStudy?: CaseStudy;
}

export const customers: Customer[] = [
  {
    id: "allianz",
    name: "Allianz",
    category: "Insurance",
    description: "Allianz Insight Reporting (AIR) — automated cloud-native BI platform",
    caseStudy: {
      tagline:
        "Modern Data Platform for Smarter Insurance Decisions — Unified Data. Real-Time Insights. Greater Business Impact.",
      overview:
        "Allianz Insight Reporting (AIR) is a modern enterprise data platform and business intelligence solution developed by Creative Web Technologies for Allianz Insurance Lanka. It consolidates data from multiple sources into a single, secure platform and provides interactive dashboards, reports and analytics to support management, operational teams and business users in making data-driven decisions.",
      objectives: [
        "Consolidate data from multiple source systems.",
        "Provide real-time and historical business insights.",
        "Support management, operational and sales teams.",
        "Improve data governance and data quality.",
        "Enhance operational efficiency and productivity.",
        "Enable better customer understanding.",
        "Support strategic decision making.",
      ],
      stakeholders: [
        "Executive Management — strategic decision making",
        "Operational Teams — underwriting, claims, finance",
        "Sales Teams — performance and pipeline insights",
        "Risk & Compliance Teams — monitoring and regulatory reporting",
        "IT & Data Teams — platform management and governance",
      ],
      architecture: [
        {
          label: "Data Sources",
          detail:
            "Policy Administration System, Claims Management System, Finance System, CRM System, External Sources",
        },
        {
          label: "Data Integration Layer",
          detail:
            "ETL/ELT pipelines, data validation, data cleansing, scheduling, metadata management",
        },
        {
          label: "Data Warehouse",
          detail:
            "Modern data platform on Microsoft SQL Server / Azure (on-premises or cloud), structured, secure and scalable",
        },
        {
          label: "Analytics, Reporting & Governance",
          detail:
            "Semantic models & business logic; Power BI interactive dashboards & self-service analytics; role-based access, audit logs, data quality and lineage",
        },
      ],
      keyFeatures: [
        "Interactive Data Platform",
        "Real-Time & Historical Reporting",
        "Drill-Down Historical Reporting",
        "Branch Performance",
        "Product Profitability",
        "Claims Analytics",
        "Customer Segmentation",
        "Regulatory Reporting",
        "Self-Service Analytics",
        "Data Governance & Security",
        "Mobile & Web Access",
      ],
      sampleMetrics: [
        { label: "Total Gross Premium", value: "LKR 12.4Bn (+8.2%)" },
        { label: "Net Profit",          value: "LKR 1.8Bn (+12.5%)" },
        { label: "Total Claims",        value: "LKR 4.2Bn (-6.1%)" },
        { label: "Active Policies",     value: "320,450 (+7.8%)" },
      ],
      businessImpact: [
        { label: "Increased Revenue",        detail: "Better visibility into sales and customer opportunities." },
        { label: "Improved Profitability",   detail: "Data-driven underwriting and claims management." },
        { label: "Reduced Operational Costs", detail: "Automated reporting and efficient data processing." },
        { label: "Faster Decision Making",   detail: "Real-time insights for management and operational teams." },
        { label: "Enhanced Customer Experience", detail: "Better customer understanding and personalised services." },
        { label: "Stronger Compliance",      detail: "Accurate and timely regulatory reporting." },
      ],
      futureEnhancements: [
        "Advanced AI & ML Analytics — predictive models for claims, customer behaviour and lapse risk.",
        "Real-Time Data Streaming.",
        "Customer 360 View.",
        "Expanded Self-Service Analytics.",
        "Mobile Application.",
        "Integration with External Data Sources — market data, socio-economic data, industry benchmarks.",
        "Advanced Data Governance.",
        "Cloud Modernization.",
      ],
      infographic: {
        src: "/infographics/customers/allianz.webp",
        title: "Allianz Insight Reporting (AIR)",
        caption: "Modern data platform and BI solution for Allianz Insurance Lanka",
        w: 1024,
        h: 1536,
      },
    },
  },

  {
    id: "sl-customs",
    name: "Sri Lanka Customs",
    category: "Government",
    description: "Customs Document Notification System (CDNS) & Data Analytics Tool (DAT)",
  },

  {
    id: "dilmah",
    name: "Dilmah",
    category: "Manufacturing / FMCG",
    description: "Modern Data Platform — automated financial reporting & consolidation",
    caseStudy: {
      tagline:
        "Finance & Accounting Solution — Integrated Data. Real-Time Insights. Stronger Decisions.",
      overview:
        "Creative Web Technologies developed a Modern Data Platform for Dilmah to integrate finance, accounting and operational data into a single, scalable analytics platform. The solution provides real-time dashboards, financial reporting, management insights and self-service analytics, enabling faster and more accurate decision-making across the organisation.",
      objectives: [
        "Consolidate data from multiple business systems.",
        "Provide real-time financial and management insights.",
        "Improve accuracy and timeliness of reporting.",
        "Enable cost control and profitability analysis.",
        "Support statutory and regulatory compliance.",
        "Provide self-service analytics for business users.",
        "Build a scalable data platform for future growth.",
      ],
      stakeholders: [
        "Finance & Accounting Teams — management reporting, statutory reporting",
        "Executive Management — business performance and strategic decisions",
        "Operational Teams — sales, supply chain, manufacturing, procurement",
        "IT & Data Teams — platform management, data governance",
        "External Stakeholders — auditors, regulators, business partners",
      ],
      architecture: [
        {
          label: "Source Systems",
          detail: "ERP/Finance (General Ledger, AP, AR, Fixed Assets), Operational Systems, External Data",
        },
        {
          label: "Data Integration Layer",
          detail: "ETL/ELT pipelines, data validation, data cleansing, scheduling, metadata management",
        },
        {
          label: "Modern Data Platform",
          detail: "Microsoft SQL Server / Azure (on-premises or cloud), scalable, secure and highly available",
        },
        {
          label: "Semantic Layer, Reporting & Governance",
          detail:
            "Business models for finance/sales/operations; Power BI interactive dashboards & self-service analytics; role-based access, audit logs, data lineage, data quality monitoring",
        },
      ],
      keyFeatures: [
        "Consolidated Financial Reporting",
        "Real-Time Dashboards",
        "Profitability Analysis",
        "Cost Management & Variance Analysis",
        "Multi-Entity & Multi-Currency",
        "Drill-Down to Transaction Level",
        "Budget vs Actual Analysis",
        "Self-Service Analytics",
        "Regulatory & Statutory Reporting",
        "Scalable and Future-Ready Platform",
      ],
      sampleMetrics: [
        { label: "Revenue",       value: "LKR 32.8Bn (+12%)" },
        { label: "Gross Profit",  value: "LKR 9.4Bn (+15%)" },
        { label: "Net Profit",    value: "LKR 4.1Bn (+18%)" },
        { label: "EBITDA",        value: "LKR 5.7Bn (+14%)" },
      ],
      businessImpact: [
        { label: "Improved Profitability",       detail: "Better cost visibility and margin analysis." },
        { label: "Faster Decision Making",       detail: "Real-time access to accurate data." },
        { label: "Operational Efficiency",       detail: "Automated reporting and reduced manual effort." },
        { label: "Greater Accuracy & Compliance", detail: "Reliable and auditable financial reporting." },
        { label: "Empowered Teams",              detail: "Self-service analytics for business users." },
        { label: "Supports Sustainable Growth",  detail: "Data-driven insights for long-term business strategy." },
      ],
      futureEnhancements: [
        "Advanced Forecasting & AI/ML Analytics.",
        "Integrated Planning & Budgeting — driver-based planning, what-if analysis.",
        "Sustainability & ESG Reporting.",
        "Supply Chain & Cost-to-Serve Analytics.",
        "Real-Time Alerts & Anomaly Detection.",
        "Expanded Data Sources.",
        "Cloud Modernization — Microsoft Fabric/Azure.",
        "Advanced Self-Service Capabilities — natural-language queries, AI-powered insights.",
      ],
      infographic: {
        src: "/infographics/customers/dilmah.webp",
        title: "Dilmah Modern Data Platform",
        caption: "Finance & accounting data platform for Dilmah",
        w: 1024,
        h: 1536,
      },
    },
  },

  {
    id: "amana-bank",
    name: "Amāna Bank",
    category: "Banking",
    description: "Enterprise Analytics Platform — 2,500 GB historical data warehouse",
    caseStudy: {
      tagline:
        "Enterprise Analytics & Reporting Platform — Transforming Data into Smarter Banking Decisions",
      overview:
        "A comprehensive Business Intelligence (BI) solution developed by Creative Web Technologies to modernise Amāna Bank's data platform. The solution provides unified reporting, analytics and dashboards to support sales, operations, branch performance, customer insights and regulatory reporting, helping the Bank increase revenue, profitability and productivity while reducing operational costs.",
      objectives: [
        "Unified Data Platform — consolidates data from multiple banking systems into a single data lake/warehouse.",
        "Interactive Dashboards — real-time and historical insights for management and operational teams.",
        "Branch & Sales Performance — monitoring across branches and sales teams.",
        "Customer Insights — data-driven understanding of customer behaviour and product usage.",
        "Regulatory Reporting — accurate and timely compliance reporting.",
        "Advanced Analytics — trend analysis, forecasting, what-if analysis.",
      ],
      stakeholders: [
        "Executive & Management teams",
        "Branch operations teams",
        "Sales teams",
        "Regulatory & compliance teams",
        "IT & Data teams",
      ],
      techStack: [
        "Microsoft SQL Server (Data Warehouse)",
        "SSIS (ETL & Data Integration)",
        "SSRS (Operational Reports)",
        "Power BI (Interactive Dashboards)",
        "Azure / On-Premises (Flexible Deployment)",
      ],
      keyFeatures: [
        "Unified Data Platform",
        "Interactive Dashboards",
        "Branch & Sales Performance",
        "Customer Insights",
        "Regulatory Reporting",
        "Advanced Analytics",
      ],
      sampleMetrics: [
        { label: "Total Deposits",  value: "LKR 150.8Bn (+12.5%)" },
        { label: "Total Advances",  value: "LKR 132.4Bn (+15.2%)" },
        { label: "Net Profit",      value: "LKR 3.2Bn (+18.7%)" },
      ],
      businessImpact: [
        { label: "Increased Revenue",         detail: "Enabled data-driven sales strategies and cross-sell opportunities." },
        { label: "Higher Productivity",       detail: "Streamlined reporting and reduced manual effort across teams." },
        { label: "Reduced Operational Costs", detail: "Automated data integration and reporting processes." },
        { label: "Better Decision Making",    detail: "Real-time insights for management and operational teams." },
        { label: "Stronger Compliance",       detail: "Accurate and timely regulatory reporting." },
      ],
      futureEnhancements: [
        "Advanced AI & Machine Learning — predictive analytics, risk scoring, churn prediction.",
        "Real-Time Analytics.",
        "Customer 360 — unified customer view, personalised offers.",
        "Self-Service Analytics.",
        "Enhanced Regulatory Reporting — automated compliance, XBRL/standard formats.",
        "Integration with Digital Channels — mobile banking insights, omni-channel reporting.",
        "Big Data & Cloud Modernization.",
        "Industry Benchmarking.",
      ],
      quote: {
        text: "The Business Intelligence (BI) solution provided by Creative Software to Amana Bank is highly useful and beneficial to our business. Our sales and branch operation teams have significantly transformed, and your solution has helped increase revenue, profitability and productivity while reducing our operational costs drastically over a short period of time.",
        author: "Rajitha Dissanayake, Chief Information Officer, Amāna Bank PLC",
      },
      infographic: {
        src: "/infographics/customers/amana-bank.webp",
        title: "Amāna Bank Banking Solution",
        caption: "Enterprise analytics & reporting platform for Amāna Bank",
        w: 1024,
        h: 1536,
      },
    },
  },

  {
    id: "ruwan-rekha-rro",
    name: "Ruwan Rekha Outreach (RRO)",
    category: "Agriculture",
    description: "CSIAP Nature Smart Market Platform — agriculture market connectivity",
    caseStudy: {
      tagline:
        "A Digital Marketplace for Sustainable Agriculture — Connecting Farmers, Cooperatives, Buyers and Export Markets for a Greener, More Prosperous Sri Lanka",
      overview:
        "Green Market is a digital agriculture marketplace developed for Ruwan Rekha / CSIAP to connect farmers, cooperatives, buyers and exporters, enabling transparent, efficient and sustainable trading of agricultural produce, with a focus on Sri Lankan tea and other crops. The solution supports market access, fair pricing, quality assurance, traceability and compliance while promoting climate-smart and sustainable agriculture practices.",
      objectives: [
        "Provide a transparent and efficient digital marketplace for agricultural produce.",
        "Improve market access and fair pricing for farmers.",
        "Enable quality assurance, traceability and compliance.",
        "Support climate-smart and sustainable agriculture.",
        "Strengthen farmer cooperatives and value chains.",
        "Provide data-driven insights for better decision making.",
        "Promote Sri Lankan tea and agricultural products in local and international markets.",
      ],
      stakeholders: [
        "Farmers & Growers",
        "Cooperatives & Farmer Groups",
        "Processors & Manufacturers",
        "Traders & Buyers (local & international)",
        "Government & Policy Makers",
        "Development Partners (e.g. CSIAP / ADB / WB)",
      ],
      architecture: [
        {
          label: "Users",
          detail:
            "Farmers, Cooperatives, Buyers/Traders, Government/CSIAP, Administrators",
        },
        {
          label: "Green Market Platform",
          detail:
            "Web Portal (farmers/buyers/admins), Mobile App (farmers/field officers), Marketplace & Trading Engine, Traceability & Certification Module, Analytics & Reporting, Integration APIs",
        },
        {
          label: "Integrations",
          detail:
            "Payment Gateway (bank/e-payment), Laboratory Systems (quality testing), Government Systems (export/regulatory), Logistics & Shipping (tracking), External Market Data (global price feeds)",
        },
        {
          label: "Infrastructure",
          detail: "Cloud Infrastructure (Microsoft Azure) — scalable, secure, highly available",
        },
      ],
      keyFeatures: [
        "Farmer Registration & Profiling",
        "Product Listings & Marketplace",
        "Quality Assurance & Traceability — batch tracking, QR-code-based traceability, sustainability certifications",
        "Trading & Transactions — auction/tender management, price negotiation, escrow",
        "Analytics & Insights — market price trends, demand/supply analysis, farmer income & productivity",
        "Sustainability & Compliance — climate-smart practices, environmental impact tracking, export regulation compliance",
      ],
      sampleMetrics: [
        { label: "Avg. Auction Price",    value: "LKR 1,245/kg (+5.2%)" },
        { label: "Total Volume Traded",   value: "2,450 MT (+18%)" },
        { label: "Active Buyers",         value: "320 (+12%)" },
      ],
      businessImpact: [
        { label: "Higher Farmer Income",       detail: "Better market access and fairer prices." },
        { label: "Improved Market Transparency", detail: "Real-time price information and reduced intermediaries." },
        { label: "Sustainable Agriculture",    detail: "Promotes climate-smart and environmentally friendly practices." },
        { label: "Stronger Value Chains",      detail: "Connects farmers to global buyers and export markets." },
        { label: "Data-Driven Policy Support", detail: "Reliable data for better decision making and sector development." },
      ],
      futureEnhancements: [
        "Mobile App for Farmers — offline access, local language support.",
        "AI Price Forecasting.",
        "Climate & Weather Integration — advisories and risk alerts.",
        "Expanded Crop Coverage.",
        "Blockchain-Based Traceability.",
        "E-Learning & Training Hub.",
        "Export Market Integration.",
        "Advanced Sustainability Analytics — carbon footprint, ESG reporting.",
        "Financial Services Integration — credit, insurance, subsidies.",
        "Regional Expansion.",
      ],
      infographic: {
        src: "/infographics/customers/ruwan-rekha-rro.webp",
        title: "Green Market for Ruwan Rekha / CSIAP",
        caption: "Digital agriculture marketplace connecting farmers to buyers and export markets",
        w: 1024,
        h: 1536,
      },
    },
  },

  {
    id: "srilankan-airlines",
    name: "SriLankan Airlines",
    category: "Aviation",
    description: "Modern Data Platform (PoC with Microsoft) — data platform modernization",
  },

  {
    id: "air-astana",
    name: "Air Astana",
    category: "Aviation",
    description: "Cloud Modernization — AKS, microservices, API Manager, DevOps",
  },

  {
    id: "sdb-bank",
    name: "SDB Bank",
    category: "Banking",
    description: "Banking Infrastructure Modernization — AWS to Azure migration",
  },

  {
    id: "sl-college-paediatrics",
    name: "Sri Lanka College of Paediatricians",
    category: "Healthcare",
    description: "The Light Online Platform — ICU dashboard & learning management",
    caseStudy: {
      tagline:
        "Child Health Information Platform — Better Data. Healthier Children. Brighter Sri Lanka.",
      overview:
        "SLCP Light is a web-based educational and clinical information platform developed by Creative Web Technologies for the Sri Lanka College of Paediatricians. It provides comprehensive tools, resources and systems to support child healthcare through the education of professionals and parents, clinical decision support, and evidence-based knowledge sharing.",
      objectives: [
        "Improve child healthcare through education and knowledge dissemination.",
        "Provide an online platform for paediatric professionals and parents.",
        "Support clinical decision making and treatment through drug dose calculations.",
        "Enable monitoring of hospital ICU bed availability.",
        "Facilitate online learning through an integrated academy and blog.",
        "Promote cost-effective and meaningful care for children in Sri Lanka.",
      ],
      stakeholders: [
        "Paediatricians & Medical Professionals",
        "Parents & Caregivers",
        "Sri Lanka College of Paediatricians — administration, governance",
        "Hospitals & Healthcare Institutions",
        "Medical Students & Trainees",
        "Ministry of Health & Policy Makers",
      ],
      architecture: [
        {
          label: "Users",
          detail:
            "Medical Professionals, Parents & Caregivers, Hospital Administrators, Students & Trainees, Policy Makers",
        },
        {
          label: "SLCP Light Application (Web Platform)",
          detail:
            "User Management & Access Control, Module Services (ICU, Clinical Sessions, Drug Directory), Content Management (Academy & Blog), Reporting & Analytics, Integration APIs",
        },
        {
          label: "Data Sources",
          detail:
            "Hospital Systems (real-time ICU data), Reference Databases (drugs, guidelines), External Integrations (e.g. HIS, Ministry of Health)",
        },
        {
          label: "Infrastructure",
          detail: "Microsoft Azure (Cloud) — scalable, secure, highly available",
        },
      ],
      keyFeatures: [
        "ICU Bed Availability Monitoring — real-time capacity alerts, search by hospital/location, emergency referral support",
        "Clinical Session Information Module — public hospital sessions, specialist clinics and schedules",
        "Drug Directory with Dose Calculations — weight-based calculator, age-specific recommendations, safety guidelines",
        "Integrated Academy and Blog — CME courses, webinars, articles, discussion forums",
      ],
      businessImpact: [
        { label: "Better Access to Care",         detail: "Helps parents find the right services at the right time." },
        { label: "Empowered Professionals",       detail: "Continuous learning and clinical decision support." },
        { label: "Efficient Resource Utilisation", detail: "Real-time ICU bed information improves patient management." },
        { label: "Improved Child Health Outcomes", detail: "Knowledge sharing and standardised care practices." },
      ],
      futureEnhancements: [
        "Mobile Application.",
        "Advanced Analytics — child health trends, predictive analytics, regional comparisons.",
        "Integration with National Systems — HIS, eHealth, Ministry of Health dashboards.",
        "Patient & Parent Portal.",
        "Tele-Consultation Support.",
        "AI & Decision Support — AI-powered clinical guidance, smart drug recommendations, risk alerts.",
      ],
      infographic: {
        src: "/infographics/customers/sl-college-paediatrics.webp",
        title: "SLCP Light — Child Health Information Platform",
        caption: "Educational and clinical information platform for the Sri Lanka College of Paediatricians",
        w: 1024,
        h: 1536,
      },
    },
  },

  {
    id: "forte",
    name: "Forte",
    category: "Insurance",
    description: "Business Intelligence (PoC) — Power BI analytics platform",
    caseStudy: {
      tagline:
        "A phased approach to build a reliable, scalable and future-ready data platform — From Data Foundations to a Future-Ready Enterprise",
      overview:
        "Forte's data platform modernization is a six-stage journey with Creative Web Technologies: from initial assessment through to a full-scale, future-ready enterprise data platform with modern ingestion, data quality and analytics capabilities.",
      objectives: [
        "Stage 1 — Assessment & Foundation (4–6 wks): Current-state assessment, data landscape and pain points, business requirements, target architecture options, modernization roadmap, high-level effort and cost estimate.",
        "Stage 2 — Data Platform Foundation (6–8 wks): Cloud landing zone, data lake/S3 setup, network and security configuration, dev/non-prod environments, core data platform components, governance and access control.",
        "Stage 3 — Data Ingestion & Migration Preparation (8–12 wks): Source system analysis, data ingestion framework, initial data pipelines, data modelling and standardization, data quality framework, migration strategy and plan.",
        "Stage 4 — Ingestion Reliability & Data Quality Modernization (12–16 wks): Modern CDC implementation (AWS DMS/OpenFlow), orchestration with Airflow (MWAA), data quality using Great Expectations, monitoring and alerting, performance and reliability enhancements, production readiness.",
        "Stage 4A — Platform Readiness & Architecture Validation (25–50 days): Detailed technical assessment, data platform architecture design, technology evaluation (Oracle and/or Snowflake), validation of data model and ingestion approach, implementation roadmap, effort and cost estimates.",
        "Stage 4A Plus — Extended Modernization & Implementation (4–6 months): Full implementation — ingestion pipelines (Oracle → Cloud/Snowflake), data quality framework & monitoring, orchestration (MWAA), infrastructure setup (AWS/Azure), security/access control/governance, documentation and knowledge transfer, production support and handover.",
      ],
      stakeholders: [
        "Finance & Accounting Teams",
        "Data & Platform Engineering Teams",
        "Executive Management",
        "IT Leadership",
      ],
      techStack: [
        "Oracle",
        "AWS",
        "Snowflake",
        "AWS DMS",
        "Amazon S3",
        "Apache Airflow (MWAA)",
        "Great Expectations",
      ],
      keyFeatures: [
        "Phased Assessment & Modernization Roadmap",
        "Cloud Landing Zone & Data Lake Setup",
        "Modern CDC-Based Data Ingestion",
        "Airflow (MWAA) Orchestration",
        "Great Expectations Data Quality Framework",
        "Monitoring, Alerting & Observability",
        "Oracle to Cloud/Snowflake Migration",
        "Governance, Security & Access Control",
      ],
      businessImpact: [
        { label: "Reliable Data Ingestion",  detail: "Automated, high-quality, trusted data pipelines." },
        { label: "Improved Data Quality",    detail: "Data quality framework with validation, observability and reliability checks." },
        { label: "Operational Efficiency",   detail: "Reduced operational effort and faster time to insights." },
        { label: "Scalable Platform",        detail: "Cost-efficient, future-ready architecture for AI and advanced analytics." },
        { label: "Advanced Analytics",       detail: "Curated, governed data platform ready for BI, AI/ML and self-service analytics." },
      ],
      infographic: {
        src: "/infographics/customers/forte.webp",
        title: "Forte Data Platform Modernization Journey",
        caption: "A phased roadmap to a reliable, scalable, future-ready data platform for Forte",
        w: 1536,
        h: 1024,
      },
    },
  },

  {
    id: "bank-of-maldives",
    name: "Bank of Maldives",
    category: "Banking",
    description: "ETL Accelerator — core banking to data warehouse pipeline",
  },
];

export function getCustomer(id: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}
