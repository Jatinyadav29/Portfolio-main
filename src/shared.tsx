import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return;
    }
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 14, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        delay: delay / 1000,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-5 text-center font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted md:text-left">{children}</h2>;
}

export function Chip({
  href,
  onClick,
  icon,
  children,
  download,
}: {
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  children: ReactNode;
  download?: string;
}) {
  const cls =
    "inline-flex items-center gap-1.5 rounded-lg border border-line bg-card px-3 py-1.5 text-[13px] text-fg/85 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] transition-all duration-200 hover:-translate-y-0.5 hover:border-fg/25 hover:text-fg";
  if (onClick)
    return (
      <button type="button" onClick={onClick} className={cls}>
        {icon}
        {children}
      </button>
    );
  return (
    <a href={href} target="_blank" rel="noreferrer" download={download} className={cls}>
      {icon}
      {children}
    </a>
  );
}

export function StackPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-card px-2 py-0.5 font-mono text-[10.5px] text-muted">{children}</span>
  );
}

/** Browser-window style frame for screenshots and demo clips. */
export function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-line bg-chip shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-fg/15" />
        <span className="h-2 w-2 rounded-full bg-fg/15" />
        <span className="h-2 w-2 rounded-full bg-fg/15" />
      </div>
      {children}
    </div>
  );
}
