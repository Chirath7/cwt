import { customsIntro, productSummaryRows, sharedApproach } from "../data/customsProducts";

const TAG_STYLES: Record<string, string> = {
  RISK:    "bg-orange-100 text-orange-700",
  INSIGHT: "bg-blue-100   text-blue-700",
  NOTIFY:  "bg-emerald-100 text-emerald-700",
};

export default function CustomsSectionContent() {
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

      {/* 3-product summary table */}
      <div className="mx-auto max-w-4xl overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="pb-3 pr-6">Product</th>
              <th className="pb-3 pr-6">Tag</th>
              <th className="pb-3 pr-6">Role</th>
              <th className="pb-3">Strategic value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {productSummaryRows.map((row) => (
              <tr key={row.name}>
                <td className="py-3 pr-6 font-bold text-navy">{row.name}</td>
                <td className="py-3 pr-6">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${TAG_STYLES[row.tag]}`}>
                    {row.tag}
                  </span>
                </td>
                <td className="py-3 pr-6 text-slate-700">{row.role}</td>
                <td className="py-3 text-slate-700">{row.strategicValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
