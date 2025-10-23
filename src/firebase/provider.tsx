
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, doc, setDoc, writeBatch, DocumentData } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { useToast } from '@/hooks/use-toast';
import { TP, initialTps } from '@/lib/data-manager';
import { Student } from '@/lib/types';
import { FirestorePermissionError } from './errors';
import { errorEmitter } from './error-emitter';

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
  deleteStudent: (student: Student, currentClassName: string) => void;
  deleteClass: (className: string) => void;
  updateClassWithCsv: (className: string, studentNames: string[]) => void;
  addTp: (tp: TP) => void;
  signInWithGoogle: () => Promise<void>;
  isLoaded: boolean;
  tps: Record<number, TP>;
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
  const [teacherName, setTeacherNameState] = useState<string>('M. Dubois');
  const isLoaded = !userAuthState.isUserLoading;

  // Auth state listener
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
            // No user, but we are not handling anonymous sign-in globally anymore
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
      // onAuthStateChanged will handle the user state update
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion Google",
        description: "Impossible de se connecter avec Google. Veuillez réessayer.",
      });
    }
  }, [auth, toast]);

  const assignTp = useCallback(async (studentNames: string[], tpId: number) => {
    if (!firestore) return;
    
    const batch = writeBatch(firestore);

    studentNames.forEach(studentName => {
        const tpDocRef = doc(firestore, `assignedTps/${studentName}/tps/${tpId}`);
        batch.set(tpDocRef, { status: 'non-commencé' });
    });

    await batch.commit().catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: 'batch assignTp',
            operation: 'write',
        }));
    });

  }, [firestore]);

  const saveEvaluation = useCallback(async (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote?: string, tpNote?: string, isFinal?: boolean) => {
      if (!studentName || !tpId || !firestore) return;

      const evalDate = new Date().toLocaleDateString('fr-FR');
      
      const newStoredEval: StoredEvaluation = {
          date: evalDate,
          prelimNote,
          tpNote,
          competences: currentEvals,
          isFinal
      };
      
      const studentStoredEvalsDocRef = doc(firestore, `storedEvals/${studentName}/evals/${tpId}`);
      setDoc(studentStoredEvalsDocRef, newStoredEval).catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: studentStoredEvalsDocRef.path,
              operation: 'write',
              requestResourceData: newStoredEval,
          }))
      });

      const batch = writeBatch(firestore);
       Object.entries(currentEvals).forEach(([competenceId, status]) => {
          const competenceDocRef = doc(firestore, `evaluations/${studentName}/competences/${competenceId}`);
          // This should be an arrayUnion, but for simplicity let's overwrite/merge
          batch.set(competenceDocRef, { history: [status] }, { merge: true });
       });
       
      await batch.commit().catch(error => {
           errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: `evaluations/${studentName}/competences`,
              operation: 'write',
          }))
      });


      toast({
          title: isFinal ? "Évaluation finalisée" : "Brouillon sauvegardé",
          description: `L'évaluation pour le TP ${tpId} a été enregistrée.`,
      });
  }, [firestore, toast]);


  const updateTpStatus = useCallback(async (studentName: string, tpId: number, status: TpStatus) => {
    if (!firestore || !studentName) return;

    const tpDocRef = doc(firestore, `assignedTps/${studentName}/tps/${tpId}`);
    setDoc(tpDocRef, { status: status }, { merge: true }).catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: tpDocRef.path,
            operation: 'update',
            requestResourceData: { status }
        }));
    });
  }, [firestore]);

  const savePrelimAnswer = useCallback((studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => {
      if(!firestore || !studentName) return;
      const prelimDocRef = doc(firestore, `prelimAnswers/${studentName}/answers/${tpId}`);
      const payload = { [questionIndex]: answer };
      setDoc(prelimDocRef, payload, { merge: true }).catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: prelimDocRef.path,
              operation: 'update',
              requestResourceData: payload,
          }));
      });
  }, [firestore]);

  const saveFeedback = useCallback((studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => {
      if(!firestore || !studentName) return;
        const feedbackDocRef = doc(firestore, `feedbacks/${studentName}/tps/${tpId}`);
        const payload = { [author]: feedback };
        setDoc(feedbackDocRef, payload, { merge: true }).catch(error => {
             errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: feedbackDocRef.path,
                operation: 'update',
                requestResourceData: payload,
            }));
        });
  }, [firestore]);
  
  const setTeacherName = useCallback((name: string) => {
      if(!firestore) return;
      setTeacherNameState(name);
      const configDoc = doc(firestore, 'config', 'teacher');
      setDoc(configDoc, { name }, { merge: true }).catch(error => {
           errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: configDoc.path,
                operation: 'update',
                requestResourceData: { name },
            }));
      });
  }, [firestore]);

  const deleteStudent = useCallback(async (student: Student, currentClassName: string) => {
      if(!firestore || !student) return;
      
      const batch = writeBatch(firestore);
      
      // Delete student document
      batch.delete(doc(firestore, 'students', student.id));
      
      await batch.commit().catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: `batch delete for student ${student.name}`,
            operation: 'delete',
        }));
      });
      toast({ title: "Élève supprimé", description: `${student.name} et toutes ses données ont été supprimés.` });
  }, [firestore, toast]);

  const deleteClass = useCallback(async (className: string) => {
      if (!firestore || !className) return;
      const classDocRef = doc(firestore, 'classes', className);
      
      await writeBatch(firestore).delete(classDocRef).commit().catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: classDocRef.path,
              operation: 'delete',
          }));
      });

      toast({ title: "Classe supprimée", description: `La classe ${className} a été supprimée.` });
  }, [firestore, toast]);

  const updateClassWithCsv = useCallback(async (className: string, studentNames: string[]) => {
      if(!firestore) return;
      
      const classDocRef = doc(firestore, 'classes', className);
      setDoc(classDocRef, { studentNames }).catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: classDocRef.path,
              operation: 'write',
              requestResourceData: { studentNames }
          }));
      });

      toast({
          title: "Classe mise à jour",
          description: `${studentNames.length} élèves assignés à la classe ${className}.`
      });
  }, [firestore, toast]);

  const addTp = useCallback((newTp: TP) => {
      if(!firestore) return;
      setTps(prev => ({ ...prev, [newTp.id]: newTp }));
      const tpDoc = doc(firestore, 'tps', newTp.id.toString());
      setDoc(tpDoc, newTp, {}).catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: tpDoc.path,
              operation: 'create',
              requestResourceData: newTp,
          }));
      });
  }, [firestore]);

  const contextValue = useMemo((): FirebaseContextState => ({
    firebaseApp,
    firestore,
    auth,
    user: userAuthState.user,
    isUserLoading: userAuthState.isUserLoading,
    userError: userAuthState.userError,
    isLoaded,
    teacherName,
    tps,
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
    signInWithGoogle,
  }), [
      firebaseApp, firestore, auth, userAuthState,
      isLoaded, teacherName, tps,
      assignTp, saveEvaluation, updateTpStatus, savePrelimAnswer,
      saveFeedback, setTeacherName, deleteStudent, deleteClass,
      updateClassWithCsv, addTp, signInWithGoogle
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

    