// Layout for [lang] routes
import { ReactNode } from 'react';
import FloatingActionButton from '@/components/layout/floating-action-button';
import { TechModalProvider } from '@/lib/providers/tech-modal-provider';

export default function LangLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TechModalProvider>
      {children}
      <FloatingActionButton />
    </TechModalProvider>
  );
}

// Generate static params for supported languages
export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'th' },
  ];
}
