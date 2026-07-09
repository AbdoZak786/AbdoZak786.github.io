import { useEffect, useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav({ theme, setTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[150] flex h-[64px] items-center justify-between px-4 transition-all duration-300 sm:px-8 ${
        scrolled
          ? 'border-b border-line bg-bg/85 shadow-soft backdrop-blur-xl'
          : 'border-b border-transparent bg-bg/60 backdrop-blur-md'
      }`}
    >
      <a href="#home" onClick={(e) => handleClick(e, '#home')} className="font-mono text-sm tracking-wide text-accent">
        AMZ.dev
      </a>

      <div className="flex items-center gap-6">
        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className="relative text-[13px] font-medium tracking-wide text-mid transition-colors hover:text-accent after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </div>
    </nav>
  );
}
