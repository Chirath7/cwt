import Wordmark from "./Wordmark";
import { SL_CUSTOMS_LOGO } from "../data/sections";

export default function Footer() {
  return (
    <footer className="bg-navy px-4 py-14 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Wordmark light />
          <p className="text-sm text-white/70">A smarter tomorrow together.</p>
        </div>
        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <p className="text-sm font-medium text-white/90">Get in touch</p>
          <a
            href="tel:+94777256682"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            +94 (77) 725 6682
          </a>
          <a
            href="mailto:Kolitha@CreativeSoftware.com"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            Kolitha@CreativeSoftware.com
          </a>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={SL_CUSTOMS_LOGO}
            alt="Sri Lanka Customs emblem"
            className="h-16 w-auto rounded-lg bg-white p-1.5"
          />
          <p className="text-sm text-white/70">
            Proud partner of
            <br />
            Sri Lanka Customs
          </p>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Creative Web Technologies
      </p>
    </footer>
  );
}
