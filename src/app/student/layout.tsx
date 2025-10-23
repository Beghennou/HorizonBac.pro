'use client';

import { Suspense } from 'react';
import { AssignmentsProvider } from '@/contexts/AssignmentsContext';
import StudentLayoutContent from './student-layout-content';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { Loader2 } from 'lucide-react';
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
    <Suspense fallback={<TachometerAnimation />}>
      <AssignmentsProvider>
        <LayoutWrapper>{children}</LayoutWrapper>
      </AssignmentsProvider>
    </Suspense>
  );
}
