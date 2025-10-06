'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageGalleryModal } from '@/components/layout/popup/image-gallery-modal';
import { motion } from 'motion/react';

export function BestPractice() {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
    description: string;
  } | null>(null);

  const handleImageClick = (project: typeof mockProjects[0]) => {
    setSelectedImage({
      url: project.imageUrl,
      title: project.title,
      description: project.description,
    });
  };

  return (
    <>
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Best Practice
              </span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Explore our portfolio of successful projects and innovative solutions that have transformed businesses across industries.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`relative overflow-hidden rounded-xl cursor-pointer group ${project.className}`}
                onClick={() => handleImageClick(project)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Image Container with fixed height */}
                <div className="relative h-[300px] md:h-[400px]">
                  <Image
                    src={project.imageUrl}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    alt={project.title}
                    unoptimized
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-white/80 line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <ImageGalleryModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </>
  );
}

// Mock data - replace with API call in the future
const mockProjects = [
  { id: 1, title: "Mobile App Logo Design", description: "Professional mobile application logo design representing our company's innovative technology solutions and modern brand identity.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_01.png", className: "md:col-span-2" },
  { id: 2, title: "Corporate Signage", description: "Modern corporate signage and branding materials showcasing our company presence and professional identity.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_02.png", className: "col-span-1" },
  { id: 3, title: "E-Commerce Application", description: "Full-featured e-commerce mobile application with seamless shopping experience, payment integration, and inventory management.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_03.png", className: "col-span-1" },
  { id: 4, title: "iPad Backoffice App", description: "Comprehensive backoffice management application for iPad with real-time analytics, reporting, and administrative controls.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_04.png", className: "md:col-span-2" },
  { id: 5, title: "Delivery Solution", description: "Advanced delivery management solution with route optimization, real-time tracking, and automated dispatch system.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_05.png", className: "md:col-span-2" },
  { id: 6, title: "Corporate Business Card", description: "Professional business card design reflecting our corporate identity and brand values with modern aesthetics.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_06.png", className: "col-span-1" },
  { id: 8, title: "Website Backoffice Desktop", description: "Powerful desktop web backoffice system for comprehensive business management and data analytics.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_08.png", className: "col-span-1" },
  { id: 9, title: "TOR Contract Cover", description: "Professional Terms of Reference (TOR) contract documentation cover design for corporate agreements.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_09.png", className: "md:col-span-2" },
  { id: 10, title: "Ride Booking App", description: "On-demand ride booking application similar to Grab with real-time driver tracking and seamless payment integration.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_10.png", className: "col-span-1" },
  { id: 13, title: "Laundry Solution", description: "Complete laundry management solution with order tracking, delivery scheduling, and customer management system.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_13.png", className: "md:col-span-2" },
  { id: 14, title: "Transportation Solution", description: "Comprehensive transportation management system with fleet tracking, route optimization, and logistics coordination.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_14.png", className: "col-span-1" },
  { id: 15, title: "E-Commerce Platform", description: "Full-scale e-commerce platform with advanced features including multi-vendor support, payment gateway, and analytics.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_15.png", className: "col-span-1" },
  { id: 16, title: "Laundry AI", description: "AI-powered laundry solution with intelligent sorting, pricing optimization, and automated workflow management.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_16.png", className: "md:col-span-2" },
  { id: 17, title: "Business Solutions", description: "Integrated business solutions portfolio showcasing our comprehensive technology services and capabilities.", imageUrl: "https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/IM_01_17.png", className: "col-span-1" },
];

const cards = mockProjects.map((project) => ({
  id: project.id,
  content: (
    <div>
      <h3 className="font-bold text-xl md:text-2xl text-white">
        {project.title}
      </h3>
      <p className="font-normal text-sm md:text-base text-white/80 mt-2">
        {project.description}
      </p>
    </div>
  ),
  className: project.className,
  thumbnail: project.imageUrl,
}));
