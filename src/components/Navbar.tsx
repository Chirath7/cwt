import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import Wordmark from "./ui/Wordmark";
import ContactModal from "./ContactModal";

const NAV_ITEMS = [
  { label: "About Us",     href: "/about" },
  { label: "CWT Customs",  href: "/customs" },
  { label: "Products",     href: "/products" },
  { label: "CWT Training", href: "/training" },
] as const;

// Closed pill: 56px (h-14 nav row) + 1px (progress bar)
const PILL_H = "57px";

export default function Navbar() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

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

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="fixed left-3 right-3 top-3 z-40 flex justify-center sm:left-4 sm:right-4 sm:top-4">
        <div className="w-full max-w-6xl">

          {/*
           * Single morphing container.
           * overflow-hidden clips content to the animated border-radius during the morph.
           * height animates between the compact pill height and "auto" (Framer Motion
           * measures the full content height before animating, so "auto" works correctly).
           */}
          <motion.div
            className="overflow-hidden border border-black/[0.06] bg-white/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.12),0_1px_4px_-1px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            initial={{ borderRadius: "9999px", height: PILL_H }}
            animate={{
              borderRadius: menuOpen ? "1rem" : "9999px",
              height: menuOpen ? "auto" : PILL_H,
            }}
            transition={{ type: "spring", damping: 24, stiffness: 340 }}
          >

            {/* ── Always-visible navbar row ───────────────────────── */}
            <header>
              <div className="flex h-14 items-center justify-between px-4 sm:px-5">
                <Link to="/" aria-label="Creative Web Technologies home">
                  <Wordmark />
                </Link>

                {/* Desktop nav (hidden on mobile) */}
                <nav aria-label="Main navigation" className="hidden gap-1 md:flex md:items-center">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "bg-navy text-white"
                          : "text-slate-600 hover:text-navy"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={() => setContactOpen(true)}
                    className="ml-2 rounded-full border border-brand/30 px-3 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    Contact Us
                  </button>
                </nav>

                {/* Hamburger (mobile only) */}
                <button
                  ref={hamburgerRef}
                  type="button"
                  aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-nav"
                  className="flex size-10 items-center justify-center rounded-full text-navy hover:bg-navy/10 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  onClick={() => setMenuOpen((o) => !o)}
                >
                  <span className="relative flex h-5 w-5 flex-col items-center justify-center gap-1.5" aria-hidden="true">
                    <span className={`block h-0.5 w-5 rounded bg-current transition-all duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                    <span className={`block h-0.5 w-5 rounded bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block h-0.5 w-5 rounded bg-current transition-all duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                  </span>
                </button>
              </div>

              {/* Progress bar — clipped to the animated border-radius by overflow-hidden */}
              <motion.div
                style={{ scaleX }}
                className="h-px origin-left bg-gradient-to-r from-brand to-emerald-400"
              />
            </header>

            {/* ── Mobile menu content ─────────────────────────────── */}
            {/*
             * Always in the DOM — the outer container's growing height reveals it.
             * Opacity fades in with a 120 ms delay on open (shape morph reads first)
             * and fades out immediately on close.
             * tabIndex / aria-hidden keep it inaccessible when visually hidden.
             */}
            <motion.div
              id="mobile-nav"
              aria-hidden={!menuOpen}
              className="md:hidden"
              animate={{ opacity: menuOpen ? 1 : 0 }}
              transition={
                menuOpen
                  ? { duration: 0.2, delay: 0.12, ease: "easeOut" }
                  : { duration: 0.08, ease: "easeIn" }
              }
            >
              <nav
                aria-label="Mobile navigation"
                className="flex flex-col divide-y divide-black/5 px-5 pb-5 pt-1"
              >
                {NAV_ITEMS.map((item, i) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                    className={`py-3.5 text-base font-semibold transition-colors ${
                      isActive(item.href) ? "text-brand" : "text-navy hover:text-brand"
                    }`}
                  >
                    <span className="mr-3 text-xs font-normal text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => { closeMenu(); setContactOpen(true); }}
                  className="py-3.5 text-left text-base font-semibold text-brand hover:text-brand/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  Contact Us
                </button>
              </nav>
            </motion.div>

          </motion.div>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
