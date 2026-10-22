import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { customsProducts, type ProductId } from "../../data/customsProducts";
import type { Infographic } from "../../data/sections";
import WindowCard from "../WindowCard";

interface Props {
  productId: ProductId;
  onOpenInfographic: () => void;
  onOpenDatExplorer?: () => void;
}

function SubHeading({ children }: { children: ReactNode }) {
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

function TagPills({ items, color = "slate" }: { items: string[]; color?: "slate" | "emerald" }) {
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

export default function ProductDetailGrid({ productId, onOpenInfographic, onOpenDatExplorer }: Props) {
  const product = customsProducts[productId];
  const reducedMotion = useReducedMotion();

  const infographicItem: Infographic = {
    src: product.infographic.src,
    title: product.infographic.title,
    caption: product.infographic.caption,
    w: product.infographic.w,
    h: product.infographic.h,
  };

  return (
    <>
      {/* 3-column grid: left text | infographic (2× wide) | right text
          Mobile stacking order: infographic → left text → right text */}
      <div className="grid grid-cols-1 gap-10 lg:[grid-template-columns:1fr_2fr_1fr] lg:items-start">
        {/* Left column — stacks second on mobile */}
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
                <p className="mt-3 text-xs italic text-slate-400">{product.capabilitiesNote}</p>
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
                      <th className="px-4 py-2.5 font-semibold text-slate-600">Business question</th>
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

        {/* Center column — infographic, stacks first on mobile */}
        <div className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-8">
            <WindowCard item={infographicItem} onOpen={onOpenInfographic} priority />
          </div>
        </div>

        {/* Right column — stacks third on mobile */}
        <div className="order-3 space-y-10">
          {productId === "dat" && product.architecture && product.architecture.length > 0 && (
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

          {productId === "cdns" && product.applicationAreas && product.applicationAreas.length > 0 && (
            <div>
              <SubHeading>Potential application areas</SubHeading>
              <TagPills items={product.applicationAreas} color="emerald" />
              <p className="mt-3 text-xs italic text-slate-400">
                These are potential application areas; individual workflows must be confirmed
                during requirements assessment.
              </p>
            </div>
          )}

          {product.audiences.length > 0 && (
            <div>
              <SubHeading>Who benefits</SubHeading>
              <TagPills items={product.audiences} />
            </div>
          )}

          {(productId === "arms" || productId === "dat") && product.futureEnhancements.length > 0 && (
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
              <SriLankaCard text={product.slReference} unconfirmed={product.slReferenceUnconfirmed} />
            </div>
          )}
        </div>
      </div>

      {/* DAT: View dashboards button — below the three-column grid */}
      {productId === "dat" && onOpenDatExplorer && (
        <div className="mt-12 text-center">
          <motion.button
            type="button"
            onClick={onOpenDatExplorer}
            className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            whileHover={{ scale: reducedMotion ? 1 : 1.04 }}
            whileTap={{ scale: reducedMotion ? 1 : 0.97 }}
          >
            View dashboards
            <span aria-hidden="true">→</span>
          </motion.button>
        </div>
      )}
    </>
  );
}
