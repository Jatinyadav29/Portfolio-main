import { useEffect, useRef } from "react";

export type Season = "winter" | "summer" | "monsoon" | "autumn";

/**
 * Indian seasons by month:
 * Winter Nov–Feb · Summer Mar–May · Monsoon Jun–Sep · Autumn Oct
 */
export function currentSeason(date = new Date()): Season {
  const m = date.getMonth(); // 0 = Jan … 11 = Dec
  if (m >= 10 || m <= 1) return "winter"; // Nov, Dec, Jan, Feb
  if (m <= 4) return "summer"; // Mar, Apr, May
  if (m <= 8) return "monsoon"; // Jun, Jul, Aug, Sep
  return "autumn"; // Oct
}

const HOVER_TARGETS = "a, button, [role='button'], summary, label, select";

/**
 * Seasonal animated cursor. All visuals and animation live in index.css
 * (.season-cursor); this component only moves the element and toggles state.
 * Pass `season` to force one, otherwise it follows the calendar.
 */
export default function SeasonCursor({ season }: { season?: Season }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch devices have no cursor — skip entirely.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    const root = document.documentElement;
    root.classList.add("has-season-cursor");

    let x = 0;
    let y = 0;
    let frame = 0;

    const render = () => {
      frame = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.dataset.visible = "true";
      if (!frame) frame = requestAnimationFrame(render); // max one update per frame
    };
    const onOver = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest?.(HOVER_TARGETS);
      el.dataset.hover = hit ? "true" : "false";
    };
    const onLeave = () => (el.dataset.visible = "false");
    const onDown = () => (el.dataset.down = "true");
    const onUp = () => (el.dataset.down = "false");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-season-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="season-cursor"
      data-season={season ?? currentSeason()}
      data-visible="false"
      aria-hidden="true"
    >
      <span className="season-cursor__icon" />
    </div>
  );
}
