import React from 'react';

interface BenefitItem {
  metric: string;
  description: string;
}

interface BenefitsOutcomesSectionProps {
  benefits: BenefitItem[];
  serviceColor: string; // e.g., "from-blue-500 to-cyan-400"
  sectionTitle: string;
}

const BenefitsOutcomesSection: React.FC<BenefitsOutcomesSectionProps> = ({ benefits, serviceColor, sectionTitle }) => {
  const colorClass = serviceColor.split(' ')[1].replace('to-', '');

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold my-8 text-center">
            {sectionTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits?.map((benefit, index) => {
              // Generate a slightly different color for each card based on the service color
              const cardColorClass = `${serviceColor.split(' ')[0]}/5 to-${colorClass}/10`;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${cardColorClass} rounded-xl p-6 text-center border border-${colorClass}/20`}
                >
                  <h3
                    className={`text-4xl font-bold mb-3 text-${colorClass}`}
                  >
                    {benefit.metric}
                  </h3>
                  <p className="text-white">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsOutcomesSection;
