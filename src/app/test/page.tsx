'use client';

import Link from 'next/link';
import React from 'react';

const TestIndexPage = () => {
  return (
    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Available Test Pages:</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <Link href="/test/product" className="text-blue-400 hover:underline">
            Test Product Data (Store vs. Raw API)
          </Link>
        </li>
        <li>
          <Link href="/test/service" className="text-blue-400 hover:underline">
            Test Service Data (Landing Store vs. Raw API)
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TestIndexPage;