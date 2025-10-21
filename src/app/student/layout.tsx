'use client';
import { AssignmentsProvider } from '@/contexts/AssignmentsContext';
import StudentLayoutContent from './student-layout-content';

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AssignmentsProvider>
      <StudentLayoutContent>{children}</StudentLayoutContent>
    </AssignmentsProvider>
  );
}
