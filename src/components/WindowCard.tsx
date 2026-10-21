import { motion } from "motion/react";
import type { Infographic } from "../data/sections";

interface Props {
  item: Infographic;
  onOpen: () => void;
  priority?: boolean;
}

export default function WindowCard({ item, onOpen, priority }: Props) {
  return (
    <figure className="w-full">
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${item.title}`}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl border-2 border-white bg-white text-left shadow-[0_20px_50px_-15px_rgba(15,23,42,0.35)] ring-1 ring-black/10"
      >
        {/* macOS-style chrome bar */}
        <div className="flex items-center gap-2 bg-gradient-to-b from-neutral-100 to-neutral-200 px-4 py-2.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="flex-1 pr-12 text-center text-xs font-medium text-neutral-500">{item.title}</span>
        </div>
        {/* Fixed 3:2 frame keeps all cards the same height regardless of source dimensions */}
        <div className="aspect-[3/2] bg-neutral-50">
          <img
            src={item.src}
            alt={item.title}
            width={item.w}
            height={item.h}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-contain"
          />
        </div>
      </motion.button>
      {item.caption && (
        <figcaption className="mt-3 text-center text-sm text-slate-600">{item.caption}</figcaption>
      )}
    </figure>
  );
}
