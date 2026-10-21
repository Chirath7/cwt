import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { sections } from "../data/sections";
import Wordmark from "./Wordmark";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Highlight active section via IntersectionObserver
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...sections.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Prevent body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label="Creative Web Technologies home">
          <Wordmark />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden gap-1 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                active === s.id ? "bg-navy text-white" : "text-slate-600 hover:text-navy"
              }`}
            >
              {s.title}
            </a>
          ))}
        </nav>

        {/* Hamburger (mobile only) */}
        <button
          ref={hamburgerRef}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="flex size-10 items-center justify-center rounded-lg text-navy hover:bg-navy/10 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {/* Simple animated hamburger → ✕ */}
          <span className="relative flex h-5 w-5 flex-col items-center justify-center gap-1.5" aria-hidden="true">
            <span
              className={`block h-0.5 w-5 rounded bg-current transition-all duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 rounded bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 rounded bg-current transition-all duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {/* Progress bar */}
      <motion.div style={{ scaleX }} className="h-0.5 origin-left bg-gradient-to-r from-brand to-emerald-400" />

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 top-16 z-50 flex flex-col bg-white md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-black/5 px-6 py-4">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={closeMenu}
                  className={`py-4 text-lg font-semibold transition-colors ${
                    active === s.id ? "text-brand" : "text-navy hover:text-brand"
                  }`}
                >
                  <span className="mr-3 text-sm font-normal text-slate-400">
                    {String(s.order).padStart(2, "0")}
                  </span>
                  {s.title}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
