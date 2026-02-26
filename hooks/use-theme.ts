"use client";

import { useCallback, useEffect, useState } from "react";

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

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    setThemeState(getThemeFromStorage());
  }, []);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
    setThemeState(next);
  }, []);

  return { theme, setTheme };
}
