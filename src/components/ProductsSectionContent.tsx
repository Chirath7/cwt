import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { products } from "../data/products";

export default function ProductsSectionContent() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product, i) => (
        <motion.button
          key={product.id}
          type="button"
          onClick={() => navigate(`/products/${product.id}`)}
          aria-label={`View ${product.name} details`}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : Math.min(i * 0.05, 0.35) }}
          whileHover={{ y: reducedMotion ? 0 : -5 }}
          whileTap={{ scale: reducedMotion ? 1 : 0.97 }}
          className="group overflow-hidden rounded-xl border border-slate-200 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-brand/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <img
            src={`/product-buttons/${product.id}.webp`}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover"
          />
        </motion.button>
      ))}
    </div>
  );
}
