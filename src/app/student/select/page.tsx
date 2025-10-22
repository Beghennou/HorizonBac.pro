'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Student } from '@/lib/types';

function StudentSelector() {
  const router = useRouter();
  const { students, classes } = useAssignments();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [studentsInClass, setStudentsInClass] = useState<Student[]>([]);

  useEffect(() => {
    if (selectedClass) {
      const studentNames = classes[selectedClass] || [];
      const filteredStudents = students
        .filter(student => studentNames.includes(student.name))
        .sort((a, b) => a.name.localeCompare(b.name));
      setStudentsInClass(filteredStudents);
      setSelectedStudent(''); // Reset student selection when class changes
    } else {
      setStudentsInClass([]);
    }
  }, [selectedClass, classes, students]);

  const handleSubmit = () => {
    if (selectedStudent) {
      const params = new URLSearchParams({
        class: selectedClass || '',
        student: selectedStudent,
      });
      router.push(`/student?${params.toString()}`);
    }
  };

  const sortedClasses = Object.keys(classes).sort();

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-accent">Accès Espace Élève</CardTitle>
        <CardDescription>Sélectionne ta classe puis ton nom pour accéder à tes travaux pratiques.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-6">
        <div className="space-y-3">
          <Label htmlFor="class-select" className="font-bold text-lg">1. Sélectionne ta classe</Label>
          <Select onValueChange={setSelectedClass} value={selectedClass}>
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

        <div className="space-y-3">
          <Label htmlFor="student-select" className="font-bold text-lg">2. Sélectionne ton nom</Label>
          <Select onValueChange={setSelectedStudent} value={selectedStudent} disabled={!selectedClass}>
            <SelectTrigger id="student-select" disabled={!selectedClass}>
              <SelectValue placeholder={selectedClass ? "Choisir un élève..." : "Sélectionne d'abord une classe"} />
            </SelectTrigger>
            <SelectContent>
              {studentsInClass.length > 0 ? (
                studentsInClass.map(student => (
                  <SelectItem key={student.id} value={student.name}>{student.name}</SelectItem>
                ))
              ) : (
                <div className="p-4 text-sm text-muted-foreground">Aucun élève dans cette classe.</div>
              )}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleSubmit} 
          disabled={!selectedStudent}
          className="w-full font-bold mt-4"
          size="lg"
        >
          Accéder à mes TP
        </Button>
      </CardContent>
    </Card>
  );
}

export default function SelectStudentPage() {
  const { isLoaded } = useAssignments();

  if (!isLoaded) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="ml-4 text-lg">Chargement des données...</p>
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <StudentSelector />
    </div>
  );
}
