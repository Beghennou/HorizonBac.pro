'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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
  teacherName: string;
  setTeacherName: React.Dispatch<React.SetStateAction<string>>;
};

const AssignmentsContext = createContext<AssignmentsContextType | undefined>(undefined);

export const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(() => {
    if (typeof window !== 'undefined') {
      const savedStudents = localStorage.getItem('students');
      return savedStudents ? JSON.parse(savedStudents) : initialStudents;
    }
    return initialStudents;
  });

  const [classes, setClasses] = useState<Record<string, string[]>>(() => {
    if (typeof window !== 'undefined') {
      const savedClasses = localStorage.getItem('classes');
      return savedClasses ? JSON.parse(savedClasses) : initialClasses;
    }
    return initialClasses;
  });

  const [assignedTps, setAssignedTps] = useState<Record<string, number[]>>(() => {
    if (typeof window !== 'undefined') {
      const savedAssignedTps = localStorage.getItem('assignedTps');
      return savedAssignedTps ? JSON.parse(savedAssignedTps) : {
        'BAKHTAR Adam': [101, 102],
        'BELKAID Rayan': [101],
      };
    }
    return {
      'BAKHTAR Adam': [101, 102],
      'BELKAID Rayan': [101],
    };
  });

  const [evaluations, setEvaluations] = useState<Record<string, Record<string, EvaluationStatus>>>(() => {
    if (typeof window !== 'undefined') {
      const savedEvaluations = localStorage.getItem('evaluations');
      return savedEvaluations ? JSON.parse(savedEvaluations) : {};
    }
    return {};
  });

  const [teacherName, setTeacherName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedTeacherName = localStorage.getItem('teacherName');
      return savedTeacherName ? JSON.parse(savedTeacherName) : 'M. Dubois';
    }
    return 'M. Dubois';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('students', JSON.stringify(students));
      localStorage.setItem('classes', JSON.stringify(classes));
      localStorage.setItem('assignedTps', JSON.stringify(assignedTps));
      localStorage.setItem('evaluations', JSON.stringify(evaluations));
      localStorage.setItem('teacherName', JSON.stringify(teacherName));
    }
  }, [students, classes, assignedTps, evaluations, teacherName]);

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

        // Recalculer le total des XP et la progression à partir de *toutes* les évaluations enregistrées pour cet élève
        const allStudentEvaluations = { ...(evaluations[studentName] || {}), ...currentEvals };
        
        let totalXp = 0;
        for (const competenceId in allStudentEvaluations) {
            const level = allStudentEvaluations[competenceId];
            totalXp += xpPerLevel[level] || 0;
        }

        const allCompetencesCount = Object.values(allBlocs).reduce((acc, bloc) => acc + Object.keys(bloc.items).length, 0);
        // Calcule le XP maximum possible en se basant sur le fait que toutes les compétences sont maîtrisées
        const maxPossibleXp = allCompetencesCount * xpPerLevel['M'];
        const progressPercentage = maxPossibleXp > 0 ? Math.round((totalXp / maxPossibleXp) * 100) : 0;

        const updatedStudent: Student = { ...studentToUpdate, xp: totalXp, progress: progressPercentage };
        
        return prevStudents.map(s => s.name === studentName ? updatedStudent : s);
    });
  };

  return (
    <AssignmentsContext.Provider value={{ students, setStudents, classes, setClasses, assignedTps, evaluations, assignTp, saveEvaluation, teacherName, setTeacherName }}>
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
