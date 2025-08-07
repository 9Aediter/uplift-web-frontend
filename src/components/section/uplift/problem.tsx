import React from "react";
import { Section } from "@/components/ui/section";
import { Card } from "../../card";
import {
  TrendingUpIcon,
  ZapIcon,
  BarChartIcon,
  RefreshCcwIcon,
} from "lucide-react";
import { AnimateEffect } from "@/components/animate-effect";

// Define IconMap within this file as icons are referenced by string names
const IconMap: Record<string, React.ComponentType<any>> = {
  TrendingUpIcon,
  ZapIcon,
  BarChartIcon,
  RefreshCcwIcon,
};

interface ProblemItem {
  title: string;
  description: string;
  icon: string;
  glowColor: string;
  iconColorClass: string; // Added new property
}

interface ProblemSectionContent {
  title: string;
  subtitle: string;
  items: ProblemItem[];
}

interface ProblemsProps {
  problemSectionContent: ProblemSectionContent;
}

const Problems = React.forwardRef<HTMLDivElement, ProblemsProps>(({ problemSectionContent }, ref) => {
  const { title, subtitle, items } = problemSectionContent;

  return (
    <Section ref={ref} id="problem" className="bg-black flex flex-col justify-center h-full md:h-[100vh]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="mt-5 lg:mt-15 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {items.map((challenge, index) => {
            const IconComponent = IconMap[challenge.icon];

            return (
              <AnimateEffect key={index} index={index}>
                <Card
                  className="p-6 group hover:shadow-[0_0_15px_rgba(0,200,255,0.3)] transition-all duration-300 backdrop-blur-sm border border-gray-700/60"
                  glowColor={challenge.glowColor}
                >
                  <div className="mb-4 relative">
                    <div className="absolute -left-2 -top-2 w-14 h-14 bg-gray-800/80 rounded-lg flex items-center justify-center border border-gray-600/70 group-hover:border-cyan-500/50 transition-colors backdrop-blur-sm">
                      {IconComponent && <IconComponent className={`w-8 h-8 ${challenge.iconColorClass}`} />}
                    </div>
                    <div className="ml-16 pl-2">
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                        {challenge.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm md:text-base">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="text-xs text-gray-500 mr-2">Industry Impact:</div>
                    <div className="w-full h-1 bg-gray-800 overflow-hidden rounded-full">
                      {/* Desktop: hover effect */}
                      <div className="h-full w-0 md:group-hover:w-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out hidden md:block"></div>
                      {/* Mobile: always show full bar */}
                      <div className="h-full w-full bg-gradient-to-r from-cyan-500 to-blue-500 block md:hidden"></div>
                    </div>
                  </div>
                </Card>
              </AnimateEffect>
            );
          })}
        </div>
      </div>
    </Section>
  );
});

Problems.displayName = 'Problems';
export default Problems;

