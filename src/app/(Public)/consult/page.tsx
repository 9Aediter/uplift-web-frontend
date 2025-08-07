import React from 'react';
import { ConsultationForm } from '@/components/forms/consultation-form';
import { Section } from '@/components/ui/section';
import { ConsultationHero } from '@/components/section/consult/consultation-hero';

export const metadata = {
  title: 'Free Consultation | Uplift Tech',
  description: 'Schedule a free consultation with our technology experts. Get personalized advice for your business needs.',
};

export default function ConsultPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <Section className="pt-20 md:pt-24 pb-8 md:pb-12">
        <ConsultationHero />
      </Section>

      {/* Form Section */}
      <Section className="pb-20">
        <div className="max-w-sm md:max-w-7xl mx-auto px-4 md:px-6">
          <ConsultationForm />
        </div>
      </Section>
    </main>
  );
}