import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all the required fields.');
      return;
    }

    setStatus('submitting');
    
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        subject: 'New Portfolio Contact Form Submission' // Satisfies backend validation requirement
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        throw new Error('Failed to parse server response');
      }

      if (response.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Email delivery failed');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Email delivery failed');
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-24 px-6 md:px-12 bg-bgDark border-t border-white/5 overflow-hidden"
    >
      {/* Background glow highlights */}
      <div className="absolute w-[600px] h-[600px] rounded-full glow-bg-blue filter blur-[150px] opacity-10 bottom-0 left-0 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full glow-bg-purple filter blur-[150px] opacity-10 top-0 right-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-accentBlue" />
            <span className="text-xs font-display tracking-[0.3em] text-accentBlue uppercase font-semibold">
              GET IN TOUCH
            </span>
            <span className="w-8 h-[1px] bg-accentBlue" />
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-textPrimary uppercase">
            Let's <span className="bg-gradient-to-r from-accentBlue to-accentPurple bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-textSecondary max-w-xl mx-auto font-light text-md leading-relaxed">
            Have a project in mind, an opportunity to discuss, or simply want to speak about full-stack engineering? Fill the portal below.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-display font-extrabold text-textPrimary">Contact Details</h3>
              <p className="text-textSecondary font-light text-sm leading-relaxed">
                Connect directly through standard social networks or email me directly. I usually reply within 24 business hours.
              </p>
            </div>

            <div className="space-y-4 font-display">
              {/* Mail */}
              <a 
                href="mailto:rajvanshsinghatal@gmail.com" 
                className="flex items-center gap-4 p-5 glass-card rounded-2xl border-white/5 hover:border-accentBlue/20 hover:bg-white/[0.02] transition-all group"
              >
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-accentBlue/30 group-hover:bg-accentBlue/5 transition-colors">
                  <Mail className="w-5 h-5 text-accentBlue" />
                </div>
                <div>
                  <div className="text-xs text-textSecondary font-semibold">EMAIL ME</div>
                  <div className="text-sm font-semibold text-textPrimary group-hover:text-accentBlue transition-colors">
                    rajvanshsinghatal@gmail.com
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com/in/rajvansh-singh-atal-456574251" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 glass-card rounded-2xl border-white/5 hover:border-accentPurple/20 hover:bg-white/[0.02] transition-all group"
              >
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-accentPurple/30 group-hover:bg-accentPurple/5 transition-colors">
                  <Linkedin className="w-5 h-5 text-accentPurple" />
                </div>
                <div>
                  <div className="text-xs text-textSecondary font-semibold">LINKEDIN</div>
                  <div className="text-sm font-semibold text-textPrimary group-hover:text-accentPurple transition-colors">
                    rajvansh-singh-atal-456574251
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/rajvansh-rv" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 glass-card rounded-2xl border-white/5 hover:border-white/15 hover:bg-white/[0.02] transition-all group"
              >
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-white/30 group-hover:bg-white/5 transition-colors">
                  <Github className="w-5 h-5 text-textPrimary" />
                </div>
                <div>
                  <div className="text-xs text-textSecondary font-semibold">GITHUB</div>
                  <div className="text-sm font-semibold text-textPrimary group-hover:text-accentBlue transition-colors">
                    rajvansh-rv
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 glass-card p-8 md:p-10 rounded-[32px] border-white/5 shadow-glass relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-xs font-display tracking-widest text-textSecondary uppercase font-bold text-left">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                  disabled={status === 'submitting'}
                  className="w-full px-5 py-4 bg-[#0d0d0f]/50 border border-white/5 rounded-xl text-textPrimary text-sm placeholder-white/20 focus:outline-none focus:border-accentBlue/50 focus:bg-[#0d0d0f] transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-display tracking-widest text-textSecondary uppercase font-bold text-left">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  required
                  disabled={status === 'submitting'}
                  className="w-full px-5 py-4 bg-[#0d0d0f]/50 border border-white/5 rounded-xl text-textPrimary text-sm placeholder-white/20 focus:outline-none focus:border-accentBlue/50 focus:bg-[#0d0d0f] transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-display tracking-widest text-textSecondary uppercase font-bold text-left">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  required
                  disabled={status === 'submitting'}
                  className="w-full px-5 py-4 bg-[#0d0d0f]/50 border border-white/5 rounded-xl text-textPrimary text-sm placeholder-white/20 focus:outline-none focus:border-accentPurple/50 focus:bg-[#0d0d0f] transition-all resize-none"
                />
              </div>

              {/* State feedback banner */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-xs flex items-center gap-2 font-display"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Thank you for reaching out. Your message has been sent successfully.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2 font-display"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-accentBlue to-accentPurple text-white rounded-xl text-sm font-display font-bold uppercase tracking-wider transition-all disabled:opacity-50 hover:brightness-110 shadow-blue-glow hover:shadow-purple-glow"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : status === 'success' ? (
                  'Message Sent ✓'
                ) : status === 'error' ? (
                  'Failed'
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
