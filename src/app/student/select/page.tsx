'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function SelectStudentPage() {
  const router = useRouter();
  const { classes } = useAssignments();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');

  const handleClassChange = (className: string) => {
    setSelectedClass(className);
    setSelectedStudent(''); // Reset student selection when class changes
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

  const studentNamesInClass = selectedClass ? classes[selectedClass] || [] : [];

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-accent">Accès Espace Élève</CardTitle>
          <CardDescription>Sélectionne ta classe puis ton nom pour accéder à tes travaux pratiques.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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

          
            <div className="space-y-2">
              <Label htmlFor="student-select">2. Sélectionne ton nom</Label>
              <Select onValueChange={handleStudentChange} value={selectedStudent} disabled={!selectedClass}>
                <SelectTrigger id="student-select">
                  <SelectValue placeholder="Sélectionne ton nom..." />
                </SelectTrigger>
                <SelectContent>
                  {studentNamesInClass.sort().map(studentName => (
                    <SelectItem key={studentName} value={studentName}>{studentName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          

          <Button 
            onClick={handleSubmit} 
            disabled={!selectedClass || !selectedStudent}
            className="w-full font-bold"
            size="lg"
          >
            Accéder à mes TP
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
