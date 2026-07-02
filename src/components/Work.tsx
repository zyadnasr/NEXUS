import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';

export default function Work() {
  // Take only the first 4 projects for the homepage
  const projects = projectsData.slice(0, 4);

  return (
    <section id="work" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Case Studies</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold mb-6 tracking-tight leading-[1.1]"
            >
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Works.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl text-text-secondary max-w-xl font-light"
            >
              Explore how we've helped ambitious brands transform their digital presence and achieve massive growth.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <Link to="/portfolio" className="group flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-bold transition-all hover:scale-105">
              View All Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 cards-container">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (index % 2) * 0.2 }}
              className={`group hover-card rounded-[2.5rem] ${index % 2 === 1 ? 'md:mt-32' : ''}`}
            >
              <Link to={`/portfolio/${project.id}`} className="block">
                <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] mb-8 bg-white/5 border border-white/10">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} mix-blend-overlay z-10 opacity-30 group-hover:opacity-0 transition-opacity duration-700`} />
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
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700 z-10" />
                  
                  {/* Floating Action Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 pointer-events-none">
                    <div className="w-24 h-24 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 transform scale-50 group-hover:scale-100 transition-transform duration-700">
                      <span className="text-white font-bold tracking-wider uppercase text-xs flex items-center gap-2">
                        View <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center items-start">
                  <div>
                    <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-300 mb-2 tracking-tight">{project.title}</h3>
                    <p className="text-primary text-sm font-semibold uppercase tracking-widest">{project.categories.join(' • ')}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center md:hidden">
          <Link to="/portfolio" className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-bold transition-all hover:scale-105">
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
