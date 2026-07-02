import React, { createContext, useContext, useMemo } from 'react';
import { useScroll, useVelocity, useSpring, MotionValue } from 'motion/react';

interface ScrollContextType {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  scrollVelocity: MotionValue<number>;
  smoothVelocity: MotionValue<number>;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const value = useMemo(() => ({
    scrollY,
    scrollYProgress,
    scrollVelocity,
    smoothVelocity
  }), [scrollY, scrollYProgress, scrollVelocity, smoothVelocity]);

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useSharedScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useSharedScroll must be used within a ScrollProvider');
  }
  return context;
}
