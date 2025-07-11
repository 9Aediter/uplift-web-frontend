'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

export default function TestLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Function to derive title from pathname
  const getTitle = (path: string) => {
    if (path === '/test') return 'Test Page Index';
    const parts = path.split('/').filter(Boolean);
    if (parts.length > 1 && parts[0] === 'test') {
      // Capitalize and join the last part of the path
      return `Test Page: ${parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1)} Data`;
    }
    return 'Test Page';
  };

  const pageTitle = getTitle(pathname);

  return (
    <div className="container mx-auto p-8 font-sans text-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 border-b-2 border-cyan-500 pb-2">{pageTitle}</h1>
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
