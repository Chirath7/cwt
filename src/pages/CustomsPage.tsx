import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { sections } from "../data/sections";
import type { ProductId } from "../data/customsProducts";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import Footer from "../components/Footer";
import CustomsProductOverlay from "../components/customs/CustomsProductOverlay";

function hashToProductId(hash: string): ProductId | null {
  if (hash === "#arms") return "arms";
  if (hash === "#cdns") return "cdns";
  if (hash === "#dat" || hash.startsWith("#dat/")) return "dat";
  return null;
}

const customsSection = sections.find((s) => s.id === "customs")!;

export default function CustomsPage() {
  const [productOverlayId, setProductOverlayId] = useState<ProductId | null>(
    () => hashToProductId(window.location.hash),
  );

  const openProduct = useCallback((id: ProductId) => {
    history.pushState(null, "", `#${id}`);
    setProductOverlayId(id);
  }, []);

  const closeProductOverlay = useCallback(() => {
    history.replaceState(null, "", window.location.pathname);
    setProductOverlayId(null);
  }, []);

  useEffect(() => {
    const onPop = () => setProductOverlayId(hashToProductId(window.location.hash));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Section
          section={customsSection}
          index={0}
          onOpen={() => {}}
          onOpenProduct={(id) => openProduct(id as ProductId)}
        />
        <div className="py-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-brand">Our clients</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Our Customers
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </main>
      <Footer />

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
