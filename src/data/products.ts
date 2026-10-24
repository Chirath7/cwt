export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "banking-analytics",
    name: "Banking Analytics Platform",
    category: "Banking",
    description: "Data-driven insights for smarter banking — modern analytics for core banking data, customer insights, risk, and performance analytics",
  },
  {
    id: "insurance-analytics",
    name: "Insurance Analytics Platform",
    category: "Insurance",
    description: "From data to actionable insurance insights — claims, underwriting and performance reporting",
  },
  {
    id: "customer-data-platform",
    name: "Customer Data Platform (CDP)",
    category: "Data Platform",
    description: "Unified customer data for deeper insights — unify, analyze and activate customer data across channels",
  },
  {
    id: "cdns",
    name: "Customs Document Notification System (CDNS)",
    category: "Government",
    description: "Real-time document notifications for trade facilitation — secure, automated notification system integrated with ASYCUDA",
  },
  {
    id: "dat",
    name: "Customs Data Analytics Tool (DAT)",
    category: "Government",
    description: "Data-driven intelligence for risk and revenue — insights for risk management, revenue, valuation, imports/exports and compliance",
  },
  {
    id: "enterprise-financial-analytics",
    name: "Enterprise Financial Analytics Platform",
    category: "Finance",
    description: "Unified financial data for a diversified group — automated reporting and consolidation across multiple entities",
  },
  {
    id: "healthcare-slcp",
    name: "Healthcare Analytics Platform (SLCP)",
    category: "Healthcare",
    description: "Data for better child health outcomes — ICU dashboards and learning management for paediatric care",
  },
  {
    id: "ai-auction-bidding",
    name: "AI Auction Bidding Platform",
    category: "AI / Agriculture",
    description: "AI-driven decision intelligence for tea procurement — market intelligence, price prediction and bidding recommendations",
  },
  {
    id: "green-market-csiap",
    name: "Green Market Solution (CSIAP)",
    category: "Agriculture",
    description: "Connecting farmers to markets — agricultural market intelligence, sustainable supply chains and farmer connectivity",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
