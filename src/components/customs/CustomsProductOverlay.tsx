import { useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { customsProducts, type ProductId } from "../../data/customsProducts";
import CustomsProductPage from "../../pages/CustomsProductPage";

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface Props {
  productId: ProductId;
  onClose: () => void;
}

export default function CustomsProductOverlay({ productId, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<Element | null>(null);

  const product = customsProducts[productId];

  // Focus: save caller, move into overlay, restore on unmount
  useEffect(() => {
    prevFocusRef.current = document.activeElement;
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      (prevFocusRef.current as HTMLElement | null)?.focus();
    };
  }, []);

  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Escape + focus trap
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${product.fullName} — product details`}
      className="fixed inset-0 z-50 flex flex-col bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Sticky header with close button */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-sm">
        <span className="text-sm font-semibold text-navy">
          Customs — {product.fullName}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={`Close ${product.name} details`}
          className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Close ✕
        </button>
      </div>

      {/* Scrollable product content */}
      <div className="flex-1 overflow-y-auto">
        <CustomsProductPage productId={productId} isOverlay />
      </div>
    </motion.div>
  );
}
