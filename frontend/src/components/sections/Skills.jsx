import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../../data/constants';
import * as Icons from 'lucide-react';

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-4 mb-16"
        >
          <span className="text-brand-primary font-mono text-sm tracking-widest uppercase">My Arsenal</span>
          <h2 className="text-3xl md:text-5xl font-bold">Technical Skills</h2>
          <div className="w-20 h-1 bg-brand-primary rounded-full mt-6"></div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {SKILLS.map((skill, idx) => {
            const Icon = Icons[skill.icon] || Icons.Code;
            return (
              <motion.div 
                key={idx} 
                variants={item}
                className="glass p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 hover:border-brand-primary/50 hover:bg-dark-card/80 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-dark-bg flex items-center justify-center group-hover:scale-110 group-hover:text-brand-primary transition-all">
                  <Icon size={28} className="text-dark-muted group-hover:text-brand-primary" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  <p className="text-xs text-dark-muted mt-1 uppercase tracking-wider font-mono">{skill.category}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
}
