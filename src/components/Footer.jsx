import { Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { profile } from '../data';

export default function Footer() {
  return (
    <footer className="border-t border-line px-4 py-14 text-center sm:px-8">
      <div className="mb-1 font-display text-lg font-bold text-ink">{profile.name}</div>
      <p className="text-[12.5px] text-muted">
        Software Engineer · UNSW Sydney · Available from December 2026
      </p>

      <div className="mt-6 flex items-center justify-center gap-6">
        <a href={`mailto:${profile.email}`} className="text-mid transition-colors hover:text-accent" aria-label="Email">
          <Mail size={18} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mid transition-colors hover:text-accent"
          aria-label="LinkedIn"
        >
          <LinkedinIcon size={18} />
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-mid transition-colors hover:text-accent"
          aria-label="GitHub"
        >
          <GithubIcon size={18} />
        </a>
        <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="text-mid transition-colors hover:text-accent" aria-label="Phone">
          <Phone size={18} />
        </a>
      </div>

      <p className="mt-8 font-mono text-[10px] tracking-wider text-muted">
        © 2026 {profile.name.toUpperCase()}
      </p>
    </footer>
  );
}
