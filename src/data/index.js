export const roles = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Backend Developer",
  "UI/UX Enthusiast",
  "Creative Web Engineer",
];

export const projects = [
  {
    id: 1,
    title: "Institut Espagnol",
    category: "Full Stack",
    tag: "Education Platform",
    description: "A multilingual institutional platform for a Spanish language institute — dynamic course catalog, contact pipeline, and rich editorial storytelling.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Vercel"],
    backend: ["API Routes", "Email Service", "Form Validation"],
    architecture: "Next.js App Router · Server Components · serverless email handler",
    year: "2026",
    color: "#e4572e",
    index: "01",
    live: "https://institut-espagnol.vercel.app/",
    repo: "https://github.com/yanissem2007-prog",
    image: "/projects/institut-espagnol.png",
    featured: true,
  },
  {
    id: 2,
    title: "ESBA Academy",
    category: "Full Stack",
    tag: "Sports / Academy",
    description: "Visual identity site for an elite basketball academy — high-contrast composition, athlete CMS, registration intake and dynamic news.",
    stack: ["React", "Tailwind", "GSAP", "Framer Motion", "Node.js"],
    backend: ["REST API", "Form Handling", "Data Validation"],
    architecture: "React SPA · Vercel Edge · serverless intake endpoints",
    year: "2026",
    color: "#f59e0b",
    index: "02",
    live: "https://esba.vercel.app/",
    repo: "https://github.com/yanissem2007-prog",
    image: "/projects/esba.png",
    featured: true,
  },
  {
    id: 3,
    title: "The Lincoln Group",
    category: "Frontend",
    tag: "Luxury Real Estate",
    description: "Cinematic property storytelling with refined typography, scroll choreography and investment-grade presentation.",
    stack: ["React", "Vite", "Tailwind", "Lenis"],
    backend: ["Static · Edge Cached"],
    architecture: "SPA · CDN delivery · prerendered routes",
    year: "2026",
    color: "#c9a96e",
    index: "03",
    live: "https://lincolin-group.vercel.app/",
    repo: "https://github.com/yanissem2007-prog",
    image: "/projects/lincoln-group.png",
  },
  {
    id: 4,
    title: "Zodiac Cuisine",
    category: "UI/UX",
    tag: "Bespoke Interiors",
    description: "Premium showroom for custom kitchens — warm editorial imagery and polished luxury brand interactions.",
    stack: ["React", "Vite", "Tailwind", "Framer Motion"],
    backend: ["Lead capture API"],
    architecture: "SPA · API form pipeline · email forward",
    year: "2026",
    color: "#d5b98f",
    index: "04",
    live: "https://kodiac-snowy.vercel.app/",
    repo: "https://github.com/yanissem2007-prog",
    image: "/projects/zodiac-cuisine.png",
  },
  {
    id: 5,
    title: "Nexdell AI",
    category: "Full Stack",
    tag: "AI Automation",
    description: "Dark, conversion-focused landing for an AI automation agency — booking flow, lead pipeline and analytics-ready architecture.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    backend: ["API Routes", "Webhook Pipeline", "Analytics"],
    architecture: "Next.js · Edge functions · third-party CRM webhook",
    year: "2026",
    color: "#6f8bff",
    index: "05",
    live: "https://nextdel-tau.vercel.app/",
    repo: "https://github.com/yanissem2007-prog",
    image: "/projects/nexdell-ai.png",
  },
];

export const projectCategories = ["All", "Full Stack", "Frontend", "UI/UX"];

export const work = {
  id: "work",
  name: "WORK",
  tagline: "Reinventing how teams build and organize work",
  status: "In Development · 2026",
  flag: "FLAGSHIP FULL-STACK PROJECT",
  intro: "A futuristic full-stack platform combining a professional social network, recruitment hub, student ecosystem, AI assistant and communities — built around speed, identity and craft.",
  problem: "Today's professional tools are fragmented — LinkedIn for networking, separate job boards for hiring, scattered Discords for community, and disconnected AI tools. Students and early-career builders pay the price: noise, friction, and no single place to grow.",
  solution: "WORK unifies the entire professional journey into one cinematic workspace. Network, get hired, learn, collaborate and build your CV — with an AI assistant woven through every surface.",
  vision: "A next-gen workspace where individuals, students, recruiters and communities meet. Premium-feeling, mobile-first, real-time, and engineered to scale.",
  features: [
    {
      title: "Professional Social Network",
      desc: "A focused feed for builders — posts, threads, follows, friends and reputation, designed for signal over noise.",
      icon: "Users",
    },
    {
      title: "Recruitment Platform",
      desc: "Jobs, applications, student & recruiter accounts. Smart matching, status tracking and a clean candidate pipeline.",
      icon: "Briefcase",
    },
    {
      title: "AI-Assisted Workflows",
      desc: "Native assistant for CV writing, job search, profile coaching, post drafting and instant Q&A across the platform.",
      icon: "Sparkles",
    },
    {
      title: "CV Builder",
      desc: "Composable, beautifully typeset CV templates. Live preview, PDF export, AI-suggested phrasing.",
      icon: "FileText",
    },
    {
      title: "Communities & Group Chats",
      desc: "Topic-based communities with moderation tools, channels, threads, and real-time group conversations.",
      icon: "MessageCircle",
    },
    {
      title: "Real-Time Messaging",
      desc: "1:1 DMs, group chats, typing indicators, read receipts, presence — built on Socket.io with optimistic UX.",
      icon: "Zap",
    },
    {
      title: "Notifications System",
      desc: "Real-time, granular and persisted. In-app, email and push-ready architecture with per-channel preferences.",
      icon: "Bell",
    },
    {
      title: "Identity & Auth",
      desc: "Email + Google + GitHub OAuth via JWT, role-based access (student / recruiter / admin), session security.",
      icon: "Shield",
    },
  ],
  stack: {
    frontend: ["Next.js", "TypeScript", "TailwindCSS", "shadcn/ui", "Framer Motion", "GSAP", "Three.js", "Lenis", "Zustand"],
    backend: ["Node.js", "Express.js", "Socket.io", "REST APIs", "JWT", "OAuth (Google · GitHub)"],
    data: ["MongoDB", "Mongoose", "Cloudinary (media)"],
    infra: ["Vercel", "CI/CD", "Edge caching", "Rate limiting"],
  },
  pillars: [
    { label: "Cinematic UX",      desc: "Motion-rich, opinionated, premium across every surface." },
    { label: "Real-time core",    desc: "Socket.io for presence, chat, notifications and live updates." },
    { label: "Mobile-first",      desc: "Designed for thumbs. Every interaction works flawlessly on phone." },
    { label: "Scalable backend",  desc: "Modular services, validation at boundaries, schema-driven." },
    { label: "AI woven in",       desc: "Assistance lives where the work happens — not in a separate tab." },
    { label: "Identity-driven",   desc: "Personal brand surfaces in feed, CV, profile and communities." },
  ],
  inspirations: ["LinkedIn", "Twitter / X", "Discord", "Apple", "Framer", "Linear", "Stripe"],
  links: {
    case: "#work",
    repo: "https://github.com/yanissem2007-prog",
    live: null,
  },
};

