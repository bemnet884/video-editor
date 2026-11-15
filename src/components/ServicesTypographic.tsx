import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { SERVICES } from '@/src/data/projects';

export function ServicesTypographic() {
  const [openNumber, setOpenNumber] = useState<string | null>(SERVICES[0].number);

  const toggle = (num: string) => {
    setOpenNumber((prev) => (prev === num ? null : num));
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-t border-white/10 py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Sticky Heading */}
          <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
            <p className="font-mono text-xs tracking-[0.14em] text-[#FFB627] uppercase">
              06 / Services
            </p>
            <h2
              id="services-heading"
              className="mt-2 font-display text-[clamp(2rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-tight text-[#F5F3EE]"
            >
              What I do
            </h2>
            <p className="mt-4 max-w-xs text-base leading-relaxed text-[#F5F3EE]/65">
              Select any discipline to inspect typical scope and turnaround.
            </p>
          </div>

          {/* Right Typographic Hairline List / Accordion */}
          <div className="border-t border-white/10 lg:col-span-8">
            {SERVICES.map((service) => {
              const isOpen = openNumber === service.number;
              return (
                <div key={service.number} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => toggle(service.number)}
                    aria-expanded={isOpen}
                    className="flex min-h-[72px] w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627] md:py-7"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-8">
                      <span className="font-mono text-xs tabular-nums text-[#FFB627] sm:text-sm">
                        {service.number}
                      </span>
                      <span className="font-display text-[clamp(1.5rem,3.8vw,3.25rem)] font-extrabold leading-none tracking-tight">
                        {service.title}
                      </span>
                    </div>

                    <span
                      aria-hidden="true"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-[#FFB627]"
                    >
                      {isOpen ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-4 pb-7 pl-8 sm:flex-row sm:items-end sm:justify-between sm:pl-14">
                          <p className="max-w-xl text-base leading-relaxed text-[#F5F3EE]/80">
                            {service.description}
                          </p>
                          <div className="shrink-0 font-mono text-xs uppercase">
                            <span className="text-[#F5F3EE]/50">Turnaround: </span>
                            <span className="tabular-nums text-[#FFB627]">
                              {service.turnaround}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
