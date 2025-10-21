'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { students as initialStudents } from '@/lib/mock-data';
import { classes as initialClasses, getTpById, allBlocs } from '@/lib/data-manager';
import { Student } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';

const xpPerLevel: Record<EvaluationStatus, number> = {
  NA: 0,
  EC: 2,
  A: 5,
  M: 10,
};

type AssignmentsContextType = {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  classes: Record<string, string[]>;
  setClasses: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  assignedTps: Record<string, number[]>;
  evaluations: Record<string, Record<string, EvaluationStatus>>;
  assignTp: (studentNames: string[], tpId: number) => void;
  saveEvaluation: (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>) => void;
  teacherName: string;
  setTeacherName: React.Dispatch<React.SetStateAction<string>>;
  resetStudentData: () => void;
  deleteStudent: (studentName: string) => void;
  deleteClass: (className: string) => void;
};

const AssignmentsContext = createContext<AssignmentsContextType | undefined>(undefined);

export const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Record<string, string[]>>({});
  const [assignedTps, setAssignedTps] = useState<Record<string, number[]>>({});
  const [evaluations, setEvaluations] = useState<Record<string, Record<string, EvaluationStatus>>>({});
  const [teacherName, setTeacherName] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedStudents = localStorage.getItem('students');
        const studentsData = savedStudents ? JSON.parse(savedStudents) : initialStudents;
        
        const savedClasses = localStorage.getItem('classes');
        setClasses(savedClasses ? JSON.parse(savedClasses) : initialClasses);

        const savedAssignedTps = localStorage.getItem('assignedTps');
        setAssignedTps(savedAssignedTps ? JSON.parse(savedAssignedTps) : {
          'BAKHTAR Adam': [101, 102],
          'BELKAID Rayan': [101],
        });

        const savedEvaluations = localStorage.getItem('evaluations');
        const evaluationsData = savedEvaluations ? JSON.parse(savedEvaluations) : {};
        setEvaluations(evaluationsData);
        
        // Recalculate progress and XP on load
        const updatedStudents = studentsData.map((student: Student) => {
          const studentEvaluations = evaluationsData[student.name] || {};
          let totalXp = 0;
          for (const competenceId in studentEvaluations) {
              const level = studentEvaluations[competenceId];
              totalXp += xpPerLevel[level] || 0;
          }
          const allCompetencesCount = Object.values(allBlocs).reduce((acc, bloc) => acc + Object.keys(bloc.items).length, 0);
          const maxPossibleXp = allCompetencesCount * xpPerLevel['M'];
          const progressPercentage = maxPossibleXp > 0 ? Math.round((totalXp / maxPossibleXp) * 100) : 0;
          return { ...student, xp: totalXp, progress: progressPercentage };
        });
        setStudents(updatedStudents);

        const savedTeacherName = localStorage.getItem('teacherName');
        setTeacherName(savedTeacherName ? JSON.parse(savedTeacherName) : 'M. Dubois');
      } catch (error) {
        console.error("Failed to load data from localStorage, using initial data.", error);
        setStudents(initialStudents);
        setClasses(initialClasses);
        setAssignedTps({
          'BAKHTAR Adam': [101, 102],
          'BELKAID Rayan': [101],
        });
        setEvaluations({});
        setTeacherName('M. Dubois');
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('students', JSON.stringify(students));
      localStorage.setItem('classes', JSON.stringify(classes));
      localStorage.setItem('assignedTps', JSON.stringify(assignedTps));
      localStorage.setItem('evaluations', JSON.stringify(evaluations));
      localStorage.setItem('teacherName', JSON.stringify(teacherName));
    }
  }, [students, classes, assignedTps, evaluations, teacherName, isLoaded]);

  const assignTp = (studentNames: string[], tpId: number) => {
    setAssignedTps(prev => {
      const newAssignedTps = { ...prev };
      studentNames.forEach(studentName => {
        const studentTps = newAssignedTps[studentName] || [];
        if (!studentTps.includes(tpId)) {
          newAssignedTps[studentName] = [...studentTps, tpId].sort();
        }
      });
      return newAssignedTps;
    });
  };

  const saveEvaluation = (studentName: string, tpId: number, currentEvals: Record<string, EvaluationStatus>) => {
    
    // Update evaluations
    const updatedEvaluationsForStudent = {
      ...(evaluations[studentName] || {}),
      ...currentEvals
    };
    
    setEvaluations(prev => ({
      ...prev,
      [studentName]: updatedEvaluationsForStudent
    }));
    
    // Update student's XP and progress
    setStudents(prevStudents => {
        const studentToUpdate = prevStudents.find(s => s.name === studentName);
        if (!studentToUpdate) return prevStudents;
        
        let totalXp = 0;
        for (const competenceId in updatedEvaluationsForStudent) {
            const level = updatedEvaluationsForStudent[competenceId];
            totalXp += xpPerLevel[level] || 0;
        }

        const allCompetencesCount = Object.values(allBlocs).reduce((acc, bloc) => acc + Object.keys(bloc.items).length, 0);
        const maxPossibleXp = allCompetencesCount * xpPerLevel['M'];
        const progressPercentage = maxPossibleXp > 0 ? Math.round((totalXp / maxPossibleXp) * 100) : 0;
        
        const updatedStudent: Student = { ...studentToUpdate, xp: totalXp, progress: progressPercentage };
        
        return prevStudents.map(s => s.name === studentName ? updatedStudent : s);
    });
  };
  
  const resetStudentData = () => {
    setStudents([]);
    setAssignedTps({});
    setEvaluations({});
    setClasses(prevClasses => {
        const clearedClasses: Record<string, string[]> = {};
        for (const className in prevClasses) {
            clearedClasses[className] = [];
        }
        return clearedClasses;
    });

    toast({
        title: "Données réinitialisées",
        description: "Tous les élèves, leurs TP assignés et leurs évaluations ont été effacés.",
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
    toast({
        title: "Élève supprimé",
        description: `${studentName} a été retiré de l'application.`,
    });
  };

  const deleteClass = (className: string) => {
    const studentsInClass = classes[className] || [];
    
    // Remove all students from that class
    setStudents(prev => prev.filter(s => !studentsInClass.includes(s.name)));

    // Remove the class itself
    setClasses(prev => {
        const newClasses = { ...prev };
        delete newClasses[className];
        return newClasses;
    });
    
    // Remove data for each student in the class
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
    });

    toast({
        title: "Classe supprimée",
        description: `La classe ${className} et tous ses élèves ont été supprimés.`,
    });
  };

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <AssignmentsContext.Provider value={{ students, setStudents, classes, setClasses, assignedTps, evaluations, assignTp, saveEvaluation, teacherName, setTeacherName, resetStudentData, deleteStudent, deleteClass }}>
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
