export default function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex flex-col leading-none">
      <span
        className={`text-2xl font-extrabold italic tracking-tight ${light ? "text-white" : "text-navy"}`}
      >
        CWT
      </span>
      <span
        className={`text-[8px] font-bold tracking-wide ${light ? "text-white/80" : "text-navy"}`}
      >
        CREATIVE WEB TECHNOLOGIES
      </span>
    </span>
  );
}
