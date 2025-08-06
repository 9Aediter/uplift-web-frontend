'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { 
  CheckCircleIcon, 
  ShieldIcon, 
  ZapIcon, 
  DatabaseIcon, 
  BarChart3Icon, 
  UsersIcon,
  CloudIcon,
  CpuIcon,
  MonitorIcon,
  GlobeIcon
} from 'lucide-react';
import { Card, CardTitle, CardDescription } from "@/components/ui/card-hover-effect";

// Icon mapping for different feature types
const FEATURE_ICONS = {
  'security': ShieldIcon,
  'performance': ZapIcon,
  'database': DatabaseIcon,
  'analytics': BarChart3Icon,
  'users': UsersIcon,
  'cloud': CloudIcon,
  'processing': CpuIcon,
  'dashboard': MonitorIcon,
  'global': GlobeIcon,
  'default': CheckCircleIcon
};

// Feature interface
interface Feature {
  title: string;
  description: string;
  icon: string;
}

// Parse feature data into structured format
const parseFeature = (feature: Feature | string, index: number) => {
  if (typeof feature === 'object') {
    // Already structured feature object
    return {
      title: feature.title,
      description: feature.description,
      iconType: feature.icon === 'default' ? 'default' : feature.icon,
      link: `#feature-${index + 1}`
    };
  }
  
  // Legacy string format - parse it
  let title = '';
  let description = '';
  let iconType = 'default';
  
  if (feature.includes(' - ')) {
    const parts = feature.split(' - ');
    title = parts[0].trim();
    description = parts.slice(1).join(' - ').trim();
  } else if (feature.includes(' | ')) {
    const parts = feature.split(' | ');
    title = parts[0].trim();
    description = parts.slice(1).join(' | ').trim();
  } else {
    title = feature;
    description = "Core feature of the system";
  }
  
  // Simple icon mapping based on keywords in title
  const titleLower = title.toLowerCase();
  if (titleLower.includes('security') || titleLower.includes('secure')) iconType = 'security';
  else if (titleLower.includes('fast') || titleLower.includes('speed') || titleLower.includes('performance')) iconType = 'performance';
  else if (titleLower.includes('data') || titleLower.includes('database')) iconType = 'database';
  else if (titleLower.includes('analytic') || titleLower.includes('report') || titleLower.includes('chart')) iconType = 'analytics';
  else if (titleLower.includes('user') || titleLower.includes('team') || titleLower.includes('member')) iconType = 'users';
  else if (titleLower.includes('cloud') || titleLower.includes('online')) iconType = 'cloud';
  else if (titleLower.includes('process') || titleLower.includes('compute')) iconType = 'processing';
  else if (titleLower.includes('dashboard') || titleLower.includes('interface')) iconType = 'dashboard';
  else if (titleLower.includes('global') || titleLower.includes('worldwide')) iconType = 'global';
  
  return {
    title,
    description,
    iconType,
    link: `#feature-${index + 1}`
  };
};

interface FeaturesHoverEffectProps {
  features: (Feature | string)[];
}

export const FeaturesHoverEffect = ({ features }: FeaturesHoverEffectProps) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const parsedFeatures = features?.map((feature, index) => parseFeature(feature, index)) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
      {parsedFeatures.map((feature, idx) => {
        const IconComponent = FEATURE_ICONS[feature.iconType as keyof typeof FEATURE_ICONS] || FEATURE_ICONS.default;
        
        return (
          <div
            key={idx}
            className="relative group block p-2 h-full w-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <div className="flex items-start gap-4 mb-4">
                <IconComponent className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
                <CardTitle className="text-left m-0 p-0">{feature.title}</CardTitle>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </Card>
          </div>
        );
      })}
    </div>
  );
};