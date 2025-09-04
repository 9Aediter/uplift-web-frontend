"use client";
import React from 'react';
import { Section } from '@/components/ui/section';
import { BentoGridClient as BentoGrid, BentoGridItemClient as BentoGridItem } from '@/components/gridcard/bento-grid-client';
import { AnimateEffect } from '@/components/animate-effect';
import { ReusableModal } from '@/components/modal';
import {
  FaShippingFast,
  FaWarehouse,
  FaCashRegister,
  FaHotel,
  FaTruck,
  FaDumbbell,
  FaCheck,
  FaCode
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

// Solution Card Component with Modal and Individual Animation
const SolutionCard = ({ item, index }: { 
  item: SolutionItem;
  index: number;
}) => {
  const IconComponent = iconMap[item.icon] || FaShippingFast;
  
  return (
    <div className={`h-full w-full ${item.className}`}>
      <AnimateEffect index={index} delay={0.1 * index}>
        <ReusableModal
        trigger={
          <BentoGridItem
            title={item.title}
            description={item.description}
            icon={<IconComponent />}
            image={item.image}
            bgColor={item.bgColor}
          />
        }
        title={item.title}
        description={item.modalContent.fullDescription}
        images={item.modalContent.images}
        summary={[
          ...item.modalContent.features.map(feature => ({
            icon: <FaCheck className="text-green-500" />,
            text: feature
          })),
          ...item.modalContent.techStack.map(tech => ({
            icon: <FaCode className="text-blue-500" />,
            text: tech
          }))
        ]}
        buttons={[
          { label: "Close", variant: "secondary" as const },
          { label: "Learn More", variant: "primary" as const, path: "/solutions" }
        ]}
        triggerAsDiv={true}
      />
      </AnimateEffect>
    </div>
  );
};

export const Solution = ({ data }: { data: SolutionData }) => {
  const { title, subtitle, items } = data;

  return (
    <Section className="py-20 bg-gradient-to-b from-background to-muted/30 h-fit">
      <div className="w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <AnimateEffect index={0}>
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {subtitle}
              </p>
            </div>
          </AnimateEffect>

          <BentoGrid className="max-w-7xl mx-auto w-full">
            {items.map((item, i) => (
              <SolutionCard key={i} item={item} index={i + 2} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </Section>
  );
};