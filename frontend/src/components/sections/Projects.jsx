import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../data/constants';
import { ExternalLink, Folder } from 'lucide-react';
import { Github } from '../common/Icons';

export default function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-4 mb-16"
        >
          <span className="text-brand-primary font-mono text-sm tracking-widest uppercase">Showcase</span>
          <h2 className="text-3xl md:text-5xl font-bold">Featured Projects</h2>
          <div className="w-20 h-1 bg-brand-primary rounded-full mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass rounded-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <Folder size={40} className="text-brand-primary" />
                  <div className="flex space-x-3">
                    <a href={project.github} className="text-dark-muted hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={project.live} className="text-dark-muted hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 hover:text-brand-primary transition-colors cursor-pointer">{project.title}</h3>
                <p className="text-dark-muted text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
                
                <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-dark-muted">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-2 py-1 bg-dark-bg rounded-md border border-dark-border">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
