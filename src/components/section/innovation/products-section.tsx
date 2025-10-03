'use client';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { Section } from '@/components/ui/section'
import { IconMap, getGradient } from '@/data/products';
import { CheckIcon } from 'lucide-react';
// Mock data for products
const mockProducts = [
  {
    id: '1',
    title: 'Smart ERP System',
    subtitle: 'Enterprise Management',
    slug: 'smart-erp-system',
    description: 'Complete business management solution with advanced features',
    features: [
      { title: 'Real-time Analytics', description: 'Live business insights', icon: 'BarChart3' },
      { title: 'Multi-user Access', description: 'Role-based permissions', icon: 'Users' },
      { title: 'Cloud Integration', description: 'Seamless cloud sync', icon: 'Cloud' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop',
    category: 'ERP'
  },
  {
    id: '2',
    title: 'Modern POS Solution',
    subtitle: 'Retail Technology',
    slug: 'modern-pos-solution', 
    description: 'Advanced point-of-sale system for modern retail businesses',
    features: [
      { title: 'Inventory Management', description: 'Real-time stock tracking', icon: 'Package' },
      { title: 'Payment Processing', description: 'Multiple payment methods', icon: 'CreditCard' },
      { title: 'Sales Reports', description: 'Detailed analytics', icon: 'TrendingUp' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
    category: 'POS'
  },
  {
    id: '3',
    title: 'Web Application Platform',
    subtitle: 'Custom Development',
    slug: 'web-app-platform',
    description: 'Scalable web application development platform',
    features: [
      { title: 'Custom Development', description: 'Tailored solutions', icon: 'Code' },
      { title: 'Responsive Design', description: 'Mobile-first approach', icon: 'Smartphone' },
      { title: 'API Integration', description: 'Connect everything', icon: 'Link' }
    ],
    coverImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop',
    category: 'Web App'
  }
];

type ProductDetail = typeof mockProducts[0];

interface ProductsSectionProps {
  products?: ProductDetail[];
}

const ProductsSection = ({ products: propsProducts }: ProductsSectionProps) => {
  // Use props or fallback to mock data
  const products = propsProducts || mockProducts;

  if (!products || products.length === 0) {
    return <div className="text-center py-10 text-muted-foreground">No products available</div>;
  }

  return (
    <>
      {products.map((product: ProductDetail, index) => {
        // TODO: Fix product.icon type issue - temporarily using default
        const IconComponent = IconMap['Zap']; // Default icon
        return (
          <Section
            key={product.id}
            className={`py-16 md:py-24 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/50'} w-full`}
            id={product.id}
          >
            <div
              className={`flex flex-col px-4 md:px-8 max-w-7xl mx-auto ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 w-full`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2" style={{ perspective: '1000px' }}>
                <div 
                  className={`group relative rounded-lg overflow-hidden border border-border shadow-2xl shadow-purple-500/10 transform transition-all duration-700 hover:scale-105 hover:shadow-3xl hover:shadow-purple-500/20 h-64 md:h-96 ${
                    index % 2 === 0 
                      ? 'hover:[transform:rotateX(10deg)_rotateY(-15deg)_scale(1.05)]' 
                      : 'hover:[transform:rotateX(10deg)_rotateY(15deg)_scale(1.05)]'
                  }`}
                  style={{
                    transform: `rotateX(5deg) rotateY(${index % 2 === 0 ? '-5deg' : '5deg'})`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <Image
                    src={product.coverImage || '/placeholder-product.png'}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <div
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg"
                  >
                    {/* Render the icon component */}
                    {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="w-full md:w-1/2">
                <div className="mb-4 inline-flex items-center px-4 py-1 rounded-full bg-muted/80 border border-border">
                  <span
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-2"
                  ></span>
                  <span className="text-sm font-medium text-foreground">{product.subtitle}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span
                    className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                  >
                    {product.title}
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {product.description}
                </p>
                <div className="space-y-4 mb-8">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div
                        className="p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3 mt-0.5"
                      >
                        <CheckIcon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-muted-foreground">{feature.title}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/innovation/${product.slug}`}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </Section>
        );
      })}
    </>
  );
};

export default ProductsSection;

