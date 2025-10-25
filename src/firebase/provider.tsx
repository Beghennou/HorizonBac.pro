
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, doc, setDoc, writeBatch, DocumentData, collection, deleteDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { useToast } from '@/hooks/use-toast';
import { TP, initialTps } from '@/lib/data-manager';
import { Student } from '@/lib/types';
import { FirestorePermissionError } from './errors';
import { errorEmitter } from './error-emitter';
import { useCollection, useDoc, useMemoFirebase } from '@/firebase';
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
  
  classes: DocumentData[];
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

  const [tps, setTps] = useState<Record<number, TP>>({});
  const [teacherName, setTeacherNameState] = useState<string>('');
  const { user } = userAuthState;
  
  // Fetch TPs from Firestore
  useEffect(() => {
    if (!firestore) return;

    const fetchTps = async () => {
        const allTpsMap = new Map<number, TP>();
        
        // Start with the local TPs
        Object.values(initialTps).forEach(tp => allTpsMap.set(tp.id, tp));
        
        const tpsRef = collection(firestore, 'tps');
        
        try {
            const publicTpsSnapshot = await getDocs(query(tpsRef, where('id', '<', 1000)));
            publicTpsSnapshot.forEach(doc => {
                allTpsMap.set(doc.data().id, doc.data() as TP);
            });

            if (user && !user.isAnonymous) {
                const userTpsSnapshot = await getDocs(query(tpsRef, where('author', '==', user.uid)));
                userTpsSnapshot.forEach(doc => {
                    allTpsMap.set(doc.data().id, doc.data() as TP);
                });
            }
        } catch (error) {
            console.error("Failed to fetch TPs:", error);
        } finally {
            setTps(Object.fromEntries(allTpsMap));
        }
    };

    fetchTps();
  }, [firestore, user]);


  const { data: classes, isLoading: isClassesLoading } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'classes') : null, [firestore]));
  const { data: configData, isLoading: isConfigLoading } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'config') : null, [firestore]));
  
  const assignedTpsQuery = useMemoFirebase(() => {
    if (firestore && user && !user.isAnonymous) {
      return collection(firestore, 'assignedTps');
    }
    return null;
  }, [firestore, user]);

  const { data: assignedTpsData, isLoading: isAssignedTpsLoading } = useCollection(assignedTpsQuery);
  
  const evaluationsQuery = useMemoFirebase(() => {
    if (firestore && user && !user.isAnonymous) {
        return collection(firestore, 'evaluations');
    }
    return null;
  }, [firestore, user]);

  const { data: evaluationsData, isLoading: isEvaluationsLoading } = useCollection(evaluationsQuery);
  
  const assignedTps = useMemo(() => {
    if (!assignedTpsData) return {};
    return Object.fromEntries(assignedTpsData.map(doc => [doc.id, doc.tps || []]));
  }, [assignedTpsData]);
  
  const evaluations = useMemo(() => {
     if (!evaluationsData) return {};
     return Object.fromEntries(evaluationsData.map(doc => [doc.id, doc.competences]));
  }, [evaluationsData]);

  useEffect(() => {
    if (configData) {
        const teacherConfig = configData.find(d => d.id === 'teacher');
        setTeacherNameState(teacherConfig?.name || 'M. Dubois');
    }
  }, [configData]);

  const isLoaded = !userAuthState.isUserLoading && !isClassesLoading && !isConfigLoading;

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
    classes: classes || [],
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
        deleteClassFromDb(firestore, className);
        toast({ title: "Classe supprimée", description: `La classe ${className} a été vidée.` });
    },
    updateClassWithCsv: (className: string, studentNames: string[]) => {
        if (!firestore) return;
        updateClassWithStudents(firestore, className, studentNames);
        toast({ title: "Importation réussie", description: `La classe ${className} a été mise à jour.` });
    },
    resetAllStudentLists: async () => {
        if (!firestore || !classes) return;
        await resetAllStudentListsInClasses(firestore, classes);
        toast({ title: "Listes réinitialisées", description: `Toutes les listes d'élèves ont été vidées.` });
    },
    addTp: (newTp: TP) => {
      if (!firestore || !user) return;
      const tpWithAuthor = { ...newTp, author: user.uid };
      addCustomTp(firestore, tpWithAuthor);
      setTps(prev => ({...prev, [newTp.id]: tpWithAuthor}));
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
