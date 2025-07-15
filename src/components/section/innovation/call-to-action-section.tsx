import React from 'react';
import { Section } from '@/components/ui/section';
import { Button } from "@/components/ui/button";
import { RocketIcon } from 'lucide-react';

interface CallToActionSectionProps {
  systemName: string;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({ systemName }) => (
  <Section className="py-12 md:py-20 text-center">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Let’s build your own {systemName} today.
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" variant="default" className="flex px-6 py-6">
          <RocketIcon className="w-5 h-5 mr-2" />
          Request Demo
        </Button>
        <Button variant="outline" size="lg" className="flex px-6 py-6">
          Talk to System Architect
        </Button>
      </div>
    </div>
  </Section>
);
