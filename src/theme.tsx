import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light";
type Ctx = {
  theme: Theme;
  toggleTheme: () => void;
  snow: boolean;
  toggleSnow: () => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

function read<T extends string>(key: string, fallback: T): T {
  try {
    return (localStorage.getItem(key) as T) || fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains("light") ? "light" : "dark",
  );
  const [snow, setSnow] = useState(() => read("snow", "on") === "on");

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    write("theme", theme);
  }, [theme]);

  useEffect(() => write("snow", snow ? "on" : "off"), [snow]);

  const toggleTheme = useCallback(() => {
    const apply = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (doc.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(apply);
    } else apply();
  }, []);
  const toggleSnow = useCallback(() => setSnow((s) => !s), []);

  return (
    <ThemeCtx.Provider value={{ theme, toggleTheme, snow, toggleSnow }}>{children}</ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}

export function useClock(timeZone: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { timeZone, ...opts }).format(now);
  return {
    h24: fmt({ hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }),
    h12: new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(now),
  };
}
