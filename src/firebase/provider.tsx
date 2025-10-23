
'use client';

import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback } from 'react';
import { FirebaseApp } from 'firebase/app';
import { Firestore, collection, doc, setDoc, getDocs, writeBatch, deleteDoc } from 'firebase/firestore';
import { Auth, User, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { useToast } from '@/hooks/use-toast';
import { TP, initialStudents, initialClasses, getTpById } from '@/lib/data-manager';
import { Student } from '@/lib/types';
import { setDocumentNonBlocking } from './non-blocking-updates';

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
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const isLoaded = !userAuthState.isUserLoading && isDataLoaded;

  const loadAllData = useCallback(async (db: Firestore) => {
    const collectionsToFetch = ['students', 'classes', 'assignedTps', 'evaluations', 'prelimAnswers', 'feedbacks', 'storedEvals', 'tps', 'config'];
    try {
        const snapshots = await Promise.all(collectionsToFetch.map(colName => getDocs(collection(db, colName))));

        const data: Record<string, any> = {};
        snapshots.forEach((snapshot, index) => {
            const colName = collectionsToFetch[index];
            if (['students', 'tps'].includes(colName)) {
                data[colName] = snapshot.docs.map(d => ({...d.data(), id: d.id }));
            } else {
                const colData: Record<string, any> = {};
                snapshot.docs.forEach(doc => {
                    colData[doc.id] = doc.data();
                });
                data[colName] = colData;
            }
        });
        
        if (data.students && data.students.length > 0) setStudents(data.students.sort((a: Student,b: Student) => a.name.localeCompare(b.name)));
        if (data.classes && Object.keys(data.classes).length > 0) setClasses(data.classes);
        if (data.assignedTps && Object.keys(data.assignedTps).length > 0) setAssignedTps(data.assignedTps);
        if (data.evaluations && Object.keys(data.evaluations).length > 0) setEvaluations(data.evaluations);
        if (data.prelimAnswers && Object.keys(data.prelimAnswers).length > 0) setPrelimAnswers(data.prelimAnswers);
        if (data.feedbacks && Object.keys(data.feedbacks).length > 0) setFeedbacks(data.feedbacks);
        if (data.storedEvals && Object.keys(data.storedEvals).length > 0) setStoredEvals(data.storedEvals);

        const allTps = getTpById(-1, true) as Record<number, TP>;
        if (data.tps && data.tps.length > 0) {
            data.tps.forEach((tp: TP) => {
                allTps[tp.id] = tp;
            });
        }
        setTps(allTps);
        
        if (data.config && data.config.teacher) setTeacherNameState(data.config.teacher.name);

        setIsDataLoaded(true);

    } catch (error: any) {
        console.error("Error loading initial data:", error);
         if (error.code === 'permission-denied') {
            const contextualError = new FirestorePermissionError({
                operation: 'list',
                path: 'initial collections',
            });
            throw contextualError;
        }
    }
  }, []);

  // Auth state listener & data loader
  useEffect(() => {
    if (!auth || !firestore) {
      setUserAuthState({ user: null, isUserLoading: false, userError: new Error("Firebase services not provided.") });
      return;
    }
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        setUserAuthState({ user: firebaseUser, isUserLoading: false, userError: null });
        if (firebaseUser) {
          if (!isDataLoaded) {
            await loadAllData(firestore);
          }
        } else {
            try {
                await signInAnonymously(auth);
            } catch (error) {
                 console.error("Anonymous sign-in failed:", error);
                 setUserAuthState({ user: null, isUserLoading: false, userError: error as Error });
            }
        }
      },
      (error) => {
        console.error("FirebaseProvider: onAuthStateChanged error:", error);
        setUserAuthState({ user: null, isUserLoading: false, userError: error });
      }
    );
    return () => unsubscribe();
  }, [auth, firestore, isDataLoaded, loadAllData]);

  const assignTp = useCallback(async (studentNames: string[], tpId: number) => {
    if (!firestore) return;
    const batch = writeBatch(firestore);
    
    const newAssignedTpsState = { ...assignedTps };
    studentNames.forEach(name => {
        if (!newAssignedTpsState[name]) newAssignedTpsState[name] = [];
        if (!newAssignedTpsState[name].some(tp => tp.id === tpId)) {
            newAssignedTpsState[name].push({ id: tpId, status: 'non-commencé' });
        }
    });

    setAssignedTps(newAssignedTpsState);
    
    // Save to Firestore
    Object.entries(newAssignedTpsState).forEach(([studentName, tps]) => {
      const studentTpDoc = doc(firestore, 'assignedTps', studentName);
      batch.set(studentTpDoc, { tps });
    });
    
    await batch.commit();

  }, [firestore, assignedTps]);

  const saveEvaluation = useCallback(async (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote?: string, tpNote?: string, isFinal?: boolean) => {
      if (!studentName || !tpId || !firestore) return;

      const evalDate = new Date().toLocaleDateString('fr-FR');
      
      // Update local state for immediate UI feedback
      const newStoredEval: StoredEvaluation = {
          date: evalDate,
          prelimNote,
          tpNote,
          competences: currentEvals,
          isFinal
      };
      setStoredEvals(prev => ({
          ...prev,
          [studentName]: { ...prev[studentName], [tpId]: newStoredEval }
      }));

      const newEvaluationsState = { ...evaluations };
      if (!newEvaluationsState[studentName]) newEvaluationsState[studentName] = {};
      Object.entries(currentEvals).forEach(([competenceId, status]) => {
          if (!newEvaluationsState[studentName][competenceId]) newEvaluationsState[studentName][competenceId] = [];
          newEvaluationsState[studentName][competenceId].push(status);
      });
      setEvaluations(newEvaluationsState);

      // Save to Firestore
      const studentStoredEvalsDoc = doc(firestore, 'storedEvals', studentName);
      setDocumentNonBlocking(studentStoredEvalsDoc, { [tpId]: newStoredEval }, { merge: true });

      const studentEvalsDoc = doc(firestore, 'evaluations', studentName);
      setDocumentNonBlocking(studentEvalsDoc, newEvaluationsState[studentName], { merge: true });


      toast({
          title: isFinal ? "Évaluation finalisée" : "Brouillon sauvegardé",
          description: `L'évaluation pour le TP ${tpId} a été enregistrée.`,
      });
  }, [firestore, evaluations, toast]);


  const updateTpStatus = useCallback(async (studentName: string, tpId: number, status: TpStatus) => {
    if (!firestore) return;

    setAssignedTps(prev => {
        const studentTps = prev[studentName]?.map(tp => 
            tp.id === tpId ? { ...tp, status } : tp
        ) || [];

        const studentTpDoc = doc(firestore, 'assignedTps', studentName);
        setDocumentNonBlocking(studentTpDoc, { tps: studentTps }, { merge: true });

        return { ...prev, [studentName]: studentTps };
    });
  }, [firestore]);

  const savePrelimAnswer = useCallback((studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => {
    if(!firestore) return;
    setPrelimAnswers(prev => {
      const updatedAnswers = {
        ...prev,
        [studentName]: {
            ...prev[studentName],
            [tpId]: {
                ...prev[studentName]?.[tpId],
                [questionIndex]: answer
            }
        }
      };
      
      const prelimDoc = doc(firestore, 'prelimAnswers', studentName);
      setDocumentNonBlocking(prelimDoc, { [tpId]: updatedAnswers[studentName][tpId] }, { merge: true });

      return updatedAnswers;
    });
  }, [firestore]);

  const saveFeedback = useCallback((studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => {
      if(!firestore) return;
      setFeedbacks(prev => {
          const updatedFeedbacks = {
            ...prev,
            [studentName]: {
                ...prev[studentName],
                [tpId]: {
                    ...prev[studentName]?.[tpId],
                    [author]: feedback
                }
            }
          };

          const feedbackDoc = doc(firestore, 'feedbacks', studentName);
          setDocumentNonBlocking(feedbackDoc, { [tpId]: updatedFeedbacks[studentName][tpId] }, { merge: true });
          
          return updatedFeedbacks;
      });
  }, [firestore]);
  
  const setTeacherName = useCallback((name: string) => {
      if(!firestore) return;
      setTeacherNameState(name);
      const configDoc = doc(firestore, 'config', 'teacher');
      setDocumentNonBlocking(configDoc, { name }, { merge: true });
  }, [firestore]);

  const deleteStudent = useCallback(async (studentNameToDelete: string) => {
      if(!firestore) return;
      const student = students.find(s => s.name === studentNameToDelete);
      if (!student) return;

      const batch = writeBatch(firestore);

      // Remove from classes
      const newClasses = { ...classes };
      for (const key in newClasses) {
          newClasses[key] = newClasses[key].filter(s => s !== studentNameToDelete);
          const classDoc = doc(firestore, 'classes', key);
          batch.set(classDoc, { studentNames: newClasses[key] });
      }
      setClasses(newClasses);

      // Remove student doc
      const studentDoc = doc(firestore, 'students', student.id);
      batch.delete(studentDoc);
      setStudents(prev => prev.filter(s => s.name !== studentNameToDelete));
      
      // Delete associated data
      batch.delete(doc(firestore, 'assignedTps', studentNameToDelete));
      batch.delete(doc(firestore, 'evaluations', studentNameToDelete));
      batch.delete(doc(firestore, 'prelimAnswers', studentNameToDelete));
      batch.delete(doc(firestore, 'feedbacks', studentNameToDelete));
      batch.delete(doc(firestore, 'storedEvals', studentNameToDelete));
      
      setAssignedTps(prev => { const s = {...prev}; delete s[studentNameToDelete]; return s; });
      setEvaluations(prev => { const s = {...prev}; delete s[studentNameToDelete]; return s; });
      setPrelimAnswers(prev => { const s = {...prev}; delete s[studentNameToDelete]; return s; });
      setFeedbacks(prev => { const s = {...prev}; delete s[studentNameToDelete]; return s; });
      setStoredEvals(prev => { const s = {...prev}; delete s[studentNameToDelete]; return s; });

      await batch.commit();
      toast({ title: "Élève supprimé", description: `${studentNameToDelete} et toutes ses données ont été supprimés du cloud.` });
  }, [firestore, students, classes, toast]);

  const deleteClass = useCallback(async (classNameToDelete: string) => {
      if (!firestore) return;
      const studentsInClass = classes[classNameToDelete] || [];
      
      const batch = writeBatch(firestore);

      // Delete students from this class if they are not in any other class
      const allOtherStudents = new Set(Object.entries(classes).filter(([cn]) => cn !== classNameToDelete).flatMap(([,s]) => s));
      const studentsToDelete = studentsInClass.filter(sName => !allOtherStudents.has(sName));
      
      studentsToDelete.forEach(studentName => {
        const student = students.find(s => s.name === studentName);
        if (student) {
          batch.delete(doc(firestore, 'students', student.id));
          batch.delete(doc(firestore, 'assignedTps', studentName));
          batch.delete(doc(firestore, 'evaluations', studentName));
          batch.delete(doc(firestore, 'prelimAnswers', studentName));
          batch.delete(doc(firestore, 'feedbacks', studentName));
          batch.delete(doc(firestore, 'storedEvals', studentName));
        }
      });
      setStudents(prev => prev.filter(s => !studentsToDelete.includes(s.name)));

      // Delete class doc
      batch.delete(doc(firestore, 'classes', classNameToDelete));
      const newClasses = { ...classes };
      delete newClasses[classNameToDelete];
      setClasses(newClasses);

      await batch.commit();
      toast({ title: "Classe supprimée", description: `La classe ${classNameToDelete} et ses élèves exclusifs ont été supprimés.` });
  }, [firestore, classes, students, toast]);

  const updateClassWithCsv = useCallback(async (className: string, studentNames: string[]) => {
      if(!firestore) return;
      
      const batch = writeBatch(firestore);
      const newStudents: Student[] = [];
      const currentStudents = [...students];

      studentNames.forEach(name => {
          if (!currentStudents.some(s => s.name === name)) {
              const newStudent: Student = {
                  id: `student-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                  name: name,
                  email: `${name.toLowerCase().replace(/\s/g, '.')}@school.com`,
                  progress: 0,
                  xp: 0
              };
              newStudents.push(newStudent);
              const studentDoc = doc(firestore, 'students', newStudent.id);
              batch.set(studentDoc, newStudent);
          }
      });

      if (newStudents.length > 0) {
          setStudents(prev => [...prev, ...newStudents]);
      }
      setClasses(prev => ({ ...prev, [className]: studentNames }));

      const classDoc = doc(firestore, 'classes', className);
      batch.set(classDoc, { studentNames });

      await batch.commit();

      toast({
          title: "Classe mise à jour",
          description: `${studentNames.length} élèves assignés à la classe ${className}. ${newStudents.length} nouveaux élèves créés.`
      });
  }, [firestore, students, toast]);

  const addTp = useCallback((newTp: TP) => {
      if(!firestore) return;
      setTps(prev => ({ ...prev, [newTp.id]: newTp }));
      const tpDoc = doc(firestore, 'tps', newTp.id.toString());
      setDocumentNonBlocking(tpDoc, newTp);
  }, [firestore]);

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
