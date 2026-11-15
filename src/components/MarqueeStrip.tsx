import { useMediaCapabilities } from '@/src/hooks/useMediaCapabilities';

interface MarqueeStripProps {
  items: string[];
  direction?: 'left' | 'right';
  label: string;
  accent?: 'ivory' | 'gold';
}

export function MarqueeStrip({
  items,
  direction = 'left',
  label,
  accent = 'ivory',
}: MarqueeStripProps) {
  const { prefersReducedMotion } = useMediaCapabilities();
  const strokeClass = accent === 'gold' ? 'text-stroke-gold' : 'text-stroke-ivory';

  const renderGroup = (suffix: string) => (
    <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      {items.map((word, index) => (
        <span key={`${suffix}-${index}`} className="flex items-center gap-8 sm:gap-12">
          <span
            className={`font-display text-[clamp(2.25rem,6vw,5.5rem)] font-extrabold leading-none tracking-tight whitespace-nowrap ${strokeClass}`}
          >
            {word}
          </span>
          <span
            aria-hidden="true"
            className="text-xl text-[#FFB627] sm:text-2xl"
          >
            •
          </span>
        </span>
      ))}
    </div>
  );

  if (prefersReducedMotion) {
    return (
      <div
        aria-label={label}
        className="border-y border-white/10 bg-[#0A0A0F] py-5 overflow-x-auto no-scrollbar"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-8 px-4 sm:px-6 lg:px-10">
          {items.map((word) => (
            <span
              key={word}
              className={`font-display text-2xl font-extrabold tracking-tight whitespace-nowrap sm:text-4xl ${strokeClass}`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label={label}
      className="marquee-group relative overflow-hidden border-y border-white/10 bg-[#0A0A0F] py-5 select-none sm:py-7"
    >
      <div
        className={`flex w-max ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
      >
        {renderGroup('a')}
        {renderGroup('b')}
      </div>
    </div>
  );
}
