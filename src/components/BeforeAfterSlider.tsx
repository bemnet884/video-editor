import { useCallback, useRef, useState } from 'react';
import { BEFORE_AFTER_DATA } from '@/src/data/projects';

export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(2, Math.min(98, Math.round(pct * 10) / 10)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 3;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => Math.max(2, p - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => Math.min(98, p + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(2);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(98);
    }
  };

  return (
    <section
      id="before-after"
      aria-labelledby="before-after-heading"
      className="border-t border-white/10 py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-[#FFB627] uppercase">
              05 / Color Suite
            </p>
            <h2
              id="before-after-heading"
              className="mt-2 font-display text-[clamp(2rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-[#F5F3EE]"
            >
              Raw &amp; graded
            </h2>
          </div>

          <p className="font-mono text-xs text-[#F5F3EE]/60 uppercase">
            {BEFORE_AFTER_DATA.specs}
          </p>
        </div>
      </div>

      {/* Full-width edge-to-edge scrubber */}
      <div
        ref={containerRef}
        role="slider"
        tabIndex={0}
        aria-label="Color grading comparison slider. Drag or use Left and Right arrow keys to compare RAW and GRADED footage."
        aria-valuemin={2}
        aria-valuemax={98}
        aria-valuenow={Math.round(position)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        className="relative aspect-[16/9] max-h-[78vh] w-full cursor-ew-resize touch-none select-none overflow-hidden bg-black focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#FFB627]"
      >
        {/* Base Layer: Final Color Grade */}
        <img
          src={BEFORE_AFTER_DATA.imageUrl}
          alt="Final graded cinema frame"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          draggable={false}
          className="pointer-events-none h-full w-full object-cover contrast-[1.09] saturate-[1.16]"
        />

        {/* Overlay Layer: RAW Log Footage */}
        <div
          aria-hidden="true"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          className="pointer-events-none absolute inset-0"
        >
          <img
            src={BEFORE_AFTER_DATA.imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            draggable={false}
            className="h-full w-full object-cover brightness-[1.1] contrast-[0.66] saturate-[0.25]"
          />
        </div>

        {/* Large RAW & GRADED typographic labels */}
        <span className="pointer-events-none absolute bottom-4 left-4 font-display text-[clamp(1.75rem,5vw,4.5rem)] font-extrabold leading-none tracking-tight text-[#F5F3EE]/85 mix-blend-difference sm:bottom-8 sm:left-8">
          RAW
        </span>
        <span className="pointer-events-none absolute right-4 bottom-4 font-display text-[clamp(1.75rem,5vw,4.5rem)] font-extrabold leading-none tracking-tight text-[#FFB627] sm:right-8 sm:bottom-8">
          GRADED
        </span>

        {/* Thin scrubber line */}
        <div
          aria-hidden="true"
          style={{ left: `${position}%` }}
          className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-[#FFB627]"
        >
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#FFB627] bg-[#0A0A0F] font-mono text-[10px] font-medium text-[#FFB627]">
            {Math.round(position)}%
          </div>
        </div>
      </div>
    </section>
  );
}
