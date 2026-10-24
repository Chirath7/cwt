import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lightbox from "../components/ui/Lightbox";
import WindowCard from "../components/WindowCard";
import { getProduct } from "../data/products";
import type { Infographic } from "../data/sections";

const TAG_STYLES: Record<string, string> = {
  ANALYTICS:   "bg-blue-100    text-blue-700    ring-blue-200",
  PLATFORM:    "bg-purple-100  text-purple-700  ring-purple-200",
  GOVERNMENT:  "bg-slate-100   text-slate-700   ring-slate-200",
  FINANCE:     "bg-amber-100   text-amber-700   ring-amber-200",
  HEALTHCARE:  "bg-emerald-100 text-emerald-700 ring-emerald-200",
  AI:          "bg-lime-100    text-lime-700    ring-lime-200",
  AGRICULTURE: "bg-green-100   text-green-700   ring-green-200",
};

const DEFAULT_TAG = "bg-slate-100 text-slate-700 ring-slate-200";

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProduct(productId) : undefined;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!product) return <Navigate to="/products" replace />;

  const tagStyle = TAG_STYLES[product.tag] ?? DEFAULT_TAG;

  const infographicItem: Infographic = {
    src: product.infographic.src,
    title: product.infographic.title,
    caption: product.infographic.caption,
    w: product.infographic.w,
    h: product.infographic.h,
  };

  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-navy via-slate-800 to-slate-900 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/products"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
            >
              <span aria-hidden="true">←</span> Back to Our Products
            </Link>

            <div className="mb-4">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ring-1 ${tagStyle}`}>
                {product.tag}
              </span>
            </div>

            <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {product.fullName}
            </h1>

            <p className="mb-6 text-xl font-medium text-white/80">{product.tagline}</p>

            <p className="mb-8 max-w-2xl text-base text-white/70">{product.overview}</p>

            {/* Core question callout */}
            <div className="inline-block rounded-xl border border-white/20 bg-white/10 px-6 py-4">
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/50">
                Core question
              </p>
              <p className="text-base font-semibold text-white">{product.coreQuestion}</p>
            </div>
          </div>
        </div>

        {/* ── Infographic ─────────────────────────────────────────── */}
        <div className="bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <WindowCard item={infographicItem} onOpen={() => setLightboxIndex(0)} />
          </div>
        </div>

        {/* ── Capabilities + Business Value ───────────────────────── */}
        <div className="bg-slate-50 px-4 py-16 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">

            <div>
              <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-navy">
                Capabilities
              </h2>
              <ul className="space-y-3">
                {product.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-snug text-slate-700">
                    <span className="mt-0.5 shrink-0 text-brand" aria-hidden="true">✦</span>
                    {cap}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-navy">
                Business Value
              </h2>
              <ul className="space-y-3">
                {product.businessValue.map((val, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-snug text-slate-700">
                    <span className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true">✓</span>
                    {val}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Architecture (optional) ─────────────────────────────── */}
        {product.architecture && product.architecture.length > 0 && (
          <div className="bg-white px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-10 text-2xl font-extrabold tracking-tight text-navy">
                Architecture
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {product.architecture.map((step, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="font-semibold text-navy">{step.label}</p>
                    </div>
                    {step.detail && (
                      <p className="text-sm leading-relaxed text-slate-600">{step.detail}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Audiences ───────────────────────────────────────────── */}
        <div className="bg-slate-50 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-navy">
              Who it's for
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.audiences.map((aud) => (
                <span
                  key={aud}
                  className="rounded-full bg-navy/5 px-4 py-2 text-sm font-medium text-navy ring-1 ring-navy/10"
                >
                  {aud}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <div className="dot-bg relative overflow-hidden border-t border-slate-200 bg-canvas px-4 py-20 sm:px-6">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-brand">
              Start a conversation
            </p>
            <blockquote className="mb-10 text-lg font-medium leading-relaxed text-navy sm:text-xl">
              "{product.conversationStarter}"
            </blockquote>
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
      </main>

      <Footer />

      {/* ── Lightbox ────────────────────────────────────────────── */}
      <Lightbox
        items={[infographicItem]}
        index={lightboxIndex}
        onChange={(i) => setLightboxIndex(i)}
      />
    </>
  );
}
