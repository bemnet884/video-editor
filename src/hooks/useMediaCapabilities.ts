import { useEffect, useState } from 'react';

interface NetworkInformation extends EventTarget {
  saveData?: boolean;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
}

interface MediaCapabilitiesState {
  canHover: boolean;
  prefersReducedMotion: boolean;
  shouldAutoplayHero: boolean;
}

/**
 * Detects input modality ((hover: hover)), prefers-reduced-motion, viewport width,
 * and NetworkInformation (saveData / effectiveType) so video playback respects
 * slow mobile connections and accessibility preferences.
 */
export function useMediaCapabilities(): MediaCapabilitiesState {
  const [state, setState] = useState<MediaCapabilitiesState>({
    canHover: false,
    prefersReducedMotion: false,
    shouldAutoplayHero: false,
  });

  useEffect(() => {
    const hoverQuery = window.matchMedia('(hover: hover)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopQuery = window.matchMedia('(min-width: 768px)');

    const evaluate = () => {
      const nav = navigator as Navigator & { connection?: NetworkInformation };
      const conn = nav.connection;
      const saveData = Boolean(conn?.saveData);
      const effectiveType = conn?.effectiveType;
      const slowConnection =
        effectiveType !== undefined && effectiveType !== '4g';

      const reduced = motionQuery.matches;
      const isDesktopOrTablet = desktopQuery.matches;

      setState({
        canHover: hoverQuery.matches,
        prefersReducedMotion: reduced,
        // Autoplay hero video only on tablet/desktop with fast network and no reduced-motion preference
        shouldAutoplayHero:
          !reduced && isDesktopOrTablet && !saveData && !slowConnection,
      });
    };

    evaluate();

    hoverQuery.addEventListener('change', evaluate);
    motionQuery.addEventListener('change', evaluate);
    desktopQuery.addEventListener('change', evaluate);

    return () => {
      hoverQuery.removeEventListener('change', evaluate);
      motionQuery.removeEventListener('change', evaluate);
      desktopQuery.removeEventListener('change', evaluate);
    };
  }, []);

  return state;
}
