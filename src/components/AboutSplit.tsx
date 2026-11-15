import { useEffect, useRef, useState } from 'react';
import { EDITOR_PROFILE } from '@/src/data/projects';
import { useMediaCapabilities } from '@/src/hooks/useMediaCapabilities';

export function AboutSplit() {
  const { canHover } = useMediaCapabilities();
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const [inViewColor, setInViewColor] = useState(false);

  // On touch devices, shift portrait from grayscale to color when scrolled into view
  useEffect(() => {
    if (canHover) return;
    const el = portraitRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInViewColor(true);
          }
        });
      },
      { threshold: 0.45 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [canHover]);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-white/10 py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-0">
          {/* Portrait: Grayscale to color on hover (desktop) or when in view (touch) */}
          <div
            ref={portraitRef}
            className="group relative aspect-[3/4] w-full overflow-hidden bg-[#12121A] lg:col-span-5"
          >
            <img
              src={EDITOR_PROFILE.aboutPortrait}
              alt={`${EDITOR_PROFILE.name} standing in color grading suite`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className={`h-full w-full object-cover transition-all duration-700 ${
                canHover
                  ? 'grayscale group-hover:grayscale-0 group-hover:scale-[1.02]'
                  : inViewColor
                  ? 'grayscale-0'
                  : 'grayscale'
              }`}
            />
          </div>

          {/* Overlapped Oversized Typography + 2-3 Lines of Copy */}
          <div className="relative z-10 lg:col-span-7 lg:-ml-20">
            <p className="font-mono text-xs tracking-[0.14em] text-[#FFB627] uppercase">
              09 / About
            </p>

            <h2
              id="about-heading"
              className="mt-3 font-display text-[clamp(2.25rem,6vw,5.25rem)] font-extrabold leading-[0.94] tracking-tight text-[#F5F3EE] mix-blend-difference"
            >
              {EDITOR_PROFILE.aboutHeadline}
            </h2>

            <div className="mt-8 max-w-xl border-t border-white/15 pt-6 lg:ml-24">
              <p className="text-base leading-relaxed text-[#F5F3EE]/80 sm:text-lg">
                {EDITOR_PROFILE.aboutCopy}
              </p>
              <p className="mt-4 font-mono text-xs tracking-wider text-[#F5F3EE]/50 uppercase">
                {EDITOR_PROFILE.name} — Remote Worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
