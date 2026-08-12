import { Reveal, SectionLabel } from "../shared";

const GROUPS = [
  {
    index: "01",
    title: "Frontend",
    items: ["React", "TypeScript", "React Router", "Tailwind CSS", "Redux"],
  },
  {
    index: "02",
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "JWT & bcrypt auth", "MongoDB"],
  },
  {
    index: "03",
    title: "Motion & Interaction",
    items: ["GSAP", "Scroll-based animation", "Micro-interactions"],
  },
  {
    index: "04",
    title: "Tools & Workflow",
    items: ["Figma — UI/UX", "Git & GitHub", "CI/CD", "Vite"],
  },
];

export default function Skills() {
  return (
    <main className="mx-auto max-w-350 px-6 pt-40 pb-28 md:px-12 md:pt-52 md:pb-40">
      <header>
        <Reveal>
          <SectionLabel>Skills</SectionLabel>
        </Reveal>
        <Reveal delay={100}>
          <h1
            className="mt-8 font-display font-light leading-[0.95] tracking-[-0.02em] text-paper"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontOpticalSizing: "auto",
            }}
          >
            What I Work With
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 max-w-lg font-body text-base leading-relaxed text-muted md:text-lg">
            The tools and technologies behind the things I build — from
            interface to infrastructure.
          </p>
        </Reveal>
      </header>

      <div className="mt-28 grid grid-cols-1 gap-x-16 gap-y-16 md:mt-40 md:grid-cols-2">
        {GROUPS.map((group, i) => (
          <Reveal key={group.title} delay={i * 90}>
            <div className="border-t border-white/10 pt-8">
              <div className="flex items-start justify-between">
                <h2 className="font-display text-3xl font-light tracking-tight text-paper md:text-4xl">
                  {group.title}
                </h2>
              </div>
              <ul className="mt-8 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
