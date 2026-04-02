const router = require('express').Router();
const { Content } = require('../models');
const auth = require('../middleware/auth');

const DEFAULTS = {
  hero: {
    name: 'Your Name',
    title: 'Software Developer',
    bio: 'I build fast, scalable, and elegant software solutions.',
    available: true,
    stats: { years: 3, projects: 20, clients: 10 }
  },
  about: {
    paragraphs: [
      "I'm a Software Developer with a deep love for building things that live on the internet.",
      "My approach: understand the problem deeply, design an elegant solution, and execute with precision.",
    ],
    terminal: ['Web Development', 'System Design', 'Open Source']
  },
  skills: [
    { name: 'Frontend Development', desc: 'React, Next.js, TypeScript, Tailwind', level: 90, icon: '⚛️' },
    { name: 'Backend Development', desc: 'Node.js, Python, REST APIs, GraphQL', level: 85, icon: '🛠️' },
    { name: 'Databases', desc: 'PostgreSQL, MongoDB, Redis', level: 80, icon: '🗄️' },
    { name: 'Cloud & DevOps', desc: 'AWS, Docker, CI/CD, Linux', level: 75, icon: '☁️' },
  ],
  projects: [
    { num: '01', title: 'Project Alpha', desc: 'A full-stack web application.', tags: ['React', 'Node.js'], demo: '#', github: '#' },
    { num: '02', title: 'API Gateway', desc: 'High-performance microservices gateway.', tags: ['Python', 'FastAPI'], demo: '#', github: '#' },
    { num: '03', title: 'DevDash CLI', desc: 'Developer productivity CLI tool.', tags: ['TypeScript', 'CLI'], demo: '#', github: '#' },
  ],
  contact: {
    email: 'you@email.com',
    github: 'github.com/yourname',
    linkedin: 'linkedin.com/in/yourname',
  }
};

// GET /api/content/:key - public
router.get('/:key', async (req, res) => {
  const doc = await Content.findOne({ key: req.params.key });
  res.json(doc ? doc.value : (DEFAULTS[req.params.key] || null));
});

// GET /api/content - all content
router.get('/', async (req, res) => {
  const docs = await Content.find();
  const result = { ...DEFAULTS };
  docs.forEach(d => { result[d.key] = d.value; });
  res.json(result);
});

// PUT /api/content/:key - admin only
router.put('/:key', auth, async (req, res) => {
  const doc = await Content.findOneAndUpdate(
    { key: req.params.key },
    { value: req.body.value },
    { upsert: true, new: true }
  );
  res.json(doc);
});

module.exports = router;
