interface Props {
  text: string;
}

export default function RoadmapTeaserBanner({ text }: Props) {
  return (
    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-navy to-brand px-3 py-1 text-xs font-semibold text-white shadow-sm ring-1 ring-white/20">
      {text}
    </span>
  );
}
