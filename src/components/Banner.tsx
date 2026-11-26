import { useEffect, useRef, useState } from "react";

/**
 * Banner video. Drop your file at `public/banner.mp4`.
 * If it fails to load, a plain gradient placeholder is shown.
 */
const VIDEO_MP4 = "/banner.mp4";

export default function Banner() {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  // Some browsers ignore the autoplay attribute when React sets `muted`
  // only as a property, so kick playback off explicitly.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <div className="relative overflow-hidden bg-linear-to-br from-fg/10 via-fg/5 to-fg/10 sm:rounded-b-2xl md:rounded-2xl">
      {!failed ? (
        <video
          ref={ref}
          className="block h-52 w-full object-cover sm:h-56 md:h-64"
          src={VIDEO_MP4}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="h-52 w-full sm:h-56 md:h-64" />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-bg to-transparent" />
    </div>
  );
}
