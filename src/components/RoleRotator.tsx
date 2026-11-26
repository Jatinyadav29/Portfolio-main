import { useEffect, useState } from "react";

const CHARS = "abcdefghijklmnopqrstuvwxyz·+/#";

/** Cycles through roles with a short scramble-in effect. */
export default function RoleRotator({ roles, interval = 2600 }: { roles: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState(roles[0]);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % roles.length), interval);
    return () => clearInterval(id);
  }, [roles.length, interval]);

  useEffect(() => {
    const target = roles[i];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(target);
      return;
    }
    let frame = 0;
    const total = 14;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor((frame / total) * target.length);
      setText(
        target
          .split("")
          .map((c, k) =>
            k < revealed || c === " " ? c : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );
      if (frame >= total) clearInterval(id);
    }, 32);
    return () => clearInterval(id);
  }, [i, roles]);

  return (
    <span className="inline-block min-w-[14ch]" aria-live="polite">
      {text}
    </span>
  );
}
