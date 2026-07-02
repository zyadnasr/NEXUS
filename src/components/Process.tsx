import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
  Search,
  Lightbulb,
  Target,
  Palette,
  PenTool,
  Code2,
  Rocket,
  LineChart,
  TrendingUp,
} from "lucide-react";
import TiltCard from "./TiltCard";
import SplitText from "./SplitText";

const steps = [
  {
    id: "01",
    title: "Discover",
    icon: <Search size={24} />,
    desc: "We dive deep into your brand, market, and competitors.",
  },
  {
    id: "02",
    title: "Research",
    icon: <Lightbulb size={24} />,
    desc: "Unearthing insights and understanding your target audience's true needs.",
  },
  {
    id: "03",
    title: "Strategy",
    icon: <Target size={24} />,
    desc: "Crafting a comprehensive roadmap tailored to your specific growth objectives.",
  },
  {
    id: "04",
    title: "Brand Identity",
    icon: <Palette size={24} />,
    desc: "Defining the visual and verbal language that makes your brand unforgettable.",
  },
  {
    id: "05",
    title: "Content",
    icon: <PenTool size={24} />,
    desc: "Creating high-value, engaging narratives that capture attention and drive action.",
  },
  {
    id: "06",
    title: "Development",
    icon: <Code2 size={24} />,
    desc: "Building robust, scalable, and buttery-smooth digital experiences.",
  },
  {
    id: "07",
    title: "Launch",
    icon: <Rocket size={24} />,
    desc: "Executing a flawless go-to-market rollout to maximize initial impact.",
  },
  {
    id: "08",
    title: "Optimization",
    icon: <LineChart size={24} />,
    desc: "A/B testing, analyzing data, and refining funnels for peak performance.",
  },
  {
    id: "09",
    title: "Scale",
    icon: <TrendingUp size={24} />,
    desc: "Continuous improvement and aggressive marketing to drive exponential growth.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      className="py-32 relative bg-background overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute left-0 top-1/4 w-[300px] h-[600px] bg-primary/10 blur-[90px] pointer-events-none rounded-r-full" />
      <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] bg-accent/10 blur-[100px] pointer-events-none rounded-l-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Methodology
            </span>
          </motion.div>
          <div className="mb-8 flex flex-col items-center text-center">
            <SplitText
              text="How we"
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold mb-2 tracking-tight text-white leading-[1.1]"
            />
            <motion.h2
              initial={{ opacity: 0, y: 80, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.2,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[clamp(2.5rem,5vw,5.5rem)] font-bold leading-[1.1] tracking-tight bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent"
            >
              build empires.
            </motion.h2>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto pb-24">
          {/* Animated SVG Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 z-0">
            {/* Background Line */}
            <div className="absolute inset-0 bg-white/5 rounded-full" />
            {/* Glowing Active Line */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-accent to-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              style={{
                height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
              }}
            />
          </div>

          <div className="space-y-24 md:space-y-32 relative z-10 cards-container">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              // We estimate the trigger point for each step based on its index
              const stepTrigger = i / (steps.length - 1);

              return (
                <div
                  key={step.id}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content */}
                  <div
                    className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}
                  >
                    <StepContent
                      step={step}
                      progress={smoothProgress}
                      trigger={stepTrigger}
                      isEven={isEven}
                    />
                  </div>

                  {/* Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <StepNode
                      progress={smoothProgress}
                      trigger={stepTrigger}
                      icon={step.icon}
                    />
                  </div>

                  {/* Empty space for grid alignment on desktop */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepContent({
  step,
  progress,
  trigger,
  isEven,
}: {
  step: { id: string; title: string; icon: React.ReactNode; desc: string };
  progress: import('motion/react').MotionValue<number>;
  trigger: number;
  isEven: boolean;
}) {
  const opacity = useTransform(
    progress,
    [trigger - 0.15, trigger - 0.05],
    [0.3, 1],
  );
  const y = useTransform(progress, [trigger - 0.1, trigger], [30, 0]);
  const scale = useTransform(progress, [trigger - 0.1, trigger], [0.95, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`w-full ${isEven ? "origin-right" : "origin-left"}`}
    >
      <TiltCard>
        <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden group w-full bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="text-6xl font-sora font-black text-white/5 mb-4 tracking-tighter group-hover:text-primary/20 transition-colors duration-500">
            {step.id}
          </div>
          <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
            {step.title}
          </h3>
          <p className="text-text-secondary leading-relaxed font-light text-lg">
            {step.desc}
          </p>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function StepNode({
  progress,
  trigger,
  icon,
}: {
  progress: any;
  trigger: number;
  icon: React.ReactNode;
}) {
  const isActive = useTransform(progress, (v: any) => v >= trigger - 0.05);

  return (
    <motion.div
      className="relative flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-white/10 z-20 transition-all duration-500"
      style={{
        borderColor: useTransform(
          progress,
          [trigger - 0.05, trigger],
          ["rgba(255,255,255,0.1)", "rgba(59,130,246,1)"],
        ),
        boxShadow: useTransform(
          progress,
          [trigger - 0.05, trigger],
          ["0 0 0 rgba(59,130,246,0)", "0 0 30px rgba(59,130,246,0.5)"],
        ),
      }}
    >
      <motion.div
        className="text-white/30"
        style={{
          color: useTransform(
            progress,
            [trigger - 0.05, trigger],
            ["rgba(255,255,255,0.3)", "rgba(255,255,255,1)"],
          ),
          scale: useTransform(progress, [trigger - 0.1, trigger], [0.5, 1]),
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}
