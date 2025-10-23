

'use client';
import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { TP, Etape, EtudePrelimQCM, EtudePrelimText } from '@/lib/data-manager';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Send, Loader2, Play, CheckCircle, MessageSquare, Award } from 'lucide-react';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase/provider';
import { Badge } from '@/components/ui/badge';
import { CheckeredFlag } from '@/components/icons';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { collection } from 'firebase/firestore';

const AssistantTP = dynamic(() => import('@/components/assistant-tp').then(mod => mod.AssistantTP), {
    ssr: false,
    loading: () => (
        <Card className="bg-card/70 border-accent/30 sticky top-28">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-accent">
                    <Bot /> Assistant Pédagogique IA
                </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-80">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </CardContent>
        </Card>
    )
});

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

export default function TPPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const studentName = searchParams.get('student');
  const tpId = typeof params.tpId === 'string' ? parseInt(params.tpId, 10) : null;

  const { firestore, assignedTps, updateTpStatus, savePrelimAnswer, saveFeedback, tps } = useFirebase();

  const { data: studentPrelimAnswers } = useCollection(useMemoFirebase(() => firestore && studentName && tpId ? collection(firestore, `students/${studentName}/prelimAnswers`) : null, [firestore, studentName, tpId]));
  const { data: studentFeedbacks } = useCollection(useMemoFirebase(() => firestore && studentName && tpId ? collection(firestore, `students/${studentName}/feedbacks`) : null, [firestore, studentName, tpId]));

  const prelimAnswersForTp = useMemo(() => {
    const doc = studentPrelimAnswers?.find(d => d.id === tpId?.toString());
    return doc?.answers || {};
  }, [studentPrelimAnswers, tpId]);

  const feedbacksForTp = useMemo(() => {
    const doc = studentFeedbacks?.find(d => d.id === tpId?.toString());
    return doc?.tps || {};
  }, [studentFeedbacks, tpId]);


  const tp = tpId ? tps[tpId] : null;

  const assignedTp = studentName && tpId ? assignedTps[studentName]?.find(t => t.id === tpId) : null;
  const studentFeedback = feedbacksForTp?.student || '';
  const teacherFeedback = feedbacksForTp?.teacher || '';
  
  const handleAnswerChange = (qIndex: number, answer: string | string[]) => {
      if (studentName && tpId) {
          savePrelimAnswer(studentName, tpId, qIndex, answer);
      }
  }

  const handleStudentFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (studentName && tpId) {
      saveFeedback(studentName, tpId, e.target.value, 'student');
    }
  }

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
  
  if (!studentName || !assignedTp) {
     return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="font-headline text-3xl tracking-wide">Accès non autorisé</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Vous n'êtes pas identifié ou ce TP ne vous est pas assigné.
        </p>
      </div>
    );
  }

  const handleStart = () => {
    if (studentName && tpId) {
        updateTpStatus(studentName, tpId, 'en-cours');
    }
  }

  const handleFinish = () => {
    if (studentName && tpId) {
        updateTpStatus(studentName, tpId, 'terminé');
    }
  }
  
  const studentTpAnswers = prelimAnswersForTp || {};
  const evaluatedCompetenceIds = tp.objectif.match(/C\d\.\d/g) || [];


  return (
    <div className="grid md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-2 space-y-6">
        <div className="flex justify-between items-start">
            <div>
              <p className="text-sm uppercase tracking-wider font-semibold text-accent">TP {tp.id}</p>
              <h1 className="font-headline text-4xl tracking-wide">{tp.titre}</h1>
              <p className="text-muted-foreground mt-1 text-lg">{tp.objectif.split(' (Compétence')[0]}</p>
            </div>
             <div className="flex flex-col items-end gap-2">
                {assignedTp.status === 'non-commencé' && (
                    <Button onClick={handleStart} size="lg"><Play className="mr-2"/>Commencer le TP</Button>
                )}
                {assignedTp.status === 'en-cours' && (
                    <Button onClick={handleFinish} variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-black">
                        <CheckeredFlag className="mr-2"/>Terminer le TP
                    </Button>
                )}
                 {assignedTp.status === 'terminé' && (
                    <Badge className="bg-green-600 text-white text-base p-3">
                        <CheckCircle className="mr-2"/>TP Terminé
                    </Badge>
                )}
             </div>
        </div>

        {evaluatedCompetenceIds.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Award />Compétences Ciblées</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {evaluatedCompetenceIds.map(id => (
                    <Badge key={id} variant="outline" className="border-accent text-accent font-semibold text-sm">
                        {id}
                    </Badge>
                ))}
            </CardContent>
          </Card>
        )}

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
        
        {tp.etudePrelim.length > 0 && (
             <Card>
                <CardHeader>
                    <CardTitle>Étude Préliminaire</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {tp.etudePrelim.map((item, i) => (
                        <div key={i} className="p-4 border-l-2 border-accent/30 bg-background/50 rounded-r-lg">
                            <p className="font-bold">Question {i+1}:</p>
                            <p className="mb-4">{item.q}</p>
                            
                            {item.type === 'text' && (
                                <Textarea 
                                    placeholder="Votre réponse..." 
                                    className="bg-card" 
                                    value={(studentTpAnswers[i] as string) || ''}
                                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                                    disabled={assignedTp.status === 'terminé'}
                                />
                            )}

                            {item.type === 'qcm' && (
                                <RadioGroup 
                                    value={(studentTpAnswers[i] as string) || ''} 
                                    onValueChange={(value) => handleAnswerChange(i, value)}
                                    disabled={assignedTp.status === 'terminé'}
                                >
                                    {(item as EtudePrelimQCM).options.map((option, optIndex) => (
                                        <div key={optIndex} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50">
                                            <RadioGroupItem value={option} id={`q${i}-opt${optIndex}`} />
                                            <Label htmlFor={`q${i}-opt${optIndex}`} className="flex-1 cursor-pointer">{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
        )}

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
            <CardTitle className="flex items-center gap-2">
              <MessageSquare /> Commentaire sur le TP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Tes impressions, difficultés ou points à discuter avec ton enseignant..."
              value={studentFeedback}
              onChange={handleStudentFeedbackChange}
              disabled={assignedTp.status === 'terminé'}
              rows={4}
            />
          </CardContent>
        </Card>

        {assignedTp.status === 'terminé' && teacherFeedback && (
          <Card className="border-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <MessageSquare /> Feedback de l'Enseignant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="p-4 bg-background/50 rounded-md whitespace-pre-wrap">{teacherFeedback}</p>
            </CardContent>
          </Card>
        )}


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
