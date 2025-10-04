import React from 'react';
import FaqAccordion from './FaqAccordion'; // Import the client component
import ConsultButton from './ConsultButton'; // Import ConsultButton

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  serviceColor: string; // e.g., "from-blue-500 to-cyan-400"
  sectionTitle: string;
  // onConsultClick: () => void; // Removed
}

const FaqSection: React.FC<FaqSectionProps> = ({ faqs, serviceColor, sectionTitle }) => {
  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {sectionTitle}
          </h2>
          <FaqAccordion faqs={faqs} serviceColor={serviceColor} />
          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-4">ยังมีคำถามอื่นๆ อีกไหม?</p>
            <ConsultButton
              buttonText="ติดต่อเรา"
              className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-3 rounded-lg font-medium hover:from-gray-600 hover:to-gray-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
