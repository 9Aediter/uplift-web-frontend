import React from 'react';
import { Section } from '@/components/ui/section';
import { Card } from "@/components/card";
import { LightbulbIcon, TrendingUpIcon, CodeIcon } from 'lucide-react';

interface WhyNeedItCard {
  id: string;
  title: string;
  description: string;
  icon?: string;
  iconColor?: string;
  order: number;
}

interface WhyNeedItSectionProps {
  title?: string;
  subtitle?: string;
  cards?: WhyNeedItCard[];
}

const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case 'LightbulbIcon':
      return LightbulbIcon;
    case 'TrendingUpIcon':
      return TrendingUpIcon;
    case 'CodeIcon':
      return CodeIcon;
    default:
      return LightbulbIcon;
  }
};

const getIconColor = (iconColor?: string) => {
  return iconColor || 'text-yellow-400';
};

export const WhyNeedItSection = ({ 
  title,
  subtitle,
  cards
}: WhyNeedItSectionProps) => {
  // If no data from database, don't render the section
  if (!cards || cards.length === 0) {
    return null;
  }

  const sortedCards = [...cards].sort((a, b) => a.order - b.order);
  const sectionTitle = title || "Why Your Business Needs It";

  return (
    <Section className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white py-6 text-center">
        {sectionTitle}
      </h2>
      {subtitle && (
        <p className="text-xl text-center text-gray-400 mb-6">{subtitle}</p>
      )}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {sortedCards.map((card) => {
          const IconComponent = getIconComponent(card.icon);
          const iconColorClass = getIconColor(card.iconColor);
          
          return (
            <Card key={card.id} className="p-6 text-center">
              <IconComponent className={`w-10 h-10 ${iconColorClass} mx-auto mb-4`} />
              <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.description}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};
