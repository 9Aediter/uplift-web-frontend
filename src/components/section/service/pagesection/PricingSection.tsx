import React from 'react';
import ConsultButton from './ConsultButton'; // Import ConsultButton

interface PricingPackage {
  name: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

interface PricingSectionProps {
  pricing: PricingPackage[];
  serviceColor: string; // e.g., "from-blue-500 to-cyan-400"
  sectionTitle: string;
  // onConsultClick: () => void; // Removed
}

const PricingSection: React.FC<PricingSectionProps> = ({ pricing, serviceColor, sectionTitle }) => {
  const colorClass = serviceColor.split(' ')[1].replace('to-', '');

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {sectionTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing?.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden ${pkg.isPopular ? 'border-2 border-' + colorClass : 'border border-gray-700'}`}
              >
                {pkg.isPopular && (
                  <div
                    className={`absolute top-0 right-0 bg-gradient-to-r ${serviceColor} px-4 py-1 text-sm font-medium`}
                  >
                    Popular
                  </div>
                )}
                <div className="p-6 bg-background h-full">
                  <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                  <p className="text-gray-400 mb-4">{pkg.description}</p>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div
                          className={`text-${colorClass} mr-3 flex-shrink-0 mt-1`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <ConsultButton
                    buttonText="เลือกแพ็กเกจนี้"
                    className={`w-full py-3 rounded-lg font-medium ${pkg.isPopular ? 'bg-gradient-to-r ' + serviceColor + ' text-white' : 'bg-white/10 text-white hover:bg-white/20'} transition-colors`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
