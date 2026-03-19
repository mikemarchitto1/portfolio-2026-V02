"use client";

import React, { useCallback, useEffect, useState } from "react";

const THEME_KEY = "theme";
const THEME_TRANSITION_CLASS = "theme-transition";

export type Theme = "light" | "dark" | "color";

const THEMES: Theme[] = ["light", "dark", "color"];

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  THEMES.forEach((t) => html.classList.remove(t));
  html.classList.add(theme);
}

function getThemeFromDOM(): Theme {
  if (typeof document === "undefined") return "light";
  const html = document.documentElement;
  if (html.classList.contains("dark")) return "dark";
  if (html.classList.contains("color")) return "color";
  return "light";
}

function getThemeFromStorage(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "color" || stored === "light")
    return stored;
  return "light";
}

const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize from the <html> class set by the pre-hydration script in `app/layout.tsx`,
  // so the initial render matches the user's saved preference (and avoids flash).
  const [theme, setThemeState] = useState<Theme>(() => getThemeFromDOM());

  useEffect(() => {
    setThemeState(getThemeFromDOM());
  }, []);

  const setTheme = useCallback((next: Theme) => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.add(THEME_TRANSITION_CLASS);
    }
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
    setThemeState(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  const [fallbackTheme, setFallbackTheme] = useState<Theme>("light");

  useEffect(() => {
    if (!ctx) setFallbackTheme(getThemeFromStorage());
  }, [ctx]);

  if (ctx) return ctx;
  const setTheme = useCallback((next: Theme) => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.add(THEME_TRANSITION_CLASS);
    }
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
    setFallbackTheme(next);
  }, []);
  return { theme: fallbackTheme, setTheme };
}
