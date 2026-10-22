import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface Props {
  open: boolean;
  onClose: () => void;
}

const INTEREST_OPTIONS = [
  "General enquiry",
  "ARMS",
  "DAT",
  "CDNS",
  "Something else",
] as const;

const BULLETS = [
  "Response within 24 hours",
  "Free discovery call to scope your requirements",
  "Direct line to our Customs solutions team",
];

export default function ContactModal({ open, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<Element | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("General enquiry");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Focus: save caller on open, restore on close; reset form on close
  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement;
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      (prevFocusRef.current as HTMLElement | null)?.focus();
      setName(""); setEmail(""); setInterest("General enquiry");
      setMessage(""); setErrors({}); setSubmitted(false);
    }
  }, [open]);

  // Scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Escape + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
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
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function validate() {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Full name is required.";
    if (!email.trim()) errs.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email.";
    if (!message.trim()) errs.message = "Message is required.";
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});

    const subject = interest === "General enquiry"
      ? "Website enquiry"
      : `Website enquiry — ${interest}`;

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Interest: ${interest}`,
      "",
      message,
    ].join("\n");

    window.location.href =
      `mailto:Kolitha@CreativeSoftware.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  const canSubmit = name.trim() && email.trim() && message.trim();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Contact us"
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col md:flex-row"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button — top-right of the card, adapts colour across the split bg */}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close contact modal"
              className="absolute right-4 top-4 z-20 flex size-11 items-center justify-center rounded-full
                text-white/70 hover:bg-white/15 hover:text-white
                md:text-slate-400 md:hover:bg-slate-100 md:hover:text-slate-600
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              ✕
            </button>

            {/* ── Left branding panel ── */}
            <div className="bg-navy flex flex-col justify-between px-8 py-10 md:px-10 md:w-[42%] text-white shrink-0">
              <div>
                {/* Decorative quotation mark */}
                <div
                  className="font-serif text-[5rem] leading-none text-white/10 select-none -mt-4 -ml-2 mb-2 sm:text-[7rem]"
                  aria-hidden="true"
                >
                  "
                </div>

                <h2 className="text-xl font-extrabold tracking-tight leading-snug mb-3">
                  Creative Web Technologies
                </h2>

                <p className="text-sm italic text-white/65 leading-relaxed mb-7">
                  Partnering with Customs administrations on intelligent, data-driven digital solutions.
                </p>

                <hr className="border-white/15 mb-7" />

                <ul className="space-y-4">
                  {BULLETS.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-white/80 leading-snug">
                      <span className="mt-0.5 shrink-0 text-brand" aria-hidden="true">✦</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <hr className="border-white/15 mt-8 mb-6" />
                <div className="space-y-3 text-sm">
                  <a
                    href="tel:+94777256682"
                    className="flex items-center gap-2.5 text-white/75 hover:text-white transition-colors"
                  >
                    <svg className="size-4 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.275.53l-.97 1.662a1.125 1.125 0 01-1.337.436A13.5 13.5 0 016.18 9.212a1.125 1.125 0 01.436-1.337l1.663-.97a1.125 1.125 0 00.53-1.275L7.703 3.105A1.125 1.125 0 006.61 2.25H5.25A2.25 2.25 0 003 4.5v.75a2.25 2.25 0 00-.75 1.5v.75z" />
                    </svg>
                    +94 (77) 725 6682
                  </a>
                  <a
                    href="mailto:Kolitha@CreativeSoftware.com"
                    className="flex items-center gap-2.5 text-white/75 hover:text-white transition-colors break-all"
                  >
                    <svg className="size-4 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Kolitha@CreativeSoftware.com
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right form panel ── */}
            <div className="bg-white flex-1 px-8 py-10 md:px-10">
              <h3 className="text-2xl font-extrabold tracking-tight text-navy mb-2">
                Let's work together
              </h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Tell us about your requirements and we'll get back to you shortly.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <svg className="size-12 text-brand" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <p className="text-base font-semibold text-navy">Opening your email client…</p>
                  <p className="text-sm text-slate-500 max-w-xs">
                    Your message has been pre-filled — send it from your email app to complete the enquiry.
                    If nothing opened, email us directly at{" "}
                    <a href="mailto:Kolitha@CreativeSoftware.com" className="text-brand hover:underline">
                      Kolitha@CreativeSoftware.com
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Full Name <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: undefined })); }}
                      placeholder="Your full name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      className={`w-full rounded-lg border px-3.5 py-2.5 text-sm bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand transition ${errors.name ? "border-red-500" : "border-slate-700 hover:border-slate-600"}`}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-500" role="alert">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Email Address <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })); }}
                      placeholder="you@example.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      className={`w-full rounded-lg border px-3.5 py-2.5 text-sm bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand transition ${errors.email ? "border-red-500" : "border-slate-700 hover:border-slate-600"}`}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-500" role="alert">{errors.email}</p>}
                  </div>

                  {/* Interest */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                      I'm interested in
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 hover:border-slate-600 px-3.5 py-2.5 text-sm bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-brand transition"
                    >
                      {INTEREST_OPTIONS.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Message <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors((p) => ({ ...p, message: undefined })); }}
                      rows={4}
                      placeholder="Tell us about your project or requirements…"
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      className={`w-full rounded-lg border px-3.5 py-2.5 text-sm bg-slate-900 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand transition resize-none ${errors.message ? "border-red-500" : "border-slate-700 hover:border-slate-600"}`}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-500" role="alert">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full rounded-lg bg-white border border-slate-200 px-4 py-3 text-sm font-semibold text-navy shadow-sm transition hover:bg-slate-50 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
