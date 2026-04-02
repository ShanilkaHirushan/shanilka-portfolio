import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../../data/constants';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-4 mb-16"
        >
          <span className="text-brand-primary font-mono text-sm tracking-widest uppercase">Academic Background</span>
          <h2 className="text-3xl md:text-5xl font-bold">Education</h2>
          <div className="w-20 h-1 bg-brand-primary rounded-full mt-6"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass relative p-8 md:p-10 rounded-3xl"
          >
            <div className="absolute top-0 right-10 -translate-y-1/2 w-16 h-16 bg-brand-primary flex items-center justify-center rounded-2xl shadow-lg shadow-brand-primary/30">
              <GraduationCap size={32} className="text-white" />
            </div>

            <h3 className="text-2xl font-bold mb-2">{PERSONAL_INFO.degree}</h3>
            <h4 className="text-xl text-brand-primary mb-6">{PERSONAL_INFO.university}</h4>
            
            <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-8 text-dark-muted mb-6">
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>Present</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>Sri Lanka</span>
              </div>
            </div>

            <p className="text-dark-muted leading-relaxed">
              Currently pursuing my undergraduate studies with a focus on comprehensive software engineering principles, 
              algorithm design, and full-stack web development. Engaging in practical projects to solidify conceptual knowledge.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
