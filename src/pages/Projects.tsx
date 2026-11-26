import { Link } from "react-router";
import { ArrowUpRight } from "../components/icons";
import { PROJECTS } from "../data";
import { Reveal, StackPill } from "../shared";

export default function Projects() {
  return (
    <main className="px-5 pt-16 text-center md:px-0 md:pt-24 md:text-left">
      <Reveal>
        <Link to="/" className="font-mono text-[11px] text-muted hover:text-fg">
          ← Back home
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">Projects</h1>
        <p className="mx-auto mt-2 max-w-lg text-[15px] md:mx-0 text-muted">
          Things I&apos;ve built — from a production backend for a real business to frontend experiments.
        </p>
      </Reveal>

      <div className="mt-12 space-y-4">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 70}>
            <article className="rounded-xl border border-line bg-card p-6">
              <div className="flex flex-col items-center gap-1 md:flex-row md:flex-wrap md:items-baseline md:justify-between md:gap-2">
                <h2 className="text-xl font-semibold tracking-tight">{p.name}</h2>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted">{p.tag}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{p.summary}</p>
              <ul className="mt-4 space-y-1.5 text-[14px] leading-relaxed text-fg/80">
                {p.points.map((pt) => (
                  <li key={pt} className="md:flex md:gap-2">
                    <span className="mr-1.5 text-accent md:mr-0">›</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap justify-center gap-1.5 md:justify-start">
                {p.stack.map((s) => (
                  <StackPill key={s}>{s}</StackPill>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-4 text-[13px] md:justify-start">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-accent">
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
    </main>
  );
}
