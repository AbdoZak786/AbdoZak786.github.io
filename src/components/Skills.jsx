import { motion } from 'framer-motion';
import { skills, CAT_COLORS } from '../data';
import TechGraph from './TechGraph';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeUp}
      transition={{ delay: index * 0.06 }}
      className="rounded-lg border border-line bg-surface p-4 transition-colors hover:border-lineMd"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: CAT_COLORS[skill.cat] }}
          />
          {skill.name}
        </span>
        <span className="font-mono text-[11px] text-muted">{skill.level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
          className="h-full rounded-full"
          style={{ background: CAT_COLORS[skill.cat] }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent"
      >
        Technical Skills
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="mb-10 font-display text-[clamp(1.7rem,3.5vw,2.3rem)] font-bold tracking-tight text-ink"
      >
        Proficiency at a glance
      </motion.h2>

      <div className="mb-16 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {skills.map((s, i) => (
          <SkillBar skill={s} index={i} key={s.name} />
        ))}
      </div>

      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent"
      >
        The Stack, Connected
      </motion.p>
      <motion.h3
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="mb-2 font-display text-xl font-bold text-ink"
      >
        My toolkit, as a graph
      </motion.h3>
      <p className="mb-6 font-mono text-[11px] tracking-wide text-muted">
        Hover a node to see which projects use it.
      </p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <TechGraph />
      </motion.div>
    </section>
  );
}
