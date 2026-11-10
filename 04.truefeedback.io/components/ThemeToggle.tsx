"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch between server and client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-800/40 animate-pulse" />;
  }

  return (
    <div
      className="flex items-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/90 p-0.5 shadow-xs transition-colors"
      role="group"
      aria-label="Theme switcher"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`flex h-7 w-7 items-center justify-center rounded-md text-xs transition-all ${
          theme === "light"
            ? "bg-white text-neutral-950 shadow-xs dark:bg-neutral-800 dark:text-white"
            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        }`}
        title="Light mode"
        aria-label="Set light mode"
      >
        <Sun className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`flex h-7 w-7 items-center justify-center rounded-md text-xs transition-all ${
          theme === "dark"
            ? "bg-white text-neutral-950 shadow-xs dark:bg-neutral-800 dark:text-white"
            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        }`}
        title="Dark mode"
        aria-label="Set dark mode"
      >
        <Moon className="h-3.5 w-3.5" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("system")}
        className={`flex h-7 w-7 items-center justify-center rounded-md text-xs transition-all ${
          theme === "system"
            ? "bg-white text-neutral-950 shadow-xs dark:bg-neutral-800 dark:text-white"
            : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        }`}
        title="System / Device theme (auto-syncs with your browser)"
        aria-label="Set device system mode"
      >
        <Monitor className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

