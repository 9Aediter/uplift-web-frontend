'use client';

import React, { useEffect, useState } from 'react';
import useProductStore from '@/lib/store/product-store';
import { fetchAllProducts } from '@/lib/api/product-api';
import type { Product } from '@/lib/store/product-store'; // Ensure Product type is imported

const TestProductPage = () => {
  // Part 1: Data from the Zustand Store
  const { products: storeProducts, isLoading: storeIsLoading, error: storeError, fetchProducts: fetchProductsFromStore } = useProductStore();

  // Part 2: Raw data from direct API call
  const [rawApiData, setRawApiData] = useState<any[] | null>(null); // Use any[] for raw data
  const [rawApiIsLoading, setRawApiIsLoading] = useState(false);
  const [rawApiError, setRawApiError] = useState<string | null>(null);

  // Effect for Part 1: Fetch data into the store
  useEffect(() => {
    fetchProductsFromStore();
  }, [fetchProductsFromStore]);

  // Effect for Part 2: Fetch raw data directly
  useEffect(() => {
    const fetchRawData = async () => {
      setRawApiIsLoading(true);
      setRawApiError(null);
      try {
        const data = await fetchAllProducts(); // This now returns raw Strapi data
        setRawApiData(data);
      } catch (error) {
        setRawApiError(error instanceof Error ? error.message : 'Unknown API error');
      } finally {
        setRawApiIsLoading(false);
      }
    };

    fetchRawData();
  }, []);

  const renderJson = (data: any) => {
    return <pre className="p-4 bg-gray-800 text-white rounded-md text-sm whitespace-pre-wrap break-words">{JSON.stringify(data, null, 2)}</pre>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
      {/* Column 1: Data from Zustand Store */}
      <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-400">1. Data from Product Store</h2>
        {storeIsLoading && <p>Loading from store...</p>}
        {storeError && <p className="text-red-500">Error: {storeError}</p>}
        {storeProducts && !storeIsLoading && (
          <div>
            <p className="mb-2">Products loaded in store: {storeProducts.length}</p>
            {renderJson(storeProducts)}
          </div>
        )}
      </div>

      {/* Column 2: Raw Data from Direct API Call */}
      <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-lime-400">2. Raw Data from API</h2>
        {rawApiIsLoading && <p>Loading from API...</p>}
        {rawApiError && <p className="text-red-500">Error: {rawApiError}</p>}
        {rawApiData && !rawApiIsLoading && (
          <div>
            <p className="mb-2">Raw items loaded: {rawApiData.length}</p>
            {renderJson(rawApiData)}
          </div>
        )}
      </div>

    </div>
  );
};

export default TestProductPage;
