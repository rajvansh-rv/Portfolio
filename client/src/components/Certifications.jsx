import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, CheckCircle2, Calendar, FileText } from 'lucide-react';

const certificationsData = [
  {
    id: 1,
    title: "Front-End Web Developer",
    issuer: "Infosys Springboard",
    desc: "Verifying mastery of building responsive, semantic client-side applications using modern javascript models and layout architectures.",
    highlights: [
      "Comprehensive study of Front-End Architectures",
      "Advanced Javascript execution contexts and OOP",
      "Responsive web design methodologies (HTML5 & CSS3)",
      "API integration and client-side application logic"
    ],
    verifyLink: "#",
    glowColor: "from-accentBlue/20 to-accentPurple/20",
    badgeColor: "text-accentPurple",
    tagColor: "text-accentBlue"
  },
  {
    id: 2,
    title: "ReactJS Certificate",
    issuer: "Infosys Springboard",
    desc: "Verifying advanced capabilities in React SPA development, modular component architectures, state management models, and performance tuning.",
    highlights: [
      "Component lifecycle & hooks architecture",
      "State management & Context API",
      "Vite React tooling & package setups",
      "Optimized rendering and virtual DOM logic"
    ],
    verifyLink: "#",
    glowColor: "from-accentPurple/20 to-pink-500/20",
    badgeColor: "text-accentBlue",
    tagColor: "text-accentPurple"
  }
];

function CertificationCard({ cert, idx, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: idx * 0.2 }}
      className="glass-card rounded-[32px] border-white/5 p-8 md:p-12 relative overflow-hidden group shadow-glass hover:border-accentBlue/20 transition-all duration-300"
    >
      {/* Shimmer sweep effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
      
      {/* Corner glowing blur */}
      <div className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl ${cert.glowColor} rounded-bl-full filter blur-2xl opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none`} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Badge Icon column */}
        <div className="md:col-span-3 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 flex items-center justify-center shadow-glass hover:border-white/20 transition-colors duration-300 relative">
            <Award className={`w-12 h-12 ${cert.badgeColor} animate-pulse-slow`} />
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-accentBlue to-accentPurple opacity-10 blur group-hover:opacity-35 transition-opacity" />
          </div>
        </div>

        {/* Text content column */}
        <div className="md:col-span-9 space-y-6 text-left">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className={`px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${cert.tagColor}`}>
                {cert.issuer}
              </span>
              <span className="flex items-center gap-1 text-xs text-textSecondary font-display">
                <Calendar className="w-3.5 h-3.5" /> Certified
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-extrabold text-textPrimary tracking-tight">
              {cert.title}
            </h3>
            <p className="text-sm text-textSecondary font-light">
              {cert.desc}
            </p>
          </div>

          {/* Key highlights list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-textSecondary font-display">
            {cert.highlights.map((highlight, hIdx) => (
              <div key={hIdx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-accentPurple shrink-0 mt-0.5" />
                <span className="font-light leading-snug">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Verification link */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={cert.verifyLink}
              onClick={(e) => { if(cert.verifyLink === '#') e.preventDefault(); }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-display font-bold text-textPrimary uppercase tracking-wider transition-colors group/btn"
            >
              <FileText className="w-4 h-4 text-textSecondary group-hover/btn:text-textPrimary" />
              Verify Certificate
            </a>
          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="certifications"
      ref={containerRef}
      className="relative py-24 px-6 md:px-12 bg-bgDark border-t border-white/5 overflow-hidden"
    >
      {/* Background glow highlights */}
      <div className="absolute w-[600px] h-[600px] rounded-full glow-bg-purple filter blur-[150px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-accentBlue" />
            <span className="text-xs font-display tracking-[0.3em] text-accentBlue uppercase font-semibold">
              CREDENTIALS
            </span>
            <span className="w-8 h-[1px] bg-accentBlue" />
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-textPrimary uppercase">
            Certifications
          </h2>
          <p className="text-textSecondary max-w-xl mx-auto font-light text-md leading-relaxed">
            Authorized training programs, technical courses, and certifications verifying specialized programming proficiencies.
          </p>
        </div>

        {/* Certificate Cards List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-8 pt-6">
          {certificationsData.map((cert, idx) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              idx={idx}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
