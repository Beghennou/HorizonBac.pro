
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, collection, doc, setDoc, getDocs, writeBatch, deleteDoc } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { useToast } from '@/hooks/use-toast';
import { TP, initialStudents, initialClasses, getTpById, getTpsByNiveau, Niveau } from '@/lib/data-manager';
import { Student } from '@/lib/types';

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


interface FirebaseProviderProps {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  firestore: Firestore;
  auth: Auth;
}

// Internal state for user authentication
interface UserAuthState {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

// Combined state for the Firebase context
export interface FirebaseContextState {
  // Core services
  firebaseApp: FirebaseApp | null;
  firestore: Firestore | null;
  auth: Auth | null;

  // User authentication state
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
  
  // App Data
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
}

// React Context
export const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

/**
 * FirebaseProvider manages and provides Firebase services and user authentication state.
 */
export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  firebaseApp,
  firestore,
  auth,
}) => {
  const { toast } = useToast();
  const [userAuthState, setUserAuthState] = useState<UserAuthState>({
    user: null,
    isUserLoading: true,
    userError: null,
  });

  // App Data State - We keep local state for rapid UI updates
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [classes, setClasses] = useState<Record<string, string[]>>(initialClasses);
  const [assignedTps, setAssignedTps] = useState<Record<string, AssignedTp[]>>({});
  const [evaluations, setEvaluations] = useState<Record<string, Record<string, EvaluationStatus[]>>>({});
  const [prelimAnswers, setPrelimAnswers] = useState<Record<string, Record<number, Record<number, PrelimAnswer>>>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, Record<number, Feedback>>>({});
  const [storedEvals, setStoredEvals] = useState<Record<string, Record<number, StoredEvaluation>>>({});
  const [tps, setTps] = useState<Record<number, TP>>(getTpById(-1, true) as Record<number, TP>);
  const [teacherName, setTeacherNameState] = useState<string>('M. Dubois');

  // isLoaded now only depends on auth state.
  const isLoaded = !userAuthState.isUserLoading;

  // Auth state listener
  useEffect(() => {
    if (!auth) {
      setUserAuthState({ user: null, isUserLoading: false, userError: new Error("Auth service not provided.") });
      return;
    }
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
        if (!firebaseUser) {
          signInAnonymously(auth).catch((error) => {
            console.error("Anonymous sign-in failed:", error);
            setUserAuthState({ user: null, isUserLoading: false, userError: error });
          });
        }
      },
      (error) => {
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );
    return () => unsubscribe();
  }, [auth]);

  const assignTp = useCallback(async (studentNames: string[], tpId: number) => {
    setAssignedTps(prev => {
        const newState = { ...prev };
        studentNames.forEach(name => {
            if (!newState[name]) newState[name] = [];
            if (!newState[name].some(tp => tp.id === tpId)) {
                newState[name].push({ id: tpId, status: 'non-commencé' });
            }
        });
        return newState;
    });
  }, []);

  const saveEvaluation = useCallback(async (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote?: string, tpNote?: string, isFinal?: boolean) => {
      if (!studentName || !tpId) return;

      const evalDate = new Date().toLocaleDateString('fr-FR');
      
      // Update local state for immediate UI feedback
      setStoredEvals(prev => ({
          ...prev,
          [studentName]: {
              ...prev[studentName],
              [tpId]: {
                  date: evalDate,
                  prelimNote,
                  tpNote,
                  competences: currentEvals,
                  isFinal
              }
          }
      }));

      setEvaluations(prev => {
        const newEvals = { ...prev };
        if (!newEvals[studentName]) newEvals[studentName] = {};

        Object.entries(currentEvals).forEach(([competenceId, status]) => {
            if (!newEvals[studentName][competenceId]) newEvals[studentName][competenceId] = [];
            newEvals[studentName][competenceId].push(status);
        });
        return newEvals;
      });

      toast({
          title: isFinal ? "Évaluation finalisée" : "Brouillon sauvegardé",
          description: `L'évaluation pour le TP ${tpId} a été enregistrée.`,
      });
  }, [toast]);


  const updateTpStatus = useCallback(async (studentName: string, tpId: number, status: TpStatus) => {
    setAssignedTps(prev => {
        const studentTps = prev[studentName]?.map(tp => 
            tp.id === tpId ? { ...tp, status } : tp
        );
        return { ...prev, [studentName]: studentTps };
    });
  }, []);

  const savePrelimAnswer = useCallback((studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => {
    setPrelimAnswers(prev => ({
        ...prev,
        [studentName]: {
            ...prev[studentName],
            [tpId]: {
                ...prev[studentName]?.[tpId],
                [questionIndex]: answer
            }
        }
    }));
  }, []);

  const saveFeedback = useCallback((studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => {
      setFeedbacks(prev => ({
          ...prev,
          [studentName]: {
              ...prev[studentName],
              [tpId]: {
                  ...prev[studentName]?.[tpId],
                  [author]: feedback
              }
          }
      }));
  }, []);
  
  const setTeacherName = useCallback((name: string) => {
      setTeacherNameState(name);
  }, []);

  const deleteStudent = useCallback((studentNameToDelete: string) => {
      setStudents(prev => prev.filter(s => s.name !== studentNameToDelete));
      setClasses(prev => {
          const newClasses = { ...prev };
          for (const key in newClasses) {
              newClasses[key] = newClasses[key].filter(s => s !== studentNameToDelete);
          }
          return newClasses;
      });
      // Also clean up other states
      setAssignedTps(prev => { const s = {...prev}; delete s[studentNameToDelete]; return s; });
      setEvaluations(prev => { const s = {...prev}; delete s[studentNameToDelete]; return s; });
      setPrelimAnswers(prev => { const s = {...prev}; delete s[studentNameToDelete]; return s; });
      setFeedbacks(prev => { const s = {...prev}; delete s[studentNameToDelete]; return s; });
      setStoredEvals(prev => { const s = {...prev}; delete s[studentNameToDelete]; return s; });
      toast({ title: "Élève supprimé", description: `${studentNameToDelete} a été supprimé.` });
  }, [toast]);

  const deleteClass = useCallback((classNameToDelete: string) => {
      const studentsInClass = classes[classNameToDelete] || [];
      studentsInClass.forEach(studentName => deleteStudent(studentName));
      setClasses(prev => {
          const newClasses = { ...prev };
          delete newClasses[classNameToDelete];
          return newClasses;
      });
      toast({ title: "Classe supprimée", description: `La classe ${classNameToDelete} et ses élèves ont été supprimés.` });
  }, [classes, deleteStudent, toast]);

  const updateClassWithCsv = useCallback((className: string, studentNames: string[]) => {
      const newStudents: Student[] = [];
      const existingStudents = new Set(students.map(s => s.name));

      studentNames.forEach(name => {
          if (!existingStudents.has(name)) {
              newStudents.push({
                  id: `student-${Date.now()}-${Math.random()}`,
                  name: name,
                  email: `${name.toLowerCase().replace(/\s/g, '.')}@school.com`,
                  progress: 0,
                  xp: 0
              });
          }
      });

      if (newStudents.length > 0) {
          setStudents(prev => [...prev, ...newStudents]);
      }

      setClasses(prev => ({ ...prev, [className]: studentNames }));

      toast({
          title: "Classe mise à jour",
          description: `${studentNames.length} élèves assignés à la classe ${className}. ${newStudents.length} nouveaux élèves créés.`
      });
  }, [students, toast]);

  const addTp = useCallback((newTp: TP) => {
      setTps(prev => ({ ...prev, [newTp.id]: newTp }));
  }, []);

  const contextValue = useMemo((): FirebaseContextState => ({
    firebaseApp,
    firestore,
    auth,
    user: userAuthState.user,
    isUserLoading: userAuthState.isUserLoading,
    userError: userAuthState.userError,
    students,
    setStudents,
    classes,
    setClasses,
    assignedTps,
    evaluations,
    prelimAnswers,
    feedbacks,
    storedEvals,
    tps,
    isLoaded,
    teacherName,
    assignTp,
    saveEvaluation,
    updateTpStatus,
    savePrelimAnswer,
    saveFeedback,
    setTeacherName,
    deleteStudent,
    deleteClass,
    updateClassWithCsv,
    addTp,
  }), [
      firebaseApp, firestore, auth, userAuthState,
      students, classes, assignedTps, evaluations, prelimAnswers,
      feedbacks, storedEvals, tps, isLoaded, teacherName,
      assignTp, saveEvaluation, updateTpStatus, savePrelimAnswer,
      saveFeedback, setTeacherName, deleteStudent, deleteClass,
      updateClassWithCsv, addTp
  ]);

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextState => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider.');
  }
  return context;
};

export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  if (!auth) throw new Error("Auth service not available");
  return auth;
};

export const useFirestore = (): Firestore => {
  const { firestore } = useFirebase();
  if (!firestore) throw new Error("Firestore service not available");
  return firestore;
};

export const useFirebaseApp = (): FirebaseApp => {
  const { firebaseApp } = useFirebase();
  if (!firebaseApp) throw new Error("Firebase App not available");
  return firebaseApp;
};

type MemoFirebase <T> = T & {__memo?: boolean};

export function useMemoFirebase<T>(factory: () => T, deps: React.DependencyList): T | (MemoFirebase<T>) {
  const memoized = useMemo(factory, deps);
  
  if(typeof memoized !== 'object' || memoized === null) return memoized;
  (memoized as MemoFirebase<T>).__memo = true;
  
  return memoized;
}

export const useUser = () => {
    const { user, isUserLoading, userError } = useFirebase();
    return { user, isUserLoading, userError };
}
