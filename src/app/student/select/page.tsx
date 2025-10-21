
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SelectStudentPage() {
  const router = useRouter();
  const { students, classes, isLoaded } = useAssignments();
  const [selectedStudent, setSelectedStudent] = useState<string>('');

  const handleSubmit = () => {
    if (selectedStudent) {
      // Find the class for the selected student
      const className = Object.keys(classes).find(key => classes[key].includes(selectedStudent));
      
      const params = new URLSearchParams({
        class: className || '',
        student: selectedStudent,
      });
      router.push(`/student?${params.toString()}`);
    }
  };

  if (!isLoaded) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    );
  }
  
  const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-accent">Accès Espace Élève</CardTitle>
          <CardDescription>Sélectionne ton nom dans la liste pour accéder à tes travaux pratiques.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-6">
          <div className="space-y-3">
            <Label className="font-bold text-lg">Sélectionne ton nom</Label>
            <ScrollArea className="h-72 w-full rounded-md border p-4">
              {sortedStudents.length > 0 ? (
                <RadioGroup value={selectedStudent} onValueChange={setSelectedStudent}>
                  {sortedStudents.map(student => (
                    <div key={student.id} className="flex items-center space-x-2 py-2">
                      <RadioGroupItem value={student.name} id={student.id} />
                      <Label htmlFor={student.id} className="text-base cursor-pointer">{student.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                 <p className="text-muted-foreground text-center py-4">Aucun élève n'est enregistré. Veuillez contacter votre enseignant.</p>
              )}
            </ScrollArea>
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
    </div>
  );
}
