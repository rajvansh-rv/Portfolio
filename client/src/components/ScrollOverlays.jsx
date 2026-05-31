import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Server, Database, Sparkles, Compass, ShieldAlert, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollOverlays() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Continuous floating animations for the tech stack cards
    const cards = document.querySelectorAll('#story-slide-3 .tech-card');
    const tweens = [];
    cards.forEach((card, index) => {
      const tween = gsap.to(card, {
        y: -15,
        duration: 2 + index * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-10">
      
      {/* ================= SLIDE 1: INTRO (0% Scroll) ================= */}
      <div 
        id="story-slide-1"
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        <div className="absolute w-[300px] h-[300px] rounded-full glow-bg-purple filter blur-[80px] opacity-30 top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-4"
        >
          <span className="text-xs font-display tracking-[0.4em] text-accentBlue uppercase font-semibold block">
            PORTFOLIO EXPERIENCE
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tight text-textPrimary uppercase">
            Rajvansh Singh<br />
            <span className="bg-gradient-to-r from-accentBlue via-accentPurple to-[#ec4899] bg-clip-text text-transparent">
              Atal
            </span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl font-light text-textSecondary tracking-wider max-w-lg mx-auto">
            Full Stack Developer &amp; AIML Student
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] text-textSecondary uppercase font-medium">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-accentBlue" />
          </motion.div>
        </div>
      </div>

      {/* ================= SLIDE 2: STATEMENT (20% Scroll) ================= */}
      <div 
        id="story-slide-2"
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 opacity-0 translate-y-[50px] pointer-events-none overflow-hidden"
      >
        <div className="absolute w-[400px] h-[400px] rounded-full glow-bg-blue filter blur-[100px] opacity-25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-4xl space-y-6">
          <span className="text-xs font-display tracking-[0.3em] text-accentPurple uppercase font-semibold block">
            MY MISSION
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-bold leading-tight text-textPrimary tracking-tight">
            Transforming Ideas <br />
            Into <span className="bg-gradient-to-r from-accentBlue to-accentPurple bg-clip-text text-transparent text-glow-purple">Scalable Digital Products</span>
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-textSecondary max-w-xl mx-auto font-light leading-relaxed">
            Bridging the gap between robust backend architectures, high-performance user interfaces, and intelligent machine learning systems.
          </p>
        </div>
      </div>

      {/* ================= SLIDE 3: TECH STACK (40% Scroll) ================= */}
      <div 
        id="story-slide-3"
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 opacity-0 translate-y-[50px] pointer-events-none overflow-hidden"
      >
        <div className="max-w-5xl space-y-10 w-full">
          <div className="space-y-2">
            <span className="text-xs font-display tracking-[0.3em] text-accentBlue uppercase font-semibold block">
              EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-textPrimary uppercase">
              Tech Stack
            </h2>
          </div>

          {/* Floating Skill Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto pt-8">
            
            {/* JS */}
            <div className="tech-card glass-card p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center gap-3 sm:gap-4 border-white/5 hover:border-accentBlue/40 transition-colors shadow-glass">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                <Code2 className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-sm font-semibold tracking-wide font-display text-textPrimary">JavaScript</span>
            </div>

            {/* Node */}
            <div className="tech-card glass-card p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center gap-3 sm:gap-4 border-white/5 hover:border-green-500/40 transition-colors shadow-glass">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <Server className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-sm font-semibold tracking-wide font-display text-textPrimary">Node.js</span>
            </div>

            {/* Express */}
            <div className="tech-card glass-card p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center gap-3 sm:gap-4 border-white/5 hover:border-gray-500/40 transition-colors shadow-glass">
              <div className="w-12 h-12 rounded-xl bg-gray-500/10 flex items-center justify-center border border-gray-500/20">
                <Server className="w-6 h-6 text-gray-300" />
              </div>
              <span className="text-sm font-semibold tracking-wide font-display text-textPrimary">Express.js</span>
            </div>

            {/* MongoDB */}
            <div className="tech-card glass-card p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center gap-3 sm:gap-4 border-white/5 hover:border-green-600/40 transition-colors shadow-glass">
              <div className="w-12 h-12 rounded-xl bg-green-600/10 flex items-center justify-center border border-green-600/20">
                <Database className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-sm font-semibold tracking-wide font-display text-textPrimary">MongoDB</span>
            </div>

            {/* MySQL */}
            <div className="tech-card glass-card p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center gap-3 sm:gap-4 border-white/5 hover:border-blue-500/40 transition-colors shadow-glass">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-sm font-semibold tracking-wide font-display text-textPrimary">MySQL</span>
            </div>

          </div>
        </div>
      </div>

      {/* ================= SLIDE 4: FEATURED PROJECT 1 (60% Scroll) ================= */}
      <div 
        id="story-slide-4"
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 md:px-12 opacity-0 translate-y-[50px] pointer-events-none overflow-hidden"
      >
        <div className="absolute w-[450px] h-[450px] rounded-full glow-bg-purple filter blur-[120px] opacity-20 top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Details */}
          <div className="space-y-6 text-left">
            <div className="space-y-1">
              <span className="text-xs font-display tracking-[0.3em] text-accentPurple uppercase font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> FEATURED WORK
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-extrabold text-textPrimary tracking-tight">
                NeoLearn AI
              </h2>
            </div>
            <p className="text-sm sm:text-md text-textSecondary font-light leading-relaxed">
              An AI-powered learning platform designed to provide intelligent study assistance, personalized learning support, and interactive educational experiences.
            </p>
            <ul className="space-y-3 pt-2 text-sm text-textPrimary font-display">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accentPurple" />
                AI-Powered Learning Platform
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accentPurple" />
                Personalized Learning Assistance
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accentPurple" />
                Smart Educational Experience
              </li>
            </ul>
          </div>

          {/* Visual Container */}
          <div className="hidden md:block glass-card rounded-2xl border-white/5 aspect-video overflow-hidden relative shadow-glass p-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-accentPurple/20 via-transparent to-accentBlue/20 pointer-events-none z-10" />
            <div className="w-full h-full bg-[#0d0d0f] flex flex-col p-4 rounded-xl border border-white/5 relative overflow-hidden">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 flex flex-col justify-center items-center text-center gap-2">
                <Sparkles className="w-10 h-10 text-accentPurple animate-pulse-slow mb-2" />
                <div className="text-xs font-mono text-accentPurple/80 font-bold">NEOLEARN AI ENGINE v1.0.4</div>
                <div className="text-[10px] font-mono text-textSecondary">Analyzing learning behavior...</div>
                <div className="w-3/4 h-[3px] bg-white/5 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-accentPurple w-[80%] rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SLIDE 5: FEATURED PROJECT 2 (80% Scroll) ================= */}
      <div 
        id="story-slide-5"
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center px-6 md:px-12 opacity-0 translate-y-[50px] pointer-events-none overflow-hidden"
      >
        <div className="absolute w-[450px] h-[450px] rounded-full glow-bg-blue filter blur-[120px] opacity-25 top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Visual Container */}
          <div className="hidden md:block glass-card rounded-2xl border-white/5 aspect-video overflow-hidden relative shadow-glass p-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-accentBlue/20 via-transparent to-accentPurple/20 pointer-events-none z-10" />
            <div className="w-full h-full bg-[#0d0d0f] flex flex-col p-4 rounded-xl border border-white/5 relative overflow-hidden">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <div className="flex-1 flex flex-col justify-center items-center text-center gap-2">
                <Compass className="w-10 h-10 text-accentBlue animate-spin-slow mb-2" />
                <div className="text-xs font-mono text-accentBlue/80 font-bold">SANWARIYA DASHBOARD</div>
                <div className="text-[10px] font-mono text-textSecondary">Fetching real-time notifications...</div>
                <div className="w-3/4 h-[3px] bg-white/5 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-accentBlue w-[92%] rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6 text-left">
            <div className="space-y-1">
              <span className="text-xs font-display tracking-[0.3em] text-accentBlue uppercase font-semibold flex items-center gap-2">
                <Compass className="w-4 h-4" /> FEATURED WORK
              </span>
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-extrabold text-textPrimary tracking-tight">
                Shree Sanwariya Tours
              </h2>
              <p className="text-sm sm:text-lg md:text-xl font-display text-accentBlue/80 font-semibold">&amp; Travels</p>
            </div>
            <p className="text-sm sm:text-md text-textSecondary font-light leading-relaxed">
              Developed a custom web travel booking platform complete with booking engines, live inquiries, dynamic notification systems, and an administrative panel.
            </p>
            <ul className="space-y-3 pt-2 text-sm text-textPrimary font-display">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accentBlue" />
                Booking Management System
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accentBlue" />
                Admin Controls &amp; Analytics
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accentBlue" />
                Real-Time Notification Services
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================= SLIDE 6: LET'S BUILD SOMETHING (100% Scroll) ================= */}
      <div 
        id="story-slide-6"
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 opacity-0 translate-y-[50px] pointer-events-none overflow-hidden"
      >
        <div className="absolute w-[500px] h-[500px] rounded-full glow-bg-purple filter blur-[120px] opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-3xl space-y-6">
          <span className="text-xs font-display tracking-[0.4em] text-accentPurple uppercase font-semibold block">
            WHAT'S NEXT
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-display font-extrabold tracking-tight text-textPrimary uppercase">
            Let's Build<br />
            Something Amazing <br />
            <span className="bg-gradient-to-r from-accentBlue via-accentPurple to-[#ec4899] bg-clip-text text-transparent text-glow-purple">Together</span>
          </h2>
          
          <div className="pt-8 flex flex-col items-center gap-2">
            <span className="text-xs font-display tracking-[0.2em] text-textSecondary uppercase font-medium">
              SCROLL DOWN TO EXPLORE DETAILED PROFILE
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-accentPurple" />
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
}
