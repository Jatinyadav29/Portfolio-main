import { useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { PROFILE } from "../data";
import { scrollToSection } from "./CommandPalette";
import { ActivityIcon, BriefcaseIcon, FolderIcon, GitHubIcon, HomeIcon, LayersIcon } from "./icons";

const ITEMS: { id: string; label: string; icon: ReactNode }[] = [
  { id: "top", label: "Home", icon: <HomeIcon /> },
  { id: "stack", label: "Stack", icon: <LayersIcon /> },
  { id: "experience", label: "Experience", icon: <BriefcaseIcon /> },
  { id: "projects", label: "Projects", icon: <FolderIcon /> },
  { id: "activity", label: "Activity", icon: <ActivityIcon /> },
];

export default function NavDock() {
  const [active, setActive] = useState("top");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== "/") return setActive("projects");
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const line = innerHeight * 0.4;
        let current = "top";
        for (const { id } of ITEMS.slice(1)) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top < line) current = id;
        }
        if (innerHeight + scrollY >= document.body.scrollHeight - 4) current = ITEMS[ITEMS.length - 1].id;
        setActive(current);
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const go = (id: string) => (pathname === "/" ? scrollToSection(id) : navigate(`/#${id}`));

  const btn = (isActive: boolean) =>
    `group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 ${
      isActive ? "bg-fg text-bg shadow-md" : "text-muted hover:bg-fg/10 hover:text-fg"
    }`;

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-max items-center gap-1 rounded-full border border-line bg-chip/85 p-1.5 shadow-xl backdrop-blur-md lg:sticky lg:inset-x-auto lg:top-24 lg:bottom-auto lg:mx-0 lg:flex-col"
    >
      {ITEMS.map((item) => (
        <button key={item.id} type="button" aria-label={item.label} onClick={() => go(item.id)} className={btn(active === item.id)}>
          {item.icon}
          <Tip>{item.label}</Tip>
        </button>
      ))}
      <span className="mx-0.5 h-5 w-px bg-line lg:mx-0 lg:my-0.5 lg:h-px lg:w-5" />
      <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={btn(false)}>
        <GitHubIcon />
        <Tip>GitHub</Tip>
      </a>
    </nav>
  );
}

function Tip({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-chip px-2 py-1 font-mono text-[10px] text-fg opacity-0 shadow transition-opacity duration-150 group-hover:opacity-100 lg:top-1/2 lg:left-auto lg:right-12 lg:-translate-x-0 lg:-translate-y-1/2">
      {children}
    </span>
  );
}
