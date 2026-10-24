export interface Customer {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const customers: Customer[] = [
  {
    id: "allianz",
    name: "Allianz",
    category: "Insurance",
    description: "Allianz Insight Reporting (AIR) — automated cloud-native BI platform",
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
  },
  {
    id: "amana-bank",
    name: "Amāna Bank",
    category: "Banking",
    description: "Enterprise Analytics Platform — 2,500 GB historical data warehouse",
  },
  {
    id: "ruwan-rekha-rro",
    name: "Ruwan Rekha Outreach (RRO)",
    category: "Agriculture",
    description: "CSIAP Nature Smart Market Platform — agriculture market connectivity",
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
  },
  {
    id: "forte",
    name: "Forte",
    category: "Insurance",
    description: "Business Intelligence (PoC) — Power BI analytics platform",
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
