import { useState } from "react";
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
      <main className="pt-16">
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
