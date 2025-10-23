
'use client';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from 'next/link';
import { collection, query, where } from 'firebase/firestore';
import { Student } from '@/lib/types';
import { TpStatus } from '@/firebase/provider';


const statusLabels: Record<TpStatus, string> = {
    'non-commencé': 'Non commencé',
    'en-cours': 'En cours',
    'terminé': 'Terminé',
}

export default function StudentsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { firestore, assignTp, tps: allTpsFromContext } = useFirebase();
    const { toast } = useToast();

    const level = (searchParams.get('level') as Niveau) || 'seconde';
    const className = searchParams.get('class') || '';

    // This state will hold student names for the selected class
    const [studentNamesInClass, setStudentNamesInClass] = useState<string[]>([]);
    
    // Fetch the class document to get student names
    const { data: classData, isLoading: isLoadingClass } = useCollection(
        useMemoFirebase(() => {
            if (!firestore || !className) return null;
            // This is not ideal as it fetches all classes. A direct doc get would be better.
            // Let's assume we can query by name for now, or get a single doc.
            // A better query: doc(firestore, 'classes', className) with useDoc
            return query(collection(firestore, 'classes'), where('__name__', '==', className));
        }, [firestore, className])
    );
    
    useEffect(() => {
        if (classData && classData.length > 0) {
            setStudentNamesInClass(classData[0].studentNames || []);
        } else {
            setStudentNamesInClass([]);
        }
    }, [classData]);

    const studentsQuery = useMemoFirebase(() => {
        if (!firestore || studentNamesInClass.length === 0) return null;
        return query(collection(firestore, 'students'), where('name', 'in', studentNamesInClass));
    }, [firestore, studentNamesInClass]);
    
    const { data: students, isLoading: isLoadingStudents } = useCollection<Student>(studentsQuery);
    
    const { data: assignedTpsData, isLoading: isLoadingAssignedTps } = useCollection(
        useMemoFirebase(() => {
          if (!firestore || !students || students.length === 0) return null;
          const studentNames = students.map(s => s.name);
          if (studentNames.length === 0) return null;
          return query(collection(firestore, 'assignedTps'), where('__name__', 'in', studentNames));
        }, [firestore, students])
    );
    
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    
    const studentsInClass = students || [];

    useEffect(() => {
        // Reset selection when class changes
        setSelectedStudents([]);
    }, [className]);
    
    const assignedTps = useMemo(() => {
        const tpsMap: Record<string, any> = {};
        if (assignedTpsData) {
            assignedTpsData.forEach(doc => {
                // This structure is incorrect based on the new logic.
                // It should be a subcollection.
                // Let's adapt to the expected structure for now.
                tpsMap[doc.id] = doc.tps; // Assuming 'tps' is an array field
            });
        }
        return tpsMap;
    }, [assignedTpsData]);


    const tpsForLevel = getTpsByNiveau(level, allTpsFromContext);
    const tpsIdsForCurrentLevel = new Set(tpsForLevel.map(tp => tp.id));

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
                            disabled={studentsInClass.length === 0}
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
                              {tpsForLevel.map(tp => (
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
                  {isLoadingClass || isLoadingStudents ? (
                    <p>Chargement des élèves...</p>
                  ) : studentsInClass.length > 0 ? (
                    studentsInClass.map((student) => {
                      const studentName = student.name;
                      const isSelected = selectedStudents.includes(studentName);
                      const studentAssignedTps = (assignedTps[studentName] || []).filter((assignedTp: any) => tpsIdsForCurrentLevel.has(assignedTp.id));
                      
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
                                      <p className="text-xs text-muted-foreground text-center mb-2">TP Assignés</p>
                                      <div className="flex flex-wrap gap-2 justify-center">
                                          <Tooltip>
                                              <TooltipTrigger asChild>
                                                  <div 
                                                    className="h-8 w-8 font-bold rounded-full flex items-center justify-center border border-primary/50 text-foreground/80"
                                                  >
                                                    {studentAssignedTps.length}
                                                  </div>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                  <p className="font-bold">{studentAssignedTps.length} TP assigné(s) pour ce niveau.</p>
                                                   <ul className="text-sm text-muted-foreground">
                                                      {studentAssignedTps.map((assignedTp: any) => {
                                                          const tp = allTpsFromContext[assignedTp.id];
                                                          if (!tp) return null;
                                                          return <li key={tp.id}>TP {tp.id}: {statusLabels[assignedTp.status]}</li>
                                                      })}
                                                  </ul>
                                              </TooltipContent>
                                          </Tooltip>
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
