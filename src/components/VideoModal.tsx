import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

export interface ModalMedia {
  id?: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  client?: string;
  duration?: string;
  year?: string;
}

interface VideoModalProps {
  media: ModalMedia | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPagination?: boolean;
}

export function VideoModal({
  media,
  onClose,
  onPrev,
  onNext,
  hasPagination = false,
}: VideoModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (!media) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (hasPagination && e.key === 'ArrowRight' && onNext) {
        onNext();
        return;
      }
      if (hasPagination && e.key === 'ArrowLeft' && onPrev) {
        onPrev();
        return;
      }
      // Basic focus trap within modal dialog
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], video, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [media, onClose, onNext, onPrev, hasPagination]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    touchStartY.current = null;
    if (deltaY > 95) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {media && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 flex h-[100dvh] flex-col overflow-hidden bg-[#0A0A0F] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6 lg:px-10 lg:py-6"
        >
          {/* Top Bar */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto flex w-full max-w-[1600px] shrink-0 items-start justify-between gap-4 border-b border-white/10 pb-3 sm:pb-4"
          >
            <div className="min-w-0">
              <p className="truncate font-mono text-xs tracking-wider text-[#FFB627] uppercase">
                {media.category}
                {media.client ? ` · ${media.client}` : ''}
                {media.year ? ` · ${media.year}` : ''}
                {media.duration ? ` · ${media.duration}` : ''}
              </p>
              <h2
                id="video-modal-title"
                className="mt-1 truncate font-display text-lg font-extrabold tracking-tight text-[#F5F3EE] sm:text-2xl lg:text-3xl"
              >
                {media.title}
              </h2>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close fullscreen video player"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/20 text-[#F5F3EE] transition-colors hover:border-[#FFB627] hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </motion.div>

          {/* Center Fullscreen Video Stage (strictly bounded within remaining flex height) */}
          <motion.div
            key={media.videoUrl + media.title}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center overflow-hidden py-3 sm:py-4"
          >
            <video
              src={media.videoUrl}
              poster={media.posterUrl}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="h-full max-h-full w-full max-w-full bg-black object-contain"
            />
          </motion.div>

          {/* Bottom Bar: Description + Next/Prev Project Controls */}
          <div className="mx-auto flex w-full max-w-[1600px] shrink-0 flex-col gap-3 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-4">
            <p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-[#F5F3EE]/75">
              {media.description}
            </p>

            {hasPagination && onPrev && onNext && (
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous project"
                  className="inline-flex min-h-[44px] items-center gap-2 border border-white/20 px-4 py-2 font-mono text-xs text-[#F5F3EE] uppercase transition-colors hover:border-[#FFB627] hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Prev</span>
                </button>

                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next project"
                  className="inline-flex min-h-[44px] items-center gap-2 border border-white/20 px-4 py-2 font-mono text-xs text-[#F5F3EE] uppercase transition-colors hover:border-[#FFB627] hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
