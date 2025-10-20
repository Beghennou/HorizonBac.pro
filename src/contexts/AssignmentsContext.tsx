'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { students as initialStudents } from '@/lib/mock-data';
import { classes as initialClasses } from '@/lib/data-manager';
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
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  classes: Record<string, string[]>;
  setClasses: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  assignedTps: Record<string, number[]>;
  evaluations: Record<string, Record<string, EvaluationStatus>>;
  assignTp: (studentNames: string[], tpId: number) => void;
  saveEvaluation: (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>) => void;
};

const AssignmentsContext = createContext<AssignmentsContextType | undefined>(undefined);

export const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [classes, setClasses] = useState<Record<string, string[]>>(initialClasses);
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
    setEvaluations(prev => ({
      ...prev,
      [studentName]: {
        ...(prev[studentName] || {}),
        ...currentEvals
      }
    }));

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
    <AssignmentsContext.Provider value={{ students, setStudents, classes, setClasses, assignedTps, evaluations, assignTp, saveEvaluation }}>
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
