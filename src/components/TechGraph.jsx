import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { techNodes, techEdges, techToProjects, CAT_COLORS } from '../data';

const R = 24;
const byName = Object.fromEntries(techNodes.map((n) => [n.name, n]));

/*
  Note on the old flicker bug: the previous version scaled the whole
  node group on hover with a CSS `transform`, which fights with the
  SVG position `transform="translate(x,y)"` on the same element —
  the group would jump, the cursor would fall off it, hover would
  fire again, repeat. Here the position transform lives on the outer
  <g> only; the hover "grow" animates the circle's `r` attribute
  directly (framer-motion animates SVG attributes natively), so the
  hit area only ever grows outward from a fixed center and nothing
  ever jumps.
*/

export default function TechGraph() {
  const wrapRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const projects = hovered ? techToProjects[hovered] || [] : [];
  const flip = pos.x > (wrapRef.current?.clientWidth || 0) * 0.62;

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-lineMd"
    >
      <svg
        viewBox="0 0 960 560"
        role="img"
        aria-label="Graph of technical skills and how they connect"
        className="block h-[360px] w-full sm:h-[440px] lg:h-[520px]"
      >
        {techEdges.map(([a, b], i) => {
          const na = byName[a], nb = byName[b];
          const lit = hovered && (hovered === a || hovered === b);
          return (
            <line
              key={i}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="var(--accent)"
              strokeOpacity={lit ? 0.55 : 0.14}
              strokeWidth={lit ? 1.6 : 1}
              style={{ transition: 'stroke-opacity 0.2s ease, stroke-width 0.2s ease' }}
            />
          );
        })}

        {techNodes.map((n) => {
          const isOn = hovered === n.name;
          return (
            <g key={n.name} transform={`translate(${n.x},${n.y})`}>
              <circle
                r={R + 3}
                fill="none"
                stroke={CAT_COLORS[n.cat]}
                strokeWidth={2.2}
                opacity={0.8}
              />
              {/* invisible larger hit target — stays fixed size, never causes flicker */}
              <circle
                r={R + 14}
                fill="transparent"
                onPointerEnter={() => setHovered(n.name)}
                onPointerMove={handleMove}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(n.name)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                aria-label={n.name}
                style={{ cursor: 'pointer', outline: 'none' }}
              />
              <motion.circle
                r={R}
                fill={isOn ? 'var(--accent-soft)' : 'var(--surface-2)'}
                stroke={isOn ? 'var(--accent)' : 'var(--border-md)'}
                strokeWidth={isOn ? 1.6 : 1.2}
                animate={{ r: isOn ? R + 2 : R }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{ pointerEvents: 'none' }}
              />
              <text
                dy={-(R + 9)}
                textAnchor="middle"
                className="select-none font-mono"
                style={{
                  fontSize: 11,
                  fill: isOn ? 'var(--accent)' : 'rgb(var(--label-rgb))',
                  fontWeight: isOn ? 500 : 400,
                  pointerEvents: 'none',
                  transition: 'fill 0.2s ease',
                }}
              >
                {n.name}
              </text>
            </g>
          );
        })}
      </svg>

      <AnimatePresence>
        {hovered && projects.length > 0 && (
          <motion.div
            key={hovered}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-10 max-w-[200px] rounded-lg border border-accent/35 bg-surface p-3 shadow-soft"
            style={{
              left: flip ? pos.x - 216 : pos.x + 22,
              top: Math.max(8, pos.y - 20),
            }}
          >
            <strong className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-accent">
              {hovered}
            </strong>
            {projects.map((p) => (
              <span key={p} className="block text-[12.5px] leading-relaxed text-ink">
                {p}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-4 border-t border-line px-5 py-3">
        {Object.entries({ Languages: 'lang', Frameworks: 'fw', 'Cloud & DevOps': 'cloud', 'Data & Graph': 'data' }).map(
          ([label, key]) => (
            <span key={key} className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-muted">
              <i className="inline-block h-[9px] w-[9px] rounded-full" style={{ background: CAT_COLORS[key] }} />
              {label}
            </span>
          )
        )}
      </div>
    </div>
  );
}
