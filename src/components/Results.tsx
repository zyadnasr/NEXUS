import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { animationManager } from '../utils/animationManager';

const Counter = React.memo(function Counter({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(spanRef, { once: true, margin: "-100px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      if (spanRef.current) {
        spanRef.current.innerText = `${end}${suffix}`;
      }
      return;
    }

    let startTime: number | null = null;
    let unsubscribe: (() => void) | null = null;

    const tick = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * end);

      if (spanRef.current) {
        spanRef.current.innerText = `${currentCount}${suffix}`;
      }

      if (progress >= 1 && unsubscribe) {
        unsubscribe();
      }
    };

    unsubscribe = animationManager.subscribe(tick);
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isInView, end, duration, suffix, prefersReducedMotion]);

  return <span ref={spanRef}>{prefersReducedMotion ? end : 0}{suffix}</span>;
});

const stats = [
  { value: 250, suffix: "+", label: "Projects Delivered" },
  { value: 1, suffix: "B+", label: "Revenue Generated", prefix: "$" },
  { value: 15, suffix: "x+", label: "Average ROAS" },
  { value: 99, suffix: "%", label: "Happy Clients" },
];

export default function Results() {
  return (
    <section id="results" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 border-y border-white/5" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold text-white mb-2">
                {stat.prefix}<Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-primary text-sm md:text-base font-medium tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
