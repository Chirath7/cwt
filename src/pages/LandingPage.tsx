import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { sections } from "../data/sections";
import type { SectionData, Infographic } from "../data/sections";
import type { ProductId } from "../data/customsProducts";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Section from "../components/Section";
import Lightbox from "../components/ui/Lightbox";
import Footer from "../components/Footer";
import CustomsProductOverlay from "../components/customs/CustomsProductOverlay";

export const allItems = (s: SectionData): Infographic[] => [s.cover, ...(s.extras ?? [])];

function hashToProductId(hash: string): ProductId | null {
  if (hash === "#arms") return "arms";
  if (hash === "#cdns") return "cdns";
  if (hash === "#dat" || hash.startsWith("#dat/")) return "dat";
  return null;
}

type Overlay =
  | { kind: "none" }
  | { kind: "lightbox"; section: number; index: number };

export default function LandingPage() {
  const [overlay, setOverlay] = useState<Overlay>({ kind: "none" });
  const [productOverlayId, setProductOverlayId] = useState<ProductId | null>(
    () => hashToProductId(window.location.hash),
  );
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

  // Open a product overlay and push its hash so the browser back button works.
  const openProduct = useCallback((id: ProductId) => {
    history.pushState(null, "", `#${id}`);
    setProductOverlayId(id);
  }, []);

  // Close the product overlay and clear its hash from the current history entry.
  const closeProductOverlay = useCallback(() => {
    history.replaceState(null, "", window.location.pathname);
    setProductOverlayId(null);
  }, []);

  // Sync overlay state with browser back / forward navigation.
  useEffect(() => {
    const onPop = () => setProductOverlayId(hashToProductId(window.location.hash));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

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
            onOpenProduct={(id) => openProduct(id as ProductId)}
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

      <AnimatePresence>
        {productOverlayId && (
          <CustomsProductOverlay
            key={productOverlayId}
            productId={productOverlayId}
            onClose={closeProductOverlay}
          />
        )}
      </AnimatePresence>
    </>
  );
}
