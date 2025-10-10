'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
  tech: {
    name: string;
    icon: React.ReactNode;
    tagline: string;
    category: string;
    color: string;
    usedIn: string[];
  } | null;
}

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database & APIs',
  infrastructure: 'Infrastructure',
  ai: 'AI & Automation'
};

export function TechStackModal({ isOpen, onClose, tech }: TechStackModalProps) {
  if (!tech) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6 md:p-8 lg:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {/* Icon & Title */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className={`w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br ${tech.color} text-white shrink-0 shadow-lg`}>
                      {tech.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        {tech.name}
                      </h2>
                      <p className="text-lg text-slate-600 dark:text-slate-300">
                        {tech.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    {/* Category */}
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                        Category
                      </h3>
                      <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                        {categoryLabels[tech.category] || tech.category}
                      </span>
                    </div>

                    {/* Used In */}
                    <div>
                      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                        Used in
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {tech.usedIn.map((use) => (
                          <span
                            key={use}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Close Button */}
                  <div className="mt-8">
                    <button
                      onClick={onClose}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
