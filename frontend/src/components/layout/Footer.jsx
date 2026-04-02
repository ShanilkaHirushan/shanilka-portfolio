import React from 'react';
import { PERSONAL_INFO } from '../../data/constants';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';

export default function Footer() {
  return (
    <footer className="border-t border-dark-border mt-20 pt-10 pb-8 relative z-10 glass rounded-none">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <p className="text-xl font-bold font-sans tracking-tight">
            Shanilka<span className="text-brand-primary">.</span>
          </p>
          <p className="text-dark-muted mt-2 text-sm">{PERSONAL_INFO.title}</p>
        </div>
        
        <div className="flex space-x-6 items-center mb-4 md:mb-0">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-dark-muted hover:text-brand-primary transition-colors">
            <Github size={20} />
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-dark-muted hover:text-brand-primary transition-colors">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="text-dark-muted hover:text-brand-primary transition-colors">
            <Mail size={20} />
          </a>
        </div>
        
        <div className="text-dark-muted text-sm flex flex-col items-end">
          <p>&copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
          <p className="text-xs mt-1">Built with React & Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
