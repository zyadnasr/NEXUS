import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

function CTA() {
  return (
    <section className="py-32 relative px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[3rem] overflow-hidden p-12 md:p-24 text-center border border-white/10"
      >
        {/* Dynamic Animated Background */}
        <div className="absolute inset-0 bg-black z-0" />
        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay z-10" />
        <div className="absolute inset-0 mesh-gradient opacity-80 z-0 animate-pulse-slow mix-blend-screen" />

        {/* Animated grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] z-10"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-20 max-w-4xl mx-auto">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
              dominate
            </span>{" "}
            your market?
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Let's build something extraordinary together. Contact us today to
            schedule your complimentary growth strategy session.
          </p>
          <div className="flex justify-center">
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full text-lg font-bold shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:text-white hover:shadow-[0_0_50px_rgba(59,130,246,0.6)]"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="relative z-10 w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300 transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </div>
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default React.memo(CTA);
