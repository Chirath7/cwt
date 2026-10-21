import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Infographic } from "../data/sections";

interface Props {
  items: Infographic[];
  index: number | null;
  onChange: (i: number | null) => void;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Lightbox({ items, index, onChange }: Props) {
  const [zoom, setZoom] = useState(false);
  const open = index !== null;

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<Element | null>(null);

  // Reset zoom when switching images
  useEffect(() => setZoom(false), [index]);

  // Focus management: save caller, move focus in, restore on close
  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement;
      // Defer so the dialog is in the DOM
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      (prevFocusRef.current as HTMLElement | null)?.focus();
    }
  }, [open]);

  // Keyboard: Escape closes, arrows navigate, Tab is trapped inside dialog
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onChange(null);
        return;
      }
      if (e.key === "ArrowRight" && items.length > 1) {
        onChange((index! + 1) % items.length);
        return;
      }
      if (e.key === "ArrowLeft" && items.length > 1) {
        onChange((index! - 1 + items.length) % items.length);
        return;
      }
      // Focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, items.length, onChange]);

  const item = open ? items[index!] : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-50 flex flex-col bg-slate-950/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onChange(null)}
        >
          {/* Toolbar */}
          <div
            className="flex items-center justify-between px-4 py-3 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-sm font-medium">
              {item.title}
              {items.length > 1 && (
                <span className="ml-3 text-white/50">
                  {index! + 1} / {items.length}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setZoom((z) => !z)}
                aria-label={zoom ? "Fit image to screen" : "Zoom in to image"}
                className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {zoom ? "Fit" : "Zoom"}
              </button>
              <button
                ref={closeRef}
                onClick={() => onChange(null)}
                aria-label="Close lightbox"
                className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Close ✕
              </button>
            </div>
          </div>

          {/* Image */}
          <div
            className={`relative flex-1 overflow-auto ${zoom ? "" : "flex items-center justify-center"}`}
          >
            <motion.img
              key={item.src}
              src={item.src}
              alt={item.title}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.stopPropagation();
                setZoom((z) => !z);
              }}
              className={
                zoom
                  ? "mx-auto max-w-none cursor-zoom-out"
                  : "max-h-full max-w-full cursor-zoom-in object-contain p-2 sm:p-6"
              }
              style={zoom ? { width: "min(220vw, 2400px)" } : undefined}
            />
          </div>

          {/* Prev / Next arrows */}
          {items.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index! - 1 + items.length) % items.length);
                }}
                className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                ‹
              </button>
              <button
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange((index! + 1) % items.length);
                }}
                className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-xl text-white hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                ›
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
