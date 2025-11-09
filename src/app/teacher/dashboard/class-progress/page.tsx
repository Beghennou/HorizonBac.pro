

'use client';
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { getTpsByNiveau, Niveau } from '@/lib/data-manager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, Clock, X, CheckSquare, Loader2, AlertTriangle, BookOpen, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ClassProgressPage() {
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const { firestore, tps: allTps, assignedTps, assignTp, unassignTp, isLoaded: isFirebaseLoaded } = useFirebase();

    const currentClassName = searchParams.get('class');
    const level = (searchParams.get('level') as Niveau) || 'seconde';
    const [selectedTpIdToAssign, setSelectedTpIdToAssign] = useState<string>('');
    const [selectedTpIdToUnassign, setSelectedTpIdToUnassign] = useState<string>('');
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);


    const { data: classData, isLoading: isClassLoading } = useDoc(useMemoFirebase(() => {
      if (currentClassName && firestore) {
        return doc(firestore, 'classes', currentClassName);
      }
      return null;
    }, [currentClassName, firestore]));

    const studentsInClass = useMemo(() => {
        if (classData && classData.studentNames) {
            return (classData.studentNames as string[]).sort((a: string, b: string) => a.localeCompare(b));
        }
        return [];
    }, [classData]);

    const tpsForLevel = useMemo(() => getTpsByNiveau(level, allTps), [level, allTps]);

    const handleAssignTp = () => {
        if (selectedStudents.length > 0 && selectedTpIdToAssign) {
            assignTp(selectedStudents, parseInt(selectedTpIdToAssign, 10));
            setSelectedTpIdToAssign('');
            setSelectedStudents([]);
        }
    };
    
    const handleUnassignTp = () => {
        if (selectedStudents.length > 0 && selectedTpIdToUnassign) {
            unassignTp(selectedStudents, parseInt(selectedTpIdToUnassign, 10));
            setSelectedTpIdToUnassign('');
            setSelectedStudents([]);
        }
    }

    const handleSelectAll = (checked: boolean) => {
        setSelectedStudents(checked ? studentsInClass : []);
    };

    const handleStudentSelect = (studentName: string, checked: boolean) => {
        setSelectedStudents(prev => 
            checked ? [...prev, studentName] : prev.filter(name => name !== studentName)
        );
    };

    const studentProgressData = useMemo(() => {
        if (!studentsInClass || !assignedTps) return {};
        const progressMap: Record<string, Record<string, { status: string; date?: string }>> = {};

        studentsInClass.forEach(studentName => {
            progressMap[studentName] = {};
            const studentTps = assignedTps[studentName] || [];
            studentTps.forEach(assignedTp => {
                progressMap[studentName][assignedTp.id] = { status: assignedTp.status };
            });
        });
        
        return progressMap;
    }, [studentsInClass, assignedTps]);


    const allAssignedTpIdsInClass = useMemo(() => {
        const tpIdSet = new Set<number>();
        if(studentsInClass && assignedTps) {
            studentsInClass.forEach(studentName => {
                const studentTps = assignedTps[studentName] || [];
                studentTps.forEach(tp => tpIdSet.add(tp.id));
            });
        }
        return Array.from(tpIdSet).sort((a, b) => a - b);
    }, [studentsInClass, assignedTps]);


    const isLoading = isClassLoading || !isFirebaseLoaded;

    if (!currentClassName) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
                <h1 className="font-headline text-3xl tracking-wide text-destructive">Aucune classe sélectionnée</h1>
                <p className="text-muted-foreground text-lg mt-2 max-w-md">
                    Veuillez sélectionner une classe dans le menu de gauche pour afficher le suivi.
                </p>
            </div>
        )
    }
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }
    
    const StatusIcon = ({ status, date }: { status: string; date?: string }) => {
        let icon, tooltipText, className;

        switch (status) {
            case 'terminé':
                icon = <Check className="text-green-400" />;
                tooltipText = date ? `Évalué le ${date}` : 'Terminé, en attente d\'évaluation';
                className = date ? 'bg-green-500/20' : 'bg-blue-500/20';
                break;
            case 'en-cours':
                icon = <Clock className="text-yellow-400" />;
                tooltipText = 'En cours';
                className = 'bg-yellow-500/20';
                break;
             case 'à-refaire':
                icon = <AlertTriangle className="text-orange-400" />;
                tooltipText = 'À refaire';
                className = 'bg-orange-500/20';
                break;
            case 'non-commencé':
                icon = <X className="text-red-500" />;
                tooltipText = 'Non commencé';
                className = 'bg-red-500/20';
                break;
            default:
                icon = <span className="text-muted-foreground text-xs"></span>;
                tooltipText = 'Non assigné';
                className = 'bg-muted/10';
        }

        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <div className={cn("w-full h-full flex items-center justify-center rounded", className)}>
                            {icon}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{tooltipText}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="flex items-center gap-3 font-headline text-4xl">
                                <CheckSquare className="w-10 h-10 text-primary" />
                                Suivi de la Classe: {currentClassName}
                            </CardTitle>
                            <CardDescription>
                                Vue d'ensemble de la progression des élèves. Sélectionnez des élèves et un TP pour une assignation ou une suppression.
                            </CardDescription>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-muted-foreground">Assigner un nouveau TP :</p>
                                <div className="flex items-center gap-2">
                                    <Select onValueChange={setSelectedTpIdToAssign} value={selectedTpIdToAssign}>
                                        <SelectTrigger className="w-[350px]">
                                            <SelectValue placeholder="Choisir un TP à assigner..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {tpsForLevel.map(tp => (
                                                <SelectItem key={tp.id} value={tp.id.toString()}>TP {tp.id} - {tp.titre}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Button onClick={handleAssignTp} disabled={!selectedTpIdToAssign || selectedStudents.length === 0}>
                                        <BookOpen className="mr-2"/>
                                        Assigner ({selectedStudents.length})
                                    </Button>
                                </div>
                            </div>
                             <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-muted-foreground">Retirer un TP assigné :</p>
                                <div className="flex items-center gap-2">
                                    <Select onValueChange={setSelectedTpIdToUnassign} value={selectedTpIdToUnassign}>
                                        <SelectTrigger className="w-[350px]">
                                            <SelectValue placeholder="Choisir un TP à retirer..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {allAssignedTpIdsInClass.map(tpId => {
                                                const tp = allTps[tpId];
                                                return (
                                                    <SelectItem key={tpId} value={tpId.toString()}>TP {tpId} - {tp?.titre || 'Titre inconnu'}</SelectItem>
                                                )
                                            })}
                                        </SelectContent>
                                    </Select>
                                     <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" disabled={!selectedTpIdToUnassign || selectedStudents.length === 0}>
                                                <Trash2 className="mr-2"/>
                                                Retirer ({selectedStudents.length})
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Êtes-vous sûr de vouloir retirer ce TP ?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Cette action est irréversible. Le TP et toute progression associée seront supprimés pour les {selectedStudents.length} élèves sélectionnés.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleUnassignTp} className="bg-destructive hover:bg-destructive/90">Confirmer la suppression</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                   {studentsInClass.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-primary/30 rounded-lg">
                            <Users className="w-16 h-16 text-muted-foreground mb-4" />
                            <h2 className="font-headline text-2xl tracking-wide">Aucun élève dans cette classe</h2>
                            <p className="text-muted-foreground text-lg mt-2 max-w-md">
                                Vous pouvez ajouter des élèves depuis la page <span className="font-bold text-accent">Paramètres</span>.
                            </p>
                        </div>
                   ) : allAssignedTpIdsInClass.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-primary/30 rounded-lg">
                            <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
                            <h2 className="font-headline text-2xl tracking-wide">Aucun TP assigné</h2>
                            <p className="text-muted-foreground text-lg mt-2 max-w-md">
                                Utilisez le menu ci-dessus pour assigner le premier TP à cette classe.
                            </p>
                        </div>
                   ) : (
                       <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="sticky left-0 bg-card z-10 font-bold min-w-[200px]">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="select-all"
                                                    onCheckedChange={handleSelectAll}
                                                    checked={studentsInClass.length > 0 && selectedStudents.length === studentsInClass.length}
                                                />
                                                <label htmlFor="select-all">Élève</label>
                                            </div>
                                        </TableHead>
                                        {allAssignedTpIdsInClass.map(tpId => {
                                            const tp = allTps[tpId];
                                            return (
                                                <TableHead key={tpId} className="text-center min-w-[100px]">
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>TP {tpId}</TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>{tp?.titre || 'Titre non trouvé'}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {studentsInClass.map(studentName => (
                                        <TableRow key={studentName}>
                                            <TableCell className="sticky left-0 bg-card z-10 font-bold text-accent">
                                                <div className="flex items-center gap-2">
                                                    <Checkbox
                                                        id={studentName}
                                                        onCheckedChange={(checked) => handleStudentSelect(studentName, !!checked)}
                                                        checked={selectedStudents.includes(studentName)}
                                                    />
                                                    <label htmlFor={studentName}>{studentName}</label>
                                                </div>
                                            </TableCell>
                                            {allAssignedTpIdsInClass.map(tpId => {
                                                const progress = studentProgressData[studentName]?.[tpId.toString()];
                                                return (
                                                    <TableCell key={tpId} className="p-1 h-12">
                                                        <StatusIcon status={progress?.status || 'non-assigné'} date={progress?.date} />
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                       </div>
                   )}
                </CardContent>
            </Card>
        </div>
    );
}
