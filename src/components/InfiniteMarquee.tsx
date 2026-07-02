import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, wrap, useInView } from 'motion/react';
import { useSharedScroll } from './ScrollManager';
import { animationManager } from '../utils/animationManager';

interface InfiniteMarqueeProps {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}

export default function InfiniteMarquee({ children, baseVelocity = 15, className = '' }: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "100px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const baseX = useMotionValue(0);
  const { smoothVelocity } = useSharedScroll();
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const hovered = useRef(false);
  const directionFactor = useRef<number>(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Only animate if in view and reduced motion is NOT preferred
    if (!isInView || prefersReducedMotion) return;

    const update = (time: number, delta: number) => {
      // Limit delta to avoid huge jumps on frame drops
      const adjustedDelta = Math.min(delta, 100);
      const velocity = velocityFactor.get();

      let moveBy = directionFactor.current * baseVelocity * (adjustedDelta / 1000);

      if (hovered.current) {
        moveBy *= 0.2;
      }

      if (velocity < 0) {
        directionFactor.current = -1;
      } else if (velocity > 0) {
        directionFactor.current = 1;
      }

      moveBy *= 1 + Math.abs(velocity) * 0.1;

      baseX.set(baseX.get() + moveBy);
    };

    return animationManager.subscribe(update);
  }, [baseX, baseVelocity, velocityFactor, isInView, prefersReducedMotion]);

  // wrap between -50% and 0%
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden flex whitespace-nowrap flex-nowrap ${className}`} 
      onMouseEnter={() => { hovered.current = true; }} 
      onMouseLeave={() => { hovered.current = false; }}
    >
      <motion.div 
        className="flex whitespace-nowrap flex-nowrap" 
        style={prefersReducedMotion ? {} : { x, willChange: "transform" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
