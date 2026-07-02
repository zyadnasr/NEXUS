import React from "react";
import { motion } from "motion/react";
import {
  Target,
  Zap,
  Award,
  BarChart3,
  Users,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: <BarChart3 size={24} />,
    title: "Data-Driven Approach",
    desc: "Every decision is backed by analytics and market data to ensure maximum ROI.",
  },
  {
    icon: <Award size={24} />,
    title: "Award-Winning Design",
    desc: "Our creative team delivers world-class, pixel-perfect digital experiences.",
  },
  {
    icon: <Users size={24} />,
    title: "Expert Team",
    desc: "A collective of top-tier talent from global tech companies and elite agencies.",
  },
  {
    icon: <Zap size={24} />,
    title: "Fast Execution",
    desc: "We move at the speed of culture, delivering high-quality work rapidly.",
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: "Transparent Process",
    desc: "Full visibility into our workflow, timelines, and campaign performance.",
  },
  {
    icon: <Target size={24} />,
    title: "Global Reach",
    desc: "We scale local brands into global powerhouses with localized strategies.",
  },
];

function WhyChooseUs() {
  return (
    <section className="py-32 relative overflow-hidden bg-white/[0.01]">
      <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 blur-[80px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              The Nexus Advantage
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold mb-6 tracking-tight leading-[1.1]"
          >
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Nexus.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-light"
          >
            We combine creative excellence with technical brilliance to deliver
            unparalleled results for our partners.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cards-container">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel p-10 rounded-3xl hover:bg-white/[0.04] transition-colors group relative overflow-hidden hover-card"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="w-14 h-14 rounded-2xl bg-white/5 text-primary flex items-center justify-center mb-8 border border-white/10 group-hover:border-primary/50 group-hover:scale-110 group-hover:text-white transition-all duration-500 relative z-10 shadow-lg">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white tracking-tight relative z-10">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed font-light relative z-10">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(WhyChooseUs);
