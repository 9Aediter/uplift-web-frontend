import React from "react";
import { Section } from "@/components/ui/section";
import {
  AnimatedTitle,
  AnimatedSubtitle,
  AnimatedProblemCard
} from "@/components/home/animated-components";

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

// Mock data with business problems and 3D-style icons
const mockProblemData: ProblemData = {
  title: "Business Challenges",
  subtitle: "Common problems that slow down modern businesses and how technology can solve them",
  items: [
    {
      id: 1,
      title: "Slow Manual Processes",
      description: "Teams waste hours on repetitive tasks that could be automated, reducing productivity and increasing human error.",
      icon: "⚙️",
      gradient: "from-red-500 via-red-400 to-orange-500",
      impact: "85% Time Loss"
    },
    {
      id: 2,
      title: "Poor Data Insights", 
      description: "Critical business decisions are made with incomplete information due to scattered data and lack of analytics.",
      icon: "📊",
      gradient: "from-blue-500 via-blue-400 to-cyan-500",
      impact: "60% Bad Decisions"
    },
    {
      id: 3,
      title: "System Integration Issues",
      description: "Different software tools don't communicate well, creating data silos and workflow bottlenecks.",
      icon: "🔗",
      gradient: "from-purple-500 via-purple-400 to-pink-500",
      impact: "40% Efficiency Drop"
    },
    {
      id: 4,
      title: "Scalability Limitations",
      description: "Current systems can't handle business growth, leading to crashes, slowdowns, and lost opportunities.",
      icon: "🚀",
      gradient: "from-green-500 via-green-400 to-emerald-500", 
      impact: "30% Growth Blocked"
    }
  ]
};

const Problems = () => {
  const { title, subtitle, items } = mockProblemData;

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

