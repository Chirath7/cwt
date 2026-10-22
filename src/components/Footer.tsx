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
