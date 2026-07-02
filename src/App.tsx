/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Spotlight from './components/Spotlight';
import PageTransition from './components/PageTransition';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import { MouseProvider } from './components/MouseManager';
import { ScrollProvider } from './components/ScrollManager';
import { TelemetryProvider } from './utils/telemetry';

const Portfolio = lazy(() => import('./pages/Portfolio'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/portfolio" element={
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              <PageTransition><Portfolio /></PageTransition>
            </Suspense>
          } />
          <Route path="/portfolio/:id" element={
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              <PageTransition><CaseStudy /></PageTransition>
            </Suspense>
          } />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center bg-background px-6 pt-32">
              <div className="text-center max-w-lg">
                <h1 className="text-8xl font-sora font-black text-white mb-4">404</h1>
                <p className="text-xl text-text-secondary mb-8 font-light">Page not found</p>
                <Link to="/" className="inline-block bg-white text-black px-8 py-4 rounded-full text-base font-bold hover:bg-white/90 transition-colors">Go Home</Link>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <ScrollProvider>
        <MouseProvider>
          <SmoothScroll>
            <ScrollToTop />
            <CustomCursor />
            <Spotlight />
            <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
            
            <AnimatePresence mode="wait">
              {loading ? (
                <div key="loader"><Loader onComplete={() => setLoading(false)} /></div>
              ) : (
                <TelemetryProvider>
                <div key="content" className="min-h-screen bg-background text-text-primary flex flex-col relative cursor-none">
                  <Navbar />
                  <div className="flex-grow">
                    <AnimatedRoutes />
                  </div>
                  <Footer />
                </div>
              </TelemetryProvider>
              )}
            </AnimatePresence>
          </SmoothScroll>
        </MouseProvider>
      </ScrollProvider>
    </BrowserRouter>
  );
}
