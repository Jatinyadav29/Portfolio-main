import { useEffect, useRef } from "react";
import { useTheme } from "../theme";

/** Deterministic RNG so the range looks the same on every visit. */
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const PALETTE = {
  dark: {
    sky: ["#070a1c", "#121a3d", "#2a2c63", "#5b4a86", "#a0688f"],
    orb: "#f3ecdf",
    orbGlow: "rgba(200,190,255,0.28)",
    layers: ["#3d4382", "#2d3268", "#20244f", "#151838", "#0b0d22"],
    mist: "rgba(170,180,255,",
    snow: "rgba(235,238,255,",
    stars: true,
  },
  light: {
    sky: ["#9fb8e6", "#c3cdee", "#e6d6ea", "#f8d9c8", "#fde8d6"],
    orb: "#fff6e0",
    orbGlow: "rgba(255,214,170,0.55)",
    layers: ["#c4c8e8", "#a9acd8", "#8b8ec2", "#6d6fa4", "#4e4f82"],
    mist: "rgba(255,255,255,",
    snow: "rgba(110,120,170,",
    stars: false,
  },
};

const PERIOD = 1800; // ridges repeat every PERIOD px, so the drift loops seamlessly

type Ridge = { a: number; n: number; ph: number; sharp: boolean }[];

function makeRidge(seed: number, roughness: number): Ridge {
  const r = rng(seed);
  const waves: Ridge = [];
  for (let k = 0; k < 6; k++) {
    const n = Math.round(2 + k * 2.5 + r() * 3);
    waves.push({ a: (1 / (k + 1)) ** roughness * (0.6 + r() * 0.6), n, ph: r() * Math.PI * 2, sharp: k < 3 });
  }
  return waves;
}

function ridgeAt(w: Ridge, x: number) {
  let v = 0,
    norm = 0;
  for (const { a, n, ph, sharp } of w) {
    const s = Math.sin((2 * Math.PI * n * x) / PERIOD + ph);
    v += a * (sharp ? 1 - Math.abs(s) * 2 : s); // |sin| gives pointed peaks
    norm += a;
  }
  return v / norm; // ~ -1..1
}

type Flake = { x: number; y: number; r: number; v: number; d: number };

export default function Banner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, snow } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const p = PALETTE[theme];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0,
      W = 0,
      H = 0;
    let sky: HTMLCanvasElement | null = null;
    let flakes: Flake[] = [];
    let stars: { x: number; y: number; r: number; tw: number }[] = [];
    let mouse = 0,
      mouseTarget = 0;

    const ridges = p.layers.map((_, i) => makeRidge(11 + i * 37, 1.1 + i * 0.15));

    const setup = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sky = document.createElement("canvas");
      sky.width = W * dpr;
      sky.height = H * dpr;
      const s = sky.getContext("2d")!;
      s.setTransform(dpr, 0, 0, dpr, 0, 0);
      const g = s.createLinearGradient(0, 0, 0, H);
      p.sky.forEach((c, i) => g.addColorStop(i / (p.sky.length - 1), c));
      s.fillStyle = g;
      s.fillRect(0, 0, W, H);

      // moon / sun with glow
      const ox = W * 0.68,
        oy = H * 0.34,
        or = H * 0.13;
      const glow = s.createRadialGradient(ox, oy, or * 0.5, ox, oy, or * 5);
      glow.addColorStop(0, p.orbGlow);
      glow.addColorStop(1, "transparent");
      s.fillStyle = glow;
      s.fillRect(0, 0, W, H);
      s.fillStyle = p.orb;
      s.beginPath();
      s.arc(ox, oy, or, 0, Math.PI * 2);
      s.fill();

      const sr = rng(3);
      stars = p.stars
        ? Array.from({ length: Math.round(W / 9) }, () => ({ x: sr() * W, y: sr() * H * 0.6, r: 0.3 + sr() * 1.1, tw: sr() * 6 }))
        : [];
      const fr = rng(9);
      flakes = Array.from({ length: Math.round(W / 7) }, () => ({
        x: fr() * W,
        y: fr() * H,
        r: 0.5 + fr() * 1.6,
        v: 0.15 + fr() * 0.55,
        d: fr() * Math.PI * 2,
      }));
    };

    const frame = (t: number) => {
      if (!sky) return;
      const time = reduce ? 0 : t / 1000;
      mouse += (mouseTarget - mouse) * 0.05;
      ctx.drawImage(sky, 0, 0, W, H);

      for (const s of stars) {
        ctx.globalAlpha = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(time * 1.5 + s.tw));
        ctx.fillStyle = "#fff";
        ctx.fillRect(s.x, s.y, s.r, s.r);
      }
      ctx.globalAlpha = 1;

      const n = p.layers.length;
      p.layers.forEach((color, i) => {
        const depth = (i + 1) / n; // far → near
        const baseY = H * (0.42 + depth * 0.42);
        const amp = H * (0.2 - depth * 0.08);
        const offset = time * (4 + depth * 14) + mouse * depth * 25;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W + 4; x += 4) {
          ctx.lineTo(x, baseY - amp * ridgeAt(ridges[i], x + offset + i * 400));
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fill();

        // drifting mist band in front of each layer
        if (i < n - 1) {
          const my = baseY + amp * 0.3;
          const mg = ctx.createLinearGradient(0, my - amp * 0.9, 0, my + amp * 0.6);
          const a = 0.1 + 0.06 * Math.sin(time * 0.4 + i);
          mg.addColorStop(0, `${p.mist}0)`);
          mg.addColorStop(0.55, `${p.mist}${a})`);
          mg.addColorStop(1, `${p.mist}0)`);
          ctx.fillStyle = mg;
          ctx.fillRect(0, my - amp * 0.9, W, amp * 1.5);
        }
      });

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
          ctx.fillStyle = `${p.snow}${0.3 + f.r / 4})`;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      mouseTarget = (e.clientX / innerWidth - 0.5) * 2;
    };

    setup();
    raf = requestAnimationFrame(frame);
    addEventListener("pointermove", onMove);
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      setup();
      raf = requestAnimationFrame(frame);
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      removeEventListener("pointermove", onMove);
    };
  }, [theme, snow]);

  return (
    <div className="relative overflow-hidden rounded-b-2xl md:rounded-2xl">
      <canvas
        ref={canvasRef}
        className="block h-44 w-full sm:h-56 md:h-64"
        role="img"
        aria-label="Animated mountain range with drifting mist"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-bg to-transparent" />
    </div>
  );
}
