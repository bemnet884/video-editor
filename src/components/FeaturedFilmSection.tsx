import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play } from 'lucide-react';
import { FEATURED_FILM } from '@/src/data/projects';
import { useMediaCapabilities } from '@/src/hooks/useMediaCapabilities';
import type { ModalMedia } from './VideoModal';

interface FeaturedFilmSectionProps {
  onOpenModal: (media: ModalMedia) => void;
}

export function FeaturedFilmSection({ onOpenModal }: FeaturedFilmSectionProps) {
  const { shouldAutoplayHero, prefersReducedMotion } = useMediaCapabilities();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax & progress bar linked to scroll
  const mediaScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [1, 1, 1] : [1.04, 1, 1.04]
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    chapterRefs.current.forEach((el, index) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveChapter(index);
            }
          });
        },
        { rootMargin: '-35% 0px -45% 0px', threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const currentChapter = FEATURED_FILM.chapters[activeChapter];

  return (
    <section
      id="featured-film"
      ref={sectionRef}
      aria-labelledby="featured-film-heading"
      className="border-t border-white/10 py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-[#FFB627] uppercase">
              02 / Case Study
            </p>
            <h2
              id="featured-film-heading"
              className="mt-2 font-display text-[clamp(2rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-[#F5F3EE]"
            >
              Featured film
            </h2>
          </div>

          <span className="font-mono text-xs tabular-nums text-[#F5F3EE]/60">
            {currentChapter.timecode} · {FEATURED_FILM.category}
          </span>
        </div>

        {/* Desktop: sticky 21:9 cinema frame + scrolling chapter notes. Mobile: stacked */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          {/* Pinned 21:9 Cinema Player Frame */}
          <div className="lg:sticky lg:top-20 lg:col-span-8">
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-black">
              <motion.div style={{ scale: mediaScale }} className="h-full w-full">
                <img
                  src={FEATURED_FILM.posterUrl}
                  alt={FEATURED_FILM.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />

                {shouldAutoplayHero && (
                  <video
                    src={FEATURED_FILM.videoUrl}
                    poster={FEATURED_FILM.posterUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </motion.div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/80 via-transparent to-transparent" />

              <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4 sm:right-6 sm:bottom-6 sm:left-6">
                <div>
                  <p className="font-mono text-[11px] tracking-wider text-[#FFB627] uppercase">
                    {currentChapter.label} — {currentChapter.title}
                  </p>
                  <p className="mt-1 font-display text-lg font-extrabold tracking-tight text-[#F5F3EE] sm:text-2xl">
                    {FEATURED_FILM.title}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenModal({
                      title: FEATURED_FILM.title,
                      category: FEATURED_FILM.category,
                      description: currentChapter.body,
                      videoUrl: FEATURED_FILM.videoUrl,
                      posterUrl: FEATURED_FILM.posterUrl,
                    })
                  }
                  aria-label={`Watch ${FEATURED_FILM.title} fullscreen`}
                  className="inline-flex min-h-[44px] items-center gap-2 bg-[#FFB627] px-4 py-2 font-mono text-xs font-medium tracking-wider text-[#0A0A0F] uppercase whitespace-nowrap shrink-0 transition-colors hover:bg-[#ffc64d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
                >
                  <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  <span>Full cut</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3 Chapters: Concept, Edit, Final Look */}
          <div className="flex flex-col divide-y divide-white/10 border-y border-white/10 lg:col-span-4">
            {FEATURED_FILM.chapters.map((chapter, index) => {
              const isActive = index === activeChapter;
              return (
                <div
                  key={chapter.id}
                  ref={(el) => {
                    chapterRefs.current[index] = el;
                  }}
                  className={`py-8 transition-opacity duration-300 lg:py-20 ${
                    isActive ? 'opacity-100' : 'opacity-45 lg:opacity-35'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#FFB627]">
                      {chapter.number} · {chapter.label}
                    </span>
                    <span className="tabular-nums text-[#F5F3EE]/50">
                      {chapter.timecode}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-[#F5F3EE] sm:text-3xl">
                    {chapter.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-[#F5F3EE]/80">
                    {chapter.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