export const skillStacks = [
  {
    label: "Frontend",
    accent: "#c9a96e",
    blurb: "Composable interfaces with React, Next.js & Tailwind.",
    items: [
      { name: "React",          level: 92 },
      { name: "Next.js",        level: 86 },
      { name: "TypeScript",     level: 84 },
      { name: "Tailwind CSS",   level: 95 },
      { name: "Framer Motion",  level: 88 },
      { name: "shadcn/ui",      level: 82 },
    ]
  },
  {
    label: "Backend",
    accent: "#9bb39c",
    blurb: "Type-safe APIs, auth, validation, secure handlers.",
    items: [
      { name: "Node.js",         level: 86 },
      { name: "Express",         level: 82 },
      { name: "Next.js API",     level: 88 },
      { name: "REST APIs",       level: 88 },
      { name: "Auth (JWT/OAuth)",level: 80 },
      { name: "Zod Validation",  level: 84 },
    ]
  },
  {
    label: "Database",
    accent: "#a8b5c4",
    blurb: "Schema design, migrations, and query performance.",
    items: [
      { name: "PostgreSQL",   level: 80 },
      { name: "Prisma ORM",   level: 84 },
      { name: "Supabase",     level: 82 },
      { name: "Firebase",     level: 78 },
      { name: "MongoDB",      level: 74 },
      { name: "SQL Modeling", level: 80 },
    ]
  },
  {
    label: "DevOps & Tools",
    accent: "#e4a17c",
    blurb: "Ship fast, monitor, and keep production calm.",
    items: [
      { name: "Vercel",          level: 92 },
      { name: "Git / GitHub",    level: 90 },
      { name: "CI/CD",           level: 80 },
      { name: "Performance Opt", level: 84 },
      { name: "Figma",           level: 84 },
      { name: "Testing",         level: 76 },
    ]
  },
];

export const toolBadges = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Prisma',
  'PostgreSQL', 'Supabase', 'Firebase', 'Tailwind', 'Framer Motion',
  'GSAP', 'Figma', 'Git', 'Vercel', 'shadcn/ui', 'REST', 'JWT',
  'Zod', 'OAuth', 'Stripe', 'Lighthouse', 'SEO', 'A11y'
];

export const journey = [
  {
    year: "2022",
    label: "First Line of Code",
    desc: "Discovered HTML & CSS. Recreated layouts from Apple, Stripe and Linear pixel-by-pixel.",
    tag: "Foundations",
  },
  {
    year: "2023",
    label: "JavaScript & The DOM",
    desc: "Deep dive into ES6+, async/await, fetch. Built first interactive UIs and connected them to public APIs.",
    tag: "Frontend",
  },
  {
    year: "2024",
    label: "React + Component Thinking",
    desc: "Adopted React, learned composition, state, hooks. Tailwind became the visual language. Shipped first client project.",
    tag: "Frontend",
  },
  {
    year: "2025",
    label: "Going Full Stack",
    desc: "Node.js, Express, REST APIs, Prisma & PostgreSQL. Authentication, validation, secure form pipelines. Frontend met backend.",
    tag: "Backend",
  },
  {
    year: "2026",
    label: "Production-Grade Web",
    desc: "Shipping cinematic, type-safe Next.js applications with real APIs, databases and motion — end-to-end ownership.",
    tag: "Full Stack",
  },
];

export const stats = [
  { value: "15+", label: "Shipped Projects" },
  { value: "4+",  label: "Years Coding" },
  { value: "20+", label: "APIs Designed" },
  { value: "99",  label: "Lighthouse Avg" },
];

export const marqueeItems = [
  "FULL STACK DEVELOPER",
  "REACT · NEXT.JS",
  "NODE.JS · POSTGRES",
  "PRISMA · SUPABASE",
  "TYPESCRIPT",
  "MOTION DESIGN",
  "UI / UX",
  "PRODUCTION READY",
];

export const contact = {
  email: "yanissem2007@gmail.com",
  phone: "0698624320",
  instagram: "https://www.instagram.com/yanis__sem/",
  github: "https://github.com/yanissem2007-prog",
  linkedin: "https://www.linkedin.com/in/yanis-semmar-4b02b639b/",
};
