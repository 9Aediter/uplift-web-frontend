import React from 'react';
import Image from 'next/image';

interface CaseStudyItem {
  name: string;
  logo?: string;
  result: string;
  testimonial?: string;
  company?: string;
}

interface CaseStudySectionProps {
  caseStudies: CaseStudyItem[];
  serviceColor: string; // e.g., "from-blue-500 to-cyan-400"
  sectionTitle: string;
}

const CaseStudySection: React.FC<CaseStudySectionProps> = ({ caseStudies, serviceColor, sectionTitle }) => {
  const colorClass = serviceColor.split(' ')[1].replace('to-', '');

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {sectionTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies?.map((caseStudy, index) => (
              <div
                key={index}
                className="bg-[#1A1A1A] rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    {caseStudy.logo ? (
                      <Image
                        src={caseStudy.logo}
                        alt={caseStudy.name}
                        width={48} // Adjust as needed
                        height={48} // Adjust as needed
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <span className="text-2xl font-bold">
                        {caseStudy.name.split(' ')[0][0]}
                        {caseStudy.name.split(' ').length > 1
                          ? caseStudy.name.split(' ')[1][0]
                          : ''}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{caseStudy.name}</h3>
                    <p
                      className={`text-${colorClass} font-medium`}
                    >
                      {caseStudy.result}
                    </p>
                  </div>
                </div>
                {caseStudy.testimonial && (
                  <div className="mt-4">
                    <p className="italic text-gray-300">
                      {caseStudy.testimonial}
                    </p>
                    {caseStudy.company && (
                      <p className="mt-2 text-sm text-gray-400">
                        {caseStudy.company}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySection;
