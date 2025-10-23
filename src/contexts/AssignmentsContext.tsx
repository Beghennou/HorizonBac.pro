
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { useAuth, useFirestore } from '@/firebase/provider';
import { collection, doc, getDocs, writeBatch, query, where, getDoc, setDoc, deleteDoc, Firestore } from 'firebase/firestore';
import { TP, initialStudents, initialClasses, getTpById } from '@/lib/data-manager';
import { Student } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

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

type AssignmentsContextType = {
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

const AssignmentsContext = createContext<AssignmentsContextType | undefined>(undefined);

const collectionsToManage = ['students', 'classes', 'assignedTps', 'evaluations', 'prelimAnswers', 'feedbacks', 'storedEvals', 'tps', 'config'];

export const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const db = useFirestore();
  const { user } = useAuth();
  const { toast } = useToast();

  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Record<string, string[]>>({});
  const [assignedTps, setAssignedTps] = useState<Record<string, AssignedTp[]>>({});
  const [evaluations, setEvaluations] = useState<Record<string, Record<string, EvaluationStatus[]>>>({});
  const [prelimAnswers, setPrelimAnswers] = useState<Record<string, Record<number, Record<number, PrelimAnswer>>>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, Record<number, Feedback>>>({});
  const [storedEvals, setStoredEvals] = useState<Record<string, Record<number, StoredEvaluation>>>({});
  const [tps, setTps] = useState<Record<number, TP>>(() => getTpById(-1, true) as Record<number, TP>);
  const [teacherName, setTeacherName] = useState<string>('M. Dubois');
  const [isLoaded, setIsLoaded] = useState(false);

  const resetAndSeedDatabase = useCallback(async (db: Firestore) => {
    if (!db) return;
    toast({ title: "Initialisation de la base de données...", description: "Veuillez patienter." });

    try {
      const batch = writeBatch(db);

      // Seed students
      initialStudents.forEach(student => {
        const studentRef = doc(db, 'students', student.id);
        batch.set(studentRef, student);
      });

      // Seed classes
      Object.entries(initialClasses).forEach(([className, studentNames]) => {
        const classRef = doc(db, 'classes', className);
        batch.set(classRef, { studentNames });
      });

      // Ensure other collections exist by adding a placeholder doc
      for (const collName of collectionsToManage) {
        if (!['students', 'classes', 'config'].includes(collName)) {
           const placeholderRef = doc(db, collName, '_placeholder');
           batch.set(placeholderRef, { initialized: true });
        }
      }
      
      const configRef = doc(db, 'config', 'teacher');
      batch.set(configRef, { name: 'M. Dubois' });


      await batch.commit();
      toast({ title: "Base de données initialisée avec succès !" });
      return true;
    } catch (error: any) {
      console.error("Error seeding database: ", error);
      toast({ variant: 'destructive', title: "Erreur d'initialisation", description: error.message });
      return false;
    }
  }, [toast]);

  const loadAllData = useCallback(async (db: Firestore) => {
    if (!db) return;
    setIsLoaded(false);

    try {
      const studentsSnapshot = await getDocs(collection(db, 'students'));
      if (studentsSnapshot.empty) {
        const success = await resetAndSeedDatabase(db);
        if (success) {
           // Reload data after seeding
           loadAllData(db);
        } else {
            setIsLoaded(true);
        }
        return;
      }
      
      const studentsData = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Student));
      setStudents(studentsData);

      const classesSnapshot = await getDocs(collection(db, 'classes'));
      const classesData = Object.fromEntries(classesSnapshot.docs.map(doc => [doc.id, doc.data().studentNames]));
      setClasses(classesData);
      
      const collectionsPromises = [
        getDocs(collection(db, 'assignedTps')),
        getDocs(collection(db, 'evaluations')),
        getDocs(collection(db, 'prelimAnswers')),
        getDocs(collection(db, 'feedbacks')),
        getDocs(collection(db, 'storedEvals')),
        getDocs(collection(db, 'tps')),
      ];

      const [assignedTpsSnapshot, evalsSnapshot, prelimsSnapshot, feedbacksSnapshot, storedEvalsSnapshot, tpsSnapshot] = await Promise.all(collectionsPromises);
      
      setAssignedTps(Object.fromEntries(assignedTpsSnapshot.docs.filter(d=>d.id !== '_placeholder').map(d => [d.id, d.data().assigned])));
      setEvaluations(Object.fromEntries(evalsSnapshot.docs.filter(d=>d.id !== '_placeholder').map(d => [d.id, d.data()])));
      setPrelimAnswers(Object.fromEntries(prelimsSnapshot.docs.filter(d=>d.id !== '_placeholder').map(d => [d.id, d.data()])));
      setFeedbacks(Object.fromEntries(feedbacksSnapshot.docs.filter(d=>d.id !== '_placeholder').map(d => [d.id, 'data' in d.data() ? d.data().data : {}])));
      setStoredEvals(Object.fromEntries(storedEvalsSnapshot.docs.filter(d=>d.id !== '_placeholder').map(d => [d.id, d.data()])));
      
      const customTpsData = Object.fromEntries(tpsSnapshot.docs.filter(d=>d.id !== '_placeholder').map(doc => [doc.id, doc.data() as TP]));
      setTps(prev => ({...prev, ...customTpsData}));
      
      const teacherConfigDoc = await getDoc(doc(db, 'config', 'teacher'));
      if(teacherConfigDoc.exists()) setTeacherName(teacherConfigDoc.data().name);


    } catch (error: any) {
      console.error("Failed to load data from Firestore", error);
      toast({
        variant: "destructive",
        title: "Erreur de chargement des données",
        description: error.message,
      });
    } finally {
      setIsLoaded(true);
    }
  }, [toast, resetAndSeedDatabase]);

  useEffect(() => {
    if (db) {
      loadAllData(db);
    }
  }, [db, loadAllData]);

  const addTp = async (tp: TP) => {
    if(!db) return;
    const tpRef = doc(db, 'tps', tp.id.toString());
    await setDoc(tpRef, tp);
    setTps(prev => ({ ...prev, [tp.id]: tp }));
    toast({ title: "TP ajouté", description: `Le TP ${tp.titre} a été sauvegardé.` });
  };
  
  const assignTp = async (studentNames: string[], tpId: number) => {
     if(!db) return;
     const batch = writeBatch(db);
     const newAssignedTps = { ...assignedTps };

     studentNames.forEach(studentName => {
        const studentTps = newAssignedTps[studentName] || [];
        if (!studentTps.some(tp => tp.id === tpId)) {
            studentTps.push({ id: tpId, status: 'non-commencé' });
            newAssignedTps[studentName] = studentTps.sort((a,b) => a.id - b.id);
            const studentRef = doc(db, 'assignedTps', studentName);
            batch.set(studentRef, { assigned: newAssignedTps[studentName] });
        }
    });
    await batch.commit();
    setAssignedTps(newAssignedTps);
  };
  
  const updateTpStatus = async (studentName: string, tpId: number, status: TpStatus) => {
    if(!db) return;
    const studentTps = assignedTps[studentName] || [];
    const tpIndex = studentTps.findIndex(tp => tp.id === tpId);

    if (tpIndex !== -1) {
        const updatedTps = [...studentTps];
        updatedTps[tpIndex].status = status;
        const newAssignedTps = { ...assignedTps, [studentName]: updatedTps };
        await setDoc(doc(db, 'assignedTps', studentName), { assigned: updatedTps });
        setAssignedTps(newAssignedTps);
        toast({ title: "Statut du TP mis à jour" });
    }
  };
  
  const saveEvaluation = async (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote?: string, tpNote?: string, isFinal?: boolean) => {
     if(!db) return;
     
     const evalData : StoredEvaluation = {
        date: new Date().toLocaleDateString('fr-FR'),
        prelimNote,
        tpNote,
        competences: currentEvals,
        isFinal,
     };
     
     const storedEvalRef = doc(db, 'storedEvals', `${studentName}_${tpId}`);
     await setDoc(storedEvalRef, evalData);
     
     const newStoredEvals = {...storedEvals};
     if(!newStoredEvals[studentName]) newStoredEvals[studentName] = {};
     newStoredEvals[studentName][tpId] = evalData;
     setStoredEvals(newStoredEvals);
     
    if (isFinal) {
        const newEvaluations = { ...evaluations };
        const updatedStudentEvals = { ...(newEvaluations[studentName] || {}) };
        for (const competenceId in currentEvals) {
          const newStatus = currentEvals[competenceId];
          const history = updatedStudentEvals[competenceId] || [];
          if (history.length === 0 || history[history.length - 1] !== newStatus) {
            updatedStudentEvals[competenceId] = [...history, newStatus];
          }
        }
        newEvaluations[studentName] = updatedStudentEvals;
        await setDoc(doc(db, 'evaluations', studentName), updatedStudentEvals);
        setEvaluations(newEvaluations);
    }
    toast({ title: isFinal ? "Évaluation finale enregistrée" : "Brouillon sauvegardé" });
  };
  
  const savePrelimAnswer = async (studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => {
     if(!db) return;
     const newPrelimAnswers = { ...prelimAnswers };
     if (!newPrelimAnswers[studentName]) newPrelimAnswers[studentName] = {};
     if (!newPrelimAnswers[studentName][tpId]) newPrelimAnswers[studentName][tpId] = {};
     newPrelimAnswers[studentName][tpId][questionIndex] = answer;
     
     const docRef = doc(db, 'prelimAnswers', `${studentName}_${tpId}`);
     await setDoc(docRef, newPrelimAnswers[studentName][tpId]);
     
     setPrelimAnswers(newPrelimAnswers);
  };

  const saveFeedback = async (studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => {
      if(!db) return;
      const newFeedbacks = { ...feedbacks };
      if(!newFeedbacks[studentName]) newFeedbacks[studentName] = {};
      if(!newFeedbacks[studentName][tpId]) newFeedbacks[studentName][tpId] = {};
      newFeedbacks[studentName][tpId][author] = feedback;
      
      const docRef = doc(db, 'feedbacks', `${studentName}_${tpId}`);
      await setDoc(docRef, { data: newFeedbacks[studentName][tpId] });
      setFeedbacks(newFeedbacks);
  };
  
  const deleteStudent = async (studentName: string) => {
    if(!db) return;
    const studentToDelete = students.find(s => s.name === studentName);
    if (!studentToDelete) return;

    await deleteDoc(doc(db, 'students', studentToDelete.id));
    setStudents(prev => prev.filter(s => s.name !== studentName));

    const newClasses = { ...classes };
    for (const cName in newClasses) {
      const index = newClasses[cName].indexOf(studentName);
      if (index > -1) {
        newClasses[cName].splice(index, 1);
        await setDoc(doc(db, 'classes', cName), { studentNames: newClasses[cName] });
      }
    }
    setClasses(newClasses);
    toast({ title: "Élève supprimé" });
  };
  
  const deleteClass = async (className: string) => {
    if(!db) return;
    const studentsToDelete = classes[className] || [];
    const batch = writeBatch(db);

    studentsToDelete.forEach(studentName => {
        const studentDoc = students.find(s => s.name === studentName);
        if(studentDoc) {
            batch.delete(doc(db, 'students', studentDoc.id));
        }
    });
    batch.delete(doc(db, 'classes', className));

    await batch.commit();

    setStudents(prev => prev.filter(s => !studentsToDelete.includes(s.name)));
    const newClasses = { ...classes };
    delete newClasses[className];
    setClasses(newClasses);

    toast({ title: "Classe supprimée" });
  };
  
  const updateClassWithCsv = async (className: string, studentNames: string[]) => {
     if(!db) return;
     const batch = writeBatch(db);
     
     // Remove students from their old classes
     const newClasses = { ...classes };
     Object.keys(newClasses).forEach(key => {
        newClasses[key] = newClasses[key].filter(name => !studentNames.includes(name));
        batch.set(doc(db, 'classes', key), { studentNames: newClasses[key]});
    });
     
     // Add to new class
     newClasses[className] = [...(newClasses[className] || []), ...studentNames]
        .filter((v,i,a) => a.indexOf(v) === i) // unique
        .sort();
     batch.set(doc(db, 'classes', className), { studentNames: newClasses[className] });
     
     const existingStudents = [...students];
     const existingStudentNames = new Set(existingStudents.map(s => s.name));
     
     studentNames.forEach(name => {
      if (!existingStudentNames.has(name)) {
        const nameParts = name.split(' ');
        const lastName = nameParts[0] || '';
        const firstName = nameParts.slice(1).join(' ') || 'Prénom';
        
        const newStudent: Student = {
          id: `student-${lastName.toLowerCase()}-${firstName.toLowerCase()}`.replace(' ','-') + Date.now(),
          name: name,
          email: `${firstName.toLowerCase().replace(' ','.')}.${lastName.toLowerCase()}@school.com`,
          progress: 0,
          xp: 0,
        };
        existingStudents.push(newStudent);
        const studentRef = doc(db, 'students', newStudent.id);
        batch.set(studentRef, newStudent);
      }
    });

    await batch.commit();
    setClasses(newClasses);
    setStudents(existingStudents);
    toast({ title: "Classe mise à jour" });
  };
  
  const updateTeacherName = async (name: string) => {
    if(!db) return;
    await setDoc(doc(db, 'config', 'teacher'), { name });
    setTeacherName(name);
  };
  
  useEffect(() => {
    // This effect calculates student progress based on evaluations
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
    
    // Only update if there's a change to avoid loops
    if (JSON.stringify(students) !== JSON.stringify(updatedStudents)) {
        setStudents(updatedStudents);
    }
}, [evaluations, students, isLoaded]);

  return (
    <AssignmentsContext.Provider value={{ students, setStudents, classes, setClasses, assignedTps, evaluations, prelimAnswers, feedbacks, storedEvals, tps, assignTp, saveEvaluation, updateTpStatus, savePrelimAnswer, saveFeedback, teacherName, setTeacherName: updateTeacherName, deleteStudent, deleteClass, updateClassWithCsv, addTp, isLoaded }}>
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
