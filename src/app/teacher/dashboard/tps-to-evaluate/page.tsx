
'use client';

import React, { useMemo } from 'react';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ClipboardCheck, User, Clock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';
import { doc } from 'firebase/firestore';

function TpToEvaluateItem({ studentName, tpId, titre, className }: { studentName: string, tpId: number, titre: string, className: string }) {
    const { firestore } = useFirebase();
    const searchParams = useSearchParams();

    // Vérifie si une évaluation finale existe déjà pour ce TP
    const { data: storedEval, isLoading } = useDoc(useMemoFirebase(
        () => firestore ? doc(firestore, `students/${studentName}/storedEvals`, tpId.toString()) : null,
        [firestore, studentName, tpId]
    ));

    // On n'affiche le TP que s'il n'a pas d'évaluation finale (isFinal is not true)
    if (isLoading || (storedEval && storedEval.isFinal)) {
        return null;
    }

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
    const { assignedTps, tps: allTps, classes } = useFirebase();
    const searchParams = useSearchParams();
    const selectedClassName = searchParams.get('class');

    const finishedTps = useMemo(() => {
        const studentTps = assignedTps[studentName];
        if (!studentTps) return [];
        return studentTps.filter(tp => tp.status === 'terminé');
    }, [assignedTps, studentName]);

    if (finishedTps.length === 0) {
        return null; // Pas besoin de rendre si aucun TP n'est terminé
    }

    const tpsForAccordion = finishedTps.map(assignedTp => {
        const tpDetail = allTps[assignedTp.id];
        return tpDetail ? {
            tpId: assignedTp.id,
            titre: tpDetail.titre,
            className: selectedClassName,
        } : null;
    }).filter(Boolean) as { tpId: number, titre: string, className: string | null }[];

    // Il faut un conteneur pour afficher les items et savoir s'il faut afficher l'accordéon
    const itemsToRender = tpsForAccordion.map(tp => (
        <TpToEvaluateItem
            key={tp.tpId}
            studentName={studentName}
            tpId={tp.tpId}
            titre={tp.titre}
            className={tp.className || ''}
        />
    ));
    
    // On enlève les nulls au cas où des TPs seraient déjà évalués
    const validItems = itemsToRender.filter(item => item !== null);
    
    if (validItems.length === 0) {
        return null;
    }

    return (
        <AccordionItem value={studentName}>
            <AccordionTrigger className="text-xl font-headline hover:no-underline">
                <div className="flex items-center gap-4">
                    <User className="w-6 h-6 text-accent" />
                    <span>{studentName}</span>
                    <Badge>{validItems.length} TP à évaluer</Badge>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="space-y-2 pt-2 pl-4">
                    {validItems}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

export default function TpsToEvaluatePage() {
    const { classes } = useFirebase();
    const searchParams = useSearchParams();
    const selectedClassName = searchParams.get('class');

    const studentsInSelectedClass = useMemo(() => {
        if (!selectedClassName || !classes) return [];
        const selectedClassData = classes.find(c => c.id === selectedClassName);
        return selectedClassData?.studentNames || [];
    }, [classes, selectedClassName]);
    
    const renderedStudents = studentsInSelectedClass.map(studentName => (
        <StudentTpsToEvaluate key={studentName} studentName={studentName} />
    ));

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
                    {selectedClassName ? (
                        <Accordion type="multiple" className="w-full">
                           {renderedStudents}
                        </Accordion>
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
