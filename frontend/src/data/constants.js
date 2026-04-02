import { Code, Server, Database, Globe, GitBranch } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Shanilka Hirushan",
  title: "Full Stack Developer | Aspiring Software Engineer | Passionate about Web Development",
  about: "Full Stack Developer undergraduate at Uva Wellassa University with experience in React, Node.js, and Python. Skilled in building scalable web apps, REST APIs, and working with databases and Docker. Strong in OOP and data structures, with a fast learning mindset. Seeking a Full Stack Developer internship to grow and contribute from day one.",
  university: "Uva Wellassa University of Sri Lanka",
  degree: "Information and Communication Technology (ICT)",
  email: "shanilka13hirushan@gmail.com",
  phone: "+94 72 168 7584",
  linkedin: "https://www.linkedin.com/in/shanilka-hirushan",
  github: "https://github.com/ShanilkaHirushan",
};

export const SKILLS = [
  { name: "Java", category: "Language", icon: "Code" },
  { name: "JavaScript", category: "Language", icon: "Code" },
  { name: "React", category: "Frontend", icon: "Globe" },
  { name: "Python", category: "Backend", icon: "Server" },
  { name: "HTML/CSS", category: "Frontend", icon: "Globe" },
  { name: "FastAPI", category: "Backend", icon: "Server" },
  { name: "Node.js", category: "Backend", icon: "Server" },
  { name: "MySQL", category: "Database", icon: "Database" },
  { name: "Git", category: "Tools", icon: "GitBranch" },
  { name: "Docker", category: "Tools", icon: "GitBranch" },
  { name: "PostgreSQL", category: "Database", icon: "Database" },
  { name: "MongoDB", category: "Database", icon: "Database" },
];

export const PROJECTS = [
  {
    title: "AI-Powered Financial Fraud Detection System",
    date: "NOV 2025 - Present",
    role: "Full stack Developer & Tester",
    description: "Designed and implemented PostgreSQL database models and schema for efficient transaction storage and retrieval. Developed RESTful API endpoints for transaction input and CRUD operations. Integrated improved machine learning model with backend APIs to support real-time fraud detection. Built FraudNet graph visualization module for interactive analysis of suspicious transaction patterns.",
    tech: ["FastAPI", "Python", "React 18", "PostgreSQL", "REST APIs", "Docker", "Git"],
    github: "https://github.com/deep-scan-ai/ai-powered-fraud-detection",
    live: "#"
  },
  {
    title: "Inventory Management System",
    date: "JUN 2025 – JUL 2025",
    role: "Full stack Developer & Tester",
    description: "Developed a desktop based inventory system with role based access control and real time stock monitoring for SMEs. Designed and implemented modular OOP architecture with an intuitive JavaFX UI. Integrated local SQLite/MySQL database for efficient storage and transactions. Built comprehensive testing suite using JUnit 5, achieving high test coverage.",
    tech: ["Java", "JavaFX", "SQLite", "MySQL", "OOP", "JUnit 5", "Git"],
    github: "https://github.com/logicsimplifier/inventory-management-system",
    live: "#"
  },
  {
    title: "Boolean Logic Solver & Digital Hardware Simulator",
    date: "JUN 2025 - SEP 2025",
    role: "Full stack Developer & Tester",
    description: "Engineered a desktop application for Boolean simplification (Algebraic, Truth Table, K-Map) and real-time circuit simulation. Built a simulation engine supporting 15+ logic gate components with sub-100ms response time and an interactive drag-and-drop interface. Developed a 4-variable Boolean expression simplification engine achieving 95–99% accuracy.",
    tech: ["Electron.js", "React.js", "Python", "Git", "GitHub"],
    github: "https://github.com/logicsimplifier/boolean_logic_solver",
    live: "#"
  },
  {
    title: "Smart Food Delivery Platform",
    date: "NOV 2024 - JUL 2025",
    role: "Full stack Developer",
    description: "Built a full-stack food ordering platform serving 100+ students with QR-based cashless payments and nutrition tracking. Developed admin dashboard and mobile/web applications, reducing order processing time by 40% and achieving 95% order accuracy. Implemented real-time order management using WebSockets for kitchen staff and delivery riders.",
    tech: ["MERN Stack", "Tailwind CSS", "RESTful APIs", "WebSockets"],
    github: "https://github.com/uwufts22/uwufood-web-frontend",
    live: "#"
  }
];

export const CERTIFICATIONS = [
  {
    title: "Programming in Python - 1. Python for Beginners",
    issuer: "University of Moratuwa",
    date: "November 2025",
    credentialId: "sCntR5wYwp",
    link: "https://open.uom.lk/verify",
    image: "/python-cert.png"
  },
  {
    title: "KodeKloud Engineer - Docker (Level 1)",
    issuer: "KodeKloud",
    date: "November 2025",
    credentialId: "2706b552-Fb1c-4215-800a-F6df10786df5",
    link: "https://engineer.kodekloud.com/certificate-verification/2706b552-fb1c-4215-800a-f6df10786df5",
    image: "/docker-cert.png"
  }
];
