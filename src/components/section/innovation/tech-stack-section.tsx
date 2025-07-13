import React from 'react';
import { Section } from '@/components/ui/section';

export const TechStackSection = () => (
  <Section className="py-12 md:py-20 bg-gray-900/50">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Tech Stack We Use
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        <span className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium">Next.js</span>
        <span className="px-4 py-2 bg-green-600/20 text-green-300 rounded-full text-sm font-medium">PostgreSQL</span>
        <span className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium">Prisma</span>
        <span className="px-4 py-2 bg-cyan-600/20 text-cyan-300 rounded-full text-sm font-medium">Tailwind CSS</span>
        <span className="px-4 py-2 bg-orange-600/20 text-orange-300 rounded-full text-sm font-medium">AWS EC2</span>
        <span className="px-4 py-2 bg-red-600/20 text-red-300 rounded-full text-sm font-medium">AWS RDS</span>
      </div>
    </div>
  </Section>
);
