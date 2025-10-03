"use client";
import React from "react";
import Image from "next/image";
import { ReusableModal, ModalIcons } from "./reusable-modal";

// Example 1: Product Card Modal
export function ProductModalExample() {
  return (
    <ReusableModal
      trigger={
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border cursor-pointer hover:shadow-lg transition-shadow">
          <Image src="/api/placeholder/300/200" alt="Product" width={300} height={160} className="w-full h-40 object-cover rounded mb-4" />
          <h3 className="font-bold text-lg">Amazing Product</h3>
          <p className="text-gray-600">Click to learn more</p>
        </div>
      }
      title="Amazing Product Details"
      description="This is a revolutionary product that will change your life forever."
      images={[
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300"
      ]}
      summary={[
        { icon: <ModalIcons.Check />, text: "High Quality Materials" },
        { icon: <ModalIcons.Star />, text: "5 Star Rating" },
        { icon: <ModalIcons.Heart />, text: "Customer Favorite" },
        { text: "Free Shipping Available" }
      ]}
      buttons={[
        { label: "Cancel", variant: "secondary" },
        { label: "View Product", variant: "primary", path: "/products/123" }
      ]}
    />
  );
}

// Example 2: Simple Button Trigger
export function SimpleModalExample() {
  return (
    <ReusableModal
      trigger={
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Open Modal
        </button>
      }
      title="Welcome Message"
      description="Thank you for visiting our website! We're glad to have you here."
      buttons={[
        { 
          label: "Got it!", 
          variant: "primary",
          onClick: () => console.log("User acknowledged!")
        }
      ]}
    />
  );
}

// Example 3: Technology Stack Modal
export function TechStackModalExample() {
  return (
    <ReusableModal
      trigger={
        <div className="text-center cursor-pointer group">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <ModalIcons.Code />
          </div>
          <p className="font-semibold">Tech Stack</p>
        </div>
      }
      title="🚀 Our Technology Stack"
      summary={[
        { icon: <ModalIcons.Code />, text: "React.js & Next.js" },
        { icon: <ModalIcons.Code />, text: "TypeScript" },
        { icon: <ModalIcons.Code />, text: "Tailwind CSS" },
        { icon: <ModalIcons.Code />, text: "Prisma & PostgreSQL" },
        { icon: <ModalIcons.Code />, text: "AWS S3" }
      ]}
      buttons={[
        { label: "Learn More", variant: "primary", path: "/technologies" }
      ]}
    />
  );
}

// Example 4: Image Gallery Modal
export function GalleryModalExample() {
  return (
    <ReusableModal
      trigger={
        <Image 
          src="/api/placeholder/200/200" 
          alt="Gallery" 
          width={200} 
          height={200}
          className="rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
        />
      }
      title="🖼️ Photo Gallery"
      images={[
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300"
      ]}
      buttons={[
        { label: "View All", variant: "primary", path: "/gallery" }
      ]}
    />
  );
}

// Example 5: Service Card with Custom Styling
export function ServiceModalExample() {
  return (
    <ReusableModal
      trigger={
        <div className="group relative p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <h3 className="text-xl font-bold mb-2">Web Development</h3>
          <p className="text-purple-100">Professional web solutions</p>
        </div>
      }
      title="💻 Web Development Services"
      description="We create modern, responsive websites that deliver exceptional user experiences."
      images={[
        "/api/placeholder/400/300"
      ]}
      summary={[
        { icon: <ModalIcons.Check />, text: "Responsive Design" },
        { icon: <ModalIcons.Check />, text: "SEO Optimized" },
        { icon: <ModalIcons.Check />, text: "Fast Loading" },
        { icon: <ModalIcons.Check />, text: "Mobile First" }
      ]}
      buttons={[
        { label: "Get Quote", variant: "secondary", path: "/contact" },
        { label: "View Portfolio", variant: "primary", path: "/portfolio" }
      ]}
      triggerClassName="w-full"
    />
  );
}

// Demo Container
export function ModalExamples() {
  return (
    <div className="p-8 space-y-12">
      <h2 className="text-3xl font-bold text-center mb-8">Reusable Modal Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Product Card Modal</h3>
          <ProductModalExample />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Simple Button Modal</h3>
          <SimpleModalExample />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Tech Stack Modal</h3>
          <TechStackModalExample />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Gallery Modal</h3>
          <GalleryModalExample />
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Service Card Modal</h3>
          <ServiceModalExample />
        </div>
      </div>
    </div>
  );
}