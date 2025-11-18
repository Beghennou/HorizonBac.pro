
'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, MessageSquare, User, AlertTriangle, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function StudentSummary({ studentName }: { studentName: string }) {
    const { firestore, tps: allTps } = useFirebase();

    const { data: storedEvals, isLoading: evalsLoading } = useCollection(
        useMemoFirebase(() => firestore ? collection(firestore, `students/${studentName}/storedEvals`) : null, [firestore, studentName])
    );
    const { data: feedbacks, isLoading: feedbacksLoading } = useCollection(
        useMemoFirebase(() => firestore ? collection(firestore, `students/${studentName}/feedbacks`) : null, [firestore, studentName])
    );

    const evaluatedTps = useMemo(() => {
        if (!storedEvals || !feedbacks) return [];
        
        const feedbackMap = new Map(feedbacks.map(f => [f.id, f.tps]));

        return storedEvals
            .filter(ev => ev.isFinal)
            .map(ev => {
                const tpId = parseInt(ev.id, 10);
                const tpDetails = allTps[tpId];
                const feedback = feedbackMap.get(ev.id);
                return {
                    tpId,
                    titre: tpDetails?.titre || `TP ${tpId} inconnu`,
                    prelimNote: ev.prelimNote,
                    tpNote: ev.tpNote,
                    studentFeedback: feedback?.student,
                    teacherFeedback: feedback?.teacher,
                };
            })
            .sort((a, b) => a.tpId - b.tpId);
    }, [storedEvals, feedbacks, allTps]);

    if (evalsLoading || feedbacksLoading) {
        return (
            <AccordionItem value={studentName} disabled>
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5" /> {studentName} <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                </AccordionTrigger>
            </AccordionItem>
        );
    }

    if (evaluatedTps.length === 0) {
        return null; // Don't show students with no evaluated TPs
    }

    return (
        <AccordionItem value={studentName}>
            <AccordionTrigger className="text-xl font-headline hover:no-underline">
                <div className="flex items-center gap-4">
                    <User className="w-6 h-6 text-accent" />
                    <span>{studentName}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[25%]">TP</TableHead>
                            <TableHead className="text-center">Note Étude</TableHead>
                            <TableHead className="text-center">Note TP</TableHead>
                            <TableHead>Commentaire Élève</TableHead>
                            <TableHead>Votre Appréciation</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {evaluatedTps.map(tp => (
                            <TableRow key={tp.tpId}>
                                <TableCell className="font-medium">{tp.titre}</TableCell>
                                <TableCell className="text-center font-bold text-accent">{tp.prelimNote ? `${tp.prelimNote} / 10` : 'N/A'}</TableCell>
                                <TableCell className="text-center font-bold text-primary">{tp.tpNote ? `${tp.tpNote} / 20` : 'N/A'}</TableCell>
                                <TableCell className="text-sm text-muted-foreground italic">"{tp.studentFeedback || 'Aucun'}"</TableCell>
                                <TableCell className="text-sm">"{tp.teacherFeedback || 'Aucune'}"</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </AccordionContent>
        </AccordionItem>
    );
}

export default function SummaryPage() {
    const searchParams = useSearchParams();
    const { firestore, classes, isLoaded } = useFirebase();
    const currentClassName = searchParams.get('class');

    const studentsInClass = useMemo(() => {
        if (!currentClassName || !classes) return [];
        const selectedClassData = classes.find(c => c.id === currentClassName);
        return selectedClassData?.studentNames.sort() || [];
    }, [classes, currentClassName]);

    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }
    
    if (!currentClassName) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
                <h1 className="font-headline text-3xl tracking-wide text-destructive">Aucune classe sélectionnée</h1>
                <p className="text-muted-foreground text-lg mt-2 max-w-md">
                    Veuillez sélectionner une classe dans le menu de gauche pour afficher la synthèse.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-4xl">
                        <MessageSquare className="w-10 h-10 text-primary" />
                        Synthèse des Évaluations : {currentClassName}
                    </CardTitle>
                    <CardDescription>
                        Retrouvez ici un résumé de toutes les notes et appréciations pour chaque élève de la classe.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {studentsInClass.length > 0 ? (
                        <Accordion type="multiple" className="w-full">
                            {studentsInClass.map(studentName => (
                                <StudentSummary key={studentName} studentName={studentName} />
                            ))}
                        </Accordion>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-primary/30 rounded-lg">
                            <Users className="w-16 h-16 text-muted-foreground mb-4" />
                            <h2 className="font-headline text-2xl tracking-wide">Aucun élève dans cette classe</h2>
                            <p className="text-muted-foreground text-lg mt-2 max-w-md">
                                Ajoutez des élèves dans la page <span className="font-bold text-accent">Paramètres</span> pour commencer.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
