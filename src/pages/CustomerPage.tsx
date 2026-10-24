import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lightbox from "../components/ui/Lightbox";
import WindowCard from "../components/WindowCard";
import { getCustomer, type CaseStudy } from "../data/customers";
import type { Infographic } from "../data/sections";

const CATEGORY_STYLES: Record<string, string> = {
  Insurance:              "bg-purple-100  text-purple-700  ring-purple-200",
  Government:             "bg-slate-100   text-slate-700   ring-slate-200",
  "Manufacturing / FMCG": "bg-orange-100  text-orange-700  ring-orange-200",
  Banking:                "bg-blue-100    text-blue-700    ring-blue-200",
  Agriculture:            "bg-green-100   text-green-700   ring-green-200",
  Aviation:               "bg-sky-100     text-sky-700     ring-sky-200",
  Healthcare:             "bg-emerald-100 text-emerald-700 ring-emerald-200",
};

const DEFAULT_BADGE = "bg-slate-100 text-slate-700 ring-slate-200";

// ── Shared sub-components ──────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
      {children}
    </h2>
  );
}

function BulletList({ items, icon = "✦", iconClass = "text-brand" }: {
  items: string[];
  icon?: string;
  iconClass?: string;
}) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-snug text-slate-700">
          <span className={`mt-0.5 shrink-0 ${iconClass}`} aria-hidden="true">{icon}</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function PillList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full bg-navy/5 px-3 py-1.5 text-sm font-medium text-navy ring-1 ring-navy/10"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function ImpactGrid({ items }: { items: CaseStudy["businessImpact"] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((impact) => (
        <div key={impact.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="mb-1 font-semibold text-navy">{impact.label}</p>
          <p className="text-sm leading-relaxed text-slate-600">{impact.detail}</p>
        </div>
      ))}
    </div>
  );
}

function MetricsRow({ items }: { items: NonNullable<CaseStudy["sampleMetrics"]> }) {
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
      {items.map((m) => (
        <div key={m.label} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-xl font-extrabold text-navy">{m.value}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{m.label}</p>
        </div>
      ))}
    </div>
  );
}

