import { useEffect, useRef } from "react";
import { useClock, useTheme } from "../theme";
import { PROFILE } from "../data";

/** Deterministic RNG so the skyline is the same on every visit. */
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const PALETTE = {
  dark: {
    sky: ["#07070d", "#2a0a12", "#7a1616", "#d9481c"],
    moon: "#f4ead8",
    moonGlow: "rgba(255,170,120,0.35)",
    layers: ["#3a0d10", "#1c0709", "#090304"],
    window: ["#ffb347", "#ff7a3d", "#ffd27a"],
    snow: "rgba(255,240,230,",
    haze: "rgba(255,90,40,0.18)",
  },
  light: {
    sky: ["#dfe8f3", "#eef1f6", "#f7efe6", "#f9dfcf"],
    moon: "#ffffff",
    moonGlow: "rgba(255,255,255,0.8)",
    layers: ["#c9d3e0", "#a9b6c8", "#7f8ea5"],
    window: ["#fff6da", "#ffe6b0", "#ffffff"],
    snow: "rgba(120,140,170,",
    haze: "rgba(255,255,255,0.35)",
  },
};

type Flake = { x: number; y: number; r: number; v: number; d: number };

export default function Banner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, snow } = useTheme();
  const { h24 } = useClock(PROFILE.timeZone);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const p = PALETTE[theme];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let W = 0,
      H = 0;
    let scene: HTMLCanvasElement | null = null;
    let flakes: Flake[] = [];

    const drawScene = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      scene = document.createElement("canvas");
      scene.width = W * dpr;
      scene.height = H * dpr;
      const s = scene.getContext("2d")!;
      s.setTransform(dpr, 0, 0, dpr, 0, 0);

      const g = s.createLinearGradient(0, 0, 0, H);
      p.sky.forEach((c, i) => g.addColorStop(i / (p.sky.length - 1), c));
      s.fillStyle = g;
      s.fillRect(0, 0, W, H);

      // moon
      const mx = W * 0.58,
        my = H * 0.4,
        mr = H * 0.3;
      const glow = s.createRadialGradient(mx, my, mr * 0.6, mx, my, mr * 2.4);
      glow.addColorStop(0, p.moonGlow);
      glow.addColorStop(1, "transparent");
      s.fillStyle = glow;
      s.fillRect(0, 0, W, H);
      s.fillStyle = p.moon;
      s.beginPath();
      s.arc(mx, my, mr, 0, Math.PI * 2);
      s.fill();
      // craters
      s.globalAlpha = theme === "dark" ? 0.06 : 0.04;
      s.fillStyle = "#000";
      const cr = rng(7);
      for (let i = 0; i < 7; i++) {
        const a = cr() * Math.PI * 2,
          d = cr() * mr * 0.7;
        s.beginPath();
        s.arc(mx + Math.cos(a) * d, my + Math.sin(a) * d, mr * (0.06 + cr() * 0.12), 0, Math.PI * 2);
        s.fill();
      }
      s.globalAlpha = 1;

      // skyline layers, back to front
      p.layers.forEach((color, li) => {
        const r = rng(42 + li * 101);
        const base = H * (0.72 + li * 0.1);
        let x = -20;
        while (x < W + 20) {
          const w = 18 + r() * (40 + li * 18);
          const h = (0.06 + r() * 0.26) * H * (1 - li * 0.15) + (r() > 0.92 ? H * 0.12 : 0);
          s.fillStyle = color;
          s.fillRect(x, base - h, w, H - base + h);
          if (r() > 0.6) s.fillRect(x + w * 0.4, base - h - 12, 2, 12); // antenna
          // lit windows
          for (let wy = base - h + 6; wy < H - 4; wy += 7 + li) {
            for (let wx = x + 4; wx < x + w - 4; wx += 6 + li) {
              if (r() > 0.9 - li * 0.04) {
                s.fillStyle = p.window[Math.floor(r() * p.window.length)];
                s.globalAlpha = 0.35 + li * 0.2 + r() * 0.3;
                s.fillRect(wx, wy, 2 + li * 0.5, 2 + li * 0.5);
                s.globalAlpha = 1;
              }
            }
          }
          x += w + r() * 6;
        }
        // haze between layers
        const hz = s.createLinearGradient(0, base - H * 0.2, 0, H);
        hz.addColorStop(0, "transparent");
        hz.addColorStop(1, p.haze);
        s.fillStyle = hz;
        s.fillRect(0, 0, W, H);
      });

      const fr = rng(9);
      flakes = Array.from({ length: Math.round(W / 6) }, () => ({
        x: fr() * W,
        y: fr() * H,
        r: 0.5 + fr() * 1.8,
        v: 0.2 + fr() * 0.7,
        d: fr() * Math.PI * 2,
      }));
    };

    const frame = (t: number) => {
      if (!scene) return;
      ctx.drawImage(scene, 0, 0, W, H);
      if (snow) {
        for (const f of flakes) {
          if (!reduce) {
            f.y += f.v;
            f.x += Math.sin(t / 1600 + f.d) * 0.3;
            if (f.y > H + 4) {
              f.y = -4;
              f.x = Math.random() * W;
            }
          }
          ctx.fillStyle = `${p.snow}${0.35 + f.r / 4})`;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduce && snow) raf = requestAnimationFrame(frame);
    };

    drawScene();
    raf = requestAnimationFrame(frame);
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      drawScene();
      raf = requestAnimationFrame(frame);
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [theme, snow]);

  return (
    <div className="relative overflow-hidden rounded-b-2xl md:rounded-2xl">
      <canvas
        ref={canvasRef}
        className="block h-44 w-full sm:h-56 md:h-64"
        role="img"
        aria-label="Illustrated city skyline under a large moon"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-bg to-transparent" />
      <span
        className="absolute right-4 bottom-3 font-mono text-xl tracking-[0.2em] text-white/90 tabular-nums mix-blend-difference md:text-2xl"
        aria-label="Local time"
      >
        {h24}
      </span>
    </div>
  );
}
