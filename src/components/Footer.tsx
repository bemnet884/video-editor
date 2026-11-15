import { ArrowUp } from 'lucide-react';
import { EDITOR_PROFILE } from '@/src/data/projects';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 pt-8 pb-24 md:py-10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-wider text-[#F5F3EE]/60 uppercase">
          <span className="text-[#F5F3EE]">{EDITOR_PROFILE.name}</span>
          <span aria-hidden="true">/</span>
          <span className="tabular-nums">&copy; {year}</span>
        </div>

        <a
          href="#top"
          className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs tracking-wider text-[#F5F3EE]/75 uppercase transition-colors hover:text-[#FFB627] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
        >
          <span>Back to top</span>
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
