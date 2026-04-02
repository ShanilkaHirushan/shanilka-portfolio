import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/constants';

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-4 mb-16"
        >
          <span className="text-brand-primary font-mono text-sm tracking-widest uppercase">Overview</span>
          <h2 className="text-3xl md:text-5xl font-bold">About Me</h2>
          <div className="w-20 h-1 bg-brand-primary rounded-full mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center glass p-8 md:p-12 rounded-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Passionate about shaping the future via <span className="text-brand-primary">Code</span></h3>
            <p className="text-dark-muted text-lg leading-relaxed mb-6">
              {PERSONAL_INFO.about}
            </p>
            <p className="text-dark-muted text-lg leading-relaxed">
              When I'm not studying or building side projects, I focus on analyzing modern software architecture and keeping my logical problem-solving skills sharp.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6"
          >
            <div className="glass p-6 rounded-xl border-l-4 border-l-brand-primary">
              <h4 className="text-xl font-semibold mb-2">Education Status</h4>
              <p className="text-dark-muted">Undergraduate</p>
              <p className="font-medium mt-1">{PERSONAL_INFO.degree}</p>
              <p className="text-sm text-dark-muted mt-1">{PERSONAL_INFO.university}</p>
            </div>
            
            <div className="glass p-6 rounded-xl border-l-4 border-l-brand-secondary">
              <h4 className="text-xl font-semibold mb-2">Core Focus</h4>
              <p className="text-dark-muted">Full Stack Development, System Verification, Algorithm Design.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
