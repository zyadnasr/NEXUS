import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  return (
    <footer aria-label="Footer" className="relative overflow-hidden pt-24 pb-8 border-t border-white/10 bg-black">
      <div className="absolute inset-0 bg-noise opacity-50 mix-blend-overlay pointer-events-none" />
      
      {/* Huge subtle text background */}
      <div className="absolute top-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.02] select-none">
        <h1 className="text-[20vw] font-sora font-black leading-none whitespace-nowrap">
          NEXUS
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-24">
          <div className="md:col-span-5 pr-8">
            <Link to="/" className="text-3xl font-sora font-bold text-white tracking-tighter inline-block mb-6">
              NEXUS<span className="text-primary">.</span>
            </Link>
            <p className="text-text-secondary text-lg leading-relaxed max-w-sm mb-8 font-light">
              A full-service creative growth agency transforming ambitious startups into global brands.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:hello@nexus.com" className="text-white border border-white/20 px-6 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors">
                hello@nexus.com
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-4 text-sm text-text-secondary font-light">
              <li>
                {location.pathname === '/' ? (
                  <a href="#services" className="hover:text-primary transition-colors block">Branding & Design</a>
                ) : (
                  <Link to="/#services" className="hover:text-primary transition-colors block">Branding & Design</Link>
                )}
              </li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors block">Web Development</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors block">Video Production</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors block">Marketing Strategy</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm text-text-secondary font-light">
              <li>
                {location.pathname === '/' ? (
                  <a href="#about" className="hover:text-primary transition-colors block">About Us</a>
                ) : (
                  <Link to="/#about" className="hover:text-primary transition-colors block">About Us</Link>
                )}
              </li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors block">Our Work</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors block">Careers</Link></li>
              <li>
                {location.pathname === '/' ? (
                  <a href="#contact" className="hover:text-primary transition-colors block">Contact</a>
                ) : (
                  <Link to="/#contact" className="hover:text-primary transition-colors block">Contact</Link>
                )}
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Social</h4>
            <ul className="space-y-4 text-sm text-text-secondary font-light">
              <li><a href="https://instagram.com/nexus.agency" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">Instagram</a></li>
              <li><a href="https://twitter.com/nexusagency" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">Twitter (X)</a></li>
              <li><a href="https://linkedin.com/company/nexus-agency" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">LinkedIn</a></li>
              <li><a href="https://dribbble.com/nexusagency" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">Dribbble</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-text-secondary font-light">
          <p>&copy; {new Date().getFullYear()} Nexus Creative Agency. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