function ArchitectureCards({ steps }: { steps: NonNullable<CaseStudy["architecture"]> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {steps.map((step, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2.5">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
              {i + 1}
            </span>
            <p className="font-semibold text-navy text-sm">{step.label}</p>
          </div>
          {step.detail && <p className="text-sm leading-relaxed text-slate-600">{step.detail}</p>}
        </div>
      ))}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

export default function CustomerPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const client = clientId ? getCustomer(clientId) : undefined;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!client) return <Navigate to="/products" replace />;

  const badgeStyle = CATEGORY_STYLES[client.category] ?? DEFAULT_BADGE;
  const cs = client.caseStudy;

  const infographicItem: Infographic | null = cs
    ? { src: cs.infographic.src, title: cs.infographic.title, caption: cs.infographic.caption, w: cs.infographic.w, h: cs.infographic.h }
    : null;

  const isPortrait = cs ? cs.infographic.w < cs.infographic.h : false;

  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-navy via-slate-800 to-slate-900 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/products"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white/80 transition-all hover:border-white hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span aria-hidden="true">←</span> Back to Our Customers
            </Link>

            <div className="mb-4">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ring-1 ${badgeStyle}`}>
                {client.category}
              </span>
            </div>

            <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {client.name}
            </h1>

            {cs ? (
              <>
                <p className="mb-6 text-xl font-medium text-white/80">{cs.tagline}</p>
                <p className="max-w-2xl text-base text-white/70">{cs.overview}</p>
              </>
            ) : (
              <p className="max-w-2xl text-lg text-white/75">{client.description}</p>
            )}
          </div>
        </div>

        {cs && infographicItem ? (
          isPortrait ? (
            // ── PORTRAIT LAYOUT (5 clients: 1024×1536) ───────────────
            <>
              {/* Three-column: left text | portrait infographic | right text */}
              <div className="bg-white px-4 py-16 sm:px-6">
                <div className="mx-auto max-w-7xl">
                  <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">

                    {/* ── Center: portrait WindowCard — first on mobile ── */}
                    <div className="w-full shrink-0 lg:w-[360px] xl:w-[400px]">
                      <WindowCard
                        item={infographicItem}
                        onOpen={() => setLightboxIndex(0)}
                        aspectRatio="2/3"
                      />
                    </div>

                    {/* ── Left: Objectives + Architecture ─────────────── */}
                    <div className="flex-1 space-y-10 lg:order-first lg:min-w-0">
                      <div>
                        <SectionHeading>Objectives</SectionHeading>
                        <BulletList items={cs.objectives} />
                      </div>

                      {cs.architecture && cs.architecture.length > 0 && (
                        <div>
                          <SectionHeading>Architecture</SectionHeading>
                          <ArchitectureCards steps={cs.architecture} />
                        </div>
                      )}
                    </div>

                    {/* ── Right: Stakeholders + Key Features + Metrics + Stack ── */}
                    <div className="flex-1 space-y-10 lg:min-w-0">
                      <div>
                        <SectionHeading>Stakeholders</SectionHeading>
                        <PillList items={cs.stakeholders} />
                      </div>

                      {cs.keyFeatures.length > 0 && (
                        <div>
                          <SectionHeading>Key Features</SectionHeading>
                          <BulletList items={cs.keyFeatures} icon="✓" iconClass="text-emerald-500" />
                        </div>
                      )}

                      {cs.sampleMetrics && cs.sampleMetrics.length > 0 && (
                        <div>
                          <SectionHeading>Sample Metrics</SectionHeading>
                          <MetricsRow items={cs.sampleMetrics} />
                        </div>
                      )}

                      {cs.techStack && cs.techStack.length > 0 && (
                        <div>
                          <SectionHeading>Tech Stack</SectionHeading>
                          <PillList
                            items={cs.techStack}
                            className="[&>span]:bg-white [&>span]:border [&>span]:border-slate-200 [&>span]:ring-0 [&>span]:shadow-sm [&>span]:text-slate-700"
                          />
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </div>

              {/* Business Impact — full width below the three-column block */}
              <div className="bg-slate-50 px-4 py-16 sm:px-6">
                <div className="mx-auto max-w-5xl">
                  <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-navy">Business Impact</h2>
                  <ImpactGrid items={cs.businessImpact} />
                </div>
              </div>

              {/* Future Enhancements */}
              {cs.futureEnhancements && cs.futureEnhancements.length > 0 && (
                <div className="bg-white px-4 py-16 sm:px-6">
                  <div className="mx-auto max-w-5xl">
                    <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-navy">Future Enhancements</h2>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {cs.futureEnhancements.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm leading-snug text-slate-700">
                          <span className="mt-0.5 shrink-0 text-brand/60" aria-hidden="true">→</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          ) : (
            // ── LANDSCAPE LAYOUT (forte: 1536×1024) ──────────────────
            <>
              {/* Full-width landscape WindowCard */}
              <div className="bg-white px-4 py-16 sm:px-6">
                <div className="mx-auto max-w-5xl">
                  <WindowCard item={infographicItem} onOpen={() => setLightboxIndex(0)} />
                </div>
              </div>

              {/* Objectives + Stakeholders */}
              <div className="bg-slate-50 px-4 py-16 sm:px-6">
                <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
                  <div>
                    <SectionHeading>Objectives</SectionHeading>
                    <BulletList items={cs.objectives} />
                  </div>
                  <div>
                    <SectionHeading>Stakeholders</SectionHeading>
                    <PillList items={cs.stakeholders} />

                    {cs.keyFeatures.length > 0 && (
                      <div className="mt-10">
                        <SectionHeading>Key Features</SectionHeading>
                        <BulletList items={cs.keyFeatures} icon="✓" iconClass="text-emerald-500" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Architecture */}
              {cs.architecture && cs.architecture.length > 0 && (
                <div className="bg-white px-4 py-16 sm:px-6">
                  <div className="mx-auto max-w-5xl">
                    <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-navy">Architecture</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {cs.architecture.map((step, i) => (
                        <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                          <div className="mb-3 flex items-center gap-3">
                            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                              {i + 1}
                            </span>
                            <p className="font-semibold text-navy">{step.label}</p>
                          </div>
                          {step.detail && <p className="text-sm leading-relaxed text-slate-600">{step.detail}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sample Metrics */}
              {cs.sampleMetrics && cs.sampleMetrics.length > 0 && (
                <div className="bg-slate-50 px-4 py-16 sm:px-6">
                  <div className="mx-auto max-w-5xl">
                    <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-navy">Sample Metrics</h2>
                    <MetricsRow items={cs.sampleMetrics} />
                  </div>
                </div>
              )}

              {/* Business Impact */}
              <div className={`px-4 py-16 sm:px-6 ${cs.sampleMetrics ? "bg-white" : "bg-slate-50"}`}>
                <div className="mx-auto max-w-5xl">
                  <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-navy">Business Impact</h2>
                  <ImpactGrid items={cs.businessImpact} />
                </div>
              </div>

              {/* Tech Stack */}
              {cs.techStack && cs.techStack.length > 0 && (
                <div className="bg-slate-50 px-4 py-16 sm:px-6">
                  <div className="mx-auto max-w-5xl">
                    <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-navy">Tech Stack</h2>
                    <div className="flex flex-wrap gap-2">
                      {cs.techStack.map((t) => (
                        <span key={t} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Future Enhancements */}
              {cs.futureEnhancements && cs.futureEnhancements.length > 0 && (
                <div className="bg-white px-4 py-16 sm:px-6">
                  <div className="mx-auto max-w-5xl">
                    <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-navy">Future Enhancements</h2>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {cs.futureEnhancements.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm leading-snug text-slate-700">
                          <span className="mt-0.5 shrink-0 text-brand/60" aria-hidden="true">→</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )
        ) : (
          // ── Placeholder (clients without a case study) ────────────
          <div className="bg-white px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 flex justify-center">
                <img
                  src={`/buttons/customer-buttons/${client.id}.webp`}
                  alt={client.name}
                  className="h-20 w-auto object-contain"
                />
              </div>

              <div className="overflow-hidden rounded-2xl border-2 border-white shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)] ring-1 ring-black/10">
                <div className="flex items-center gap-2 bg-gradient-to-b from-neutral-100 to-neutral-200 px-4 py-2.5">
                  <span className="size-3 rounded-full bg-[#ff5f57]" />
                  <span className="size-3 rounded-full bg-[#febc2e]" />
                  <span className="size-3 rounded-full bg-[#28c840]" />
                  <span className="flex-1 pr-12 text-center text-xs font-medium text-neutral-500">
                    {client.name} — Full Case Study
                  </span>
                </div>
                <div className="flex aspect-[3/2] flex-col items-center justify-center gap-4 bg-slate-50 px-8 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-slate-200/80 text-2xl text-slate-400">
                    ⏳
                  </div>
                  <p className="text-base font-semibold text-slate-500">Full case study coming soon</p>
                  <p className="max-w-xs text-sm text-slate-400">
                    The detailed infographic for this engagement will be published here shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonial quote — portrait and landscape both show this below content */}
        {cs?.quote && (
          <div className="bg-navy px-4 py-16 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 font-serif text-6xl leading-none text-white/20 select-none" aria-hidden="true">
                "
              </div>
              <blockquote className="text-lg font-medium leading-relaxed text-white/90 sm:text-xl">
                {cs.quote.text}
              </blockquote>
              <p className="mt-6 text-sm font-semibold text-white/50">— {cs.quote.author}</p>
            </div>
          </div>
        )}

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <div className="border-t border-slate-200 bg-canvas px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-brand">
              Interested in a similar solution?
            </p>
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

      {infographicItem && (
        <Lightbox
          items={[infographicItem]}
          index={lightboxIndex}
          onChange={(i) => setLightboxIndex(i)}
        />
      )}
    </>
  );
}
