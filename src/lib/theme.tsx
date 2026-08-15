"use client";

import { createContext, useContext, useEffect, useState } from "react";

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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>("light");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem("maise-v2-theme") as ThemeChoice | null;
    const initial = stored === "light" || stored === "dark" || stored === "system" ? stored : "light";
    setChoiceState(initial);
  }, []);

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
    setChoiceState(c);
    window.localStorage.setItem("maise-v2-theme", c);
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
