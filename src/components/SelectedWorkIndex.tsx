import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import { CATEGORIES, ProjectCategory, SELECTED_WORK, VideoProject } from '@/src/data/projects';
import { useMediaCapabilities } from '@/src/hooks/useMediaCapabilities';

interface SelectedWorkIndexProps {
  onOpenProject: (project: VideoProject) => void;
}

export function SelectedWorkIndex({ onOpenProject }: SelectedWorkIndexProps) {
  const { canHover, prefersReducedMotion } = useMediaCapabilities();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [hoveredProject, setHoveredProject] = useState<VideoProject | null>(null);
  const [expandedTouchId, setExpandedTouchId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Floating preview & Play cursor coordinates (desktop hover only)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const previewX = useSpring(rawX, { stiffness: 260, damping: 28 });
  const previewY = useSpring(rawY, { stiffness: 260, damping: 28 });

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return SELECTED_WORK;
    return SELECTED_WORK.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canHover) return;
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  };

  const handleRowActivate = (project: VideoProject) => {
    if (canHover) {
      onOpenProject(project);
      return;
    }
    // On touch devices, tapping a row expands it inline to show poster + Play button
    setExpandedTouchId((prev) => (prev === project.id ? null : project.id));
  };

  return (
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className="relative py-20 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        {/* Section Header + Text-Link Category Filters */}
        <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-[#FFB627] uppercase">
              01 / Selected Index
            </p>
            <h2
              id="selected-work-heading"
              className="mt-2 font-display text-[clamp(2rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-[#F5F3EE]"
            >
              Selected work
            </h2>
          </div>

          <nav
            aria-label="Filter projects by category"
            className="-mx-4 flex items-center gap-1 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:flex-wrap sm:gap-4 sm:px-0"
          >
            {CATEGORIES.map((category, idx) => {
              const isActive = category === activeCategory;
              return (
                <div key={category} className="flex items-center gap-4 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(category);
                      setExpandedTouchId(null);
                    }}
                    aria-pressed={isActive}
                    className={`relative inline-flex min-h-[44px] items-center px-1 font-mono text-xs tracking-[0.1em] uppercase whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627] ${
                      isActive
                        ? 'text-[#FFB627]'
                        : 'text-[#F5F3EE]/60 hover:text-[#F5F3EE]'
                    }`}
                  >
                    <span>{category}</span>
                    {isActive && (
                      <motion.span
                        layoutId="workFilterUnderline"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute right-0 bottom-2 left-0 h-px bg-[#FFB627]"
                      />
                    )}
                  </button>
                  {idx < CATEGORIES.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden font-mono text-xs text-white/20 sm:inline"
                    >
                      /
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Hairline Index Rows */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoveredProject(null)}
          className={`relative border-t border-white/10 ${
            canHover && hoveredProject ? 'cursor-none' : ''
          }`}
        >
          {filteredProjects.map((project) => {
            const isExpanded = expandedTouchId === project.id;
            const isHovered = hoveredProject?.id === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => canHover && setHoveredProject(project)}
                onMouseLeave={() => canHover && setHoveredProject(null)}
                className="border-b border-white/10 transition-colors hover:border-[#FFB627]/50"
              >
                <button
                  type="button"
                  onClick={() => handleRowActivate(project)}
                  aria-expanded={!canHover ? isExpanded : undefined}
                  className={`group flex min-h-[76px] w-full flex-col gap-2 py-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627] md:flex-row md:items-baseline md:justify-between md:py-7 ${
                    canHover && hoveredProject ? 'cursor-none' : ''
                  }`}
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-xs tabular-nums text-[#FFB627] sm:text-sm">
                      {project.indexNumber}
                    </span>
                    <h3
                      className={`font-display text-[clamp(1.5rem,3.6vw,3.4rem)] font-extrabold leading-[1.02] tracking-tight transition-transform duration-200 ${
                        isHovered
                          ? 'translate-x-2 text-[#FFB627]'
                          : 'text-[#F5F3EE] group-hover:text-[#FFB627]'
                      }`}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between gap-6 pl-8 font-mono text-xs tracking-wider text-[#F5F3EE]/60 uppercase md:pl-0">
                    <span>{project.category}</span>
                    <span aria-hidden="true" className="text-white/25">
                      —
                    </span>
                    <span className="tabular-nums">{project.year}</span>
                    <span className="hidden tabular-nums text-[#F5F3EE]/40 sm:inline">
                      {project.duration}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-[#FFB627] opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {/* Touch Inline Drawer: Poster + Description + Play Button */}
                <AnimatePresence initial={false}>
                  {!canHover && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-4 pb-6 sm:grid-cols-12 sm:items-center sm:gap-6">
                        <div className="relative aspect-video w-full overflow-hidden bg-black sm:col-span-5">
                          <img
                            src={project.posterUrl}
                            alt={`${project.title} still frame`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="sm:col-span-7">
                          <p className="font-mono text-xs text-[#FFB627] uppercase">
                            {project.client} · {project.duration}
                          </p>
                          <p className="mt-2 text-base leading-relaxed text-[#F5F3EE]/80">
                            {project.description}
                          </p>
                          <button
                            type="button"
                            onClick={() => onOpenProject(project)}
                            className="mt-4 inline-flex min-h-[44px] items-center gap-2 bg-[#FFB627] px-5 py-2.5 font-mono text-xs font-medium tracking-wider text-[#0A0A0F] uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFB627]"
                          >
                            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                            <span>Play film</span>
                          </button>
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

      {/* Desktop Cursor-Following Floating Video Preview + Circle "Play" Cursor */}
      {canHover && hoveredProject && (
        <>
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              style={{
                x: previewX,
                y: previewY,
                translateX: '24px',
                translateY: '-55%',
              }}
              className="pointer-events-none fixed top-0 left-0 z-30 hidden w-[320px] overflow-hidden bg-black lg:block"
            >
              <div className="aspect-video w-full">
                <video
                  key={hoveredProject.id}
                  src={hoveredProject.videoUrl}
                  poster={hoveredProject.posterUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between bg-[#0A0A0F] px-3 py-2 font-mono text-[11px] text-[#F5F3EE]/80">
                <span>{hoveredProject.client}</span>
                <span className="tabular-nums text-[#FFB627]">
                  {hoveredProject.duration}
                </span>
              </div>
            </motion.div>
          )}

          {/* Custom Circle "Play" Cursor */}
          <motion.div
            aria-hidden="true"
            style={{
              x: previewX,
              y: previewY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className="pointer-events-none fixed top-0 left-0 z-40 hidden h-20 w-20 items-center justify-center rounded-full bg-[#FFB627] font-mono text-xs font-medium tracking-widest text-[#0A0A0F] uppercase lg:flex"
          >
            Play
          </motion.div>
        </>
      )}
    </section>
  );
}
