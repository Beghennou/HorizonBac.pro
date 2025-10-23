
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

// Helper function to safely parse JSON from localStorage
const getInitialState = <T>(key: string, defaultValue: T): T => {
    if (typeof window === 'undefined') {
        return defaultValue;
    }
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return defaultValue;
    }
};


export const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(() => getInitialState('students', initialStudentsData));
  const [classes, setClasses] = useState<Record<string, string[]>>(() => getInitialState('classes', initialClasses));
  const [assignedTps, setAssignedTps] = useState<Record<string, AssignedTp[]>>(() => getInitialState('assignedTps', {}));
  const [evaluations, setEvaluations] = useState<Record<string, Record<string, EvaluationStatus[]>>>(() => getInitialState('evaluations', {}));
  const [prelimAnswers, setPrelimAnswers] = useState<Record<string, Record<number, Record<number, PrelimAnswer>>>>(() => getInitialState('prelimAnswers', {}));
  const [feedbacks, setFeedbacks] = useState<Record<string, Record<number, Feedback>>>(() => getInitialState('feedbacks', {}));
  const [storedEvals, setStoredEvals] = useState<Record<string, Record<number, StoredEvaluation>>>(() => getInitialState('storedEvals', {}));
  const [teacherName, setTeacherName] = useState<string>(() => getInitialState('teacherName', 'M. Dubois'));
  const [tps, setTps] = useState<Record<number, TP>>(() => getInitialState('tps', getTpById(-1, true) as Record<number, TP>));
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem('students', JSON.stringify(students));
  }, [students, isLoaded]);
  useEffect(() => {
    if (isLoaded) localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes, isLoaded]);
  useEffect(() => {
    if (isLoaded) localStorage.setItem('assignedTps', JSON.stringify(assignedTps));
  }, [assignedTps, isLoaded]);
  useEffect(() => {
    if (isLoaded) localStorage.setItem('evaluations', JSON.stringify(evaluations));
  }, [evaluations, isLoaded]);
  useEffect(() => {
    if (isLoaded) localStorage.setItem('prelimAnswers', JSON.stringify(prelimAnswers));
  }, [prelimAnswers, isLoaded]);
  useEffect(() => {
    if (isLoaded) localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks, isLoaded]);
  useEffect(() => {
    if (isLoaded) localStorage.setItem('storedEvals', JSON.stringify(storedEvals));
  }, [storedEvals, isLoaded]);
  useEffect(() => {
    if (isLoaded) localStorage.setItem('teacherName', JSON.stringify(teacherName));
  }, [teacherName, isLoaded]);
  useEffect(() => {
    if (isLoaded) localStorage.setItem('tps', JSON.stringify(tps));
  }, [tps, isLoaded]);


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
    setStudents(initialStudentsData);
    setClasses(initialClasses);
    setAssignedTps({});
    setEvaluations({});
    setPrelimAnswers({});
    setFeedbacks({});
    setStoredEvals({});
    setTps(getTpById(-1, true) as Record<number, TP>);
    localStorage.clear();
    toast({
        title: "Données réinitialisées",
        description: "Toutes les données locales ont été effacées.",
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
        description: `La classe ${className} et ses élèves ont été retirés.`,
    });
  };
  
  const updateClassWithCsv = (className: string, studentNames: string[]) => {
    setClasses(prevClasses => {
      const updatedClasses = { ...prevClasses };

      Object.keys(updatedClasses).forEach(key => {
        updatedClasses[key] = updatedClasses[key].filter(name => !studentNames.includes(name));
      });

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
      description: `La classe ${className} a été mise à jour avec les nouveaux élèves.`,
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
