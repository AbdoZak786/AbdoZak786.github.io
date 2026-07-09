import { profile } from '../data';

export default function StatsStrip() {
  return (
    <div className="flex flex-wrap border-y border-line bg-surface">
      {profile.stats.map((s, i) => (
        <div
          key={i}
          className="flex-1 basis-1/2 border-r border-line px-4 py-6 text-center transition-colors last:border-r-0 hover:bg-surface2 sm:basis-0 sm:px-8"
        >
          <span className="block font-display text-[1.7rem] font-bold text-accent">{s.num}</span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
