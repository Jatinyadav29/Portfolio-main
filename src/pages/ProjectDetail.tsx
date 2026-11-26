import type { ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router";
import { ArrowUpRight, GitHubIcon } from "../components/icons";
import { PROJECTS, getProject } from "../data";
import { Reveal, SectionTitle, StackPill } from "../shared";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <Navigate to="/#projects" replace />;

  const index = PROJECTS.indexOf(project);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <main className="px-5 pt-12 md:px-0 md:pt-20">
      {/* header */}
      <Reveal className="text-center md:text-left">
        <Link to="/#projects" className="font-mono text-[11px] text-muted hover:text-fg">
          ← Back to projects
        </Link>

        <div className="mt-8 flex flex-col items-center gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted">{project.tag}</span>
            <h1 className="mt-1.5 text-3xl font-semibold tracking-tight md:text-4xl">{project.name}</h1>
          </div>
          {project.status && (
            <span className="-order-1 flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10.5px] text-emerald-500 md:order-none md:mt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {project.status}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-fg px-3.5 py-1.5 text-[13px] font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              Live site <ArrowUpRight />
            </a>
          )}
          {project.repos.map((r) => (
            <a
              key={r.href}
              href={r.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-card px-3.5 py-1.5 text-[13px] text-fg/85 transition-all hover:-translate-y-0.5 hover:border-fg/25 hover:text-fg"
            >
              <GitHubIcon size={14} /> {r.label}
            </a>
          ))}
        </div>
      </Reveal>

      {/* overview */}
      <Section title="Overview" delay={60}>
        <div className="rounded-xl border border-line bg-card p-5 md:p-6">
          <p className="text-[15px] leading-relaxed text-fg/85">{project.summary}</p>
        </div>
      </Section>

      {/* highlights */}
      <Section title="Highlights" delay={100}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {project.points.map((pt, i) => (
            <li
              key={pt}
              className={`flex gap-3 rounded-xl border border-line bg-card p-4 transition-colors hover:border-fg/20 ${
                project.points.length % 2 === 1 && i === project.points.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <span className="mt-0.5 font-mono text-[11px] text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[14px] leading-relaxed text-fg/80">{pt}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* stack */}
      <Section title="Tech stack" delay={140}>
        <div className="flex flex-wrap justify-center gap-2 rounded-xl border border-line bg-card p-5 md:justify-start">
          {project.stack.map((s) => (
            <StackPill key={s}>{s}</StackPill>
          ))}
        </div>
      </Section>

      {/* prev / next */}
      {PROJECTS.length > 1 && (
        <Reveal delay={180} className="mt-14 grid grid-cols-2 gap-3">
          <PagerLink to={prev.slug} label="← Previous" name={prev.name} />
          <PagerLink to={next.slug} label="Next →" name={next.name} alignEnd />
        </Reveal>
      )}
    </main>
  );
}

function Section({ title, delay, children }: { title: string; delay: number; children: ReactNode }) {
  return (
    <Reveal delay={delay} className="mt-12">
      <SectionTitle>{title}</SectionTitle>
      {children}
    </Reveal>
  );
}

function PagerLink({ to, label, name, alignEnd }: { to: string; label: string; name: string; alignEnd?: boolean }) {
  return (
    <Link
      to={`/projects/${to}`}
      className={`rounded-xl border border-line bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-fg/20 ${
        alignEnd ? "text-right" : "text-left"
      }`}
    >
      <span className="block font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted">{label}</span>
      <span className="mt-1 block truncate text-sm font-medium">{name}</span>
    </Link>
  );
}
