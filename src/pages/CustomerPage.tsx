import { Link, useParams, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCustomer } from "../data/customers";

const CATEGORY_STYLES: Record<string, string> = {
  Insurance:            "bg-purple-100  text-purple-700  ring-purple-200",
  Government:           "bg-slate-100   text-slate-700   ring-slate-200",
  "Manufacturing / FMCG": "bg-orange-100 text-orange-700 ring-orange-200",
  Banking:              "bg-blue-100    text-blue-700    ring-blue-200",
  Agriculture:          "bg-green-100   text-green-700   ring-green-200",
  Aviation:             "bg-sky-100     text-sky-700     ring-sky-200",
  Healthcare:           "bg-emerald-100 text-emerald-700 ring-emerald-200",
};

const DEFAULT_BADGE = "bg-slate-100 text-slate-700 ring-slate-200";

export default function CustomerPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const client = clientId ? getCustomer(clientId) : undefined;

  if (!client) return <Navigate to="/products" replace />;

  const badgeStyle = CATEGORY_STYLES[client.category] ?? DEFAULT_BADGE;

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
              <span aria-hidden="true">←</span> Back to Our Customers
            </Link>

            <div className="mb-4">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ring-1 ${badgeStyle}`}>
                {client.category}
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {client.name}
            </h1>

            <p className="max-w-2xl text-lg text-white/75">{client.description}</p>
          </div>
        </div>

        {/* ── Client logo + case study placeholder ───────────────── */}
        <div className="bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl">

            {/* Logo button image */}
            <div className="mb-12 flex justify-center">
              <img
                src={`/customer-buttons/${client.id}.webp`}
                alt={client.name}
                className="h-20 w-auto object-contain"
              />
            </div>

            {/* Case study placeholder — macOS window chrome, matches WindowCard style */}
            <div className="overflow-hidden rounded-2xl border-2 border-white shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)] ring-1 ring-black/10">
              {/* Chrome bar */}
              <div className="flex items-center gap-2 bg-gradient-to-b from-neutral-100 to-neutral-200 px-4 py-2.5">
                <span className="size-3 rounded-full bg-[#ff5f57]" />
                <span className="size-3 rounded-full bg-[#febc2e]" />
                <span className="size-3 rounded-full bg-[#28c840]" />
                <span className="flex-1 pr-12 text-center text-xs font-medium text-neutral-500">
                  {client.name} — Full Case Study
                </span>
              </div>

              {/* Placeholder body */}
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

        {/* ── CTA ────────────────────────────────────────────────── */}
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
    </>
  );
}
