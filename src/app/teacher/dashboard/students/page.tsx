'use client';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { getTpsByNiveau, Niveau } from '@/lib/data-manager';
import { ChevronDown, Users, BookOpen } from 'lucide-react';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from 'next/link';

export default function StudentsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { students, assignTp, classes, assignedTps, evaluations } = useAssignments();
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
    
    const handleSelectAll = (isSelected: boolean) => {
        if (isSelected) {
            setSelectedStudents(studentsInClass.map(s => s.name));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleCardClick = (studentName: string, e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('[role="checkbox"]') || (e.target as HTMLElement).closest('a')) {
        return;
      }
      
      const newSearchParams = new URLSearchParams(searchParams.toString());
      router.push(`/teacher/dashboard/student/${encodeURIComponent(studentName)}?${newSearchParams.toString()}`);
    }

    const allStudentsSelected = selectedStudents.length > 0 && selectedStudents.length === studentsInClass.length;

    return (
      <TooltipProvider>
        <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-3 font-headline">
                    <Users /> Suivi de la classe : {className}
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="select-all"
                            checked={allStudentsSelected}
                            onCheckedChange={handleSelectAll}
                        />
                        <label htmlFor="select-all" className="text-sm font-medium">Tout sélectionner</label>
                    </div>
                    {selectedStudents.length > 0 && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="outline">
                                  Assigner un TP ({selectedStudents.length}) <ChevronDown/>
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
                  </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {studentsInClass.length > 0 ? (
                    studentsInClass.map((student) => {
                      const studentName = student.name;
                      const isSelected = selectedStudents.includes(studentName);
                      const studentAssignedTps = assignedTps[studentName] || [];
                      const studentEvaluations = evaluations[studentName] || {};
                      
                      return (
                        <Card 
                          key={studentName} 
                          className={cn(
                            "p-4 flex flex-col justify-between cursor-pointer transition-all border-2",
                            isSelected ? "border-accent shadow-accent/40 shadow-lg" : "border-primary/20 hover:border-accent/70"
                          )}
                          onClick={(e) => handleCardClick(studentName, e)}
                        >
                          <div className="flex justify-between items-start mb-2">
                             <h3 className="font-headline tracking-wide text-lg">{studentName}</h3>
                            <Checkbox
                                className="z-10"
                                checked={isSelected}
                                onCheckedChange={(checked) => handleStudentSelection(studentName, !!checked)}
                                onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          
                          <div className="space-y-2 flex-grow">
                              <div className="w-full">
                                <p className="text-xs text-muted-foreground text-center mb-1">Progression Globale</p>
                                <Progress value={student.progress} className="h-2 bg-muted/30" indicatorClassName="bg-gradient-to-r from-xp-color to-green-400" />
                                <p className="text-xs text-muted-foreground mt-1 font-mono text-center">{student.xp || 0} XP</p>
                              </div>
                              {studentAssignedTps.length > 0 && (
                                  <div>
                                      <p className="text-xs text-muted-foreground text-center mb-2">TPs Assignés</p>
                                      <div className="flex flex-wrap gap-2 justify-center">
                                          {studentAssignedTps.map(tpId => {
                                               const tp = getTpsByNiveau(level).find(t => t.id === tpId);
                                               if (!tp) return null;
                                               
                                               const isEvaluated = Object.keys(studentEvaluations).some(competenceId => 
                                                tp && (getTpsByNiveau(level).find(t => t.id === tp.id)?.etudePrelim.some(p => `prelim-${tp.id}-${p.q}` === competenceId) || 
                                                getTpsByNiveau(level).find(t => t.id === tp.id)?.activitePratique.flatMap(ap => ap.etapes).includes(competenceId))
                                               );

                                               const hasEvaluationData = tp.id in (evaluations[studentName] || {});


                                              return (
                                              <Tooltip key={tpId}>
                                                  <TooltipTrigger asChild>
                                                      <Button 
                                                        variant="outline"
                                                        size="icon"
                                                        className={cn("h-8 w-8", hasEvaluationData ? "border-green-500 bg-green-500/10 text-green-400" : "border-primary/50" )}
                                                        asChild
                                                      >
                                                        <Link href={`/teacher/dashboard/student/${encodeURIComponent(studentName)}?${new URLSearchParams({...Object.fromEntries(searchParams.entries()), tp: tpId.toString()})}`} onClick={(e) => e.stopPropagation()}>
                                                          {tp.id % 100}
                                                        </Link>
                                                      </Button>
                                                  </TooltipTrigger>
                                                  <TooltipContent>
                                                      <p className="font-bold">TP {tp.id}: {tp.titre}</p>
                                                      <p className="text-sm text-muted-foreground">{hasEvaluationData ? "Évaluation commencée" : "Non commencé"}</p>
                                                  </TooltipContent>
                                              </Tooltip>
                                              )
                                          })}
                                      </div>
                                  </div>
                              )}
                          </div>
                        </Card>
                      )
                    })
                  ) : (
                    <p className="col-span-full text-center text-muted-foreground py-12">Aucun élève trouvé pour cette classe. Vous pouvez en ajouter dans les <Link href={`/teacher/dashboard/settings?${searchParams.toString()}`} className="underline text-accent">paramètres</Link>.</p>
                  )}
              </CardContent>
          </Card>
        </div>
      </TooltipProvider>
    );
}
