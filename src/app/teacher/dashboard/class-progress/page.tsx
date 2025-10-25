
'use client';
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFirebase, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { TP, getTpsByNiveau, Niveau } from '@/lib/data-manager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, Clock, X, CheckSquare, Loader2, AlertTriangle, BookOpen } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { doc } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ClassProgressPage() {
    const searchParams = useSearchParams();
    const { firestore, tps: allTps, assignedTps, assignTp, user } = useFirebase();

    const currentClassName = searchParams.get('class');
    const level = (searchParams.get('level') as Niveau) || 'seconde';
    const [selectedTpId, setSelectedTpId] = useState<string>('');


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

    const handleAssignTpToClass = () => {
        if (studentsInClass.length > 0 && selectedTpId) {
            assignTp(studentsInClass, parseInt(selectedTpId, 10));
            setSelectedTpId('');
        }
    }


    const studentProgressData = useMemo(() => {
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
        studentsInClass.forEach(studentName => {
            const studentTps = assignedTps[studentName] || [];
            studentTps.forEach(tp => tpIdSet.add(tp.id));
        });
        return Array.from(tpIdSet).sort((a, b) => a - b);
    }, [studentsInClass, assignedTps]);


    const isLoading = isClassLoading;

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
            case 'non-commencé':
                icon = <X className="text-red-500" />;
                tooltipText = 'Non commencé';
                className = 'bg-red-500/20';
                break;
            default:
                icon = null;
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
                                Vue d'ensemble de la progression des élèves.
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                             <Select onValueChange={setSelectedTpId} value={selectedTpId}>
                                <SelectTrigger className="w-[350px]">
                                    <SelectValue placeholder="Assigner un TP à toute la classe..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {tpsForLevel.map(tp => (
                                        <SelectItem key={tp.id} value={tp.id.toString()}>TP {tp.id} - {tp.titre}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={handleAssignTpToClass} disabled={!selectedTpId}>
                                <BookOpen className="mr-2"/>
                                Assigner
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                   <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="sticky left-0 bg-card z-10 font-bold min-w-[200px]">Élève</TableHead>
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
                                            {studentName}
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
                </CardContent>
            </Card>
        </div>
    );
}
