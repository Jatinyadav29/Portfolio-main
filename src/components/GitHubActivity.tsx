import { useEffect, useRef, useState } from "react";
import { PROFILE } from "../data";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const LEVEL = ["bg-fg/[0.06]", "bg-accent/30", "bg-accent/55", "bg-accent/80", "bg-accent"];

export default function GitHubActivity() {
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  // On narrow screens the graph overflows — start scrolled to the most recent weeks.
  useEffect(() => {
    const el = scroller.current;
    if (el && days) el.scrollLeft = el.scrollWidth;
  }, [days]);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://github-contributions-api.jogruber.de/v4/${PROFILE.handle}?y=last`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: { total: Record<string, number>; contributions: Day[] }) => {
        setDays(d.contributions);
        setTotal(d.total.lastYear ?? Object.values(d.total)[0] ?? 0);
      })
      .catch((e) => {
        if (e?.name !== "AbortError") setFailed(true);
      });
    return () => ctrl.abort();
  }, []);

  if (failed)
    return (
      <p className="text-sm text-muted">
        Couldn&apos;t load the graph right now —{" "}
        <a className="underline underline-offset-4 hover:text-fg" href={PROFILE.github} target="_blank" rel="noreferrer">
          see it on GitHub
        </a>
        .
      </p>
    );

  // pad to start on Sunday so columns are weeks
  const cells: (Day | null)[] = [];
  if (days?.length) {
    const pad = new Date(days[0].date).getDay();
    for (let i = 0; i < pad; i++) cells.push(null);
    cells.push(...days);
  }
  const weeks = Math.ceil((cells.length || 371) / 7);

  return (
    <div>
      <div ref={scroller} className="overflow-x-auto pb-2">
        <div
          className="mx-auto grid w-max grid-flow-col gap-[3px] md:mx-0"
          style={{ gridTemplateRows: "repeat(7, 10px)", gridTemplateColumns: `repeat(${weeks}, 10px)` }}
        >
          {days
            ? cells.map((d, i) =>
                d ? (
                  <span
                    key={d.date}
                    title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
                    className={`rounded-[2px] ${LEVEL[d.level]}`}
                  />
                ) : (
                  <span key={`pad-${i}`} />
                ),
              )
            : Array.from({ length: 371 }, (_, i) => <span key={i} className="animate-pulse rounded-[2px] bg-fg/5" />)}
        </div>
      </div>
      <div className="mt-3 flex flex-col items-center gap-2 font-mono md:flex-row md:justify-between md:gap-0 text-[11px] text-muted">
        <span>{total !== null ? `${total} contributions in the last year` : "Loading…"}</span>
        <span className="flex items-center gap-1">
          Less
          {LEVEL.map((c) => (
            <span key={c} className={`h-2.5 w-2.5 rounded-[2px] ${c}`} />
          ))}
          More
        </span>
      </div>
    </div>
  );
}
