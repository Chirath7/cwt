import { motion } from "motion/react";
import type { Dashboard } from "../data/dashboards";

interface Props {
  dashboard: Dashboard;
  onOpen: () => void;
}

export default function DashboardCard({ dashboard, onOpen }: Props) {
  const cover = dashboard.pages[0];

  return (
    <figure className="w-full">
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${dashboard.title}, ${dashboard.pages.length} pages`}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-white bg-white text-left shadow-[0_20px_50px_-15px_rgba(15,23,42,0.35)] ring-1 ring-black/10"
      >
        {/* macOS-style chrome bar */}
        <div className="flex items-center gap-2 bg-gradient-to-b from-neutral-100 to-neutral-200 px-4 py-2.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="flex-1 pr-12 text-center text-xs font-medium text-neutral-500">
            {dashboard.title}
          </span>
        </div>

        {/* Cover image — 16:9 to match actual screenshot aspect ratio */}
        <div className="relative aspect-[16/9] bg-neutral-100">
          {cover && (
            <img
              src={cover.src}
              alt={cover.label}
              width={624}
              height={350}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          )}
        </div>

        {/* Page count badge */}
        <span className="absolute right-3 top-3 z-10 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white shadow-md">
          {dashboard.pages.length} pages
        </span>
      </motion.button>

      {dashboard.description && (
        <figcaption className="mt-3 text-center text-sm text-white/60">
          {dashboard.description}
        </figcaption>
      )}
    </figure>
  );
}
