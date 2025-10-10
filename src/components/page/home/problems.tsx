import React from "react";
import { Section } from "@/components/ui/section";
import {
  AnimatedTitle,
  AnimatedSubtitle,
  AnimatedProblemCard
} from "@/components/page/home/animated-components";

interface ProblemItem {
  id: number;
  title: string;
  description: string;
  icon: string; // 3D icon emoji
  gradient: string;
  impact: string;
}

interface ProblemData {
  title: string;
  subtitle: string;
  items: ProblemItem[];
}

interface ProblemsProps {
  data: ProblemData;
}

const Problems = ({ data }: ProblemsProps) => {
  const { title, subtitle, items } = data;

  return (
    <Section id="problem" className="flex flex-col justify-center py-30">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        {/* <div className="text-center mb-16">
          <AnimatedTitle title={title} />
          <AnimatedSubtitle subtitle={subtitle} />
        </div> */}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((problem, index) => (
            <div key={problem.id} className="p-6 rounded-lg bg-card">
              <div className="text-4xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

Problems.displayName = 'Problems';
export default Problems;

