
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, doc, setDoc, writeBatch, DocumentData, collection, deleteDoc, getDoc, query, where, getDocs, addDoc } from 'firebase/firestore';
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
    setTeacherNameInDb as setTeacherNameInDbAction,
    deleteStudent as deleteStudentFromDb,
    emptyClass as emptyClassInDb,
    updateClassWithStudents,
    addCustomTp,
    resetAllStudentListsInClasses,
    createClassInDb,
    deleteClassFromDb,
    addTeacherInDb,
    deleteTeacherFromDb,
    updateStudentData,
} from './firestore-actions';
import { checkAndSeedData } from './seed-data';


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
  saveEvaluation: (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote: string, tpNote: string, isFinal: boolean) => void;
  updateTpStatus: (studentName: string, tpId: number, status: TpStatus) => void;
  savePrelimAnswer: (studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => void;
  saveFeedback: (studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => void;
  teacherName: string;
  setTeacherName: (name: string) => void;
  teachers: DocumentData[];
  addTeacher: (name: string) => Promise<void>;
  deleteTeacher: (teacherId: string) => void;
  customSignOut: () => void;
  deleteStudent: (studentId: string, studentName: string) => void;
  emptyClass: (className: string) => void;
  updateClassWithCsv: (className: string, studentNames: string[]) => void;
  resetAllStudentLists: () => void;
  addTp: (tp: TP) => void;
  createClass: (className: string) => void;
  deleteClass: (className: string) => void;
  signInWithGoogle: () => Promise<void>;
  updateStudentData: (studentName: string, data: DocumentData) => void;
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

  const [tps, setTps] = useState<Record<number, TP>>(initialTps);
  const [teacherName, setTeacherNameState] = useState<string>('');
  const { user } = userAuthState;
  
  const { data: dynamicTps, isLoading: isTpsLoading } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'tps') : null, [firestore]));
  const { data: classes, isLoading: isClassesLoading } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'classes') : null, [firestore]));
  const { data: teachers, isLoading: isTeachersLoading } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'teachers') : null, [firestore]));
  
  const assignedTpsQuery = useMemoFirebase(() => firestore ? collection(firestore, 'assignedTps') : null, [firestore]);
  const { data: assignedTpsData, isLoading: isAssignedTpsLoading } = useCollection(assignedTpsQuery);

  const evaluationsQuery = useMemoFirebase(() => (firestore && user && !user.isAnonymous) ? collection(firestore, 'evaluations') : null, [firestore, user]);
  const { data: evaluationsData, isLoading: isEvaluationsLoading } = useCollection(evaluationsQuery);
  
  
  useEffect(() => {
    if (firestore) {
        checkAndSeedData(firestore);
    }
  }, [firestore]);


  useEffect(() => {
    const allTpsMap: Record<number, TP> = { ...initialTps };
    if (dynamicTps) {
      dynamicTps.forEach(tpDoc => {
        allTpsMap[tpDoc.id] = tpDoc as TP;
      });
    }
    setTps(allTpsMap);
  }, [dynamicTps]);

  
  const assignedTps = useMemo(() => {
    if (!assignedTpsData) return {};
    return Object.fromEntries(assignedTpsData.map(doc => [doc.id, doc.tps || []]));
  }, [assignedTpsData]);
  
  const evaluations = useMemo(() => {
     if (!evaluationsData) return {};
     return Object.fromEntries(evaluationsData.map(doc => [doc.id, doc.competences]));
  }, [evaluationsData]);

  useEffect(() => {
    // This logic is now handled by the select teacher page
    // The teacherName is set via setTeacherName from that page
    const storedTeacher = sessionStorage.getItem('teacherName');
    if (storedTeacher) {
      setTeacherNameState(storedTeacher);
    }
  }, []);

  const isLoaded = !userAuthState.isUserLoading && !isClassesLoading && !isTeachersLoading && !isTpsLoading && !isAssignedTpsLoading && (!user || user.isAnonymous || !isEvaluationsLoading);

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
            // For this app, we don't auto-sign-in anonymously at the provider level
            // Login will be handled by dedicated pages.
            setUserAuthState({ user: null, isUserLoading: false, userError: null });
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
    sessionStorage.setItem('teacherName', name);
  }, [firestore]);

  const addTeacher = useCallback(async (name: string) => {
    if (!firestore) return;
    await addTeacherInDb(firestore, name);
  }, [firestore]);
  
  const deleteTeacher = useCallback(async (teacherId: string) => {
    if (!firestore) return;
    await deleteTeacherFromDb(firestore, teacherId);
    toast({ variant: 'destructive', title: 'Enseignant supprimé', description: `Le profil a été supprimé.` });
  }, [firestore, toast]);
  
  const customSignOut = useCallback(() => {
    sessionStorage.removeItem('teacherName');
    setTeacherNameState('');
    if(auth) {
      auth.signOut();
    }
  }, [auth]);


  const contextValue = {
    firebaseApp,
    firestore,
    auth,
    user: userAuthState.user,
    isUserLoading: userAuthState.isUserLoading,
    userError: userAuthState.userError,
    isLoaded,
    teacherName,
    setTeacherName,
    teachers: teachers || [],
    addTeacher,
    deleteTeacher,
    customSignOut,
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
    saveEvaluation: (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote: string, tpNote: string, isFinal: boolean) => {
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
    deleteStudent: (studentId: string, studentName: string) => {
        if (!firestore) return;
        deleteStudentFromDb(firestore, studentId, studentName);
        toast({ title: "Élève supprimé", description: `${studentName} et toutes ses données ont été supprimés.` });
    },
    emptyClass: (className: string) => {
        if (!firestore) return;
        emptyClassInDb(firestore, className);
        toast({ title: "Classe vidée", description: `La classe ${className} a été vidée de ses élèves.` });
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
      // Storing the teacher's name instead of UID for simplicity
      const tpWithAuthor = { ...newTp, author: teacherName };
      addCustomTp(firestore, tpWithAuthor);
      setTps(prev => ({...prev, [newTp.id]: tpWithAuthor}));
    },
    createClass: (className: string) => {
      if (!firestore) return;
      createClassInDb(firestore, className);
      toast({ title: 'Classe Créée', description: `La classe "${className}" a été créée avec succès.` });
    },
    deleteClass: (className: string) => {
      if (!firestore) return;
      deleteClassFromDb(firestore, className);
      toast({ variant: 'destructive', title: 'Classe Supprimée', description: `La classe "${className}" a été supprimée.` });
    },
    signInWithGoogle,
    updateStudentData: (studentName: string, data: DocumentData) => {
      if (!firestore) return;
      updateStudentData(firestore, studentName, data);
    }
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

    
