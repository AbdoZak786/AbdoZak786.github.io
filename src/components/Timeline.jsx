import { motion } from 'framer-motion';
import { experience } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Timeline() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-4 py-24 sm:px-8">
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent"
      >
        Work Experience
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="mb-14 font-display text-[clamp(1.7rem,3.5vw,2.3rem)] font-bold tracking-tight text-ink"
      >
        Where I've built things
      </motion.h2>

      <div className="relative pl-8 sm:pl-10">
        <div className="absolute bottom-0 left-[5px] top-0 w-px bg-line sm:left-[7px]" />

        <div className="space-y-12">
          {experience.map((job, i) => (
            <div key={job.title + job.date} className="relative">
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg sm:-left-10"
              />
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ delay: i * 0.15 }}
                className="rounded-lg border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-lineMd hover:shadow-soft"
              >
                <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                  <div className="font-display text-[1.05rem] font-semibold text-ink">{job.title}</div>
                  <span className="whitespace-nowrap font-mono text-[10.5px] text-muted">{job.date}</span>
                </div>
                <div className="mb-4 text-[13px] font-medium text-accent">
                  {job.company}
                  {job.sub && <span className="font-normal text-muted"> · {job.sub}</span>}
                </div>
                <ul className="space-y-2">
                  {job.bullets.map((b, bi) => (
                    <li key={bi} className="relative pl-5 text-[13.5px] leading-relaxed text-mid">
                      <span className="absolute left-0 text-muted">–</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
