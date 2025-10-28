
'use client';
import { useSearchParams } from 'next/navigation';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { allBlocs, Niveau } from '@/lib/data-manager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, Users, Target, BookOpen, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { doc } from 'firebase/firestore';
import React, { useMemo } from 'react';

type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';

const statusToScore: Record<EvaluationStatus, number> = {
    'NA': 0, // Non Acquis
    'EC': 1, // En cours
    'A': 2,  // Acquis
    'M': 3,  // Maîtrisé
};
const MAX_SCORE = 3;

function isEvaluationStatus(status: any): status is EvaluationStatus {
    return ['NA', 'EC', 'A', 'M'].includes(status);
}


export default function AnalyticsPage() {
    const searchParams = useSearchParams();
    const { firestore, evaluations: allEvaluations, classes: allClasses, isLoaded: isFirebaseLoaded } = useFirebase();

    const level = (searchParams.get('level') as Niveau) || 'seconde';
    const currentClassName = searchParams.get('class') || '';
    
    const { data: classData, isLoading: isClassLoading } = useDoc(useMemoFirebase(() => {
      if (currentClassName && firestore) {
        return doc(firestore, 'classes', currentClassName);
      }
      return null;
    }, [currentClassName, firestore]));

    const studentsInClass = useMemo(() => classData?.studentNames || [], [classData]);

    const averageProgress = 0; // This is a placeholder

    const competenceMasteryData = useMemo(() => {
        if (!isFirebaseLoaded || !studentsInClass || studentsInClass.length === 0 || !allEvaluations) {
            return [];
        }

        const competenceScores: Record<string, { totalScore: number; count: number, description: string }> = {};
        const allCompetencesForLevel: Record<string, string> = {};
        Object.values(allBlocs).forEach(bloc => {
            Object.assign(allCompetencesForLevel, bloc.items);
        });

        studentsInClass.forEach((studentName: string) => {
            const studentEvals = allEvaluations[studentName] || {};
            Object.entries(studentEvals).forEach(([competenceId, historyData]) => {
                const historyArray = (historyData as any)?.history || [];
                if (historyArray.length > 0) {
                    if (!competenceScores[competenceId]) {
                        competenceScores[competenceId] = { totalScore: 0, count: 0, description: allCompetencesForLevel[competenceId] || competenceId };
                    }
                    const latestStatus = historyArray[historyArray.length - 1];
                     if (isEvaluationStatus(latestStatus)) {
                        competenceScores[competenceId].totalScore += statusToScore[latestStatus];
                        competenceScores[competenceId].count++;
                    }
                }
            });
        });

        return Object.entries(competenceScores).map(([id, data]) => ({
            id,
            name: data.description,
            mastery: Math.round((data.totalScore / (data.count * MAX_SCORE)) * 100),
        })).sort((a, b) => a.mastery - b.mastery);

    }, [studentsInClass, allEvaluations, isFirebaseLoaded]);

    const top5Competences = useMemo(() => (competenceMasteryData ? [...competenceMasteryData].sort((a,b) => b.mastery - a.mastery).slice(0, 5) : []), [competenceMasteryData]);
    const bottom5Competences = useMemo(() => (competenceMasteryData ? competenceMasteryData.slice(0, 5) : []), [competenceMasteryData]);
    
    const classesForLevel = React.useMemo(() => (allClasses || []).map(c => c.id).filter(cName => {
        if (level === 'seconde') return cName.startsWith('2');
        if (level === 'premiere') return cName.startsWith('1');
        if (level === 'terminale') return cName.startsWith('T');
        return false;
    }).sort(), [level, allClasses]);


    const classComparisonData = classesForLevel.map(className => {
        return {
            name: className,
            "Progression Moyenne": 0,
        };
    });
    
    if (!isFirebaseLoaded || isClassLoading) {
        return (
             <div className="flex justify-center items-center h-full">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }
    
    if (!studentsInClass || studentsInClass.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <Users className="w-16 h-16 text-muted-foreground mb-4" />
                <h2 className="font-headline text-2xl tracking-wide">Aucun élève dans cette classe</h2>
                <p className="text-muted-foreground text-lg mt-2 max-w-md">
                    Ajoutez des élèves dans la page <span className="font-bold text-accent">Paramètres</span> pour voir les analyses.
                </p>
            </div>
        )
    }


    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-5xl tracking-wide flex items-center gap-4">
                    <BarChart3 className="w-12 h-12 text-primary" />
                    Analyses de la Classe
                </h1>
                <p className="text-muted-foreground mt-2">
                    Visualisez la progression et les compétences de la classe <span className="font-bold text-accent">{currentClassName}</span>.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users />Progression Moyenne de la Classe</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-4">
                        <div className="relative w-48 h-48">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                    className="text-muted/20"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                />
                                <path
                                    className="text-accent"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeDasharray={`${averageProgress}, 100`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-5xl font-bold font-headline text-accent">{averageProgress}%</span>
                            </div>
                        </div>
                         <p className="text-muted-foreground text-center">Moyenne de l'avancement global des élèves de la classe.</p>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BookOpen />Comparaison des Classes ({level})</CardTitle>
                        <CardDescription>Progression moyenne des classes du même niveau.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={classComparisonData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted)/0.3)" />
                                <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} unit="%" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        borderColor: 'hsl(var(--border))',
                                    }}
                                />
                                <Bar dataKey="Progression Moyenne" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Target />Maîtrise des Compétences</CardTitle>
                    <CardDescription>Visualisation du niveau de maîtrise moyen pour chaque compétence évaluée dans la classe.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   {competenceMasteryData && competenceMasteryData.length > 0 ? (
                        <>
                            <div>
                                <h3 className="font-bold text-lg text-green-400 mb-2">Top 5 des compétences les mieux maîtrisées</h3>
                                <div className="space-y-2">
                                {top5Competences.map(comp => (
                                    <div key={comp.id}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm">{comp.id} - {comp.name}</span>
                                            <span className="text-sm font-bold text-green-400">{comp.mastery}%</span>
                                        </div>
                                        <Progress value={comp.mastery} indicatorClassName="bg-green-500"/>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-destructive mb-2">Top 5 des compétences les moins bien maîtrisées</h3>
                                <div className="space-y-2">
                                {bottom5Competences.map(comp => (
                                    <div key={comp.id}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm">{comp.id} - {comp.name}</span>
                                            <span className="text-sm font-bold text-destructive">{comp.mastery}%</span>
                                        </div>
                                        <Progress value={comp.mastery} indicatorClassName="bg-destructive"/>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </>
                   ) : (
                       <p className="text-muted-foreground text-center py-8">Aucune donnée de compétence disponible pour cette classe. Veuillez évaluer quelques TPs pour commencer à voir des statistiques.</p>
                   )}
                </CardContent>
            </Card>

        </div>
    );
}
