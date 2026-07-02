import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  elementType?: React.ElementType;
}

function SplitText({
  text,
  className = "",
  delay = 0,
  elementType: Element = "div",
}: SplitTextProps) {
  const textRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useLayoutEffect(() => {
    if (!textRef.current) return;

    if (prefersReducedMotion) {
      return;
    }

    let split: SplitType | null = null;
    const ctx = gsap.context(() => {});

    const init = async () => {
      await document.fonts.ready;

      if (!textRef.current) return;

      ctx.add(() => {
        split = new SplitType(textRef.current!, {
          types: "lines,words,chars",
        });

        gsap.set(split.lines, {
          overflow: "hidden",
          display: "block",
        });

        const el = textRef.current;

        const style = getComputedStyle(el);
        const hasBgClipText = style.backgroundClip === 'text' || (style as unknown as {
        WebkitBackgroundClip ?: string }).WebkitBackgroundClip === 'text';

        if (hasBgClipText && style.backgroundImage && style.backgroundImage !== 'none') {
          split.chars?.forEach((char) => {

            gsap.set(char, {
              backgroundImage: style.backgroundImage,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            });
        });
      }

        gsap.set(split.chars, {
          y: "110%",
          opacity: 0,
          filter: "blur(8px)",
        });

        gsap.to(split.chars, {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 95%",
            once: true,
            invalidateOnRefresh: true,
          },
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.02,
          ease: "power4.out",
          delay,
        });
      });
    };

    init();

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    
    resizeObserver.observe(textRef.current);

    return () => {
      resizeObserver.disconnect();
      ctx.revert();
      split?.revert();
    };
  }, [delay, prefersReducedMotion]);

  return (
    <Element ref={textRef} className={className}>
      {text}
    </Element>
  );
}

export default React.memo(SplitText);
