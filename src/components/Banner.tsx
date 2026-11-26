import { useState } from "react";

/**
 * Banner video.
 * Drop your file at `public/banner.mp4` (optional: `public/banner.webm` and a
 * still frame at `public/banner-poster.jpg`). Until a video exists, a plain
 * gradient placeholder is shown.
 */
const VIDEO_MP4 = "/banner.mp4";
const VIDEO_WEBM = "/banner.webm";
const POSTER = "/banner-poster.jpg";

export default function Banner() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-b-2xl bg-linear-to-br from-fg/10 via-fg/5 to-fg/10 md:rounded-2xl">
      {!failed && (
        <video
          className="block h-44 w-full object-cover sm:h-56 md:h-64"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          aria-hidden="true"
          onError={() => setFailed(true)}
        >
          <source src={VIDEO_WEBM} type="video/webm" />
          <source src={VIDEO_MP4} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      )}
      {failed && <div className="h-44 w-full sm:h-56 md:h-64" />}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-bg to-transparent" />
    </div>
  );
}
