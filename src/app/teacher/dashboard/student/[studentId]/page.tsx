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


export default function StudentDetailPage({ params }: { params: { studentId: string } }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { toast } = useToast();
    const { students, assignedTps, evaluations: savedEvaluations, saveEvaluation, classes } = useAssignments();

    const studentName = decodeURIComponent(params.studentId);
    
    const [selectedTpId, setSelectedTpId] = useState<number | null>(null);
    const [currentEvaluations, setCurrentEvaluations] = useState<Record<string, EvaluationStatus>>({});

    const studentTpsIds = studentName ? assignedTps[studentName] || [] : [];
    const studentTps = studentTpsIds.map(id => getTpById(id)).filter((tp): tp is TP => tp !== undefined);

    useEffect(() => {
        const tpIdFromUrl = searchParams.get('tp');
        if (tpIdFromUrl) {
            setSelectedTpId(parseInt(tpIdFromUrl));
        }
    }, [searchParams]);

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
            setSelectedTpId(studentTps[0]?.id || null);
             const newSearchParams = new URLSearchParams(searchParams.toString());
             if (studentTps[0]) {
                newSearchParams.set('tp', studentTps[0].id.toString());
             } else {
                newSearchParams.delete('tp');
             }
             router.replace(`${pathname}?${newSearchParams.toString()}`);
        }
    }, [studentTps, selectedTpId, pathname, router, searchParams]);

    const handleEvaluationChange = (competenceId: string, status: EvaluationStatus) => {
        setCurrentEvaluations(prev => ({
            ...prev,
            [competenceId]: status,
        }));
    };

    const handleTpSelect = (tpId: string) => {
        const newTpId = parseInt(tpId);
        setSelectedTpId(newTpId);
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('tp', newTpId.toString());
        router.push(`${pathname}?${newSearchParams.toString()}`);
    }

    const handleSave = () => {
        if (!studentName || !selectedTpId) return;

        const tp = getTpById(selectedTpId);
        if (!tp) return;

        let tpCompetencesIds: string[] = [];
        const tpLevel = tp.id >= 1000 ? 'terminale' : tp.id >= 100 ? 'seconde' : 'premiere';
        
        if (tpLevel === 'seconde') {
             Object.values(allBlocs).filter(b => b.title.includes('Bloc 1')).forEach(bloc => tpCompetencesIds.push(...Object.keys(bloc.items)));
        } else if (tpLevel === 'premiere') {
            Object.values(allBlocs).filter(b => b.title.includes('Bloc 2')).forEach(bloc => tpCompetencesIds.push(...Object.keys(bloc.items)));
        } else if (tpLevel === 'terminale') {
            Object.values(allBlocs).filter(b => b.title.includes('Bloc 3')).forEach(bloc => tpCompetencesIds.push(...Object.keys(bloc.items)));
        }

        const evalsToSave = Object.fromEntries(
            Object.entries(currentEvaluations).filter(([competenceId]) => tpCompetencesIds.includes(competenceId))
        );

        saveEvaluation(studentName, selectedTpId, evalsToSave);
        toast({
            title: "Évaluation enregistrée",
            description: `Les compétences pour ${studentName} ont été mises à jour.`,
        });
    };
    
    const selectedTp = selectedTpId ? getTpById(selectedTpId) : null;
    let currentBlocs: Record<string, any> = {};
    if (selectedTp) {
        const tpLevel = selectedTp.id >= 1000 ? 'terminale' : selectedTp.id >= 100 ? 'seconde' : 'premiere';
        if (tpLevel === 'seconde') currentBlocs = Object.fromEntries(Object.entries(allBlocs).filter(([key]) => key.startsWith('BLOC_1')));
        else if (tpLevel === 'premiere') currentBlocs = Object.fromEntries(Object.entries(allBlocs).filter(([key]) => key.startsWith('BLOC_2')));
        else if (tpLevel === 'terminale') currentBlocs = Object.fromEntries(Object.entries(allBlocs).filter(([key]) => key.startsWith('BLOC_3')));
    }


    if (!studentName || !students.some(s => s.name === studentName)) {
        return (
             <div className="flex flex-col items-center justify-center h-64 text-center">
                <User className="w-16 h-16 text-muted-foreground mb-4" />
                <h1 className="font-headline text-3xl tracking-wide">Élève non trouvé</h1>
                <p className="text-muted-foreground text-lg mt-2">Veuillez retourner à la liste et sélectionner un élève.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline">
                        <CheckSquare /> Dossier d'évaluation de : <span className="text-accent">{studentName}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {studentTps.length > 0 ? (
                        <div className="flex items-center gap-4">
                            <span className="font-semibold">Sélectionner un TP assigné :</span>
                            <Select onValueChange={handleTpSelect} value={selectedTpId?.toString() || ""}>
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
                        {Object.values(currentBlocs).map((bloc: any) => (
                            <div key={bloc.title}>
                                <h3 className={cn("font-headline text-2xl p-3 rounded-t-md text-white", bloc.colorClass)}>
                                    {bloc.title}
                                </h3>
                                <div className="border border-t-0 border-primary/30 rounded-b-md p-4 space-y-2 bg-card">
                                    {Object.entries(bloc.items).map(([id, description]: [string, any]) => (
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
        </div>
    );
}
