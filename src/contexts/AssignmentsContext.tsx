'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { students as initialStudents } from '@/lib/mock-data';
import { Student } from '@/lib/types';
import { allBlocs } from '@/lib/data-manager';

type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';

const xpPerLevel: Record<EvaluationStatus, number> = {
  NA: 0,
  EC: 2,
  A: 5,
  M: 10,
};

type AssignmentsContextType = {
  students: Student[];
  assignedTps: Record<string, number[]>;
  evaluations: Record<string, Record<string, EvaluationStatus>>; // { [studentName]: { [competenceId]: status } }
  assignTp: (studentNames: string[], tpId: number) => void;
  saveEvaluation: (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>) => void;
};

const AssignmentsContext = createContext<AssignmentsContextType | undefined>(undefined);

export const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [assignedTps, setAssignedTps] = useState<Record<string, number[]>>({
    'BAKHTAR Adam': [101, 102],
    'BELKAID Rayan': [101],
  });
  const [evaluations, setEvaluations] = useState<Record<string, Record<string, EvaluationStatus>>>({});

  const assignTp = (studentNames: string[], tpId: number) => {
    setAssignedTps(prev => {
      const newAssignedTps = { ...prev };
      studentNames.forEach(studentName => {
        const studentTps = newAssignedTps[studentName] || [];
        if (!studentTps.includes(tpId)) {
          newAssignedTps[studentName] = [...studentTps, tpId].sort();
        }
      });
      return newAssignedTps;
    });
  };

  const saveEvaluation = (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>) => {
    // 1. Save the new evaluations for the student
    setEvaluations(prev => ({
      ...prev,
      [studentName]: {
        ...(prev[studentName] || {}),
        ...currentEvals
      }
    }));

    // 2. Calculate total XP for that student
    setStudents(prevStudents => {
      const studentToUpdate = prevStudents.find(s => s.name === studentName);
      if (!studentToUpdate) return prevStudents;

      const studentEvaluations = { ...(evaluations[studentName] || {}), ...currentEvals };
      
      let totalXp = 0;
      for (const competenceId in studentEvaluations) {
        const level = studentEvaluations[competenceId];
        totalXp += xpPerLevel[level] || 0;
      }
      
      const allCompetencesCount = Object.values(allBlocs).reduce((acc, bloc) => acc + Object.keys(bloc.items).length, 0);
      const maxPossibleXp = allCompetencesCount * xpPerLevel['M'];
      const progressPercentage = maxPossibleXp > 0 ? Math.round((totalXp / maxPossibleXp) * 100) : 0;
      
      const updatedStudent: Student = { ...studentToUpdate, progress: progressPercentage, xp: totalXp };

      return prevStudents.map(s => s.name === studentName ? updatedStudent : s);
    });
  };

  return (
    <AssignmentsContext.Provider value={{ students, assignedTps, evaluations, assignTp, saveEvaluation }}>
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
