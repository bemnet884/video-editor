import heroShowreelPoster from '@/src/assets/images/hero_showreel_poster_1794744778709.jpg';
import workWeddingPoster from '@/src/assets/images/work_wedding_film_1794744778907.jpg';
import workMusicPoster from '@/src/assets/images/work_music_video_1794744779114.jpg';
import workCommercialPoster from '@/src/assets/images/work_commercial_ad_1794744780366.jpg';
import workEventPoster from '@/src/assets/images/work_live_event_1794744779843.jpg';
import gradeCinemaScene from '@/src/assets/images/grade_cinema_scene_1794744780841.jpg';
import reelVerticalUrban from '@/src/assets/images/reel_vertical_urban_1794744781352.jpg';
import aboutEditorPortrait from '@/src/assets/images/about_editor_portrait_1794744781112.jpg';

export type ProjectCategory =
  | 'All'
  | 'Weddings'
  | 'Music Videos'
  | 'Ads'
  | 'Social'
  | 'Events';

export interface VideoProject {
  id: string;
  indexNumber: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  duration: string;
  client: string;
  description: string;
  posterUrl: string;
  videoUrl: string;
}

export interface FeaturedChapter {
  id: string;
  number: string;
  label: string;
  title: string;
  body: string;
  timecode: string;
}

export interface MosaicTile {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  posterUrl: string;
  videoUrl: string;
  layoutClass: string;
}

export interface ReelClip {
  id: string;
  index: string;
  title: string;
  platform: string;
  duration: string;
  posterUrl: string;
  videoUrl: string;
  staggerClass: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  turnaround: string;
}

export interface TimelineTrack {
  trackLabel: string;
  stepTitle: string;
  durationTag: string;
  description: string;
  startPercent: number;
  widthPercent: number;
  toneClass: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

/**
 * ============================================================================
 * EDITOR PROFILE & CONTACT DETAILS
 * Replace Bem B., email, messenger URLs, and video URLs with your own.
 * ============================================================================
 */
export const EDITOR_PROFILE = {
  name: 'Bem B.',
  tagline: 'Video editor / weddings, music videos, brands',
  showreelTitle: '2026 Director & Editor Showreel',
  showreelCategory: 'Showreel',
  showreelDescription:
    'Selected narrative cuts, music promos, luxury commercials, and wedding highlights edited and graded in DaVinci Resolve.',
  showreelPoster: heroShowreelPoster,
  showreelVideo:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  aboutPortrait: aboutEditorPortrait,
  aboutHeadline: 'Cutting for emotion, rhythm, and silence.',
  aboutCopy:
    'I partner with directors, wedding filmmakers, and independent brands to shape raw multi-camera footage into cinema that lingers. Eight years at the timeline across narrative cuts, sound design, and film-emulation grading.',
  contactHeadline: "Let's make something people remember.",
  email: 'hello@bemb-edit.com',
  whatsappUrl:
    'https://wa.me/15550199284?text=Hi%20Bem%2C%20I%20would%20like%20to%20book%20an%20edit.',
  telegramUrl: 'https://t.me/bemb_edit',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Vimeo', href: 'https://vimeo.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
  ],
};

export const CATEGORIES: ProjectCategory[] = [
  'All',
  'Weddings',
  'Music Videos',
  'Ads',
  'Social',
  'Events',
];

export const MARQUEE_DISCIPLINES = [
  'WEDDINGS',
  'MUSIC VIDEOS',
  'ADS',
  'REELS',
  'EVENTS',
];

export const MARQUEE_TOOLS = [
  'PREMIERE PRO',
  'DAVINCI RESOLVE',
  'AFTER EFFECTS',
  'CAPCUT',
];

/**
 * ============================================================================
 * SELECTED WORK INDEX (01 - 06)
 * ============================================================================
 */
