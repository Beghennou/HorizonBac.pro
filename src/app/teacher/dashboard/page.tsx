'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTpById, TP } from "@/lib/data-manager";
import { useSearchParams } from "next/navigation";
import { Printer, User, Users } from "lucide-react";
import { useAssignments } from "@/contexts/AssignmentsContext";

const PrintButton = () => {
    const handlePrint = () => {
        window.print();
    };
    return (
        <Button onClick={handlePrint} className="print-hidden">
            <Printer className="mr-2" />
            Imprimer la fiche
        </Button>
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
                <PrintButton />
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
                <CardContent className="space-y-4">
                    {tp.etudePrelim.map((item, i) => (
                        <div key={i}>
                            <p><strong>Q{i+1}:</strong> {item.q}</p>
                            <div className="border-l-2 border-dashed border-accent/50 pl-4 ml-4 mt-2">
                                <p className="text-muted-foreground italic">Votre réponse :</p>
                                <div className="h-12"></div>
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
                    <CardTitle>Points Clés & Sécurité</CardTitle>
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
      <p className="text-muted-foreground text-xl mt-2">Veuillez sélectionner un TP dans la liste de gauche pour afficher ses détails.</p>
    </div>
  );
}
