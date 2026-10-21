import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { SectionData, Infographic } from "../data/sections";
import WindowCard from "./WindowCard";
import CollectionSummary from "./CollectionSummary";

interface Props {
  section: SectionData;
  index: number;
  onOpen: (item: Infographic) => void;
}

export default function Section({ section, index, onOpen }: Props) {
  const isCollection = (section.extras?.length ?? 0) > 0;
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const allItems = [section.cover, ...(section.extras ?? [])];

  const handleCollapse = () => {
    // Capture where the section header is before we shrink the DOM
    const topBefore = sectionRef.current?.getBoundingClientRect().top ?? 0;
    setExpanded(false);
    // Two rAFs: first fires after state update, second after paint
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const topAfter = sectionRef.current?.getBoundingClientRect().top ?? 0;
        // Scroll so the section header stays at the same viewport position
        window.scrollBy({ top: topAfter - topBefore, behavior: "instant" });
      }),
    );
  };

  const dur = (base: number) => (reducedMotion ? 0 : base);

  return (
    <section
      ref={sectionRef}
      id={section.id}
      className={`relative px-4 py-24 sm:px-6 ${index % 2 ? "bg-white/60" : ""}`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: dur(0.6) }}
          className="mb-14 flex flex-col items-center gap-4 text-center"
        >
          {section.badge && (
            <img src={section.badge} alt="Sri Lanka Customs emblem" className="h-24 w-auto" />
          )}
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-brand">
            {String(section.order).padStart(2, "0")}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            {section.title}
          </h2>
          <p className="max-w-xl text-lg text-slate-600">{section.blurb}</p>
        </motion.div>

        {/* Content area */}
        {isCollection ? (
          <AnimatePresence mode="wait">
            {!expanded ? (
              <motion.div
                key="summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
                transition={{ duration: dur(0.25) }}
              >
                <CollectionSummary section={section} onExpand={() => setExpanded(true)} />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                id={`${section.id}-grid`}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: dur(0.35) }}
              >
                <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
                  {allItems.map((item, n) => (
                    <motion.div
                      key={item.src}
                      initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: dur(0.5), delay: reducedMotion ? 0 : Math.min(n * 0.06, 0.3) }}
                    >
                      <WindowCard item={item} onOpen={() => onOpen(item)} />
                    </motion.div>
                  ))}
                </div>

                {/* Show less */}
                <div className="mt-12 text-center">
                  <motion.button
                    type="button"
                    onClick={handleCollapse}
                    aria-expanded={true}
                    aria-controls={`${section.id}-grid`}
                    className="inline-flex items-center gap-2 rounded-full border border-navy/20 px-6 py-2.5 text-sm font-semibold text-navy hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    whileHover={{ scale: reducedMotion ? 1 : 1.04 }}
                    whileTap={{ scale: reducedMotion ? 1 : 0.97 }}
                  >
                    <span aria-hidden="true">↑</span> Show less
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: reducedMotion ? 0 : 60, scale: reducedMotion ? 1 : 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: dur(0.7), ease: [0.22, 1, 0.36, 1] }}
            >
              <WindowCard
                item={section.cover}
                onOpen={() => onOpen(section.cover)}
                priority={index === 0}
              />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
