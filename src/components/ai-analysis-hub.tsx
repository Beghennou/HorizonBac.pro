
'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Bot, Loader2 } from 'lucide-react';
import { allBlocs } from '@/lib/data-manager';
import { analyzeSkillGaps, SkillGapAnalysisOutput } from '@/ai/flows/skill-gap-analysis';

type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';

export const AiAnalysisHub = ({ studentName, evaluations }: { studentName: string, evaluations: Record<string, EvaluationStatus[]> }) => {
    const [analysisResult, setAnalysisResult] = useState<SkillGapAnalysisOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleAnalysis = async () => {
        setIsLoading(true);
        setAnalysisResult(null);
        try {
            const competenceMap: Record<string, string> = {};
            Object.values(allBlocs).forEach(bloc => {
                Object.assign(competenceMap, bloc.items);
            });

            const latestEvaluations: Record<string, EvaluationStatus> = {};
            for (const competenceId in evaluations) {
                const history = evaluations[competenceId];
                if (history && history.length > 0) {
                    latestEvaluations[competenceId] = history[history.length - 1];
                }
            }

            const result = await analyzeSkillGaps({
                studentName,
                evaluationData: JSON.stringify(latestEvaluations),
                competenceMap: JSON.stringify(competenceMap),
            });
            setAnalysisResult(result);
        } catch (error) {
            console.error("AI analysis failed", error);
            setAnalysisResult({
                identifiedSkillGaps: ["Erreur lors de l'analyse."],
                suggestedLearningPaths: "L'analyse par l'IA n'a pas pu être complétée. Veuillez réessayer plus tard.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            handleAnalysis();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Bot className="mr-2 h-4 w-4" />
                    Analyser les compétences (IA)
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 font-headline text-2xl text-accent">
                        <Bot /> Hub d'Analyse IA pour {studentName}
                    </DialogTitle>
                    <DialogDescription>
                        L'IA identifie les lacunes de compétences et suggère des pistes de progression personnalisées.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-6">
                    {isLoading && (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span>Analyse en cours...</span>
                        </div>
                    )}
                    {analysisResult && (
                        <>
                            <div>
                                <h3 className="font-headline text-lg text-primary mb-2">Lacunes Identifiées</h3>
                                {analysisResult.identifiedSkillGaps.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-1 text-foreground/90">
                                        {analysisResult.identifiedSkillGaps.map((gap, index) => (
                                            <li key={index}>{gap}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-muted-foreground">Aucune lacune majeure identifiée. Bravo !</p>
                                )}
                            </div>
                            <div>
                                <h3 className="font-headline text-lg text-accent mb-2">Pistes de Progression Suggérées</h3>
                                <p className="text-foreground/90 bg-background/50 p-4 rounded-md border border-primary/20">
                                    {analysisResult.suggestedLearningPaths}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

    