
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Firestore, collection, doc, getDocs, writeBatch, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { TP, initialStudents, initialClasses, getTpById } from '@/lib/data-manager';
import { Student } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useUser } from '@/firebase/provider';
import { FirestorePermissionError } from '@/firebase/errors';
import { errorEmitter } from '@/firebase/error-emitter';

// Types definition
type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';
export type TpStatus = 'non-commencé' | 'en-cours' | 'terminé';

type AssignedTp = {
  id: number;
  status: TpStatus;
};

const xpPerLevel: Record<EvaluationStatus, number> = {
  NA: 0,
  EC: 2,
  A: 5,
  M: 10,
};

type PrelimAnswer = string | string[];

type Feedback = {
  student?: string;
  teacher?: string;
}

type StoredEvaluation = {
  date: string;
  prelimNote?: string;
  tpNote?: string;
  competences: Record<string, EvaluationStatus>;
  isFinal?: boolean;
}

export type AssignmentsContextType = {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  classes: Record<string, string[]>;
  setClasses: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  assignedTps: Record<string, AssignedTp[]>;
  evaluations: Record<string, Record<string, EvaluationStatus[]>>;
  prelimAnswers: Record<string, Record<number, Record<number, PrelimAnswer>>>;
  feedbacks: Record<string, Record<number, Feedback>>;
  storedEvals: Record<string, Record<number, StoredEvaluation>>;
  tps: Record<number, TP>;
  assignTp: (studentNames: string[], tpId: number) => void;
  saveEvaluation: (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote?: string, tpNote?: string, isFinal?: boolean) => void;
  updateTpStatus: (studentName: string, tpId: number, status: TpStatus) => void;
  savePrelimAnswer: (studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => void;
  saveFeedback: (studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => void;
  teacherName: string;
  setTeacherName: (name: string) => void;
  deleteStudent: (studentName: string) => void;
  deleteClass: (className: string) => void;
  updateClassWithCsv: (className: string, studentNames: string[]) => void;
  addTp: (tp: TP) => void;
  isLoaded: boolean;
};

export const AssignmentsContext = createContext<AssignmentsContextType | undefined>(undefined);

export const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const db = useFirestore();
  const { toast } = useToast();

  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Record<string, string[]>>({});
  const [assignedTps, setAssignedTps] = useState<Record<string, AssignedTp[]>>({});
  const [evaluations, setEvaluations] = useState<Record<string, Record<string, EvaluationStatus[]>>>({});
  const [prelimAnswers, setPrelimAnswers] = useState<Record<string, Record<number, Record<number, PrelimAnswer>>>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, Record<number, Feedback>>>({});
  const [storedEvals, setStoredEvals] = useState<Record<string, Record<number, StoredEvaluation>>>({});
  const [tps, setTps] = useState<Record<number, TP>>(() => getTpById(-1, true) as Record<number, TP>);
  const [teacherName, setTeacherName] = useState<string>('M. Dubois');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This effect calculates student progress based on evaluations
    if (!isLoaded || students.length === 0) return;

    const { allBlocs } = require('@/lib/data-manager');
    const allCompetencesCount = Object.values(allBlocs).reduce((acc: number, bloc: any) => acc + Object.keys(bloc.items).length, 0);
    const maxPossibleXp = allCompetencesCount * xpPerLevel['M'];

    const updatedStudents = students.map(student => {
        const studentEvaluations = evaluations[student.name] || {};
        let totalXp = 0;
        for (const competenceId in studentEvaluations) {
            const history = studentEvaluations[competenceId];
            if (Array.isArray(history) && history.length > 0) {
                const latestStatus = history[history.length - 1];
                totalXp += xpPerLevel[latestStatus] || 0;
            }
        }
        const progressPercentage = maxPossibleXp > 0 ? Math.round((totalXp / maxPossibleXp) * 100) : 0;
        
        return { ...student, xp: totalXp, progress: progressPercentage };
    });
    
    if (JSON.stringify(students) !== JSON.stringify(updatedStudents)) {
        setStudents(updatedStudents);
    }
  }, [evaluations, students, isLoaded]);

  // Dummy functions for context, real logic is now in FirebaseProvider
  const placeholderFunc = () => console.warn("Function not implemented in this context");

  return (
    <AssignmentsContext.Provider value={{ 
        students, setStudents, classes, setClasses, assignedTps, evaluations, prelimAnswers, feedbacks, storedEvals, tps, isLoaded,
        teacherName, setTeacherName: placeholderFunc, addTp: placeholderFunc, assignTp: placeholderFunc, deleteClass: placeholderFunc,
        updateClassWithCsv: placeholderFunc, saveEvaluation: placeholderFunc, updateTpStatus: placeholderFunc, savePrelimAnswer: placeholderFunc,
        saveFeedback: placeholderFunc, deleteStudent: placeholderFunc
    }}>
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
