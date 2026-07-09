export const profile = {
  name: 'Abdoali Mazhar Zakir',
  role: 'Software Engineer & Creative Developer',
  location: 'Sydney, AU',
  tagline: 'UNSW 2026',
  email: 'abdoali30112004@gmail.com',
  phone: '+61 478 356 517',
  linkedin: 'https://www.linkedin.com/in/abdoali-zakir-08b739249/',
  github: 'https://github.com/abdoali-zakir',
  resume: '/Abdoali_Zakir_Resume.pdf',
  bio: `Full-stack software engineer specialising in scalable data systems and applied ML —
shipping production pipelines from a Neo4j financial crime knowledge graph at TCS to an
enterprise ETL platform with self-healing data quality built on Medallion Architecture.
Delivered measurable impact across the stack: cut manual workflows by 30%, boosted automated
test coverage by 45%, and uncovered 12+ critical vulnerabilities through systematic fuzzing.
Currently driving citation-link prediction research at UNSW using heterogeneous graph neural
networks, while supporting data-driven sponsorship analytics at Futures Sport & Entertainment
(IPG Omnicom).`,
  stats: [
    { num: "Dec '26", label: 'Graduating' },
    { num: '3', label: 'Internships' },
    { num: '8+', label: 'Projects' },
    { num: 'ETL · GNN', label: 'Specialisation' },
  ],
};

export const experience = [
  {
    title: 'Data Analytics Intern',
    company: 'Futures Sport & Entertainment',
    sub: 'IPG DXTRA / Omnicom',
    date: 'Jul 2026 – Sep 2026',
    bullets: [
      'Joined the Data Analytics team supporting data-driven sponsorship and audience insight work across sport and entertainment clients.',
      'Working across data collection, cleaning, and analysis to support client-facing reporting and insight generation, three days per week through the internship period.',
    ],
  },
  {
    title: 'Project Engineer Intern',
    company: 'Tata Consultancy Services (TCS)',
    date: 'Jan 2026 – Feb 2026',
    bullets: [
      'Built a Financial Crime Compliance knowledge graph by transforming large-scale transaction datasets into structured graph entities using Neo4j, enabling advanced network analysis for fraud detection.',
      'Applied graph similarity algorithms to identify hidden relationships between accounts, supporting fraud-risk analysis across complex financial networks.',
      'Presented data findings and methodology to industry stakeholders, translating technical graph metrics into plain-language risk insights within an Agile delivery team.',
      'Collaborated in a multi-disciplinary Agile team, contributing to planning, milestone reviews, and final technical presentations.',
    ],
  },
  {
    title: 'Data and Automation Developer',
    company: 'Enigma Technical Society',
    date: 'Sep 2023 – May 2024',
    bullets: [
      'Built internal reporting and automation scripts in Python to track and analyse society operations data, cutting manual reporting effort by 30%.',
      'Designed and maintained a PostgreSQL data layer for event and membership data, ensuring clean, query-ready datasets for a 6-member Agile team.',
      'Automated data-refresh and deployment workflows using GitHub Actions CI/CD pipelines, reducing manual errors in recurring data updates.',
      'Contributed to brainstorming sessions and technical documentation, reinforcing code quality and collaborative development practices.',
    ],
  },
];

