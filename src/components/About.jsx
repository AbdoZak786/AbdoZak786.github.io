import { motion } from 'framer-motion';
import { profile, education } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent"
      >
        About
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        className="mb-12 font-display text-[clamp(1.7rem,3.5vw,2.3rem)] font-bold tracking-tight text-ink"
      >
        A bit about how I got here
      </motion.h2>

      <div className="grid items-center gap-12 md:grid-cols-[1fr_320px]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <p className="whitespace-pre-line text-[15px] leading-loose text-mid">{profile.bio}</p>

          <div className="mt-8 space-y-3">
            {education.map((e) => (
              <div key={e.degree} className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <div>
                  <div className="font-display text-sm font-semibold text-ink">{e.degree}</div>
                  <div className="text-[13px] text-accent">{e.school}</div>
                </div>
                <span className="whitespace-nowrap font-mono text-[10.5px] text-muted">{e.year}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[280px]"
        >
          <div
            className="absolute inset-0 rounded-[2rem] border border-lineMd"
            style={{
              background:
                'linear-gradient(135deg, var(--accent-soft), transparent 60%), var(--surface)',
            }}
          />
          <div className="absolute inset-6 rounded-[1.4rem] border border-line bg-surface2" />
          <div
            className="absolute inset-12 rounded-full opacity-80 blur-2xl"
            style={{ background: 'var(--accent)' }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-mono text-4xl font-bold text-accent">
            AZ
          </div>
        </motion.div>
      </div>
    </section>
  );
}
