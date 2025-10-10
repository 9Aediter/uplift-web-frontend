'use client';

import Image from 'next/image';
import { useTechModal } from '@/lib/providers/tech-modal-provider';
import { motion } from 'motion/react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  className: string;
}

interface PortfolioData {
  title: string;
  subtitle: string;
  projects: Project[];
}

interface BestPracticeProps {
  data: PortfolioData;
}

export function BestPractice({ data }: BestPracticeProps) {
  const { openImageModal } = useTechModal();
  const { title, subtitle, projects } = data;

  const handleImageClick = (project: Project) => {
    openImageModal({
      url: project.imageUrl,
      title: project.title,
      description: project.description,
    });
  };

  return (
    <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`relative overflow-hidden rounded-xl cursor-pointer group ${project.className}`}
                onClick={() => handleImageClick(project)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Image Container with fixed height */}
                <div className="relative h-[300px] md:h-[400px]">
                  <Image
                    src={project.imageUrl}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    alt={project.title}
                    unoptimized
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-white/80 line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  );
}
