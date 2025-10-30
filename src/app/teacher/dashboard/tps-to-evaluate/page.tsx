
'use client';

import React, { useMemo } from 'react';
import { useFirebase } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ClipboardCheck, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';

export default function TpsToEvaluatePage() {
    const { assignedTps, tps: allTps, classes, teacherName: currentTeacherName } = useFirebase();
    const searchParams = useSearchParams();
    const selectedClassName = searchParams.get('class');

    const tpsToEvaluateByStudent = useMemo(() => {
        const result: Record<string, { tpId: number; titre: string; className: string }[]> = {};

        if (!selectedClassName || !classes) {
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
                const finishedTps = studentTps.filter(tp => tp.status === 'terminé');

                if (finishedTps.length > 0) {
                    if (!result[studentName]) {
                        result[studentName] = [];
                    }
                    finishedTps.forEach(assignedTp => {
                        const tpDetail = allTps[assignedTp.id];
                        if (tpDetail) {
                            // On ne filtre plus par auteur du TP, on montre tous les TPs terminés de la classe sélectionnée.
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
        return result;
    }, [assignedTps, allTps, classes, selectedClassName, currentTeacherName]);

    const studentCount = Object.keys(tpsToEvaluateByStudent).length;
    const totalTpsCount = Object.values(tpsToEvaluateByStudent).reduce((acc, tps) => acc + tps.length, 0);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-4xl">
                        <ClipboardCheck className="w-10 h-10 text-primary" />
                        {totalTpsCount === 1 ? 'Travail Pratique à Évaluer' : 'Travaux Pratiques à Évaluer'}
                    </CardTitle>
                    <CardDescription>
                        {selectedClassName 
                            ? `Liste ${totalTpsCount === 1 ? 'du TP terminé' : 'des TPs terminés'} pour la classe ${selectedClassName}.`
                            : `Veuillez sélectionner une classe pour voir les TPs à évaluer.`
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
                                                <Badge>{tps.length} {tps.length === 1 ? 'TP à évaluer' : 'TPs à évaluer'}</Badge>
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
