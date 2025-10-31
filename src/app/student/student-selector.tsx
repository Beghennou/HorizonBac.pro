
'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cursus } from '@/lib/data-manager';
import { Loader2 } from 'lucide-react';

export default function StudentSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { classes: allClassData, teachers: allTeachers, isLoaded: firebaseIsLoaded } = useFirebase();

  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  
  const cursus = (searchParams.get('cursus') as Cursus) || 'bacpro';

  const teachers = useMemo(() => {
    if (!allTeachers) return [];
    return allTeachers
      .filter(teacher => teacher.cursus === cursus)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [allTeachers, cursus]);
  
  const classNames = useMemo(() => {
    if (!allClassData) return [];
    return allClassData
      .filter(c => c.cursus === cursus)
      .map(c => c.id)
      .sort();
  }, [allClassData, cursus]);

  const studentsInClass = useMemo(() => {
    if (!selectedClass || !allClassData) return [];
    const classData = allClassData.find(c => c.id === selectedClass);
    return classData?.studentNames.sort((a:string,b:string) => a.localeCompare(b)) || [];
  }, [selectedClass, allClassData]);

  useEffect(() => {
    setIsClientLoaded(true);
    if (firebaseIsLoaded) {
      const teacherFromUrl = searchParams.get('teacher') || '';
      const classFromUrl = searchParams.get('class') || '';
      const studentFromUrl = searchParams.get('student') || '';

      if (teacherFromUrl && teachers.some(t => t.name === teacherFromUrl)) setSelectedTeacher(teacherFromUrl);
      if(classFromUrl && classNames.includes(classFromUrl)) setSelectedClass(classFromUrl);
      if (studentFromUrl) {
          const currentStudents = allClassData?.find(c => c.id === classFromUrl)?.studentNames || [];
          if (currentStudents.includes(studentFromUrl)) {
              setSelectedStudent(studentFromUrl);
          }
      }
    }
  }, [searchParams, firebaseIsLoaded, teachers, classNames, allClassData]);

  const handleTeacherChange = (newTeacher: string) => {
    setSelectedTeacher(newTeacher);
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

  const isLoading = !firebaseIsLoaded || !isClientLoaded;

  if (isLoading) {
    return <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="flex flex-col space-y-4">
        <div className="space-y-2">
            <Label htmlFor="teacher-select" className="font-bold text-left">Enseignant</Label>
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
          <Label htmlFor="class-select" className="font-bold text-left">Classe</Label>
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
          <Label htmlFor="student-select" className="font-bold text-left">Élève</Label>
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
