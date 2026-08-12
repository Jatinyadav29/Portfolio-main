import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import resumePdf from "./imports/Jatin_yadav_-_Full_Stack_Web_Developer.pdf?url";

gsap.registerPlugin(ScrollTrigger);

export const MENU_LINKS = [
  { label: "Home", index: "01", to: "/" },
  { label: "Projects", index: "02", to: "/projects" },
  { label: "Skills", index: "03", to: "/skills" },
];

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: delay / 1000,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
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

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
      {children}
    </span>
  );
}

export function TextLink({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-paper transition-colors duration-200 hover:text-accent"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100" />
      </span>
      <span className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export function ExternalLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-200 hover:text-accent"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100" />
      </span>
      <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        ↗
      </span>
    </a>
  );
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const EmailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const LinkedInIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" />
  </svg>
);

const GitHubIcon = () => (
  <svg {...iconProps}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);

const DownloadIcon = () => (
  <svg {...iconProps} width={14} height={14}>
    <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" />
  </svg>
);

const CheckIcon = () => (
  <svg {...iconProps}>
    <path d="m5 13 4 4L19 7" />
  </svg>
);

type DockItem = {
  label: string;
  href?: string;
  icon: ReactNode;
  external?: boolean;
  text?: boolean;
  copy?: string;
  download?: string;
};

const DOCK_ITEMS: DockItem[] = [
  {
    label: "Email",
    icon: <EmailIcon />,
    copy: "jatinyadav.jatin.29@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jatinyadav2006/",
    icon: <LinkedInIcon />,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/Jatinyadav29",
    icon: <GitHubIcon />,
    external: true,
  },
  {
    label: "Resume",
    href: resumePdf,
    icon: <DownloadIcon />,
    external: true,
    text: true,
    download: "Jatin-Yadav-Resume.pdf",
  },
];

export function Dock({ dimmed }: { dimmed: boolean }) {
  const [entered, setEntered] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-6 z-40 flex justify-center"
      style={{
        opacity: entered ? (dimmed ? 0.35 : 1) : 0,
        transform: entered ? "translateY(0)" : "translateY(20px)",
        transition:
          "opacity 500ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1)",
        pointerEvents: entered ? "auto" : "none",
      }}
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#161616]/80 px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md">
        {DOCK_ITEMS.map((item, i) => {
          const isCopy = Boolean(item.copy);
          const showCopied = isCopy && copied;

          const inner = (
            <>
              <span
                className="relative flex items-center transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.15]"
                style={{ willChange: "transform" }}
              >
                <span
                  className="flex items-center transition-opacity duration-150"
                  style={{ opacity: showCopied ? 0 : 1 }}
                >
                  {item.icon}
                </span>
                {isCopy && (
                  <span
                    className="absolute inset-0 flex items-center justify-center text-accent transition-opacity duration-150"
                    style={{ opacity: showCopied ? 1 : 0 }}
                  >
                    <CheckIcon />
                  </span>
                )}
              </span>
              {item.text && (
                <span className="font-mono text-[11px] uppercase tracking-[0.15em]">
                  Resume
                </span>
              )}

              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded border border-white/10 bg-[#161616] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                <span
                  className="block transition-opacity duration-150"
                  style={{ opacity: showCopied ? 0.4 : 1 }}
                >
                  {showCopied ? "Copied!" : item.label}
                </span>
              </span>
            </>
          );

          const className =
            "group relative flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-paper transition-colors duration-200 hover:text-accent";

          return (
            <div key={item.label} className="flex items-center">
              {i > 0 && <span className="mx-1 h-4 w-px bg-white/10" />}
              {isCopy ? (
                <button
                  type="button"
                  onClick={() => handleCopy(item.copy!)}
                  aria-label={showCopied ? "Copied!" : item.label}
                  className={className}
                >
                  {inner}
                </button>
              ) : (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  download={item.download}
                  aria-label={item.label}
                  className={className}
                >
                  {inner}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
