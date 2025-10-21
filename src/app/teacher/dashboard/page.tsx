'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTpById, TP, EtudePrelimQCM } from "@/lib/data-manager";
import { useSearchParams } from "next/navigation";
import { Mail, User, Users, Printer, Bot, Send, Loader2 } from "lucide-react";
import { useAssignments } from "@/contexts/AssignmentsContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { guideStudent, GuideStudentOutput } from "@/ai/flows/tp-assistant";

const PrintButton = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <Button onClick={handlePrint} variant="outline" className="print-hidden">
            <Printer className="mr-2" />
            Imprimer
        </Button>
    );
}

const SendEmailButton = ({ tp, studentName }: { tp: TP | null, studentName: string | null }) => {
    const { students } = useAssignments();
    
    if (!tp || !studentName) {
        return (
             <Button disabled className="print-hidden">
                <Mail className="mr-2" />
                Envoyer par E-mail
            </Button>
        )
    };

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
        <Button onClick={handleSendEmail} className="print-hidden" disabled={!student}>
            <Mail className="mr-2" />
            Envoyer par E-mail
        </Button>
    );
};

const TpAssistantDialog = ({ tp }: { tp: TP }) => {
    const [question, setQuestion] = useState('');
    const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAskAssistant = async () => {
        if (!question.trim()) return;

        const newConversation = [...conversation, { role: 'user' as const, content: question }];
        setConversation(newConversation);
        setQuestion('');
        setIsLoading(true);

        try {
            const result: GuideStudentOutput = await guideStudent({
                tpTitle: tp.titre,
                tpObjective: tp.objectif,
                studentQuestion: question,
            });
            
            const assistantResponse = result.guidanceText;

            setConversation(prev => [...prev, { role: 'assistant' as const, content: assistantResponse }]);
        } catch (error) {
            console.error("AI assistant failed", error);
            setConversation(prev => [...prev, { role: 'assistant' as const, content: "Désolé, une erreur est survenue. Veuillez réessayer plus tard." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="print-hidden">
                    <Bot className="mr-2" />
                    Assistant IA
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 font-headline text-2xl text-accent">
                        <Bot /> Assistant Pédagogique IA
                    </DialogTitle>
                    <DialogDescription>
                        Testez l'assistant IA pour le TP "{tp.titre}". Posez des questions comme le ferait un élève.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                     <div className="h-64 overflow-y-auto p-4 bg-background/50 rounded-lg border border-primary/20 space-y-4">
                        {conversation.length === 0 && <p className="text-muted-foreground text-center">Posez une question pour commencer...</p>}
                        {conversation.map((entry, index) => (
                            <div key={index} className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-lg max-w-[80%] ${entry.role === 'user' ? 'bg-primary/30' : 'bg-secondary'}`}>
                                    <p className="text-sm">{entry.content}</p>
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex justify-start">
                                <div className="p-3 rounded-lg bg-secondary flex items-center gap-2">
                                    <Loader2 className="animate-spin h-4 w-4"/>
                                    <p className="text-sm text-muted-foreground">Réflexion...</p>
                                </div>
                            </div>
                        )}
                    </div>
                     <div className="flex gap-2">
                        <Textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ex: Par où devrais-je commencer pour l'étape 2 ?"
                            className="flex-grow"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAskAssistant();
                                }
                            }}
                            disabled={isLoading}
                        />
                        <Button onClick={handleAskAssistant} disabled={isLoading || !question.trim()}>
                            {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}


const EtapeCard = ({ etape, index }: { etape: any, index: number }) => (
    <div className="mb-4 rounded-lg border border-primary/20 p-4 bg-background/50 break-inside-avoid">
        <h4 className="font-headline text-lg text-accent">Étape {index + 1}: {etape.titre} <span className="text-sm text-muted-foreground font-body">({etape.duree})</span></h4>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-foreground/90">
            {etape.etapes.map((e: string, i: number) => <li key={i}>{e}</li>)}
        </ul>
    </div>
);

const TpDetailView = ({ tp }: { tp: TP }) => {
    const searchParams = useSearchParams();
    const studentName = searchParams.get('student');
    const className = searchParams.get('class');
    const { teacherName } = useAssignments();

    return (
        <div className="space-y-6" id="printable-tp">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm uppercase tracking-wider font-semibold text-accent">TP {tp.id}</p>
                    <h1 className="font-headline text-4xl tracking-wide">{tp.titre}</h1>
                    <p className="text-muted-foreground mt-1 text-lg">{tp.objectif}</p>
                </div>
                 <div className="flex gap-2">
                    <SendEmailButton tp={tp} studentName={studentName} />
                    <TpAssistantDialog tp={tp} />
                    <PrintButton />
                </div>
            </div>
            
            <div className="border-t border-b border-primary/20 py-2 mb-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-accent"/>
                        <strong>Enseignant:</strong> {teacherName || 'Non défini'}
                    </div>
                    <div className="flex items-center gap-2">
                         <User className="w-4 h-4 text-accent"/>
                        <strong>Élève:</strong> {studentName || 'Non sélectionné'}
                    </div>
                    <div className="flex items-center gap-2">
                         <Users className="w-4 h-4 text-accent"/>
                        <strong>Classe:</strong> {className || 'Non sélectionnée'}
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Situation Professionnelle</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{tp.situation}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Matériel Requis</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {tp.materiel.map((item, i) => (
                        <span key={i} className="bg-muted text-muted-foreground text-sm font-medium px-3 py-1 rounded-full">{item}</span>
                    ))}
                </CardContent>
            </Card>

            <Card className="break-before-page">
                <CardHeader>
                    <CardTitle>Étude Préliminaire</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {tp.etudePrelim.map((item, i) => (
                        <div key={i}>
                            <p><strong>Q{i+1}:</strong> {item.q}</p>
                            {item.type === 'qcm' && (
                                <div className="mt-2 space-y-2">
                                    {(item as EtudePrelimQCM).options.map((option, optIndex) => (
                                        <div key={optIndex} className="flex items-center gap-2">
                                            <div className="w-4 h-4 border border-foreground rounded-sm"></div>
                                            <label>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="border-l-2 border-dashed border-accent/50 pl-4 ml-2 mt-2">
                                <p className="text-muted-foreground italic">Votre réponse :</p>
                                <div className={item.type === 'qcm' ? 'h-4' : 'h-16'}></div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="break-before-page">
                <CardHeader>
                    <CardTitle>Activité Pratique</CardTitle>
                </CardHeader>
                <CardContent>
                    {tp.activitePratique.map((etape, i) => (
                        <EtapeCard key={i} etape={etape} index={i} />
                    ))}
                </CardContent>
            </Card>

            <Card className="break-before-page">
                <CardHeader>
                    <CardTitle>Points Clés &amp; Sécurité</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold text-accent mb-2">Points Clés</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            {tp.pointsCles.map((pt, i) => <li key={i}>{pt}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-bold text-destructive mb-2">Sécurité</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            {tp.securiteRangement.map((sec, i) => <li key={i}>{sec}</li>)}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};


export default function DashboardPage() {
  const searchParams = useSearchParams();
  const tpId = searchParams.get('tp') ? parseInt(searchParams.get('tp')!, 10) : null;
  const tp = tpId ? getTpById(tpId) : null;

  if (tp) {
    return <TpDetailView tp={tp} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center print-hidden">
      <h1 className="font-headline text-5xl tracking-wide">Bienvenue</h1>
      <p className="text-muted-foreground text-xl mt-2 max-w-lg">
        Utilisez le menu de gauche pour naviguer. Sélectionnez une classe pour voir vos élèves, ou choisissez un TP pour afficher la fiche de travail.
      </p>
    </div>
  );
}
