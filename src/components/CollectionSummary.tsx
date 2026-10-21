import { motion } from "motion/react";
import type { SectionData } from "../data/sections";

interface Props {
  section: SectionData;
  onExpand: () => void;
}

export default function CollectionSummary({ section, onExpand }: Props) {
  const total = 1 + (section.extras?.length ?? 0);
  const { cover } = section;
  const noun = section.id === "training" ? "courses" : "solutions";

  return (
    <div className="mx-auto max-w-3xl">
      {/* Stacked deck — purely visual, pointer users click it to expand */}
      <div
        className="relative cursor-pointer"
        onClick={onExpand}
        role="presentation"
      >
        {/* Layer 3 (furthest back) */}
        <div
          className="absolute inset-x-6 inset-y-0 rounded-2xl border border-white/60 bg-neutral-200 shadow"
          style={{ transform: "rotate(2.5deg) translateY(6px) scale(0.96)" }}
          aria-hidden="true"
        />
        {/* Layer 2 */}
        <div
          className="absolute inset-x-3 inset-y-0 rounded-2xl border border-white/80 bg-neutral-100 shadow-md"
          style={{ transform: "rotate(1.2deg) translateY(3px) scale(0.98)" }}
          aria-hidden="true"
        />

        {/* Front card */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-white bg-white shadow-[0_20px_50px_-15px_rgba(15,23,42,0.35)] ring-1 ring-black/10">
          <div className="flex items-center gap-2 bg-gradient-to-b from-neutral-100 to-neutral-200 px-4 py-2.5">
            <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
            <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
            <span className="size-3 rounded-full bg-[#28c840]" aria-hidden="true" />
            <span className="flex-1 pr-12 text-center text-xs font-medium text-neutral-500">{cover.title}</span>
          </div>
          <div className="aspect-[3/2] bg-neutral-50">
            <img
              src={cover.src}
              alt={cover.title}
              width={cover.w}
              height={cover.h}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Count badge */}
        <span
          className="absolute right-3 top-3 z-10 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white shadow-md"
          aria-hidden="true"
        >
          {total} {noun}
        </span>
      </div>

      {/* Primary interactive control (keyboard-accessible) */}
      <div className="mt-6 text-center">
        <motion.button
          type="button"
          onClick={onExpand}
          aria-expanded={false}
          aria-controls={`${section.id}-grid`}
          className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          View all {total}
          <span aria-hidden="true">→</span>
        </motion.button>
      </div>
    </div>
  );
}
