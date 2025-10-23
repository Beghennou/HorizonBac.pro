
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { TP, EtudePrelimQCM, EtudePrelimText, allBlocs, competencesParNiveau, Niveau } from '@/lib/data-manager';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, CheckSquare, Save, Mail, Bot, Loader2, MessageSquare, Check, X, BookOpen, UserCircle, Award, Send, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { collection, query, where, doc, getDoc } from 'firebase/firestore';

const AiAnalysisHub = dynamic(() => import('@/components/ai-analysis-hub').then(mod => mod.AiAnalysisHub), {
    ssr: false,
    loading: () => <Button variant="outline" size="sm" disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" />Chargement IA...</Button>
});


type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';
const evaluationLevels: EvaluationStatus[] = ['NA', 'EC', 'A', 'M'];

const SendEmailButton = ({ tp, studentName }: { tp: TP | null, studentName: string | null }) => {
    // This component needs access to student data, which is no longer in the context.
    // It would need its own data fetching logic. For now, we'll disable it if data isn't passed in.
    
    if (!tp || !studentName) return null;

    const handleSendEmail = () => {
        // In a real app, you'd fetch the student's email here.
        alert("La fonctionnalité d'envoi d'e-mail n'est pas entièrement implémentée dans cette version.");
    };

    return (
        <Button onClick={handleSendEmail} variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Renvoyer le TP par E-mail
        </Button>
    );
};

