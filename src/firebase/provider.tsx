
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
import { useCollection, useMemoFirebase } from './firestore/use-collection';

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
  deleteStudent: (studentName: string) => void;
  deleteClass: (className: string) => void;
  updateClassWithCsv: (className: string, studentNames: string[]) => void;
  addTp: (tp: TP) => void;
  signInWithGoogle: () => Promise<void>;
  isLoaded: boolean;
  tps: Record<number, TP>;
  students: Student[];
  classes: Record<string, string[]>;
  assignedTps: Record<string, AssignedTp[]>;
  evaluations: Record<string, Record<string, EvaluationStatus[]>>;
  storedEvals: Record<string, Record<string, StoredEvaluation>>;
  prelimAnswers: Record<string, Record<number, Record<number, PrelimAnswer>>>;
  feedbacks: Record<string, Record<number, Feedback>>;
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

  // --- DATA LOADING ---
  const { data: tpsData } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'tps') : null, [firestore]));
  const { data: studentsData } = useCollection<Student>(useMemoFirebase(() => firestore ? collection(firestore, 'students') : null, [firestore]));
  const { data: classesData } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'classes') : null, [firestore]));
  const { data: assignedTpsData } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'assignedTps') : null, [firestore]));
  const { data: teacherNameData } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'config') : null, [firestore]));
  const { data: evalsData } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'evaluations') : null, [firestore]));
  const { data: storedEvalsData } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'storedEvals') : null, [firestore]));
  const { data: prelimAnswersData } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'prelimAnswers') : null, [firestore]));
  const { data: feedbacksData } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'feedbacks') : null, [firestore]));

  // --- STATE MANAGEMENT ---
  const [tps, setTps] = useState<Record<number, TP>>({});
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Record<string, string[]>>({});
  const [assignedTps, setAssignedTps] = useState<Record<string, AssignedTp[]>>({});
  const [evaluations, setEvaluations] = useState<Record<string, Record<string, EvaluationStatus[]>>>({});
  const [storedEvals, setStoredEvals] = useState<Record<string, Record<string, StoredEvaluation>>>({});
  const [prelimAnswers, setPrelimAnswers] = useState<Record<string, Record<number, Record<number, PrelimAnswer>>>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, Record<number, Feedback>>>({});
  const [teacherName, setTeacherNameState] = useState<string>('');

  const isLoaded = !userAuthState.isUserLoading;

  useEffect(() => setTps(tpsData ? Object.fromEntries(tpsData.map(tp => [tp.id, tp])) : initialTps), [tpsData]);
  useEffect(() => setStudents(studentsData || []), [studentsData]);
  useEffect(() => setClasses(classesData ? Object.fromEntries(classesData.map(c => [c.id, c.studentNames || []])) : {}), [classesData]);
  useEffect(() => setTeacherNameState(teacherNameData?.find(d => d.id === 'teacher')?.name || 'M. Dubois'), [teacherNameData]);
  
  // This is a placeholder for a more complex data structure loading
  useEffect(() => {
    if (assignedTpsData) {
        const data: Record<string, any> = {};
        assignedTpsData.forEach(doc => { data[doc.id] = doc.tps || []; });
        setAssignedTps(data);
    }
  }, [assignedTpsData]);
  
  useEffect(() => {
    if (evalsData) {
        const data: Record<string, any> = {};
        evalsData.forEach(doc => { data[doc.id] = doc.competences || {}; });
        setEvaluations(data);
    }
  }, [evalsData]);

  useEffect(() => {
    if (storedEvalsData) {
        const data: Record<string, any> = {};
        storedEvalsData.forEach(doc => { data[doc.id] = doc.evals || {}; });
        setStoredEvals(data);
    }
  }, [storedEvalsData]);

  useEffect(() => {
    if (prelimAnswersData) {
        const data: Record<string, any> = {};
        prelimAnswersData.forEach(doc => { data[doc.id] = doc.answers || {}; });
        setPrelimAnswers(data);
    }
  }, [prelimAnswersData]);
  
  useEffect(() => {
    if (feedbacksData) {
        const data: Record<string, any> = {};
        feedbacksData.forEach(doc => { data[doc.id] = doc.tps || {}; });
        setFeedbacks(data);
    }
  }, [feedbacksData]);



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
        const currentTps = assignedTps[studentName] || [];
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

  }, [firestore, assignedTps]);

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
      
      const studentStoredEvalsDocRef = doc(firestore, `storedEvals/${studentName}`);
      const updatedStoredEvals = { ...storedEvals[studentName], [tpId]: newStoredEval };
      setDoc(studentStoredEvalsDocRef, { evals: updatedStoredEvals }).catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: studentStoredEvalsDocRef.path,
              operation: 'write',
              requestResourceData: { evals: updatedStoredEvals },
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
  }, [firestore, toast, storedEvals, evaluations]);


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
      const prelimDocRef = doc(firestore, `prelimAnswers/${studentName}`);
      const updatedAnswers = { ...prelimAnswers[studentName], [tpId]: { ...(prelimAnswers[studentName]?.[tpId] || {}), [questionIndex]: answer } };

      setDoc(prelimDocRef, { answers: updatedAnswers }, { merge: true }).catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: prelimDocRef.path,
              operation: 'update',
              requestResourceData: { answers: updatedAnswers },
          }));
      });
  }, [firestore, prelimAnswers]);

  const saveFeedback = useCallback((studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => {
      if(!firestore || !studentName) return;
        const feedbackDocRef = doc(firestore, `feedbacks/${studentName}`);
        const updatedFeedbacks = { ...feedbacks[studentName], [tpId]: { ...(feedbacks[studentName]?.[tpId] || {}), [author]: feedback } };

        setDoc(feedbackDocRef, { tps: updatedFeedbacks }, { merge: true }).catch(error => {
             errorEmitter.emit('permission-error', new FirestorePermissionError({
                path: feedbackDocRef.path,
                operation: 'update',
                requestResourceData: { tps: updatedFeedbacks },
            }));
        });
  }, [firestore, feedbacks]);
  
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

  const deleteStudent = useCallback(async (studentName: string) => {
      if(!firestore || !studentName) return;
      
      const studentToDelete = students.find(s => s.name === studentName);
      if (!studentToDelete) return;

      const batch = writeBatch(firestore);
      
      batch.delete(doc(firestore, 'students', studentToDelete.id));
      batch.delete(doc(firestore, 'assignedTps', studentName));
      batch.delete(doc(firestore, 'evaluations', studentName));
      batch.delete(doc(firestore, 'storedEvals', studentName));
      batch.delete(doc(firestore, 'prelimAnswers', studentName));
      batch.delete(doc(firestore, 'feedbacks', studentName));
      
      await batch.commit().catch(error => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
            path: `batch delete for student ${studentName}`,
            operation: 'delete',
        }));
      });
      toast({ title: "Élève supprimé", description: `${studentName} et toutes ses données ont été supprimés.` });
  }, [firestore, toast, students]);

  const deleteClass = useCallback(async (className: string) => {
      if (!firestore || !className) return;
      
      const studentNames = classes[className] || [];
      const batch = writeBatch(firestore);

      batch.delete(doc(firestore, 'classes', className));

      studentNames.forEach(studentName => {
        const studentToDelete = students.find(s => s.name === studentName);
        if (studentToDelete) {
             batch.delete(doc(firestore, 'students', studentToDelete.id));
        }
      });
      
      await batch.commit().catch(error => {
          errorEmitter.emit('permission-error', new FirestorePermissionError({
              path: 'batch delete class',
              operation: 'delete',
          }));
      });

      toast({ title: "Classe supprimée", description: `La classe ${className} et ses élèves ont été supprimés.` });
  }, [firestore, toast, classes, students]);

  const updateClassWithCsv = useCallback(async (className: string, studentNames: string[]) => {
      if(!firestore) return;
      
      const batch = writeBatch(firestore);
      const classDocRef = doc(firestore, 'classes', className);
      batch.set(classDocRef, { studentNames });

      studentNames.forEach(name => {
          const existingStudent = students.find(s => s.name === name);
          if (!existingStudent) {
              const nameParts = name.split(' ');
              const lastName = nameParts[0] || '';
              const firstName = nameParts.slice(1).join(' ') || 'Prénom';
              const newStudentId = `student-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
              const studentDocRef = doc(firestore, 'students', newStudentId);
              batch.set(studentDocRef, { 
                id: newStudentId, 
                name, 
                email: `${firstName.toLowerCase().replace(' ','.')}.${lastName.toLowerCase()}@school.com`, 
                progress: 0, 
                xp: 0
              });
          }
      });
      
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
  }, [firestore, toast, students]);

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
    students,
    classes,
    assignedTps,
    evaluations,
    storedEvals,
    prelimAnswers,
    feedbacks,
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
      isLoaded, teacherName, tps, students, classes, assignedTps, evaluations, storedEvals, prelimAnswers, feedbacks,
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

export const useUser = () => {
    const { user, isUserLoading, userError } = useFirebase();
    return { user, isUserLoading, userError };
}
