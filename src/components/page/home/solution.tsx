import React from 'react';
import { Section } from '@/components/ui/section';
import { BentoGridClient as BentoGrid, BentoGridItemClient as BentoGridItem } from '@/components/basic/gridcard/bento-grid-client';
import {
  FaShippingFast,
  FaWarehouse,
  FaCashRegister,
  FaHotel,
  FaTruck,
  FaDumbbell,
} from 'react-icons/fa';

const iconMap = {
  'FaShippingFast': FaShippingFast,
  'FaWarehouse': FaWarehouse,
  'FaCashRegister': FaCashRegister,
  'FaHotel': FaHotel,
  'FaTruck': FaTruck,
  'FaDumbbell': FaDumbbell,
};

interface SolutionItem {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
  image: string;
  bgColor: string;
  className?: string;
  modalContent: {
    fullDescription: string;
    features: string[];
    techStack: string[];
    images: string[];
  };
}

interface SolutionData {
  title: string;
  subtitle: string;
  items: SolutionItem[];
}

// SSR Solution Card Component without animations
const SolutionCardSSR = ({ item }: { item: SolutionItem }) => {
  const IconComponent = iconMap[item.icon] || FaShippingFast;

  return (
    <div className={`h-full w-full ${item.className}`}>
      <BentoGridItem
        title={item.title}
        description={item.description}
        icon={<IconComponent />}
        image={item.image}
        bgColor={item.bgColor}
      />
    </div>
  );
};

export const SolutionSSR = ({ data }: { data?: SolutionData }) => {
  if (!data) return null;
  const { title, subtitle, items } = data;

  return (
    <Section className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-x-hidden">
      <div className="w-full max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 w-full overflow-x-hidden">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          <BentoGrid className="max-w-7xl mx-auto w-full overflow-x-hidden">
            {items.map((item, i) => (
              <SolutionCardSSR key={i} item={item} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </Section>
  );
};

export default SolutionSSR;