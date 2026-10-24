import { useState } from "react";
import { Link } from "react-router-dom";
import { sections } from "../data/sections";
import type { SectionData, Infographic } from "../data/sections";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import Lightbox from "../components/ui/Lightbox";
import Footer from "../components/Footer";

const productsSections = sections.filter(
  (s) => s.id === "customers" || s.id === "products",
);
const allItems = (s: SectionData): Infographic[] => [s.cover, ...(s.extras ?? [])];

export default function ProductsPage() {
  const [lightboxSectionIdx, setLightboxSectionIdx] = useState<number | null>(null);
  const [lightboxItemIdx, setLightboxItemIdx] = useState<number | null>(null);

  const lightboxItems =
    lightboxSectionIdx !== null ? allItems(productsSections[lightboxSectionIdx]) : [];

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {productsSections.map((s, si) => (
          <Section
            key={s.id}
            section={s}
            index={si}
            onOpen={(item) => {
              setLightboxSectionIdx(si);
              setLightboxItemIdx(allItems(s).indexOf(item));
            }}
          />
        ))}
        <div className="py-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand">Learn with us</p>
          <Link
            to="/training"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Explore Training
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
      <Footer />
      <Lightbox
        items={lightboxItems}
        index={lightboxItemIdx}
        onChange={(i) => {
          if (i === null) {
            setLightboxSectionIdx(null);
            setLightboxItemIdx(null);
          } else {
            setLightboxItemIdx(i);
          }
        }}
      />
    </>
  );
}
