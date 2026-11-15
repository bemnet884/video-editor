import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import {
  EDITOR_PROFILE,
  MARQUEE_DISCIPLINES,
  MARQUEE_TOOLS,
  SELECTED_WORK,
  VideoProject,
} from '@/src/data/projects';
import { Navbar } from '@/src/components/Navbar';
import { Hero } from '@/src/components/Hero';
import { MarqueeStrip } from '@/src/components/MarqueeStrip';
import { SelectedWorkIndex } from '@/src/components/SelectedWorkIndex';
import { FeaturedFilmSection } from '@/src/components/FeaturedFilmSection';
import { MosaicGallery } from '@/src/components/MosaicGallery';
import { ReelsFilmStrip } from '@/src/components/ReelsFilmStrip';
import { BeforeAfterSlider } from '@/src/components/BeforeAfterSlider';
import { ServicesTypographic } from '@/src/components/ServicesTypographic';
import { ProcessTimeline } from '@/src/components/ProcessTimeline';
import { TestimonialsMinimal } from '@/src/components/TestimonialsMinimal';
import { AboutSplit } from '@/src/components/AboutSplit';
import { ContactSection } from '@/src/components/ContactSection';
import { StickyHireBar } from '@/src/components/StickyHireBar';
import { Footer } from '@/src/components/Footer';
import { ModalMedia, VideoModal } from '@/src/components/VideoModal';

export default function App() {
  const [modalMedia, setModalMedia] = useState<ModalMedia | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  const openProjectModal = (project: VideoProject) => {
    const idx = SELECTED_WORK.findIndex((p) => p.id === project.id);
    setActiveProjectIndex(idx >= 0 ? idx : null);
    setModalMedia({
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      videoUrl: project.videoUrl,
      posterUrl: project.posterUrl,
      client: project.client,
      duration: project.duration,
      year: project.year,
    });
  };

  const openStandaloneModal = (media: ModalMedia) => {
    setActiveProjectIndex(null);
    setModalMedia(media);
  };

  const handlePrevProject = () => {
    if (activeProjectIndex === null) return;
    const prevIdx =
      (activeProjectIndex - 1 + SELECTED_WORK.length) % SELECTED_WORK.length;
    openProjectModal(SELECTED_WORK[prevIdx]);
  };

  const handleNextProject = () => {
    if (activeProjectIndex === null) return;
    const nextIdx = (activeProjectIndex + 1) % SELECTED_WORK.length;
    openProjectModal(SELECTED_WORK[nextIdx]);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="cinema-grid-bg relative min-h-screen bg-[#0A0A0F] text-[#F5F3EE]">
        {/* Very low-opacity film-grain overlay */}
        <div
          aria-hidden="true"
          className="film-grain pointer-events-none fixed inset-0 z-40 opacity-[0.035]"
        />

        <Navbar />

        <main>
          {/* 1. Hero */}
          <Hero
            onWatchShowreel={() =>
              openStandaloneModal({
                title: EDITOR_PROFILE.showreelTitle,
                category: EDITOR_PROFILE.showreelCategory,
                description: EDITOR_PROFILE.showreelDescription,
                videoUrl: EDITOR_PROFILE.showreelVideo,
                posterUrl: EDITOR_PROFILE.showreelPoster,
                client: EDITOR_PROFILE.name,
                duration: '01:45',
              })
            }
          />

          {/* 2. Disciplines Marquee */}
          <MarqueeStrip
            items={MARQUEE_DISCIPLINES}
            direction="left"
            label="Editing disciplines"
            accent="ivory"
          />

          {/* 3. Selected Work Index */}
          <SelectedWorkIndex onOpenProject={openProjectModal} />

          {/* 4. Featured Film Sticky 21:9 Case Study */}
          <FeaturedFilmSection onOpenModal={openStandaloneModal} />

          {/* 5. Asymmetric Mosaic Gallery */}
          <MosaicGallery onOpenModal={openStandaloneModal} />

          {/* 6. Reels 35mm Film Strip */}
          <ReelsFilmStrip onOpenModal={openStandaloneModal} />

          {/* 7. Before / After Scrubber */}
          <BeforeAfterSlider />

          {/* 8. Typographic Services List */}
          <ServicesTypographic />

          {/* 9. Multi-Track Editing Timeline Process */}
          <ProcessTimeline />

          {/* 10. Tools Reversed Marquee */}
          <MarqueeStrip
            items={MARQUEE_TOOLS}
            direction="right"
            label="Post-production software"
            accent="gold"
          />

          {/* 11. Oversized Quote Testimonials */}
          <TestimonialsMinimal />

          {/* 12. Asymmetric Grayscale-to-Color About Split */}
          <AboutSplit />

          {/* 13. Contact */}
          <ContactSection />
        </main>

        <Footer />
        <StickyHireBar />

        <VideoModal
          media={modalMedia}
          onClose={() => {
            setModalMedia(null);
            setActiveProjectIndex(null);
          }}
          hasPagination={activeProjectIndex !== null}
          onPrev={handlePrevProject}
          onNext={handleNextProject}
        />
      </div>
    </MotionConfig>
  );
}
