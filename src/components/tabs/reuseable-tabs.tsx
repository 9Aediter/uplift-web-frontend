"use client";

import { Tabs } from "./tabs";
import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiAmazon,
  SiFirebase,
  SiJavascript,
  SiTailwindcss,
  SiMongodb,
  SiVuedotjs,
  SiLaravel,
  SiMysql,
  SiPython,
  SiAngular,
  SiExpress,
  SiReact as SiReactNative,
  SiGoogle
} from "react-icons/si";
import { FaCode, FaDatabase, FaServer, FaMobile, FaChartBar } from "react-icons/fa";

// Interface for project data
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  icons?: React.ReactNode[];
}

// Icon mapping function
const getIconForTag = (tag: string): React.ReactNode => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'Next.js': <SiNextdotjs className="w-4 h-4" />,
    'React': <SiReact className="w-4 h-4" />,
    'TypeScript': <SiTypescript className="w-4 h-4" />,
    'Node.js': <SiNodedotjs className="w-4 h-4" />,
    'PostgreSQL': <SiPostgresql className="w-4 h-4" />,
    'Prisma': <SiPrisma className="w-4 h-4" />,
    'AWS': <SiAmazon className="w-4 h-4" />,
    'Firebase': <SiFirebase className="w-4 h-4" />,
    'JavaScript': <SiJavascript className="w-4 h-4" />,
    'Tailwind': <SiTailwindcss className="w-4 h-4" />,
    'MongoDB': <SiMongodb className="w-4 h-4" />,
    'Vue.js': <SiVuedotjs className="w-4 h-4" />,
    'Laravel': <SiLaravel className="w-4 h-4" />,
    'MySQL': <SiMysql className="w-4 h-4" />,
    'Python': <SiPython className="w-4 h-4" />,
    'Angular': <SiAngular className="w-4 h-4" />,
    'Express.js': <SiExpress className="w-4 h-4" />,
    'React Native': <SiReactNative className="w-4 h-4" />,
    'Google Maps API': <SiGoogle className="w-4 h-4" />,
    'D3.js': <FaChartBar className="w-4 h-4" />,
    // Default fallback icons
    'Database': <FaDatabase className="w-4 h-4" />,
    'Server': <FaServer className="w-4 h-4" />,
    'Mobile': <FaMobile className="w-4 h-4" />,
    'Code': <FaCode className="w-4 h-4" />
  };
  
  return iconMap[tag] || <FaCode className="w-4 h-4" />;
};

// Interface for the reusable tabs component
interface ReusableTabsProps {
  data: Project[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}

export function ReusableTabs({
  data,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: ReusableTabsProps) {
  // Transform project data into tab format
  const tabs = data.map((project, index) => ({
    title: project.title,
    value: `project-${index}`,
    content: (
      <div className="w-full overflow-hidden relative min-h-[400px] md:min-h-[500px] rounded-2xl flex flex-col">
        {/* Background Gradient Animation */}
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(0, 0, 0)"
          gradientBackgroundEnd="rgb(30, 30, 30)"
          firstColor="6, 182, 212"
          secondColor="59, 130, 246"
          thirdColor="147, 51, 234"
          fourthColor="236, 72, 153"
          fifthColor="34, 197, 94"
          pointerColor="6, 182, 212"
          size="60%"
          blendingValue="overlay"
          interactive={false}
          containerClassName="absolute inset-0 rounded-2xl"
          className="rounded-2xl bg-black/20 backdrop-blur-sm"
        />
        
        {/* Project Image Container */}
        <div className="relative flex-1 p-6 z-10">
          <div className="relative w-full h-[240px] md:h-[280px] overflow-hidden rounded-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
            
            {/* Decorative corners */}
            <div className="absolute top-4 right-4 w-12 h-12">
              <div className="absolute top-0 right-0 w-8 h-1 bg-cyan-500" />
              <div className="absolute top-0 right-0 w-1 h-8 bg-cyan-500" />
            </div>
            <div className="absolute bottom-4 left-4 w-12 h-12">
              <div className="absolute bottom-0 left-0 w-8 h-1 bg-cyan-500" />
              <div className="absolute bottom-0 left-0 w-1 h-8 bg-cyan-500" />
            </div>
          </div>
        </div>
        
        {/* Project Content */}
        <div className="relative p-6 md:p-8 z-10 rounded-b-2xl">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {/* Tech Stack Icons */}
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag, tagIndex) => (
              <div
                key={tagIndex}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-900/80 border border-gray-700/50 backdrop-blur-sm hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                title={tag}
              >
                <div className="text-cyan-400">
                  {getIconForTag(tag)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-7xl mx-auto w-full items-start justify-start">
      <Tabs 
        tabs={tabs} 
        containerClassName={containerClassName}
        activeTabClassName={activeTabClassName}
        tabClassName={tabClassName}
        contentClassName={contentClassName}
      />
    </div>
  );
}

// Export legacy demo for backward compatibility
export function TabsDemo() {
  const demoData: Project[] = [
    {
      title: "Product Demo",
      description: "A comprehensive product showcase with advanced features",
      image: "/linear.webp",
      tags: ["React", "TypeScript", "Tailwind"]
    },
    {
      title: "Services Demo",
      description: "Professional services demonstration",
      image: "/linear.webp",
      tags: ["Next.js", "API", "Database"]
    },
    {
      title: "Playground Demo",
      description: "Interactive playground for testing",
      image: "/linear.webp",
      tags: ["JavaScript", "CSS", "HTML"]
    }
  ];

  return <ReusableTabs data={demoData} />;
}