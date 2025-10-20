'use client';

import { useSearchParams } from 'next/navigation';
import { competencesParNiveau, getTpById, Niveau, TP } from "@/lib/data-manager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { useAssignments } from '@/contexts/AssignmentsContext';

const CompetenceBloc = ({ bloc, onRate, studentId }: { bloc: any, onRate: any, studentId: string }) => {
  return (
    <div className="mb-6">
      <div className={`p-3 rounded-t-md text-white font-headline text-lg ${bloc.colorClass}`}>
        {bloc.title}
      </div>
      <div className="border border-t-0 border-primary/30 rounded-b-md">
        {Object.entries(bloc.items).map(([code, libelle]) => (
          <div key={code} className="flex items-center justify-between p-3 border-b border-primary/20 last:border-b-0">
            <div className="font-semibold">
              <span className="font-headline text-accent pr-2">{code}:</span>
              {libelle as string}
            </div>
            <div className="flex gap-1">
              {['NA', 'EC', 'A', 'M'].map(level => (
                <Button key={level} variant="outline" size="sm" className="w-12 h-8" onClick={() => onRate(studentId, code, level)}>
                  {level}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const TpEvaluation = ({ tp, onRate, studentId }: { tp: TP; onRate: any; studentId: string }) => {
    // Cette fonction devrait mapper les compétences du TP aux blocs de compétences
    // Pour l'instant, on suppose que le niveau du TP correspond au niveau des compétences
    let level: Niveau = 'seconde';
    if (tp.id >= 1 && tp.id <= 38) level = 'premiere';
    if (tp.id >= 100 && tp.id <= 137) level = 'seconde'; // Correction pour la plage Seconde
    if (tp.id >= 200 && tp.id <= 300) level = 'premiere'; // Correction pour la plage Premiere
    if (tp.id >= 400) level = 'terminale'; // Logique à affiner pour terminale

    const competences = competencesParNiveau[level];

    return (
        <div>
            {competences && Object.values(competences).map((bloc, i) => (
                // Ici, il faudrait filtrer pour n'afficher que les compétences liées au TP
                // Ce qui demande de lier les compétences aux TPs dans les données
                <CompetenceBloc key={i} bloc={bloc} onRate={onRate} studentId={studentId} />
            ))}
        </div>
    )
}


export default function CompetencesPage() {
  const searchParams = useSearchParams();
  const studentName = searchParams.get('student');
  const { toast } = useToast();
  const { assignedTps } = useAssignments();

  const studentAssignedTps = studentName ? (assignedTps[decodeURIComponent(studentName)] || []) : [];
  const tpsDetails = studentAssignedTps.map(id => getTpById(id)).filter((tp): tp is TP => !!tp);

  const handleRating = (studentId: string, competenceCode: string, level: string) => {
    console.log(`Évaluation pour ${studentId}: Compétence ${competenceCode} -> Niveau ${level}`);
    toast({
      title: "Évaluation enregistrée",
      description: `La compétence ${competenceCode} a été évaluée au niveau ${level} pour ${studentId}.`,
    });
    // Ici on ajoutera la logique pour sauvegarder la notation et calculer les XP
  };

  return (
    <div className="space-y-8">
       <div>
        <h1 className="font-headline text-4xl tracking-wide">Évaluation des compétences</h1>
        {studentName ? (
           <p className="text-muted-foreground text-xl">
             Élève : <span className="font-bold text-accent">{decodeURIComponent(studentName)}</span>
           </p>
        ) : (
            <p className="text-muted-foreground text-xl">
                Veuillez sélectionner une classe et un élève pour commencer l'évaluation.
            </p>
        )}
       </div>

        {studentName && tpsDetails.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
                {tpsDetails.map(tp => (
                    <AccordionItem key={tp.id} value={`tp-${tp.id}`}>
                        <AccordionTrigger className="text-lg font-headline hover:text-accent">
                            TP {tp.id} - {tp.titre}
                        </AccordionTrigger>
                        <AccordionContent>
                           <TpEvaluation tp={tp} onRate={handleRating} studentId={decodeURIComponent(studentName)} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        ) : studentName ? (
             <p className="text-muted-foreground">Aucun TP n'a encore été assigné à cet élève. Sélectionnez un élève et assignez-lui un TP depuis la page "Élèves".</p>
        ) : null}

    </div>
  );
}
