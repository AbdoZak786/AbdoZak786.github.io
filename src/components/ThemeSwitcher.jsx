import { THEMES } from '../hooks/useTheme';

const DOT_GRADIENTS = {
  light: 'linear-gradient(135deg,#FAF9F6 50%,#6E1E1E 50%)',
  dark: 'linear-gradient(135deg,#131218 50%,#A796FF 50%)',
  cyberpunk: 'linear-gradient(135deg,#151027 50%,#FF3E8A 50%)',
  matrix: 'linear-gradient(135deg,#0A130C 50%,#2FE06B 50%)',
  minimal: 'linear-gradient(135deg,#FFFFFF 50%,#111111 50%)',
};

export default function ThemeSwitcher({ theme, setTheme }) {
  return (
    <div
      role="group"
      aria-label="Colour theme"
      className="flex items-center gap-[7px] rounded-full border border-line bg-surface px-[9px] py-[5px]"
    >
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          aria-label={`${t.label} theme`}
          onClick={() => setTheme(t.id)}
          className={`group relative h-[15px] w-[15px] rounded-full border border-black/15 transition-transform duration-200 hover:scale-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
            theme === t.id ? 'ring-2 ring-accent ring-offset-2 ring-offset-bg' : ''
          }`}
          style={{ background: DOT_GRADIENTS[t.id] }}
        >
          <span className="pointer-events-none absolute left-1/2 top-[calc(100%+9px)] -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-[3px] font-mono text-[9px] tracking-wider text-bg opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            {t.label}
          </span>
        </button>
      ))}
    </div>
  );
}
