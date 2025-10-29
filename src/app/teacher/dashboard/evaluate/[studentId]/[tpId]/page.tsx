
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { TP, EtudePrelimQCM, allBlocs } from '@/lib/data-manager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, Save, Send, User, Award, FileText, MessageSquare } from 'lucide-react';
import { collection } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';

const statusOptions: { value: EvaluationStatus, label: string, color: string }[] = [
    { value: 'NA', label: 'Non Acquis', color: 'text-red-400' },
    { value: 'EC', label: 'En Cours', color: 'text-yellow-400' },
    { value: 'A', label: 'Acquis', color: 'text-green-400' },
    { value: 'M', label: 'Maîtrisé', color: 'text-sky-400' },
];

export default function EvaluationPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const { firestore, tps, saveEvaluation, saveFeedback, user } = useFirebase();

    const studentName = decodeURIComponent(params.studentId as string);
    const tpId = parseInt(params.tpId as string, 10);
    const tp = tps[tpId];

    const [competenceEvals, setCompetenceEvals] = useState<Record<string, EvaluationStatus>>({});
    const [prelimNote, setPrelimNote] = useState('');
    const [tpNote, setTpNote] = useState('');
    const [teacherFeedback, setTeacherFeedback] = useState('');

    const { data: studentPrelimAnswers, isLoading: prelimLoading } = useCollection(useMemoFirebase(() => firestore && studentName && tpId ? collection(firestore, `students/${studentName}/prelimAnswers`) : null, [firestore, studentName, tpId]));
    const { data: studentFeedbacks, isLoading: feedbackLoading } = useCollection(useMemoFirebase(() => firestore && studentName && tpId ? collection(firestore, `students/${studentName}/feedbacks`) : null, [firestore, studentName, tpId]));

    const prelimAnswersForTp = useMemo(() => {
        const doc = studentPrelimAnswers?.find(d => d.id === tpId?.toString());
        return doc?.answers || {};
    }, [studentPrelimAnswers, tpId]);

    useEffect(() => {
        const doc = studentFeedbacks?.find(d => d.id === tpId?.toString());
        if (doc) {
            setTeacherFeedback(doc.tps.teacher || '');
        }
    }, [studentFeedbacks, tpId]);

    const evaluatedCompetenceIds = useMemo(() => tp.objectif.match(/C\d\.\d/g) || [], [tp]);

    const handleCompetenceChange = (competenceId: string, value: EvaluationStatus) => {
        setCompetenceEvals(prev => ({ ...prev, [competenceId]: value }));
    };

    const handleSave = (isFinal: boolean) => {
        if (Object.keys(competenceEvals).length !== evaluatedCompetenceIds.length) {
            toast({
                variant: 'destructive',
                title: 'Évaluation incomplète',
                description: 'Veuillez évaluer toutes les compétences avant de sauvegarder.',
            });
            return;
        }

        saveEvaluation(studentName, tpId, competenceEvals, prelimNote, tpNote, isFinal);
        saveFeedback(studentName, tpId, teacherFeedback, 'teacher');
        
        router.push('/teacher/dashboard/tps-to-evaluate');
    };

    if (!tp) {
        return <div className="text-center">TP non trouvé.</div>;
    }
    
    const isLoading = prelimLoading || feedbackLoading;
    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><Loader2 className="w-12 h-12 animate-spin text-primary" /></div>;
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-4xl">
                        <User className="w-8 h-8 text-primary"/>
                        Évaluation de {studentName}
                    </CardTitle>
                    <CardDescription className="text-lg">TP {tp.id}: {tp.titre}</CardDescription>
                </CardHeader>
            </Card>

            {tp.etudePrelim.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Réponses à l'Étude Préliminaire</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {tp.etudePrelim.map((item, index) => (
                            <div key={index} className="p-4 bg-background/50 rounded-lg">
                                <p className="font-bold">{index + 1}. {item.q}</p>
                                <p className="mt-2 text-green-400 italic">Réponse attendue : {item.r}</p>
                                <p className={cn("mt-2 p-2 rounded-md", prelimAnswersForTp[index] === item.r ? 'bg-green-500/20' : 'bg-red-500/20')}>
                                    <span className="font-bold">Réponse de l'élève : </span> 
                                    {prelimAnswersForTp[index] || <span className="italic text-muted-foreground">Pas de réponse</span>}
                                </p>
                            </div>
                        ))}
                         <div className="w-1/4 p-4 border rounded-lg bg-background/50">
                            <Label htmlFor="prelim-note">Note Étude Préliminaire / 10</Label>
                            <Input id="prelim-note" type="number" max="10" min="0" value={prelimNote} onChange={e => setPrelimNote(e.target.value)} />
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Award />Évaluation des Compétences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {evaluatedCompetenceIds.map(compId => {
                        const competence = Object.values(allBlocs).flatMap(bloc => Object.entries(bloc.items)).find(([id]) => id === compId);
                        if (!competence) return null;
                        
                        return (
                             <div key={compId} className="p-4 bg-background/50 rounded-lg">
                                <p className="font-bold">{compId}: {competence[1]}</p>
                                <RadioGroup
                                    className="flex gap-4 mt-2"
                                    onValueChange={(value) => handleCompetenceChange(compId, value as EvaluationStatus)}
                                    value={competenceEvals[compId]}
                                >
                                    {statusOptions.map(opt => (
                                         <div key={opt.value} className="flex items-center space-x-2">
                                            <RadioGroupItem value={opt.value} id={`${compId}-${opt.value}`} />
                                            <Label htmlFor={`${compId}-${opt.value}`} className={opt.color}>{opt.label}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MessageSquare />Feedback de l'Enseignant</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea 
                        placeholder="Appréciation globale, points d'amélioration, encouragements..." 
                        rows={5}
                        value={teacherFeedback}
                        onChange={e => setTeacherFeedback(e.target.value)}
                    />
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Note Globale du TP</CardTitle>
                </CardHeader>
                <CardContent className="w-1/4 p-4 border rounded-lg bg-background/50">
                    <Label htmlFor="tp-note">Note / 20</Label>
                    <Input id="tp-note" type="number" max="20" min="0" value={tpNote} onChange={e => setTpNote(e.target.value)} />
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                 <Button variant="outline" onClick={() => handleSave(false)}><Save className="mr-2"/>Enregistrer le brouillon</Button>
                 <Button onClick={() => handleSave(true)}><Send className="mr-2"/>Finaliser et Rendre l'évaluation</Button>
            </div>
        </div>
    );
}


    
