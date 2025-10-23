
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, doc, setDoc, writeBatch, DocumentData, collection, deleteDoc } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, signInAnonymously, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { useToast } from '@/hooks/use-toast';
import { TP, initialTps } from '@/lib/data-manager';
import { Student } from '@/lib/types';
import { FirestorePermissionError } from './errors';
import { errorEmitter } from './error-emitter';
import { useCollection, useMemoFirebase } from '@/firebase';

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

  const [tps, setTps] = useState<Record<number, TP>>(initialTps);
  const [teacherName, setTeacherNameState] = useState<string>('');

  const { data: dynamicTps, isLoading: isTpsLoading } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'tps') : null, [firestore]));
  const { data: configData, isLoading: isConfigLoading } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'config') : null, [firestore]));
  const { data: classesData, isLoading: isClassesLoading } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'classes') : null, [firestore]));
  
  const classes = useMemo(() => classesData || [], [classesData]);

  useEffect(() => {
    if (dynamicTps) {
        const tpsData = Object.fromEntries(dynamicTps.map(tp => [tp.id, tp]));
        setTps(tpsData);
    }
  }, [dynamicTps]);

  useEffect(() => {
    if (configData) {
        const teacherConfig = configData.find(d => d.id === 'teacher');
        setTeacherNameState(teacherConfig?.name || 'M. Dubois');
    }
  }, [configData]);

  const isLoaded = !userAuthState.isUserLoading && !isTpsLoading && !isConfigLoading && !isClassesLoading;

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

  const assignTp = useCallback(async (studentNames: string[], tpId: number, allAssignedTps: Record<string, AssignedTp[]>) => {
    if (!firestore) return;
    
    const batch = writeBatch(firestore);

    studentNames.forEach(studentName => {
        const currentTps = allAssignedTps[studentName] || [];
        if (!currentTps.some(tp => tp.id === tpId)) {
            const newTps = [...currentTps, { id: tpId, status: 'non-commencé' as TpStatus }];
            const studentDocRef = doc(firestore, `assignedTps/${studentName}`);
            batch.set(studentDocRef, { tps: newTps });
        }
    });

    await batch.commit().catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: 'batch assignTp',
            operation: 'write',
        }));
    });

  }, [firestore]);
  
  const evaluations: Record<string, Record<string, EvaluationStatus[]>> = {};
  const assignedTps: Record<string, AssignedTp[]> = {};


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
      
      const studentStoredEvalsDocRef = doc(firestore, `students/${studentName}/storedEvals`, tpId.toString());
      setDoc(studentStoredEvalsDocRef, newStoredEval).catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: studentStoredEvalsDocRef.path,
              operation: 'write',
              requestResourceData: newStoredEval,
          }))
      });

      const batch = writeBatch(firestore);
      const studentEvalsDocRef = doc(firestore, `evaluations/${studentName}`);
      const updatedCompetences: Record<string, any> = { ...evaluations[studentName] };
       Object.entries(currentEvals).forEach(([competenceId, status]) => {
          const history = updatedCompetences[competenceId]?.history || [];
          updatedCompetences[competenceId] = { history: [...history, status] };
       });
       
      batch.set(studentEvalsDocRef, { competences: updatedCompetences });

      await batch.commit().catch(error => {
           errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: `evaluations/${studentName}`,
              operation: 'write',
          }))
      });

      toast({
          title: isFinal ? "Évaluation finalisée" : "Brouillon sauvegardé",
          description: `L'évaluation pour le TP ${tpId} a été enregistrée.`,
      });
  }, [firestore, toast, evaluations]);


  const updateTpStatus = useCallback(async (studentName: string, tpId: number, status: TpStatus) => {
    if (!firestore || !studentName) return;

    const studentDocRef = doc(firestore, `assignedTps/${studentName}`);
    const currentTps = assignedTps[studentName] || [];
    const tpIndex = currentTps.findIndex(tp => tp.id === tpId);
    
    if (tpIndex > -1) {
        const newTps = [...currentTps];
        newTps[tpIndex] = { ...newTps[tpIndex], status };
         setDoc(studentDocRef, { tps: newTps }).catch(error => {
            errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: studentDocRef.path,
                operation: 'update',
                requestResourceData: { tps: newTps }
            }));
        });
    }
  }, [firestore, assignedTps]);

  const savePrelimAnswer = useCallback((studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => {
      if(!firestore || !studentName) return;
      const prelimDocRef = doc(firestore, `students/${studentName}/prelimAnswers`, tpId.toString());
      
      const newAnswers = { [questionIndex]: answer };

      setDoc(prelimDocRef, { answers: newAnswers }, { merge: true }).catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: prelimDocRef.path,
              operation: 'update',
              requestResourceData: { answers: newAnswers },
          }));
      });
  }, [firestore]);

  const saveFeedback = useCallback((studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher', currentFeedbacks: Record<string, any>) => {
      if(!firestore || !studentName) return;
        const feedbackDocRef = doc(firestore, `students/${studentName}/feedbacks`, tpId.toString());
        const updatedFeedbacks = { ...currentFeedbacks, [author]: feedback };

        setDoc(feedbackDocRef, { tps: updatedFeedbacks }, { merge: true }).catch(error => {
             errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: feedbackDocRef.path,
                operation: 'update',
                requestResourceData: { tps: updatedFeedbacks },
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

  const deleteStudent = useCallback(async (studentId: string, studentName: string) => {
      if(!firestore || !studentId || !studentName) return;
      
      const batch = writeBatch(firestore);
      
      batch.delete(doc(firestore, 'students', studentId));
      batch.delete(doc(firestore, 'assignedTps', studentName));
      batch.delete(doc(firestore, 'evaluations', studentName));
      
      await batch.commit().catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: `batch delete for student ${studentName}`,
            operation: 'delete',
        }));
      });
      toast({ title: "Élève supprimé", description: `${studentName} et toutes ses données ont été supprimés.` });
  }, [firestore, toast]);

  const deleteClass = useCallback(async (className: string) => {
      if (!firestore || !className) return;

      const classDocRef = doc(firestore, 'classes', className);

      const batch = writeBatch(firestore);
      batch.delete(classDocRef);
      
      await batch.commit().catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: `classes/${className}`,
              operation: 'delete',
          }));
      });

      toast({ title: "Classe supprimée", description: `La classe ${className} a été supprimée.` });
  }, [firestore, toast]);

  const updateClassWithCsv = useCallback(async (className: string, studentNames: string[]) => {
      if(!firestore) return;
      
      const batch = writeBatch(firestore);
      const classDocRef = doc(firestore, 'classes', className);
      batch.set(classDocRef, { studentNames });

      await batch.commit().catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: 'batch update class with CSV',
              operation: 'write'
          }));
      });

      toast({
          title: "Classe mise à jour",
          description: `La classe ${className} a été mise à jour avec ${studentNames.length} élèves.`
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

  const contextValue = {
    firebaseApp,
    firestore,
    auth,
    user: userAuthState.user,
    isUserLoading: userAuthState.isUserLoading,
    userError: userAuthState.userError,
    isLoaded,
    teacherName,
    classes,
    tps,
    assignedTps,
    evaluations,
    assignTp: (studentNames: string[], tpId: number) => {
        assignTp(studentNames, tpId, assignedTps);
    },
    saveEvaluation,
    updateTpStatus: (studentName: string, tpId: number, status: TpStatus) => {
         updateTpStatus(studentName, tpId, status);
    },
    savePrelimAnswer,
    saveFeedback: (studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => {
        const feedbacksForStudent = feedbacksForStudent[studentName] || {};
        const feedbacksForTp = feedbacksForStudent[tpId] || {};
        saveFeedback(studentName, tpId, feedback, author, feedbacksForTp);
    },
    setTeacherName,
    deleteStudent,
    deleteClass,
    updateClassWithCsv,
    addTp,
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
