import { useCallback, useEffect, useRef, useState } from 'react';
import { MOSAIC_TILES, MosaicTile } from '@/src/data/projects';
import { useMediaCapabilities } from '@/src/hooks/useMediaCapabilities';
import type { ModalMedia } from './VideoModal';

interface MosaicGalleryProps {
  onOpenModal: (media: ModalMedia) => void;
}

export function MosaicGallery({ onOpenModal }: MosaicGalleryProps) {
  const { prefersReducedMotion } = useMediaCapabilities();
  const [playingIds, setPlayingIds] = useState<string[]>([]);
  const [saveData, setSaveData] = useState(false);
  const tileRefs = useRef<Record<string, HTMLElement | null>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const visibleSetRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const conn = nav.connection;
    if (conn?.saveData || (conn?.effectiveType && conn.effectiveType !== '4g')) {
      setSaveData(true);
    }
  }, []);

  const syncPlayingQueue = useCallback(() => {
    if (prefersReducedMotion || saveData) {
      setPlayingIds([]);
      return;
    }
    // Enforce max 2 muted videos playing simultaneously in viewport
    const nextPlaying = Array.from(visibleSetRef.current).slice(0, 2);
    setPlayingIds(nextPlaying);
  }, [prefersReducedMotion, saveData]);

  useEffect(() => {
    if (prefersReducedMotion || saveData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.tileId;
          if (!id) return;
          if (entry.isIntersecting) {
            visibleSetRef.current.add(id);
          } else {
            visibleSetRef.current.delete(id);
          }
        });
        syncPlayingQueue();
      },
      { threshold: 0.35 }
    );

    MOSAIC_TILES.forEach((tile) => {
      const el = tileRefs.current[tile.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [prefersReducedMotion, saveData, syncPlayingQueue]);

  useEffect(() => {
    MOSAIC_TILES.forEach((tile) => {
      const vid = videoRefs.current[tile.id];
      if (!vid) return;
      if (playingIds.includes(tile.id)) {
        const p = vid.play();
        if (p) p.catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [playingIds]);

  const handleOpen = (tile: MosaicTile) => {
    onOpenModal({
      title: tile.title,
      category: tile.category,
      description: tile.description,
      videoUrl: tile.videoUrl,
      posterUrl: tile.posterUrl,
      duration: tile.duration,
    });
  };

  return (
    <section
      id="mosaic"
      aria-labelledby="mosaic-heading"
      className="border-t border-white/10 py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-[#FFB627] uppercase">
              03 / Visual Rhythm
            </p>
            <h2
              id="mosaic-heading"
              className="mt-2 font-display text-[clamp(2rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-[#F5F3EE]"
            >
              Motion mosaic
            </h2>
          </div>

          <span className="font-mono text-xs text-[#F5F3EE]/55 uppercase">
            Live viewport reels · Max 2 active streams
          </span>
        </div>

        {/* Asymmetric 12-column grid, 4px gaps (gap-1), zero borders, zero rounded corners, zero shadows */}
        <div className="grid grid-cols-12 gap-1">
          {MOSAIC_TILES.map((tile) => {
            const isPlaying = playingIds.includes(tile.id);
            return (
              <div
                key={tile.id}
                ref={(el) => {
                  tileRefs.current[tile.id] = el;
                }}
                data-tile-id={tile.id}
                className={`group relative overflow-hidden bg-black ${tile.layoutClass}`}
              >
                <button
                  type="button"
                  onClick={() => handleOpen(tile)}
                  aria-label={`Open ${tile.title} (${tile.category})`}
                  className="relative block h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#FFB627]"
                >
                  <img
                    src={tile.posterUrl}
                    alt={`${tile.title} — ${tile.category}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />

                  {!prefersReducedMotion && !saveData && (
                    <video
                      ref={(el) => {
                        videoRefs.current[tile.id] = el;
                      }}
                      src={isPlaying ? tile.videoUrl : undefined}
                      muted
                      loop
                      playsInline
                      preload="none"
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                        isPlaying ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )}

                  {/* Overlay appears only on hover or keyboard focus */}
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0A0A0F]/90 via-[#0A0A0F]/35 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 sm:p-6">
                    <span className="font-mono text-[11px] tracking-wider text-[#FFB627] uppercase">
                      {tile.category} · {tile.duration}
                    </span>
                    <span className="mt-1 font-display text-lg font-extrabold tracking-tight text-[#F5F3EE] sm:text-2xl">
                      {tile.title}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
