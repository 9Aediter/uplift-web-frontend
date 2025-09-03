import React from 'react';
import { ConsultationForm } from '@/components/forms/consultation-form';
import { Section } from '@/components/ui/section';
import { ConsultationHero } from '@/components/section/consult/consultation-hero';
import { Particles } from '@/components/section/uplift/hero/particles';
import { FloatingElements } from '@/components/section/uplift/hero/floating-elements';
import { ConsultBenefits } from '@/components/section/consult/consult-benefits';
import { ConsultProcess } from '@/components/section/consult/consult-process';
import { Button } from '@/components/button/button';
import Link from 'next/link';

export const metadata = {
  title: 'Free Consultation | Uplift Tech',
  description: 'Schedule a free consultation with our technology experts. Get personalized advice for your business needs.',
};

export default function ConsultPage() {
  return (
    <main className="min-h-screen bg-gradient-to-t from-black via-black/90 to-black/70 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <Particles />
        <FloatingElements />
      </div>
      
      {/* Hero Section */}
      <Section className="pt-20 md:pt-24 pb-8 md:pb-12 relative z-10">
        <ConsultationHero />
      </Section>

      {/* Benefits Section */}
      <Section className="py-16 md:py-20 relative z-10">
        <ConsultBenefits />
      </Section>

      {/* Process Section */}
      <Section className="py-16 md:py-20 relative z-10">
        <ConsultProcess />
      </Section>

      {/* Member Registration CTA */}
      <Section className="py-16 md:py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Join Our <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Community</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Get exclusive access to premium resources, priority support, and special discounts on our services.
            </p>
            <Link href="/auth/signin">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-3">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Form Section */}
      <Section className="pb-20 relative z-10">
        <div className="max-w-sm md:max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Transform</span> Your Business?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Start your journey with a free consultation. Our experts are ready to discuss your needs and provide tailored solutions.
            </p>
          </div>
          <ConsultationForm />
        </div>
      </Section>
    </main>
  );
}