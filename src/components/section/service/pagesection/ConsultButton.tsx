"use client";
import React from 'react';

interface ConsultButtonProps {
  buttonText: string;
  className?: string;
}

const ConsultButton: React.FC<ConsultButtonProps> = ({ buttonText, className }) => {
  const handleConsultClick = () => {
    console.log("Consult button clicked from client component!");
    // Implement your consult logic here (e.g., open a modal, redirect to contact form)
    // For example, redirect to a contact page:
    // window.location.href = '/contact';
  };

  return (
    <button
      className={`bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-3 rounded-lg font-medium hover:from-gray-600 hover:to-gray-500 transition-colors ${className || ''}`}
      onClick={handleConsultClick}
    >
      {buttonText}
    </button>
  );
};

export default ConsultButton;
