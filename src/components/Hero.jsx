import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import ParticleBackground from './ParticleBackground';
import { profile } from '../data';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const scrollToProjects = (e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 sm:px-8 lg:px-16"
    >
      <ParticleBackground />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 550px at 78% 18%, var(--accent-soft), transparent 60%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl"
      >
        <motion.p
          variants={item}
          className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-mid"
        >
          <span className="block h-px w-8 bg-accent" />
          {profile.role} &nbsp;·&nbsp; {profile.location} &nbsp;·&nbsp; {profile.tagline}
        </motion.p>

        <motion.h1
          variants={item}
          className="mb-5 font-display text-[clamp(2.6rem,7vw,5.4rem)] font-bold leading-[1.03] tracking-tight text-ink"
        >
          {profile.name.split(' ')[0]}
          <br />
          <span className="text-accent">{profile.name.split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        <motion.p variants={item} className="mb-9 max-w-xl text-[1.05rem] leading-relaxed text-mid">
          {profile.bio}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-6 py-3 text-[13px] font-semibold text-[color:var(--on-accent)] shadow-glow transition-transform duration-200 hover:-translate-y-0.5"
          >
            See my work
            <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-lineMd px-5 py-3 text-[13px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-surface"
          >
            <LinkedinIcon size={14} /> LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-lineMd px-5 py-3 text-[13px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-surface"
          >
            <GithubIcon size={14} /> GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-lineMd px-5 py-3 text-[13px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-surface"
          >
            <Mail size={14} /> Email
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
