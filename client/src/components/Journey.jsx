import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Award, GraduationCap, Star } from 'lucide-react';

const timelineData = [
  {
    year: "2024 - Present",
    title: "B.Tech in Computer Science (AIML)",
    subtitle: "Undergraduate Program",
    desc: "Pursuing Bachelor of Technology with a specialization in Artificial Intelligence and Machine Learning. Building a core foundation in AI theory, deep learning models, statistics, and full-stack integration.",
    icon: <GraduationCap className="w-5 h-5 text-accentPurple" />,
    color: "rgba(168, 85, 247, 0.4)"
  },
  {
    year: "2024",
    title: "AI-Fusion Hackathon",
    subtitle: "Hackathon Participant",
    desc: "Collaborated in an intensive hackathon environment, designing and hacking together AI-powered prototypes. Integrated large language model workflows with web applications to solve prompt engineering challenges.",
    icon: <Award className="w-5 h-5 text-pink-500" />,
    color: "rgba(236, 72, 153, 0.4)"
  },
  {
    year: "2024",
    title: "Completed Diploma in IT",
    subtitle: "Polytechnic Education",
    desc: "Graduated with a Diploma in Information Technology, acquiring solid technical skills in programming languages (C++, Java), operating systems, databases, and general system architectures.",
    icon: <Star className="w-5 h-5 text-accentBlue" />,
    color: "rgba(59, 130, 246, 0.4)"
  },
  {
    year: "2021",
    title: "Completed SSC",
    subtitle: "Secondary Education",
    desc: "Concluded Secondary School Certificate education, laying down strong analytical, mathematical, and logical roots that paved the path for engineering.",
    icon: <Calendar className="w-5 h-5 text-gray-400" />,
    color: "rgba(156, 163, 175, 0.4)"
  }
];

function TimelineItem({ item, idx, inView }) {
  // Alternating layout on desktop
  const isEven = idx % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-center md:justify-between w-full mb-12 md:mb-20">
      {/* Visual centerline marker (desktop only) */}
      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-[1px] md:-translate-x-1/2 pointer-events-none hidden md:block" />

      {/* Central icon container */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 200, delay: idx * 0.1 }}
        className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full bg-[#0d0d0f] border-2 flex items-center justify-center -translate-x-0 md:-translate-x-1/2 z-20 shadow-glass"
        style={{ borderColor: item.color, boxShadow: `0 0 15px ${item.color}` }}
      >
        {item.icon}
      </motion.div>

      {/* Left side card (takes full width on mobile, maps to left on desktop if index is even) */}
      <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isEven ? 'md:text-right md:order-1' : 'md:order-2 md:col-start-2'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: idx * 0.2 }}
          className="glass-card p-6 md:p-8 rounded-3xl border-white/5 relative overflow-hidden group shadow-glass hover:border-white/10 transition-colors"
        >
          {/* Subtle gradient glowing accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accentBlue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <span 
            className="inline-block px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono font-bold mb-4 tracking-wider"
            style={{ color: item.color.replace('0.4', '1.0'), borderColor: item.color }}
          >
            {item.year}
          </span>
          
          <h3 className="text-xl font-display font-bold text-textPrimary tracking-tight mb-1">
            {item.title}
          </h3>
          
          <h4 className="text-xs uppercase font-display tracking-widest text-accentBlue font-bold mb-4">
            {item.subtitle}
          </h4>
          
          <p className="text-sm font-light text-textSecondary leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      </div>

      {/* Spacer to balance grid (desktop only) */}
      <div className="hidden md:block w-[45%] order-2" />
    </div>
  );
}

export default function Journey() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-24 px-6 md:px-12 bg-bgDark border-t border-white/5 overflow-hidden"
    >
      {/* Background glow highlights */}
      <div className="absolute w-[600px] h-[600px] rounded-full glow-bg-purple filter blur-[150px] opacity-10 top-1/4 left-0 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full glow-bg-blue filter blur-[150px] opacity-10 bottom-1/4 right-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-accentBlue" />
            <span className="text-xs font-display tracking-[0.3em] text-accentBlue uppercase font-semibold">
              MILESTONES
            </span>
            <span className="w-8 h-[1px] bg-accentBlue" />
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-textPrimary uppercase">
            My <span className="bg-gradient-to-r from-accentBlue via-accentPurple to-[#ec4899] bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-textSecondary max-w-xl mx-auto font-light text-md leading-relaxed">
            An overview of my academic foundation, hackathon engagements, and hands-on milestones along my path as an engineer.
          </p>
        </div>

        {/* Timeline Track container */}
        <div className="relative max-w-4xl mx-auto pt-10">
          {/* Mobile vertical line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/5 pointer-events-none block md:hidden" />
          
          {timelineData.map((item, idx) => (
            <TimelineItem
              key={idx}
              item={item}
              idx={idx}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
