import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [hoverType, setHoverType] = useState('default'); // 'default', 'link', 'magnetic', 'canvas'
  const [hoverText, setHoverText] = useState('');

  // Mouse Coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer circle
  const springConfig = { damping: 30, stiffness: 250, mass: 0.8 };
  const outerX = useSpring(mouseX, springConfig);
  const outerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if it is a touch device
    const checkTouchDevice = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsMobile(isTouch);
      if (!isTouch) {
        document.documentElement.classList.add('custom-cursor-active');
      } else {
        document.documentElement.classList.remove('custom-cursor-active');
      }
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic hover listeners
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        const text = target.getAttribute('data-cursor-text') || '';
        setHoverType(type || 'link');
        setHoverText(text);
      } else if (e.target.closest('a, button, [role="button"], input, textarea, select')) {
        setHoverType('link');
        setHoverText('');
      } else {
        setHoverType('default');
        setHoverText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkTouchDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  // Outer circle variant sizing and colors based on hover
  const outerVariants = {
    default: {
      width: 40,
      height: 40,
      border: '1.5px solid rgba(168, 85, 247, 0.4)', // Purple
      backgroundColor: 'rgba(168, 85, 247, 0.03)',
      borderRadius: '50%',
    },
    link: {
      width: 70,
      height: 70,
      border: '1.5px solid rgba(59, 130, 246, 0.8)', // Blue
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderRadius: '50%',
    },
    canvas: {
      width: 90,
      height: 90,
      border: '1px dashed rgba(255, 255, 255, 0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      borderRadius: '50%',
    },
  };

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
        style={{
          x: outerX,
          y: outerY,
        }}
        animate={hoverType}
        variants={outerVariants}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] uppercase font-display tracking-widest text-textPrimary font-semibold"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-accentPurple rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 shadow-purple-glow"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: hoverType !== 'default' ? 0.3 : 1,
          backgroundColor: hoverType === 'link' ? '#3b82f6' : '#a855f7',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
