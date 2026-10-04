"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";

export type ThemeChoice = "light" | "dark" | "system";

const ThemeContext = createContext<{
  choice: ThemeChoice;
  resolved: "light" | "dark";
  setChoice: (c: ThemeChoice) => void;
} | null>(null);

export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("maise-v2-theme");
    var choice = stored === "light" || stored === "dark" || stored === "system" ? stored : "light";
    var resolved = choice === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : choice;
    document.documentElement.setAttribute("data-theme", resolved);
  } catch (e) {}
})();
`;

const THEME_KEY = "maise-v2-theme";
const themeListeners = new Set<() => void>();
let memoryTheme: ThemeChoice | null = null;

function subscribeTheme(cb: () => void) {
  themeListeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    themeListeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function readTheme(): ThemeChoice {
  if (memoryTheme) return memoryTheme;
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") return stored;
  } catch {}
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const choice = useSyncExternalStore(subscribeTheme, readTheme, () => "light" as ThemeChoice);
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const next = choice === "system" ? (mq.matches ? "dark" : "light") : choice;
      setResolved(next);
      document.documentElement.setAttribute("data-theme", next);
    };
    apply();
    if (choice === "system") {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
  }, [choice]);

  const setChoice = (c: ThemeChoice) => {
    memoryTheme = c;
    try {
      window.localStorage.setItem(THEME_KEY, c);
    } catch {}
    themeListeners.forEach((cb) => cb());
  };

  return (
    <ThemeContext.Provider value={{ choice, resolved, setChoice }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
