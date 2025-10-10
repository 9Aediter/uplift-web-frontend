'use client';

import React from 'react';
import { Section } from '@/components/ui/section';
import { AnimateEffect } from '@/components/common/animate-effect';
import { useTechModal } from '@/lib/providers/tech-modal-provider';
import { getTechIcon } from '@/lib/utils/icon-mapper';
import { motion } from 'motion/react';

interface TechItem {
  name: string;
  tagline: string;
  category: 'frontend' | 'backend' | 'database' | 'infrastructure' | 'ai';
  color: string;
  usedIn: string[];
}

interface TechStackData {
  badge: string;
  title: string;
  subtitle: string;
  categories: {
    frontend: TechItem[];
    backend: TechItem[];
    database: TechItem[];
    infrastructure: TechItem[];
    ai: TechItem[];
  };
}

interface TechStackProps {
  data: TechStackData;
}

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database & APIs',
  infrastructure: 'Infrastructure',
  ai: 'AI & Automation'
};

export const TechStack = ({ data }: TechStackProps) => {
  const { openTechModal } = useTechModal();

  // Flatten all categories into single array
  const techStackData = [
    ...data.categories.frontend,
    ...data.categories.backend,
    ...data.categories.database,
    ...data.categories.infrastructure,
    ...data.categories.ai,
  ];

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
              <span className="text-sm font-semibold text-primary">{data.badge}</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {data.title}
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {data.subtitle}
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
                onClick={() => openTechModal({
                  ...tech,
                  icon: getTechIcon(tech.name)
                })}
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
                      {getTechIcon(tech.name)}
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

      </div>
    </Section>
  );
};
