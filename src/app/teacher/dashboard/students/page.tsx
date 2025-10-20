'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { students as allStudents } from '@/lib/mock-data';
import { classes, getTpsByNiveau, Niveau } from '@/lib/data-manager';
import { Badge } from '@/components/ui/badge';
import { BookCheck, Check, ChevronDown, User, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';


const StudentDetails = ({ student, level, assignedTps, onAssignTp }: { student: any, level: Niveau, assignedTps: number[], onAssignTp: (tpId: number, tpTitle: string) => void }) => {
    const tps = getTpsByNiveau(level);
    const { toast } = useToast();

    const handleAssign = (tpId: number, tpTitle: string) => {
        onAssignTp(tpId, tpTitle);
        toast({
            title: "TP Assigné",
            description: `Le TP "${tpTitle}" a été assigné à ${student.name}.`,
        });
    };

    const assignedTpsDetails = assignedTps.map(id => {
        const tp = getTpsByNiveau('seconde').find(t => t.id === id) || getTpsByNiveau('premiere').find(t => t.id === id) || getTpsByNiveau('terminale').find(t => t.id === id);
        return tp ? { ...tp, status: 'Non commencé' } : null; // Statut mocké
    }).filter(Boolean);


    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 font-headline">
                    <User />
                    {student.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <p className="text-sm text-muted-foreground"><strong>Email:</strong> {student.email}</p>
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-xp-color">Progression</span>
                          <span className="font-mono text-sm text-xp-color">{student.progress * 100} XP</span>
                      </div>
                      <Progress value={student.progress} className="w-full bg-muted/50 h-3" indicatorClassName="bg-gradient-to-r from-xp-color to-green-400"/>
                    </div>
                </div>

                <div className="space-y-2">
                    <h4 className="font-headline text-accent tracking-wider">Assigner un TP</h4>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                Choisir un TP ({level}) <ChevronDown/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                            {tps.map(tp => (
                                <DropdownMenuItem key={tp.id} onSelect={() => handleAssign(tp.id, tp.titre)} disabled={assignedTps.includes(tp.id)}>
                                    <span className="font-bold mr-2">TP {tp.id}</span>
                                    <span>{tp.titre}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                
                <div className="space-y-4">
                     <h4 className="font-headline text-accent tracking-wider flex items-center gap-2"><BookCheck /> TPs Assignés</h4>
                     {assignedTpsDetails.length > 0 ? (
                        <div className="space-y-2">
                            {assignedTpsDetails.map(tp => tp && (
                                <div key={tp.id} className="flex justify-between items-center p-2 rounded-md bg-background/50">
                                    <p className="text-sm font-semibold">{tp.titre}</p>
                                    <Badge variant="secondary">{tp.status}</Badge>
                                </div>
                            ))}
                        </div>
                     ) : (
                        <p className="text-sm text-muted-foreground">Aucun TP assigné pour le moment.</p>
                     )}
                </div>

            </CardContent>
        </Card>
    );
};

export default function StudentsPage() {
    const searchParams = useSearchParams();
    const studentName = searchParams.get('student');
    const level = (searchParams.get('level') as Niveau) || 'seconde';
    const className = searchParams.get('class') || Object.keys(classes).find(c => c.startsWith('2')) || '2MV1';
    
    const studentNamesInClass = classes[className as keyof typeof classes] || [];
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
            selectedStudents.forEach(studentId => {
                const studentTps = newAssignedTps[studentId] || [];
                if (!studentTps.includes(tpId)) {
                    newAssignedTps[studentId] = [...studentTps, tpId];
                }
            });
            return newAssignedTps;
        });

        toast({
            title: "TP Assigné",
            description: `Le TP "${tpTitle}" a été assigné à ${selectedStudents.length} élève(s).`,
        });
    };
    
    const handleStudentSelection = (studentId: string, isSelected: boolean) => {
        setSelectedStudents(prev => {
            if (isSelected) {
                return [...prev, studentId];
            } else {
                return prev.filter(id => id !== studentId);
            }
        });
    };

    const selectedStudentDetails = allStudents.find(s => s.name === studentName);


    return (
      <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-3 font-headline">
                  <Users /> Sélectionner un ou plusieurs élèves
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
                {studentsInClass.sort((a,b) => b.progress - a.progress).map((student, index) => {
                  const isSelected = selectedStudents.includes(student.name);
                  return (
                    <Card 
                      key={student.id} 
                      className={cn(
                        "p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all border-2",
                        isSelected ? "border-accent shadow-accent/50 shadow-lg" : "border-primary/20 hover:border-accent/70"
                      )}
                      onClick={() => handleStudentSelection(student.name, !isSelected)}
                    >
                      <div className="relative w-full">
                        <Checkbox
                            className="absolute top-1 left-1 z-10"
                            checked={isSelected}
                            onCheckedChange={(checked) => handleStudentSelection(student.name, !!checked)}
                        />
                        <h3 className="font-headline tracking-wide text-lg">{student.name}</h3>
                      </div>
                      <div className="w-full mt-2">
                        <Progress value={student.progress} className="h-2 bg-muted/30" indicatorClassName="bg-gradient-to-r from-xp-color to-green-400" />
                        <p className="text-xs text-muted-foreground mt-1 font-mono">{student.progress * 100} XP</p>
                      </div>
                    </Card>
                  )
                })}
            </CardContent>
        </Card>
      </div>
    );
}