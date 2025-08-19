"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');
  const [resolvedTheme, setResolvedTheme] = useState('dark');

  useEffect(() => {
    // Get initial theme from localStorage or default to system
    const stored = localStorage.getItem('theme') || 'system';
    setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        setResolvedTheme(newTheme);
        root.setAttribute('data-theme', newTheme);
      };
      
      handleChange(mediaQuery);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setResolvedTheme(theme);
      root.setAttribute('data-theme', theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <button
        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
        onClick={() => changeTheme('light')}
        aria-label="Light theme"
      >
        <SunIcon />
      </button>
      <button
        className={`theme-btn ${theme === 'system' ? 'active' : ''}`}
        onClick={() => changeTheme('system')}
        aria-label="System theme"
      >
        <DesktopIcon />
      </button>
      <button
        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => changeTheme('dark')}
        aria-label="Dark theme"
      >
        <MoonIcon />
      </button>
    </div>
  );
}
