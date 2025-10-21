'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

export default function SelectStudentPage() {
  const router = useRouter();
  const { classes } = useAssignments();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [studentNamesInClass, setStudentNamesInClass] = useState<string[]>([]);
  const areClassesLoaded = Object.keys(classes).length > 0;

  useEffect(() => {
    if (selectedClass && classes[selectedClass]) {
      setStudentNamesInClass(classes[selectedClass] || []);
    } else {
      setStudentNamesInClass([]);
    }
  }, [selectedClass, classes]);

  const handleClassChange = (className: string) => {
    setSelectedClass(className);
    setSelectedStudent('');
  };

  const handleStudentChange = (studentName: string) => {
    setSelectedStudent(studentName);
  };

  const handleSubmit = () => {
    if (selectedClass && selectedStudent) {
      const params = new URLSearchParams({
        class: selectedClass,
        student: selectedStudent,
      });
      router.push(`/student?${params.toString()}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-accent">Accès Espace Élève</CardTitle>
          <CardDescription>Sélectionne ta classe puis ton nom pour accéder à tes travaux pratiques.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-6">
          {!areClassesLoaded ? (
            <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">Chargement des classes...</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="class-select">1. Sélectionne ta classe</Label>
                <Select onValueChange={handleClassChange} value={selectedClass}>
                  <SelectTrigger id="class-select">
                    <SelectValue placeholder="Sélectionne ta classe..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(classes).sort().map(className => (
                      <SelectItem key={className} value={className}>{className}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedClass && (
                <div className="space-y-2">
                  <Label htmlFor="student-select">2. Sélectionne ton nom</Label>
                  <Select onValueChange={handleStudentChange} value={selectedStudent} disabled={studentNamesInClass.length === 0}>
                    <SelectTrigger id="student-select">
                      <SelectValue placeholder="Sélectionne ton nom..." />
                    </SelectTrigger>
                    <SelectContent>
                      {studentNamesInClass.length > 0 ? (
                        studentNamesInClass.sort().map(studentName => (
                          <SelectItem key={studentName} value={studentName}>{studentName}</SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-student" disabled>Aucun élève dans cette classe</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}

          <Button 
            onClick={handleSubmit} 
            disabled={!selectedClass || !selectedStudent}
            className="w-full font-bold mt-4"
            size="lg"
          >
            Accéder à mes TP
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
