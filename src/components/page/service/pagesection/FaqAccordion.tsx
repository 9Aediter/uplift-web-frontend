"use client";
import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  serviceColor: string; // e.g., "from-blue-500 to-cyan-400"
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ faqs, serviceColor }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const colorClass = serviceColor.split(' ')[1].replace('to-', '');

  return (
    <div className="space-y-4">
      {faqs?.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-700 rounded-lg overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between p-5 text-left bg-[#1A1A1A] hover:bg-[#1F1F1F] transition-colors"
            onClick={() =>
              setActiveFaq(activeFaq === index ? null : index)
            }
          >
            <div className="flex items-start">
              <div
                className={`text-${colorClass} mr-3 flex-shrink-0 mt-1`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <span className="font-medium text-lg">
                {faq.question}
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          {activeFaq === index && (
            <div className="p-5 bg-[#1A1A1A] border-t border-gray-700">
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
