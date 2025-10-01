'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'esports' | 'sports';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('esports');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'esports') {
      root.classList.add('dark');
    } else {
      // This part is not really used anymore but kept for potential future use
      root.classList.remove('dark');
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
