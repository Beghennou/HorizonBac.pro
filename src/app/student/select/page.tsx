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
  const { classes } = useAssignments();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [studentNamesInClass, setStudentNamesInClass] = useState<string[]>([]);
  const areClassesLoaded = Object.keys(classes).length > 0;

  useEffect(() => {
    if (selectedClass && areClassesLoaded) {
      setStudentNamesInClass(classes[selectedClass] || []);
    } else {
      setStudentNamesInClass([]);
    }
  }, [selectedClass, classes, areClassesLoaded]);

  const handleClassChange = (className: string) => {
    setSelectedClass(className);
    setSelectedStudent(''); // Reset student selection when class changes
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
              <div className="space-y-3">
                <Label className="font-bold text-lg">1. Sélectionne ta classe</Label>
                <ScrollArea className="h-48 w-full rounded-md border p-4">
                  <RadioGroup value={selectedClass} onValueChange={handleClassChange}>
                    {Object.keys(classes).sort().map(className => (
                      <div key={className} className="flex items-center space-x-2 py-2">
                        <RadioGroupItem value={className} id={className} />
                        <Label htmlFor={className} className="text-base cursor-pointer">{className}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </ScrollArea>
              </div>

              {selectedClass && (
                <div className="space-y-3">
                  <Label className="font-bold text-lg">2. Sélectionne ton nom</Label>
                   <ScrollArea className="h-48 w-full rounded-md border p-4">
                    {studentNamesInClass.length > 0 ? (
                      <RadioGroup value={selectedStudent} onValueChange={setSelectedStudent}>
                        {studentNamesInClass.sort().map(studentName => (
                          <div key={studentName} className="flex items-center space-x-2 py-2">
                            <RadioGroupItem value={studentName} id={studentName} />
                            <Label htmlFor={studentName} className="text-base cursor-pointer">{studentName}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                       <p className="text-muted-foreground text-center py-4">Aucun élève dans cette classe.</p>
                    )}
                  </ScrollArea>
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
