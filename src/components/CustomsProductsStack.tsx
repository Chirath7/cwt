import { useCallback, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { customsProducts, type ProductId } from "../data/customsProducts";
import type { Infographic } from "../data/sections";
import Lightbox from "./Lightbox";
import DatExplorer from "./DatExplorer";
import WindowCard from "./WindowCard";

const STACK_ORDER: ProductId[] = ["arms", "cdns", "dat"];

const TAG_STYLES: Record<string, string> = {
  RISK:    "bg-orange-100 text-orange-700",
  INSIGHT: "bg-blue-100 text-blue-700",
  NOTIFY:  "bg-emerald-100 text-emerald-700",
};

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-navy">{children}</h3>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-slate-700">
          <span className="mt-0.5 shrink-0 text-brand" aria-hidden="true">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedCards({ items }: { items: string[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
            {i + 1}
          </span>
          <p className="text-sm text-slate-700">{item}</p>
        </div>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-slate-600">
          <span className="mt-0.5 shrink-0 text-slate-300" aria-hidden="true">◦</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function TagPills({
  items,
  color = "slate",
}: {
  items: string[];
  color?: "slate" | "emerald";
}) {
  const cls =
    color === "emerald"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-slate-200 bg-white text-slate-700 shadow-sm";
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className={`rounded-full border px-3 py-1 text-xs font-medium ${cls}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

function SriLankaCard({ text, unconfirmed }: { text: string; unconfirmed?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <img src="/logo/sl-customs.png" alt="Sri Lanka Customs emblem" className="mb-3 h-12 w-auto" />
      <p className="text-sm leading-relaxed text-slate-700">{text}</p>
      {unconfirmed && (
        <p className="mt-2 text-xs italic text-amber-600">
          Exact delivered scope still needs confirming before external publishing.
        </p>
      )}
    </div>
  );
}

function ArchFlow({ steps }: { steps: { label: string; detail: string }[] }) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => (
        <div key={step.label}>
          <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-navy">{step.label}</p>
              {step.detail && <p className="text-xs text-slate-500">{step.detail}</p>}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="ml-[22px] text-slate-300" aria-hidden="true">
              <span className="text-xl leading-none">↓</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function CustomsProductsStack() {
  const [lightboxProductId, setLightboxProductId] = useState<ProductId | null>(null);
  const [datExplorerOpen, setDatExplorerOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const closeLightbox = useCallback(() => setLightboxProductId(null), []);
  const openDatExplorer = useCallback(() => setDatExplorerOpen(true), []);
  const closeDatExplorer = useCallback(() => setDatExplorerOpen(false), []);
  const handleDatInfographic = useCallback(() => {
    setDatExplorerOpen(false);
    setLightboxProductId("dat");
  }, []);

  const lightboxItems: Infographic[] = lightboxProductId
    ? [
        {
          src: customsProducts[lightboxProductId].infographic.src,
          title: customsProducts[lightboxProductId].infographic.title,
          caption: customsProducts[lightboxProductId].infographic.caption,
          w: customsProducts[lightboxProductId].infographic.w,
          h: customsProducts[lightboxProductId].infographic.h,
        },
      ]
    : [];

  return (
    <>
      {STACK_ORDER.map((productId, idx) => {
        const product = customsProducts[productId];
        const infographicItem: Infographic = {
          src: product.infographic.src,
          title: product.infographic.title,
          caption: product.infographic.caption,
          w: product.infographic.w,
          h: product.infographic.h,
        };

        return (
          <motion.section
            key={productId}
            id={productId}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reducedMotion ? 0 : 0.55 }}
            className={`border-t border-slate-200 px-4 py-16 sm:px-6 ${
              idx % 2 === 1 ? "bg-white/60" : "bg-white"
            }`}
          >
            <div className="mx-auto max-w-7xl">
              {/* Section label */}
              <div className="mb-10 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${TAG_STYLES[product.tag]}`}
                >
                  {product.tag}
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                  {product.fullName}
                </h2>
              </div>

              {/* 3-column grid: left text / center infographic / right text
                  Mobile: infographic first (order-1), left second (order-2), right third (order-3) */}
              <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
                {/* Left column */}
                <div className="order-2 space-y-10 lg:order-1">
                  <div>
                    <SubHeading>Overview</SubHeading>
                    <p className="text-sm leading-relaxed text-slate-700">{product.overview}</p>
                  </div>

                  {product.capabilities.length > 0 && (
                    <div>
                      <SubHeading>Key capabilities</SubHeading>
                      <NumberedCards items={product.capabilities} />
                      {product.capabilitiesNote && (
                        <p className="mt-3 text-xs italic text-slate-400">
                          {product.capabilitiesNote}
                        </p>
                      )}
                    </div>
                  )}

                  {productId === "dat" && product.domains && product.domains.length > 0 && (
                    <div>
                      <SubHeading>Analytical domains</SubHeading>
                      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                              <th className="px-4 py-2.5 font-semibold text-slate-600">Domain</th>
                              <th className="px-4 py-2.5 font-semibold text-slate-600">
                                Business question
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {product.domains.map((row) => (
                              <tr key={row.domain} className="hover:bg-slate-50/50">
                                <td className="px-4 py-2.5 font-medium text-navy">{row.domain}</td>
                                <td className="px-4 py-2.5 text-slate-600">{row.question}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Center column — infographic */}
                <div className="order-1 lg:order-2">
                  <div className="lg:sticky lg:top-8">
                    <WindowCard
                      item={infographicItem}
                      onOpen={() => setLightboxProductId(productId)}
                    />
                  </div>
                </div>

                {/* Right column */}
                <div className="order-3 space-y-10">
                  {productId === "dat" &&
                    product.architecture &&
                    product.architecture.length > 0 && (
                      <div>
                        <SubHeading>Architecture</SubHeading>
                        <ArchFlow steps={product.architecture} />
                      </div>
                    )}

                  {product.businessValue.length > 0 && (
                    <div>
                      <SubHeading>Business value</SubHeading>
                      <CheckList items={product.businessValue} />
                    </div>
                  )}

                  {productId === "cdns" &&
                    product.applicationAreas &&
                    product.applicationAreas.length > 0 && (
                      <div>
                        <SubHeading>Potential application areas</SubHeading>
                        <TagPills items={product.applicationAreas} color="emerald" />
                        <p className="mt-3 text-xs italic text-slate-400">
                          These are potential application areas; individual workflows must be
                          confirmed during requirements assessment.
                        </p>
                      </div>
                    )}

                  {product.audiences.length > 0 && (
                    <div>
                      <SubHeading>Who benefits</SubHeading>
                      <TagPills items={product.audiences} />
                    </div>
                  )}

                  {(productId === "arms" || productId === "dat") &&
                    product.futureEnhancements.length > 0 && (
                      <div>
                        <div className="mb-3 flex flex-wrap items-baseline gap-2">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-navy">
                            Potential future enhancements
                          </h3>
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                            Not yet delivered
                          </span>
                        </div>
                        <BulletList items={product.futureEnhancements} />
                      </div>
                    )}

                  {product.slReference && (
                    <div>
                      <SubHeading>Sri Lanka reference</SubHeading>
                      <SriLankaCard
                        text={product.slReference}
                        unconfirmed={product.slReferenceUnconfirmed}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* DAT: View dashboards button — full width, below the 3-column grid */}
              {productId === "dat" && (
                <div className="mt-12 text-center">
                  <motion.button
                    type="button"
                    onClick={openDatExplorer}
                    className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    whileHover={{ scale: reducedMotion ? 1 : 1.04 }}
                    whileTap={{ scale: reducedMotion ? 1 : 0.97 }}
                  >
                    View dashboards
                    <span aria-hidden="true">→</span>
                  </motion.button>
                </div>
              )}
            </div>
          </motion.section>
        );
      })}

      {/* Lightbox for infographic zoom — manages its own open/close via lightboxProductId */}
      <Lightbox
        items={lightboxItems}
        index={lightboxItems.length > 0 ? 0 : null}
        onChange={(i) => {
          if (i === null) closeLightbox();
        }}
      />

      {/* DatExplorer overlay */}
      <AnimatePresence>
        {datExplorerOpen && (
          <DatExplorer
            key="dat-explorer"
            onClose={closeDatExplorer}
            onOpenInfographic={handleDatInfographic}
          />
        )}
      </AnimatePresence>
    </>
  );
}
