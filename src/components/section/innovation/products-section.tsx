'use client';

import React, { useEffect } from 'react'
import { Section } from '@/components/ui/section'
import { IconMap, getGradient } from '@/data/products';
import { CheckIcon } from 'lucide-react';
import useProductStore from '@/lib/store/product-store';
import type { Product } from '@/lib/store/product-store';

const ProductsSection = () => {
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const products = useProductStore((state) => state.products);
  const isLoading = useProductStore((state) => state.isLoading);
  const error = useProductStore((state) => state.error);

  useEffect(() => {
    fetchProducts();
  }, []);  // ✅ เรียกครั้งเดียว

  if (isLoading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      {products.map((product: Product, index) => {
        const IconComponent = IconMap[product.icon]; // Get the icon component from IconMap
        return (
          <Section
            key={product.id}
            className={`py-16 md:py-24 ${index % 2 === 0 ? 'bg-black' : 'bg-gray-900/30'}`}
            id={product.id}
          >
            <div
              className={`flex flex-col px-8 max-w-7xl mx-auto ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-lg overflow-hidden border border-gray-800">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div
                    className={`absolute top-4 left-4 w-10 h-10 rounded-full bg-gradient-to-r ${getGradient(product.color)} flex items-center justify-center`}
                  >
                    {/* Render the icon component */}
                    {IconComponent && <IconComponent className="h-6 w-6" />}
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="w-full md:w-1/2">
                <div className="mb-4 inline-flex items-center px-4 py-1 rounded-full bg-gray-800/80 border border-gray-700">
                  <span
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${getGradient(product.color)} mr-2`}
                  ></span>
                  <span className="text-sm font-medium">{product.subtitle}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span
                    className={`bg-gradient-to-r ${getGradient(product.color)} bg-clip-text text-transparent`}
                  >
                    {product.title}
                  </span>
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  {product.description}
                </p>
                <div className="space-y-4 mb-8">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <div
                        className={`p-1 rounded-full bg-gradient-to-r ${getGradient(product.color)} mr-3 mt-0.5`}
                      >
                        <CheckIcon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={`px-6 py-2 rounded-lg bg-gradient-to-r ${getGradient(product.color)} text-white font-medium hover:opacity-90 transition-opacity`}
                >
                  Learn More
                </button>
              </div>
            </div>
          </Section>
        );
      })}
    </>
  );
};

export default ProductsSection;
