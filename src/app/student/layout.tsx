'use client';

import { Suspense } from 'react';
import { AssignmentsProvider } from '@/contexts/AssignmentsContext';
import StudentLayoutContent from './student-layout-content';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { TachometerAnimation } from '@/components/TachometerAnimation';

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isLoaded } = useAssignments();

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
    <AssignmentsProvider>
      <Suspense fallback={<TachometerAnimation />}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </Suspense>
    </AssignmentsProvider>
  );
}
