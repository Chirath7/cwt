import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { customsProducts, PRODUCT_ORDER, type ProductId } from "../data/customsProducts";
import { datDashboards, type Dashboard } from "../data/dashboards";
import type { Infographic } from "../data/sections";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lightbox from "../components/ui/Lightbox";
import DashboardGroupedGrid from "../components/customs/DashboardGroupedGrid";
import DashboardViewer from "../components/customs/DashboardViewer";
import DatExplorer from "../components/customs/DatExplorer";
import RoadmapTeaserBanner from "../components/ui/RoadmapTeaserBanner";
import ProductDetailGrid from "../components/customs/ProductDetailGrid";

interface Props {
  productId: ProductId;
  isOverlay?: boolean;
}

const TAG_STYLES: Record<string, { pill: string; text: string }> = {
  RISK:    { pill: "bg-orange-100 text-orange-700 ring-orange-200",    text: "text-orange-600" },
  INSIGHT: { pill: "bg-blue-100   text-blue-700   ring-blue-200",      text: "text-blue-600"   },
  NOTIFY:  { pill: "bg-emerald-100 text-emerald-700 ring-emerald-200", text: "text-emerald-600" },
};

const PRODUCT_NAMES: Record<ProductId, string> = {
  arms: "ARMS",
  dat: "DAT",
  cdns: "CDNS",
};

