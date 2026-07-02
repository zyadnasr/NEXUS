import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MagneticButton from './MagneticButton';

import { useSharedScroll } from './ScrollManager';

export default function Navbar() {
  const { scrollY } = useSharedScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsScrolled(scrollY.get() > 20);

    const unsubscribe = scrollY.on('change', (latest) => {
      const scrolled = latest > 20;
      setIsScrolled((prev) => {
        if (prev !== scrolled) {
          return scrolled;
        }
        return prev;
      });
    });

    return () => unsubscribe();
  }, [scrollY]);

  const navLinks = [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const hash = href.substring(1);
      if (location.pathname !== '/') {
        navigate(href);
      } else {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pt-6 px-6`}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-full ${
        isScrolled 
          ? 'bg-black/40 backdrop-blur-xl border border-white/10 px-8 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent px-4 py-2'
      }`}>
        <Link to="/" className="text-2xl font-sora font-black text-white tracking-tighter" onClick={() => handleLinkClick('/')}>
          NEXUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2">
          <ul className="flex items-center space-x-1 bg-white/5 border border-white/5 rounded-full px-2 py-1 backdrop-blur-md">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if(link.href.startsWith('/#')) {
                      handleLinkClick(link.href);
                    } else {
                      navigate(link.href);
                    }
                  }}
                  className="block px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase text-text-secondary hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <MagneticButton
            as="a"
            href="/#contact"
            onClick={(e: React.MouseEvent) => { e.preventDefault(); handleLinkClick('/#contact'); }}
            className="ml-4 bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] cursor-pointer"
          >
            <span className="relative z-10">Start Project</span>
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-[100px] left-6 right-6 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-6 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if(link.href.startsWith('/#')) {
                      handleLinkClick(link.href);
                    } else {
                      navigate(link.href);
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="text-2xl font-sora font-bold text-white/70 hover:text-white py-3 border-b border-white/5 last:border-none"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/#contact"
                onClick={(e) => { e.preventDefault(); handleLinkClick('/#contact'); }}
                className="bg-white text-black px-6 py-4 rounded-2xl text-center font-bold mt-6 text-lg cursor-pointer"
              >
                Start Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
