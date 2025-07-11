"use client"
import { useParams } from 'next/navigation';
import React from 'react';
import { Section } from '@/components/ui/section';
import { innovations } from '@/data/innovation-mock';
import Image from 'next/image';

export default function InnovationDetailPage() {
  const params = useParams();
  const { id } = params;

  const innovation = innovations.find(item => item.id === id);

  if (!innovation) {
    return (
      <Section className="min-h-screen py-12 md:py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Innovation Not Found</h1>
          <p className="text-xl text-gray-300">The innovation with ID "{id}" could not be found.</p>
        </div>
      </Section>
    );
  }

  return (
    <main className="w-full">
      <Section className="max-w-7xl mx-auto h-[60vh] flex flex-col justify-end">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          {innovation.title}
        </h1>
        <p className="text-xl text-cyan-400 mb-6">{innovation.subtitle}</p>

        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
          <Image
            src={innovation.imageUrl}
            alt={innovation.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </Section>
      <Section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">


          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Overview
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {innovation.description}
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Key Features:</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              {innovation.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Case Study
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {innovation.caseStudy}
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
