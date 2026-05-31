import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Award, Code2, GraduationCap, Laptop } from 'lucide-react';

function Counter({ value, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Extract number from value (e.g. "2+" -> 2, "2024" -> 2024)
  const numValue = parseInt(value, 10) || 0;
  const suffix = value.toString().replace(/[0-9]/g, '');

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(numValue);
    }
  }, [inView, numValue, motionValue]);

  // Dynamically transform the spring numeric value into a string containing the suffix
  const roundedText = useTransform(springValue, (latest) => Math.floor(latest) + suffix);

  return <motion.span ref={ref}>{roundedText}</motion.span>;
}

export default function About() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: <GraduationCap className="w-5 h-5 text-accentPurple" />,
      title: "B.Tech CSE (AIML)",
      value: "2026", // Pursuing, target graduation or timeline marker
      label: "Current Pursuit",
      desc: "Specialized in Artificial Intelligence & Machine Learning"
    },
    {
      icon: <Laptop className="w-5 h-5 text-accentBlue" />,
      title: "Major Projects",
      value: "5+",
      label: "Full Stack Systems",
      desc: "Architected modern SaaS & Booking systems"
    },
    {
      icon: <Award className="w-5 h-5 text-pink-500" />,
      title: "AI Hackathons",
      value: "1",
      label: "AI-Fusion Hackathon",
      desc: "Innovating at the intersection of web and LLMs"
    },
    {
      icon: <Code2 className="w-5 h-5 text-green-400" />,
      title: "MERN Stack",
      value: "100%",
      label: "Development Core",
      desc: "Node, Express, React, and MongoDB specialist"
    }
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center bg-bgDark border-t border-white/5 overflow-hidden"
    >
      {/* Glow Backdrops */}
      <div className="absolute w-[500px] h-[500px] rounded-full glow-bg-purple filter blur-[150px] opacity-10 top-1/4 right-0 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full glow-bg-blue filter blur-[150px] opacity-10 bottom-1/4 left-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-16">

        {/* Header */}
        <div className="space-y-4 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center md:justify-start gap-2"
          >
            <span className="w-8 h-[1px] bg-accentPurple" />
            <span className="text-xs font-display tracking-[0.3em] text-accentPurple uppercase font-semibold">
              ABOUT ME
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-extrabold text-textPrimary uppercase"
          >
            Pioneering Intelligent <br />
            <span className="bg-gradient-to-r from-accentBlue via-accentPurple to-[#ec4899] bg-clip-text text-transparent">
              Digital Landscapes
            </span>
          </motion.h2>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Main Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-textSecondary text-lg font-light leading-relaxed"
          >
            <p>
              I am <span className="text-textPrimary font-semibold">Rajvansh Singh Atal</span>, a Full Stack Developer and AIML student passionate about building intelligent web applications and solving real-world problems through technology.
            </p>
            <p>
              Currently pursuing my B.Tech in Computer Science (AIML), I enjoy creating scalable web solutions, AI-powered products, and modern digital experiences. My approach combines robust backend architectures, clean relational/non-relational database structures, and beautiful visual motion design.
            </p>
            <p>
              I believe in writing clean, performant, and self-documenting code, ensuring that applications scale seamlessly from concept to cloud production.
            </p>
          </motion.div>

          {/* Core Info card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-accentPurple/10 rounded-bl-full filter blur-xl pointer-events-none" />
            <h3 className="text-xl font-display font-bold text-textPrimary mb-6">Profile Snapshot</h3>
            <ul className="space-y-4 text-sm font-display text-textPrimary">
              <li className="flex justify-between py-2 border-b border-white/5">
                <span className="text-textSecondary">Full Name</span>
                <span className="font-semibold">Rajvansh Singh Atal</span>
              </li>
              <li className="flex justify-between py-2 border-b border-white/5">
                <span className="text-textSecondary">Specialization</span>
                <span className="font-semibold text-accentBlue">Full Stack Dev &amp; AIML</span>
              </li>
              <li className="flex justify-between py-2 border-b border-white/5">
                <span className="text-textSecondary">Current Degree</span>
                <span className="font-semibold">B.Tech CSE (AIML)</span>
              </li>
              <li className="flex justify-between py-2">
                <span className="text-textSecondary">Location</span>
                <span className="font-semibold">Ujjain, India</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="glass-card p-6 rounded-2xl border-white/5 hover:border-accentBlue/20 transition-all flex flex-col justify-between h-44 shadow-glass hover:shadow-glass-glow relative group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-accentBlue/30 transition-colors">
                  {stat.icon}
                </div>
                <span className="text-3xl font-display font-extrabold text-textPrimary tracking-tight">
                  <Counter value={stat.value} />
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="text-md font-bold text-textPrimary tracking-wide font-display group-hover:text-accentBlue transition-colors">
                  {stat.title}
                </h4>
                <p className="text-xs text-textSecondary font-light leading-snug">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
