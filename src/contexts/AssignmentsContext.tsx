
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Firestore, collection, doc, getDocs, writeBatch, setDoc, deleteDoc, getDoc, DocumentSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
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
  const { isUserLoading } = useUser();
  const { toast } = useToast();

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

  const loadAllData = useCallback(async (db: Firestore) => {
    setIsLoaded(false);
    try {
        const collectionsToFetch = ['students', 'classes', 'tps', 'assignedTps', 'evaluations', 'prelimAnswers', 'feedbacks', 'storedEvals', 'config'];
        
        const snapshots = await Promise.all(collectionsToFetch.map(colName => getDocs(collection(db, colName))));

        const [studentsSnapshot, classesSnapshot, tpsSnapshot, assignedTpsSnapshot, evalsSnapshot, prelimsSnapshot, feedbacksSnapshot, storedEvalsSnapshot, configSnapshot] = snapshots;

        let loadedStudents: Student[];
        if (studentsSnapshot.empty) {
            const batch = writeBatch(db);
            initialStudents.forEach(student => {
                const studentRef = doc(db, 'students', student.id);
                batch.set(studentRef, student);
            });
            await batch.commit();
            loadedStudents = initialStudents;
            toast({ title: "Données initialisées", description: "La base de données des élèves a été créée." });
        } else {
            loadedStudents = studentsSnapshot.docs.map(d => ({ id: d.id, ...d.data() } as Student));
        }
        
        let loadedClasses: Record<string, string[]>;
        if(classesSnapshot.empty) {
            const batch = writeBatch(db);
            Object.entries(initialClasses).forEach(([className, studentNames]) => {
                const classRef = doc(db, 'classes', className);
                batch.set(classRef, { studentNames });
            });
            await batch.commit();
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
            description: error.message || "Impossible de lire les données depuis la base de données. Vérifiez la console pour plus de détails.",
        });
    } finally {
        setIsLoaded(true);
    }
  }, [toast]);

  useEffect(() => {
    if (db && !isUserLoading) {
      loadAllData(db);
    }
  }, [db, isUserLoading, loadAllData]);

  useEffect(() => {
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

  const setTeacherName = useCallback(async (name: string) => {
    setTeacherNameState(name);
    try {
        await setDoc(doc(db, "config", "teacher"), { name });
    } catch(error) {
        console.error("Failed to save teacher name:", error);
    }
  }, [db]);

  const addTp = useCallback(async (tp: TP) => {
    setTps(prev => ({ ...prev, [tp.id]: tp }));
    try {
        await setDoc(doc(db, "tps", tp.id.toString()), tp);
    } catch(error) {
        console.error("Failed to add TP:", error);
    }
  }, [db]);
  
  const assignTp = useCallback(async (studentNames: string[], tpId: number) => {
    const updatedAssignedTps = { ...assignedTps };
    for (const name of studentNames) {
      const studentTps = updatedAssignedTps[name] || [];
      if (!studentTps.some(tp => tp.id === tpId)) {
        studentTps.push({ id: tpId, status: 'non-commencé' });
        updatedAssignedTps[name] = studentTps;
      }
    }
    setAssignedTps(updatedAssignedTps);
    try {
        const batch = writeBatch(db);
        for(const name of studentNames) {
            const studentRef = doc(db, 'assignedTps', name);
            batch.set(studentRef, { assignments: updatedAssignedTps[name] });
        }
        await batch.commit();
    } catch(error) {
        console.error("Failed to assign TP:", error);
    }
  }, [assignedTps, db]);

  const deleteStudent = useCallback(async (studentName: string) => {
    setStudents(prev => prev.filter(s => s.name !== studentName));
    setClasses(prev => {
        const newClasses = { ...prev };
        for(const c in newClasses) {
            newClasses[c] = newClasses[c].filter(s => s !== studentName);
        }
        return newClasses;
    });
    try {
        const studentToDelete = students.find(s => s.name === studentName);
        if(studentToDelete) {
          await deleteDoc(doc(db, 'students', studentToDelete.id));
        }
        // Also delete from other collections
        const collections = ['assignedTps', 'evaluations', 'prelimAnswers', 'feedbacks', 'storedEvals'];
        for(const col of collections) {
            await deleteDoc(doc(db, col, studentName));
        }
    } catch(error) {
        console.error("Failed to delete student:", error);
    }
  }, [db, students]);

  const deleteClass = useCallback(async (className: string) => {
    const studentNamesToDelete = classes[className] || [];
    setClasses(prev => {
        const newClasses = {...prev};
        delete newClasses[className];
        return newClasses;
    });
    setStudents(prev => prev.filter(s => !studentNamesToDelete.includes(s.name)));
    try {
        await deleteDoc(doc(db, 'classes', className));
        for(const name of studentNamesToDelete) {
            // Re-use deleteStudent logic to clean up all related data
            const studentToDelete = students.find(s => s.name === name);
             if(studentToDelete) {
                await deleteDoc(doc(db, 'students', studentToDelete.id));
            }
            const collections = ['assignedTps', 'evaluations', 'prelimAnswers', 'feedbacks', 'storedEvals'];
            for(const col of collections) {
                await deleteDoc(doc(db, col, name));
            }
        }
    } catch(error) {
        console.error("Failed to delete class:", error);
    }
  }, [classes, db, students]);

  const updateClassWithCsv = useCallback(async (className: string, studentNames: string[]) => {
      const newStudents: Student[] = [];
      const updatedStudentList = [...students];

      studentNames.forEach(name => {
          if (!students.some(s => s.name === name)) {
              const newStudent: Student = {
                id: `student-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                name: name,
                email: `${name.split(' ').join('.').toLowerCase()}@example.com`,
                progress: 0,
                xp: 0
              };
              newStudents.push(newStudent);
              updatedStudentList.push(newStudent);
          }
      });
      setStudents(updatedStudentList);
      setClasses(prev => ({...prev, [className]: studentNames}));

      try {
          const batch = writeBatch(db);
          newStudents.forEach(s => {
              const ref = doc(db, 'students', s.id);
              batch.set(ref, s);
          });
          const classRef = doc(db, 'classes', className);
          batch.set(classRef, {studentNames});
          await batch.commit();
      } catch(error) {
          console.error("Failed to update class with CSV", error);
      }

  }, [students, db]);

  const saveEvaluation = useCallback(async (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote?: string, tpNote?: string, isFinal?: boolean) => {
    setEvaluations(prev => {
      const newEvals = { ...prev };
      if (!newEvals[studentName]) newEvals[studentName] = {};
      for(const compId in currentEvals) {
        if (!newEvals[studentName][compId]) newEvals[studentName][compId] = [];
        newEvals[studentName][compId].push(currentEvals[compId]);
      }
      return newEvals;
    });

    const newStoredEval: StoredEvaluation = {
        date: new Date().toLocaleDateString('fr-FR'),
        prelimNote,
        tpNote,
        competences: currentEvals,
        isFinal
    };
    setStoredEvals(prev => ({
        ...prev,
        [studentName]: {
            ...prev[studentName],
            [tpId]: newStoredEval,
        }
    }));
    
    try {
      const evalRef = doc(db, "evaluations", studentName);
      const storedEvalRef = doc(db, 'storedEvals', studentName);
      const [evalDoc, storedEvalDoc] = await Promise.all([getDoc(evalRef), getDoc(storedEvalRef)]);
      const existingEvals = evalDoc.exists() ? evalDoc.data() : {};
      for(const compId in currentEvals) {
          if(!existingEvals[compId]) existingEvals[compId] = [];
          existingEvals[compId].push(currentEvals[compId]);
      }

      const existingStoredEvals = storedEvalDoc.exists() ? storedEvalDoc.data() : {};
      existingStoredEvals[tpId] = newStoredEval;
      
      const batch = writeBatch(db);
      batch.set(evalRef, existingEvals);
      batch.set(storedEvalRef, existingStoredEvals);
      await batch.commit();
      toast({ title: 'Évaluation sauvegardée', description: `Les compétences pour ${studentName} ont été mises à jour.` });

    } catch (error) {
        console.error("Failed to save evaluation", error);
    }
  }, [db, toast]);

  const updateTpStatus = useCallback(async (studentName: string, tpId: number, status: TpStatus) => {
    setAssignedTps(prev => {
        const studentTps = (prev[studentName] || []).map(tp => 
            tp.id === tpId ? { ...tp, status } : tp
        );
        return { ...prev, [studentName]: studentTps };
    });
    try {
        const studentRef = doc(db, 'assignedTps', studentName);
        const currentData = ((await getDoc(studentRef)).data() || {}) as { assignments?: AssignedTp[] };
        const updatedData = (currentData.assignments || []).map((tp: AssignedTp) => tp.id === tpId ? { ...tp, status } : tp);
        await setDoc(studentRef, { assignments: updatedData });
    } catch(error) {
        console.error("Failed to update TP status", error);
    }
  }, [db]);

  const savePrelimAnswer = useCallback(async (studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => {
    setPrelimAnswers(prev => {
        const studentAnswers = prev[studentName] || {};
        const tpAnswers = studentAnswers[tpId] || {};
        tpAnswers[questionIndex] = answer;
        return { ...prev, [studentName]: { ...studentAnswers, [tpId]: tpAnswers }};
    });
    try {
        const answerRef = doc(db, 'prelimAnswers', studentName);
        const existingAnswers = (await getDoc(answerRef)).data() || {};
        if(!existingAnswers[tpId]) existingAnswers[tpId] = {};
        existingAnswers[tpId][questionIndex] = answer;
        await setDoc(answerRef, existingAnswers);
    } catch (error) {
        console.error("Failed to save prelim answer:", error);
    }
  }, [db]);

  const saveFeedback = useCallback(async (studentName: string, tpId: number, feedbackText: string, author: 'student' | 'teacher') => {
    setFeedbacks(prev => {
        const studentFeedback = prev[studentName] || {};
        const tpFeedback = studentFeedback[tpId] || {};
        tpFeedback[author] = feedbackText;
        return { ...prev, [studentName]: { ...studentFeedback, [tpId]: tpFeedback }};
    });
     try {
        const feedbackRef = doc(db, 'feedbacks', studentName);
        const existingFeedbacks = ((await getDoc(feedbackRef)).data() || {}).data || {};
        if(!existingFeedbacks[tpId]) existingFeedbacks[tpId] = {};
        existingFeedbacks[tpId][author] = feedbackText;
        await setDoc(feedbackRef, { data: existingFeedbacks });
    } catch(error) {
        console.error("Failed to save feedback", error);
    }
  }, [db]);

  return (
    <AssignmentsContext.Provider value={{ 
        students, setStudents, classes, setClasses, assignedTps, evaluations, prelimAnswers, feedbacks, storedEvals, tps, isLoaded,
        teacherName, setTeacherName, addTp, assignTp, deleteClass,
        updateClassWithCsv, saveEvaluation, updateTpStatus, savePrelimAnswer,
        saveFeedback, deleteStudent
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
