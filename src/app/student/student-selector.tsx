
'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cursus } from '@/lib/data-manager';

export default function StudentSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { classes: allClassData, teachers: allTeachers, isLoaded } = useFirebase();

  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  
  const cursus = (searchParams.get('cursus') as Cursus) || 'bacpro';

  const teachers = useMemo(() => {
      if (!allTeachers) return [];
      // Use an object to ensure names are unique if they are the same
      const uniqueTeachers = allTeachers.filter(
        (teacher, index, self) =>
          index === self.findIndex(t => t.id === teacher.id)
      );
      return uniqueTeachers.sort((a, b) => a.name.localeCompare(b.name));
  }, [allTeachers]);
  
  const classNames = useMemo(() => {
    if (!allClassData) return [];
    return allClassData
      .map(c => c.id)
      .filter(name => {
          if (cursus === 'cap') return name.toLowerCase().includes('cap');
          return !name.toLowerCase().includes('cap');
      })
      .sort();
  }, [allClassData, cursus]);

  const studentsInClass = useMemo(() => {
    if (!selectedClass || !allClassData) return [];
    const classData = allClassData.find(c => c.id === selectedClass);
    return classData?.studentNames.sort((a:string,b:string) => a.localeCompare(b)) || [];
  }, [selectedClass, allClassData]);

  useEffect(() => {
    if (isLoaded) {
      const teacherFromUrl = searchParams.get('teacher') || '';
      const classFromUrl = searchParams.get('class') || '';
      const studentFromUrl = searchParams.get('student') || '';

      if (teacherFromUrl) setSelectedTeacher(teacherFromUrl);
      if(classFromUrl) setSelectedClass(classFromUrl);
      if (studentFromUrl) setSelectedStudent(studentFromUrl);
    }
  }, [searchParams, isLoaded]);

  const handleTeacherChange = (newTeacher: string) => {
    setSelectedTeacher(newTeacher);
    // Potentially reset class and student if teacher changes
    setSelectedClass('');
    setSelectedStudent('');
  };

  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass);
    setSelectedStudent('');
  };

  const handleStudentChange = (newStudent: string) => {
    setSelectedStudent(newStudent);
  };

  const handleSubmit = () => {
    if (selectedStudent && selectedClass && selectedTeacher) {
      const params = new URLSearchParams();
      params.set('teacher', selectedTeacher);
      params.set('class', selectedClass);
      params.set('student', selectedStudent);
      params.set('cursus', cursus);
      router.push(`/student?${params.toString()}`);
    }
  };

  if (!isLoaded) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
        <div className="space-y-2">
            <Label htmlFor="teacher-select" className="font-bold">Enseignant</Label>
            <Select onValueChange={handleTeacherChange} value={selectedTeacher}>
                <SelectTrigger id="teacher-select">
                    <SelectValue placeholder="Choisir un enseignant..." />
                </SelectTrigger>
                <SelectContent>
                    {teachers.map(teacher => (
                        <SelectItem key={teacher.id} value={teacher.name}>{teacher.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="class-select" className="font-bold">Classe</Label>
          <Select onValueChange={handleClassChange} value={selectedClass} disabled={!selectedTeacher}>
            <SelectTrigger id="class-select">
              <SelectValue placeholder="Choisir une classe..." />
            </SelectTrigger>
            <SelectContent>
              {classNames.map(className => (
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
              {studentsInClass.map((studentName: string) => (
                <SelectItem key={studentName} value={studentName}>
                  {studentName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={!selectedStudent || !selectedClass || !selectedTeacher}
          className="w-full font-bold"
        >
          Valider
        </Button>
    </div>
  );
}
