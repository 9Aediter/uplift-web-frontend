import React from 'react';
import { TechStack } from '@/components/section/techstack/tech';

interface Technology {
  id: string;
  name: string;
  slug: string;
  svgCode: string;
  category?: string;
}

interface TechStackSectionData {
  id: string;
  title: string;
  subtitle: string;
  technologies: Array<{
    id: string;
    technology: Technology;
    order: number;
  }>;
}

interface TechStackSectionProps {
  techStackSection?: TechStackSectionData;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({
  techStackSection
}) => {
  // If no tech stack section data, don't render anything
  if (!techStackSection || !techStackSection.technologies.length) {
    return null;
  }

  // Sort technologies by order and extract technology objects
  const sortedTechnologies = techStackSection.technologies
    .sort((a, b) => a.order - b.order)
    .map(item => item.technology);

  return (
    <TechStack
      title={techStackSection.title}
      subtitle={techStackSection.subtitle}
      technologies={sortedTechnologies}
      speed={60}
      direction="left"
      pauseOnHover={true}
    />
  );
};
