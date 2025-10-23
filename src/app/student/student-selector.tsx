
'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase/provider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Student } from '@/lib/types';
import { collection } from 'firebase/firestore';

export default function StudentSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { firestore, isLoaded } = useFirebase();

  const { data: classesData } = useCollection(useMemoFirebase(() => firestore ? collection(firestore, 'classes') : null, [firestore]));
  
  const classes = useMemo(() => {
    if (!classesData) return {};
    return Object.fromEntries(classesData.map(c => [c.id, c.studentNames || []]))
  }, [classesData]);

  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');

  const sortedClasses = useMemo(() => {
    return Object.keys(classes).sort((a, b) => {
      const levelA = a.startsWith('T') ? 3 : a.startsWith('1') ? 2 : 1;
      const levelB = b.startsWith('T') ? 3 : b.startsWith('1') ? 2 : 1;
      if (levelA !== levelB) return levelA - levelB;
      return a.localeCompare(b);
    });
  }, [classes]);

  const studentsInClass = useMemo(() => {
    if (selectedClass && classes[selectedClass]) {
      const studentNames = classes[selectedClass];
      return studentNames.sort((a, b) => a.localeCompare(b));
    }
    return [];
  }, [selectedClass, classes]);

  useEffect(() => {
    if (isLoaded) {
      const classFromUrl = searchParams.get('class') || '';
      const studentFromUrl = searchParams.get('student') || '';
      setSelectedClass(classFromUrl);
      setSelectedStudent(studentFromUrl);
    }
  }, [searchParams, isLoaded]);

  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass);
    setSelectedStudent(''); // Reset student when class changes
  };

  const handleStudentChange = (newStudent: string) => {
    setSelectedStudent(newStudent);
  };

  const handleSubmit = () => {
    if (selectedStudent && selectedClass) {
      const params = new URLSearchParams();
      params.set('class', selectedClass);
      params.set('student', selectedStudent);
      router.push(`/student?${params.toString()}`);
    }
  };


  if (!isLoaded) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label htmlFor="class-select" className="font-bold">Classe</Label>
          <Select onValueChange={handleClassChange} value={selectedClass}>
            <SelectTrigger id="class-select">
              <SelectValue placeholder="Choisir une classe..." />
            </SelectTrigger>
            <SelectContent>
              {sortedClasses.map(className => (
                <SelectItem key={className} value={className}>{className}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="student-select" className="font-bold">Élève</Label>
          <Select onValueChange={handleStudentChange} value={selectedStudent} disabled={!selectedClass || studentsInClass.length === 0}>
            <SelectTrigger id="student-select">
              <SelectValue placeholder={!selectedClass ? "Choisis d'abord une classe" : "Choisir ton nom..."} />
            </SelectTrigger>
            <SelectContent>
              {studentsInClass.map(studentName => (
                <SelectItem key={studentName} value={studentName}>
                  {studentName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={!selectedStudent || !selectedClass}
          className="w-full font-bold"
        >
          Valider
        </Button>
    </div>
  );
}
