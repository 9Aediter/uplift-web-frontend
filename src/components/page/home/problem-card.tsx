"use client";
import React from "react";
import { Section } from "@/components/ui/section";
import { 
  AnimatedTitle, 
  AnimatedSubtitle, 
  AnimatedProblemCard 
} from "./animated-components";
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

export const ProblemsAnimated = ({ data }: { data: ProblemData }) => {
  const { title, subtitle, items } = data;

  return (
    <Section id="problem" className="bg-gradient-to-b from-amber-50/50 via-orange-50/30 to-yellow-50/50 dark:from-black dark:via-black dark:to-black h-fit py-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header - Title removed */}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-full">
          {items.map((problem, index) => (
            <AnimatedProblemCard 
              key={problem.id} 
              problem={problem} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProblemsAnimated;