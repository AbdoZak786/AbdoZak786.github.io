import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { projects } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function ProjectCard({ p, index }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeUp}
      transition={{ delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className={`group flex flex-col rounded-xl border border-line bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_16px_40px_var(--shadow),var(--glow)] ${
        p.featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="mb-4 flex h-32 items-center justify-center rounded-lg border border-line bg-surface2 text-muted">
        <Sparkles size={28} className="opacity-40 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-70" />
      </div>

      <div className="mb-1 flex items-start justify-between gap-3">
        <div className="font-display text-base font-semibold text-ink">{p.name}</div>
        <span className="whitespace-nowrap font-mono text-[10px] text-muted">{p.date}</span>
      </div>
      {p.tagline && (
        <p className="mb-2 font-mono text-[11px] tracking-wide text-muted">{p.tagline}</p>
      )}
      <p className="mb-4 flex-1 text-[13px] leading-relaxed text-mid">{p.desc}</p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded border border-line bg-surface2 px-2.5 py-1 font-mono text-[10px] tracking-wide text-accent transition-transform hover:-translate-y-0.5"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 border-t border-line pt-4">
        <a
          href={p.demo || '#'}
          onClick={(e) => { if (!p.demo) e.preventDefault(); }}
          aria-disabled={!p.demo}
          className={`inline-flex items-center gap-1.5 text-[12.5px] font-medium ${
            p.demo ? 'text-ink hover:text-accent' : 'cursor-not-allowed text-muted'
          }`}
        >
          <ExternalLink size={14} /> Live Demo
        </a>
        <a
          href={p.github || '#'}
          target={p.github ? '_blank' : undefined}
          rel="noopener noreferrer"
          onClick={(e) => { if (!p.github) e.preventDefault(); }}
          aria-disabled={!p.github}
          className={`inline-flex items-center gap-1.5 text-[12.5px] font-medium ${
            p.github ? 'text-ink hover:text-accent' : 'cursor-not-allowed text-muted'
          }`}
        >
          <GithubIcon size={14} /> Source Code
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent"
      >
        Projects
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="mb-10 font-display text-[clamp(1.7rem,3.5vw,2.3rem)] font-bold tracking-tight text-ink"
      >
        My Projects
      </motion.h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard p={p} index={i} key={p.id} />
        ))}
      </div>
    </section>
  );
}
