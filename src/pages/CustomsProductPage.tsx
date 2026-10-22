import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { customsProducts, PRODUCT_ORDER, type ProductId } from "../data/customsProducts";
import { datDashboards, type Dashboard } from "../data/dashboards";
import type { Infographic } from "../data/sections";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lightbox from "../components/Lightbox";
import DashboardGroupedGrid from "../components/DashboardGroupedGrid";
import DashboardViewer from "../components/DashboardViewer";
import DatExplorer from "../components/DatExplorer";

interface Props {
  productId: ProductId;
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
      {children}
    </h2>
  );
}

function NumberedCard({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
        {n}
      </span>
      <p className="text-sm leading-relaxed text-slate-700">{text}</p>
    </div>
  );
}

function ValuePoint({ text }: { text: string }) {
  return (
    <li className="flex gap-3 text-slate-700">
      <span className="mt-0.5 text-brand" aria-hidden="true">✓</span>
      <span>{text}</span>
    </li>
  );
}

export default function CustomsProductPage({ productId }: Props) {
  const product = customsProducts[productId];
  const { hash } = useLocation();
  const navigate = useNavigate();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null);
  const [datExplorerOpen, setDatExplorerOpen] = useState(false);

  // Auto-open DatExplorer when the page is loaded with a #dat hash (deep link)
  useEffect(() => {
    if (productId === "dat" && (hash === "#dat" || hash.startsWith("#dat/"))) {
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
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-navy via-slate-800 to-slate-900 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-4xl">
            {/* Back link */}
            <Link
              to="/#customs"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white"
            >
              <span aria-hidden="true">←</span> Back to CWT Customs
            </Link>

            {/* Tag pill */}
            <div className="mb-4">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ring-1 ${tagStyle.pill}`}>
                {product.tag}
              </span>
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

        {/* ── Infographic ──────────────────────────────────────────── */}
        <div className="bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <SectionHeading>Infographic</SectionHeading>
            <motion.button
              type="button"
              onClick={openInfographic}
              aria-label={`Open ${product.infographic.title} infographic`}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="block w-full overflow-hidden rounded-2xl border-2 border-white shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)] ring-1 ring-black/10 cursor-zoom-in"
            >
              <div className="flex items-center gap-2 bg-gradient-to-b from-neutral-100 to-neutral-200 px-4 py-2.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
                <span className="flex-1 pr-12 text-center text-xs font-medium text-neutral-500">
                  {product.infographic.title}
                </span>
              </div>
              <div className="aspect-[3/2] bg-neutral-50">
                <img
                  src={product.infographic.src}
                  alt={product.infographic.caption}
                  width={product.infographic.w}
                  height={product.infographic.h}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
            </motion.button>
            {product.infographic.caption && (
              <p className="mt-3 text-center text-sm text-slate-500">{product.infographic.caption}</p>
            )}
          </div>
        </div>

        {/* ── Overview ─────────────────────────────────────────────── */}
        {!isTodo(product.overview) && (
          <div className="bg-white/60 px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <SectionHeading>Overview</SectionHeading>
              <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{product.overview}</p>
            </div>
          </div>
        )}

        {/* ── Key capabilities ─────────────────────────────────────── */}
        {product.capabilities.length > 0 && (
          <div className="bg-white px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <SectionHeading>Key capabilities</SectionHeading>
              <div className="grid gap-4 sm:grid-cols-2">
                {product.capabilities.map((cap, i) => (
                  <NumberedCard key={i} n={i + 1} text={cap} />
                ))}
              </div>
              {product.capabilitiesNote && (
                <p className="mt-5 text-xs italic text-slate-400">{product.capabilitiesNote}</p>
              )}
            </div>
          </div>
        )}

        {/* ── DAT: Analytical domains ──────────────────────────────── */}
        {productId === "dat" && product.domains && product.domains.length > 0 && (
          <div className="bg-white/60 px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <SectionHeading>Analytical domains</SectionHeading>
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-5 py-3 font-semibold text-slate-600">Domain</th>
                      <th className="px-5 py-3 font-semibold text-slate-600">Business question</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {product.domains.map((row) => (
                      <tr key={row.domain} className="hover:bg-slate-50/50">
                        <td className="px-5 py-3 font-medium text-navy">{row.domain}</td>
                        <td className="px-5 py-3 text-slate-600">{row.question}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── DAT: Architecture ────────────────────────────────────── */}
        {productId === "dat" && product.architecture && product.architecture.length > 0 && (
          <div className="bg-white px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-5xl">
              <SectionHeading>Architecture — Sri Lanka pattern</SectionHeading>
              {/* Horizontal on md+, vertical on mobile */}
              <div className="flex flex-col gap-0 md:flex-row md:items-start">
                {product.architecture.map((step, i) => (
                  <div key={step.label} className="flex flex-col md:flex-row md:items-center">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex size-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                        {i + 1}
                      </div>
                      <p className="mt-2 max-w-[110px] text-xs font-semibold text-navy">
                        {step.label}
                      </p>
                      {step.detail && (
                        <p className="mt-1 max-w-[110px] text-[10px] leading-snug text-slate-500">
                          {step.detail}
                        </p>
                      )}
                    </div>
                    {i < product.architecture!.length - 1 && (
                      <>
                        {/* Arrow: right on md+, down on mobile */}
                        <span className="mx-3 hidden text-xl text-slate-300 md:block" aria-hidden="true">→</span>
                        <span className="my-2 block self-center text-xl text-slate-300 md:hidden" aria-hidden="true">↓</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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

        {/* ── Business value ───────────────────────────────────────── */}
        {product.businessValue.length > 0 && (
          <div className="bg-white px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <SectionHeading>Business value</SectionHeading>
              <ul className="space-y-4">
                {product.businessValue.map((v, i) => (
                  <ValuePoint key={i} text={v} />
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── Potential application areas ──────────────────────────── */}
        {product.applicationAreas && product.applicationAreas.length > 0 && (
          <div className="bg-white/60 px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <SectionHeading>Potential application areas</SectionHeading>
              <div className="flex flex-wrap gap-3">
                {product.applicationAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-xs italic text-slate-400">
                These are potential application areas; individual workflows must be confirmed during requirements assessment.
              </p>
            </div>
          </div>
        )}

        {/* ── Who benefits ─────────────────────────────────────────── */}
        {product.audiences.length > 0 && (
          <div className="bg-white/60 px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <SectionHeading>Who benefits</SectionHeading>
              <div className="flex flex-wrap gap-3">
                {product.audiences.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Roadmap ──────────────────────────────────────────────── */}
        {product.futureEnhancements.length > 0 && (
          <div className="bg-white px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex flex-wrap items-baseline gap-3">
                <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                  Potential future enhancements
                </h2>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                  Not yet delivered
                </span>
              </div>
              <ul className="space-y-3">
                {product.futureEnhancements.map((f, i) => (
                  <li key={i} className="flex gap-3 text-slate-600">
                    <span className="mt-0.5 text-slate-300" aria-hidden="true">◦</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── Sri Lanka reference ──────────────────────────────────── */}
        {!isTodo(product.slReference) && (
          <div className="bg-white/60 px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-4xl">
              <SectionHeading>Sri Lanka reference</SectionHeading>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <img
                  src="/logo/sl-customs.png"
                  alt="Sri Lanka Customs emblem"
                  className="mb-4 h-16 w-auto"
                />
                <p className="text-base text-slate-700">{product.slReference}</p>
                {product.slReferenceUnconfirmed && (
                  <p className="mt-3 text-xs italic text-amber-600">
                    Exact delivered scope still needs confirming before external publishing.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── Closing CTA ──────────────────────────────────────────── */}
        {!isTodo(product.conversationStarter) && (
          <div className="bg-gradient-to-br from-navy via-slate-800 to-slate-900 px-4 py-20 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-8 text-lg font-medium text-white/80 sm:text-xl">
                "{product.conversationStarter}"
              </p>
              <a
                href="mailto:info@cwt.lk"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get in touch
              </a>
            </div>
          </div>
        )}

        {/* ── Prev / Next products ─────────────────────────────────── */}
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
              to="/#customs"
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
      </main>

      <Footer />

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
