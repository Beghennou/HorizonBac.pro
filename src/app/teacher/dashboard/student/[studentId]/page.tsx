

'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname, useParams } from 'next/navigation';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { getTpById, allBlocs, TP, EtudePrelimQCM, EtudePrelimText } from '@/lib/data-manager';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, CheckSquare, Save, Mail, Bot, Loader2, MessageSquare, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { analyzeSkillGaps, SkillGapAnalysisOutput } from '@/ai/flows/skill-gap-analysis';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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

const AiAnalysisHub = ({ studentName, evaluations }: { studentName: string, evaluations: Record<string, EvaluationStatus[]> }) => {
    const [analysisResult, setAnalysisResult] = useState<SkillGapAnalysisOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleAnalysis}>
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

const PrelimCorrection = ({ tp, studentAnswers, studentFeedback, teacherFeedback, onFeedbackChange, onSave }: { 
    tp: TP; 
    studentAnswers: Record<number, string | string[]>;
    studentFeedback: string;
    teacherFeedback: string;
    onFeedbackChange: (feedback: string) => void;
    onSave: (note: string) => void;
}) => {
    const [correction, setCorrection] = useState<{ score: number, total: number, details: boolean[] } | null>(null);
    const [manualScore, setManualScore] = useState<string>("");

    useEffect(() => {
        if(correction) {
            setManualScore((correction.score / correction.total * 10).toFixed(1));
        } else {
            setManualScore("");
        }
    }, [correction]);


    const handleCorrection = () => {
        let score = 0;
        const details = tp.etudePrelim.map((question, index) => {
            const studentAnswer = studentAnswers[index];
            if (studentAnswer === undefined) return false;

            if (question.type === 'text') {
                const isCorrect = (studentAnswer as string).trim().toLowerCase() === question.r.toLowerCase();
                if(isCorrect) score++;
                return isCorrect;
            } else if (question.type === 'qcm') {
                const isCorrect = studentAnswer === question.r;
                if(isCorrect) score++;
                return isCorrect;
            }
            return false;
        });

        setCorrection({ score, total: tp.etudePrelim.length, details });
    };

    const getBorderColor = (isCorrect: boolean | undefined) => {
        if (isCorrect === true) return 'border-green-500';
        if (isCorrect === false) return 'border-destructive';
        return 'border-accent/30';
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Correction - Étude Préliminaire</CardTitle>
                    <div className="flex items-center gap-4">
                        {correction && (
                             <div className="flex items-center gap-2">
                                <Label htmlFor="note" className="text-xl font-bold font-headline">Note:</Label>
                                <Input 
                                    id="note"
                                    type="text" 
                                    value={manualScore} 
                                    onChange={(e) => setManualScore(e.target.value)}
                                    className="w-24 text-center text-xl font-bold font-headline text-accent bg-background"
                                />
                                <span className="text-xl font-bold font-headline">/ 10</span>
                            </div>
                        )}
                        <Button onClick={handleCorrection}><CheckSquare className="mr-2"/>Auto-correction</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {studentFeedback && (
                    <div className="p-4 border-l-2 border-sky-400 bg-background/50 rounded-r-lg">
                        <h4 className="font-bold flex items-center gap-2"><MessageSquare className="text-sky-400"/> Commentaire de l'élève :</h4>
                        <p className="mt-2 italic">"{studentFeedback}"</p>
                    </div>
                )}
                {tp.etudePrelim.map((item, i) => {
                     const studentAnswer = studentAnswers[i] || "Aucune réponse";
                     const isCorrect = correction?.details[i];
                     const correctAnswer = item.r;
                    return (
                        <div key={i} className={`p-4 border-l-4 bg-background/50 rounded-r-lg ${getBorderColor(isCorrect)}`}>
                            <p className="font-bold">Question {i+1}: {item.q}</p>
                            <div className="mt-2 pl-4">
                                <p className="text-sm text-muted-foreground">Réponse de l'élève :</p>
                                <p className="font-semibold italic">"{Array.isArray(studentAnswer) ? studentAnswer.join(', ') : studentAnswer}"</p>
                                {correction && !isCorrect && (
                                     <div className="mt-2">
                                        <p className="text-sm text-green-400">Réponse attendue :</p>
                                        <p className="font-semibold text-green-300 italic">"{correctAnswer}"</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
                <div className="p-4 border-t border-primary/20">
                     <Label htmlFor="teacher-feedback" className="font-bold flex items-center gap-2 mb-2"><MessageSquare className="text-accent"/>Feedback de l'enseignant :</Label>
                    <Textarea 
                        id="teacher-feedback"
                        placeholder="Ajoutez votre commentaire pour l'élève ici..."
                        value={teacherFeedback}
                        onChange={(e) => onFeedbackChange(e.target.value)}
                        rows={4}
                    />
                </div>
            </CardContent>
            <CardFooter>
                 <Button onClick={() => onSave(manualScore)} className="ml-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer l'évaluation
                </Button>
            </CardFooter>
        </Card>
    );
};


export default function StudentDetailPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useParams();
    const { toast } = useToast();
    const { students, assignedTps, evaluations: savedEvaluations, saveEvaluation, prelimAnswers, feedbacks, saveFeedback } = useAssignments();

    const studentName = typeof params.studentId === 'string' ? decodeURIComponent(params.studentId) : '';
    
    const [selectedTpId, setSelectedTpId] = useState<number | null>(null);
    const [currentEvaluations, setCurrentEvaluations] = useState<Record<string, EvaluationStatus>>({});

    const studentAssignedTps = (studentName ? assignedTps[studentName] || [] : []).map(assignedTp => {
        const tp = getTpById(assignedTp.id);
        return tp ? { ...tp, status: assignedTp.status } : null;
    }).filter((tp): tp is (TP & { status: string }) => tp !== null);

    useEffect(() => {
        const tpIdFromUrl = searchParams.get('tp');
        if (tpIdFromUrl) {
            setSelectedTpId(parseInt(tpIdFromUrl, 10));
        } else if (studentAssignedTps.length > 0) {
            const firstTpId = studentAssignedTps[0].id;
             setSelectedTpId(firstTpId);
        } else {
            setSelectedTpId(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentName, studentAssignedTps.length]);

    useEffect(() => {
        if (studentName && savedEvaluations[studentName]) {
            const latestEvals: Record<string, EvaluationStatus> = {};
            for (const competenceId in savedEvaluations[studentName]) {
                const history = savedEvaluations[studentName][competenceId];
                if (history && history.length > 0) {
                    latestEvals[competenceId] = history[history.length - 1];
                }
            }
            setCurrentEvaluations(latestEvals);
        } else {
            setCurrentEvaluations({});
        }
    }, [studentName, savedEvaluations, selectedTpId]);

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

    const handleSave = (note?: string) => {
        if (!studentName || !selectedTpId) return;

        const tp = getTpById(selectedTpId);
        if (!tp) return;

        saveEvaluation(studentName, selectedTpId, currentEvaluations, note);
        toast({
            title: "Évaluation enregistrée",
            description: `Les compétences pour ${studentName} ont été mises à jour.`,
        });
    };
    
    const selectedTp = selectedTpId ? getTpById(selectedTpId) : null;
    
    let currentBlocs: Record<string, any> = {};
    if (selectedTp) {
        if (selectedTp.id >= 301) { // Terminale
            currentBlocs = Object.fromEntries(Object.entries(allBlocs).filter(([key]) => key.startsWith('BLOC_3')));
        } else if (selectedTp.id >= 1) { // Premiere
            currentBlocs = Object.fromEntries(Object.entries(allBlocs).filter(([key]) => key.startsWith('BLOC_2')));
        }
        if (selectedTp.id >= 101 && selectedTp.id < 301) { // Seconde
             currentBlocs = Object.fromEntries(Object.entries(allBlocs).filter(([key]) => key.startsWith('BLOC_1')));
        }
    }
    
    const evaluatedCompetenceIds = selectedTp?.objectif.match(/C\d\.\d/g) || [];

    if (!studentName || !students.some(s => s.name === studentName)) {
        return (
             <div className="flex flex-col items-center justify-center h-64 text-center">
                <User className="w-16 h-16 text-muted-foreground mb-4" />
                <h1 className="font-headline text-3xl tracking-wide">Élève non trouvé</h1>
                <p className="text-muted-foreground text-lg mt-2">Veuillez retourner à la liste et sélectionner un élève.</p>
            </div>
        )
    }

    const studentFeedback = (selectedTpId && feedbacks[studentName]?.[selectedTpId]?.student) || '';
    const teacherFeedback = (selectedTpId && feedbacks[studentName]?.[selectedTpId]?.teacher) || '';
    
    const handleTeacherFeedbackChange = (feedback: string) => {
        if (studentName && selectedTpId) {
            saveFeedback(studentName, selectedTpId, feedback, 'teacher');
        }
    }

    const hasPrelimAnswers = selectedTp && prelimAnswers[studentName]?.[selectedTp.id] && Object.keys(prelimAnswers[studentName][selectedTp.id]).length > 0;
    const isTpDone = studentAssignedTps.find(tp => tp.id === selectedTpId)?.status === 'terminé';

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-3 font-headline">
                          <User className="w-6 h-6 text-primary" /> Dossier d'évaluation de : <span className="text-accent">{studentName}</span>
                      </CardTitle>
                      <AiAnalysisHub studentName={studentName} evaluations={savedEvaluations[studentName] || {}} />
                    </div>
                </CardHeader>
                <CardContent>
                    {studentAssignedTps.length > 0 ? (
                        <div className="flex items-center gap-4">
                            <span className="font-semibold">Sélectionner un TP assigné :</span>
                            <Select onValueChange={handleTpSelect} value={selectedTpId?.toString() || ""}>
                                <SelectTrigger className="w-[400px]">
                                    <SelectValue placeholder="Choisissez un TP..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {studentAssignedTps.map(tp => (
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
                <>
                    {isTpDone && hasPrelimAnswers && (
                        <PrelimCorrection 
                            tp={selectedTp} 
                            studentAnswers={prelimAnswers[studentName][selectedTp.id]}
                            studentFeedback={studentFeedback}
                            teacherFeedback={teacherFeedback}
                            onFeedbackChange={handleTeacherFeedbackChange}
                            onSave={handleSave}
                        />
                    )}

                    {isTpDone && !hasPrelimAnswers && (
                         <Card>
                             <CardHeader>
                                <CardTitle>Évaluation</CardTitle>
                             </CardHeader>
                             <CardContent>
                                 <p className="text-muted-foreground mb-4">Ce TP ne contient pas d'étude préliminaire notée. Vous pouvez évaluer les compétences et laisser un feedback.</p>
                                 <Label htmlFor="teacher-feedback" className="font-bold flex items-center gap-2 mb-2"><MessageSquare className="text-accent"/>Feedback de l'enseignant :</Label>
                                <Textarea 
                                    id="teacher-feedback"
                                    placeholder="Ajoutez votre commentaire pour l'élève ici..."
                                    value={teacherFeedback}
                                    onChange={(e) => handleTeacherFeedbackChange(e.target.value)}
                                    rows={4}
                                />
                             </CardContent>
                         </Card>
                    )}

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="flex items-center gap-2"><CheckSquare />Grille d'évaluation pour le TP {selectedTp.id}: <span className="text-accent">{selectedTp.titre}</span></CardTitle>
                                    {evaluatedCompetenceIds.length > 0 && (
                                        <CardDescription className="mt-2 flex gap-2 flex-wrap items-center">
                                            <span className="font-semibold">Compétences évaluées :</span>
                                            {evaluatedCompetenceIds.map(id => (
                                                <Badge key={id} variant="outline" className="border-accent text-accent font-semibold text-sm">
                                                    {id}
                                                </Badge>
                                            ))}
                                        </CardDescription>
                                    )}
                                </div>
                                <SendEmailButton tp={selectedTp} studentName={studentName} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {Object.keys(currentBlocs).length > 0 ? Object.values(currentBlocs).map((bloc: any) => (
                                <div key={bloc.title}>
                                    <h3 className={cn("font-headline text-xl p-3 rounded-t-md", bloc.colorClass)}>
                                        {bloc.title}
                                    </h3>
                                    <div className="border border-t-0 border-primary/30 rounded-b-md p-4 space-y-2 bg-card">
                                        {Object.entries(bloc.items).map(([id, description]: [string, any]) => {
                                            const isMainCompetence = evaluatedCompetenceIds.includes(id);
                                            return (
                                                <div 
                                                    key={id} 
                                                    className={cn(
                                                        "flex items-center justify-between p-3 rounded-md transition-all",
                                                        isMainCompetence 
                                                            ? "bg-accent/10 border-l-4 border-accent" 
                                                            : "bg-background/50"
                                                    )}
                                                >
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
                                            );
                                        })}
                                    </div>
                                </div>
                            )) : <p className="text-muted-foreground text-center py-8">Aucun bloc de compétences n'est défini pour ce niveau de TP.</p>}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => handleSave()} className="ml-auto" disabled={!isTpDone}>
                                <Save className="mr-2 h-4 w-4" />
                                Enregistrer les compétences
                            </Button>
                        </CardFooter>
                    </Card>
                </>
            )}
        </div>
    );
}

    

    
