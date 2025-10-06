// Layout for [lang] routes
import { ReactNode } from 'react';
import FloatingActionButton from '@/components/layout/floating-action-button';

export default function LangLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <FloatingActionButton />
    </>
  );
}

// Generate static params for supported languages
export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'th' },
  ];
}
