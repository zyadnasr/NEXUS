import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { useMouse } from "./MouseManager";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = "",
  onClick,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, mouseY } = useMouse();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const cardCenterX = useMotionValue(0);
  const cardCenterY = useMotionValue(0);
  const cardWidth = useMotionValue(0);
  const cardHeight = useMotionValue(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateCardMetrics = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        cardCenterX.set(rect.left + rect.width / 2);
        cardCenterY.set(rect.top + rect.height / 2);
        cardWidth.set(rect.width);
        cardHeight.set(rect.height);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCardMetrics();
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    window.addEventListener("scroll", updateCardMetrics, { passive: true });

    // Delay slightly to ensure layout is complete
    const timeoutId = setTimeout(updateCardMetrics, 200);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateCardMetrics);
      clearTimeout(timeoutId);
    };
  }, [cardCenterX, cardCenterY, cardWidth, cardHeight, prefersReducedMotion]);

  const maxDistance = 500;

  // Calculate distance
  const dx = useTransform(
    [mouseX, cardCenterX],
    ([mx, cx]) => (mx as number) - (cx as number),
  );
  const dy = useTransform(
    [mouseY, cardCenterY],
    ([my, cy]) => (my as number) - (cy as number),
  );

  const distance = useTransform([dx, dy], ([x, y]) => {
    return Math.sqrt((x as number) ** 2 + (y as number) ** 2);
  });

  const rotateXRaw = useTransform([dy, cardHeight, distance], ([y, h, d]) => {
    if ((h as number) === 0) return 0;
    const yPct = (y as number) / ((h as number) / 2);
    if ((d as number) > maxDistance) return 0;
    const falloff = 1 - Math.pow((d as number) / maxDistance, 2);
    return -yPct * 10 * falloff;
  });

  const rotateYRaw = useTransform([dx, cardWidth, distance], ([x, w, d]) => {
    if ((w as number) === 0) return 0;
    const xPct = (x as number) / ((w as number) / 2);
    if ((d as number) > maxDistance) return 0;
    const falloff = 1 - Math.pow((d as number) / maxDistance, 2);
    return xPct * 10 * falloff;
  });

  const scaleRaw = useTransform([distance], ([d]) => {
    if ((d as number) > maxDistance) return 1;
    const falloff = 1 - (d as number) / maxDistance;
    return 1 + 0.04 * falloff;
  });

  // Apply spring physics for smooth interpolation
  const rotateX = useSpring(rotateXRaw, { stiffness: 70, damping: 25 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 70, damping: 25 });
  const scale = useSpring(scaleRaw, { stiffness: 70, damping: 25 });

  const reflectionX = useTransform([dx, cardWidth], ([x, w]) => {
    if ((w as number) === 0) return 50;
    return ((x as number) / (w as number)) * 100 + 50;
  });

  const reflectionY = useTransform([dy, cardHeight], ([y, h]) => {
    if ((h as number) === 0) return 50;
    return ((y as number) / (h as number)) * 100 + 50;
  });

  const reflectionOpacity = useTransform([distance], ([d]) => {
    if ((d as number) > maxDistance) return 0;
    return (1 - (d as number) / maxDistance) * 0.15;
  });

  const backgroundGradient = useMotionTemplate`radial-gradient(circle at ${reflectionX}% ${reflectionY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`;

  const shadowX = useTransform([dx], ([x]) => (x as number) / -20);
  const shadowY = useTransform([dy], ([y]) => (y as number) / -20);
  const shadowOpacity = useTransform([distance], ([d]) => {
    if ((d as number) > maxDistance) return 0;
    return (1 - (d as number) / maxDistance) * 0.8;
  });
  const boxShadow = useMotionTemplate`${shadowX}px ${shadowY}px 50px rgba(0,0,0, ${shadowOpacity})`;

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      style={prefersReducedMotion ? {} : {
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        boxShadow,
      }}
      className={`relative w-full rounded-[2.5rem] perspective-[1500px] transform-gpu ${className}`}
    >
      <div
        className="w-full h-full relative transform-gpu"
        style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
      >
        {children}

        {/* Glossy reflection */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none rounded-[2.5rem] mix-blend-overlay"
            style={{
              background: backgroundGradient,
              opacity: reflectionOpacity,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
