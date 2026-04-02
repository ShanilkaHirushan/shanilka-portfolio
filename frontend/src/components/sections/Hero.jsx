import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/constants';
import { ArrowRight, Download, Mail, Phone } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';

export default function Hero() {
  const [roles] = useState([
    'Full Stack Developer',
    'Aspiring Software Engineer',
  ]);
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIdx];
    let timeout;
    if (!deleting && typed.length < role.length) {
      timeout = setTimeout(() => setTyped(role.slice(0, typed.length + 1)), 80);
    } else if (!deleting && typed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2500);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 40);
    } else if (deleting && typed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, roleIdx, roles]);

  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-4 py-2 w-fit">
              <span className="flex w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
              <span className="text-sm font-medium text-brand-primary uppercase tracking-wide">Available for opportunities</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Hello, I'm <br />
              <span className="text-gradient">{PERSONAL_INFO.name}</span>
            </h1>

            <div className="text-xl md:text-3xl text-dark-muted font-medium h-10 flex items-center">
              <span>{typed}</span>
              <span className="animate-pulse ml-1 text-brand-primary">|</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              {/* Download CV pill button */}
              <a
                href="/MDSH Menikpura_Full Stack_Developer_Internship_CV.pdf"
                download
                className="inline-flex items-center gap-2 border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-sm shadow-brand-primary/20"
              >
                <Download size={15} />
                <span className="tracking-wide">DOWNLOAD CV</span>
              </a>

              {/* Social icon buttons */}
              <div className="flex items-center gap-3">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Github size={18} />
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Linkedin size={18} />
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`}
                  className="w-10 h-10 rounded-full border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Mail size={18} />
                </a>
                <a href={`tel:${PERSONAL_INFO.phone}`}
                  className="w-10 h-10 rounded-full border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Image Placeholder - Could be replaced by actual image URL */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full p-2 bg-gradient-to-tr from-brand-primary to-brand-accent">
              <div className="w-full h-full rounded-full bg-dark-bg p-2 overflow-hidden flex items-center justify-center relative inner-shadow">
                <img
                  src="/profile.jpg"
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute top-10 -left-6 glass px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="w-6 h-6" />
                <span className="text-sm font-semibold">Java dev</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute bottom-12 -right-4 glass px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-6 h-6 animate-[spin_10s_linear_infinite]" />
                <span className="text-sm font-semibold">React exp</span>
              </motion.div>

              {/* <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 left-16 glass px-4 py-2 rounded-lg flex items-center space-x-2"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-6 h-6 rounded" />
                <span className="text-sm font-semibold">JS Mastery</span>
              </motion.div> */}

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
