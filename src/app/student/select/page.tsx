'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, UserCheck } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Student } from '@/lib/types';

function StudentSelector() {
  const router = useRouter();
  const { students, classes } = useAssignments();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [studentsInClass, setStudentsInClass] = useState<Student[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleStudentSelectInDialog = (studentName: string) => {
    setSelectedStudent(studentName);
    setIsDialogOpen(false);
  }

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
          <Label className="font-bold text-lg">2. Sélectionne ton nom</Label>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal" disabled={!selectedClass}>
                {selectedStudent ? <><UserCheck className="mr-2 h-4 w-4" />{selectedStudent}</> : "Choisir un élève..."}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sélectionne ton nom dans la classe {selectedClass}</DialogTitle>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto">
                {studentsInClass.length > 0 ? (
                  <div className="flex flex-col space-y-2">
                    {studentsInClass.map(student => (
                      <Button
                        key={student.id}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleStudentSelectInDialog(student.name)}
                      >
                        {student.name}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="p-4 text-sm text-muted-foreground">Aucun élève dans cette classe.</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
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
