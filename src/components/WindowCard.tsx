import { motion } from "motion/react";
import type { Infographic } from "../data/sections";

interface Props {
  item: Infographic;
  onOpen: () => void;
  priority?: boolean;
}

export default function WindowCard({ item, onOpen, priority }: Props) {
  const isDatExplorer = item.action === "dat-explorer";

  return (
    <figure className="w-full">
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={isDatExplorer ? `Open ${item.title} explorer` : `Open ${item.title}`}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`group block w-full overflow-hidden rounded-2xl border-2 border-white bg-white text-left shadow-[0_20px_50px_-15px_rgba(15,23,42,0.35)] ring-1 ring-black/10 ${
          isDatExplorer ? "cursor-pointer" : "cursor-zoom-in"
        }`}
      >
        {/* macOS-style chrome bar */}
        <div className="flex items-center gap-2 bg-gradient-to-b from-neutral-100 to-neutral-200 px-4 py-2.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="flex-1 pr-12 text-center text-xs font-medium text-neutral-500">{item.title}</span>
        </div>
        {/* Fixed 3:2 frame */}
        <div className="relative aspect-[3/2] bg-neutral-50">
          <img
            src={item.src}
            alt={item.title}
            width={item.w}
            height={item.h}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-contain"
          />
          {item.videoUrl && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-white/80 text-2xl text-slate-800 shadow-lg">
                ▶
              </div>
            </div>
          )}
          {isDatExplorer && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-brand/90 px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
                Explore DAT →
              </div>
            </div>
          )}
        </div>
      </motion.button>
      {item.caption && (
        <figcaption className="mt-3 text-center text-sm text-slate-600">{item.caption}</figcaption>
      )}
    </figure>
  );
}
