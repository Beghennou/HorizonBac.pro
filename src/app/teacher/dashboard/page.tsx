
'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TP, EtudePrelimQCM } from "@/lib/data-manager";
import { useSearchParams } from "next/navigation";
import { Mail, User, Users, Printer, Bot } from "lucide-react";
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase/provider';
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { collection } from 'firebase/firestore';
import { Student } from '@/lib/types';

const TpAssistantDialog = dynamic(() => import('@/components/tp-assistant-dialog').then(mod => mod.TpAssistantDialog), {
    ssr: false,
    loading: () => <Button variant="outline" className="print-hidden" disabled><Loader2 className="mr-2 animate-spin" />Chargement IA...</Button>
});

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
    const { firestore } = useFirebase();
    const { data: students } = useCollection<Student>(useMemoFirebase(() => firestore ? collection(firestore, 'students') : null, [firestore]));
    
    if (!tp || !studentName) {
        return (
             <Button disabled className="print-hidden">
                <Mail className="mr-2" />
                Envoyer par E-mail
            </Button>
        )
    };

    const student = students?.find(s => s.name === studentName);

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


export default function DashboardPage() {
  const searchParams = useSearchParams();
  const { tps } = useFirebase();
  const tpId = searchParams.get('tp') ? parseInt(searchParams.get('tp')!, 10) : null;
  const tp = tpId ? tps[tpId] : null;

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
