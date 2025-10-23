
'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { collection, doc, getDoc } from 'firebase/firestore';
import { classNames } from '@/lib/data-manager';

export default function StudentSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { firestore, isLoaded } = useFirebase();

  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [studentsInClass, setStudentsInClass] = useState<string[]>([]);

  useEffect(() => {
    if (isLoaded) {
      const classFromUrl = searchParams.get('class') || '';
      const studentFromUrl = searchParams.get('student') || '';
      if(classFromUrl) {
          handleClassChange(classFromUrl, studentFromUrl);
      }
    }
  }, [searchParams, isLoaded]);

  const handleClassChange = async (newClass: string, studentToSelect?: string) => {
    setSelectedClass(newClass);
    setSelectedStudent('');
    setStudentsInClass([]);

    if (newClass && firestore) {
        const classDocRef = doc(firestore, 'classes', newClass);
        const classDocSnap = await getDoc(classDocRef);
        if (classDocSnap.exists()) {
            const studentNames = (classDocSnap.data().studentNames as string[] || []).sort((a,b) => a.localeCompare(b));
            setStudentsInClass(studentNames);
            if(studentToSelect && studentNames.includes(studentToSelect)) {
                setSelectedStudent(studentToSelect);
            }
        }
    }
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
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label htmlFor="class-select" className="font-bold">Classe</Label>
          <Select onValueChange={(val) => handleClassChange(val)} value={selectedClass}>
            <SelectTrigger id="class-select">
              <SelectValue placeholder="Choisir une classe..." />
            </SelectTrigger>
            <SelectContent>
              {classNames.sort().map(className => (
                <SelectItem key={className} value={className}>{className}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="student-select" className="font-bold">Élève</Label>
          <Select onValueChange={handleStudentChange} value={selectedStudent} disabled={!selectedClass}>
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
