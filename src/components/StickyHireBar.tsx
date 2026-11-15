import { ArrowUpRight } from 'lucide-react';

export function StickyHireBar() {
  return (
    <>
      {/* Mobile sticky bottom bar with safe-area padding */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/15 bg-[#0A0A0F]/95 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] md:hidden">
        <a
          href="#contact"
          aria-label="Hire me — jump to booking section"
          className="flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#FFB627] px-5 py-2.5 font-mono text-xs font-medium tracking-wider text-[#0A0A0F] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
        >
          <span>Hire me</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      {/* Desktop floating bottom-right Hire me button */}
      <div className="pointer-events-none fixed right-6 bottom-6 z-30 hidden md:block lg:right-10 lg:bottom-8">
        <a
          href="#contact"
          aria-label="Hire me — jump to booking section"
          className="pointer-events-auto inline-flex min-h-[46px] items-center gap-2 bg-[#FFB627] px-5 py-2.5 font-mono text-xs font-medium tracking-wider text-[#0A0A0F] uppercase transition-transform duration-150 hover:scale-[1.03] hover:bg-[#ffc64d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
        >
          <span>Hire me</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
