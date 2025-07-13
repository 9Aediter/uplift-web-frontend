import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coming Soon',
  description: 'This page is coming soon.',
};

const ComingSoonPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-bold">Coming Soon</h1>
    </div>
  );
};

export default ComingSoonPage;