export const projects = [
  {
    id: 'sentinel',
    name: 'Sentinel ETL',
    tagline: 'Self-Healing Data Pipeline Platform',
    date: 'Jun 2026 · Personal',
    featured: true,
    desc: 'Enterprise-grade ETL platform built on Medallion Architecture (Bronze / Silver / Gold layers) — automatically ingests, validates, repairs, and transforms datasets end-to-end. The self-healing engine detects and remediates missing values, duplicates, schema drift, and type mismatches at runtime, with full audit logging and data lineage tracking.',
    tags: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'DuckDB', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    github: 'https://github.com/abdoali-zakir/Sentinal_ETL',
    demo: null,
  },
  {
    id: 'terracast',
    name: 'TerraCast',
    tagline: 'Viticulture Weather & Advisory Platform',
    date: 'Feb – May 2026',
    desc: 'Serverless ETL pipelines on AWS Amplify / Lambda ingest multi-source weather data; a Next.js App Router frontend and GPT-4o-mini generative AI produce forecast-based vineyard recommendations.',
    tags: ['Next.js', 'AWS Amplify', 'OpenAI API', 'TypeScript'],
    github: null,
    demo: null,
  },
  {
    id: 'cdchgn',
    name: 'Citation Prediction — CDCHGN',
    tagline: 'Thesis: Heterogeneous Graph Neural Networks',
    date: '2026 · Thesis',
    desc: 'Heterogeneous graph neural network models for academic citation link prediction using community detection, dual-clustering, and node embeddings on large-scale graph datasets.',
    tags: ['PyTorch', 'GNN', 'Neo4j', 'Python'],
    github: null,
    demo: null,
  },
  {
    id: 'toohak',
    name: 'TOOHAK',
    tagline: 'Gamified Real-Time Quiz Platform',
    date: 'Feb – May 2025',
    desc: 'Multiplayer session management with Express.js APIs, a React frontend, and full backend coverage with Jest unit tests and Postman integration tests.',
    tags: ['React', 'Express.js', 'Jest', 'Postman'],
    github: null,
    demo: null,
  },
  {
    id: 'invoice-api',
    name: 'Cloud Invoice Backend API',
    tagline: 'Full-SDLC RESTful API',
    date: 'Feb – May 2025',
    desc: 'Node.js / Express API with PostgreSQL and auth middleware, containerised with Docker and deployed to AWS with CI/CD pipelines and comprehensive Postman test coverage.',
    tags: ['Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    github: null,
    demo: null,
  },
  {
    id: 'fuzzing',
    name: 'Automated Testing & Fuzzing Framework',
    tagline: 'QA Framework for an Airline Check-In System',
    date: 'Jun – Aug 2025',
    desc: 'Python integration test framework with fuzz modules that generated randomised edge cases, uncovering 12+ input vulnerabilities and boosting test coverage by 45%.',
    tags: ['Python', 'Pytest', 'Fuzzing', 'QA'],
    github: null,
    demo: null,
  },
];

export const education = [
  {
    degree: 'Bachelor of Engineering (Honours) — Software Engineering',
    school: 'University of New South Wales (UNSW), Sydney',
    year: 'Sep 2024 – Dec 2026',
  },
  {
    degree: 'Bachelor of Science — Computer Science & Engineering',
    school: 'International Centre for Applied Sciences, Manipal University',
    year: 'Jul 2022 – May 2024',
  },
];

// Skills shown as progress cards — level is illustrative (years/depth of use)
export const skills = [
  { name: 'Python', level: 92, cat: 'lang' },
  { name: 'TypeScript', level: 78, cat: 'lang' },
  { name: 'SQL / Cypher', level: 85, cat: 'lang' },
  { name: 'FastAPI', level: 80, cat: 'fw' },
  { name: 'Next.js / React', level: 82, cat: 'fw' },
  { name: 'PyTorch', level: 70, cat: 'fw' },
  { name: 'AWS', level: 75, cat: 'cloud' },
  { name: 'Docker & CI/CD', level: 80, cat: 'cloud' },
  { name: 'Neo4j / Graph DBs', level: 85, cat: 'data' },
  { name: 'PostgreSQL', level: 82, cat: 'data' },
];

// Tech graph — same nodes/edges as the static site's Skills graph
export const CAT_COLORS = {
  lang: '#4A90D9',
  fw: '#9B59B6',
  cloud: '#E67E22',
  data: '#27AE60',
};

export const techNodes = [
  { name: 'Python', cat: 'lang', x: 150, y: 150 },
  { name: 'TypeScript', cat: 'lang', x: 430, y: 90 },
  { name: 'FastAPI', cat: 'fw', x: 330, y: 230 },
  { name: 'Next.js', cat: 'fw', x: 560, y: 90 },
  { name: 'React', cat: 'fw', x: 700, y: 170 },
  { name: 'Express.js', cat: 'fw', x: 760, y: 290 },
  { name: 'Node.js', cat: 'fw', x: 620, y: 340 },
  { name: 'PyTorch', cat: 'fw', x: 180, y: 320 },
  { name: 'Pytest', cat: 'fw', x: 60, y: 230 },
  { name: 'AWS', cat: 'cloud', x: 830, y: 230 },
  { name: 'Docker', cat: 'cloud', x: 560, y: 400 },
  { name: 'GitHub Actions', cat: 'cloud', x: 760, y: 430 },
  { name: 'PostgreSQL', cat: 'data', x: 480, y: 470 },
  { name: 'DuckDB', cat: 'data', x: 250, y: 420 },
  { name: 'Neo4j', cat: 'data', x: 140, y: 470 },
  { name: 'GNN', cat: 'data', x: 60, y: 400 },
];

export const techEdges = [
  ['Python', 'FastAPI'], ['Python', 'PyTorch'], ['Python', 'Pytest'], ['Python', 'DuckDB'],
  ['PyTorch', 'GNN'], ['GNN', 'Neo4j'],
  ['FastAPI', 'Docker'], ['FastAPI', 'DuckDB'],
  ['Docker', 'AWS'], ['Docker', 'PostgreSQL'], ['Docker', 'GitHub Actions'],
  ['AWS', 'GitHub Actions'],
  ['Next.js', 'TypeScript'], ['Next.js', 'React'], ['Next.js', 'AWS'],
  ['React', 'Express.js'], ['Express.js', 'Node.js'], ['Node.js', 'TypeScript'],
  ['Express.js', 'PostgreSQL'],
];

// which project each tech powers — for the graph hover tooltip
export const techToProjects = {
  Python: ['Sentinel ETL', 'Citation Prediction — CDCHGN', 'Automated Testing & Fuzzing Framework'],
  TypeScript: ['Sentinel ETL', 'TerraCast'],
  FastAPI: ['Sentinel ETL'],
  'Next.js': ['Sentinel ETL', 'TerraCast'],
  React: ['TOOHAK'],
  'Express.js': ['TOOHAK'],
  'Node.js': ['Cloud Invoice Backend API'],
  PyTorch: ['Citation Prediction — CDCHGN'],
  Pytest: ['Automated Testing & Fuzzing Framework'],
  AWS: ['TerraCast', 'Cloud Invoice Backend API'],
  Docker: ['Sentinel ETL', 'Cloud Invoice Backend API'],
  'GitHub Actions': ['Sentinel ETL'],
  PostgreSQL: ['Sentinel ETL', 'Cloud Invoice Backend API'],
  DuckDB: ['Sentinel ETL'],
  Neo4j: ['Citation Prediction — CDCHGN'],
  GNN: ['Citation Prediction — CDCHGN'],
};

export const extras = [
  { role: 'Lead Volunteer', org: 'Voluntary Service Overseas (VSO)', period: 'Jun 2023 – May 2024 · Manipal' },
  { role: 'Secretary', org: 'Social Football Society, UNSW', period: 'Mar 2024 – Present · Sydney' },
  { role: 'Sports Captain', org: 'International Centre for Applied Sciences', period: 'Jun 2023 – May 2024 · Manipal' },
];
