import { customsIntro, productSummaryRows, type ProductId } from "../../data/customsProducts";

const TAG_STYLES: Record<string, string> = {
  RISK:    "bg-orange-100 text-orange-700",
  INSIGHT: "bg-blue-100   text-blue-700",
  NOTIFY:  "bg-emerald-100 text-emerald-700",
};

const PRODUCT_IDS: Record<string, ProductId> = {
  ARMS: "arms",
  DAT:  "dat",
  CDNS: "cdns",
};

// Full literal class strings so Tailwind's scanner picks them all up at build time.
const CARD_HOVER: Record<string, string> = {
  RISK:    "hover:border-orange-300  hover:bg-orange-50  hover:shadow-lg hover:shadow-orange-100/60  active:border-orange-300  active:bg-orange-50  active:shadow-md active:shadow-orange-100/60",
  INSIGHT: "hover:border-blue-300    hover:bg-blue-50    hover:shadow-lg hover:shadow-blue-100/60    active:border-blue-300    active:bg-blue-50    active:shadow-md active:shadow-blue-100/60",
  NOTIFY:  "hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-lg hover:shadow-emerald-100/60 active:border-emerald-300 active:bg-emerald-50 active:shadow-md active:shadow-emerald-100/60",
};

const CARD_FOCUS: Record<string, string> = {
  RISK:    "focus-visible:border-orange-300  focus-visible:bg-orange-50  focus-visible:shadow-lg focus-visible:shadow-orange-100/60  focus-visible:ring-orange-400",
  INSIGHT: "focus-visible:border-blue-300    focus-visible:bg-blue-50    focus-visible:shadow-lg focus-visible:shadow-blue-100/60    focus-visible:ring-blue-400",
  NOTIFY:  "focus-visible:border-emerald-300 focus-visible:bg-emerald-50 focus-visible:shadow-lg focus-visible:shadow-emerald-100/60 focus-visible:ring-emerald-400",
};

const CHEVRON_ACCENT: Record<string, string> = {
  RISK:    "group-hover:text-orange-500  group-active:text-orange-500  group-focus-visible:text-orange-500",
  INSIGHT: "group-hover:text-blue-500    group-active:text-blue-500    group-focus-visible:text-blue-500",
  NOTIFY:  "group-hover:text-emerald-500 group-active:text-emerald-500 group-focus-visible:text-emerald-500",
};

interface Props {
  onOpenProduct: (id: ProductId) => void;
}

export default function CustomsSectionContent({ onOpenProduct }: Props) {

  return (
    <div className="mb-14 space-y-12">
      {/* Intro paragraph */}
      <p className="mx-auto max-w-3xl text-center text-base text-slate-600 sm:text-lg">
        {customsIntro.introParagraph}
      </p>

      {/* Core message — tighter horizontal padding on mobile */}
      <blockquote className="mx-auto max-w-3xl rounded-2xl border-l-4 border-brand bg-brand/5 px-5 py-5 text-base font-medium italic text-navy sm:px-8 sm:py-6 sm:text-lg">
        "{customsIntro.coreMessage}"
      </blockquote>

      {/* 3-product cards */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {productSummaryRows.map((row) => {
          const productId = PRODUCT_IDS[row.name];
          return (
            <div
              key={row.name}
              role="link"
              tabIndex={0}
              onClick={() => onOpenProduct(productId)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenProduct(productId);
                }
              }}
              aria-label={`View ${row.name} product details`}
              className={`group flex cursor-pointer flex-col rounded-xl border border-slate-200 bg-white p-10 shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1 active:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${CARD_HOVER[row.tag]} ${CARD_FOCUS[row.tag]}`}
            >
              {/* Name + chevron row */}
              <div className="mb-4 flex items-start justify-between gap-2">
                <h3 className="text-2xl font-bold text-navy">{row.name}</h3>
                <span
                  className={`mt-1 shrink-0 text-slate-400 opacity-0 transition-all duration-200 group-hover:opacity-100 group-active:opacity-100 group-focus-visible:opacity-100 ${CHEVRON_ACCENT[row.tag]}`}
                  aria-hidden="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6">
                    <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>

              {/* Tag pill */}
              <span className={`mb-5 inline-block self-start rounded-full px-4 py-1.5 text-sm font-bold ${TAG_STYLES[row.tag]}`}>
                {row.tag}
              </span>

              {/* Role — main body, grows to fill card height */}
              <p className="flex-1 text-base text-slate-700">{row.role}</p>

              {/* Strategic value — bottom caption */}
              <p className="mt-5 text-sm font-medium text-slate-400">{row.strategicValue}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
