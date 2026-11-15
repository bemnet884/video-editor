import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { EDITOR_PROFILE } from '@/src/data/projects';

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Film', href: '#featured-film' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    if (!overlayOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOverlayOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [overlayOpen]);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30 border-b border-white/10">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-8 px-4 py-4 sm:px-6 lg:px-10">
          {/* Brand wordmark */}
          <a
            href="#top"
            className="font-mono text-xs font-medium tracking-[0.14em] text-[#F5F3EE] uppercase whitespace-nowrap shrink-0 transition-colors hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB627]"
          >
            {EDITOR_PROFILE.name}
          </a>

          {/* Inline menu above lg */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-8 font-mono text-xs tracking-[0.12em] text-[#F5F3EE]/75 uppercase"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-2 whitespace-nowrap shrink-0 transition-colors hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFB627]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right action / mobile fullscreen menu trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="hidden lg:inline-flex min-h-[44px] items-center border border-[#FFB627] px-5 py-2 font-mono text-xs font-medium tracking-[0.12em] text-[#FFB627] uppercase whitespace-nowrap shrink-0 transition-colors hover:bg-[#FFB627] hover:text-[#0A0A0F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
            >
              Hire me
            </a>

            <button
              type="button"
              onClick={() => setOverlayOpen(true)}
              aria-label="Open fullscreen menu"
              aria-expanded={overlayOpen}
              aria-controls="fullscreen-nav-overlay"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-[#0A0A0F]/70 text-[#F5F3EE] transition-colors hover:border-[#FFB627] hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627] lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu below lg */}
      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            id="fullscreen-nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0A0A0F] p-6 sm:p-10 lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-xs tracking-[0.14em] text-[#F5F3EE]/70 uppercase">
                {EDITOR_PROFILE.name}
              </span>
              <button
                type="button"
                onClick={() => setOverlayOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center border border-white/20 text-[#F5F3EE] transition-colors hover:border-[#FFB627] hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Fullscreen navigation" className="my-auto py-8">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {NAV_LINKS.map((link, idx) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOverlayOpen(false)}
                      className="flex min-h-[60px] items-center justify-between py-3 font-display text-3xl font-extrabold tracking-tight text-[#F5F3EE] transition-colors hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627] sm:text-5xl"
                    >
                      <span>{link.label}</span>
                      <span className="font-mono text-xs text-[#FFB627]">
                        0{idx + 1}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center justify-between border-t border-white/10 pt-5 font-mono text-xs text-[#F5F3EE]/60">
              <span>{EDITOR_PROFILE.email}</span>
              <a
                href="#contact"
                onClick={() => setOverlayOpen(false)}
                className="inline-flex min-h-[44px] items-center bg-[#FFB627] px-5 py-2 font-medium text-[#0A0A0F] uppercase"
              >
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