export const SELECTED_WORK: VideoProject[] = [
  {
    id: 'villa-cetinale-vows',
    indexNumber: '01',
    title: 'Villa Cetinale — Golden Vows',
    category: 'Weddings',
    year: '2026',
    duration: '04:18',
    client: 'Elena & Marco',
    description:
      'Anamorphic Tuscan wedding highlight paced around live ceremony vows and string stems.',
    posterUrl: workWeddingPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 'concrete-echoes',
    indexNumber: '02',
    title: 'Nora Vale — Concrete Echoes',
    category: 'Music Videos',
    year: '2026',
    duration: '03:42',
    client: 'Aether Records',
    description:
      'Single-spotlight warehouse performance cut with beat-locked speed ramps and 35mm grain.',
    posterUrl: workMusicPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  {
    id: 'krono-basalt-edition',
    indexNumber: '03',
    title: 'Krono Atelier — Basalt',
    category: 'Ads',
    year: '2026',
    duration: '00:45',
    client: 'Krono Horology',
    description:
      'Macro luxury timepiece spot driven by foley sound design and clean editorial titles.',
    posterUrl: workCommercialPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'afterhours-street-cut',
    indexNumber: '04',
    title: 'Afterhours Street Cut',
    category: 'Social',
    year: '2026',
    duration: '01:28',
    client: 'District Skate Co.',
    description:
      'High-retention urban docu-cut built for dual horizontal YouTube and vertical social delivery.',
    posterUrl: heroShowreelPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 'monolith-warehouse-live',
    indexNumber: '05',
    title: 'Monolith Warehouse Live',
    category: 'Events',
    year: '2025',
    duration: '02:54',
    client: 'Monolith Sound',
    description:
      'Multi-camera live electronic festival film blending stage atmospherics and soundboard stems.',
    posterUrl: workEventPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 'pacific-overlook-drive',
    indexNumber: '06',
    title: 'Pacific Overlook — GT',
    category: 'Ads',
    year: '2025',
    duration: '02:10',
    client: 'Veloce Classics',
    description:
      'Coastal automotive brand film finished with custom Kodak 2383 halation and print curve.',
    posterUrl: gradeCinemaScene,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
];

/**
 * ============================================================================
 * FEATURED FILM (Sticky 21:9 Case Study + 3 Chapters)
 * ============================================================================
 */
export const FEATURED_FILM = {
  title: 'Pacific Overlook — Heritage Drive',
  category: 'Director’s Cut · 21:9 Anamorphic',
  posterUrl: gradeCinemaScene,
  videoUrl:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  chapters: [
    {
      id: 'concept',
      number: '01',
      label: 'Chapter I',
      title: 'Concept',
      timecode: '00:00:00:00',
      body: 'Start with atmosphere before dialogue. We structured the opening thirty seconds purely around coastal wind, exhaust resonance, and wide dusk frames so the viewer settles into the pace of the drive.',
    },
    {
      id: 'edit',
      number: '02',
      label: 'Chapter II',
      title: 'Edit',
      timecode: '00:00:44:12',
      body: 'Cut on physical motion rather than hard beats. Long 4-second scenic holds contrast against crisp 12-frame mechanical close-ups of shifting gears, mirrors, and asphalt sweeping beneath the chassis.',
    },
    {
      id: 'final-look',
      number: '03',
      label: 'Chapter III',
      title: 'Final Look',
      timecode: '00:01:38:08',
      body: 'Balanced S-Log3 plates inside DaVinci Wide Gamut, preserving deep shadow roll-off on dark green lacquer while warming the Pacific horizon highlights with subtle 35mm halation.',
    },
  ] satisfies FeaturedChapter[],
};

/**
 * ============================================================================
 * ASYMMETRIC MOSAIC GALLERY (12-column irregular grid, 4px gaps)
 * ============================================================================
 */
export const MOSAIC_TILES: MosaicTile[] = [
  {
    id: 'mosaic-1',
    title: 'Tuscan Terrace Sunset',
    category: 'Weddings',
    duration: '00:36',
    description: 'Golden hour 60fps slow-motion bridal walk.',
    posterUrl: workWeddingPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    layoutClass: 'col-span-12 md:col-span-7 aspect-[16/10]',
  },
  {
    id: 'mosaic-2',
    title: 'Alley Night Session',
    category: 'Social',
    duration: '00:28',
    description: 'Vertical rain-slicked street skate sequence.',
    posterUrl: reelVerticalUrban,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    layoutClass: 'col-span-12 md:col-span-5 md:row-span-2 aspect-[4/5] md:aspect-auto md:h-full',
  },
  {
    id: 'mosaic-3',
    title: 'Basalt Chronograph',
    category: 'Ads',
    duration: '00:22',
    description: 'Macro commercial lighting & foley pass.',
    posterUrl: workCommercialPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    layoutClass: 'col-span-6 md:col-span-3 aspect-square',
  },
  {
    id: 'mosaic-4',
    title: 'Warehouse Spotlight',
    category: 'Music Videos',
    duration: '00:48',
    description: 'Anamorphic live acoustic performance cut.',
    posterUrl: workMusicPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    layoutClass: 'col-span-6 md:col-span-4 aspect-square',
  },
  {
    id: 'mosaic-5',
    title: 'Monolith Live Stage Strip',
    category: 'Events',
    duration: '01:12',
    description: 'Wide-angle festival stage energy and light cues.',
    posterUrl: workEventPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    layoutClass: 'col-span-12 aspect-[21/9]',
  },
];

/**
 * ============================================================================
 * REELS FILM STRIP (5 Vertical 9:16 Clips)
 * ============================================================================
 */
export const REELS_STRIP: ReelClip[] = [
  {
    id: 'strip-1',
    index: '01',
    title: 'Rain-Slicked Alley',
    platform: 'Reels',
    duration: '00:28',
    posterUrl: reelVerticalUrban,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    staggerClass: 'md:translate-y-0',
  },
  {
    id: 'strip-2',
    index: '02',
    title: 'Basalt Watch Macro',
    platform: 'Shorts',
    duration: '00:19',
    posterUrl: workCommercialPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    staggerClass: 'md:translate-y-8',
  },
  {
    id: 'strip-3',
    index: '03',
    title: 'Tuscan Veil Reveal',
    platform: 'Reels',
    duration: '00:34',
    posterUrl: workWeddingPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    staggerClass: 'md:-translate-y-4',
  },
  {
    id: 'strip-4',
    index: '04',
    title: 'Studio Grade Breakdown',
    platform: 'Shorts',
    duration: '00:52',
    posterUrl: heroShowreelPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    staggerClass: 'md:translate-y-6',
  },
  {
    id: 'strip-5',
    index: '05',
    title: 'Monolith Opening Drop',
    platform: 'TikTok',
    duration: '00:24',
    posterUrl: workEventPoster,
    videoUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    staggerClass: 'md:-translate-y-2',
  },
];

/**
 * ============================================================================
 * BEFORE / AFTER COLOR GRADE COMPARISON
 * ============================================================================
 */
export const BEFORE_AFTER_DATA = {
  title: 'S-Log3 Plate to Kodak 2383 Print Grade',
  specs: 'DaVinci Resolve · Wide Gamut · Halation + 35mm Grain',
  imageUrl: gradeCinemaScene,
};

/**
 * ============================================================================
 * SERVICES (Typographic Expandable List)
 * ============================================================================
 */
export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Reels editing',
    description:
      'Hook-engineered vertical cuts with kinetic typography, rhythmic sound risers, and seamless transitions built for high retention.',
    turnaround: '24–48 hours',
  },
  {
    number: '02',
    title: 'YouTube editing',
    description:
      'Long-form narrative pacing, multi-cam assembly, clean dialogue mixing, and subtle motion callouts that hold viewer attention.',
    turnaround: '3–4 days',
  },
  {
    number: '03',
    title: 'Wedding highlights',
    description:
      'Emotion-first highlight films weaving ceremony vows, ambient room tone, and licensed scores into timeless family keepsakes.',
    turnaround: '7–10 days',
  },
  {
    number: '04',
    title: 'Color grading',
    description:
      'Shot-matched exposure balancing, natural skin-tone preservation, and custom film emulation inside DaVinci Resolve.',
    turnaround: '48 hours',
  },
  {
    number: '05',
    title: 'Motion graphics',
    description:
      'Editorial title sequences, lower thirds, kinetic captions, and bespoke After Effects transitions tailored to your brand.',
    turnaround: '2–3 days',
  },
];

