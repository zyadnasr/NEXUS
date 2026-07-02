import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { animationManager } from '../utils/animationManager';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    const unsubscribe = animationManager.subscribe((time) => {
      lenis.raf(time);
    });

    return () => {
      unsubscribe();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
