import { motion, useScroll, useTransform } from "motion/react";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <section id="top" className="dot-bg relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />
      <motion.div style={{ y, opacity }} className="relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-brand"
        >
          Data · Cloud · AI · Optimization
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-7xl lg:text-8xl"
        >
          Creative Web
          <br />
          <span className="bg-gradient-to-r from-brand to-emerald-500 bg-clip-text text-transparent">
            Technologies
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-6 max-w-xl text-lg text-slate-600"
        >
          Transforming Data into Intelligence. Optimizing Business for a Better Tomorrow.
        </motion.p>
        <motion.a
          href="#cwt-2-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 inline-flex flex-col items-center gap-2 text-sm font-medium text-slate-500"
        >
          Scroll to explore
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            ↓
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
