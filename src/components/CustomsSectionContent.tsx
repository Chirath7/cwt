import { useNavigate } from "react-router-dom";
import { customsIntro, productSummaryRows, sharedApproach } from "../data/customsProducts";

const TAG_STYLES: Record<string, string> = {
  RISK:    "bg-orange-100 text-orange-700",
  INSIGHT: "bg-blue-100   text-blue-700",
  NOTIFY:  "bg-emerald-100 text-emerald-700",
};

const PRODUCT_ROUTES: Record<string, string> = {
  ARMS: "/customs/arms",
  DAT:  "/customs/dat",
  CDNS: "/customs/cdns",
};

export default function CustomsSectionContent() {
  const navigate = useNavigate();

  return (
    <div className="mb-14 space-y-12">
      {/* Intro paragraph */}
      <p className="mx-auto max-w-3xl text-center text-base text-slate-600 sm:text-lg">
        {customsIntro.introParagraph}
      </p>

      {/* Core message */}
      <blockquote className="mx-auto max-w-3xl rounded-2xl border-l-4 border-brand bg-brand/5 px-8 py-6 text-base font-medium italic text-navy sm:text-lg">
        "{customsIntro.coreMessage}"
      </blockquote>

      {/* 3-product cards */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
        {productSummaryRows.map((row) => {
          const route = PRODUCT_ROUTES[row.name];
          return (
            <div
              key={row.name}
              role="link"
              tabIndex={0}
              onClick={() => navigate(route)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(route);
                }
              }}
              aria-label={`View ${row.name} product page`}
              className="group flex cursor-pointer flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:bg-slate-50 focus-visible:bg-slate-100 focus-visible:outline-none"
            >
              {/* Name + chevron row */}
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-navy">{row.name}</h3>
                <span
                  className="mt-0.5 shrink-0 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>

              {/* Tag pill */}
              <span className={`mb-3 inline-block self-start rounded-full px-2.5 py-0.5 text-xs font-bold ${TAG_STYLES[row.tag]}`}>
                {row.tag}
              </span>

              {/* Role — main body, grows to fill card height */}
              <p className="flex-1 text-sm text-slate-700">{row.role}</p>

              {/* Strategic value — bottom caption */}
              <p className="mt-4 text-xs font-medium text-slate-400">{row.strategicValue}</p>
            </div>
          );
        })}
      </div>

      {/* Shared approach strip */}
      <div>
        <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
          Shared approach
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {sharedApproach.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm"
            >
              <p className="mb-1 text-xs font-bold text-navy">{item.title}</p>
              <p className="text-xs text-slate-500">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
