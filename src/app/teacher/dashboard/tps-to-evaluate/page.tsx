
'use client';

import React, { useMemo } from 'react';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ClipboardCheck, User, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';
import { collection, doc } from 'firebase/firestore';

function TpToEvaluateItem({ studentName, tpId, titre }: { studentName: string, tpId: number, titre: string }) {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());

    return (
        <div className="flex items-center justify-between p-3 rounded-md bg-background/50">
            <div>
                <p className="font-semibold text-primary">TP {tpId}</p>
                <p>{titre}</p>
            </div>
            <Button asChild>
                <Link href={`/teacher/dashboard/evaluate/${encodeURIComponent(studentName)}/${tpId}?${params.toString()}`}>Évaluer ce TP</Link>
            </Button>
        </div>
    );
}


function StudentTpsToEvaluate({ studentName }: { studentName: string }) {
    const { firestore, assignedTps, tps: allTps } = useFirebase();

    // 1. Get all "storedEvals" for the student.
    const { data: storedEvals, isLoading: isLoadingEvals } = useCollection(
        useMemoFirebase(() => firestore ? collection(firestore, `students/${studentName}/storedEvals`) : null, [firestore, studentName])
    );

    // 2. Filter TPs based on status and evaluation status in a memoized calculation.
    const tpsToEvaluate = useMemo(() => {
        const studentFinishedTps = (assignedTps[studentName] || []).filter(tp => tp.status === 'terminé');
        if (!studentFinishedTps.length || !storedEvals) {
            return [];
        }

        const evaluatedTpIds = new Set(
            storedEvals.filter(ev => ev.isFinal).map(ev => parseInt(ev.id, 10))
        );

        return studentFinishedTps
            .filter(assignedTp => !evaluatedTpIds.has(assignedTp.id))
            .map(assignedTp => {
                const tpDetail = allTps[assignedTp.id];
                return tpDetail ? { tpId: assignedTp.id, titre: tpDetail.titre } : null;
            })
            .filter((tp): tp is { tpId: number, titre: string } => tp !== null);

    }, [assignedTps, studentName, allTps, storedEvals]);
    
    if (isLoadingEvals) {
         return (
            <AccordionItem value={studentName}>
                <AccordionTrigger className="text-xl font-headline hover:no-underline">
                     <div className="flex items-center gap-4">
                        <User className="w-6 h-6 text-accent" />
                        <span>{studentName}</span>
                        <Badge><Loader2 className="h-4 w-4 animate-spin"/></Badge>
                    </div>
                </AccordionTrigger>
            </AccordionItem>
        );
    }
    
    if (tpsToEvaluate.length === 0) {
        return null;
    }

    return (
        <AccordionItem value={studentName}>
            <AccordionTrigger className="text-xl font-headline hover:no-underline">
                <div className="flex items-center gap-4">
                    <User className="w-6 h-6 text-accent" />
                    <span>{studentName}</span>
                    <Badge>{tpsToEvaluate.length} TP à évaluer</Badge>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="space-y-2 pt-2 pl-4">
                    {tpsToEvaluate.map(tp => (
                        <TpToEvaluateItem
                            key={tp.tpId}
                            studentName={studentName}
                            tpId={tp.tpId}
                            titre={tp.titre}
                        />
                    ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

export default function TpsToEvaluatePage() {
    const { classes, isLoaded } = useFirebase();
    const searchParams = useSearchParams();
    const selectedClassName = searchParams.get('class');

    const studentsInSelectedClass = useMemo(() => {
        if (!selectedClassName || !classes) return [];
        const selectedClassData = classes.find(c => c.id === selectedClassName);
        return selectedClassData?.studentNames.sort() || [];
    }, [classes, selectedClassName]);
    
    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }

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
                            ? `Liste des TP terminés en attente d'évaluation pour la classe ${selectedClassName}.`
                            : `Veuillez sélectionner une classe pour voir les TP à évaluer.`
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {selectedClassName && studentsInSelectedClass.length > 0 ? (
                        <Accordion type="multiple" className="w-full">
                           {studentsInSelectedClass.map(studentName => (
                                <StudentTpsToEvaluate key={studentName} studentName={studentName} />
                            ))}
                        </Accordion>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-primary/30 rounded-lg">
                             <h2 className="font-headline text-2xl tracking-wide">
                                {selectedClassName ? "Aucun élève dans cette classe." : "Aucune classe sélectionnée"}
                            </h2>
                            <p className="text-muted-foreground text-lg mt-2 max-w-md">
                                {selectedClassName 
                                    ? "Ajoutez des élèves dans la page Paramètres pour commencer."
                                    : "Veuillez sélectionner une classe dans la barre latérale pour voir les TP à évaluer."
                                }
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
