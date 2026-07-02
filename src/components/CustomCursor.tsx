import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useMouse } from './MouseManager';
import { animationManager } from '../utils/animationManager';

export default function CustomCursor() {
  const { mouseX, mouseY } = useMouse();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Smooth position for the outer ring
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isButton = target.closest('button') || target.closest('a');
      const isCard = target.closest('.group');
      const isImage = target.closest('img');

      if (isButton) {
        setIsHovering(true);
        setHoverType('button');
      } else if (isCard) {
        setIsHovering(true);
        setHoverType('card');
      } else if (isImage) {
        setIsHovering(true);
        setHoverType('image');
      } else {
        setIsHovering(false);
        setHoverType(null);
      }
    };

    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Update outer ring position with easing (lerp) subscribed to centralized animationManager
  useEffect(() => {
    const render = () => {
      const targetX = mouseX.get();
      const targetY = mouseY.get();

      if (prefersReducedMotion) {
        ringPos.current.x = targetX;
        ringPos.current.y = targetY;
      } else {
        ringPos.current.x += (targetX - ringPos.current.x) * 0.15;
        ringPos.current.y += (targetY - ringPos.current.y) * 0.15;
      }
      
      const ringElement = document.getElementById('cursor-ring');
      if (ringElement) {
        ringElement.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const unsubscribe = animationManager.subscribe(render);
    return () => unsubscribe();
  }, [mouseX, mouseY, prefersReducedMotion]);

  const dotSize = 6;
  const getRingSize = () => {
    if (isClicking) return 24;
    if (isHovering) {
      if (hoverType === 'button') return 60;
      if (hoverType === 'card') return 80;
      if (hoverType === 'image') return 50;
    }
    return 40;
  };

  const getRingOpacity = () => {
    if (prefersReducedMotion) return 0; // Hide outer ring if prefers-reduced-motion is active
    if (isClicking) return 0.8;
    if (isHovering) {
      if (hoverType === 'card') return 0.2;
    }
    return 0.5;
  };

  const ringTransition = prefersReducedMotion ? { duration: 0 } : {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 0.5
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className="bg-white rounded-full transition-transform duration-100 ease-out"
          style={{ 
            width: dotSize, 
            height: dotSize,
            transform: isHovering && hoverType !== 'image' ? 'scale(0)' : 'scale(1)'
          }}
        />
      </motion.div>
      
      <div 
        id="cursor-ring"
        className="fixed top-0 left-0 pointer-events-none z-[99] hidden md:block"
        style={{
          // Set initial layout properties
          transform: 'translate3d(0px, 0px, 0px) translate(-50%, -50%)',
        }}
      >
        <motion.div 
          className="rounded-full border-[1.5px] flex items-center justify-center backdrop-blur-[2px]"
          animate={{
            width: getRingSize(),
            height: getRingSize(),
            opacity: getRingOpacity(),
            scale: isClicking ? 0.8 : 1,
            borderColor: isHovering ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.5)',
            backgroundColor: isHovering && hoverType !== 'image' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59,130,246,0)',
            boxShadow: isHovering ? '0 0 20px rgba(59, 130, 246, 0.4)' : '0 0 0px rgba(0,0,0,0)'
          }}
          transition={ringTransition}
        >
          {hoverType === 'image' && !prefersReducedMotion && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] font-bold tracking-widest uppercase text-white drop-shadow-md"
            >
              View
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}
