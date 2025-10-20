'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { getTpById, competencesParNiveau, Niveau, allBlocs } from '@/lib/data-manager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, CheckSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';
const evaluationLevels: EvaluationStatus[] = ['NA', 'EC', 'A', 'M'];

export default function CompetencesPage() {
    const searchParams = useSearchParams();
    const { assignedTps } = useAssignments();

    const studentName = searchParams.get('student');
    const level = (searchParams.get('level') as Niveau) || 'seconde';
    const [selectedTpId, setSelectedTpId] = useState<number | null>(null);

    // Initialiser un état pour les évaluations
    // La structure est : { "C1.1": "A", "C1.2": "EC", ... }
    const [evaluations, setEvaluations] = useState<Record<string, EvaluationStatus>>({});

    const studentTpsIds = studentName ? assignedTps[studentName] || [] : [];
    const studentTps = studentTpsIds.map(id => getTpById(id)).filter(tp => tp !== undefined);

    const handleEvaluationChange = (competenceId: string, status: EvaluationStatus) => {
        setEvaluations(prev => ({
            ...prev,
            [competenceId]: status,
        }));
        // Ici, vous pourriez aussi sauvegarder l'évaluation dans une base de données
    };
    
    if (!studentName) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <User className="w-16 h-16 text-muted-foreground mb-4" />
                <h1 className="font-headline text-3xl tracking-wide">Aucun élève sélectionné</h1>
                <p className="text-muted-foreground text-lg mt-2">Veuillez d'abord sélectionner un élève dans l'onglet "Élèves".</p>
            </div>
        );
    }
    
    const selectedTp = selectedTpId ? getTpById(selectedTpId) : null;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline">
                        <CheckSquare /> Évaluation pour : <span className="text-accent">{studentName}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {studentTps.length > 0 ? (
                         <div className="flex items-center gap-4">
                            <span className="font-semibold">Sélectionner un TP à évaluer :</span>
                            <Select onValueChange={(value) => setSelectedTpId(parseInt(value))}>
                                <SelectTrigger className="w-[400px]">
                                    <SelectValue placeholder="Choisissez un TP assigné..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {studentTps.map(tp => tp && (
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
                        <CardTitle>Grille d'évaluation pour le TP {selectedTp.id}: <span className="text-accent">{selectedTp.titre}</span></CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {Object.values(allBlocs).map(bloc => (
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
                                                        variant={evaluations[id] === level ? 'default' : 'outline'}
                                                        size="sm"
                                                        className={cn(
                                                            "font-mono w-12",
                                                            evaluations[id] === level && 'bg-accent text-accent-foreground border-accent'
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
                </Card>
            )}
        </div>
    );
}
