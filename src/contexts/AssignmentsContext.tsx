
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { students as initialStudents } from '@/lib/mock-data';
import { classes as initialClasses, getTpById, allBlocs } from '@/lib/data-manager';
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

type AssignmentsContextType = {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  classes: Record<string, string[]>;
  setClasses: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  assignedTps: Record<string, AssignedTp[]>;
  evaluations: Record<string, Record<string, EvaluationStatus[]>>;
  prelimAnswers: Record<string, Record<number, Record<number, PrelimAnswer>>>;
  feedbacks: Record<string, Record<number, Feedback>>;
  assignTp: (studentNames: string[], tpId: number) => void;
  saveEvaluation: (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>) => void;
  updateTpStatus: (studentName: string, tpId: number, status: TpStatus) => void;
  savePrelimAnswer: (studentName: string, tpId: number, questionIndex: number, answer: PrelimAnswer) => void;
  saveFeedback: (studentName: string, tpId: number, feedback: string, author: 'student' | 'teacher') => void;
  teacherName: string;
  setTeacherName: React.Dispatch<React.SetStateAction<string>>;
  resetStudentData: () => void;
  deleteStudent: (studentName: string) => void;
  deleteClass: (className: string) => void;
  updateClassWithCsv: (className: string, studentNames: string[]) => void;
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
  const [teacherName, setTeacherName] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedStudents = localStorage.getItem('students');
        const studentsData = savedStudents ? JSON.parse(savedStudents) : initialStudents;
        
        const savedClasses = localStorage.getItem('classes');
        const classesData = savedClasses ? JSON.parse(savedClasses) : initialClasses;

        const savedAssignedTps = localStorage.getItem('assignedTps');
        setAssignedTps(savedAssignedTps ? JSON.parse(savedAssignedTps) : {});

        const savedEvaluations = localStorage.getItem('evaluations');
        const evaluationsData = savedEvaluations ? JSON.parse(savedEvaluations) : {};
        setEvaluations(evaluationsData);

        const savedPrelimAnswers = localStorage.getItem('prelimAnswers');
        setPrelimAnswers(savedPrelimAnswers ? JSON.parse(savedPrelimAnswers) : {});
        
        const savedFeedbacks = localStorage.getItem('feedbacks');
        setFeedbacks(savedFeedbacks ? JSON.parse(savedFeedbacks) : {});

        const updatedStudents = studentsData.map((student: Student) => {
          const studentEvaluations = evaluationsData[student.name] || {};
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
          return { ...student, xp: totalXp, progress: progressPercentage };
        });

        // Force reset if the classes list doesn't match the new one
        if(JSON.stringify(Object.keys(classesData).sort()) !== JSON.stringify(Object.keys(initialClasses).sort())){
            setStudents(initialStudents);
            setClasses(initialClasses);
            setAssignedTps({});
            setEvaluations({});
            setPrelimAnswers({});
            setFeedbacks({});
            toast({
                title: "Réinitialisation effectuée",
                description: "Les classes et les élèves ont été mis à jour.",
            });
        } else {
             setStudents(updatedStudents);
             setClasses(classesData);
        }

        const savedTeacherName = localStorage.getItem('teacherName');
        setTeacherName(savedTeacherName ? JSON.parse(savedTeacherName) : 'M. Dubois');
      } catch (error) {
        console.error("Failed to load data from localStorage, using initial data.", error);
        setStudents(initialStudents);
        setClasses(initialClasses);
        setAssignedTps({});
        setEvaluations({});
        setPrelimAnswers({});
        setFeedbacks({});
        setTeacherName('M. Dubois');
      }
      setIsLoaded(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('students', JSON.stringify(students));
      localStorage.setItem('classes', JSON.stringify(classes));
      localStorage.setItem('assignedTps', JSON.stringify(assignedTps));
      localStorage.setItem('evaluations', JSON.stringify(evaluations));
      localStorage.setItem('prelimAnswers', JSON.stringify(prelimAnswers));
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
      localStorage.setItem('teacherName', JSON.stringify(teacherName));
    }
  }, [students, classes, assignedTps, evaluations, prelimAnswers, feedbacks, teacherName, isLoaded]);

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

  const saveEvaluation = (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>) => {
    
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
    <AssignmentsContext.Provider value={{ students, setStudents, classes, setClasses, assignedTps, evaluations, prelimAnswers, feedbacks, assignTp, saveEvaluation, updateTpStatus, savePrelimAnswer, saveFeedback, teacherName, setTeacherName, resetStudentData, deleteStudent, deleteClass, updateClassWithCsv, isLoaded }}>
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

    