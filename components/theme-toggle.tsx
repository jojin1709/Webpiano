"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./theme-provider";

const ORDER = ["dark", "light", "system"] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const next = () => {
    const idx = ORDER.indexOf(theme);
    setTheme(ORDER[(idx + 1) % ORDER.length]);
  };

  return (
    <button
      onClick={next}
      aria-label={`Switch theme (current: ${theme})`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-stage-700 dark:text-ivory-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
    >
      {theme === "dark" && <Moon className="h-4 w-4" />}
      {theme === "light" && <Sun className="h-4 w-4" />}
      {theme === "system" && <Monitor className="h-4 w-4" />}
    </button>
  );
}
