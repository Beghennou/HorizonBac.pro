
'use client';
import { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TP, EtudePrelimQCM, getTpsByNiveau, Niveau } from "@/lib/data-manager";
import { useSearchParams, useRouter } from "next/navigation";
import { User, Users, Printer, Bot } from "lucide-react";
import { useFirebase } from '@/firebase/provider';
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
    const { teacherName } = useFirebase();

    return (
        <div className="space-y-6" id="printable-tp">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm uppercase tracking-wider font-semibold text-accent">TP {tp.id}</p>
                    <h1 className="font-headline text-4xl tracking-wide">{tp.titre}</h1>
                    <p className="text-muted-foreground mt-1 text-lg">{tp.objectif}</p>
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

            {tp.etudePrelim.length > 0 && (
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
            )}

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


function TpListPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { tps, classes } = useFirebase();

  const className = searchParams.get('class');
  
  let niveau: Niveau = 'seconde';
  if (className) {
    if (className.startsWith('1') || className.toLowerCase().includes('app1')) niveau = 'premiere';
    if (className.startsWith('T')) niveau = 'terminale';
  }

  const tpsForLevel = getTpsByNiveau(niveau, tps);
  
  const selectedTpId = searchParams.get('tp') ? parseInt(searchParams.get('tp')!, 10) : null;
  const selectedTp = selectedTpId ? tps[selectedTpId] : null;

  const handleTpSelect = (id: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('tp', id.toString());
    router.push(`/student/tp-list?${newSearchParams.toString()}`);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
        <div className="md:col-span-1">
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle>TPs de {niveau}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-2">
                    <ScrollArea className="h-[calc(100vh-20rem)]">
                        <div className="space-y-2 pr-4">
                            {tpsForLevel.map(tp => (
                                <div 
                                    key={tp.id} 
                                    onClick={() => handleTpSelect(tp.id)}
                                    className={cn(
                                        "p-3 rounded-md bg-background/50 hover:bg-primary/10 border border-transparent hover:border-primary/50 transition-all group relative cursor-pointer",
                                        selectedTpId === tp.id ? 'bg-primary/20 border-accent' : ''
                                    )}
                                >
                                    <p className="font-bold text-sm text-accent">TP {tp.id}</p>
                                    <p className="text-sm text-foreground/80">{tp.titre}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-3">
             <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
                {selectedTp ? (
                    <TpDetailView tp={selectedTp} />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center print-hidden">
                        <h1 className="font-headline text-3xl tracking-wide">Fiches TP</h1>
                        <p className="text-muted-foreground text-lg mt-2 max-w-lg">
                           Sélectionnez un TP dans la liste de gauche pour afficher sa fiche de travail.
                        </p>
                    </div>
                )}
             </ScrollArea>
        </div>
    </div>
  );
}

export default function TpListPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <TpListPageContent />
        </Suspense>
    )
}
