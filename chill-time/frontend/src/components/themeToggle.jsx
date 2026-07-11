import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle theme"
      className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
    >
      {isDark ? <Sun className="text-yellow-400 w-5 h-5" /> : <Moon className="text-slate-700 w-5 h-5" />}
    </button>
  );
}