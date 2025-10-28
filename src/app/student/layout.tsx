
'use client';

import { Suspense } from 'react';
import StudentLayoutContent from './student-layout-content';
import { TachometerAnimation } from '@/components/TachometerAnimation';

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Suspense fallback={<TachometerAnimation />}>
        <StudentLayoutContent>{children}</StudentLayoutContent>
      </Suspense>
  );
}
