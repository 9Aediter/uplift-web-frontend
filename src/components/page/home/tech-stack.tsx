'use client';

import React from 'react';
import { Section } from '@/components/ui/section';
import { AnimateEffect } from '@/components/common/animate-effect';
import { motion } from 'motion/react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiGo,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiTailwindcss,
  SiAmazon,
  SiKubernetes,
  SiApachekafka,
  SiTerraform,
  SiGithubactions,
  SiNestjs,
  SiExpress,
  SiFlutter,
  SiDart,
  SiVuedotjs,
  SiPrisma,
  SiNuxtdotjs,
  SiPython,
  SiAnaconda,
  SiClaude,
  SiOpenai,
  SiOllama
} from 'react-icons/si';
import { AiFillDatabase } from 'react-icons/ai';
import { FaFish } from 'react-icons/fa';

interface TechItem {
  name: string;
  icon: React.ReactNode;
  tagline: string;
  category: 'frontend' | 'backend' | 'database' | 'infrastructure' | 'ai';
  color: string;
  usedIn: string[];
}

const techStackData: TechItem[] = [
  // Frontend
  {
    name: 'React',
    icon: <SiReact className="w-8 h-8" />,
    tagline: 'Modern UI Library',
    category: 'frontend',
    color: 'from-cyan-500 to-blue-500',
    usedIn: ['Web Apps', 'Admin Panels', 'Mobile Apps']
  },
  {
    name: 'Next.js',
    icon: <SiNextdotjs className="w-8 h-8" />,
    tagline: 'Full-Stack Framework',
    category: 'frontend',
    color: 'from-gray-800 to-gray-600',
    usedIn: ['Enterprise Websites', 'E-commerce']
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript className="w-8 h-8" />,
    tagline: 'Type-Safe Development',
    category: 'frontend',
    color: 'from-blue-600 to-blue-400',
    usedIn: ['All Projects']
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss className="w-8 h-8" />,
    tagline: 'Utility-First CSS',
    category: 'frontend',
    color: 'from-cyan-400 to-teal-500',
    usedIn: ['Modern UIs', 'Responsive Design']
  },
  {
    name: 'Vue.js',
    icon: <SiVuedotjs className="w-8 h-8" />,
    tagline: 'Progressive Framework',
    category: 'frontend',
    color: 'from-green-500 to-emerald-500',
    usedIn: ['SPAs', 'Enterprise Apps']
  },
  {
    name: 'Nuxt.js',
    icon: <SiNuxtdotjs className="w-8 h-8" />,
    tagline: 'Vue.js Framework',
    category: 'frontend',
    color: 'from-green-600 to-teal-600',
    usedIn: ['SSR Apps', 'Static Sites']
  },
  {
    name: 'React Native',
    icon: <SiReact className="w-8 h-8" />,
    tagline: 'Cross-Platform Mobile',
    category: 'frontend',
    color: 'from-cyan-600 to-blue-600',
    usedIn: ['iOS Apps', 'Android Apps']
  },
  {
    name: 'Flutter',
    icon: <SiFlutter className="w-8 h-8" />,
    tagline: 'Beautiful Native Apps',
    category: 'frontend',
    color: 'from-blue-400 to-cyan-300',
    usedIn: ['Mobile Apps', 'Cross-Platform']
  },
  {
    name: 'Dart',
    icon: <SiDart className="w-8 h-8" />,
    tagline: 'Flutter Language',
    category: 'frontend',
    color: 'from-blue-500 to-blue-300',
    usedIn: ['Flutter Development']
  },

  // Backend
  {
    name: 'Bun',
    icon: <span className="text-3xl font-bold">🥟</span>,
    tagline: 'Fastest JS Runtime',
    category: 'backend',
    color: 'from-orange-400 to-pink-500',
    usedIn: ['High-Performance APIs', 'Real-time Services']
  },
  {
    name: 'ElysiaJS',
    icon: <span className="text-3xl font-bold">E</span>,
    tagline: 'Type-Safe Web Framework',
    category: 'backend',
    color: 'from-purple-500 to-pink-500',
    usedIn: ['REST APIs', 'GraphQL Services']
  },
  {
    name: 'Golang',
    icon: <SiGo className="w-8 h-8" />,
    tagline: 'Concurrent & Scalable',
    category: 'backend',
    color: 'from-cyan-600 to-blue-500',
    usedIn: ['Microservices', 'High-Load Systems']
  },
  {
    name: 'Node.js',
    icon: <SiNodedotjs className="w-8 h-8" />,
    tagline: 'JavaScript Runtime',
    category: 'backend',
    color: 'from-green-600 to-green-400',
    usedIn: ['APIs', 'Real-time Apps']
  },
  {
    name: 'NestJS',
    icon: <SiNestjs className="w-8 h-8" />,
    tagline: 'Progressive Node.js',
    category: 'backend',
    color: 'from-red-600 to-pink-500',
    usedIn: ['Enterprise APIs', 'Microservices']
  },
  {
    name: 'Express',
    icon: <SiExpress className="w-8 h-8" />,
    tagline: 'Fast Web Framework',
    category: 'backend',
    color: 'from-gray-700 to-gray-500',
    usedIn: ['REST APIs', 'Web Apps']
  },
  {
    name: 'Python',
    icon: <SiPython className="w-8 h-8" />,
    tagline: 'Versatile Language',
    category: 'backend',
    color: 'from-blue-500 to-yellow-400',
    usedIn: ['AI/ML', 'Data Science', 'APIs']
  },

  // Database
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql className="w-8 h-8" />,
    tagline: 'Relational Database',
    category: 'database',
    color: 'from-blue-700 to-blue-500',
    usedIn: ['Enterprise Systems', 'Analytics']
  },
  {
    name: 'MongoDB',
    icon: <SiMongodb className="w-8 h-8" />,
    tagline: 'Document Database',
    category: 'database',
    color: 'from-green-700 to-green-500',
    usedIn: ['Content Management', 'Real-time Data']
  },
  {
    name: 'Redis',
    icon: <SiRedis className="w-8 h-8" />,
    tagline: 'In-Memory Cache',
    category: 'database',
    color: 'from-red-600 to-red-400',
    usedIn: ['Caching', 'Session Storage']
  },
  {
    name: 'GraphQL',
    icon: <SiGraphql className="w-8 h-8" />,
    tagline: 'Efficient Data Query',
    category: 'database',
    color: 'from-pink-600 to-purple-500',
    usedIn: ['Modern APIs', 'Data Fetching']
  },
  {
    name: 'Prisma',
    icon: <SiPrisma className="w-8 h-8" />,
    tagline: 'Next-Gen ORM',
    category: 'database',
    color: 'from-indigo-600 to-blue-500',
    usedIn: ['Type-Safe Database', 'Modern ORMs']
  },

  // Infrastructure
  {
    name: 'Docker',
    icon: <SiDocker className="w-8 h-8" />,
    tagline: 'Containerization',
    category: 'infrastructure',
    color: 'from-blue-500 to-cyan-400',
    usedIn: ['Deployment', 'Development']
  },
  {
    name: 'AWS',
    icon: <SiAmazon className="w-8 h-8" />,
    tagline: 'Cloud Infrastructure',
    category: 'infrastructure',
    color: 'from-orange-500 to-yellow-500',
    usedIn: ['Hosting', 'Storage', 'CDN']
  },
  {
    name: 'Kubernetes',
    icon: <SiKubernetes className="w-8 h-8" />,
    tagline: 'Container Orchestration',
    category: 'infrastructure',
    color: 'from-blue-600 to-blue-400',
    usedIn: ['Microservices', 'Auto-scaling']
  },
  {
    name: 'Terraform',
    icon: <SiTerraform className="w-8 h-8" />,
    tagline: 'Infrastructure as Code',
    category: 'infrastructure',
    color: 'from-purple-600 to-purple-400',
    usedIn: ['Cloud Automation', 'IaC']
  },
  {
    name: 'GitHub Actions',
    icon: <SiGithubactions className="w-8 h-8" />,
    tagline: 'CI/CD Automation',
    category: 'infrastructure',
    color: 'from-gray-800 to-blue-600',
    usedIn: ['DevOps', 'Automation']
  },
  {
    name: 'Kafka',
    icon: <SiApachekafka className="w-8 h-8" />,
    tagline: 'Event Streaming',
    category: 'infrastructure',
    color: 'from-gray-900 to-gray-700',
    usedIn: ['Real-time Data', 'Message Queue']
  },

  // AI & Tools
  {
    name: 'Claude',
    icon: <SiClaude className="w-8 h-8" />,
    tagline: 'AI Assistant',
    category: 'ai',
    color: 'from-orange-500 to-amber-400',
    usedIn: ['AI Development', 'Code Generation']
  },
  {
    name: 'ChatGPT',
    icon: <SiOpenai className="w-8 h-8" />,
    tagline: 'AI Language Model',
    category: 'ai',
    color: 'from-green-500 to-emerald-400',
    usedIn: ['AI Chat', 'Content Generation']
  },
  {
    name: 'Ollama',
    icon: <SiOllama className="w-8 h-8" />,
    tagline: 'Local AI Models',
    category: 'ai',
    color: 'from-slate-700 to-slate-500',
    usedIn: ['On-Premise AI', 'Privacy']
  },
  {
    name: 'Anaconda',
    icon: <SiAnaconda className="w-8 h-8" />,
    tagline: 'Data Science Platform',
    category: 'ai',
    color: 'from-green-600 to-green-400',
    usedIn: ['ML Development', 'Data Analysis']
  },
  {
    name: 'n8n',
    icon: <span className="text-3xl font-bold">n8n</span>,
    tagline: 'Workflow Automation',
    category: 'ai',
    color: 'from-pink-500 to-rose-400',
    usedIn: ['Automation', 'Integration']
  },
  {
    name: 'RAG Model',
    icon: <AiFillDatabase className="w-8 h-8" />,
    tagline: 'Retrieval Augmented',
    category: 'ai',
    color: 'from-purple-600 to-pink-500',
    usedIn: ['AI Search', 'Knowledge Base']
  },
  {
    name: 'DeepSeek',
    icon: <FaFish className="w-8 h-8" />,
    tagline: 'Deep Learning AI',
    category: 'ai',
    color: 'from-indigo-600 to-purple-500',
    usedIn: ['AI Research', 'Deep Learning']
  }
];

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database & APIs',
  infrastructure: 'Infrastructure',
  ai: 'AI & Automation'
};

