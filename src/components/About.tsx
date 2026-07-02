import { motion } from "motion/react";
import { Award } from "lucide-react";
import SplitText from "./SplitText";
import TiltCard from "./TiltCard";
import aboutImage from "../images/About.avif";

export default function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8">
              <SplitText
                text="We don't just build websites."
                className="text-[clamp(2rem,4vw,3.75rem)] font-bold mb-2 leading-[1.1] tracking-tight text-white"
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
                We build empires.
              </motion.h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
                Nexus is a collective of visionary designers, world-class
                engineers, and strategic marketers. We partner with ambitious
                founders to craft digital experiences that not only look
                spectacular but drive measurable business growth.
              </p>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
                Our philosophy is simple: fuse cutting-edge technology with
                award-winning design to create products that people love and
                competitors envy.
              </p>
            </div>

            <div className="flex flex-wrap gap-10 border-t border-white/10 pt-10 mt-12">
              <div>
                <p className="text-5xl font-sora font-bold text-white mb-2 tracking-tighter">
                  40+
                </p>
                <p className="text-sm uppercase tracking-wider font-medium text-text-secondary">
                  Awards Won
                </p>
              </div>
              <div>
                <p className="text-5xl font-sora font-bold text-white mb-2 tracking-tighter">
                  200+
                </p>
                <p className="text-sm uppercase tracking-wider font-medium text-text-secondary">
                  Global Clients
                </p>
              </div>
              <div>
                <p className="text-5xl font-sora font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2 tracking-tighter">
                  $1B+
                </p>
                <p className="text-sm uppercase tracking-wider font-medium text-text-secondary">
                  Client Revenue
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-[3rem] blur-3xl opacity-30 transform -rotate-6" />
            <TiltCard>
              <div className="aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden relative z-10 p-2 glass-panel">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay z-10 transition-opacity duration-700 hover:opacity-0" />
                  <img
                    src={aboutImage}
                    alt="Our team collaborating"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                  />
                </div>
              </div>
            </TiltCard>

            {/* Floating element */}
            <motion.div
              className="absolute -bottom-8 -left-8 md:-left-12 glass-panel p-6 rounded-3xl z-30 max-w-[260px] animate-float shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-inner">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-base font-bold text-white tracking-tight">
                    Top Rated
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wider text-primary">
                    Agency 2026
                  </p>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Recognized globally for excellence in digital innovation and
                design.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
