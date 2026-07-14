export const profile = {
  name: 'Palepogu Epaphras Raju',
  shortName: 'Epaphras',
  initials: 'PE',
  title: 'Software Engineer',
  tagline: 'Building elegant, performant systems from front to back.',
  location: 'India',
  roles: [
    'Software Engineer',
    'Full Stack Developer',
    'Java Developer',
    'Machine Learning Enthusiast',
    'Problem Solver',
    'Open Source Learner',
  ],
  summary:
    'Software Engineer focused on full-stack development, the MERN stack, Java, and applied machine learning. I care about clean architecture, thoughtful interfaces, and the algorithms that make them fast.',
  email: 'epaphrasraju@gmail.com',
  socials: {
    github: 'https://github.com/EpaphrasRaju',
    leetcode: 'https://leetcode.com/EpaphrasRaju',
    linkedin: 'https://www.linkedin.com/in/palepogu-epaphras-raju',
  },
};

export const stats = [
  { label: 'Projects Built', value: 12, suffix: '+' },
  { label: 'DSA Problems Solved', value: 480, suffix: '+' },
  { label: 'Technologies', value: 18, suffix: '' },
  { label: 'Certifications', value: 6, suffix: '' },
];

export const about = {
  paragraphs: [
    'I am a Software Engineer who enjoys turning complex problems into clean, maintainable systems. My work spans full-stack web development, backend services in Java, and applied machine learning.',
    'I treat data structures and algorithms as a craft — the foundation behind every fast, reliable product I ship. I am always learning, always shipping, and always refining.',
  ],
  highlights: [
    'Full Stack Development with MERN',
    'Backend systems in Java & Spring',
    'Applied Machine Learning pipelines',
    'Strong DSA fundamentals (480+ problems)',
  ],
};

export const skills = [
  { name: 'React', category: 'Frontend', level: 92, color: '#61dafb' },
  { name: 'TypeScript', category: 'Frontend', level: 88, color: '#3178c6' },
  { name: 'Node.js', category: 'Backend', level: 85, color: '#83cd29' },
  { name: 'Express', category: 'Backend', level: 84, color: '#94a3b8' },
  { name: 'MongoDB', category: 'Database', level: 82, color: '#47a248' },
  { name: 'Java', category: 'Backend', level: 88, color: '#f89820' },
  { name: 'Python', category: 'Language', level: 80, color: '#3776ab' },
  { name: 'Machine Learning', category: 'AI', level: 75, color: '#a78bfa' },
  { name: 'Data Structures', category: 'CS', level: 90, color: '#38bdf8' },
  { name: 'Algorithms', category: 'CS', level: 88, color: '#22d3ee' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 90, color: '#06b6d4' },
  { name: 'Git', category: 'Tools', level: 86, color: '#f1502f' },
];

export const projects = [
  {
    id: 'p1',
    name: 'Neural Vision',
    tagline: 'Real-time image classification platform',
    description:
      'A full-stack ML platform that classifies images in real time using a convolutional neural network. Features a React dashboard, a FastAPI inference server, and batch processing with live confidence scores.',
    tech: ['React', 'TypeScript', 'Python', 'TensorFlow', 'FastAPI'],
    highlights: [
      'Sub-200ms inference latency',
      'Batch upload with progress streaming',
      'Model confidence visualization',
    ],
    metrics: [
      { label: 'Accuracy', value: '94.2%' },
      { label: 'Latency', value: '180ms' },
      { label: 'Classes', value: '120' },
    ],
    accent: '#a78bfa',
    github: 'https://github.com/EpaphrasRaju',
  },
  {
    id: 'p2',
    name: 'DevConnect',
    tagline: 'Social network for developers',
    description:
      'A MERN-stack developer community with real-time chat, code snippet sharing, authentication, and a personalized feed. Built with Socket.IO, JWT, and a Redis-backed job queue.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.IO'],
    highlights: [
      'Real-time messaging with Socket.IO',
      'JWT auth with refresh tokens',
      'Infinite-scroll personalized feed',
    ],
    metrics: [
      { label: 'Users', value: '1.2k' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Messages', value: '40k+' },
    ],
    accent: '#38bdf8',
    github: 'https://github.com/EpaphrasRaju',
  },
  {
    id: 'p3',
    name: 'AlgoVisualizer',
    tagline: 'Interactive algorithm visualizer',
    description:
      'An educational tool that visualizes sorting and pathfinding algorithms step-by-step. Users can adjust speed, generate custom inputs, and compare algorithm performance in real time.',
    tech: ['React', 'TypeScript', 'Canvas', 'Tailwind CSS'],
    highlights: [
      '12+ algorithms visualized',
      'Step-through and auto-play modes',
      'Side-by-side algorithm comparison',
    ],
    metrics: [
      { label: 'Algorithms', value: '12' },
      { label: 'Frame rate', value: '60fps' },
      { label: 'Stars', value: '180' },
    ],
    accent: '#22d3ee',
    github: 'https://github.com/EpaphrasRaju',
  },
  {
    id: 'p4',
    name: 'FinTrack',
    tagline: 'Personal finance dashboard',
    description:
      'A finance tracker with budgeting, expense categorization, and predictive spending insights using a regression model. Charts powered by Recharts, backend in Node.js with PostgreSQL.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Recharts', 'Python'],
    highlights: [
      'Predictive monthly spend model',
      'Auto-categorized transactions',
      'CSV import & export',
    ],
    metrics: [
      { label: 'Categories', value: '24' },
      { label: 'Accuracy', value: '89%' },
      { label: 'Records', value: '15k' },
    ],
    accent: '#34d399',
    github: 'https://github.com/EpaphrasRaju',
  },
];

