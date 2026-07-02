import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useMotionValue, MotionValue } from 'motion/react';

interface MouseContextType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  mouseXPct: MotionValue<number>;
  mouseYPct: MotionValue<number>;
}

const MouseContext = createContext<MouseContextType | null>(null);

export function MouseProvider({ children }: { children: React.ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXPct = useMotionValue(50);
  const mouseYPct = useMotionValue(50);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseX.set(x);
      mouseY.set(y);
      mouseXPct.set((x / window.innerWidth) * 100);
      mouseYPct.set((y / window.innerHeight) * 100);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, mouseXPct, mouseYPct]);

  const value = useMemo(() => ({
    mouseX,
    mouseY,
    mouseXPct,
    mouseYPct
  }), [mouseX, mouseY, mouseXPct, mouseYPct]);

  return (
    <MouseContext.Provider value={value}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse() {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error('useMouse must be used within a MouseProvider');
  }
  return context;
}
