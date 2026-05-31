import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollCanvas({ images }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas resolution to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Draw initial frame or current frame on resize
      drawFrame(Math.floor(frameObject.frame));
    };

    const drawFrame = (index) => {
      const img = images[index];
      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      // Object-fit: cover logic
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        drawHeight = canvasHeight;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    // Frame object for GSAP to animate
    const frameObject = { frame: 0 };
    
    // Set initial size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial draw
    drawFrame(0);

    // Master GSAP ScrollTrigger timeline to orchestrate frames and text overlays in perfect sync
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-story-container',
        start: 'top top',
        end: 'bottom bottom',
        pin: '#sticky-canvas-container',
        pinType: 'fixed', // Fixed-pinning eliminates layout shifting lag
        scrub: 0.5,
      }
    });

    // 1. Scrub the frames continuously across the entire scroll story (duration matches timeline end: 15.0)
    masterTimeline.to(frameObject, {
      frame: images.length - 1,
      ease: 'none',
      duration: 15.0,
      onUpdate: () => {
        drawFrame(Math.floor(frameObject.frame));
      }
    }, 0);

    // 2. Sequence overlay fades and transitions at precise timeline ticks:
    // Slide 1 (Intro): Fades out from 0.5 to 1.5
    masterTimeline.to('#story-slide-1', { opacity: 0, y: -50, pointerEvents: 'none', duration: 1.0 }, 0.5);

    // Slide 2 (Mission Statement): Fades in from 1.8 to 2.8, then out from 3.3 to 4.3
    masterTimeline.to('#story-slide-2', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1.0 }, 1.8)
                  .to('#story-slide-2', { opacity: 0, y: -50, pointerEvents: 'none', duration: 1.0 }, 3.3);

    // Slide 3 (Tech Stack): Fades in from 4.5 to 5.5, then out from 6.0 to 7.0
    masterTimeline.to('#story-slide-3', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1.0 }, 4.5)
                  .to('#story-slide-3', { opacity: 0, y: -50, pointerEvents: 'none', duration: 1.0 }, 6.0);

    // Slide 4 (Featured Project 1 - NeoLearn AI): Fades in from 7.2 to 8.2, then out from 8.7 to 9.7
    masterTimeline.to('#story-slide-4', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1.0 }, 7.2)
                  .to('#story-slide-4', { opacity: 0, y: -50, pointerEvents: 'none', duration: 1.0 }, 8.7);

    // Slide 5 (Featured Project 2 - travels): Fades in from 9.9 to 10.9, then out from 11.4 to 12.4
    masterTimeline.to('#story-slide-5', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1.0 }, 9.9)
                  .to('#story-slide-5', { opacity: 0, y: -50, pointerEvents: 'none', duration: 1.0 }, 11.4);

    // Slide 6 (Let's Build): Fades in from 12.6 to 13.6, stays visible, and fades out at the very end
    masterTimeline.to('#story-slide-6', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1.0 }, 12.6)
                  .to('#story-slide-6', { opacity: 0, y: -50, pointerEvents: 'none', duration: 1.0 }, 14.0);

    // Fade out the entire canvas wrapper concurrently at the end to blend smoothly into the About section
    masterTimeline.to('#sticky-canvas-container', { opacity: 0, duration: 1.0 }, 14.0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      masterTimeline.kill();
    };
  }, [images]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-bgDark pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
