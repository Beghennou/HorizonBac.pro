
'use client';

import { Suspense } from 'react';
import { FirebaseProvider, useFirebase } from '@/firebase/provider';
import StudentLayoutContent from './student-layout-content';
import { TachometerAnimation } from '@/components/TachometerAnimation';

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useFirebase();

  if (!isLoaded) {
    return <TachometerAnimation />;
  }

  return <StudentLayoutContent>{children}</StudentLayoutContent>;
}


export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Suspense fallback={<TachometerAnimation />}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </Suspense>
  );
}
