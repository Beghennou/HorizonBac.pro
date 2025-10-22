
'use client';
import { useSearchParams } from 'next/navigation';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { allBlocs, Niveau } from '@/lib/data-manager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, Users, Target, BookOpen } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';

const statusToScore: Record<EvaluationStatus, number> = {
    'NA': 0, // Non Acquis
    'EC': 1, // En cours
    'A': 2,  // Acquis
    'M': 3,  // Maîtrisé
};
const MAX_SCORE = 3;

export default function AnalyticsPage() {
    const searchParams = useSearchParams();
    const { students, classes, evaluations } = useAssignments();
    
    const level = (searchParams.get('level') as Niveau) || 'seconde';
    const currentClassName = searchParams.get('class') || Object.keys(classes).find(c => c.startsWith('2')) || '2MV1';

    const studentNamesInClass = classes[currentClassName] || [];
    const studentsInClass = students.filter(s => studentNamesInClass.includes(s.name));

    // 1. Average Class Progression
    const totalProgress = studentsInClass.reduce((acc, student) => acc + (student.progress || 0), 0);
    const averageProgress = studentsInClass.length > 0 ? Math.round(totalProgress / studentsInClass.length) : 0;

    // 2. Competence Mastery
    const competenceScores: Record<string, { totalScore: number; count: number, description: string }> = {};
    const allCompetencesForLevel: Record<string, string> = {};
    Object.values(allBlocs).forEach(bloc => {
         Object.assign(allCompetencesForLevel, bloc.items);
    });

    studentNamesInClass.forEach(studentName => {
        const studentEvals = evaluations[studentName] || {};
        Object.entries(studentEvals).forEach(([competenceId, history]) => {
            if (history.length > 0) {
                if (!competenceScores[competenceId]) {
                    competenceScores[competenceId] = { totalScore: 0, count: 0, description: allCompetencesForLevel[competenceId] || competenceId };
                }
                const latestStatus = history[history.length - 1];
                competenceScores[competenceId].totalScore += statusToScore[latestStatus];
                competenceScores[competenceId].count++;
            }
        });
    });

    const competenceMasteryData = Object.entries(competenceScores).map(([id, data]) => ({
        id,
        name: data.description,
        mastery: Math.round((data.totalScore / (data.count * MAX_SCORE)) * 100),
    })).sort((a, b) => a.mastery - b.mastery);

    const top5Competences = [...competenceMasteryData].sort((a,b) => b.mastery - a.mastery).slice(0, 5);
    const bottom5Competences = competenceMasteryData.slice(0, 5);
    
    // 3. Class Comparison
    const classesForLevel = Object.keys(classes).filter(cName => {
        if (level === 'seconde') return cName.startsWith('2');
        if (level === 'premiere') return cName.startsWith('1');
        if (level === 'terminale') return cName.startsWith('T');
        return false;
    }).sort();

    const classComparisonData = classesForLevel.map(className => {
        const studentNames = classes[className] || [];
        const classStudents = students.filter(s => studentNames.includes(s.name));
        if (classStudents.length === 0) return { name: className, "Progression Moyenne": 0 };
        
        const total = classStudents.reduce((acc, s) => acc + (s.progress || 0), 0);
        return {
            name: className,
            "Progression Moyenne": Math.round(total / classStudents.length),
        };
    });


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
                </CardContent>
            </Card>

        </div>
    );
}
