import { useState } from "react";
import { sections } from "../data/sections";
import type { SectionData, Infographic } from "../data/sections";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import Lightbox from "../components/ui/Lightbox";
import Footer from "../components/Footer";

const trainingSection = sections.find((s) => s.id === "training")!;
const allItems = (s: SectionData): Infographic[] => [s.cover, ...(s.extras ?? [])];

export default function TrainingPage() {
  const [lightboxItemIdx, setLightboxItemIdx] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Section
          section={trainingSection}
          index={0}
          onOpen={(item) => setLightboxItemIdx(allItems(trainingSection).indexOf(item))}
        />
      </main>
      <Footer />
      <Lightbox
        items={allItems(trainingSection)}
        index={lightboxItemIdx}
        onChange={(i) => setLightboxItemIdx(i)}
      />
    </>
  );
}
