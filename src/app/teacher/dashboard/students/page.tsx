'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { getTpsByNiveau, Niveau } from '@/lib/data-manager';
import { ChevronDown, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useAssignments } from '@/contexts/AssignmentsContext';

export default function StudentsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { students, assignTp, classes } = useAssignments();
    const { toast } = useToast();

    const level = (searchParams.get('level') as Niveau) || 'seconde';
    const className = searchParams.get('class') || Object.keys(classes).find(c => c.startsWith('2')) || '2MV1';
    
    const studentNamesInClass = classes[className as keyof typeof classes] || [];
    const studentsInClass = students.filter(student => studentNamesInClass.includes(student.name));
    
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

    const tps = getTpsByNiveau(level);

    const handleAssignTpToSelected = (tpId: number, tpTitle: string) => {
        if (selectedStudents.length === 0) {
            toast({
                variant: 'destructive',
                title: "Aucun élève sélectionné",
                description: "Veuillez sélectionner au moins un élève pour assigner un TP.",
            });
            return;
        }

        assignTp(selectedStudents, tpId);

        toast({
            title: "TP Assigné",
            description: `Le TP "${tpTitle}" a été assigné à ${selectedStudents.length} élève(s).`,
        });
        setSelectedStudents([]);
    };
    
    const handleStudentSelection = (studentName: string, isSelected: boolean) => {
        setSelectedStudents(prev => {
            if (isSelected) {
                return [...prev, studentName];
            } else {
                return prev.filter(name => name !== studentName);
            }
        });
    };

    const handleCardClick = (studentName: string, e: React.MouseEvent<HTMLDivElement>) => {
      // Prevent navigation if clicking on checkbox
      if ((e.target as HTMLElement).closest('[role="checkbox"]')) {
        return;
      }
      
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('student', studentName);
      router.push(`/teacher/dashboard/student/${studentName}?${newSearchParams.toString()}`);
    }

    return (
      <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-3 font-headline">
                  <Users /> Élèves de la classe : {className}
                </CardTitle>
                {selectedStudents.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Assigner un TP à {selectedStudents.length} élève(s) <ChevronDown/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                            {tps.map(tp => (
                                <DropdownMenuItem key={tp.id} onSelect={() => handleAssignTpToSelected(tp.id, tp.titre)}>
                                    <span className="font-bold mr-2">TP {tp.id}</span>
                                    <span>{tp.titre}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {studentsInClass.length > 0 ? (
                  studentsInClass.map((student) => {
                    const studentName = student.name;
                    const isSelected = selectedStudents.includes(studentName);
                    
                    return (
                      <Card 
                        key={studentName} 
                        className={cn(
                          "p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all border-2",
                          "border-primary/20 hover:border-accent/70"
                        )}
                        onClick={(e) => handleCardClick(studentName, e)}
                      >
                        <div className="relative w-full flex justify-between items-start">
                           <h3 className="font-headline tracking-wide text-lg text-left">{studentName}</h3>
                          <Checkbox
                              className="z-10"
                              checked={isSelected}
                              onCheckedChange={(checked) => handleStudentSelection(studentName, !!checked)}
                              onClick={(e) => e.stopPropagation()} // Prevent card click
                          />
                        </div>
                        <div className="w-full mt-2">
                          <Progress value={student.progress} className="h-2 bg-muted/30" indicatorClassName="bg-gradient-to-r from-xp-color to-green-400" />
                          <p className="text-xs text-muted-foreground mt-1 font-mono">{student.xp || 0} XP</p>
                        </div>
                      </Card>
                    )
                  })
                ) : (
                  <p className="col-span-full text-center text-muted-foreground">Aucun élève trouvé pour cette classe.</p>
                )}
            </CardContent>
        </Card>
      </div>
    );
}
