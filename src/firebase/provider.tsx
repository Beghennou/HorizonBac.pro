
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { useToast } from '@/hooks/use-toast';
import { TP, initialStudents, initialClasses, getTpById } from '@/lib/data-manager';
import { Student } from '@/lib/types';
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

  // App Data State
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Record<string, string[]>>({});
  const [assignedTps, setAssignedTps] = useState<Record<string, AssignedTp[]>>({});
  const [evaluations, setEvaluations] = useState<Record<string, Record<string, EvaluationStatus[]>>>({});
  const [prelimAnswers, setPrelimAnswers] = useState<Record<string, Record<number, Record<number, PrelimAnswer>>>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, Record<number, Feedback>>>({});
  const [storedEvals, setStoredEvals] = useState<Record<string, Record<number, StoredEvaluation>>>({});
  const [tps, setTps] = useState<Record<number, TP>>({});
  const [teacherName, setTeacherNameState] = useState<string>('M. Dubois');
  const [isLoaded, setIsLoaded] = useState(false);

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

  // Data loading logic
  const loadAllData = useCallback(async (db: Firestore) => {
    if (!db) return;
    setIsLoaded(false);
    try {
        const collectionsToFetch = ['students', 'classes', 'tps', 'assignedTps', 'evaluations', 'prelimAnswers', 'feedbacks', 'storedEvals', 'config'];
        
        const snapshots = await Promise.all(collectionsToFetch.map(colName => 
            getDocs(collection(db, colName)).catch(serverError => {
                const contextualError = new FirestorePermissionError({
                    operation: 'list',
                    path: colName,
                });
                errorEmitter.emit('permission-error', contextualError);
                throw contextualError;
            })
        ));

        const [studentsSnapshot, classesSnapshot, tpsSnapshot, assignedTpsSnapshot, evalsSnapshot, prelimsSnapshot, feedbacksSnapshot, storedEvalsSnapshot, configSnapshot] = snapshots;

        let loadedStudents: Student[];
        if (studentsSnapshot.empty) {
            // This part for initial setup is commented out as it requires write permissions
            // which might not be available initially. Data should be pre-seeded.
            loadedStudents = initialStudents;
        } else {
            loadedStudents = studentsSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Student));
        }
        
        let loadedClasses: Record<string, string[]>;
        if(classesSnapshot.empty) {
            loadedClasses = initialClasses;
        } else {
            loadedClasses = Object.fromEntries(classesSnapshot.docs.map(d => [d.id, d.data().studentNames]));
        }

        const dataReducer = (snapshot: QuerySnapshot<DocumentData>) => Object.fromEntries(snapshot.docs.map(d => [d.id, d.data()]));
        
        setStudents(loadedStudents);
        setClasses(loadedClasses);
        setAssignedTps(dataReducer(assignedTpsSnapshot));
        setEvaluations(dataReducer(evalsSnapshot));
        setPrelimAnswers(dataReducer(prelimsSnapshot));
        setFeedbacks(dataReducer(feedbacksSnapshot));
        setStoredEvals(dataReducer(storedEvalsSnapshot));
        
        const customTpsData = dataReducer(tpsSnapshot);
        const allTps = { ...getTpById(-1, true) as Record<number, TP>, ...customTpsData };
        setTps(allTps);
        
        const teacherNameDoc = configSnapshot.docs.find(d => d.id === 'teacher');
        if (teacherNameDoc) {
            setTeacherNameState(teacherNameDoc.data().name);
        }

    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Erreur de chargement des données",
            description: error.message || "Impossible de lire les données depuis la base de données.",
        });
    } finally {
        setIsLoaded(true);
    }
  }, [toast]);

  // Effect to trigger data loading
  useEffect(() => {
    // Only load data if we have a firestore instance and auth check is complete.
    if (firestore && !userAuthState.isUserLoading) {
      loadAllData(firestore);
    }
  }, [firestore, userAuthState.isUserLoading, loadAllData]);


  // Placeholder functions for data modification
  const assignTp = useCallback(async (studentNames: string[], tpId: number) => { console.log('assignTp not implemented'); }, []);
  const saveEvaluation = useCallback(async (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote?: string, tpNote?: string, isFinal?: boolean) => { console.log('saveEvaluation not implemented'); }, []);
  const updateTpStatus = useCallback(async (studentName: string, tpId: number, status: TpStatus) => { console.log('updateTpStatus not implemented'); }, []);
  const savePrelimAnswer = useCallback(async (studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => { console.log('savePrelimAnswer not implemented'); }, []);
  const saveFeedback = useCallback(async (studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => { console.log('saveFeedback not implemented'); }, []);
  const setTeacherName = useCallback(async (name: string) => { setTeacherNameState(name); }, []);
  const deleteStudent = useCallback(async (studentName: string) => { console.log('deleteStudent not implemented'); }, []);
  const deleteClass = useCallback(async (className: string) => { console.log('deleteClass not implemented'); }, []);
  const updateClassWithCsv = useCallback(async (className: string, studentNames: string[]) => { console.log('updateClassWithCsv not implemented'); }, []);
  const addTp = useCallback(async (tp: TP) => { console.log('addTp not implemented'); }, []);


  const contextValue = useMemo((): FirebaseContextState => ({
    // Services
    firebaseApp,
    firestore,
    auth,
    // Auth State
    user: userAuthState.user,
    isUserLoading: userAuthState.isUserLoading,
    userError: userAuthState.userError,
    // App Data
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
    // Functions
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

// Re-exporting useAssignments for backward compatibility during refactor
export const useAssignments = useFirebase;

/** Hook to access Firebase Auth instance. */
export const useAuth = (): Auth => {
  const { auth } = useFirebase();
  if (!auth) throw new Error("Auth service not available");
  return auth;
};

/** Hook to access Firestore instance. */
export const useFirestore = (): Firestore => {
  const { firestore } = useFirebase();
  if (!firestore) throw new Error("Firestore service not available");
  return firestore;
};

/** Hook to access Firebase App instance. */
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
