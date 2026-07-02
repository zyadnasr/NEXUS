import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { projectsData } from '../data/projects';

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const project = useMemo(() => projectsData.find(p => p.id === id), [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center pt-32">Project not found</div>;
  }

  // Find next project
  const currentIndex = projectsData.findIndex(p => p.id === id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <main className="bg-background pt-0 pb-0 relative overflow-hidden">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nexus.agency/" },
            { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://nexus.agency/portfolio" },
            { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://nexus.agency/portfolio/${project.id}` }
          ]
        })}
      </script>
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none z-[1]" />
      
      {/* Hero Banner */}
      <section className="relative h-[80vh] md:h-[95vh] w-full flex items-end pb-24 px-6 md:px-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent z-10" />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accentColor} opacity-20 mix-blend-overlay z-10`} />
          <img
            src={project.coverImage}
            loading="eager"
            decoding="async"
            alt={project.title}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            className="w-full h-full object-cover scale-105"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <Link to="/portfolio" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-white transition-colors mb-10 group bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
          </Link>
          <div className="flex flex-wrap gap-3 mb-8">
            {project.categories.map(cat => (
              <span key={cat} className="text-xs font-semibold uppercase tracking-widest text-primary border border-primary/30 bg-primary/10 backdrop-blur-md px-4 py-1.5 rounded-full">
                {cat}
              </span>
            ))}
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tighter"
          >
            {project.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-16 border-t border-white/10 pt-10 mt-10"
          >
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-widest font-bold mb-3">Client</p>
              <p className="text-2xl font-light text-white">{project.brand}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-widest font-bold mb-3">Industry</p>
              <p className="text-2xl font-light text-white">{project.industry}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-widest font-bold mb-3">Services</p>
              <p className="text-2xl font-light text-white">{project.services.join(', ')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 space-y-40 relative z-10">
        
        {/* Overview & Goals */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Project Overview</h2>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed font-light mb-12">
              {project.description}
            </p>
          </div>
          <div className="lg:col-span-7 glass-panel p-12 md:p-16 rounded-[3rem] relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${project.accentColor} opacity-10 rounded-full blur-[70px] pointer-events-none`} />
            <h3 className="text-3xl font-bold mb-10 flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shadow-inner">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              </div>
              Client Goals
            </h3>
            <ul className="space-y-8">
              {project.clientGoals.map((goal, i) => (
                <li key={i} className="flex items-start gap-6 text-white text-lg md:text-xl font-light">
                  <span className="text-primary mt-1 font-black text-2xl opacity-50">0{i+1}.</span>
                  <span className="leading-relaxed">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Full width image */}
        <section>
          <div className="w-full aspect-[21/9] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <img
              src={project.gallery[0] || project.coverImage}
              loading="lazy"
              decoding="async"
              alt={`${project.title} project showcase`}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
          </div>
        </section>

        {/* Challenges & Strategy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="relative">
            <h2 className="text-4xl font-bold mb-8 tracking-tight">The Challenge</h2>
            <p className="text-lg text-text-secondary leading-relaxed font-light">
              {project.challenges}
            </p>
          </div>
          <div className="relative">
            <h2 className="text-4xl font-bold mb-8 tracking-tight">Our Strategy</h2>
            <p className="text-lg text-text-secondary leading-relaxed font-light">
              {project.strategy}
            </p>
          </div>
        </section>

        {/* Design Process */}
        <section className="bg-white/[0.02] border border-white/10 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br ${project.accentColor} opacity-10 rounded-full blur-[90px] pointer-events-none`} />
          <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Methodology</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Design & Development</h2>
            <p className="text-xl text-text-secondary leading-relaxed mb-16 font-light max-w-3xl">
              {project.designProcess}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-panel p-8 rounded-3xl hover:bg-white/[0.05] transition-colors border-t border-l border-white/20">
                <div className="text-4xl font-black text-white/10 mb-6 font-sora">01</div>
                <h4 className="text-2xl font-bold mb-3 tracking-tight">Wireframing</h4>
                <p className="text-text-secondary font-light">Mapping the core user journey and information architecture.</p>
              </div>
              <div className="glass-panel p-8 rounded-3xl hover:bg-white/[0.05] transition-colors border-t border-l border-white/20">
                <div className="text-4xl font-black text-white/10 mb-6 font-sora">02</div>
                <h4 className="text-2xl font-bold mb-3 tracking-tight">UI Design</h4>
                <p className="text-text-secondary font-light">Applying the visual language, typography, and motion systems.</p>
              </div>
              <div className="glass-panel p-8 rounded-3xl hover:bg-white/[0.05] transition-colors border-t border-l border-white/20">
                <div className="text-4xl font-black text-white/10 mb-6 font-sora">03</div>
                <h4 className="text-2xl font-bold mb-3 tracking-tight">Prototyping</h4>
                <p className="text-text-secondary font-light">Interactive motion studies and high-fidelity testing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Image Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.gallery.map((img, i) => (
            <div key={i} className={`rounded-[3rem] overflow-hidden aspect-square border border-white/10 group ${i === 2 ? 'md:col-span-2 aspect-[21/9]' : ''}`}>
              <img
                src={img}
                alt={`${project.title} gallery image ${i + 1}`}
                loading="lazy"
                decoding="async"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
          ))}
        </section>

        {/* Results & Metrics */}
        <section className="text-center max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Impact</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Final Results</h2>
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed mb-20 font-light max-w-3xl mx-auto">
            The impact of our collaboration exceeded expectations across all key performance indicators.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.results.metrics.map((metric, i) => (
              <div key={i} className="glass-panel p-12 rounded-[3rem] hover:bg-white/[0.03] transition-colors group">
                <div className={`text-6xl md:text-7xl font-sora font-black text-transparent bg-clip-text bg-gradient-to-br ${project.accentColor} mb-6 tracking-tighter group-hover:scale-110 transition-transform duration-500`}>
                  {metric.value}
                </div>
                <div className="text-xl font-medium text-white tracking-tight">{metric.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16 relative">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <Quote size={120} className="absolute -top-16 left-1/2 -translate-x-1/2 text-white/[0.03]" />
            <p className="text-3xl md:text-5xl font-sora font-medium leading-tight text-white mb-12 relative z-10">
              "Nexus didn't just redesign our platform; they completely transformed how our users interact with our brand. The results speak for themselves."
            </p>
            <div>
              <p className="text-2xl font-bold text-white mb-2">Jane Doe</p>
              <p className="text-text-secondary tracking-widest uppercase text-sm font-semibold">CEO, {project.brand}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Next Project */}
      <section className="border-t border-white/10 relative z-20">
        <Link to={`/portfolio/${nextProject.id}`} className="block group relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0 bg-black/70 z-10 group-hover:bg-black/40 transition-colors duration-700" />
          <img
            src={nextProject.coverImage}
            loading="lazy"
            decoding="async"
            alt={nextProject.title}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
            <p className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-6 flex items-center gap-3 group-hover:text-white transition-colors border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
              Next Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </p>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 group-hover:to-white transition-all duration-500 tracking-tighter">
              {nextProject.title}
            </h2>
          </div>
        </Link>
      </section>

    </main>
  );
}
