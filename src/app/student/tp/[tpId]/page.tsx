'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { getTpById, TP, Etape } from '@/lib/data-manager';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Send, Loader2 } from 'lucide-react';
import { guideStudent, GuideStudentOutput } from '@/ai/flows/tp-assistant';

const EtapeCard = ({ etape, index }: { etape: Etape; index: number }) => (
  <div className="mb-4 rounded-lg border border-primary/20 p-4 bg-background/50 break-inside-avoid">
    <h4 className="font-headline text-lg text-accent">
      Étape {index + 1}: {etape.titre}{' '}
      <span className="text-sm text-muted-foreground font-body">({etape.duree})</span>
    </h4>
    <ul className="list-disc pl-5 mt-2 space-y-1 text-foreground/90">
      {etape.etapes.map((e: string, i: number) => (
        <li key={i}>{e}</li>
      ))}
    </ul>
  </div>
);

const AssistantTP = ({ tp }: { tp: TP }) => {
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
        <Card className="bg-card/70 border-accent/30 sticky top-28">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-accent">
                    <Bot /> Assistant Pédagogique IA
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
        </Card>
    )
}

export default function TPPage() {
  const params = useParams();
  const tpId = typeof params.tpId === 'string' ? parseInt(params.tpId, 10) : null;
  const tp = tpId ? getTpById(tpId) : null;

  if (!tp) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="font-headline text-3xl tracking-wide">Travail Pratique non trouvé</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Le TP que vous cherchez n'existe pas ou n'est plus disponible.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-2 space-y-6">
        <div>
          <p className="text-sm uppercase tracking-wider font-semibold text-accent">TP {tp.id}</p>
          <h1 className="font-headline text-4xl tracking-wide">{tp.titre}</h1>
          <p className="text-muted-foreground mt-1 text-lg">{tp.objectif}</p>
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

        <Card>
            <CardHeader>
                <CardTitle>Étude Préliminaire</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {tp.etudePrelim.map((item, i) => (
                    <div key={i}>
                        <p><strong>Q{i+1}:</strong> {item.q}</p>
                        <div className="border-l-2 border-dashed border-accent/50 pl-4 ml-4 mt-2">
                            <Textarea placeholder="Votre réponse..." className="bg-background/50" />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activité Pratique</CardTitle>
          </CardHeader>
          <CardContent>
            {tp.activitePratique.map((etape, i) => (
              <EtapeCard key={i} etape={etape} index={i} />
            ))}
          </CardContent>
        </Card>

        <Card>
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
      <div className="md:col-span-1">
        <AssistantTP tp={tp} />
      </div>
    </div>
  );
}
