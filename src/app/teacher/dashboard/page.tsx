'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getTpById, TP } from "@/lib/data-manager";

const EtapeCard = ({ etape, index }: { etape: any, index: number }) => (
    <div className="mb-4 rounded-lg border border-primary/20 p-4 bg-background/50">
        <h4 className="font-headline text-lg text-accent">Étape {index + 1}: {etape.titre} <span className="text-sm text-muted-foreground font-body">({etape.duree})</span></h4>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-foreground/90">
            {etape.etapes.map((e: string, i: number) => <li key={i}>{e}</li>)}
        </ul>
    </div>
);

const TpDetailView = ({ tp }: { tp: TP }) => {
    return (
        <div className="space-y-6">
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
                <CardContent className="space-y-3">
                    {tp.etudePrelim.map((item, i) => (
                        <div key={i}><strong>Q:</strong> {item.q}</div>
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


export default function DashboardPage({ searchParams }: { searchParams: { tp: string } }) {
  const tpId = searchParams.tp ? parseInt(searchParams.tp, 10) : null;
  const tp = tpId ? getTpById(tpId) : null;

  if (tp) {
    return <TpDetailView tp={tp} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="font-headline text-5xl tracking-wide">Bienvenue</h1>
      <p className="text-muted-foreground text-xl mt-2">Veuillez sélectionner un TP dans la liste de gauche pour afficher ses détails.</p>
    </div>
  );
}