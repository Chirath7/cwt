/**
 * Hand-editable content for each dashboard.
 * Re-running scripts/build-dashboards.mjs never touches this file.
 * Keys must match the slug in dashboards.generated.ts.
 */
export interface DashboardContent {
  description: string;
  /** One label per page in page order. Falls back to "Page N" if shorter than actual page count. */
  pages: string[];
}

export const dashboardContent: Record<string, DashboardContent> = {
  "01-accounting-revenue": {
    description: "Tracks daily and monthly Customs revenue collections against estimates for management oversight.",
    pages: ["Executive Summary", "Revenue Analysis", "Revenue by Components", "AI Analysis"],
  },

  "02-advanced-cusdec-search": {
    description: "Provides a comprehensive cross-field search interface for deep-dive CusDec declaration queries.",
    pages: [
      "Declaration Search",
      "Filters — Entity & Values",
      "Filters — Selectivity & Goods",
      "Declaration Results",
    ],
  },

  "03-advanced-fcl-import": {
    description: "Visualises FCL import container flows as a Sankey diagram and pinpoints origins on a world map.",
    pages: [
      "Container Flow — Sankey",
      "Container Flow — Table",
      "Geographical Map",
      "Geographical Map — Table",
    ],
  },

  "04-advanced-valuation-analysis": {
    description: "Flags non-referred CusDecs with valuation anomalies using a risk-colour heatmap for officer review.",
    pages: ["Non-Referred CusDecs — Level 1", "Non-Referred CusDecs — Level 2"],
  },

  "05-advanced-warehouse": {
    description: "Shows bonded warehouse commodity history with remaining stock quantities and movement transactions.",
    pages: ["Warehouse Commodity History"],
  },

  "06-cusdec-analysis": {
    description: "Provides a full drill-down into individual CusDec declarations: containers, inspections, risk assessments, and NIVDU references.",
    pages: [
      "Overview",
      "CusDec Details",
      "Containers",
      "Consignment Breakdown",
      "Inspection Details",
      "Inspection Summary",
      "Risk Assessments",
      "NIVDU References",
    ],
  },

  "07-export": {
    description: "Monitors export container and CusDec flows by office code, exit point, channel, and year-on-year revenue trends.",
    pages: [
      "Container Summary",
      "CusDec Summary",
      "Container Channel Analysis",
      "CusDec Channel Analysis",
      "LKR Revenue — Containers",
      "LKR Revenue — CusDecs",
      "HS Code Treemap",
      "Geographical Origin Map",
    ],
  },

  "08-fcl-import": {
    description: "Tracks FCL import container movements through registration, scanning, NCT gate, and main examination yard stages.",
    pages: [
      "Container Movement Time Series",
      "Average Processing Time",
      "Containers in Examination Yards",
      "Examination Yard Status Summary",
      "Examination Yard Performance",
      "Container Summary by Channel",
    ],
  },

  "09-import-analysis": {
    description: "Analyses import commodity values, tax composition, gains and losses, and origin concentration across HS code categories.",
    pages: [
      "Overview",
      "Revenue Drivers",
      "Tax Breakdown",
      "Gains & Losses",
      "Office Codes Summary",
      "Treemap Detailed",
      "Import Origins",
    ],
  },

  "10-investigation-individuals": {
    description: "Summarises customs investigation cases, recovery amounts, and connected individuals for the investigations branch.",
    pages: [
      "Investigations Summary",
      "Investigations Detailed",
      "Closed Cases — Case List",
      "Closed Cases — Case Details",
      "Closed Cases — Connected Individuals",
      "Pending Cases — Case List",
      "Pending Cases — Case Details",
      "Pending Cases — Connected Individuals",
    ],
  },

  "11-lcl": {
    description: "Monitors LCL import consignment movements, warehouse clearance times, and commodity origin trends.",
    pages: [
      "Movement Summary",
      "Warehouse View",
      "Commodity View",
      "Consignment Revenue — Rankings",
      "Consignment Revenue — Origin Map",
    ],
  },

  "12-outward-remittances": {
    description: "Monitors outward foreign exchange remittances acknowledged by Sri Lanka Customs against bank and trade terms.",
    pages: [
      "Summary — Past 12 Months",
      "Office Code View",
      "Bank View",
      "Remittance Type View",
      "Orphaned Remittance View",
    ],
  },

  "13-relief-revenue": {
    description: "Tracks tax-exempt relief revenue by preferential code, HS code, country, and consignee for compliance monitoring.",
    pages: [
      "Executive Summary",
      "Consignee & Declarant Breakdown",
      "Code & Yearly Breakdown",
      "Map View",
    ],
  },

  "14-risk-management": {
    description: "Covers CusDec risk channel distribution, container scan outcomes, OGA referrals, and fraud values for the risk management branch.",
    pages: [
      "Risk Overview — Import",
      "Risk Overview — Export",
      "Container Scan Overview",
      "Commodities View",
      "Item Count Selectivity",
      "OGA Overview",
      "Fraud View",
      "Fraud Table View",
    ],
  },

  "15-valuation-analysis": {
    description: "Tracks CusDec valuation referrals, penalty and AE recoveries, and commodity-level valuation discrepancies.",
    pages: [
      "Summary",
      "Detailed",
      "Referred CusDecs — Level 1",
      "Referred CusDecs — Level 2",
      "Commodity CusDecs — Level 1",
      "Commodity CusDecs — Level 2",
      "Consignee/Declarant — Level 1",
      "Consignee/Declarant — Level 2",
    ],
  },

  "16-valuation-database": {
    description: "Searches the reference valuation database by HS code, country, and value range to support valuation officers.",
    pages: ["Trend & Distribution Analysis", "Reference Search"],
  },

  "17-vehicle-dashboard": {
    description: "Analyses imported vehicle counts, CIF values, revenue, and country of export origin for the vehicle intelligence unit.",
    pages: ["Overview", "Value Range Analysis", "Detailed View", "Map View"],
  },

  "18-warehouse-dashboard": {
    description: "Displays bonded warehouse status, guarantee amounts, and commodity utilisation for warehouse oversight.",
    pages: ["Bonded Warehouse Summary", "Warehouse Overview"],
  },
};
