import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dashboard } from "../../data/dashboards";

interface Props {
  dashboard: Dashboard | null;
  onClose: () => void;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Images are 624×~350 px; 2× zoom cap = 1248 px
const NATURAL_W = 624;
const ZOOM_W = NATURAL_W * 2;

export default function DashboardViewer({ dashboard, onClose }: Props) {
  const [pageIndex, setPageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const open = dashboard !== null;

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    setPageIndex(0);
    setZoom(false);
  }, [dashboard]);

  useEffect(() => setZoom(false), [pageIndex]);

  // Auto-scroll thumbnail strip to keep active thumb visible
  useEffect(() => {
    if (!stripRef.current) return;
    const thumb = stripRef.current.children[pageIndex] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [pageIndex]);

  // Focus management
  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement;
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      (prevFocusRef.current as HTMLElement | null)?.focus();
    }
  }, [open]);

  // Keyboard navigation + focus trap
  useEffect(() => {
    if (!open || !dashboard) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowRight") {
        setPageIndex((i) => (i + 1) % dashboard.pages.length);
        return;
      }
      if (e.key === "ArrowLeft") {
        setPageIndex((i) => (i - 1 + dashboard.pages.length) % dashboard.pages.length);
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, dashboard, onClose]);

  const page = dashboard ? dashboard.pages[pageIndex] : null;

  return (
    <AnimatePresence>
      {dashboard && page && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={dashboard.title}
          // z-[60] so it layers above DatExplorer (z-50)
          className="fixed inset-0 z-[60] flex flex-col bg-slate-950/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Toolbar */}
          <div
            className="flex flex-col gap-0.5 px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">
                {dashboard.title}
                <span className="ml-3 font-normal text-white/50">
                  Page {pageIndex + 1} of {dashboard.pages.length}
                </span>
              </div>
              {page.label && (
                <div className="truncate text-xs text-white/60">{page.label}</div>
              )}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => setZoom((z) => !z)}
                aria-label={zoom ? "Fit to screen" : "Zoom 2×"}
                className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {zoom ? "Fit" : "Zoom 2×"}
              </button>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close viewer"
                className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Close ✕
              </button>
            </div>
          </div>

          {/* Main image — centred at natural size, 2× zoom cap */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Constrained frame: natural width normally, 2× when zoomed */}
            <div
              onClick={() => setZoom((z) => !z)}
              className={`aspect-[16/9] w-full transition-[max-width] duration-200 ${
                zoom ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              style={{ maxWidth: zoom ? ZOOM_W : NATURAL_W }}
            >
              <motion.img
                key={`${dashboard.id}-${pageIndex}`}
                src={page.src}
                alt={page.label}
                width={NATURAL_W}
                height={350}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="h-full w-full object-contain"
                style={{ imageRendering: "auto" }}
              />
            </div>

            {/* Prev / Next arrows */}
            {dashboard.pages.length > 1 && (
              <>
                <button
                  aria-label="Previous page"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPageIndex((i) => (i - 1 + dashboard.pages.length) % dashboard.pages.length);
                  }}
                  className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  ‹
                </button>
                <button
                  aria-label="Next page"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPageIndex((i) => (i + 1) % dashboard.pages.length);
                  }}
                  className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Thumbnail filmstrip — 16:9 thumbnails */}
          <div
            className="shrink-0 border-t border-white/10 bg-slate-900/60 px-4 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              ref={stripRef}
              className="flex gap-2 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.2) transparent" }}
            >
              {dashboard.pages.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPageIndex(i)}
                  aria-label={`Go to ${p.label}`}
                  aria-current={i === pageIndex ? "true" : undefined}
                  className={`shrink-0 overflow-hidden rounded-lg border-2 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    i === pageIndex
                      ? "border-brand shadow-[0_0_0_2px_rgba(31,111,235,0.5)]"
                      : "border-white/20 hover:border-white/50"
                  }`}
                  style={{ width: 128, aspectRatio: "16/9" }}
                >
                  <img
                    src={p.src}
                    alt={p.label}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full bg-neutral-800 object-contain"
                  />
                </button>
              ))}
            </div>
            {/* Page label below filmstrip */}
            <p className="mt-1.5 text-center text-xs text-white/40">
              {page.label}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
