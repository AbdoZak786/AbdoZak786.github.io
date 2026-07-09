import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import { extras, profile } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Extras() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent"
      >
        Beyond Engineering
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="mb-10 font-display text-[clamp(1.7rem,3.5vw,2.3rem)] font-bold tracking-tight text-ink"
      >
        Volunteering & leadership
      </motion.h2>

      <div className="mb-14 flex flex-wrap gap-4">
        {extras.map((ex, i) => (
          <motion.div
            key={ex.role}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeUp}
            transition={{ delay: i * 0.08 }}
            className="min-w-[200px] flex-1 rounded-lg border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:border-lineMd hover:shadow-soft"
          >
            <div className="mb-1 font-display text-[0.95rem] font-semibold text-ink">{ex.role}</div>
            <div className="text-[12.5px] text-accent">{ex.org}</div>
            <div className="mt-1.5 font-mono text-[10px] tracking-wide text-muted">{ex.period}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="flex flex-wrap items-center justify-between gap-6 rounded-lg border border-lineMd bg-surface p-8"
      >
        <div>
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-accent">Full Resume</div>
          <h3 className="font-display text-xl font-semibold text-ink">Want the full picture?</h3>
          <p className="mt-1 text-[13px] text-mid">View or download my complete resume — experience, projects, and skills in one document.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-5 py-2.5 text-[13px] font-semibold text-[color:var(--on-accent)] shadow-glow transition-transform hover:-translate-y-0.5"
          >
            View Resume <ExternalLink size={14} />
          </a>
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2 rounded-md border border-lineMd px-5 py-2.5 text-[13px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-surface2"
          >
            Download <Download size={14} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
