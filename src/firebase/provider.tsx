
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, doc, setDoc, writeBatch, DocumentData, collection, deleteDoc, getDoc } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { useToast } from '@/hooks/use-toast';
import { TP, initialTps, classNames as staticClasses } from '@/lib/data-manager';
import { Student } from '@/lib/types';
import { FirestorePermissionError } from './errors';
import { errorEmitter } from './error-emitter';
import { useCollection, useMemoFirebase } from '@/firebase';
import { 
    assignTpToStudents, 
    saveStudentEvaluation,
    updateStudentTpStatus,
    saveStudentPrelimAnswer,
    saveStudentFeedback,
    setTeacherName as setTeacherNameInDb,
    deleteStudent as deleteStudentFromDb,
    deleteClass as deleteClassFromDb,
    updateClassWithStudents,
    addCustomTp,
    resetAllStudentListsInClasses
} from './firestore-actions';


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
  
  assignTp: (studentNames: string[], tpId: number) => void;
  saveEvaluation: (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote?: string, tpNote?: string, isFinal?: boolean) => void;
  updateTpStatus: (studentName: string, tpId: number, status: TpStatus) => void;
  savePrelimAnswer: (studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => void;
  saveFeedback: (studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => void;
  teacherName: string;
  setTeacherName: (name: string) => void;
  deleteStudent: (studentId: string, studentName: string) => void;
  deleteClass: (className: string) => void;
  updateClassWithCsv: (className: string, studentNames: string[]) => void;
  resetAllStudentLists: () => void;
  addTp: (tp: TP) => void;
  signInWithGoogle: () => Promise<void>;
  isLoaded: boolean;
  
  classes: string[]; // This will now come from local data
  tps: Record<number, TP>;
  assignedTps: Record<string, AssignedTp[]>;
  evaluations: Record<string, Record<string, EvaluationStatus[]>>;
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

  const [tps, setTps] = useState<Record<number, TP>>(initialTps);
  const [teacherName, setTeacherNameState] = useState<string>('');

  const { data: dynamicTps, isLoading: isTpsLoading } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'tps') : null, [firestore]));
  const { data: configData, isLoading: isConfigLoading } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'config') : null, [firestore]));
  const { data: assignedTpsData, isLoading: isAssignedTpsLoading } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'assignedTps') : null, [firestore]));
  const { data: evaluationsData, isLoading: isEvaluationsLoading } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'evaluations') : null, [firestore]));
  
  const assignedTps = useMemo(() => {
    if (!assignedTpsData) return {};
    return Object.fromEntries(assignedTpsData.map(doc => [doc.id, doc.tps]));
  }, [assignedTpsData]);
  
  const evaluations = useMemo(() => {
     if (!evaluationsData) return {};
     return Object.fromEntries(evaluationsData.map(doc => [doc.id, doc.competences]));
  }, [evaluationsData]);

  useEffect(() => {
    if (dynamicTps) {
        const tpsFromDb = Object.fromEntries(dynamicTps.map(tp => [tp.id, tp]));
        setTps(prevTps => ({ ...initialTps, ...tpsFromDb }));
    }
  }, [dynamicTps]);

  useEffect(() => {
    if (configData) {
        const teacherConfig = configData.find(d => d.id === 'teacher');
        setTeacherNameState(teacherConfig?.name || 'M. Dubois');
    }
  }, [configData]);

  // Classes data is now local, so we don't fetch it. The 'isClassesLoading' is removed.
  const isLoaded = !userAuthState.isUserLoading && !isTpsLoading && !isConfigLoading && !isAssignedTpsLoading && !isEvaluationsLoading;

  useEffect(() => {
    if (!auth) {
      setUserAuthState({ user: null, isUserLoading: false, userError: new Error("Firebase Auth service not provided.") });
      return;
    }
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
        } else {
            signInAnonymously(auth).catch((error) => {
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

  const signInWithGoogle = useCallback(async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion Google",
        description: "Impossible de se connecter avec Google. Veuillez réessayer.",
      });
    }
  }, [auth, toast]);
  
  const setTeacherName = useCallback((name: string) => {
    if(!firestore) return;
    setTeacherNameState(name);
    setTeacherNameInDb(firestore, name);
  }, [firestore]);


  const contextValue = {
    firebaseApp,
    firestore,
    auth,
    user: userAuthState.user,
    isUserLoading: userAuthState.isUserLoading,
    userError: userAuthState.userError,
    isLoaded,
    teacherName,
    classes: staticClasses, // Using local data
    tps,
    assignedTps,
    evaluations,
    assignTp: (studentNames: string[], tpId: number) => {
      if (!firestore) return;
      assignTpToStudents(firestore, studentNames, tpId, assignedTps);
      toast({
          title: "TP Assigné",
          description: `Le TP #${tpId} a été assigné à ${studentNames.length} élève(s).`,
      });
    },
    saveEvaluation: (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote?: string, tpNote?: string, isFinal?: boolean) => {
      if (!firestore) return;
      saveStudentEvaluation(firestore, studentName, tpId, currentEvals, evaluations, prelimNote, tpNote, isFinal);
      toast({
          title: isFinal ? "Évaluation finalisée" : "Brouillon sauvegardé",
          description: `L'évaluation pour le TP ${tpId} a été enregistrée.`,
      });
    },
    updateTpStatus: (studentName: string, tpId: number, status: TpStatus) => {
      if (!firestore) return;
      const studentAssignedTps = assignedTps[studentName] || [];
      updateStudentTpStatus(firestore, studentName, tpId, status, studentAssignedTps);
    },
    savePrelimAnswer: (studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => {
      if (!firestore) return;
      saveStudentPrelimAnswer(firestore, studentName, tpId, questionIndex, answer);
    },
    saveFeedback: (studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => {
      if (!firestore) return;
      const allFeedbacks = {}; // This is a simplification. In a real app this would be fetched.
      saveStudentFeedback(firestore, studentName, tpId, feedback, author, allFeedbacks);
    },
    setTeacherName,
    deleteStudent: (studentId: string, studentName: string) => {
        if (!firestore) return;
        deleteStudentFromDb(firestore, studentId, studentName);
        toast({ title: "Élève supprimé", description: `${studentName} et toutes ses données ont été supprimés.` });
    },
    deleteClass: (className: string) => {
      if (!firestore) return;
      // This function would now just be a local state update if we remove DB persistence for class lists
      console.warn("deleteClass from DB is not aligned with hardcoded lists.");
    },
    updateClassWithCsv: (className: string, studentNames: string[]) => {
       console.warn("updateClassWithCsv to DB is not aligned with hardcoded lists.");
    },
    resetAllStudentLists: async () => {
        console.warn("resetAllStudentLists from DB is not aligned with hardcoded lists.");
    },
    addTp: (newTp: TP) => {
      if (!firestore) return;
      addCustomTp(firestore, newTp);
      setTps(prev => ({...prev, [newTp.id]: newTp}));
    },
    signInWithGoogle,
  };

  return (
    <FirebaseContext.Provider value={contextValue as FirebaseContextState}>
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

export const useUser = () => {
    const { user, isUserLoading, userError } = useFirebase();
    return { user, isUserLoading, userError };
}
