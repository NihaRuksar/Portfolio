import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'motion/react';
import { Github, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';

const projects = [
// ... (projects array remains the same)
  {
    id: 6,
    title: 'AI-Powered Smart HR Assistant',
    subtitle: 'An intelligent recruitment platform that screens resumes, scores candidates, and generates interview questions — powered by LangGraph agents and Groq LLM.',
    description: 'A full-stack HR management system where recruiters can post job listings, manage candidate pipelines, and delegate the heavy lifting to an AI agent that reads resumes, scores applicants against job requirements, and auto-generates role-specific interview questions — all within a role-protected dashboard.',
    keyChallenges: [
      'Multi-step LangGraph agent pipeline',
      'Role-Based Access Control (Admin / Recruiter / Viewer)',
      'Async API design with FastAPI',
      'State management with Redux',
      'ORM-based database layer with SQLAlchemy'
    ],
    tech: ['Python', 'FastAPI', 'React', 'Redux Toolkit', 'Tailwind CSS', 'LangChain', 'LangGraph', 'Groq API', 'MySQL', 'SQLAlchemy', 'REST APIs', 'RBAC', 'Git'],
    image: 'https://i.ibb.co/nNDPWBgn/resized-image.png',
    demoUrl: '#',
    tags: ['In Progress', 'AI']
  },
  {
    id: 1,
    title: 'AI-First CRM',
    subtitle: 'HCP Module',
    description: 'Built a split-screen AI-first CRM for Healthcare Professional interaction logging using React and Redux for state management. Designed and implemented a LangGraph agent with five tools: Log Interaction, Edit Interaction, Fetch HCP Profile, Schedule Follow-up, Analyze Sentiment. Integrated Groq LLM (gemma2-9b-it) for natural language entity extraction enabling automatic form population. Developed RESTful APIs using FastAPI and SQLAlchemy ORM for MySQL persistence. Implemented structured prompt engineering and fallback JSON parsing for reliable production-grade AI outputs.',
    keyChallenges: [
      'Orchestrating reliable JSON outputs from Large Language Models',
      'Managing complex state synchronization across split-screen interfaces',
      'Designing robust multi-agent tool execution flows and fallback parsing'
    ],
    technicalDecisions: [
      'LangGraph for structured and deterministic agent workflows',
      'Redux Toolkit for predictable client state management',
      'FastAPI for high-performance async backend services'
    ],
    tech: ['Python', 'FastAPI', 'LangGraph', 'Groq LLM', 'React', 'Redux Toolkit', 'MySQL', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    modalImage: 'https://i.ibb.co/YgpfPmr/Chat-GPT-Image-May-16-2026-09-33-04-AM.png',
    demoUrl: 'https://crm-hcp-module.netlify.app/',
    githubUrl: 'https://github.com/NihaRuksar/crm-hcp-module?tab=readme-ov-file#readme',
    tags: ['Featured', 'AI']
  },
  {
    id: 2,
    title: 'Cloud Connector',
    subtitle: 'REST API',
    description: "Built a lightweight cloud connector using GitHub Personal Access Token authentication. Features: fetch repositories, list issues, create issues, create pull requests, centralized error handling, modular scalable architecture. Designed clean modular architecture separating routes, services, and data models for maintainability and scalability.",
    keyChallenges: [
      'Securely managing distributed authentication tokens',
      'Handling rate limits across concurrent GitHub API calls',
      'Standardizing cross-service error responses'
    ],
    technicalDecisions: [
      'FastAPI for fast asynchronous route handling',
      'Pydantic for strict schema data validation',
      'Clean architecture pattern separating Routes, Services, and Models'
    ],
    tech: ['Python', 'FastAPI', 'REST APIs', 'GitHub API', 'Pydantic', 'httpx', 'Uvicorn'],
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop',
    modalImage: 'https://i.ibb.co/B5ZY29d1/Chat-GPT-Image-May-16-2026-09-40-34-AM.png',
    demoUrl: 'https://drive.google.com/file/d/12PegCoP56jyrEjxoic7nzLhWmAyQY6Uv/view',
    githubUrl: 'https://github.com/NihaRuksar/github-connector?tab=readme-ov-file#readme',
    tags: ['Hackathon']
  },
  {
    id: 3,
    title: 'Bloom & Petal',
    subtitle: 'Luxury E-Commerce',
    description: 'Built a visually elegant flower shop website focused on clean UI, responsive layouts, and premium product presentation. Designed a modern storefront experience with floral product sections, hero banners, navigation, and mobile-friendly styling.',
    keyChallenges: [
      'Delivering high-performance image loading for luxury presentation',
      'Ensuring responsive fluidity without compromising design fidelity'
    ],
    technicalDecisions: [
      'Next.js for SSR and performance optimization',
      'Tailwind CSS for rapid utility-based styling',
      'React for component reusability'
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
    image: 'https://i.ibb.co/MyvrdmmM/Chat-GPT-Image-May-16-2026-09-48-43-AM.png',
    modalImage: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1974&auto=format&fit=crop',
    demoUrl: 'https://floralwe.netlify.app/',
    githubUrl: 'https://github.com/NihaRuksar/Flower-shop?tab=readme-ov-file#readme',
    tags: ['Live']
  },
  {
    id: 4,
    title: 'Job Board API',
    subtitle: 'Backend System',
    description: 'Built a backend API system for managing job listings, applications, and employer/job seeker workflows. Designed RESTful endpoints for job posting, searching, and handling structured backend data flow with clean API validation and scalable architecture.',
    keyChallenges: [
      'Designing normalized and scalable relational database schemas',
      'Executing complex role-based search and filter queries efficiently'
    ],
    technicalDecisions: [
      'SQLAlchemy ORM for expressive database queries and safe mapping',
      'MySQL for reliable relational data storage',
      'FastAPI for auto-generating OpenAPI documentation'
    ],
    tech: ['Python', 'FastAPI', 'REST APIs', 'Pydantic', 'SQLAlchemy ORM', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    modalImage: 'https://i.ibb.co/yn0kcrWC/Chat-GPT-Image-May-16-2026-09-52-52-AM.png',
    githubUrl: 'https://github.com/NihaRuksar/job_board_api?tab=readme-ov-file#readme'
  },
  {
    id: 5,
    title: 'LinguaSync',
    subtitle: 'AI Translation Tool',
    description: 'Built a real-time bilingual content editor where users type in one language and instantly see the translation appear side by side. Designed a clean, responsive editing experience with live translation, draft saving, and export capabilities across all devices.',
    keyChallenges: [
      'Implementing real-time translation without overloading the API on every keystroke',
      'Maintaining responsive fluidity across mobile, tablet, and desktop in a single file'
    ],
    technicalDecisions: [
      'Debounce pattern for balanced API efficiency and live translation feel',
      'CSS variables for instant dark/light theme switching without flicker',
      'localStorage for persistent draft saving without any backend'
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Google Translate API'],
    image: 'https://i.ibb.co/Kxd6rT0z/Chat-GPT-Image-Jun-2-2026-10-05-19-PM.png',
    modalImage: 'https://i.ibb.co/b5yXJ7c0/Chat-GPT-Image-Jun-2-2026-09-57-24-PM.png',
    demoUrl: 'https://benevolent-klepon-cd5224.netlify.app/',
    githubUrl: 'https://github.com/NihaRuksar/Translator?tab=readme-ov-file#readme',
    tags: ['Hackathon','New']
  }
];

export function AllProjectsAccordion() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();
  const carouselRef = useRef<HTMLDivElement>(null);

  const filterOptions = ['All', ...projects.map(p => p.title)];
  const displayedProjects = activeFilter === 'All' ? projects : projects.filter(p => p.title === activeFilter);

  useEffect(() => {
    let animation: any;
    const startAnimation = async () => {
      if (activeFilter !== 'All') {
        controls.set({ x: 0 });
        return;
      }
      if (!isHovered) {
        animation = controls.start({
          x: [0, -1500],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          },
        });
      } else {
        controls.stop();
      }
    };
    startAnimation();
    return () => {
      if (animation) controls.stop();
    };
  }, [isHovered, controls, activeFilter]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section 
      id="projects" 
      className="py-16 md:py-24 flex flex-col items-center justify-center relative min-h-[60vh] -mt-20 md:-mt-32 z-30"
    >
      <motion.div
        initial={{ opacity: 0, y: 80, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 md:mb-16 w-full px-6 md:px-12 lg:px-24 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-20"
      >
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-3xl md:text-4xl text-[#F5F5F5] font-light">
            Selected <span className="text-[#7C8CFF] italic font-medium">Works</span>
          </h2>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-widest transition-all duration-300 border backdrop-blur-md ${
                activeFilter === option
                  ? 'bg-[#7C8CFF]/20 border-[#7C8CFF]/50 text-[#7C8CFF] shadow-[0_0_20px_rgba(124,140,255,0.3)]'
                  : 'bg-white/5 border-white/10 text-[#B5B8C5] hover:bg-white/10 active:bg-white/10 hover:border-white/20 active:border-white/20 hover:text-[#F5F5F5] active:text-[#F5F5F5]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Infinite Scrolling Marquee */}
      <div 
        className="relative w-full overflow-hidden py-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        {/* Left/Right Fades */}
        {activeFilter === 'All' && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none" />
          </>
        )}

        <div className={`flex ${activeFilter === 'All' ? 'w-[300vw] md:w-max' : 'justify-center items-center w-full'}`}>
          <motion.div 
            ref={carouselRef}
            animate={controls}
            className={`flex gap-6 md:gap-8 px-4 ${activeFilter === 'All' ? 'min-w-max' : 'min-w-0'}`}
          >
            {/* Double/Triple the array for seamless looping only when All is selected */}
            {(activeFilter === 'All' ? [...projects, ...projects, ...projects] : displayedProjects).map((project, index) => (
              <motion.div
                layoutId={`project-container-${project.id}-${index}`}
                key={`${project.id}-${index}`}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.6, delay: (index % projects.length) * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="w-[280px] h-[380px] md:w-[320px] md:h-[420px] shrink-0 bg-[#0A0A0E] border border-white/5 rounded-3xl overflow-hidden flex flex-col group transition-all duration-300 hover:border-white/20 active:border-white/20 hover:bg-[#111116] active:bg-[#111116] hover:-translate-y-2 active:-translate-y-2 shadow-2xl relative cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Status Badges */}
                {project.tags && project.tags.length > 0 && (
                  <div className="absolute top-4 right-4 z-30 flex gap-2 flex-wrap justify-end">
                    {project.tags.map(tag => (
                      <div key={tag} className="px-2.5 py-1 rounded-full bg-[#7C8CFF]/90 backdrop-blur-sm text-black font-sans text-[9px] font-bold shadow-[0_0_15px_rgba(124,140,255,0.6)]">
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Lighting Sweep Animation on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#7C8CFF]/15 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] group-active:translate-x-[150%] transition-transform duration-1000 ease-in-out z-20 pointer-events-none" />

                {/* Thumbnail */}
                <div className="w-full h-[55%] relative overflow-hidden flex-shrink-0 bg-[#020205]">
                  <motion.img 
                    layoutId={`project-image-${project.id}-${index}`}
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full transition-transform duration-1000 group-hover:scale-105 group-active:scale-105 ${project.id === 5 ? 'object-contain object-center p-6' : 'object-cover object-top'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05050A]/95 via-[#05050A]/20 to-transparent z-10" />
                </div>

                {/* Content Area */}
                <div className="p-5 md:p-6 flex flex-col flex-grow bg-[#05050A]/95 relative z-30">
                  <h4 className="font-mono text-[9px] text-[#7C8CFF] tracking-widest uppercase mb-1.5 drop-shadow-md">
                    {project.subtitle}
                  </h4>
                  <h3 className="font-serif text-xl md:text-2xl text-[#F5F5F5] font-light drop-shadow-md line-clamp-1 transition-all duration-300 group-hover:text-white group-active:text-white">
                    {project.title}
                  </h3>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto mb-1 opacity-80 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                    {project.tech.slice(0, 3).map(tech => (
                      <span key={tech} className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/80 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/50 rounded">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Expanded Project View */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center w-full h-full p-4 md:p-8 perspective-[1200px]"
          >
            {/* Darkened subtle backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="fixed inset-0 bg-[#000000]/80 backdrop-blur-xl transition-opacity"
              onClick={() => setSelectedProject(null)}
            />

            {/* Immersive Expanded Container */}
            <motion.div
              className="relative w-full max-w-3xl lg:max-w-4xl bg-[#05050A] shadow-[0_30px_100px_rgba(0,0,0,0.8)] rounded-[2rem] overflow-hidden glass-panel flex flex-col md:flex-row min-h-[40vh] md:min-h-[60vh] max-h-[85vh] md:max-h-[75vh] cursor-auto z-10 mx-auto transform-gpu"
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 p-3 text-white/50 hover:text-white active:text-white bg-black/40 hover:bg-black/90 active:bg-black/90 rounded-full transition-all z-50 backdrop-blur-md border border-white/10 hover:scale-105 active:scale-105"
                onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
              >
                <X className="w-5 h-5" />
              </button>

              {/* LEFT: Cinematic Image Preview */}
              {selectedProject.id !== 6 && (
                <div 
                  className="w-full shrink-0 md:w-[45%] bg-[#020205] relative min-h-[30vh] md:min-h-[40vh] flex items-center justify-center p-4 cursor-pointer group"
                  onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
                >
                  <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm pointer-events-none">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#7C8CFF] px-4 py-2 bg-black/80 rounded-full border border-[#7C8CFF]/30">Back</span>
                  </div>
                  <motion.img
                    src={(selectedProject as any).modalImage || selectedProject.image}
                    alt={selectedProject.title}
                    loading="lazy"
                    className="w-full h-full object-contain object-center shadow-2xl transition-transform duration-700 group-hover:scale-[0.98] group-active:scale-[0.98]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#05050A]/20 to-[#05050A] md:block hidden pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-[#05050A]/20 to-transparent md:hidden block pointer-events-none" />
                </div>
              )}

              {/* RIGHT: Detailed Content */}
              <div 
                className={`w-full ${selectedProject.id !== 6 ? 'md:w-[55%]' : 'md:w-[100%]'} p-6 md:p-8 flex flex-col justify-start relative z-20 cursor-auto overflow-y-auto custom-scrollbar`}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/[0.04] border border-white/10 rounded-xl p-5 mb-8 hover:bg-white/[0.08] active:bg-white/[0.08] transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7C8CFF] shadow-[0_0_8px_#7C8CFF]" />
                    <h5 className="font-mono text-[11px] sm:text-xs text-white font-bold tracking-widest uppercase drop-shadow-sm">Project Name</h5>
                  </div>
                  <h4 className="font-mono text-[9px] md:text-[10px] text-[#7C8CFF] tracking-widest uppercase mb-2 drop-shadow-md">
                    {selectedProject.subtitle}
                  </h4>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#F5F5F5] font-light drop-shadow-md">
                    {selectedProject.title}
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <p className="font-sans text-[#E0E2EC] text-[13px] md:text-sm font-medium leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {'keyChallenges' in selectedProject && selectedProject.keyChallenges && (
                      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] active:bg-white/[0.08] transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7C8CFF] shadow-[0_0_8px_#7C8CFF]" />
                          <h5 className="font-mono text-[11px] sm:text-xs text-white font-bold tracking-widest uppercase drop-shadow-sm">Key Challenges</h5>
                        </div>
                        <ul className="space-y-3">
                          {selectedProject.keyChallenges.map((challenge, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 group">
                              <span className="text-[#7C8CFF] mt-0.5 text-[11px] md:text-xs transition-colors drop-shadow-sm">▹</span>
                              <span className="font-sans text-[#F5F5F5] font-medium text-[12px] md:text-[13px] leading-relaxed group-hover:text-white group-active:text-white transition-colors drop-shadow-sm">{challenge}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {'technicalDecisions' in selectedProject && selectedProject.technicalDecisions && (
                      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5 hover:bg-white/[0.08] active:bg-white/[0.08] transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7C8CFF] shadow-[0_0_8px_#7C8CFF]" />
                          <h5 className="font-mono text-[11px] sm:text-xs text-white font-bold tracking-widest uppercase drop-shadow-sm">Technical Decisions</h5>
                        </div>
                        <ul className="space-y-3">
                          {selectedProject.technicalDecisions.map((decision, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 group">
                              <span className="text-[#7C8CFF] mt-0.5 text-[11px] md:text-xs transition-colors drop-shadow-sm">▹</span>
                              <span className="font-sans text-[#F5F5F5] font-medium text-[12px] md:text-[13px] leading-relaxed group-hover:text-white group-active:text-white transition-colors drop-shadow-sm">{decision}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white/[0.04] border border-white/10 rounded-xl p-5 mb-8 hover:bg-white/[0.08] active:bg-white/[0.08] transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7C8CFF] shadow-[0_0_8px_#7C8CFF]" />
                    <h5 className="font-mono text-[11px] sm:text-xs text-white font-bold tracking-widest uppercase drop-shadow-sm">Tech Stacks</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, i) => (
                      <span 
                        key={t} 
                        className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider px-3 py-1.5 bg-white/[0.04] border border-white/5 text-white/80 rounded-md shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap items-center gap-4 mt-8"
                >
                  {selectedProject.demoUrl && selectedProject.demoUrl !== '#' && (
                    <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="group/btn relative flex items-center justify-center space-x-2 px-6 py-3 rounded-lg overflow-hidden transition-all duration-300 bg-white text-black hover:scale-105 active:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                      <span className="font-sans tracking-widest text-[10px] font-bold relative z-10 uppercase transition-colors">Play Demo</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform relative z-10" />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="group/link flex items-center justify-center space-x-2 px-6 py-3 rounded-lg border border-white/20 text-[#F5F5F5] bg-black/40 hover:bg-white/10 hover:border-white/40 active:bg-white/10 active:border-white/40 transition-all duration-300 backdrop-blur-md">
                      <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform" /> 
                      <span className="font-sans tracking-widest text-[10px] font-medium uppercase">Source Code</span>
                    </a>
                  )}
                </motion.div>
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


