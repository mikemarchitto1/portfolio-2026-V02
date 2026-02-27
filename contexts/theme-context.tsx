"use client";

import React, { useCallback, useEffect, useState } from "react";

const THEME_KEY = "theme";

export type Theme = "light" | "dark" | "color";

const THEMES: Theme[] = ["light", "dark", "color"];

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  THEMES.forEach((t) => html.classList.remove(t));
  html.classList.add(theme);
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
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    setThemeState(getThemeFromStorage());
  }, []);

  const setTheme = useCallback((next: Theme) => {
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
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
    setFallbackTheme(next);
  }, []);
  return { theme: fallbackTheme, setTheme };
}
