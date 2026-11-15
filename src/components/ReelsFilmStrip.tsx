import { useRef, useState } from 'react';
import { Maximize2, Pause, Play } from 'lucide-react';
import { REELS_STRIP, ReelClip } from '@/src/data/projects';
import { useMediaCapabilities } from '@/src/hooks/useMediaCapabilities';
import type { ModalMedia } from './VideoModal';

interface ReelsFilmStripProps {
  onOpenModal: (media: ModalMedia) => void;
}

export function ReelsFilmStrip({ onOpenModal }: ReelsFilmStripProps) {
  const { canHover, prefersReducedMotion } = useMediaCapabilities();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activatedIds, setActivatedIds] = useState<Record<string, boolean>>({});
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  const activateAndPlay = (id: string) => {
    setActivatedIds((prev) => ({ ...prev, [id]: true }));
    window.requestAnimationFrame(() => {
      const vid = videoRefs.current[id];
      if (!vid) return;
      const p = vid.play();
      if (p) {
        p.then(() => setPlayingId(id)).catch(() => {});
      }
    });
  };

  const pauseClip = (id: string) => {
    const vid = videoRefs.current[id];
    if (vid) vid.pause();
    setPlayingId((prev) => (prev === id ? null : prev));
  };

  const handleTrackScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const ratio = el.scrollLeft / maxScroll;
    const idx = Math.min(
      REELS_STRIP.length - 1,
      Math.max(0, Math.round(ratio * (REELS_STRIP.length - 1)))
    );
    setActiveIndex(idx);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canHover) return;
    const el = trackRef.current;
    if (!el) return;
    dragState.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    const delta = e.clientX - dragState.current.startX;
    if (Math.abs(delta) > 6) {
      dragState.current.moved = true;
    }
    el.scrollLeft = dragState.current.scrollLeft - delta * 1.25;
  };

  const handlePointerUp = () => {
    dragState.current.active = false;
  };

  const handleClipClick = (clip: ReelClip, idx: number) => {
    if (dragState.current.moved) {
      dragState.current.moved = false;
      return;
    }
    setActiveIndex(idx);
    if (playingId === clip.id) {
      pauseClip(clip.id);
    } else {
      if (playingId) pauseClip(playingId);
      activateAndPlay(clip.id);
    }
  };

  return (
    <section
      id="reels"
      aria-labelledby="reels-strip-heading"
      className="border-t border-white/10 py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-[#FFB627] uppercase">
              04 / Vertical 9:16
            </p>
            <h2
              id="reels-strip-heading"
              className="mt-2 font-display text-[clamp(2rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-[#F5F3EE]"
            >
              Reels film strip
            </h2>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs tracking-wider uppercase">
            <span className="text-[#F5F3EE]/55">Drag or swipe strip</span>
            <span
              aria-live="polite"
              className="tabular-nums text-[#FFB627]"
            >
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(REELS_STRIP.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* 35mm Film-Strip Frame with top & bottom sprocket holes */}
      <div className="border-y border-white/15 bg-[#0D0D14]">
        <div aria-hidden="true" className="film-sprockets h-7 w-full border-b border-white/10" />

        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pt-8 pb-12 no-scrollbar sm:gap-8 sm:px-8 md:pt-10 md:pb-16 lg:px-12 lg:cursor-grab active:lg:cursor-grabbing"
        >
          {REELS_STRIP.map((clip, idx) => {
            const isPlaying = playingId === clip.id;
            return (
              <div
                key={clip.id}
                onMouseEnter={() => {
                  if (canHover && !prefersReducedMotion) {
                    setActiveIndex(idx);
                    activateAndPlay(clip.id);
                  }
                }}
                onMouseLeave={() => {
                  if (canHover) pauseClip(clip.id);
                }}
                className={`relative w-[68vw] max-w-[260px] shrink-0 snap-center sm:w-[235px] md:w-[250px] lg:w-[265px] ${clip.staggerClass}`}
              >
                <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-[#F5F3EE]/55 tabular-nums">
                  <span className="text-[#FFB627]">FRAME {clip.index}</span>
                  <span>{clip.duration}</span>
                </div>

                <div className="group relative aspect-[9/16] w-full overflow-hidden bg-black">
                  <button
                    type="button"
                    onClick={() => handleClipClick(clip, idx)}
                    aria-label={
                      isPlaying
                        ? `Pause ${clip.title}`
                        : `Play ${clip.title} vertical clip`
                    }
                    className="relative block h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#FFB627]"
                  >
                    <img
                      src={clip.posterUrl}
                      alt={`${clip.title} vertical reel`}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      draggable={false}
                      className={`h-full w-full object-cover transition-opacity duration-300 ${
                        isPlaying ? 'opacity-0' : 'opacity-100'
                      }`}
                    />

                    <video
                      ref={(el) => {
                        videoRefs.current[clip.id] = el;
                      }}
                      src={activatedIds[clip.id] ? clip.videoUrl : undefined}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                        isPlaying ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/85 via-transparent to-transparent" />

                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0A0A0F]/75 text-[#F5F3EE] transition-opacity ${
                        isPlaying
                          ? 'opacity-0 group-hover:opacity-100'
                          : 'opacity-100'
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 fill-current" />
                      ) : (
                        <Play className="ml-0.5 h-4 w-4 fill-current" />
                      )}
                    </span>

                    <div className="pointer-events-none absolute right-3 bottom-3 left-3">
                      <p className="font-mono text-[10px] tracking-wider text-[#FFB627] uppercase">
                        {clip.platform}
                      </p>
                      <h3 className="mt-0.5 font-display text-lg font-extrabold leading-tight text-[#F5F3EE]">
                        {clip.title}
                      </h3>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenModal({
                        title: clip.title,
                        category: clip.platform,
                        description: `Vertical 9:16 short-form edit (${clip.duration}).`,
                        videoUrl: clip.videoUrl,
                        posterUrl: clip.posterUrl,
                        duration: clip.duration,
                      })
                    }
                    aria-label={`Expand ${clip.title} in fullscreen player`}
                    className="absolute top-2 right-2 inline-flex h-11 w-11 items-center justify-center bg-[#0A0A0F]/75 text-[#F5F3EE] transition-colors hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
                  >
                    <Maximize2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div aria-hidden="true" className="film-sprockets h-7 w-full border-t border-white/10" />
      </div>
    </section>
  );
}
