import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
import { Card } from "@/components/card";
import { Section } from '@/components/ui/section';

interface CoreFeaturesSectionProps {
  features: string[];
}

export const CoreFeaturesSection: React.FC<CoreFeaturesSectionProps> = ({ features }) => (
  <Section>
    <h2 className="text-center text-4xl font-semibold text-white mb-4">
      Core Features
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features?.map((feature: string, index: number) => (
        <Card key={index} className="p-4 flex items-center space-x-3">
          <CheckCircleIcon className="w-6 h-6 text-cyan-400 flex-shrink-0" />
          <p className="text-gray-300">{feature}</p>
        </Card>
      ))}
    </div>
  </Section>
);
