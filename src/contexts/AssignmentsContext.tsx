'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type AssignmentsContextType = {
  assignedTps: Record<string, number[]>;
  assignTp: (studentNames: string[], tpId: number) => void;
};

const AssignmentsContext = createContext<AssignmentsContextType | undefined>(undefined);

export const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const [assignedTps, setAssignedTps] = useState<Record<string, number[]>>({
    'BAKHTAR Adam': [101],
  });

  const assignTp = (studentNames: string[], tpId: number) => {
    setAssignedTps(prev => {
      const newAssignedTps = { ...prev };
      studentNames.forEach(studentName => {
        const studentTps = newAssignedTps[studentName] || [];
        if (!studentTps.includes(tpId)) {
          newAssignedTps[studentName] = [...studentTps, tpId];
        }
      });
      return newAssignedTps;
    });
  };

  return (
    <AssignmentsContext.Provider value={{ assignedTps, assignTp }}>
      {children}
    </AssignmentsContext.Provider>
  );
};

export const useAssignments = () => {
  const context = useContext(AssignmentsContext);
  if (context === undefined) {
    throw new Error('useAssignments must be used within an AssignmentsProvider');
  }
  return context;
};
