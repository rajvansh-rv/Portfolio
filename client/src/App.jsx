import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollCanvas from './components/ScrollCanvas';
import ScrollOverlays from './components/ScrollOverlays';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useSmoothScroll from './hooks/useSmoothScroll';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Lenis smooth scroll globally
  useSmoothScroll();

  const handlePreloadComplete = (preloadedImages) => {
    setImages(preloadedImages);
    setIsLoaded(true);
  };

  return (
    <>
      {/* Cinematic Preloader with Exit Transition */}
      <AnimatePresence>
        {!isLoaded && (
          <Preloader onComplete={handlePreloadComplete} />
        )}
      </AnimatePresence>
      
      {/* Main Website Structure */}
      {images.length > 0 && (
        <div className={`relative w-full min-h-screen bg-bgDark transition-opacity duration-[1000ms] ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Custom Awwwards Cursor */}
          <CustomCursor />
          
          {/* Cinematic Scrollytelling Section (500vh Scroll Height) */}
          <div id="scroll-story-container" className="relative w-full h-[500vh]">
            <div id="sticky-canvas-container" className="w-full h-screen overflow-hidden relative">
              <ScrollCanvas images={images} />
              <ScrollOverlays />
            </div>
          </div>

          {/* After Scroll Webpage Content */}
          <div className="relative z-20 bg-bgDark shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
            <About />
            <Skills />
            <Projects />
            <Journey />
            <Certifications />
            <Contact />
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
