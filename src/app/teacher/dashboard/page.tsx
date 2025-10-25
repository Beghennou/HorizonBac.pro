
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // This component is now just a redirector.
    // It maintains the search params to preserve level and class selection.
    if (typeof window !== 'undefined') {
        const currentSearchParams = window.location.search;
        router.replace(`/teacher/dashboard/class-progress${currentSearchParams}`);
    }
  }, [router]);

  return null; // Render nothing as it will redirect immediately
}
