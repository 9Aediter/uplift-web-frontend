'use client';

import Link from 'next/link';
import React from 'react';

const TestIndexPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Test Pages</h1>
      <div className="flex flex-col space-y-4">
        <Link href="/test/articles" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-lg font-medium text-center transition-colors">
          Go to Articles Test Page
        </Link>
        <Link href="/test/article-detail" className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md text-lg font-medium text-center transition-colors">
          Go to Article Detail Test Page
        </Link>
        <Link href="/test/product" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-md text-lg font-medium text-center transition-colors">
          Go to Product Test Page
        </Link>
        <Link href="/test/service" className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-md text-lg font-medium text-center transition-colors">
          Go to Service Test Page
        </Link>
        <Link href="/test/footer" className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md text-lg font-medium text-center transition-colors">
          Go to Footer Test Page
        </Link>
        <Link href="/test/software" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-lg font-medium text-center transition-colors">
          Go to Software Test Page
        </Link>
      </div>
    </div>
  );
};

export default TestIndexPage;