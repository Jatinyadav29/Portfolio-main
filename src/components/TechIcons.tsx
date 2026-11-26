import {
  siTypescript,
  siJavascript,
  siReact,
  siNodedotjs,
  siExpress,
  siMongodb,
  siMongoose,
  siRedis,
  siRedux,
  siTailwindcss,
  siGsap,
  siJsonwebtokens,
  siPostman,
  siGit,
  siGithub,
  siGithubactions,
  siDocker,
  siVercel,
  siRender,
  siFigma,
  siVite,
  siOpenjdk,
  siClaude,
  siGooglegemini,
  siLangchain,
  type SimpleIcon,
} from "simple-icons";

type Tech = { name: string; icon?: SimpleIcon; glyph?: string; bg?: string };

export const STACK: Tech[] = [
  { name: "TypeScript", icon: siTypescript },
  { name: "JavaScript", icon: siJavascript },
  { name: "React", icon: siReact, bg: "#0b7ea3" },
  { name: "Redux", icon: siRedux },
  { name: "Tailwind CSS", icon: siTailwindcss, bg: "#0e8fb5" },
  { name: "GSAP", icon: siGsap, bg: "#0ba84a" },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Express", icon: siExpress },
  { name: "MongoDB", icon: siMongodb, bg: "#2f8a3c" },
  { name: "Mongoose", icon: siMongoose },
  { name: "Redis", icon: siRedis },
  { name: "JWT", icon: siJsonwebtokens },
  { name: "Postman", icon: siPostman },
  { name: "Git", icon: siGit },
  { name: "GitHub", icon: siGithub },
  { name: "GitHub Actions", icon: siGithubactions },
  { name: "Docker", icon: siDocker },
  { name: "Vercel", icon: siVercel },
  { name: "Render", icon: siRender },
  { name: "Vite", icon: siVite },
  { name: "Figma", icon: siFigma, bg: "#a259ff" },
  { name: "Java (DSA)", icon: siOpenjdk, bg: "#c2410c" },
];

export const AI_TOOLS: Tech[] = [
  { name: "Claude", icon: siClaude },
  { name: "Gemini / Antigravity", icon: siGooglegemini, bg: "#4f6ef7" },
  { name: "LangChain · LangGraph", icon: siLangchain, bg: "#1c3c3c" },
  { name: "MCP servers", glyph: "MCP", bg: "#3b3b3b" },
];

function readableOn(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 170 ? "#111" : "#fff";
}

export function TechTile({ tech }: { tech: Tech }) {
  const bg = tech.bg ?? (tech.icon ? `#${tech.icon.hex}` : "#333");
  const fg = readableOn(bg);
  return (
    <span className="group relative inline-flex">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-[10px] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_1px_2px_rgba(0,0,0,0.3)] ring-1 ring-line transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 group-hover:scale-110"
        style={{ background: bg, color: fg }}
      >
        {tech.icon ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d={tech.icon.path} />
          </svg>
        ) : (
          <span className="font-mono text-[10px] font-semibold">{tech.glyph}</span>
        )}
      </span>
      <span className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-line bg-chip px-2 py-1 font-mono text-[10px] text-fg opacity-0 shadow-lg transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
        {tech.name}
      </span>
      <span className="sr-only">{tech.name}</span>
    </span>
  );
}