const EvaluationCard = ({ 
    tp, 
    studentAnswers, 
    studentFeedback, 
    initialTeacherFeedback,
    initialPrelimNote,
    initialTpNote,
    onSave,
}: { 
    tp: TP; 
    studentAnswers: Record<number, string | string[]>;
    studentFeedback: string;
    initialTeacherFeedback: string;
    initialPrelimNote: string;
    initialTpNote: string;
    onSave: (prelimNote?: string, tpNote?: string, feedback?: string, isFinal?: boolean) => void;
}) => {
    const [correction, setCorrection] = useState<{ score: number, total: number, details: boolean[] } | null>(null);
    const [prelimNote, setPrelimNote] = useState<string>(initialPrelimNote);
    const [tpNote, setTpNote] = useState<string>(initialTpNote);
    const [teacherFeedback, setTeacherFeedback] = useState<string>(initialTeacherFeedback);

    useEffect(() => {
        setPrelimNote(initialPrelimNote);
        setTpNote(initialTpNote);
        setTeacherFeedback(initialTeacherFeedback);
    }, [initialPrelimNote, initialTpNote, initialTeacherFeedback]);


    useEffect(() => {
        if (correction) {
            setPrelimNote((correction.score / correction.total * 10).toFixed(1));
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
                    <CardTitle className="flex items-center gap-2"><Award className="text-accent"/>Évaluation du TP</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {tp.etudePrelim.length > 0 && (
                    <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-bold text-lg flex items-center gap-2"><BookOpen/>Correction - Étude Préliminaire</h4>
                            <div className="flex items-center gap-4">
                                {correction && (
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="prelim-note" className="text-lg font-bold">Note:</Label>
                                        <Input 
                                            id="prelim-note"
                                            type="text" 
                                            value={prelimNote} 
                                            onChange={(e) => setPrelimNote(e.target.value)}
                                            className="w-20 text-center text-lg font-bold text-accent bg-background"
                                        />
                                        <span className="text-lg font-bold">/ 10</span>
                                    </div>
                                )}
                                <Button onClick={handleCorrection} variant="outline" size="sm"><CheckSquare className="mr-2"/>Auto-correction</Button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {studentFeedback && (
                                <div className="p-4 border-l-2 border-sky-400 bg-background/50 rounded-r-lg">
                                    <h5 className="font-bold flex items-center gap-2"><MessageSquare className="text-sky-400"/> Commentaire de l'élève :</h5>
                                    <p className="mt-2 italic">"{studentFeedback}"</p>
                                </div>
                            )}
                            {tp.etudePrelim.map((item, i) => {
                                const studentAnswer = studentAnswers[i] || "Aucune réponse";
                                const isCorrect = correction?.details[i];
                                const correctAnswer = item.r;
                                return (
                                    <div key={i} className={`p-3 border-l-4 bg-background/50 rounded-r-lg ${getBorderColor(isCorrect)}`}>
                                        <p className="font-semibold">Question {i+1}: {item.q}</p>
                                        <div className="mt-1 pl-4">
                                            <p className="text-sm text-muted-foreground">Réponse de l'élève :</p>
                                            <p className="italic">"{Array.isArray(studentAnswer) ? studentAnswer.join(', ') : studentAnswer}"</p>
                                            {correction && !isCorrect && (
                                                <div className="mt-1">
                                                    <p className="text-sm text-green-400">Réponse attendue :</p>
                                                    <p className="font-semibold text-green-300 italic">"{correctAnswer}"</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
                
                <div className="p-4 border rounded-lg">
                    <h4 className="font-bold text-lg flex items-center gap-2 mb-4"><UserCircle/>Notation du Travail Pratique</h4>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                             <Label htmlFor="tp-note" className="font-bold text-lg flex items-center gap-2 mb-2">Note du TP</Label>
                             <div className="flex items-center gap-2">
                                <Input 
                                    id="tp-note"
                                    type="text" 
                                    value={tpNote} 
                                    onChange={(e) => setTpNote(e.target.value)}
                                    className="w-24 text-center text-xl font-bold font-headline text-accent bg-background"
                                    placeholder="??"
                                />
                                <span className="text-xl font-bold font-headline">/ 20</span>
                             </div>
                        </div>
                        <div>
                            <Label htmlFor="teacher-feedback" className="font-bold text-lg flex items-center gap-2 mb-2"><MessageSquare className="text-accent"/>Appréciation de l'enseignant</Label>
                            <Textarea 
                                id="teacher-feedback"
                                placeholder="Ajoutez votre commentaire global pour l'élève ici..."
                                value={teacherFeedback}
                                onChange={(e) => setTeacherFeedback(e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="gap-2">
                 <Button onClick={() => onSave(prelimNote, tpNote, teacherFeedback, false)} variant="outline" className="ml-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer le brouillon
                </Button>
                <Button onClick={() => onSave(prelimNote, tpNote, teacherFeedback, true)}>
                    <Send className="mr-2 h-4 w-4" />
                    Enregistrer et Rendre à l'élève
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
    const { 
        firestore, 
        classes,
        assignedTps,
        evaluations,
        storedEvals,
        prelimAnswers,
        feedbacks,
        saveEvaluation, 
        saveFeedback, 
        tps, 
        teacherName 
    } = useFirebase();

    const studentName = typeof params.studentId === 'string' ? decodeURIComponent(params.studentId) : '';
    const className = searchParams.get('class');
    
    // --- Data fetching is now mostly from context ---
    const studentsInClass = useMemo(() => (classes[className || ''] || []).sort(), [classes, className]);
    const isStudentInClass = useMemo(() => studentsInClass.includes(studentName), [studentsInClass, studentName]);

    // --- State management ---
    const [selectedTpId, setSelectedTpId] = useState<number | null>(null);
    const [currentEvaluations, setCurrentEvaluations] = useState<Record<string, EvaluationStatus>>({});

    const studentAssignedTps = useMemo(() => {
        return (assignedTps[studentName] || []).map(assignedTp => {
            const tp = tps[assignedTp.id];
            return tp ? { ...tp, status: assignedTp.status } : null;
        }).filter((tp): tp is (TP & { status: string }) => tp !== null);
    }, [assignedTps, studentName, tps]);
    
    const studentPrelimAnswers = prelimAnswers[studentName] || {};
    const studentFeedbacks = feedbacks[studentName] || {};
    const studentStoredEvals = storedEvals[studentName] || {};
    const studentLatestEvals = evaluations[studentName] || {};


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
    }, [studentName, studentAssignedTps, searchParams]);

    useEffect(() => {
        if (studentName && studentLatestEvals) {
            const latestEvals: Record<string, EvaluationStatus> = {};
            for (const competenceId in studentLatestEvals) {
                const history = studentLatestEvals[competenceId];
                if (history && history.length > 0) {
                    latestEvals[competenceId] = history[history.length - 1];
                }
            }
            setCurrentEvaluations(latestEvals);
        } else {
            setCurrentEvaluations({});
        }
    }, [studentName, studentLatestEvals, selectedTpId]);

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

    const handleStudentChange = (newStudentName: string) => {
        if (!newStudentName || newStudentName === studentName) return;
        const newPath = `/teacher/dashboard/student/${encodeURIComponent(newStudentName)}`;
        const newSearchParams = new URLSearchParams(searchParams.toString());
        router.push(`${newPath}?${newSearchParams.toString()}`);
    };

    const handleSave = (prelimNote?: string, tpNote?: string, feedback?: string, isFinal?: boolean) => {
        if (!studentName || !selectedTpId) return;

        if (feedback) {
            saveFeedback(studentName, selectedTpId, feedback, 'teacher');
        }
        
        saveEvaluation(studentName, selectedTpId, currentEvaluations, prelimNote, tpNote, isFinal);
    };
    
    const selectedTp = selectedTpId ? tps[selectedTpId] : null;
    
    let currentBlocs: Record<string, any> = {};
    if (selectedTp) {
        const niveau = selectedTp.id >= 1000 ? (selectedTp as any).niveau :
                       selectedTp.id >= 301 ? 'terminale' :
                       selectedTp.id >= 101 ? 'seconde' : 'premiere';
        
        if (competencesParNiveau[niveau]) {
             currentBlocs = competencesParNiveau[niveau];
        }
    }
    
    const evaluatedCompetenceIds = selectedTp?.objectif.match(/C\d\.\d/g) || [];


    if (!isStudentInClass) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
                <h1 className="font-headline text-3xl tracking-wide text-destructive">Accès non autorisé</h1>
                <p className="text-muted-foreground text-lg mt-2 max-w-md">
                    L'élève <strong>{studentName}</strong> ne fait pas partie de la classe <strong>{className}</strong> sélectionnée. Veuillez sélectionner un élève dans la liste déroulante ou retourner au suivi des classes.
                </p>
                 <div className="flex items-center gap-4 mt-8">
                      <div className="flex items-center gap-4">
                        <CardTitle className="flex items-center gap-3 font-headline">
                          <User className="w-6 h-6 text-primary" /> Changer d'élève :
                        </CardTitle>
                        {studentsInClass.length > 0 && (
                          <Select onValueChange={handleStudentChange} value={studentName}>
                            <SelectTrigger className="w-[300px] bg-card text-accent font-bold text-lg font-headline border-accent">
                              <SelectValue placeholder="Changer d'élève..." />
                            </SelectTrigger>
                            <SelectContent>
                              {studentsInClass.map(sName => (
                                <SelectItem key={sName} value={sName}>{sName}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                </div>
            </div>
        )
    }

    if (!studentName) {
        return (
             <div className="flex flex-col items-center justify-center h-64 text-center">
                <User className="w-16 h-16 text-muted-foreground mb-4" />
                <h1 className="font-headline text-3xl tracking-wide">Élève non trouvé</h1>
                <p className="text-muted-foreground text-lg mt-2">Veuillez retourner à la liste et sélectionner un élève.</p>
            </div>
        )
    }

    const assignedTp = studentAssignedTps.find(tp => tp.id === selectedTpId);
    const studentFeedback = (selectedTpId && studentFeedbacks[selectedTpId]?.student) || '';
    const savedEval = selectedTpId ? studentStoredEvals[selectedTpId] : undefined;
    const teacherFeedback = (selectedTpId && studentFeedbacks[selectedTpId]?.teacher) || '';
    
    const statusInfo = {
      'non-commencé': { text: 'Non commencé', className: 'bg-gray-500'},
      'en-cours': { text: 'En cours', className: 'bg-yellow-500'},
      'terminé': { text: 'Terminé (à évaluer)', className: 'bg-blue-500'},
    };
    const isEvaluated = !!savedEval?.isFinal;
    const currentStatus = isEvaluated ? {text: "Évalué et rendu", className: 'bg-green-600'} : statusInfo[assignedTp?.status as keyof typeof statusInfo];

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <CardTitle className="flex items-center gap-3 font-headline">
                          <User className="w-6 h-6 text-primary" /> Dossier d'évaluation de :
                        </CardTitle>
                        {studentsInClass.length > 0 && (
                          <Select onValueChange={handleStudentChange} value={studentName}>
                            <SelectTrigger className="w-[300px] bg-card text-accent font-bold text-lg font-headline border-accent">
                              <SelectValue placeholder="Changer d'élève..." />
                            </SelectTrigger>
                            <SelectContent>
                              {studentsInClass.map(sName => (
                                <SelectItem key={sName} value={sName}>{sName}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      <AiAnalysisHub studentName={studentName} evaluations={studentLatestEvals} />
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
                            {currentStatus && (
                               <Badge className={cn("text-base", currentStatus.className)}>{currentStatus.text}</Badge>
                            )}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">Aucun TP n'est assigné à cet élève. Veuillez lui en assigner depuis l'onglet "Élèves".</p>
                    )}
                </CardContent>
            </Card>

            {selectedTp && (
                <>
                    {assignedTp?.status === 'terminé' && (
                        <EvaluationCard 
                            tp={selectedTp} 
                            studentAnswers={(studentPrelimAnswers[selectedTp.id]) || {}}
                            studentFeedback={studentFeedback}
                            initialTeacherFeedback={teacherFeedback}
                            initialPrelimNote={savedEval?.prelimNote || ""}
                            initialTpNote={savedEval?.tpNote || ""}
                            onSave={handleSave}
                        />
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
                                                                disabled={assignedTp?.status !== 'terminé'}
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
                         {assignedTp?.status === 'terminé' && (
                            <CardFooter>
                                <p className="text-sm text-muted-foreground ml-auto">Utilisez la section "Évaluation du TP" ci-dessus pour enregistrer.</p>
                            </CardFooter>
                         )}
                    </Card>
                </>
            )}
        </div>
    );
}