export const TechStack = () => {
  const [selectedTech, setSelectedTech] = React.useState<TechItem | null>(null);

  return (
    <Section className="bg-gradient-to-b from-muted/30 to-background py-20 md:py-32 relative overflow-hidden">

      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <AnimateEffect index={0}>
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-sm font-semibold text-primary">Latest Technology</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Modern Tech Stack
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              เราใช้เทคโนโลยีล่าสุดและทันสมัยที่สุด เพื่อสร้างระบบที่มีประสิทธิภาพสูงสุดให้กับลูกค้า
            </p>
          </div>
        </AnimateEffect>

        {/* Animated Icon Wall - Masonry/Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
          {techStackData.map((tech, index) => (
            <AnimateEffect key={tech.name} index={index + 1}>
              <motion.div
                className={`relative group cursor-pointer ${
                  // Create masonry effect with different heights
                  index % 7 === 0 || index % 11 === 0 ? 'md:row-span-2' : ''
                }`}
                onClick={() => setSelectedTech(tech)}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Card with Glow Effect */}
                <div className="relative h-full min-h-[140px] bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-card group-hover:shadow-2xl">

                  {/* Animated Gradient Border on Hover */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${tech.color.replace('from-', '').replace('to-', ', ')})`,
                      padding: '2px',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  {/* Pulse Animation */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0`}
                    animate={{
                      opacity: [0, 0.1, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center space-y-3">
                    {/* Icon with Glow */}
                    <motion.div
                      className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${tech.color} text-white shadow-lg`}
                      style={{
                        boxShadow: `0 0 20px ${tech.color.includes('blue') ? 'rgba(59, 130, 246, 0.4)' :
                                             tech.color.includes('purple') ? 'rgba(168, 85, 247, 0.4)' :
                                             tech.color.includes('green') ? 'rgba(34, 197, 94, 0.4)' :
                                             tech.color.includes('orange') ? 'rgba(249, 115, 22, 0.4)' :
                                             'rgba(139, 92, 246, 0.4)'}`,
                      }}
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      {tech.icon}
                    </motion.div>

                    {/* Name */}
                    <div>
                      <h4 className="text-base font-bold text-foreground mb-1">
                        {tech.name}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {tech.tagline}
                      </p>
                    </div>

                    {/* Category Badge */}
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      {categoryLabels[tech.category]}
                    </span>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br ${tech.color} opacity-60`} />
                </div>
              </motion.div>
            </AnimateEffect>
          ))}
        </div>

        {/* Selected Tech Modal/Detail */}
        {selectedTech && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedTech(null)}
          >
            <motion.div
              className="bg-card border border-border rounded-2xl p-8 max-w-lg w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br ${selectedTech.color} text-white`}>
                  {selectedTech.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{selectedTech.name}</h3>
                  <p className="text-muted-foreground">{selectedTech.tagline}</p>
                </div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {categoryLabels[selectedTech.category]}
                </span>
              </div>

              {/* Used In */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">Used in:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTech.usedIn.map((use) => (
                    <span
                      key={use}
                      className="text-sm bg-muted text-foreground px-3 py-1.5 rounded-lg"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedTech(null)}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

      </div>
    </Section>
  );
};
