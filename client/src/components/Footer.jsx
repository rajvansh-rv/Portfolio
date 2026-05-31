import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const handleScrollTop = () => {
    // Standard window scroll is captured by Lenis and smoothed automatically!
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-bgDark border-t border-white/5 py-12 px-6 md:px-12 overflow-hidden select-none">
      {/* Background glow highlights */}
      <div className="absolute w-[300px] h-[300px] bg-accentPurple/5 rounded-full filter blur-[100px] -bottom-24 left-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">

        {/* Left Side branding */}
        <div className="text-center md:text-left space-y-1">
          <h4 className="text-lg font-display font-extrabold text-textPrimary tracking-widest uppercase">
            Rajvansh Singh Atal
          </h4>
          <p className="text-xs text-textSecondary font-light">
            Building Intelligent Digital Experiences.
          </p>
        </div>

        {/* Center line (optional) */}
        <div className="text-xs text-textSecondary/50 font-mono tracking-widest hidden md:block">
          &copy; {new Date().getFullYear()} RSA ALL RIGHTS RESERVED.
        </div>

        {/* Right Side back-to-top action */}
        <motion.button
          onClick={handleScrollTop}
          whileHover={{ y: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white/5 border border-white/10 hover:border-accentBlue/30 hover:bg-accentBlue/5 text-textPrimary rounded-full text-xs font-display font-bold uppercase tracking-widest transition-all group"
        >
          Back to Top
          <div className="p-1 bg-white/5 rounded-full group-hover:bg-accentBlue/10 transition-colors">
            <ArrowUp className="w-3.5 h-3.5 text-textSecondary group-hover:text-accentBlue transition-colors" />
          </div>
        </motion.button>
      </div>

      {/* Mobile footer copyright */}
      <div className="text-[10px] text-textSecondary/40 text-center font-mono tracking-wider pt-8 block md:hidden relative z-10">
        &copy; {new Date().getFullYear()} RSA ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
