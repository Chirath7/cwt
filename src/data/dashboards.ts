import { generatedDashboards } from "./dashboards.generated";
import { dashboardContent } from "./dashboards.content";

export interface DashboardPage {
  src: string;
  label: string;
}

export interface Dashboard {
  id: string;
  slug: string;
  title: string;
  description: string;
  pages: DashboardPage[];
}

export const datDashboards: Dashboard[] = generatedDashboards.map((entry) => {
  const content = dashboardContent[entry.slug];
  return {
    id: entry.slug,
    slug: entry.slug,
    title: entry.title,
    description: content?.description ?? "",
    pages: entry.pages.map((src, i) => ({
      src,
      label: content?.pages[i] ?? `Page ${i + 1}`,
    })),
  };
});
