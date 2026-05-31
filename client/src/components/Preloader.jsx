import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const messages = [
  "INITIALIZING EXPERIENTIAL SYSTEM...",
  "PRELOADING CINEMATIC GRAPHICS...",
  "COMPILING PIPELINES & LIGHTING...",
  "OPTIMIZING CANVAS SCRUBBING...",
  "READY FOR LAUNCH"
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const imagesRef = useRef([]);

  const frameCount = 57;

  const pad = (num, size) => {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  };

  const getFramePath = (index) => {
    return `/sequence/frame_${pad(index, 2)}_delay-0.066s.png`;
  };

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];

    // Preload loop
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        const currentProgress = Math.round((loadedCount / frameCount) * 100);
        setProgress(currentProgress);

        if (loadedCount === frameCount) {
          imagesRef.current = loadedImages;
          setTimeout(() => {
            onComplete(loadedImages);
          }, 800);
        }
      };
      img.onerror = () => {
        // Handle error gracefully so we don't block load
        loadedCount++;
        const currentProgress = Math.round((loadedCount / frameCount) * 100);
        setProgress(currentProgress);
        if (loadedCount === frameCount) {
          imagesRef.current = loadedImages;
          setTimeout(() => {
            onComplete(loadedImages);
          }, 800);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Update messages based on progress
  useEffect(() => {
    if (progress < 25) setMessageIndex(0);
    else if (progress < 50) setMessageIndex(1);
    else if (progress < 75) setMessageIndex(2);
    else if (progress < 100) setMessageIndex(3);
    else setMessageIndex(4);
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 bg-bgDark z-[99999] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
      initial={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      {/* Subtle background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full glow-bg-purple filter blur-[100px] opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center relative">
        {/* Logo or Brand Reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-display font-bold tracking-widest bg-gradient-to-r from-textPrimary via-accentPurple to-textSecondary bg-clip-text text-transparent mb-12"
        >
          Rajvansh Singh Atal
        </motion.h1>

        {/* Percentage Indicator */}
        <div className="relative mb-6">
          <motion.span
            className="text-8xl font-display font-extrabold tracking-tight tabular-nums bg-gradient-to-b from-textPrimary to-[#1c1c1e] bg-clip-text text-transparent"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {progress}%
          </motion.span>
        </div>

        {/* Status message */}
        <div className="h-6 flex items-center justify-center mb-8 overflow-hidden">
          <motion.p
            key={messageIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.6 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xs tracking-[0.2em] font-display text-textPrimary text-center"
          >
            {messages[messageIndex]}
          </motion.p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-accentBlue to-accentPurple shadow-purple-glow"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>


      </div>
    </motion.div>
  );
}
