import { useCallback, useState } from "react";
import { sections } from "./data/sections";
import type { SectionData, Infographic } from "./data/sections";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Lightbox from "./components/Lightbox";
import Footer from "./components/Footer";

export const allItems = (s: SectionData): Infographic[] => [s.cover, ...(s.extras ?? [])];

export default function App() {
  const [open, setOpen] = useState<{ section: number; index: number } | null>(null);
  const change = useCallback(
    (i: number | null) => setOpen((o) => (o && i !== null ? { ...o, index: i } : null)),
    [],
  );

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {sections.map((s, si) => (
          <Section
            key={s.id}
            section={s}
            index={si}
            onOpen={(item) => setOpen({ section: si, index: allItems(s).indexOf(item) })}
          />
        ))}
      </main>
      <Footer />
      <Lightbox
        items={open ? allItems(sections[open.section]) : []}
        index={open ? open.index : null}
        onChange={change}
      />
    </>
  );
}
