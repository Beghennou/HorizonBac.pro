'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { students as allStudents } from '@/lib/mock-data';
import { classes, getTpsByNiveau, Niveau } from '@/lib/data-manager';
import { Badge } from '@/components/ui/badge';
import { BookCheck, ChevronDown, User, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export default function StudentsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const level = (searchParams.get('level') as Niveau) || 'seconde';
    const className = searchParams.get('class') || Object.keys(classes).find(c => c.startsWith('2')) || '2MV1';
    
    const studentNamesInClass = classes[className as keyof typeof classes] || [];
    
    // Correction de la logique de filtrage
    const studentsInClass = allStudents.filter(student => studentNamesInClass.includes(student.name));

    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    
    const [assignedTps, setAssignedTps] = useState<Record<string, number[]>>({
        'BAKHTAR Adam': [101], 
    });

    const { toast } = useToast();

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

        setAssignedTps(prev => {
            const newAssignedTps = { ...prev };
            selectedStudents.forEach(studentName => {
                const studentTps = newAssignedTps[studentName] || [];
                if (!studentTps.includes(tpId)) {
                    newAssignedTps[studentName] = [...studentTps, tpId];
                }
            });
            return newAssignedTps;
        });

        toast({
            title: "TP Assigné",
            description: `Le TP "${tpTitle}" a été assigné à ${selectedStudents.length} élève(s).`,
        });
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

    return (
      <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-3 font-headline">
                  <Users /> Sélectionner un ou plusieurs élèves de la classe : {className}
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
                {studentNamesInClass.length > 0 ? (
                  studentNamesInClass.map((studentName) => {
                    const isSelected = selectedStudents.includes(studentName);
                    const studentDetails = allStudents.find(s => s.name === studentName);

                    return (
                      <Card 
                        key={studentName} 
                        className={cn(
                          "p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all border-2",
                          isSelected ? "border-accent shadow-accent/50 shadow-lg" : "border-primary/20 hover:border-accent/70"
                        )}
                        onClick={() => handleStudentSelection(studentName, !isSelected)}
                      >
                        <div className="relative w-full">
                          <Checkbox
                              className="absolute top-1 left-1 z-10"
                              checked={isSelected}
                              onCheckedChange={(checked) => handleStudentSelection(studentName, !!checked)}
                          />
                          <h3 className="font-headline tracking-wide text-lg">{studentName}</h3>
                        </div>
                        {studentDetails && (
                          <div className="w-full mt-2">
                            <Progress value={studentDetails.progress} className="h-2 bg-muted/30" indicatorClassName="bg-gradient-to-r from-xp-color to-green-400" />
                            <p className="text-xs text-muted-foreground mt-1 font-mono">{studentDetails.progress * 100} XP</p>
                          </div>
                        )}
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