import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Reveal, SectionLabel, TextLink } from "../shared";

const PROJECTS = [
  {
    name: "Nexus",
    tag: "FULL STACK",
    description:
      "A MERN application with optimized MongoDB queries and secure JWT-based authentication.",
    link: "https://nexus-frontend-lyart.vercel.app/",
  },
  {
    name: "TradeZ",
    tag: "FRONTEND / DASHBOARD",
    description:
      "A dark-themed trading analytics dashboard with GSAP animations and live-market simulation.",
    link: "https://trade-z-frontend.vercel.app/",
  },
];

const SKILLS = [
  "Building performant UIs",
  "API design & authentication",
  "Database architecture",
  "Motion & interaction",
];

export default function Home() {
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap
      .timeline({ defaults: { ease: "power3.out", duration: 0.6 } })
      .fromTo(kickerRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.45",
      )
      .fromTo(
        introRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        "-=0.45",
      )
      .fromTo(
        metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.3",
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <main className="relative mx-auto flex min-h-screen max-w-350 flex-col justify-center overflow-hidden px-6 md:px-12">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[-6vw] top-1/2 -translate-y-1/2 select-none font-display font-light leading-none text-paper"
          style={{
            fontSize: "clamp(24rem, 46vw, 46rem)",
            opacity: 0.05,
            fontOpticalSizing: "auto",
          }}
        >
          J
        </span>

        <span
          aria-hidden="true"
          className="absolute right-6 top-28 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/50 md:right-12 md:top-32"
        >
          Aspiring Backend Developer
        </span>

        <div className="relative z-10 max-w-4xl">
          <p
            ref={kickerRef}
            className="mb-8 font-mono text-[11px] uppercase tracking-[0.35em] text-muted"
            style={{ opacity: 0 }}
          >
            Designer + Developer
          </p>

          <h1
            ref={titleRef}
            className="font-display font-light leading-[0.92] tracking-[-0.02em] text-paper"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 11rem)",
              fontOpticalSizing: "auto",
              opacity: 0,
            }}
          >
            Jatin
            <br />
            <span className="italic text-muted">Yadav</span>
          </h1>

          <p
            ref={introRef}
            className="mt-10 max-w-md text-base leading-relaxed text-muted md:text-lg"
            style={{ opacity: 0 }}
          >
            Crafting considered interfaces and thoughtful systems — where design
            and code meet with intention.
          </p>
        </div>

        <div
          ref={metaRef}
          className="absolute inset-x-6 bottom-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted md:inset-x-12"
          style={{ opacity: 0 }}
        >
          <span>Available for work</span>
          <span className="hidden sm:inline">Development</span>
        </div>
      </main>

      <section className="relative mx-auto max-w-350 border-t border-white/6 px-6 py-24 md:px-12 md:py-32">
        <div className="flex items-start">
          <Reveal>
            <SectionLabel>About</SectionLabel>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <p className="mt-10 max-w-3xl font-body text-[22px] leading-relaxed text-paper/90 md:text-[27px]">
            Full stack developer based in Delhi, building performant MERN
            applications with clean interfaces. I care about the details between
            design and code — from Figma prototypes to production APIs.
          </p>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-350 border-t border-white/6 px-6 py-24 md:px-12 md:py-32">
        <div className="flex items-start">
          <Reveal>
            <SectionLabel>Selected Work</SectionLabel>
          </Reveal>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={100 + i * 80}>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between rounded-sm border border-white/8 bg-white/1.5 p-8 transition-all duration-200 ease-out hover:scale-[1.02] hover:border-accent md:p-10"
              >
                <div className="mb-16 flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted transition-colors duration-200 group-hover:text-accent">
                    {project.tag}
                  </span>
                  <span className="font-mono text-[11px] text-muted transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent">
                    ↗
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-4xl font-light tracking-tight text-paper md:text-5xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={260} className="mt-12">
          <TextLink to="/projects">View all projects</TextLink>
        </Reveal>
      </section>

      <section className="relative mx-auto max-w-350 border-t border-white/6 px-6 py-24 md:px-12 md:py-32">
        <div className="flex items-start">
          <Reveal>
            <SectionLabel>What I Do</SectionLabel>
          </Reveal>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skill, i) => (
            <Reveal key={skill} delay={100 + i * 80}>
              <div className="group h-full border-t border-white/10 pt-6 transition-colors duration-200 hover:border-accent">
                <span className="mb-6 block font-mono text-[10px] text-muted transition-colors duration-200 group-hover:text-accent">
                  0{i + 1}
                </span>
                <p className="pb-4 font-body text-lg font-medium leading-snug text-paper">
                  {skill}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={420} className="mt-12">
          <TextLink to="/skills">View all skills</TextLink>
        </Reveal>
      </section>
    </>
  );
}
