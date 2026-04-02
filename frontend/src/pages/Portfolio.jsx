import { useEffect, useState } from 'react';
import { fetchAllContent, sendContact } from '../api';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const DEFAULT = {
  hero: { name: 'Your Name', title: 'Software Developer', bio: 'Building fast, scalable, elegant software.', available: true, stats: { years: 3, projects: 20, clients: 10 } },
  about: { paragraphs: ["I'm a Software Developer who loves building on the internet.", "Clean code. Elegant design. Precise execution."], terminal: ['Web Development', 'System Design', 'Open Source'] },
  skills: [{ name: 'Frontend', desc: 'React, Next.js, TypeScript', level: 90, icon: '⚛️' }, { name: 'Backend', desc: 'Node.js, Python, REST APIs', level: 85, icon: '🛠️' }, { name: 'Databases', desc: 'PostgreSQL, MongoDB, Redis', level: 80, icon: '🗄️' }, { name: 'Cloud & DevOps', desc: 'AWS, Docker, CI/CD', level: 75, icon: '☁️' }],
  projects: [{ num: '01', title: 'Project Alpha', desc: 'Full-stack web application with real-time features.', tags: ['React', 'Node.js', 'PostgreSQL'], demo: '#', github: '#' }, { num: '02', title: 'API Gateway', desc: 'High-performance microservices gateway.', tags: ['Python', 'FastAPI', 'Redis'], demo: '#', github: '#' }, { num: '03', title: 'DevDash CLI', desc: 'Developer productivity CLI tool.', tags: ['TypeScript', 'CLI'], demo: '#', github: '#' }],
  contact: { email: 'shanilka13hirushan@gmail.com', github: 'https://github.com/ShanilkaHirushan', linkedin: 'www.linkedin.com/in/shanilka-hirushan' },
};

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    // Slight delay to allow DOM to render before observing
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    }, 100);

    return () => obs.disconnect();
  }, []);
}

export default function Portfolio() {
  const [content, setContent] = useState(DEFAULT);
  const [formState, setFormState] = useState('idle');

  useReveal();

  useEffect(() => {
    fetchAllContent().then(setContent).catch(() => { });
  }, []);

  const handleContact = async (e, form, resetForm) => {
    e.preventDefault();
    setFormState('loading');
    try {
      await sendContact(form);
      setFormState('success');
      resetForm();
    } catch {
      setFormState('error');
    }
  };

  const { hero, about, skills, projects, contact } = content;

  return (
    <>
      <Navbar name={hero.name} />
      <Hero data={hero} />
      <About data={about} title={hero.title} available={hero.available} />
      <Skills data={skills} />
      <Projects data={projects} />
      <Contact data={contact} handleContact={handleContact} formState={formState} />
      <Footer name={hero.name} />
    </>
  );
}
