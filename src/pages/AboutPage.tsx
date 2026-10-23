import { useState } from "react";
import { sections } from "../data/sections";
import type { SectionData, Infographic } from "../data/sections";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import Lightbox from "../components/ui/Lightbox";
import Footer from "../components/Footer";

const aboutSections = sections.filter((s) => s.id === "cwt-2-0" || s.id === "crew");
const allItems = (s: SectionData): Infographic[] => [s.cover, ...(s.extras ?? [])];

export default function AboutPage() {
  const [lightboxSectionIdx, setLightboxSectionIdx] = useState<number | null>(null);
  const [lightboxItemIdx, setLightboxItemIdx] = useState<number | null>(null);

  const lightboxItems =
    lightboxSectionIdx !== null ? allItems(aboutSections[lightboxSectionIdx]) : [];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {aboutSections.map((s, si) => (
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