/**
 * ============================================================================
 * PROCESS (Multi-Track Editing Timeline)
 * ============================================================================
 */
export const PROCESS_TRACKS: TimelineTrack[] = [
  {
    trackLabel: 'V1 · INGEST',
    stepTitle: 'Brief',
    durationTag: 'Day 01',
    description: 'Upload raw camera cards, audio stems, and visual references.',
    startPercent: 0,
    widthPercent: 28,
    toneClass: 'bg-[#1D1D28] border-[#F5F3EE]/25 text-[#F5F3EE]',
  },
  {
    trackLabel: 'V2 · ASSEMBLY',
    stepTitle: 'Edit',
    durationTag: 'Days 02–04',
    description: 'Story structure, rhythm cuts, sound design, and first color pass.',
    startPercent: 24,
    widthPercent: 34,
    toneClass: 'bg-[#262018] border-[#FFB627]/45 text-[#F5F3EE]',
  },
  {
    trackLabel: 'A1 · NOTES',
    stepTitle: 'Feedback',
    durationTag: 'Day 05',
    description: 'Frame-accurate review link with two structured polish rounds.',
    startPercent: 52,
    widthPercent: 26,
    toneClass: 'bg-[#1B1F27] border-[#F5F3EE]/25 text-[#F5F3EE]',
  },
  {
    trackLabel: 'M1 · EXPORT',
    stepTitle: 'Delivery',
    durationTag: 'Final',
    description: '4K masters, 9:16 vertical deliverables, and clean audio stems.',
    startPercent: 74,
    widthPercent: 26,
    toneClass: 'bg-[#FFB627] border-[#FFB627] text-[#0A0A0F]',
  },
];

/**
 * ============================================================================
 * TESTIMONIALS
 * ============================================================================
 */
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'quote-1',
    quote:
      'The first cut hit us in silence. Every vow landed between breaths, and the sunset color grade turned raw footage into genuine cinema.',
    author: 'Claire Beaumont',
    role: 'Creative Producer',
    company: 'Atelier Lumière Weddings',
  },
  {
    id: 'quote-2',
    quote:
      'Zero fluff, surgical pacing. Our 45-second watch launch film outperformed every previous paid social campaign we ran this year.',
    author: 'Daniel Park',
    role: 'Brand Director',
    company: 'Krono Horology',
  },
  {
    id: 'quote-3',
    quote:
      'Having a dedicated editor who understands musicality doubled our YouTube retention while freeing up ten hours of studio time every week.',
    author: 'Sofia Alvarez',
    role: 'Recording Artist',
    company: 'Aether Sessions',
  },
];
