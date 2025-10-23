
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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
  const [teacherName, setTeacherName] = useState<string>('');
  const [tps, setTps] = useState<Record<number, TP>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedStudents = localStorage.getItem('students');
        const storedClasses = localStorage.getItem('classes');
        const storedAssignedTps = localStorage.getItem('assignedTps');
        const storedEvaluations = localStorage.getItem('evaluations');
        const storedPrelimAnswers = localStorage.getItem('prelimAnswers');
        const storedFeedbacks = localStorage.getItem('feedbacks');
        const storedStoredEvals = localStorage.getItem('storedEvals');
        const storedTeacherName = localStorage.getItem('teacherName');
        const storedCustomTps = localStorage.getItem('customTps');
        
        if (storedStudents && storedClasses) {
          setStudents(JSON.parse(storedStudents));
          setClasses(JSON.parse(storedClasses));
          setAssignedTps(storedAssignedTps ? JSON.parse(storedAssignedTps) : {});
          setEvaluations(storedEvaluations ? JSON.parse(storedEvaluations) : {});
          setPrelimAnswers(storedPrelimAnswers ? JSON.parse(storedPrelimAnswers) : {});
          setFeedbacks(storedFeedbacks ? JSON.parse(storedFeedbacks) : {});
          setStoredEvals(storedStoredEvals ? JSON.parse(storedStoredEvals) : {});
          setTeacherName(storedTeacherName ? JSON.parse(storedTeacherName) : 'M. Dubois');
          
          const customTps = storedCustomTps ? JSON.parse(storedCustomTps) : {};
          setTps({ ...getTpById(-1, true), ...customTps });
        } else {
          // If no data, initialize from hardcoded data
          const studentsData = initialStudentsData;
          const classesData = initialClasses;
          const customTps = {};

          setAssignedTps({});
          setEvaluations({});
          setPrelimAnswers({});
          setFeedbacks({});
          setStoredEvals({});
          setTps({ ...getTpById(-1, true), ...customTps });
          setTeacherName('M. Dubois');

          const updatedStudents = studentsData.map((student: Student) => {
            return { ...student, xp: 0, progress: 0 };
          });

          setStudents(updatedStudents);
          setClasses(classesData);
        }
      } catch (error) {
        console.error("Failed to initialize data from localStorage, using hardcoded initial data.", error);
        setStudents(initialStudentsData);
        setClasses(initialClasses);
        setAssignedTps({});
        setEvaluations({});
        setPrelimAnswers({});
        setFeedbacks({});
        setStoredEvals({});
        setTps(getTpById(-1, true) as Record<number, TP>);
        setTeacherName('M. Dubois');
      }
      setIsLoaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // This effect now serves to persist any changes made during the session.
    if (isLoaded) {
      localStorage.setItem('students', JSON.stringify(students));
      localStorage.setItem('classes', JSON.stringify(classes));
      localStorage.setItem('assignedTps', JSON.stringify(assignedTps));
      localStorage.setItem('evaluations', JSON.stringify(evaluations));
      localStorage.setItem('prelimAnswers', JSON.stringify(prelimAnswers));
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
      localStorage.setItem('storedEvals', JSON.stringify(storedEvals));
      localStorage.setItem('teacherName', JSON.stringify(teacherName));
      
      const customTps = Object.fromEntries(
        Object.entries(tps).filter(([id]) => parseInt(id, 10) >= 1000)
      );
      localStorage.setItem('customTps', JSON.stringify(customTps));
    }
  }, [students, classes, assignedTps, evaluations, prelimAnswers, feedbacks, storedEvals, teacherName, tps, isLoaded]);

  const addTp = (tp: TP) => {
    setTps(prev => ({...prev, [tp.id]: tp }));
  };

  const assignTp = (studentNames: string[], tpId: number) => {
    setAssignedTps(prev => {
      const newAssignedTps = { ...prev };
      studentNames.forEach(studentName => {
        const studentTps = newAssignedTps[studentName] || [];
        if (!studentTps.some(tp => tp.id === tpId)) {
          newAssignedTps[studentName] = [...studentTps, { id: tpId, status: 'non-commencé' }].sort((a,b) => a.id - b.id);
        }
      });
      return newAssignedTps;
    });
  };

   const updateTpStatus = (studentName: string, tpId: number, status: TpStatus) => {
    setAssignedTps(prev => {
      const newAssignedTps = { ...prev };
      const studentTps = newAssignedTps[studentName] || [];
      const tpIndex = studentTps.findIndex(tp => tp.id === tpId);

      if (tpIndex !== -1) {
        studentTps[tpIndex].status = status;
        newAssignedTps[studentName] = [...studentTps];
      }
      return newAssignedTps;
    });
     toast({
      title: "Statut du TP mis à jour",
      description: `Le TP ${tpId} est maintenant "${status}".`,
    });
  };

  const saveEvaluation = (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>, prelimNote?: string, tpNote?: string, isFinal?: boolean) => {
    
    setStoredEvals(prev => {
      const studentEvals = prev[studentName] || {};
      studentEvals[tpId] = {
        date: new Date().toLocaleDateString('fr-FR'),
        prelimNote: prelimNote,
        tpNote: tpNote,
        competences: currentEvals,
        isFinal: isFinal,
      };
      return { ...prev, [studentName]: studentEvals };
    });
    
    if (isFinal) {
      setEvaluations(prev => {
        const updatedStudentEvals = { ...(prev[studentName] || {}) };
        
        for (const competenceId in currentEvals) {
          const newStatus = currentEvals[competenceId];
          const history = updatedStudentEvals[competenceId] || [];
          // Only add if the status has changed from the last one
          if (history.length === 0 || history[history.length - 1] !== newStatus) {
            updatedStudentEvals[competenceId] = [...history, newStatus];
          }
        }

        return { ...prev, [studentName]: updatedStudentEvals };
      });
      
      setStudents(prevStudents => {
          const studentToUpdate = prevStudents.find(s => s.name === studentName);
          if (!studentToUpdate) return prevStudents;

          const studentEvaluations = evaluations[studentName] || {};
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
          
          const updatedStudent: Student = { ...studentToUpdate, xp: totalXp, progress: progressPercentage };
          
          return prevStudents.map(s => s.name === studentName ? updatedStudent : s);
      });
    }
  };

  const savePrelimAnswer = (studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => {
    setPrelimAnswers(prev => {
      const studentAnswers = prev[studentName] || {};
      const tpAnswers = studentAnswers[tpId] || {};
      return {
        ...prev,
        [studentName]: {
          ...studentAnswers,
          [tpId]: {
            ...tpAnswers,
            [questionIndex]: answer
          }
        }
      };
    });
  };

  const saveFeedback = (studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => {
    setFeedbacks(prev => {
      const studentFeedbacks = prev[studentName] || {};
      const tpFeedback = studentFeedbacks[tpId] || {};
      return {
        ...prev,
        [studentName]: {
          ...studentFeedbacks,
          [tpId]: {
            ...tpFeedback,
            [author]: feedback,
          },
        },
      };
    });
  };
  
  const resetStudentData = () => {
    setStudents([]);
    setAssignedTps({});
    setEvaluations({});
    setPrelimAnswers({});
    setFeedbacks({});
    setStoredEvals({});
    setClasses(prevClasses => {
        const clearedClasses: Record<string, string[]> = {};
        for (const className in prevClasses) {
            clearedClasses[className] = [];
        }
        return clearedClasses;
    });

    toast({
        title: "Données réinitialisées",
        description: "Tous les élèves, leurs TPs assignés et leurs évaluations ont été effacés.",
    });
  };

  const deleteStudent = (studentName: string) => {
    setStudents(prev => prev.filter(s => s.name !== studentName));
    setClasses(prev => {
      const newClasses = { ...prev };
      for (const className in newClasses) {
        newClasses[className] = newClasses[className].filter(name => name !== studentName);
      }
      return newClasses;
    });
    setAssignedTps(prev => {
      const newAssignedTps = { ...prev };
      delete newAssignedTps[studentName];
      return newAssignedTps;
    });
    setEvaluations(prev => {
        const newEvaluations = { ...prev };
        delete newEvaluations[studentName];
        return newEvaluations;
    });
    setPrelimAnswers(prev => {
      const newAnswers = {...prev};
      delete newAnswers[studentName];
      return newAnswers;
    })
    setFeedbacks(prev => {
      const newFeedbacks = {...prev};
      delete newFeedbacks[studentName];
      return newFeedbacks;
    });
     setStoredEvals(prev => {
      const newEvals = {...prev};
      delete newEvals[studentName];
      return newEvals;
    });
    toast({
        title: "Élève supprimé",
        description: `${studentName} a été retiré de l'application.`,
    });
  };

  const deleteClass = (className: string) => {
    const studentsInClass = classes[className] || [];
    
    setStudents(prev => prev.filter(s => !studentsInClass.includes(s.name)));

    setClasses(prev => {
        const newClasses = { ...prev };
        delete newClasses[className];
        return newClasses;
    });
    
    studentsInClass.forEach(studentName => {
        setAssignedTps(prev => {
            const newAssignedTps = { ...prev };
            delete newAssignedTps[studentName];
            return newAssignedTps;
        });
        setEvaluations(prev => {
            const newEvaluations = { ...prev };
            delete newEvaluations[studentName];
            return newEvaluations;
        });
        setPrelimAnswers(prev => {
          const newAnswers = {...prev};
          delete newAnswers[studentName];
          return newAnswers;
        });
        setFeedbacks(prev => {
          const newFeedbacks = {...prev};
          delete newFeedbacks[studentName];
          return newFeedbacks;
        });
        setStoredEvals(prev => {
          const newEvals = {...prev};
          delete newEvals[studentName];
          return newEvals;
        });
    });

    toast({
        title: "Classe supprimée",
        description: `La classe ${className} et tous ses élèves ont été supprimés.`,
    });
  };
  
  const updateClassWithCsv = (className: string, studentNames: string[]) => {
    setClasses(prevClasses => {
      const updatedClasses = { ...prevClasses };

      // Remove students from their old classes
      Object.keys(updatedClasses).forEach(key => {
        updatedClasses[key] = updatedClasses[key].filter(name => !studentNames.includes(name));
      });

      // Add students to the new class
      updatedClasses[className] = studentNames;
      return updatedClasses;
    });

    setStudents(prevStudents => {
      const existingStudentNames = new Set(prevStudents.map(s => s.name));
      const studentsToAdd: Student[] = [];

      studentNames.forEach(name => {
        if (!existingStudentNames.has(name)) {
          const nameParts = name.split(' ');
          const lastName = nameParts[0] || '';
          const firstName = nameParts.slice(1).join(' ') || 'Prénom';

          const newStudent: Student = {
            id: `student-${Date.now()}-${Math.random()}`,
            name: name,
            email: `${firstName.toLowerCase().replace(' ','.')}.${lastName.toLowerCase()}@school.com`,
            progress: 0,
            xp: 0,
          };
          studentsToAdd.push(newStudent);
        }
      });
      
      return [...prevStudents, ...studentsToAdd];
    });
    
    toast({
      title: "Classe mise à jour",
      description: `La classe ${className} a été mise à jour avec ${studentNames.length} élèves. Les données des élèves existants sont conservées.`,
    });
  };

  return (
    <AssignmentsContext.Provider value={{ students, setStudents, classes, setClasses, assignedTps, evaluations, prelimAnswers, feedbacks, storedEvals, tps, assignTp, saveEvaluation, updateTpStatus, savePrelimAnswer, saveFeedback, teacherName, setTeacherName, resetStudentData, deleteStudent, deleteClass, updateClassWithCsv, addTp, isLoaded }}>
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
