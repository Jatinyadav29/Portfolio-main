import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { PROFILE } from "../data";
import { useTheme } from "../theme";
import {
  ActivityIcon,
  BriefcaseIcon,
  FileIcon,
  FolderIcon,
  GitHubIcon,
  HomeIcon,
  LayersIcon,
  LinkedInIcon,
  MailIcon,
  MoonIcon,
  SearchIcon,
  SnowIcon,
} from "./icons";

type Cmd = { id: string; label: string; group: string; icon: ReactNode; hint?: string; run: () => void };

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { toggleTheme, toggleSnow } = useTheme();

  const go = (id: string) => {
    if (pathname !== "/") navigate(`/#${id}`);
    else scrollToSection(id);
  };
  const open_ = (href: string) => window.open(href, "_blank", "noreferrer");

  const commands: Cmd[] = useMemo(
    () => [
      { id: "home", label: "Home", group: "Navigate", icon: <HomeIcon size={16} />, run: () => go("top") },
      { id: "stack", label: "Tech stack", group: "Navigate", icon: <LayersIcon size={16} />, run: () => go("stack") },
      { id: "exp", label: "Experience", group: "Navigate", icon: <BriefcaseIcon size={16} />, run: () => go("experience") },
      { id: "proj", label: "Projects", group: "Navigate", icon: <FolderIcon size={16} />, run: () => go("projects") },
      { id: "act", label: "GitHub activity", group: "Navigate", icon: <ActivityIcon size={16} />, run: () => go("activity") },
      { id: "all", label: "All project details", group: "Navigate", icon: <FolderIcon size={16} />, run: () => navigate("/projects") },
      { id: "theme", label: "Toggle theme", group: "Actions", icon: <MoonIcon size={16} />, hint: "T", run: toggleTheme },
      { id: "snow", label: "Toggle snow", group: "Actions", icon: <SnowIcon size={16} />, run: toggleSnow },
      {
        id: "email",
        label: "Copy email",
        group: "Actions",
        icon: <MailIcon size={16} />,
        run: () => {
          navigator.clipboard?.writeText(PROFILE.email).catch(() => {});
          setToast("Email copied");
        },
      },
      { id: "gh", label: "GitHub", group: "Links", icon: <GitHubIcon size={16} />, run: () => open_(PROFILE.github) },
      { id: "li", label: "LinkedIn", group: "Links", icon: <LinkedInIcon size={16} />, run: () => open_(PROFILE.linkedin) },
      { id: "cv", label: "Resume (PDF)", group: "Links", icon: <FileIcon size={16} />, run: () => open_(PROFILE.resume) },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname],
  );

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(q.trim().toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  const run = (c?: Cmd) => {
    if (!c) return;
    setOpen(false);
    c.run();
  };

  let lastGroup = "";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 px-4 pt-[15vh] backdrop-blur-sm"
          onMouseDown={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="palette-in w-full max-w-md overflow-hidden rounded-xl border border-line bg-chip shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-line px-4">
              <span className="text-muted">
                <SearchIcon size={16} />
              </span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === "Enter") run(filtered[active]);
                  else if (e.key === "Escape") setOpen(false);
                }}
                placeholder="Type a command or search…"
                className="h-12 w-full bg-transparent text-sm text-fg outline-none focus-visible:outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">ESC</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results</li>}
              {filtered.map((c, i) => {
                const header = c.group !== lastGroup;
                lastGroup = c.group;
                return (
                  <li key={c.id}>
                    {header && (
                      <div className="px-3 pt-2 pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        {c.group}
                      </div>
                    )}
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => run(c)}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        i === active ? "bg-fg/8 text-fg" : "text-fg/80"
                      }`}
                    >
                      <span className="text-muted">{c.icon}</span>
                      {c.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-24 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-line bg-chip px-4 py-2 font-mono text-xs text-fg shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
}
