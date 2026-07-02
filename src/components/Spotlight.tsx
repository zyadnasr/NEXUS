import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionTemplate } from 'motion/react';
import { useMouse } from './MouseManager';

export default function Spotlight() {
  const { mouseX, mouseY } = useMouse();
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const background = useMotionTemplate`radial-gradient(800px circle at ${smoothX}px ${smoothY}px, rgba(59, 130, 246, 0.08), transparent 80%)`;

  if (!isMounted || prefersReducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      style={{ background }}
    />
  );
}
