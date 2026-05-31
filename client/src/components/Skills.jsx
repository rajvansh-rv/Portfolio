import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Server, Database, Brain, Wrench } from 'lucide-react';

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: <Code className="w-5 h-5 text-accentBlue" />,
    color: "from-blue-500/20 to-cyan-500/20",
    glowColor: "rgba(59, 130, 246, 0.15)",
    skills: ["JavaScript", "HTML5", "CSS3", "React.js", "Tailwind CSS", "GSAP", "Framer Motion"]
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: <Server className="w-5 h-5 text-green-400" />,
    color: "from-green-500/20 to-emerald-500/20",
    glowColor: "rgba(74, 222, 128, 0.15)",
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth", "MVC Architecture"]
  },
  {
    id: "database",
    title: "Database Systems",
    icon: <Database className="w-5 h-5 text-yellow-400" />,
    color: "from-yellow-500/20 to-amber-500/20",
    glowColor: "rgba(250, 204, 21, 0.15)",
    skills: ["MongoDB", "MySQL", "Mongoose ODM", "SQL Queries"]
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    icon: <Brain className="w-5 h-5 text-accentPurple" />,
    color: "from-purple-500/20 to-pink-500/20",
    glowColor: "rgba(168, 85, 247, 0.15)",
    skills: ["Python", "Machine Learning Basics", "Neural Networks", "Data Preprocessing", "LLM APIs"]
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    icon: <Wrench className="w-5 h-5 text-gray-400" />,
    color: "from-gray-500/20 to-slate-500/20",
    glowColor: "rgba(156, 163, 175, 0.15)",
    skills: ["Git", "GitHub", "Vite", "Postman", "NPM", "Netlify", "Render"]
  }
];

function SkillCard({ category, idx, inView }) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card p-6 md:p-8 rounded-3xl border-white/5 relative overflow-hidden group shadow-glass"
    >
      {/* Spotlight Glow Background */}
      {isHovered && (
        <div
          className="absolute pointer-events-none rounded-full w-56 h-56 transition-opacity duration-300 filter blur-3xl"
          style={{
            left: mousePos.x - 112,
            top: mousePos.y - 112,
            background: `radial-gradient(circle, ${category.glowColor} 0%, rgba(0,0,0,0) 70%)`,
            position: 'absolute'
          }}
        />
      )}

      {/* Decorative corner element */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${category.color} rounded-bl-full filter blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none`} />

      <div className="relative z-10 space-y-6">
        {/* Title Block */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/20 transition-colors">
            {category.icon}
          </div>
          <h3 className="text-xl font-display font-bold text-textPrimary tracking-tight">
            {category.title}
          </h3>
        </div>

        {/* Skill list */}
        <div className="flex flex-wrap gap-2 pt-2">
          {category.skills.map((skill, sIdx) => (
            <span
              key={sIdx}
              className="px-3.5 py-1.5 bg-white/5 border border-white/5 hover:border-white/15 rounded-full text-xs font-display text-textPrimary font-medium tracking-wide transition-colors duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-24 px-6 md:px-12 bg-bgDark border-t border-white/5 overflow-hidden"
    >
      {/* Background radial glows */}
      <div className="absolute w-[600px] h-[600px] rounded-full glow-bg-blue filter blur-[150px] opacity-10 top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full glow-bg-purple filter blur-[150px] opacity-10 top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-16">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-accentBlue" />
            <span className="text-xs font-display tracking-[0.3em] text-accentBlue uppercase font-semibold">
              ABILITIES
            </span>
            <span className="w-8 h-[1px] bg-accentBlue" />
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-textPrimary uppercase">
            Technical <span className="bg-gradient-to-r from-accentBlue to-accentPurple bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-textSecondary max-w-xl mx-auto font-light text-md leading-relaxed">
            A comprehensive overview of the libraries, frameworks, languages, databases, and AI models I leverage to build production-grade web products.
          </p>
        </div>

        {/* Skill Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto pt-6">
          {skillCategories.map((category, idx) => (
            <SkillCard
              key={category.id}
              category={category}
              idx={idx}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
