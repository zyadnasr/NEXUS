import { useEffect, useState, useRef } from 'react';
import { motion, useMotionTemplate, useSpring, useInView } from 'motion/react';
import { useMouse } from './MouseManager';

export default function FluidBackground() {
  const { mouseXPct, mouseYPct } = useMouse();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const smoothX = useSpring(mouseXPct, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseYPct, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const bgGradient = useMotionTemplate`radial-gradient(120% 120% at ${smoothX}% ${smoothY}%, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, rgba(0, 0, 0, 0) 100%)`;

  const pulseClass1 = isInView && !prefersReducedMotion ? 'animate-pulse' : '';
  const pulseClass2 = isInView && !prefersReducedMotion ? 'animate-pulse' : '';

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-background">
      {/* Base animated meshes */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className={`absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-primary/20 mix-blend-screen fluid-mesh ${pulseClass1}`} 
          style={{ animationDuration: '8s' }} 
        />
        <div 
          className={`absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 mix-blend-screen fluid-mesh ${pulseClass2}`} 
          style={{ animationDuration: '12s', animationDelay: '2s' }} 
        />
      </div>
      
      {/* Interactive cursor follow layer */}
      {isInView && !prefersReducedMotion && (
        <motion.div 
          className="absolute inset-0 z-10"
          style={{ background: bgGradient }}
        />
      )}
    </div>
  );
}
