import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";
import SplitText from "./SplitText";
import InfiniteMarquee from "./InfiniteMarquee";
import FluidBackground from "./FluidBackground";

const clients = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "Spotify",
  "Apple",
  "Tesla",
  "Meta",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col pt-32 pb-20 overflow-hidden">
      {/* Dynamic Background */}
      <FluidBackground />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left pt-12 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center space-x-2 glass-panel px-4 py-2 rounded-full mb-8 border border-white/10"
            >
              <Sparkles size={16} className="text-primary animate-pulse" />
              <span className="text-xs md:text-sm font-semibold tracking-wide text-white uppercase">
                Premium Digital Agency
              </span>
            </motion.div>

            <div className="mb-10 max-w-full">
              <SplitText
                text="We Build Brands That"
                className="text-[clamp(2.5rem,5vw,5.5rem)] font-bold leading-[1.1] text-white tracking-tight"
              />
              <motion.h1
                initial={{ opacity: 0, y: 80, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.2,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[clamp(2.5rem,5vw,5.5rem)] font-bold leading-[1.1] tracking-tight bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent"
              >
                Dominate.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-lg md:text-xl text-text-secondary mb-12 max-w-xl leading-relaxed font-light"
            >
              We are a full-service creative growth agency transforming
              ambitious startups into global powerhouses through high-end design
              and precision engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
            >
              <MagneticButton
                as="a"
                href="#contact"
                className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full text-base font-bold w-full sm:w-auto shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:text-white hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]"
              >
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight
                  size={18}
                  className="relative z-10 group-hover:translate-x-1 transition-transform"
                />
              </MagneticButton>
              <Link
                to="/portfolio"
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-white hover:text-primary transition-colors w-full sm:w-auto group"
              >
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                  <Play size={14} className="ml-1" />
                </span>
                View Showreel
              </Link>
            </motion.div>
          </div>

          {/* Right Visuals */}
          <div className="lg:col-span-5 relative h-[500px] lg:h-[700px] w-full hidden lg:block">
            {/* 3D-like floating abstract elements */}
            <motion.div className="absolute top-1/4 right-0 w-72 h-[22rem] bg-[rgba(255,255,255,0.19)] rounded-[2rem] p-8 z-20 shadow-2xl flex flex-col justify-between overflow-hidden animate-float">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/40 blur-[60px] rounded-full mix-blend-screen" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/30 blur-[50px] rounded-full mix-blend-screen" />

              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4 border border-white/20 backdrop-blur-md relative z-10">
                <Sparkles size={24} className="text-white" />
              </div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">
                  300%
                </h3>
                <p className="text-sm font-medium text-text-secondary uppercase tracking-wider">
                  Average ROI Increase
                </p>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 -left-10 w-80 h-64 bg-[rgba(255,255,255,0.35)] rounded-[2rem] p-8 z-30 shadow-2xl overflow-hidden animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/40 blur-[60px] mix-blend-screen" />
              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="space-y-4 w-full">
                  <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-full animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                  <div className="h-2.5 w-3/4 bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-secondary to-purple-400 rounded-full"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Conversion Rate
                  </h3>
                  <p className="text-sm text-primary font-medium tracking-wide">
                    Outperforming Industry Standard
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Abstract centerpiece */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] h-[22rem] rounded-full border border-white/10 border-dashed opacity-50 z-10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full border border-white/5 z-10"
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-primary rounded-full blur-[70px] z-0 animate-pulse-slow" />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="w-full mt-auto relative z-20 border-t border-white/5 pt-10"
      >
        <p className="text-center text-xs tracking-widest text-text-secondary uppercase font-bold mb-6">
          Trusted by industry leaders
        </p>
        <InfiniteMarquee baseVelocity={1} className="py-4">
          {clients.map((client, i) => (
            <div
              key={i}
              className="mx-8 md:mx-16 flex items-center text-white/30 hover:text-white transition-colors duration-300 text-2xl md:text-3xl font-bold font-sora tracking-tighter cursor-pointer"
            >
              {client}
            </div>
          ))}
        </InfiniteMarquee>
      </motion.div>
    </section>
  );
}
