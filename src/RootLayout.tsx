import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Dock, MENU_LINKS } from "./shared";

export default function RootLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-ink text-paper">
      <div className="grain-overlay" aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-350 items-center justify-between px-6 py-6 md:px-12 md:py-8">
          <Link
            to="/"
            className="font-display text-lg tracking-tight text-paper transition-colors duration-300 hover:text-accent"
            style={{ fontOpticalSizing: "auto" }}
          >
            Jatin&nbsp;Yadav
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="group relative z-50 flex h-10 w-10 items-center justify-center"
          >
            <span
              className="absolute h-px w-6 bg-paper transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{
                transform: menuOpen ? "rotate(45deg)" : "translateY(-4px)",
              }}
            />
            <span
              className="absolute h-px w-6 bg-paper transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{
                transform: menuOpen ? "rotate(-45deg)" : "translateY(4px)",
              }}
            />
          </button>
        </div>
      </header>

      <div
        onClick={() => setMenuOpen(false)}
        className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] transition-opacity duration-500"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      />

      <nav
        className="fixed inset-y-0 right-0 z-40 flex w-full flex-col justify-center border-l border-white/5 bg-[#0f0f0f] px-10 sm:w-105 sm:px-16"
        style={{
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 500ms cubic-bezier(0.65,0,0.35,1)",
        }}
      >
        <span className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          Menu
        </span>
        <ul className="flex flex-col gap-2">
          {MENU_LINKS.map((link, i) => (
            <li key={link.label} className="overflow-hidden">
              <Link
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="group flex items-baseline gap-4 py-2"
                style={{
                  transform: menuOpen ? "translateY(0)" : "translateY(120%)",
                  opacity: menuOpen ? 1 : 0,
                  transition: `transform 500ms cubic-bezier(0.22,1,0.36,1) ${
                    menuOpen ? 150 + i * 50 : 0
                  }ms, opacity 500ms ease ${menuOpen ? 150 + i * 50 : 0}ms`,
                }}
              >
                <span className="font-display text-4xl font-light text-paper transition-colors duration-300 group-hover:text-accent">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />

      <footer
        ref={footerRef}
        className="mx-auto flex max-w-350 items-center justify-between border-t border-white/8 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.25em] text-muted md:px-12"
      >
        <span>Jatin Yadav</span>
        <span className="hidden sm:inline">Delhi, IN</span>
        <span>© 2026</span>
      </footer>

      <Dock dimmed={footerVisible} />
    </div>
  );
}
