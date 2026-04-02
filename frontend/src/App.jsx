import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1a0b2e] via-dark-bg to-[#050308] text-dark-text overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 inset-x-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-primary/15 blur-[140px]" />
        <div className="absolute top-[40%] right-[-5%] w-[30%] h-[40%] rounded-full bg-brand-secondary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-brand-accent/15 blur-[150px]" />
      </div>

      <Navbar />
      
      <main className="relative z-10 pt-24 pb-12 space-y-32">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
