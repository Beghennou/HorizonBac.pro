'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { getTpById, allBlocs, TP } from '@/lib/data-manager';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, CheckSquare, Users, Save, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';
const evaluationLevels: EvaluationStatus[] = ['NA', 'EC', 'A', 'M'];

const SendEmailButton = ({ tp, studentName }: { tp: TP | null, studentName: string | null }) => {
    const { students } = useAssignments();
    
    if (!tp || !studentName) return null;

    const student = students.find(s => s.name === studentName);

    const handleSendEmail = () => {
        if (!student || !student.email) {
            alert("Impossible de trouver l'e-mail de l'élève.");
            return;
        }

        const subject = `Votre Fiche TP: ${tp.titre}`;
        const body = `Bonjour ${student.name},\n\nVeuillez trouver ci-joint un lien vers votre fiche de travail pratique (TP) pour la session "${tp.titre}".\n\nObjectif: ${tp.objectif}\n\nVous pouvez consulter la fiche et vous préparer pour l'atelier.\n\nCordialement.`;

        window.location.href = `mailto:${student.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <Button onClick={handleSendEmail} variant="outline" size="sm" disabled={!student}>
            <Mail className="mr-2 h-4 w-4" />
            Renvoyer le TP par E-mail
        </Button>
    );
};


export default function CompetencesPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const { students, assignedTps, evaluations: savedEvaluations, saveEvaluation, classes } = useAssignments();

    const studentName = searchParams.get('student');
    const className = searchParams.get('class') || Object.keys(classes).find(c => c.startsWith('2')) || '2MV1';
    
    const [selectedTpId, setSelectedTpId] = useState<number | null>(null);
    const [currentEvaluations, setCurrentEvaluations] = useState<Record<string, EvaluationStatus>>({});

    const studentNamesInClass = classes[className as keyof typeof classes] || [];
    const studentsInClass = students.filter(student => studentNamesInClass.includes(student.name));

    const studentTpsIds = studentName ? assignedTps[studentName] || [] : [];
    const studentTps = studentTpsIds.map(id => getTpById(id)).filter((tp): tp is TP => tp !== undefined);

    useEffect(() => {
        if (studentName) {
            setCurrentEvaluations(savedEvaluations[studentName] || {});
        } else {
            setCurrentEvaluations({});
            setSelectedTpId(null);
        }
    }, [studentName, savedEvaluations]);

    useEffect(() => {
        if (!studentTps.some(tp => tp.id === selectedTpId)) {
            setSelectedTpId(null);
        }
    }, [studentTps, selectedTpId]);

    const handleEvaluationChange = (competenceId: string, status: EvaluationStatus) => {
        setCurrentEvaluations(prev => ({
            ...prev,
            [competenceId]: status,
        }));
    };

    const handleStudentSelect = (studentNameToSelect: string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('student', studentNameToSelect);
        router.push(`${pathname}?${newSearchParams.toString()}`);
    }

    const handleSave = () => {
        if (!studentName || !selectedTpId) return;

        const tp = getTpById(selectedTpId);
        if (!tp) return;

        const tpCompetences: string[] = [];
        if (tp.id >= 101 && tp.id <= 137) { // Seconde
            Object.values(allBlocs).filter(b => b.title.includes('Bloc 1')).forEach(bloc => tpCompetences.push(...Object.keys(bloc.items)));
        } else if (tp.id >= 1 && tp.id <= 38) { // Premiere
             Object.values(allBlocs).filter(b => b.title.includes('Bloc 2')).forEach(bloc => tpCompetences.push(...Object.keys(bloc.items)));
        } else if (tp.id >= 100) { // Terminale
            Object.values(allBlocs).filter(b => b.title.includes('Bloc 3')).forEach(bloc => tpCompetences.push(...Object.keys(bloc.items)));
        }


        const evalsToSave = Object.fromEntries(
            Object.entries(currentEvaluations).filter(([competenceId]) => tpCompetences.includes(competenceId))
        );

        saveEvaluation(studentName, selectedTpId, evalsToSave);
        toast({
            title: "Évaluation enregistrée",
            description: `Les compétences pour ${studentName} ont été mises à jour.`,
        });
    };
    
    const selectedTp = selectedTpId ? getTpById(selectedTpId) : null;
    const currentBlocs = selectedTpId ? allBlocs : {};

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline">
                        <Users /> Élèves de la classe : <span className="text-accent">{className}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="flex items-center gap-4">
                        <span className="font-semibold">Sélectionner un élève à évaluer :</span>
                        <Select onValueChange={handleStudentSelect} value={studentName || ""}>
                            <SelectTrigger className="w-[400px]">
                                <SelectValue placeholder="Choisissez un élève..." />
                            </SelectTrigger>
                            <SelectContent>
                                {studentsInClass.map(student => (
                                    <SelectItem key={student.id} value={student.name}>
                                        {student.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {studentName ? (
                <>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 font-headline">
                            <CheckSquare /> Évaluation pour : <span className="text-accent">{studentName}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {studentTps.length > 0 ? (
                            <div className="flex items-center gap-4">
                                <span className="font-semibold">Sélectionner un TP assigné :</span>
                                <Select onValueChange={(value) => setSelectedTpId(parseInt(value))} value={selectedTpId?.toString() || ""}>
                                    <SelectTrigger className="w-[400px]">
                                        <SelectValue placeholder="Choisissez un TP..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {studentTps.map(tp => (
                                            <SelectItem key={tp.id} value={tp.id.toString()}>
                                                TP {tp.id} - {tp.titre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <p className="text-muted-foreground">Aucun TP n'est assigné à cet élève. Veuillez lui en assigner depuis l'onglet "Élèves".</p>
                        )}
                    </CardContent>
                </Card>

                {selectedTp && (
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Grille d'évaluation pour le TP {selectedTp.id}: <span className="text-accent">{selectedTp.titre}</span></CardTitle>
                                <SendEmailButton tp={selectedTp} studentName={studentName} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {Object.values(currentBlocs).map(bloc => (
                                <div key={bloc.title}>
                                    <h3 className={cn("font-headline text-2xl p-3 rounded-t-md text-white", bloc.colorClass)}>
                                        {bloc.title}
                                    </h3>
                                    <div className="border border-t-0 border-primary/30 rounded-b-md p-4 space-y-2 bg-card">
                                        {Object.entries(bloc.items).map(([id, description]) => (
                                            <div key={id} className="flex items-center justify-between p-3 bg-background/50 rounded-md">
                                                <div className="flex items-baseline gap-4">
                                                    <span className="font-mono text-accent font-bold">{id}:</span>
                                                    <p>{description}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    {evaluationLevels.map(level => (
                                                        <Button
                                                            key={level}
                                                            variant={currentEvaluations[id] === level ? 'default' : 'outline'}
                                                            size="sm"
                                                            className={cn(
                                                                "font-mono w-12",
                                                                currentEvaluations[id] === level && 'bg-accent text-accent-foreground border-accent'
                                                            )}
                                                            onClick={() => handleEvaluationChange(id, level)}
                                                        >
                                                            {level}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSave} className="ml-auto">
                                <Save className="mr-2 h-4 w-4" />
                                Enregistrer l'évaluation
                            </Button>
                        </CardFooter>
                    </Card>
                )}
                </>
            ) : (
                 <div className="flex flex-col items-center justify-center h-64 text-center">
                    <User className="w-16 h-16 text-muted-foreground mb-4" />
                    <h1 className="font-headline text-3xl tracking-wide">Aucun élève sélectionné</h1>
                    <p className="text-muted-foreground text-lg mt-2">Veuillez d'abord sélectionner un élève ci-dessus.</p>
                </div>
            )}
        </div>
    );
}
