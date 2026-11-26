import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import CommandPalette, { scrollToSection } from "./components/CommandPalette";
import NavDock from "./components/NavDock";
import SeasonCursor from "./components/SeasonCursor";
import { PROFILE } from "./data";

export type LayoutCtx = { openPalette: () => void };

export default function RootLayout() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { pathname, hash } = useLocation();

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

      <div className="mx-auto flex max-w-[860px] lg:max-w-[920px] lg:gap-6">
        <div className="min-w-0 flex-1 pb-28 lg:pb-16">
          <Outlet context={{ openPalette: () => setPaletteOpen(true) } satisfies LayoutCtx} />

          <footer className="mx-5 mt-20 flex flex-wrap items-center justify-center gap-3 md:justify-between border-t border-line pt-6 font-mono text-[11px] text-muted md:mx-0">
            <span>© {new Date().getFullYear()} {PROFILE.name}</span>
            <span className="hidden md:inline">
              Press{" "}
              <kbd className="rounded border border-line px-1 py-0.5 text-[10px]">⌘K</kbd> to navigate
            </span>
          </footer>
        </div>
        <aside className="lg:w-12 lg:shrink-0">
          <NavDock />
        </aside>
      </div>


      <SeasonCursor />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />
    </div>
  );
}
