'use client';

import { useSearchParams } from 'next/navigation';
import { competencesParNiveau, Niveau } from "@/lib/data-manager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CompetenceBloc = ({ bloc }: { bloc: any }) => {
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
                <Button key={level} variant="outline" size="sm" className="w-12 h-8">
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

export default function CompetencesPage() {
  const searchParams = useSearchParams();
  const student = searchParams.get('student');
  const level = (searchParams.get('level') as Niveau) || 'seconde';
  const competences = competencesParNiveau[level];

  return (
    <div className="space-y-8">
       <div>
        <h1 className="font-headline text-4xl tracking-wide">Évaluation des compétences</h1>
        {student ? (
           <p className="text-muted-foreground text-xl">
             Élève : <span className="font-bold text-accent">{decodeURIComponent(student)}</span>
           </p>
        ) : (
            <p className="text-muted-foreground text-xl">
                Veuillez sélectionner une classe et un élève pour commencer l'évaluation.
            </p>
        )}
       </div>

       {competences && Object.values(competences).map((bloc, i) => (
          <CompetenceBloc key={i} bloc={bloc} />
       ))}

    </div>
  );
}
