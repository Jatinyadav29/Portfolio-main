import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import CommandPalette, { scrollToSection } from "./components/CommandPalette";
import NavDock from "./components/NavDock";
import { SnowIcon } from "./components/icons";
import { PROFILE } from "./data";
import { useTheme } from "./theme";

export type LayoutCtx = { openPalette: () => void };

export default function RootLayout() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const { snow, toggleSnow } = useTheme();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const t = setTimeout(() => scrollToSection(id), 80);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-bg text-fg transition-colors duration-300">
      <div className="grain-overlay" aria-hidden="true" />

      <div className="mx-auto flex max-w-[860px] gap-6 lg:max-w-[920px]">
        <div className="min-w-0 flex-1 pb-28 lg:pb-16">
          <Outlet context={{ openPalette: () => setPaletteOpen(true) } satisfies LayoutCtx} />

          <footer className="mx-5 mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 font-mono text-[11px] text-muted md:mx-0">
            <span>© {new Date().getFullYear()} {PROFILE.name}</span>
            <span>
              Press{" "}
              <kbd className="rounded border border-line px-1 py-0.5 text-[10px]">⌘K</kbd> to navigate
            </span>
          </footer>
        </div>
        <aside className="lg:w-12 lg:shrink-0">
          <NavDock />
        </aside>
      </div>

      <button
        type="button"
        onClick={toggleSnow}
        aria-label={snow ? "Turn snow off" : "Turn snow on"}
        title={snow ? "Snow: on" : "Snow: off"}
        className={`fixed bottom-5 left-5 z-40 hidden h-10 w-10 items-center justify-center rounded-full border border-line bg-chip shadow-lg transition-all duration-200 hover:scale-110 sm:flex ${
          snow ? "text-accent" : "text-muted"
        }`}
      >
        <SnowIcon />
      </button>

      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </div>
  );
}