export const education = [
  {
    period: '2021 — 2025',
    title: 'B.Tech in Computer Science',
    place: 'JNTU Kakinada',
    detail:
      'Coursework in Data Structures, Algorithms, Operating Systems, DBMS, and Machine Learning. Graduated with distinction.',
  },
  {
    period: '2019 — 2021',
    title: 'Higher Secondary (MPC)',
    place: 'Sri Chaitanya Junior College',
    detail: 'Focused on Mathematics, Physics, and Computer Science fundamentals.',
  },
];

export const certificates = [
  { name: 'Meta Front-End Developer', issuer: 'Coursera', year: '2024' },
  { name: 'Machine Learning Specialization', issuer: 'DeepLearning.AI', year: '2024' },
  { name: 'Java Full Stack Development', issuer: 'NPTEL', year: '2023' },
  { name: 'Data Structures & Algorithms', issuer: 'GeeksforGeeks', year: '2023' },
  { name: 'MongoDB Node.js Developer', issuer: 'MongoDB University', year: '2023' },
  { name: 'React - The Complete Guide', issuer: 'Udemy', year: '2022' },
];

export const githubStats = {
  username: 'EpaphrasRaju',
  repos: 38,
  stars: 240,
  commits: 1240,
  contributions: 612,
  topLanguages: [
    { name: 'TypeScript', pct: 34, color: '#3178c6' },
    { name: 'JavaScript', pct: 26, color: '#f7df1e' },
    { name: 'Java', pct: 18, color: '#f89820' },
    { name: 'Python', pct: 14, color: '#3776ab' },
    { name: 'Other', pct: 8, color: '#94a3b8' },
  ],
  reposList: [
    { name: 'neural-vision', desc: 'Real-time image classification platform', stars: 64, lang: 'TypeScript' },
    { name: 'devconnect', desc: 'Social network for developers (MERN)', stars: 52, lang: 'JavaScript' },
    { name: 'algo-visualizer', desc: 'Interactive algorithm visualizer', stars: 48, lang: 'TypeScript' },
    { name: 'fintrack', desc: 'Personal finance dashboard', stars: 36, lang: 'TypeScript' },
  ],
};

export const leetcodeStats = {
  username: 'EpaphrasRaju',
  solved: 480,
  easy: 210,
  medium: 220,
  hard: 50,
  streak: 42,
  ranking: 12480,
  categories: [
    { name: 'Arrays', count: 92, color: '#38bdf8' },
    { name: 'Strings', count: 68, color: '#a78bfa' },
    { name: 'DP', count: 54, color: '#22d3ee' },
    { name: 'Trees', count: 48, color: '#34d399' },
    { name: 'Graphs', count: 42, color: '#fbbf24' },
    { name: 'Linked Lists', count: 36, color: '#f472b6' },
  ],
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'github', label: 'GitHub' },
  { id: 'leetcode', label: 'LeetCode' },
  { id: 'contact', label: 'Contact' },
];
