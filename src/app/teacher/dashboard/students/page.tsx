

'use client';
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { TP, getTpsByNiveau, Niveau } from '@/lib/data-manager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, BookOpen, AlertTriangle, Trash2 } from 'lucide-react';
import { collection, doc } from 'firebase/firestore';
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
import { Separator } from '@/components/ui/separator';

export default function AssignTpsPage() {
    const searchParams = useSearchParams();
    const { firestore, assignTp, unassignTp, tps: allTps, classes, assignedTps } = useFirebase();

    const currentClassName = searchParams.get('class');
    const level = (searchParams.get('level') as Niveau) || 'seconde';

    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const [selectedTpId, setSelectedTpId] = useState<string>('');
    const [selectedTpIdToUnassign, setSelectedTpIdToUnassign] = useState<string>('');

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


    const handleSelectAll = (checked: boolean) => {
        setSelectedStudents(checked ? studentsInClass : []);
    };

    const handleStudentSelect = (studentName: string, checked: boolean) => {
        setSelectedStudents(prev => 
            checked ? [...prev, studentName] : prev.filter(name => name !== studentName)
        );
    };
    
    const handleAssignTp = () => {
        if (selectedStudents.length > 0 && selectedTpId) {
            assignTp(selectedStudents, parseInt(selectedTpId, 10));
            // Reset selections for clarity after action
            setSelectedStudents([]);
            setSelectedTpId('');
        }
    }
    
    const handleUnassignTp = () => {
        if (selectedStudents.length > 0 && selectedTpIdToUnassign) {
            unassignTp(selectedStudents, parseInt(selectedTpIdToUnassign, 10));
            // Reset selections for clarity after action
            setSelectedStudents([]);
            setSelectedTpIdToUnassign('');
        }
    }
    
    if (!currentClassName) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
                <h1 className="font-headline text-3xl tracking-wide text-destructive">Aucune classe sélectionnée</h1>
                <p className="text-muted-foreground text-lg mt-2 max-w-md">
                    Veuillez sélectionner une classe dans le menu de gauche pour assigner des travaux pratiques.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-4xl">
                        <Users className="w-10 h-10 text-primary" />
                        Gérer les TP de la classe : {currentClassName}
                    </CardTitle>
                    <CardDescription>
                        Sélectionnez des élèves, puis choisissez une action : assigner un nouveau TP ou retirer un TP existant.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="border p-4 rounded-lg bg-background/50">
                        <h3 className="font-bold text-lg mb-4">Étape 1 : Sélectionner des élèves</h3>
                        <div className="flex items-center space-x-2 mb-4">
                            <Checkbox
                                id="select-all"
                                onCheckedChange={handleSelectAll}
                                checked={studentsInClass.length > 0 && selectedStudents.length === studentsInClass.length}
                                disabled={studentsInClass.length === 0}
                            />
                            <label
                                htmlFor="select-all"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Tout sélectionner ({selectedStudents.length} / {studentsInClass.length})
                            </label>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {studentsInClass.map(studentName => (
                                <div key={studentName} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={studentName}
                                        onCheckedChange={(checked) => handleStudentSelect(studentName, !!checked)}
                                        checked={selectedStudents.includes(studentName)}
                                    />
                                    <label
                                        htmlFor={studentName}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {studentName}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <Separator />

                    <div className="border p-4 rounded-lg">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><BookOpen/>Étape 2 : Assigner un nouveau TP</h3>
                        <div className="flex items-center gap-4">
                             <Select onValueChange={setSelectedTpId} value={selectedTpId}>
                                <SelectTrigger className="w-full md:w-[500px]">
                                    <SelectValue placeholder="Sélectionner un TP..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {tpsForLevel.map(tp => (
                                        <SelectItem key={tp.id} value={tp.id.toString()}>TP {tp.id} - {tp.titre}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                onClick={handleAssignTp}
                                disabled={selectedStudents.length === 0 || !selectedTpId}
                            >
                                Assigner aux {selectedStudents.length} élèves
                            </Button>
                        </div>
                    </div>
                    
                     <div className="border border-destructive/50 p-4 rounded-lg">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-destructive"><Trash2 />Étape 2 (Alternative) : Retirer un TP</h3>
                        <div className="flex items-center gap-4">
                            <Select onValueChange={setSelectedTpIdToUnassign} value={selectedTpIdToUnassign}>
                                <SelectTrigger className="w-full md:w-[500px]">
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
                                        Retirer pour {selectedStudents.length} élèves
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

                </CardContent>
            </Card>
        </div>
    );
}
