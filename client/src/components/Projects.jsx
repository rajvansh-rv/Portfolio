import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink, Sparkles, Compass } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "NeoLearn AI",
    subtitle: "AI-Powered Learning Platform",
    desc: "An AI-powered learning platform that provides smart study assistance, personalized learning support, and interactive educational experiences.",
    role: "Full Stack Developer",
    tech: ["React.js", "Express.js", "Node.js", "MongoDB", "OpenAI API", "Tailwind CSS"],
    github: "https://github.com/rajvansh-rv", // Placeholder or direct URL
    demo: "#", // Direct demo link
    icon: <Sparkles className="w-6 h-6 text-accentPurple" />,
    gradient: "from-purple-500/20 to-indigo-500/20",
    glowColor: "rgba(168, 85, 247, 0.3)",
  },
  {
    id: 2,
    title: "Shree Sanwariya Tours & Travels",
    subtitle: "Travel Booking Platform",
    desc: "Developed a comprehensive travel booking platform featuring real-time booking management, admin analytical controls, customer inquiry handlers, and live updates.",
    role: "Full Stack Developer",
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "Socket.io", "CSS3"],
    github: "https://github.com/rajvansh-rv",
    demo: "https://shreesanwariyatravels.in",
    icon: <Compass className="w-6 h-6 text-accentBlue" />,
    gradient: "from-blue-500/20 to-teal-500/20",
    glowColor: "rgba(59, 130, 246, 0.3)",
  }
];

function ProjectCard({ project, idx, inView }) {
  const cardRef = useRef(null);

  // 3D Tilt handler
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate rotation (-10deg to 10deg)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: idx * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card rounded-[32px] border-white/5 p-8 md:p-10 flex flex-col justify-between transition-transform duration-200 ease-out select-none shadow-glass relative group overflow-hidden min-h-[460px]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Background glow highlights */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none filter blur-[80px]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.glowColor} 0%, rgba(0,0,0,0) 70%)`
        }}
      />
      <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${project.gradient} rounded-bl-full filter blur-2xl opacity-40 pointer-events-none`} />

      <div className="space-y-6" style={{ transform: 'translateZ(50px)' }}>
        {/* Header and badge */}
        <div className="flex items-center justify-between">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors">
            {project.icon}
          </div>
          <span className="px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-display text-textSecondary uppercase tracking-widest font-semibold">
            {project.role}
          </span>
        </div>

        {/* Project Titles */}
        <div className="space-y-1">
          <h3 className="text-3xl md:text-4xl font-display font-extrabold text-textPrimary tracking-tight">
            {project.title}
          </h3>
          <p className="text-sm font-semibold tracking-wide text-accentBlue font-display">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-textSecondary font-light text-md leading-relaxed">
          {project.desc}
        </p>

        {/* Technologies used */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t, tIdx) => (
            <span
              key={tIdx}
              className="px-3 py-1 bg-white/5 border border-white/5 rounded-md text-xs font-mono text-textPrimary"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Buttons */}
      <div 
        className="flex gap-4 pt-8" 
        style={{ transform: 'translateZ(30px)' }}
      >
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-display font-bold text-textPrimary tracking-wide transition-all group/btn"
        >
          <Github className="w-4 h-4 text-textSecondary group-hover/btn:text-textPrimary transition-colors" />
          Codebase
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-accentBlue to-accentPurple hover:brightness-110 rounded-xl text-sm font-display font-bold text-white tracking-wide transition-all shadow-blue-glow hover:shadow-purple-glow"
        >
          Live Demo
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-24 px-6 md:px-12 bg-bgDark border-t border-white/5 overflow-hidden"
    >
      {/* Background glow highlights */}
      <div className="absolute w-[600px] h-[600px] rounded-full glow-bg-purple filter blur-[150px] opacity-10 bottom-0 right-0 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full glow-bg-blue filter blur-[150px] opacity-10 top-0 left-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-accentPurple" />
            <span className="text-xs font-display tracking-[0.3em] text-accentPurple uppercase font-semibold">
              CASE STUDIES
            </span>
            <span className="w-8 h-[1px] bg-accentPurple" />
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-textPrimary uppercase">
            Featured <span className="bg-gradient-to-r from-accentBlue to-accentPurple bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-textSecondary max-w-xl mx-auto font-light text-md leading-relaxed">
            Delve into details of production-ready applications spanning web architectures, reservation portals, real-time telemetry, and artificial intelligence.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto pt-6">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
