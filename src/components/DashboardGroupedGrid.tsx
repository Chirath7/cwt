import { motion, useReducedMotion } from "motion/react";
import { datDashboards } from "../data/dashboards";
import DashboardCard from "./DashboardCard";

export const DASHBOARD_GROUPS = [
  { label: "Revenue",          slugs: ["01-accounting-revenue", "12-outward-remittances", "13-relief-revenue"] },
  { label: "Trade",            slugs: ["09-import-analysis", "07-export", "06-cusdec-analysis", "02-advanced-cusdec-search"] },
  { label: "Risk Management",  slugs: ["14-risk-management", "03-advanced-fcl-import"] },
  { label: "Valuation",        slugs: ["15-valuation-analysis", "04-advanced-valuation-analysis", "16-valuation-database"] },
  { label: "Cargo Movements",  slugs: ["08-fcl-import", "11-lcl", "05-advanced-warehouse", "18-warehouse-dashboard", "17-vehicle-dashboard"] },
  { label: "Investigation",    slugs: ["10-investigation-individuals"] },
] as const;

const bySlug = Object.fromEntries(datDashboards.map((d) => [d.slug, d]));

interface Props {
  onOpen: (id: string) => void;
}

export default function DashboardGroupedGrid({ onOpen }: Props) {
  const reducedMotion = useReducedMotion();
  const dur = (base: number) => (reducedMotion ? 0 : base);

  return (
    <div className="space-y-10">
      {DASHBOARD_GROUPS.map((group) => {
        const dashboards = group.slugs.map((s) => bySlug[s]).filter(Boolean);
        if (!dashboards.length) return null;
        return (
          <section key={group.label} aria-label={group.label}>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">
              {group.label}
            </h3>
            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {dashboards.map((db, n) => (
                <motion.div
                  key={db.id}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: dur(0.35),
                    delay: reducedMotion ? 0 : Math.min(n * 0.04, 0.4),
                  }}
                >
                  <DashboardCard dashboard={db} onOpen={() => onOpen(db.id)} />
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
