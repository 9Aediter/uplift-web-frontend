import React from 'react';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { Section } from "@/components/ui/section"

interface ProblemItem {
  text: string;
  icon: string;
  image: string;
}

interface ProblemStatementSectionProps {
  problems: ProblemItem[];
  serviceColor: string; // e.g., "from-blue-500 to-cyan-400"
  sectionTitle: string;
}

const IconMap: Record<string, React.ComponentType<any>> = {
  TrendingUpIcon: LucideIcons.TrendingUpIcon,
  ZapIcon: LucideIcons.ZapIcon,
  BarChartIcon: LucideIcons.BarChartIcon,
  RefreshCcwIcon: LucideIcons.RefreshCcwIcon,
  Clock: LucideIcons.Clock, // Added for problems
  Smartphone: LucideIcons.Smartphone, // Added for problems
  Search: LucideIcons.Search, // Added for problems
  Monitor: LucideIcons.Monitor, // Added for problems
  Wrench: LucideIcons.Wrench, // Added for problems
  // Add other icons as needed
};

const getIcon = (iconName: string, size = 22) => {
  const Icon = IconMap[iconName];
  return Icon ? <Icon size={size} /> : null;
};

const ProblemStatementSection: React.FC<ProblemStatementSectionProps> = ({ problems, serviceColor, sectionTitle }) => {
  const colorClass = serviceColor.split(' ')[1].replace('to-', '');

  return (
    <Section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {sectionTitle}
          </h2>
          <div className="space-y-8">
            {problems?.map((problem, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="w-full md:w-1/3 order-2 md:order-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className={`text-${colorClass} mt-1 flex-shrink-0`}
                    >
                      {getIcon(problem.icon)}
                    </div>
                    <h3 className="text-xl font-bold">{problem.text}</h3>
                  </div>
                </div>
                <div className="w-full md:w-2/3 order-1 md:order-2">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={problem.image}
                      alt={problem.text}
                      width={800} // Adjust as needed
                      height={450} // Adjust as needed
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProblemStatementSection;
