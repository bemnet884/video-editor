import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Play } from 'lucide-react';
import { EDITOR_PROFILE } from '@/src/data/projects';
import { useMediaCapabilities } from '@/src/hooks/useMediaCapabilities';

interface HeroProps {
  onWatchShowreel: () => void;
}

function formatTimecode(totalFrames: number): string {
  const fps = 24;
  const frames = totalFrames % fps;
  const totalSeconds = Math.floor(totalFrames / fps);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

export function Hero({ onWatchShowreel }: HeroProps) {
  const { shouldAutoplayHero, prefersReducedMotion } = useMediaCapabilities();
  const [videoReady, setVideoReady] = useState(false);
  // Start at 00:00:12:04 (12*24 + 4 = 292 frames)
  const [frameCount, setFrameCount] = useState(292);

  useEffect(() => {
    if (prefersReducedMotion) return;
    // Live-looking 24fps timecode counter (updates ~6 times/sec cleanly for low CPU overhead)
    const interval = window.setInterval(() => {
      setFrameCount((f) => f + 4);
    }, 166);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section
      id="top"
      aria-label="Editorial Cinema Hero"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#0A0A0F] pt-24 pb-10 sm:pb-12"
    >
      {/* Full-bleed background media */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={EDITOR_PROFILE.showreelPoster}
          alt="Film editor color grading suite at night"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
        />

        {shouldAutoplayHero && (
          <video
            src={EDITOR_PROFILE.showreelVideo}
            poster={EDITOR_PROFILE.showreelPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Cinematic dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/45 to-[#0A0A0F]/70" />
      </div>

      {/* Top metadata bar inside hero: Live timecode & blinking REC dot */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 pt-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3 font-mono text-xs tracking-wider text-[#F5F3EE]/90 tabular-nums">
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full bg-[#EF4444] ${
                prefersReducedMotion ? '' : 'animate-pulse'
              }`}
            />
            <span className="text-[#F5F3EE]">REC</span>
          </span>
          <span aria-hidden="true" className="text-white/25">
            |
          </span>
          <span aria-label="Live timeline timecode">{formatTimecode(frameCount)}</span>
        </div>

        <span className="hidden font-mono text-xs tracking-[0.14em] text-[#F5F3EE]/60 uppercase sm:inline">
          24.00 FPS · 4K DCI
        </span>
      </div>

      {/* Giant name bleeding across screen with mix-blend-difference */}
      <div className="relative z-10 my-auto w-full overflow-hidden py-8 mix-blend-difference">
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full px-2 font-display text-[clamp(3rem,12vw,11rem)] font-extrabold leading-[0.88] tracking-[-0.045em] text-[#F5F3EE] uppercase sm:px-4 lg:-mx-4 lg:whitespace-nowrap"
        >
          {EDITOR_PROFILE.name}
        </motion.h1>
      </div>

      {/* Bottom tagline, CTA buttons & scroll cue */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 border-t border-white/15 pt-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.12em] text-[#FFB627] uppercase sm:text-sm">
              {EDITOR_PROFILE.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onWatchShowreel}
                className="inline-flex min-h-[48px] items-center gap-2.5 bg-[#FFB627] px-6 py-3 font-mono text-xs font-medium tracking-[0.1em] text-[#0A0A0F] uppercase whitespace-nowrap shrink-0 transition-colors hover:bg-[#ffc64d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
              >
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                <span>Watch showreel</span>
              </button>

              <a
                href="#contact"
                className="inline-flex min-h-[48px] items-center border border-white/30 bg-[#0A0A0F]/60 px-6 py-3 font-mono text-xs font-medium tracking-[0.1em] text-[#F5F3EE] uppercase whitespace-nowrap shrink-0 transition-colors hover:border-[#FFB627] hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
              >
                Hire me
              </a>
            </div>
          </div>

          <a
            href="#work"
            aria-label="Scroll down to selected work"
            className="inline-flex min-h-[44px] items-center gap-3 self-start font-mono text-xs tracking-[0.12em] text-[#F5F3EE]/70 uppercase transition-colors hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627] md:self-end"
          >
            <span>Scroll to sequence</span>
            <motion.span
              animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-4 w-4 text-[#FFB627]" aria-hidden="true" />
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  );
}
