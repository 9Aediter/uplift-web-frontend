import React from "react";
import { Section } from "@/components/ui/section";

interface ProblemItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  impact: string;
}

interface ProblemData {
  title: string;
  subtitle: string;
  items: ProblemItem[];
}

// SSR-optimized Problem Card without animations
const ProblemCard = ({ problem }: { problem: ProblemItem }) => {
  return (
    <div className="group relative">
      <div className="relative h-full bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-900/80 dark:to-slate-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-6 transition-transform duration-300 hover:scale-105">
        {/* Icon */}
        <div className="mb-4">
          <span className="text-4xl">{problem.icon}</span>
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {problem.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
            {problem.description}
          </p>
          
          {/* Impact Badge */}
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${problem.gradient} text-white`}>
            {problem.impact}
          </div>
        </div>
        
        {/* Gradient Border Effect */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${problem.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
      </div>
    </div>
  );
};

export const ProblemsSSR = ({ data }: { data: ProblemData }) => {
  const { title, subtitle, items } = data;

  return (
    <Section id="problem" className="bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-yellow-50/50 dark:from-black dark:via-black dark:to-black flex flex-col justify-center py-30 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 overflow-x-hidden">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-full overflow-x-hidden">
          {items.map((problem) => (
            <ProblemCard 
              key={problem.id} 
              problem={problem} 
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProblemsSSR;