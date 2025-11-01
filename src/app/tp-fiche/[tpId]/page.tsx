'use client';
import { Suspense } from 'react';
import { useParams, useSearchParams } from "next/navigation";
import { useFirebase } from '@/firebase';
import { Loader2, Printer, User, Users, OctagonX } from 'lucide-react';
import { TP, Etape, EtudePrelim, EtudePrelimQCM } from '@/lib/data-manager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ValidationTeacherButton } from '@/components/ValidationTeacherButton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EtapeCard = ({ etape, index, studentName, tpId }: { etape: Etape, index: number, studentName: string | null, tpId: number }) => (
    <div className="mb-4 rounded-lg border border-primary/20 p-4 bg-background/50 break-inside-avoid">
        <h4 className="font-headline text-lg text-accent">Étape {index + 1}: {etape.titre} <span className="text-sm text-muted-foreground font-body">({etape.duree})</span></h4>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-foreground/90">
            {etape.etapes.map((e: string, i: number) => <li key={i}>{e}</li>)}
        </ul>
        <Alert variant="destructive" className="mt-4 bg-destructive/10 border-destructive/50 text-destructive">
            <OctagonX className="h-5 w-5" />
            <AlertDescription className="font-bold text-lg">
                Appel Professeur
            </AlertDescription>
        </Alert>
        {studentName && (
            <ValidationTeacherButton 
                studentName={studentName}
                tpId={tpId}
                validationId={`etape-${index}`}
            />
        )}
    </div>
);

function TpFicheView() {
    const params = useParams();
    const searchParams = useSearchParams();
    const { tps, isLoaded } = useFirebase();
    
    const tpId = typeof params.tpId === 'string' ? parseInt(params.tpId, 10) : null;
    const tp = tpId ? tps[tpId] : null;

    const studentName = searchParams.get('student');
    const className = searchParams.get('class');
    const teacherName = searchParams.get('teacher');

    const handlePrint = () => {
        window.print();
    };

    if (!isLoaded) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }
    
    if (!tp) {
        return <div className="text-center p-8">Fiche TP non trouvée.</div>;
    }

    return (
        <div className="bg-card p-8 rounded-lg shadow-lg" id="printable-tp">
             <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-sm uppercase tracking-wider font-semibold text-accent">TP {tp.id}</p>
                        <h1 className="font-headline text-4xl tracking-wide">{tp.titre}</h1>
                        <p className="text-muted-foreground mt-1 text-lg">{tp.objectif}</p>
                    </div>
                    <Button onClick={handlePrint} variant="outline" className="print-hidden">
                        <Printer className="mr-2"/> Imprimer la fiche
                    </Button>
                </div>
                
                <div className="border-t border-b border-primary/20 py-2 mb-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-accent"/>
                            <strong>Enseignant:</strong> {teacherName || '................'}
                        </div>
                        <div className="flex items-center gap-2">
                             <User className="w-4 h-4 text-accent"/>
                            <strong>Élève:</strong> {studentName || '................'}
                        </div>
                        <div className="flex items-center gap-2">
                             <Users className="w-4 h-4 text-accent"/>
                            <strong>Classe:</strong> {className || '................'}
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
                        {tp.materiel.map((item: string, i: number) => (
                            <span key={i} className="bg-muted text-muted-foreground text-sm font-medium px-3 py-1 rounded-full">{item}</span>
                        ))}
                    </CardContent>
                </Card>

                {tp.etudePrelim.length > 0 && (
                  <Card className="break-before-page">
                      <CardHeader>
                          <CardTitle>Étude Préliminaire</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                          {tp.etudePrelim.map((item: EtudePrelim, i: number) => (
                              <div key={i}>
                                  <p><strong>Q{i+1}:</strong> {item.q}</p>
                                  {item.type === 'qcm' && (
                                      <div className="mt-2 space-y-2">
                                          {(item as EtudePrelimQCM).options.map((option: string, optIndex: number) => (
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
                          <div className="mt-6 text-center border-t-2 border-dashed border-destructive/50 pt-4">
                            <p className="font-bold text-destructive text-lg">Appel Professeur avant de commencer l'activité pratique</p>
                             {studentName && (
                                <ValidationTeacherButton 
                                    studentName={studentName}
                                    tpId={tp.id}
                                    validationId="prelim"
                                />
                            )}
                          </div>
                      </CardContent>
                  </Card>
                )}

                <Card className="break-before-page">
                    <CardHeader>
                        <CardTitle>Activité Pratique</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {tp.activitePratique.map((etape: Etape, i: number) => (
                            <EtapeCard key={i} etape={etape} index={i} studentName={studentName} tpId={tp.id} />
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
                                {tp.pointsCles.map((pt: string, i: number) => <li key={i}>{pt}</li>)}
                            </ul>
                        </div>
                         <div>
                            <h4 className="font-bold text-destructive mb-2">Sécurité</h4>
                            <ul className="list-disc pl-5 space-y-1">
                                {tp.securiteRangement.map((sec: string, i: number) => <li key={i}>{sec}</li>)}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default function TpFichePage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <TpFicheView />
        </Suspense>
    )
}
