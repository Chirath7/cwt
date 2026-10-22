import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { datDashboards } from "../data/dashboards";
import DashboardGroupedGrid from "./DashboardGroupedGrid";
import DashboardViewer from "./DashboardViewer";

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface Props {
  onClose: () => void;
  onOpenInfographic: () => void;
}

export default function DatExplorer({ onClose, onOpenInfographic }: Props) {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<Element | null>(null);
  const prevHashRef = useRef(location.hash);

  const selectedDashboard =
    selectedId != null ? (datDashboards.find((d) => d.id === selectedId) ?? null) : null;

  // Close via X button or "View infographic" — restores hash without adding history
  const closeImmediate = useCallback(() => {
    history.replaceState(null, "", prevHashRef.current || location.pathname);
    onClose();
  }, [onClose]);

  const handleViewInfographic = useCallback(() => {
    history.replaceState(null, "", prevHashRef.current || location.pathname);
    onOpenInfographic();
  }, [onOpenInfographic]);

  // Navigate level 1 → level 2
  const openDashboard = useCallback((id: string) => {
    history.pushState(null, "", `#dat/${id}`);
    setSelectedId(id);
  }, []);

  // Navigate level 2 → level 1 (used as DashboardViewer's onClose)
  const back = useCallback(() => {
    setSelectedId(undefined);
    history.replaceState(null, "", "#dat");
  }, []);

  // Focus: save caller, move into overlay, restore on unmount
  useEffect(() => {
    prevFocusRef.current = document.activeElement;
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      (prevFocusRef.current as HTMLElement | null)?.focus();
    };
  }, []);

  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Push #dat on mount; handle browser back/forward via popstate
  useEffect(() => {
    history.pushState(null, "", "#dat");

    const onPop = () => {
      const hash = location.hash;
      if (hash.startsWith("#dat/")) {
        const id = hash.slice(5);
        if (id) setSelectedId(id);
      } else if (hash === "#dat") {
        setSelectedId(undefined);
      } else {
        // Navigated past #dat → close the explorer
        onClose();
      }
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [onClose]);

  // Keyboard: Escape + focus-trap. Suppressed when DashboardViewer is open (it handles its own)
  useEffect(() => {
    if (selectedId != null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeImmediate();
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
  }, [selectedId, closeImmediate]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="DAT — Data Analytics Tool explorer"
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 text-white">
        {/* Breadcrumb */}
        <nav aria-label="DAT breadcrumb" className="flex min-w-0 items-center gap-2 text-sm font-medium">
          <button
            type="button"
            onClick={selectedDashboard ? back : closeImmediate}
            className="shrink-0 transition-colors hover:text-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            DAT
          </button>
          {selectedDashboard && (
            <>
              <span className="shrink-0 text-white/40" aria-hidden="true">›</span>
              <span className="truncate text-white/60">{selectedDashboard.title}</span>
            </>
          )}
        </nav>

        <div className="ml-4 flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleViewInfographic}
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            View infographic
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={closeImmediate}
            aria-label="Close DAT explorer"
            className="rounded-full bg-white/10 px-4 py-1.5 text-sm hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Close ✕
          </button>
        </div>
      </div>

      {/* Body — level 1 grid */}
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-xl font-bold text-white">
            Data Analytics Tool
            <span className="ml-3 text-sm font-normal text-white/50">
              {datDashboards.length} dashboards
            </span>
          </h2>
          <DashboardGroupedGrid onOpen={openDashboard} />
        </div>
      </div>

      {/* Level 2 — DashboardViewer renders at z-[60], above this overlay */}
      <DashboardViewer dashboard={selectedDashboard} onClose={back} />
    </motion.div>
  );
}
