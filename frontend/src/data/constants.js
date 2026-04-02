import { Code, Server, Database, Globe, Smartphone, GitBranch } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Shanilka Hirushan",
  title: "ICT Undergraduate | Aspiring Software Engineer | Passionate about Web Development",
  about: "I am an enthusiastic Information and Communication Technology (ICT) undergraduate at Uva Wellassa University of Sri Lanka. With a deep passion for software development and modern technologies, I am constantly exploring new frameworks and architectural patterns to build robust and scalable systems.",
  university: "Uva Wellassa University of Sri Lanka",
  degree: "Information and Communication Technology (ICT)",
  email: "shanilkacontact@example.com", // Placeholder
  linkedin: "https://linkedin.com/in/shanilka", // Placeholder
  github: "https://github.com/shanilka", // Placeholder
};

export const SKILLS = [
  { name: "Java", category: "Language", icon: "Code" },
  { name: "JavaScript", category: "Language", icon: "Code" },
  { name: "React", category: "Frontend", icon: "Globe" },
  { name: "HTML/CSS", category: "Frontend", icon: "Globe" },
  { name: "Spring Boot", category: "Backend", icon: "Server" },
  { name: "Node.js", category: "Backend", icon: "Server" },
  { name: "MySQL", category: "Database", icon: "Database" },
  { name: "Git", category: "Tools", icon: "GitBranch" },
];

export const PROJECTS = [
  {
    title: "Boolean Logic Solver and Hardware Simulator",
    description: "A comprehensive application designed to evaluate dynamic boolean logic gates, reduce logic expressions using Quine-McCluskey algorithms, and simulate combinatorial digital circuits.",
    tech: ["Java", "JavaFX", "Data Structures", "Algorithms"],
    github: "#",
    live: "#"
  },
  {
    title: "University Management System",
    description: "A full-stack application developed for managing student records, course enrollments, and faculty assignments.",
    tech: ["Spring Boot", "React", "MySQL", "Tailwind CSS"],
    github: "#",
    live: "#"
  },
  {
    title: "E-Commerce REST API",
    description: "A scalable backend service for handling product catalog, user authentication, and order processing for an online store front.",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    github: "#",
    live: "#"
  }
];
