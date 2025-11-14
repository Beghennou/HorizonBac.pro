

'use client';

import React, { useMemo } from 'react';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ClipboardCheck, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';
import { doc, getDoc, collection } from 'firebase/firestore';


export default function TpsToEvaluatePage() {
    const { assignedTps, tps: allTps, classes, firestore } = useFirebase();
    const searchParams = useSearchParams();
    const selectedClassName = searchParams.get('class');

    const { data: storedEvalsByStudent } = useCollection(useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, `students`);
    }, [firestore]));

    const tpsToEvaluateByStudent = useMemo(() => {
        const result: Record<string, { tpId: number; titre: string; className: string }[]> = {};

        if (!selectedClassName || !classes || !assignedTps || !allTps) {
            return result;
        }

        const selectedClassData = classes.find(c => c.id === selectedClassName);
        if (!selectedClassData || !selectedClassData.studentNames) {
            return result;
        }

        const studentsInSelectedClass = selectedClassData.studentNames as string[];

        for (const studentName of studentsInSelectedClass) {
            const studentTps = assignedTps[studentName];
            if (studentTps) {
                const finishedTps = studentTps.filter(tp => {
                    if (tp.status !== 'terminé') return false;
                    
                    const studentEvalsDoc = storedEvalsByStudent?.find(s => s.id === studentName);
                    const evalData = studentEvalsDoc?.storedEvals?.[tp.id];
                    
                    // This logic is simplified. A real app might need a more robust way to check evaluations.
                    // For now, let's assume `storedEvals` is a subcollection we can't easily query this way.
                    // A better structure or more complex query would be needed.
                    // Let's rely on a more direct, albeit less performant check if needed.
                    
                    // We need a way to check if an evaluation for this student/tp exists and isFinal.
                    // The current data structure makes this hard without a direct fetch per TP.
                    // Let's assume for now the check will be done elsewhere or this logic needs improvement.
                    // The bug fix is to remove the async filter.
                    
                    return true; // Simplified: show all 'terminé' for now. The logic needs to be fixed.
                });

                if (finishedTps.length > 0) {
                    if (!result[studentName]) {
                        result[studentName] = [];
                    }
                    finishedTps.forEach(assignedTp => {
                        const tpDetail = allTps[assignedTp.id];
                        if (tpDetail) {
                            // Here we should ideally check against the actual storedEvals
                            result[studentName].push({
                                tpId: assignedTp.id,
                                titre: tpDetail.titre,
                                className: selectedClassName,
                            });
                        }
                    });
                }
            }
        }
        
        // This is a temporary filter until the data fetching is more robust
        if(storedEvalsByStudent) {
             Object.keys(result).forEach(studentName => {
                const studentData = storedEvalsByStudent.find(s => s.id === studentName);
                if (studentData && studentData.storedEvals) {
                    result[studentName] = result[studentName].filter(tp => {
                        const evalInfo = studentData.storedEvals[tp.tpId];
                        return !evalInfo || !evalInfo.isFinal;
                    });
                }
             });
        }
        
        // Final cleanup of students with no TPs left to evaluate
        Object.keys(result).forEach(studentName => {
            if (result[studentName].length === 0) {
                delete result[studentName];
            }
        });

        return result;
    }, [assignedTps, allTps, classes, selectedClassName, storedEvalsByStudent]);
    
    const studentCount = Object.keys(tpsToEvaluateByStudent).length;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-4xl">
                        <ClipboardCheck className="w-10 h-10 text-primary" />
                        TP à Évaluer
                    </CardTitle>
                    <CardDescription>
                        {selectedClassName 
                            ? `Liste des TP terminés pour la classe ${selectedClassName}.`
                            : `Veuillez sélectionner une classe pour voir les TP à évaluer.`
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {selectedClassName ? (
                        studentCount > 0 ? (
                            <Accordion type="multiple" className="w-full">
                                {Object.entries(tpsToEvaluateByStudent).map(([studentName, tps]) => (
                                    <AccordionItem value={studentName} key={studentName}>
                                        <AccordionTrigger className="text-xl font-headline hover:no-underline">
                                            <div className="flex items-center gap-4">
                                                <User className="w-6 h-6 text-accent" />
                                                <span>{studentName}</span>
                                                <Badge>{tps.length} TP à évaluer</Badge>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-2 pt-2 pl-4">
                                                {tps.map(({ tpId, titre }) => {
                                                    const params = new URLSearchParams(searchParams.toString());
                                                    return (
                                                        <div key={tpId} className="flex items-center justify-between p-3 rounded-md bg-background/50">
                                                            <div>
                                                                <p className="font-semibold text-primary">TP {tpId}</p>
                                                                <p>{titre}</p>
                                                            </div>
                                                            <Button asChild>
                                                              <Link href={`/teacher/dashboard/evaluate/${encodeURIComponent(studentName)}/${tpId}?${params.toString()}`}>Évaluer ce TP</Link>
                                                            </Button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        ) : (
                             <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-primary/30 rounded-lg">
                                <Clock className="w-16 h-16 text-muted-foreground mb-4" />
                                <h2 className="font-headline text-2xl tracking-wide">Tout est à jour</h2>
                                <p className="text-muted-foreground text-lg mt-2 max-w-md">
                                    Aucun travail n'est actuellement en attente d'évaluation pour cette classe.
                                </p>
                            </div>
                        )
                    ) : (
                         <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-primary/30 rounded-lg">
                            <h2 className="font-headline text-2xl tracking-wide">Aucune classe sélectionnée</h2>
                            <p className="text-muted-foreground text-lg mt-2 max-w-md">
                                Veuillez sélectionner une classe dans la barre latérale pour commencer.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
