import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PROCESS_TRACKS } from '@/src/data/projects';
import { useMediaCapabilities } from '@/src/hooks/useMediaCapabilities';

const RULER_TICKS = ['00:00', '00:15', '00:30', '00:45', '01:00'];

export function ProcessTimeline() {
  const { prefersReducedMotion } = useMediaCapabilities();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 35%'],
  });

  const playheadLeft = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['50%', '50%'] : ['4%', '96%']
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="border-t border-white/10 py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-[#FFB627] uppercase">
              07 / Timeline Workflow
            </p>
            <h2
              id="process-heading"
              className="mt-2 font-display text-[clamp(2rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-[#F5F3EE]"
            >
              Editing timeline
            </h2>
          </div>

          <span className="font-mono text-xs text-[#F5F3EE]/55 uppercase">
            Scroll scrubs the sequence playhead
          </span>
        </div>

        {/* Desktop & Tablet: Multi-Track NLE Timeline */}
        <div className="hidden md:block">
          {/* Timecode Ruler */}
          <div className="grid grid-cols-12 border-y border-white/15 bg-[#0D0D14]">
            <div className="col-span-2 border-r border-white/15 px-4 py-2.5 font-mono text-[11px] text-[#FFB627] uppercase">
              TC · 24FPS
            </div>
            <div className="relative col-span-10 flex items-center justify-between px-4 py-2.5 font-mono text-[11px] tabular-nums text-[#F5F3EE]/50">
              {RULER_TICKS.map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>
          </div>

          {/* Tracks + Scroll-Linked Gold Playhead */}
          <div className="relative border-b border-white/15">
            {/* Playhead Overlay scoped to right 10 columns */}
            <div className="pointer-events-none absolute inset-0 grid grid-cols-12">
              <div className="col-span-2" />
              <div className="relative col-span-10">
                <motion.div
                  aria-hidden="true"
                  style={{ left: playheadLeft }}
                  className="absolute top-0 bottom-0 z-20 w-[2px] -translate-x-1/2 bg-[#FFB627]"
                >
                  <div className="h-3 w-3 -translate-x-[5px] bg-[#FFB627]" />
                </motion.div>
              </div>
            </div>

            {PROCESS_TRACKS.map((track) => (
              <div
                key={track.trackLabel}
                className="grid grid-cols-12 border-b border-white/10 last:border-b-0"
              >
                <div className="col-span-2 flex flex-col justify-center border-r border-white/15 px-4 py-6">
                  <span className="font-mono text-[11px] tracking-wider text-[#F5F3EE]/70">
                    {track.trackLabel}
                  </span>
                  <span className="mt-1 font-mono text-[10px] text-[#F5F3EE]/40 uppercase">
                    {track.durationTag}
                  </span>
                </div>

                <div className="relative col-span-10 flex items-center px-2 py-4">
                  <div
                    style={{
                      marginLeft: `${track.startPercent}%`,
                      width: `${track.widthPercent}%`,
                    }}
                    className={`border px-4 py-3.5 ${track.toneClass}`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg font-extrabold tracking-tight">
                        {track.stepTitle}
                      </h3>
                      <span className="font-mono text-[10px] uppercase opacity-75">
                        {track.durationTag}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed opacity-80">
                      {track.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile (< md): Vertical Timeline */}
        <ol className="relative space-y-6 border-l border-[#FFB627]/40 pl-6 md:hidden">
          {PROCESS_TRACKS.map((track) => (
            <li key={track.trackLabel} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[29px] h-2.5 w-2.5 bg-[#FFB627]"
              />
              <p className="font-mono text-[11px] tracking-wider text-[#FFB627] uppercase">
                {track.trackLabel} · {track.durationTag}
              </p>
              <h3 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-[#F5F3EE]">
                {track.stepTitle}
              </h3>
              <p className="mt-1.5 text-base leading-relaxed text-[#F5F3EE]/75">
                {track.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
