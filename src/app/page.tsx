// Root redirect - src/app/page.tsx
// Redirect root to /th (default Thai language)

import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/th');
}
