import { motion } from "motion/react";
import {
  PenTool,
  MonitorPlay,
  Code2,
  TrendingUp,
  Megaphone,
  Share2,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import TiltCard from "./TiltCard";
import SplitText from "./SplitText";
import InfiniteMarquee from "./InfiniteMarquee";

const services = [
  {
    icon: <PenTool size={28} />,
    title: "Branding & Design",
    description:
      "We craft distinctive brand identities, logos, and graphic design that resonate with your target audience and stand the test of time.",
  },
  {
    icon: <Code2 size={28} />,
    title: "Full Stack Development",
    description:
      "Custom, scalable web and mobile applications built with cutting-edge technologies for unparalleled performance.",
  },
  {
    icon: <MonitorPlay size={28} />,
    title: "Video & Content",
    description:
      "High-end video production, editing, and content creation that tells your story and captivates your market.",
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Marketing Strategy",
    description:
      "Data-driven marketing blueprints designed to accelerate growth, optimize conversion rates, and maximize ROI.",
  },
  {
    icon: <Megaphone size={28} />,
    title: "Paid Advertising",
    description:
      "Strategic media buying across Google, Meta, and TikTok to acquire high-value customers at scale.",
  },
  {
    icon: <Share2 size={28} />,
    title: "Social Media",
    description:
      "Comprehensive community management and viral social strategies to build authentic brand loyalty.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-primary/10 blur-[80px] pointer-events-none rounded-r-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs md:text-sm font-semibold tracking-wider text-white uppercase">
                Our Capabilities
              </span>
            </motion.div>
            <div className="mb-6">
              <SplitText
                text="Services that drive"
                className="text-[clamp(2.5rem,4vw,4rem)] font-bold tracking-tight text-white mb-2 leading-[1.1]"
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
                exponential growth.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-text-secondary font-light max-w-xl"
            >
              A holistic approach to digital transformation. We integrate
              design, technology, and marketing to elevate your brand.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="#contact"
              className="glass-panel px-8 py-4 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-colors inline-flex items-center gap-3 group"
            >
              <Briefcase
                size={18}
                className="text-primary group-hover:text-white transition-colors"
              />
              Partner With Us
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cards-container mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div className="glass-panel p-10 rounded-[2.5rem] h-full flex flex-col relative overflow-hidden bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500 group border border-white/10">
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen" />

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:text-white group-hover:border-primary/50 transition-all duration-500 shadow-lg">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-8 flex-grow font-light">
                    {service.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/10 flex items-center text-sm font-bold uppercase tracking-wider text-primary group-hover:text-white transition-colors duration-300 cursor-pointer">
                    Learn More
                    <span className="ml-3 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-300 transform group-hover:translate-x-2">
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <InfiniteMarquee baseVelocity={-1} className="opacity-50">
          <div className="mx-8 text-4xl font-black font-sora tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/20">
            BRANDING
          </div>
          <div className="mx-8 text-4xl font-black font-sora tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/20">
            •
          </div>
          <div className="mx-8 text-4xl font-black font-sora tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/20">
            DEVELOPMENT
          </div>
          <div className="mx-8 text-4xl font-black font-sora tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/20">
            •
          </div>
          <div className="mx-8 text-4xl font-black font-sora tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/20">
            MARKETING
          </div>
          <div className="mx-8 text-4xl font-black font-sora tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/20">
            •
          </div>
          <div className="mx-8 text-4xl font-black font-sora tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/20">
            CONTENT
          </div>
          <div className="mx-8 text-4xl font-black font-sora tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/20">
            •
          </div>
        </InfiniteMarquee>
      </div>
    </section>
  );
}
