// app/analytics-provider.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    window.gtag?.("config", "G-SNLN0CMP02", {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}