import { useCallback, useEffect, useState } from 'react';

const THEME_KEY = 'amz-theme';
export const THEMES = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
  { id: 'cyberpunk', label: 'Cyberpunk' },
  { id: 'matrix', label: 'Matrix' },
  { id: 'minimal', label: 'Minimal' },
];

export default function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem(THEME_KEY) || 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback((next) => {
    document.documentElement.classList.add('theme-fade');
    setThemeState(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-fade');
    }, 550);
  }, []);

  return { theme, setTheme };
}
