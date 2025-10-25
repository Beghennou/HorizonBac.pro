
'use client';

import React, { useMemo } from 'react';
import { useFirebase } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ClipboardCheck, User, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';

export default function TpsToEvaluatePage() {
    const { assignedTps, tps: allTps, classes } = useFirebase();
    const searchParams = useSearchParams();

    const tpsToEvaluateByStudent = useMemo(() => {
        const result: Record<string, { tpId: number; titre: string; className: string }[]> = {};

        // Create a map of studentName to className
        const studentClassMap: Record<string, string> = {};
        if (classes) {
            classes.forEach(c => {
                // Check if studentNames exists and is an array before iterating
                if (Array.isArray(c.studentNames)) {
                    (c.studentNames as string[]).forEach(studentName => {
                        studentClassMap[studentName] = c.id;
                    });
                }
            });
        }

        for (const studentName in assignedTps) {
            const studentTps = assignedTps[studentName];
            const finishedTps = studentTps.filter(tp => tp.status === 'terminé');

            if (finishedTps.length > 0) {
                if (!result[studentName]) {
                    result[studentName] = [];
                }
                finishedTps.forEach(assignedTp => {
                    const tpDetail = allTps[assignedTp.id];
                    if (tpDetail) {
                        result[studentName].push({
                            tpId: assignedTp.id,
                            titre: tpDetail.titre,
                            className: studentClassMap[studentName] || 'Classe inconnue',
                        });
                    }
                });
            }
        }
        return result;
    }, [assignedTps, allTps, classes]);

    const studentCount = Object.keys(tpsToEvaluateByStudent).length;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-4xl">
                        <ClipboardCheck className="w-10 h-10 text-primary" />
                        Travaux Pratiques à Évaluer
                    </CardTitle>
                    <CardDescription>
                        {studentCount > 0 
                            ? `Vous avez des TP à corriger pour ${studentCount} élève(s).`
                            : `Aucun travail pratique n'est actuellement en attente d'évaluation. Bravo !`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {studentCount > 0 ? (
                        <Accordion type="multiple" className="w-full">
                            {Object.entries(tpsToEvaluateByStudent).map(([studentName, tps]) => (
                                <AccordionItem value={studentName} key={studentName}>
                                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                                        <div className="flex items-center gap-4">
                                            <User className="w-6 h-6 text-accent" />
                                            <span>{studentName}</span>
                                            {tps.length > 0 && <Badge variant="secondary">{tps[0].className}</Badge>}
                                            <Badge>{tps.length} TP à évaluer</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-2 pt-2 pl-4">
                                            {tps.map(({ tpId, titre, className }) => {
                                                return (
                                                    <div key={tpId} className="flex items-center justify-between p-3 rounded-md bg-background/50">
                                                        <div>
                                                            <p className="font-semibold text-primary">TP {tpId}</p>
                                                            <p>{titre}</p>
                                                        </div>
                                                        <Button disabled>
                                                            Évaluation (bientôt disponible)
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
                                Revenez plus tard pour vérifier si de nouveaux travaux ont été soumis.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
