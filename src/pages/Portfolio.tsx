import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "../data/projects";
import TiltCard from "../components/TiltCard";
import SplitText from "../components/SplitText";

export default function Portfolio() {
  return (
    <main className="pt-32 pb-24 min-h-screen relative overflow-hidden bg-white/[0.02]">
      <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-32 text-center max-w-4xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Case Studies
            </span>
          </div>
          <div className="mb-8 flex flex-col items-center justify-center">
            <SplitText
              text="Our"
              className="text-[clamp(3.5rem,7vw,6rem)] font-black tracking-tighter text-white mb-2 leading-[1.1]"
            />
            <SplitText
              text="Work."
              delay={0.2}
              className="text-[clamp(3.5rem,7vw,6rem)] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary leading-[1.1]"
            />
          </div>
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-light">
            A curated selection of digital experiences, platforms, and brand
            identities we've crafted for ambitious partners globally.
          </p>
        </motion.div>

        <div className="space-y-0 relative cards-container">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden w-full pt-20"
              style={{ zIndex: index + 10 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[92%] mx-auto"
              >
                <TiltCard className="shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
                  <div className="group bg-black rounded-[2.5rem] overflow-hidden relative border border-white/10">
                    <Link
                      to={`/portfolio/${project.id}`}
                      className="block relative"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center p-8 md:p-12">
                        {/* Image Section */}
                        <div
                          className={`lg:col-span-7 xl:col-span-8 overflow-hidden rounded-[2.5rem] relative glass-panel p-2 ${index % 2 !== 0 ? "lg:order-2" : ""}`}
                        >
                          <div className="aspect-[16/10] overflow-hidden relative rounded-[2rem]">
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} opacity-20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700`}
                            />
                            <img
                              src={project.coverImage}
                              alt={project.title}
                              loading="lazy"
                              decoding="async"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                              }}
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-700 z-10" />

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
                              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transform scale-50 group-hover:scale-100 transition-transform duration-700 shadow-2xl">
                                <span className="text-white font-bold tracking-wider uppercase text-xs flex items-center gap-2">
                                  View <ArrowUpRight size={16} />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div
                          className={`lg:col-span-5 xl:col-span-4 flex flex-col justify-center ${index % 2 !== 0 ? "lg:order-1 lg:items-end lg:text-right" : ""}`}
                        >
                          <div
                            className={`flex flex-wrap gap-2 mb-8 ${index % 2 !== 0 ? "justify-end" : ""}`}
                          >
                            {project.categories.map((cat) => (
                              <span
                                key={cat}
                                className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>

                          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300">
                            {project.title}
                          </h2>

                          <p className="text-lg text-text-secondary mb-10 leading-relaxed font-light line-clamp-3">
                            {project.description}
                          </p>

                          <div className="space-y-6 w-full text-left">
                            <div
                              className={`pb-4 border-b border-white/10 ${index % 2 !== 0 ? "text-right" : ""}`}
                            >
                              <p className="text-xs text-text-secondary uppercase tracking-widest font-bold mb-2">
                                Industry
                              </p>
                              <p className="text-lg text-white font-light">
                                {project.industry}
                              </p>
                            </div>
                            <div
                              className={`pb-4 border-b border-white/10 ${index % 2 !== 0 ? "text-right" : ""}`}
                            >
                              <p className="text-xs text-text-secondary uppercase tracking-widest font-bold mb-2">
                                Services
                              </p>
                              <p className="text-lg text-white font-light">
                                {project.services.join(", ")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
