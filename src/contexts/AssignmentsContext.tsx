
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { collection, doc, getDoc, getDocs, setDoc, writeBatch } from 'firebase/firestore';
import { students as initialStudentsData, classes as initialClasses, getTpById, allBlocs, TP } from '@/lib/data-manager';
import { Student } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

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
  setTeacherName: React.Dispatch<React.SetStateAction<string>>;
  resetStudentData: () => void;
  deleteStudent: (studentName: string) => void;
  deleteClass: (className: string) => void;
  updateClassWithCsv: (className: string, studentNames: string[]) => void;
  addTp: (tp: TP) => void;
  isLoaded: boolean;
};

const AssignmentsContext = createContext<AssignmentsContextType | undefined>(undefined);

export const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Record<string, string[]>>({});
  const [assignedTps, setAssignedTps] = useState<Record<string, AssignedTp[]>>({});
  const [evaluations, setEvaluations] = useState<Record<string, Record<string, EvaluationStatus[]>>>({});
  const [prelimAnswers, setPrelimAnswers] = useState<Record<string, Record<number, Record<number, PrelimAnswer>>>>({});
  const [feedbacks, setFeedbacks] = useState<Record<string, Record<number, Feedback>>>({});
  const [storedEvals, setStoredEvals] = useState<Record<string, Record<number, StoredEvaluation>>>({});
  const [teacherName, setTeacherName] = useState<string>('M. Dubois');
  const [tps, setTps] = useState<Record<number, TP>>(getTpById(-1, true) as Record<number, TP>);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  const loadData = useCallback(async () => {
    setIsLoaded(false);
    try {
        const [studentsSnapshot, classesSnapshot, tpsSnapshot, assignedTpsSnapshot, evalsSnapshot, prelimsSnapshot, feedbacksSnapshot, storedEvalsSnapshot, teacherSnapshot] = await Promise.all([
            getDocs(collection(db, 'students')),
            getDocs(collection(db, 'classes')),
            getDocs(collection(db, 'tps')),
            getDocs(collection(db, 'assignedTps')),
            getDocs(collection(db, 'evaluations')),
            getDocs(collection(db, 'prelimAnswers')),
            getDocs(collection(db, 'feedbacks')),
            getDocs(collection(db, 'storedEvals')),
            getDoc(doc(db, 'settings', 'teacher')),
        ]);

        if (studentsSnapshot.empty) {
            // If no data, populate with initial data
            await resetStudentData(true);
        } else {
            setStudents(studentsSnapshot.docs.map(doc => doc.data() as Student));
            const classesData: Record<string, string[]> = {};
            classesSnapshot.forEach(doc => classesData[doc.id] = doc.data().studentNames);
            setClasses(classesData);

            const tpsData: Record<number, TP> = { ...tps };
            tpsSnapshot.forEach(doc => tpsData[doc.data().id] = doc.data() as TP);
            setTps(tpsData);
            
            const assignedTpsData: Record<string, AssignedTp[]> = {};
            assignedTpsSnapshot.forEach(doc => assignedTpsData[doc.id] = doc.data().tps);
            setAssignedTps(assignedTpsData);
            
            const evalsData: Record<string, Record<string, EvaluationStatus[]>> = {};
            evalsSnapshot.forEach(doc => evalsData[doc.id] = doc.data());
            setEvaluations(evalsData);

            const prelimsData: Record<string, Record<number, Record<number, PrelimAnswer>>> = {};
            prelimsSnapshot.forEach(doc => prelimsData[doc.id] = JSON.parse(doc.data().answers));
            setPrelimAnswers(prelimsData);

            const feedbacksData: Record<string, Record<number, Feedback>> = {};
            feedbacksSnapshot.forEach(doc => feedbacksData[doc.id] = JSON.parse(doc.data().feedbacks));
            setFeedbacks(feedbacksData);

            const storedEvalsData: Record<string, Record<number, StoredEvaluation>> = {};
            storedEvalsSnapshot.forEach(doc => storedEvalsData[doc.id] = JSON.parse(doc.data().evals));
            setStoredEvals(storedEvalsData);

            if (teacherSnapshot.exists()) {
                setTeacherName(teacherSnapshot.data().name);
            }
        }
        toast({ title: "Connecté à Firestore", description: "Les données sont lues depuis la base de données." });
    } catch (error) {
        console.error("Error loading data from Firestore:", error);
        toast({
            variant: "destructive",
            title: "Erreur de connexion à Firestore",
            description: "Impossible de lire les données. Vérifiez votre configuration Firebase et vos règles de sécurité.",
        });
        // Fallback to initial data if firestore fails
        setStudents(initialStudentsData);
        setClasses(initialClasses);
    } finally {
        setIsLoaded(true);
    }
  }, [toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);


  const addTp = async (tp: TP) => {
    try {
        const tpRef = doc(db, 'tps', tp.id.toString());
        await setDoc(tpRef, tp);
        setTps(prev => ({ ...prev, [tp.id]: tp }));
    } catch(e) { console.error(e) }
  };

  const assignTp = async (studentNames: string[], tpId: number) => {
    const batch = writeBatch(db);
    const newAssignedTps = { ...assignedTps };

    studentNames.forEach(studentName => {
        const studentTps = newAssignedTps[studentName] || [];
        if (!studentTps.some(tp => tp.id === tpId)) {
            newAssignedTps[studentName] = [...studentTps, { id: tpId, status: 'non-commencé' }].sort((a,b) => a.id - b.id);
            const studentRef = doc(db, 'assignedTps', studentName);
            batch.set(studentRef, { tps: newAssignedTps[studentName] });
        }
    });

    await batch.commit();
    setAssignedTps(newAssignedTps);
  };

   const updateTpStatus = async (studentName: string, tpId: number, status: TpStatus) => {
    const studentTps = assignedTps[studentName] || [];
    const tpIndex = studentTps.findIndex(tp => tp.id === tpId);

    if (tpIndex !== -1) {
        const updatedTps = [...studentTps];
        updatedTps[tpIndex].status = status;
        const studentRef = doc(db, 'assignedTps', studentName);
        await setDoc(studentRef, { tps: updatedTps });
        setAssignedTps(prev => ({ ...prev, [studentName]: updatedTps }));
    }
     toast({
      title: "Statut du TP mis à jour",
      description: `Le TP ${tpId} est maintenant "${status}".`,
    });
  };

  const saveEvaluation = async (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote?: string, tpNote?: string, isFinal?: boolean) => {
    
    const newStoredEvals = { ...storedEvals };
    const studentStoredEvals = newStoredEvals[studentName] || {};
    studentStoredEvals[tpId] = {
        date: new Date().toLocaleDateString('fr-FR'),
        prelimNote: prelimNote,
        tpNote: tpNote,
        competences: currentEvals,
        isFinal: isFinal,
    };
    newStoredEvals[studentName] = studentStoredEvals;
    
    const storedEvalRef = doc(db, 'storedEvals', studentName);
    await setDoc(storedEvalRef, { evals: JSON.stringify(newStoredEvals[studentName]) });
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
        const evalRef = doc(db, 'evaluations', studentName);
        await setDoc(evalRef, newEvaluations[studentName]);
        setEvaluations(newEvaluations);
    }
    toast({
        title: isFinal ? "Évaluation rendue" : "Évaluation enregistrée",
        description: isFinal 
            ? `L'évaluation pour ${studentName} a été finalisée et est visible par l'élève.`
            : `Les compétences pour ${studentName} ont été sauvegardées en brouillon.`,
    });
  };
  
   useEffect(() => {
    const calculateProgress = async () => {
        const batch = writeBatch(db);
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

            const allCompetencesCount = Object.values(allBlocs).reduce((acc, bloc) => acc + Object.keys(bloc.items).length, 0);
            const maxPossibleXp = allCompetencesCount * xpPerLevel['M'];
            const progressPercentage = maxPossibleXp > 0 ? Math.round((totalXp / maxPossibleXp) * 100) : 0;
            
            if (student.xp !== totalXp || student.progress !== progressPercentage) {
                const updatedStudent = { ...student, xp: totalXp, progress: progressPercentage };
                const studentRef = doc(db, "students", student.id);
                batch.set(studentRef, updatedStudent);
                return updatedStudent;
            }
            return student;
        });
        await batch.commit();
        setStudents(updatedStudents);
    };

    if (isLoaded) {
        calculateProgress();
    }
  }, [evaluations, isLoaded, students]);

  const savePrelimAnswer = async (studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => {
    const newPrelimAnswers = { ...prelimAnswers };
    const studentAnswers = newPrelimAnswers[studentName] || {};
    const tpAnswers = studentAnswers[tpId] || {};
    tpAnswers[questionIndex] = answer;
    studentAnswers[tpId] = tpAnswers;
    newPrelimAnswers[studentName] = studentAnswers;
    
    const prelimRef = doc(db, 'prelimAnswers', studentName);
    await setDoc(prelimRef, { answers: JSON.stringify(newPrelimAnswers[studentName]) });
    setPrelimAnswers(newPrelimAnswers);
  };

  const saveFeedback = async (studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => {
    const newFeedbacks = { ...feedbacks };
    const studentFeedbacks = newFeedbacks[studentName] || {};
    const tpFeedback = studentFeedbacks[tpId] || {};
    tpFeedback[author] = feedback;
    studentFeedbacks[tpId] = tpFeedback;
    newFeedbacks[studentName] = studentFeedbacks;
    
    const feedbackRef = doc(db, 'feedbacks', studentName);
    await setDoc(feedbackRef, { feedbacks: JSON.stringify(newFeedbacks[studentName]) });
    setFeedbacks(newFeedbacks);
  };
  
  const resetStudentData = async (initialSetup = false) => {
    const batch = writeBatch(db);

    initialStudentsData.forEach(student => {
        const studentRef = doc(db, 'students', student.id);
        batch.set(studentRef, student);
    });
    
    Object.entries(initialClasses).forEach(([className, studentNames]) => {
        const classRef = doc(db, 'classes', className);
        batch.set(classRef, { studentNames });
    });

    // Clear other collections
    (await getDocs(collection(db, 'assignedTps'))).forEach(doc => batch.delete(doc.ref));
    (await getDocs(collection(db, 'evaluations'))).forEach(doc => batch.delete(doc.ref));
    (await getDocs(collection(db, 'prelimAnswers'))).forEach(doc => batch.delete(doc.ref));
    (await getDocs(collection(db, 'feedbacks'))).forEach(doc => batch.delete(doc.ref));
    (await getDocs(collection(db, 'storedEvals'))).forEach(doc => batch.delete(doc.ref));

    await batch.commit();

    setStudents(initialStudentsData);
    setClasses(initialClasses);
    setAssignedTps({});
    setEvaluations({});
    setPrelimAnswers({});
    setFeedbacks({});
    setStoredEvals({});
    
    if (!initialSetup) {
      toast({
          title: "Données réinitialisées sur Firestore",
          description: "La base de données a été réinitialisée avec les données initiales.",
      });
    }
  };

  const deleteStudent = async (studentName: string) => {
      const studentToDelete = students.find(s => s.name === studentName);
      if (!studentToDelete) return;

      const batch = writeBatch(db);

      batch.delete(doc(db, 'students', studentToDelete.id));
      batch.delete(doc(db, 'assignedTps', studentName));
      batch.delete(doc(db, 'evaluations', studentName));
      batch.delete(doc(db, 'prelimAnswers', studentName));
      batch.delete(doc(db, 'feedbacks', studentName));
      batch.delete(doc(db, 'storedEvals', studentName));
      
      const updatedClasses = { ...classes };
      for (const className in updatedClasses) {
        if (updatedClasses[className].includes(studentName)) {
            updatedClasses[className] = updatedClasses[className].filter(name => name !== studentName);
            batch.set(doc(db, 'classes', className), { studentNames: updatedClasses[className] });
        }
      }

      await batch.commit();
      
      setStudents(prev => prev.filter(s => s.name !== studentName));
      setClasses(updatedClasses);
      // Local state updates for other data will follow naturally from a reload or can be done manually
      loadData();

      toast({
          title: "Élève supprimé",
          description: `${studentName} et toutes ses données ont été supprimés de Firestore.`,
      });
  };

  const deleteClass = async (className: string) => {
    const studentsInClass = classes[className] || [];
    const batch = writeBatch(db);

    studentsInClass.forEach(studentName => {
        const studentToDelete = students.find(s => s.name === studentName);
        if (studentToDelete) {
          batch.delete(doc(db, 'students', studentToDelete.id));
          batch.delete(doc(db, 'assignedTps', studentName));
          batch.delete(doc(db, 'evaluations', studentName));
          batch.delete(doc(db, 'prelimAnswers', studentName));
          batch.delete(doc(db, 'feedbacks', studentName));
          batch.delete(doc(db, 'storedEvals', studentName));
        }
    });

    batch.delete(doc(db, 'classes', className));
    await batch.commit();
    loadData();

    toast({
        title: "Classe supprimée",
        description: `La classe ${className} et ses élèves ont été supprimés de Firestore.`,
    });
  };
  
  const updateClassWithCsv = async (className: string, studentNames: string[]) => {
    const batch = writeBatch(db);

    const updatedClasses = { ...classes };
    Object.keys(updatedClasses).forEach(key => {
        updatedClasses[key] = updatedClasses[key].filter(name => !studentNames.includes(name));
    });
    updatedClasses[className] = studentNames;
    
    Object.entries(updatedClasses).forEach(([name, names]) => {
      batch.set(doc(db, 'classes', name), { studentNames: names });
    });

    const existingStudents = [...students];
    const existingStudentNames = new Set(existingStudents.map(s => s.name));
    
    studentNames.forEach(name => {
      if (!existingStudentNames.has(name)) {
        const nameParts = name.split(' ');
        const lastName = nameParts[0] || '';
        const firstName = nameParts.slice(1).join(' ') || 'Prénom';

        const newStudent: Student = {
          id: `student-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: name,
          email: `${firstName.toLowerCase().replace(' ','.')}.${lastName.toLowerCase()}@school.com`,
          progress: 0,
          xp: 0,
        };
        existingStudents.push(newStudent);
        batch.set(doc(db, 'students', newStudent.id), newStudent);
      }
    });

    await batch.commit();
    setClasses(updatedClasses);
    setStudents(existingStudents);
    
    toast({
      title: "Classe mise à jour",
      description: `La classe ${className} a été mise à jour avec les nouveaux élèves sur Firestore.`,
    });
  };

  const updateTeacherName = async (name: string) => {
    setTeacherName(name);
    await setDoc(doc(db, 'settings', 'teacher'), { name });
  };


  return (
    <AssignmentsContext.Provider value={{ students, setStudents, classes, setClasses, assignedTps, evaluations, prelimAnswers, feedbacks, storedEvals, tps, assignTp, saveEvaluation, updateTpStatus, savePrelimAnswer, saveFeedback, teacherName, setTeacherName: updateTeacherName, resetStudentData, deleteStudent, deleteClass, updateClassWithCsv, addTp, isLoaded }}>
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
