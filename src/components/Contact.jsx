import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { profile } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function Contact({ onSubmitted }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend wired up yet — this just confirms the form works client-side.
    onSubmitted();
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-24 sm:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="rounded-2xl border border-lineMd p-8 text-center sm:p-14"
        style={{
          background:
            'linear-gradient(135deg, var(--accent-soft), transparent 55%), var(--surface)',
        }}
      >
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">Let's Talk</p>
        <h2 className="mb-4 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-tight text-ink">
          Interested in building <span className="text-accent">something together?</span>
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-[1rem] leading-relaxed text-mid">
          Whether it's AI, backend engineering, or scalable systems — I'd love to chat.
        </p>

        <form onSubmit={handleSubmit} className="mx-auto grid max-w-lg gap-4 text-left">
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-muted">Name</label>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-md border border-line bg-surface2 px-4 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-muted">Email</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-md border border-line bg-surface2 px-4 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-muted">Message</label>
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="What are you working on?"
              className="w-full resize-none rounded-md border border-line bg-surface2 px-4 py-2.5 text-[14px] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
            />
          </div>
          <button
            type="submit"
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-md border border-accent bg-accent px-6 py-3 text-[13px] font-semibold text-[color:var(--on-accent)] shadow-glow transition-transform hover:-translate-y-0.5"
          >
            Send message <Send size={14} />
          </button>
        </form>

        <p className="mt-8 font-mono text-[12px] text-muted">
          Or write to{' '}
          <a href={`mailto:${profile.email}`} className="border-b border-accent/35 text-accent hover:border-accent">
            {profile.email}
          </a>{' '}
          — I reply fast.
        </p>
      </motion.div>
    </section>
  );
}