export default function CustomsProductPage({ productId, isOverlay = false }: Props) {
  const product = customsProducts[productId];
  const { hash } = useLocation();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null);
  const [datExplorerOpen, setDatExplorerOpen] = useState(false);

  // Auto-open DatExplorer when the standalone page is loaded with a #dat hash (deep link).
  // Skipped in overlay mode — the overlay manages the hash and opens on user interaction.
  useEffect(() => {
    if (productId === "dat" && !isOverlay && (hash === "#dat" || hash.startsWith("#dat/"))) {
      setDatExplorerOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openInfographic = useCallback(() => setLightboxIndex(0), []);

  const openDatExplorer = useCallback(() => setDatExplorerOpen(true), []);
  const closeDatExplorer = useCallback(() => setDatExplorerOpen(false), []);

  const handleDatExplorerInfographic = useCallback(() => {
    setDatExplorerOpen(false);
    setLightboxIndex(0);
  }, []);

  const openDashboard = useCallback((id: string) => {
    const db = datDashboards.find((d) => d.id === id) ?? null;
    setSelectedDashboard(db);
  }, []);

  const closeDashboard = useCallback(() => setSelectedDashboard(null), []);

  // Lightbox items: just the one infographic for this product
  const lightboxItems: Infographic[] = [{
    src: product.infographic.src,
    title: product.infographic.title,
    caption: product.infographic.caption,
    w: product.infographic.w,
    h: product.infographic.h,
  }];

  // Prev / next between the three products
  const currentIndex = PRODUCT_ORDER.indexOf(productId);
  const prevId = currentIndex > 0 ? PRODUCT_ORDER[currentIndex - 1] : null;
  const nextId = currentIndex < PRODUCT_ORDER.length - 1 ? PRODUCT_ORDER[currentIndex + 1] : null;

  const tagStyle = TAG_STYLES[product.tag];
  const isTodo = (s: string | undefined) => !s;

  return (
    <>
      {!isOverlay && <Navbar />}

      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-navy via-slate-800 to-slate-900 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-4xl">
            {/* Back link — only shown on the standalone page, not in the overlay */}
            {!isOverlay && (
              <Link
                to="/customs"
                className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white"
              >
                <span aria-hidden="true">←</span> Back to CWT Customs
              </Link>
            )}

            {/* Tag pill + optional teaser badge */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ring-1 ${tagStyle.pill}`}>
                {product.tag}
              </span>
              {product.roadmapTeaser && (
                <RoadmapTeaserBanner text={product.roadmapTeaser} />
              )}
            </div>

            <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {product.fullName}
            </h1>

            {!isTodo(product.tagline) && (
              <p className="mb-6 text-xl font-medium text-white/80">{product.tagline}</p>
            )}

            {!isTodo(product.proposition) && (
              <p className="mb-8 max-w-2xl text-base text-white/70">{product.proposition}</p>
            )}

            {/* Core question callout */}
            {!isTodo(product.coreQuestion) && (
              <div className="inline-block rounded-xl border border-white/20 bg-white/10 px-6 py-4">
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/50">
                  Core question
                </p>
                <p className="text-base font-semibold text-white">{product.coreQuestion}</p>
              </div>
            )}

            {/* DAT: "View all dashboards" prominent button */}
            {productId === "dat" && (
              <div className="mt-8">
                <button
                  type="button"
                  onClick={openDatExplorer}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  View all {datDashboards.length} dashboards
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Three-column product content ─────────────────────────── */}
        <div className="bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <ProductDetailGrid
              productId={productId}
              onOpenInfographic={openInfographic}
              onOpenDatExplorer={openDatExplorer}
            />
          </div>
        </div>

        {/* ── DAT: Dashboards (inline grouped grid) ────────────────── */}
        {productId === "dat" && (
          <div className="bg-slate-950 px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Dashboards
                  <span className="ml-3 text-base font-normal text-white/40">
                    {datDashboards.length} deliverables
                  </span>
                </h2>
                <button
                  type="button"
                  onClick={openDatExplorer}
                  className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Browse all →
                </button>
              </div>
              <DashboardGroupedGrid onOpen={openDashboard} />
            </div>
          </div>
        )}

        {/* ── Closing CTA ──────────────────────────────────────────── */}
        {!isTodo(product.conversationStarter) && (
          <div className="dot-bg relative overflow-hidden border-t border-slate-200 bg-canvas px-4 py-20 sm:px-6">
            {/* Brand glow — mirrors the hero */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
            <div className="relative mx-auto max-w-3xl text-center">
              {/* Eyebrow */}
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-brand">
                Start a conversation
              </p>
              {/* Quote */}
              <blockquote className="mb-10 text-lg font-medium leading-relaxed text-navy sm:text-xl">
                "{product.conversationStarter}"
              </blockquote>
              {/* CTA */}
              <a
                href="mailto:info@cwt.lk"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_-4px_rgba(31,111,235,0.45)] transition-shadow hover:shadow-[0_6px_28px_-4px_rgba(31,111,235,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Get in touch
                <span aria-hidden="true">→</span>
              </a>
              <p className="mt-4 text-sm text-slate-400">info@cwt.lk</p>
            </div>
          </div>
        )}

        {/* ── Prev / Next products — hidden in overlay mode ────────── */}
        {!isOverlay && (
          <div className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6">
            <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
              {prevId ? (
                <Link
                  to={`/customs/${prevId}`}
                  className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-sm hover:border-brand hover:text-brand"
                >
                  <span aria-hidden="true">←</span>
                  {PRODUCT_NAMES[prevId]}
                </Link>
              ) : <div />}

              <Link
                to="/customs"
                className="text-sm text-slate-500 hover:text-navy"
              >
                All products
              </Link>

              {nextId ? (
                <Link
                  to={`/customs/${nextId}`}
                  className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-navy shadow-sm hover:border-brand hover:text-brand"
                >
                  {PRODUCT_NAMES[nextId]}
                  <span aria-hidden="true">→</span>
                </Link>
              ) : <div />}
            </div>
          </div>
        )}
      </main>

      {!isOverlay && <Footer />}

      {/* ── Lightbox for infographic ─────────────────────────────── */}
      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onChange={(i) => setLightboxIndex(i)}
      />

      {/* ── DAT only: inline DashboardViewer + DatExplorer overlay ── */}
      {productId === "dat" && (
        <>
          <DashboardViewer dashboard={selectedDashboard} onClose={closeDashboard} />

          <AnimatePresence>
            {datExplorerOpen && (
              <DatExplorer
                key="dat-explorer"
                onClose={closeDatExplorer}
                onOpenInfographic={handleDatExplorerInfographic}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
}
