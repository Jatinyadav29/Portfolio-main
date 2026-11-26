import { useState } from "react";
import { useOutletContext } from "react-router";
import Banner from "../components/Banner";
import GitHubActivity from "../components/GitHubActivity";
import RoleRotator from "../components/RoleRotator";
import { AI_TOOLS, STACK, TechTile } from "../components/TechIcons";
import {
  ArrowUpRight,
  CheckIcon,
  ClockIcon,
  FileIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MoonIcon,
  PinIcon,
  SunIcon,
} from "../components/icons";
import { EXPERIENCE, LEARNING, PROFILE, PROJECTS } from "../data";
import type { LayoutCtx } from "../RootLayout";
import { Chip, Reveal, SectionTitle, StackPill } from "../shared";
import { useClock, useTheme } from "../theme";

export default function Home() {
  const { openPalette } = useOutletContext<LayoutCtx>();
  const { theme, toggleTheme } = useTheme();
  const { h12 } = useClock(PROFILE.timeZone);
  const [copied, setCopied] = useState(false);
  const [avatarOk, setAvatarOk] = useState(true);

  const copyEmail = () => {
    navigator.clipboard?.writeText(PROFILE.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main id="top" className="scroll-mt-4">
      <div className="md:pt-8">
        <Banner />
      </div>

      <div className="px-5 md:px-0">
        {/* profile row */}
        <Reveal className="relative -mt-12 flex flex-col items-center gap-3 text-center md:-mt-10 md:flex-row md:items-end md:justify-between md:gap-4 md:text-left">
          <span className="font-hand pointer-events-none absolute -top-2 -left-36 hidden -rotate-6 text-xl text-muted xl:block">
            {PROFILE.note} ❄
            <svg className="mt-0.5 ml-3" width="90" height="10" viewBox="0 0 90 10" aria-hidden="true">
              <path d="M2 7 C 25 2, 55 2, 88 6" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>

          <div className="flex flex-col items-center gap-3 md:flex-row md:items-end md:gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-bg bg-chip shadow-xl md:h-28 md:w-28">
              {avatarOk ? (
                <img
                  src="/profile.png"
                  alt={PROFILE.name}
                  onError={() => setAvatarOk(false)}
                  className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-linear-to-br from-fg/15 to-fg/5 font-hand text-4xl text-fg">
                  JY
                </span>
              )}
            </div>
            <div className="md:pb-1">
              <h1 className="text-2xl font-semibold tracking-tight md:text-[28px]">{PROFILE.name}</h1>
              <p className="mt-0.5 text-[15px] text-muted">
                <RoleRotator roles={PROFILE.roles} />
              </p>
            </div>
          </div>

          <div className="absolute top-14 right-0 flex shrink-0 items-center gap-2 md:static md:pb-2">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Open command palette"
              className="hidden h-9 items-center gap-1 rounded-lg border border-line bg-fg px-2.5 font-mono text-[11px] text-bg shadow-md transition-transform hover:-translate-y-0.5 sm:flex"
            >
              ⌘ K
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-fg text-bg shadow-md transition-transform hover:-translate-y-0.5 hover:rotate-12"
            >
              {theme === "dark" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
            </button>
          </div>
        </Reveal>

        <Reveal delay={60} className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-mono md:justify-start text-[11.5px] text-muted">
          <span className="flex items-center gap-1">
            <PinIcon /> {PROFILE.location}
          </span>
          <span className="flex items-center gap-1 tabular-nums">
            <ClockIcon /> {h12} IST
          </span>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to internships & SDE roles
          </span>
        </Reveal>

        {/* about */}
        <Reveal delay={120}>
          <ul className="mt-8 space-y-2.5 text-center text-[15px] leading-relaxed text-muted md:text-left">
            {[
              <>
                Building reliable <b>full-stack MERN apps</b> and <b>backend systems</b> that hold up with real users.
              </>,
              <>
                Working with <b>TypeScript, Redis caching and MongoDB aggregation pipelines</b> — currently shipping{" "}
                <b>Nexus</b> for a real gaming café.
              </>,
              <>
                Exploring <b>GenAI — RAG, LangGraph, MCP servers</b> — and levelling up on <b>Docker & CI/CD</b>.
              </>,
              <>
                Based in <b>Delhi, India</b> · BCA ’26, GGSIPU.
              </>,
            ].map((line, i) => (
              <li key={i} className="md:flex md:gap-3 [&_b]:font-medium [&_b]:text-fg">
                <span className="mt-[11px] hidden h-1 w-1 md:block shrink-0 rounded-full bg-muted/60" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* socials */}
        <Reveal delay={160} className="mt-8">
          <p className="mb-3 text-center text-sm text-muted md:text-left">
            Here are my <b className="font-medium text-fg">socials</b>
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:justify-start">
            <Chip href={PROFILE.github} icon={<GitHubIcon size={15} />}>
              GitHub
            </Chip>
            <Chip href={PROFILE.linkedin} icon={<LinkedInIcon size={15} />}>
              LinkedIn
            </Chip>
            <Chip onClick={copyEmail} icon={copied ? <CheckIcon size={15} /> : <MailIcon size={15} />}>
              {copied ? "Copied!" : "Email"}
            </Chip>
            <Chip href={PROFILE.resume} download="Jatin-Yadav-Resume.pdf" icon={<FileIcon size={15} />}>
              Resume
            </Chip>
          </div>
        </Reveal>

        {/* stack */}
        <section id="stack" className="mt-14 scroll-mt-8">
          <Reveal>
            <SectionTitle>Tech stack</SectionTitle>
            <div className="flex flex-wrap justify-center gap-2.5 md:justify-start">
              {STACK.map((t) => (
                <TechTile key={t.name} tech={t} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={80} className="mt-8">
            <SectionTitle>AI tools</SectionTitle>
            <div className="flex flex-wrap justify-center gap-2.5 md:justify-start">
              {AI_TOOLS.map((t) => (
                <TechTile key={t.name} tech={t} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={120} className="mt-8">
            <SectionTitle>Currently learning</SectionTitle>
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {LEARNING.map((l) => (
                <span
                  key={l}
                  className="rounded-full border border-dashed border-fg/20 px-3 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-fg"
                >
                  {l}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        {/* experience */}
        <section id="experience" className="mt-16 scroll-mt-8">
          <Reveal>
            <SectionTitle>Experience & education</SectionTitle>
          </Reveal>
          <ol className="relative border-line md:ml-1 md:border-l">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.role} delay={i * 80}>
                <li className="relative pb-8 text-center last:pb-0 md:pl-6 md:text-left">
                  <span className="absolute top-1.5 hidden md:block -left-[5px] h-2.5 w-2.5 rounded-full border-2 border-bg bg-fg/70" />
                  <div className="flex flex-col items-center gap-1 md:flex-row md:flex-wrap md:items-baseline md:justify-between md:gap-2">
                    <h3 className="font-medium">
                      {e.role} <span className="text-muted">· {e.org}</span>
                    </h3>
                    <span className="font-mono text-[11px] text-muted">{e.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{e.detail}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* projects */}
        <section id="projects" className="mt-16 scroll-mt-8">
          <Reveal>
            <div className="flex flex-col items-center md:flex-row md:items-baseline md:justify-between">
              <SectionTitle>Projects</SectionTitle>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 70} className={p.featured ? "sm:col-span-2" : ""}>
                <article className="group relative flex h-full flex-col rounded-xl border border-line bg-card p-5 text-center md:text-left transition-all duration-300 hover:-translate-y-1 hover:border-fg/20 hover:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)]">
                  <div className="flex flex-col items-center gap-2 md:flex-row md:items-start md:justify-between md:gap-3">
                    <div>
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted">{p.tag}</span>
                      <h3 className="mt-1 text-lg font-semibold tracking-tight">{p.name}</h3>
                    </div>
                    {p.status && (
                      <span className="-order-1 flex items-center gap-1.5 rounded-full border border-emerald-500/30 md:order-none bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {p.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                  {p.featured && (
                    <ul className="mt-3 space-y-1.5 text-[13.5px] leading-relaxed text-fg/80">
                      {p.points.map((pt) => (
                        <li key={pt} className="md:flex md:gap-2">
                          <span className="mr-1.5 text-accent md:mr-0">›</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-4 flex flex-wrap justify-center gap-1.5 md:justify-start">
                    {p.stack.map((s) => (
                      <StackPill key={s}>{s}</StackPill>
                    ))}
                  </div>
                  <div className="mt-auto flex flex-wrap justify-center gap-4 pt-5 text-[13px] md:justify-start">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-fg hover:text-accent">
                        Live <ArrowUpRight />
                      </a>
                    )}
                    {p.repos.map((r) => (
                      <a key={r.href} href={r.href} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-muted hover:text-fg">
                        {r.label} <ArrowUpRight />
                      </a>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* activity */}
        <section id="activity" className="mt-16 scroll-mt-8">
          <Reveal>
            <SectionTitle>GitHub activity</SectionTitle>
            <GitHubActivity />
          </Reveal>
        </section>

        {/* contact */}
        <Reveal className="mt-16">
          <div className="rounded-2xl border border-line bg-card p-6 text-center md:p-8">
            <p className="font-hand text-2xl text-muted">let&apos;s build something</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Looking for internships and junior backend / full-stack roles. The fastest way to reach me is email.
            </p>
            <button
              type="button"
              onClick={copyEmail}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              {copied ? <CheckIcon size={15} /> : <MailIcon size={15} />}
              {copied ? "Copied!" : PROFILE.email}
            </button>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
