
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, MessageSquare, User, AlertTriangle, Users, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import Papa from 'papaparse';
import { useToast } from '@/hooks/use-toast';


function ExportDialog({ students, tps, className }: { students: string[], tps: any, className: string | null }) {
    const [date, setDate] = useState<DateRange | undefined>();
    const { firestore } = useFirebase();
    const { toast } = useToast();
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (!date || !date.from || !date.to) {
            toast({ variant: 'destructive', title: 'Veuillez sélectionner une plage de dates.' });
            return;
        }
        if (!students || students.length === 0) {
             toast({ variant: 'destructive', title: 'Aucun élève dans la classe sélectionnée.' });
             return;
        }

        setIsExporting(true);

        try {
            const allEvalsForClass: any[] = [];
            // Fetch evaluations for each student in the class
            for (const studentName of students) {
                const evalsRef = collection(firestore, `students/${studentName}/storedEvals`);
                const evalsSnapshot = await getDocs(query(
                    evalsRef, 
                    where('isFinal', '==', true)
                ));
                
                evalsSnapshot.forEach(doc => {
                    const evalData = doc.data();
                    let evalDate: Date | null = null;
                    try {
                        // Handle date parsing for "DD/MM/YYYY" format
                        evalDate = parse(evalData.date, 'dd/MM/yyyy', new Date());
                    } catch (e) {
                       // ignore invalid date
                    }

                    if (evalDate && evalDate >= date.from! && evalDate <= date.to!) {
                        allEvalsForClass.push({
                            studentName,
                            tpId: parseInt(doc.id, 10),
                            tpNote: evalData.tpNote,
                            ...evalData
                        });
                    }
                });
            }

            if (allEvalsForClass.length === 0) {
                alert("Aucune note à exporter pour la période sélectionnée.");
                setIsExporting(false);
                return;
            }

            const uniqueTps = [...new Map(allEvalsForClass.map(item => [item.tpId, {id: item.tpId, titre: tps[item.tpId]?.titre || `TP ${item.tpId}`}])).values()].sort((a,b) => a.id - b.id);
            const headers = ['Élève', ...uniqueTps.map(tp => tp.titre)];
            
            const dataForCsv = students.map(studentName => {
                const studentRow: Record<string, any> = { 'Élève': studentName };
                uniqueTps.forEach(tp => {
                     const studentEval = allEvalsForClass.find(ev => ev.studentName === studentName && ev.tpId === tp.id);
                     studentRow[tp.titre] = studentEval ? studentEval.tpNote : '';
                });
                return studentRow;
            });

            const csv = Papa.unparse(dataForCsv, {
                columns: headers,
                delimiter: ';',
            });

            const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `export_notes_${className}_${format(new Date(), 'yyyy-MM-dd')}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } catch (error) {
            console.error("Error exporting data: ", error);
            toast({ variant: 'destructive', title: 'Erreur lors de l\'exportation', description: 'Une erreur est survenue. Veuillez réessayer.' });
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter pour Pronote
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Exporter les notes</DialogTitle>
                    <DialogDescription>
                        Sélectionnez la plage de dates pour l'exportation. Seules les notes des évaluations finalisées seront incluses.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date?.from ? (
                                    date.to ? (
                                        <>
                                            {format(date.from, "dd LLL y", { locale: fr })} - {format(date.to, "dd LLL y", { locale: fr })}
                                        </>
                                    ) : (
                                        format(date.from, "dd LLL y", { locale: fr })
                                    )
                                ) : (
                                    <span>Choisir une période</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                locale={fr}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <Button onClick={handleExport} disabled={!date || !date.from || !date.to || isExporting}>
                    {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                    Générer et Télécharger le CSV
                </Button>
            </DialogContent>
        </Dialog>
    );
}


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
    const { classes, tps, isLoaded: firebaseIsLoaded } = useFirebase();
    const currentClassName = searchParams.get('class');

    const studentsInClass = useMemo(() => {
        if (!currentClassName || !classes) return [];
        const selectedClassData = classes.find(c => c.id === currentClassName);
        return selectedClassData?.studentNames.sort() || [];
    }, [classes, currentClassName]);


    if (!firebaseIsLoaded) {
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
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle className="flex items-center gap-3 font-headline text-4xl">
                                <MessageSquare className="w-10 h-10 text-primary" />
                                Synthèse des Évaluations : {currentClassName}
                            </CardTitle>
                            <CardDescription>
                                Retrouvez ici un résumé de toutes les notes et appréciations pour chaque élève de la classe.
                            </CardDescription>
                        </div>
                        <ExportDialog students={studentsInClass} tps={tps} className={currentClassName} />
                    </div>
                </CardHeader>
                <CardContent>
                    {!firebaseIsLoaded ? (
                         <div className="flex justify-center items-center h-64">
                            <Loader2 className="w-12 h-12 animate-spin text-primary" />
                         </div>
                    ) : studentsInClass.length > 0 ? (
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
