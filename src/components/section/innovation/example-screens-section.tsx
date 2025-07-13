import React from 'react';
import { Section } from '@/components/ui/section';

interface ExampleScreensSectionProps {
  caseStudy: string;
}

export const ExampleScreensSection: React.FC<ExampleScreensSectionProps> = ({ caseStudy }) => (
  <Section className="py-12 md:py-20">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Example Screens / Case Study
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img src="https://via.placeholder.com/600x400" alt="Example Screen 1" className="rounded-lg shadow-lg mb-4" />
          <p className="text-gray-400">ภาพตัวอย่างหน้าจอการจัดการสต็อกสินค้าแบบเรียลไทม์</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/600x400" alt="Example Screen 2" className="rounded-lg shadow-lg mb-4" />
          <p className="text-gray-400">ภาพตัวอย่างหน้าจอรายงานยอดขายประจำวัน</p>
        </div>
      </div>
      <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 mt-8">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Case Study
        </h3>
        <p className="text-gray-400 leading-relaxed">
          {caseStudy}
        </p>
      </div>
    </div>
  </Section>
);
