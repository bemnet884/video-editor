import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '@/src/data/projects';
import { useMediaCapabilities } from '@/src/hooks/useMediaCapabilities';

const ROTATE_MS = 6500;

export function TestimonialsMinimal() {
  const { prefersReducedMotion } = useMediaCapabilities();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, index]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-t border-white/10 py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex items-center justify-between gap-4">
          <p
            id="testimonials-heading"
            className="font-mono text-xs tracking-[0.14em] text-[#FFB627] uppercase"
          >
            08 / Client Words
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous quote"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-[#F5F3EE] transition-colors hover:border-[#FFB627] hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next quote"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-[#F5F3EE] transition-colors hover:border-[#FFB627] hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Unboxed oversized editorial quote */}
        <div aria-live="polite" className="relative">
          <span
            aria-hidden="true"
            className="block font-display text-[5rem] leading-none font-extrabold text-[#FFB627] select-none sm:text-[7rem]"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.figure
              key={current.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="-mt-6 sm:-mt-10"
            >
              <blockquote className="max-w-5xl font-display text-[clamp(1.6rem,4vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight text-[#F5F3EE]">
                {current.quote}
              </blockquote>

              <figcaption className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs tracking-wider uppercase">
                <span className="text-[#F5F3EE]">{current.author}</span>
                <span aria-hidden="true" className="text-white/25">
                  /
                </span>
                <span className="text-[#FFB627]">{current.role}</span>
                <span aria-hidden="true" className="text-white/25">
                  /
                </span>
                <span className="text-[#F5F3EE]/60">{current.company}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* Thin progress line */}
          <div className="mt-10 h-px w-full overflow-hidden bg-white/10">
            {prefersReducedMotion ? (
              <div
                style={{
                  width: `${((index + 1) / TESTIMONIALS.length) * 100}%`,
                }}
                className="h-full bg-[#FFB627]"
              />
            ) : (
              <motion.div
                key={`progress-${current.id}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: ROTATE_MS / 1000, ease: 'linear' }}
                style={{ transformOrigin: 'left' }}
                className="h-full w-full bg-[#FFB627]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
