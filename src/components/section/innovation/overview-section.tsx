import React from 'react';

interface OverviewSectionProps {
  description: string;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ description }) => (
  <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 mb-8">
    <h2 className="text-2xl font-semibold text-white mb-4">
      Overview
    </h2>
    <p className="text-gray-400 leading-relaxed mb-6">
      {description}
    </p>
  </div>
);
