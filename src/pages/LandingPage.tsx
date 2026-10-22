import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { sections } from "../data/sections";
import type { SectionData, Infographic } from "../data/sections";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Section from "../components/Section";
import Lightbox from "../components/Lightbox";
import Footer from "../components/Footer";

export const allItems = (s: SectionData): Infographic[] => [s.cover, ...(s.extras ?? [])];

type Overlay =
  | { kind: "none" }
  | { kind: "lightbox"; section: number; index: number };

export default function LandingPage() {
  const [overlay, setOverlay] = useState<Overlay>({ kind: "none" });
  const navigate = useNavigate();

  const closeOverlay = useCallback(() => setOverlay({ kind: "none" }), []);

  const changeLightbox = useCallback(
    (i: number | null) =>
      setOverlay((o) =>
        i === null
          ? { kind: "none" }
          : o.kind === "lightbox"
          ? { ...o, index: i }
          : o,
      ),
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
            onOpen={(item) => {
              // Items with a route navigate to the product page
              if (item.route) {
                navigate(item.route);
                return;
              }
              setOverlay({ kind: "lightbox", section: si, index: allItems(s).indexOf(item) });
            }}
          />
        ))}
      </main>
      <Footer />

      <Lightbox
        items={overlay.kind === "lightbox" ? allItems(sections[overlay.section]) : []}
        index={overlay.kind === "lightbox" ? overlay.index : null}
        onChange={changeLightbox}
      />
    </>
  );
}
