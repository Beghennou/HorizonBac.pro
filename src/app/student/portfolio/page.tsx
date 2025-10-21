'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { allBlocs, getTpById } from '@/lib/data-manager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Printer, User, CheckCircle, GraduationCap } from 'lucide-react';
import { LyceeLogo } from '@/components/lycee-logo';
import { cn } from '@/lib/utils';
import { Award } from '@/components/icons';

type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';

function StudentPortfolio() {
  const searchParams = useSearchParams();
  const studentName = searchParams.get('student');
  const { evaluations, assignedTps } = useAssignments();

  if (!studentName) {
    return (
      <div className="text-center">
        <h1 className="font-headline text-3xl text-accent">Veuillez vous identifier</h1>
        <p className="text-muted-foreground mt-2">Retournez à la page de sélection pour choisir votre classe et votre nom.</p>
        <Button asChild className="mt-4">
          <Link href="/student/select">Retour à la sélection</Link>
        </Button>
      </div>
    );
  }

  const studentEvaluations = evaluations[studentName] || {};
  const studentCompletedTps = (assignedTps[studentName] || []).filter(tp => tp.status === 'terminé');

  const acquiredSkills = Object.entries(studentEvaluations).filter(
    ([, status]) => status === 'A' || status === 'M'
  );

  const skillsByBloc: Record<string, { title: string, colorClass: string, skills: Record<string, { description: string, status: EvaluationStatus }> }> = {};

  acquiredSkills.forEach(([competenceId, status]) => {
    for (const blocKey in allBlocs) {
      if (allBlocs[blocKey].items.hasOwnProperty(competenceId)) {
        if (!skillsByBloc[blocKey]) {
          skillsByBloc[blocKey] = {
            title: allBlocs[blocKey].title,
            colorClass: allBlocs[blocKey].colorClass,
            skills: {},
          };
        }
        skillsByBloc[blocKey].skills[competenceId] = {
            description: allBlocs[blocKey].items[competenceId],
            status: status as EvaluationStatus
        };
        break;
      }
    }
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-card p-8 rounded-lg shadow-lg" id="printable-portfolio">
        <header className="flex flex-col items-center text-center border-b-2 border-primary pb-6 mb-6">
            <div className="flex items-center gap-4">
                <LyceeLogo className="w-20 h-20"/>
                <div>
                     <h1 className="font-headline text-5xl tracking-wide text-accent">Portfolio de Compétences</h1>
                     <p className="text-muted-foreground text-xl">Maintenance des Véhicules</p>
                </div>
            </div>
             <div className="mt-4 flex items-center gap-3 text-2xl font-semibold">
                <User className="w-8 h-8 text-primary"/>
                <span className="font-headline tracking-wider">{studentName}</span>
            </div>
        </header>

        <main className="space-y-8">
            <div className="flex justify-between items-center print-hidden">
                <p className="text-muted-foreground">Ce document résume vos compétences acquises et vos travaux pratiques validés.</p>
                <Button onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4"/>
                    Imprimer ou Enregistrer en PDF
                </Button>
            </div>
            
            <section>
                <h2 className="font-headline text-3xl tracking-wide flex items-center gap-3 mb-4">
                    <Award className="w-8 h-8 text-accent"/>
                    Compétences Acquises
                </h2>
                {Object.keys(skillsByBloc).length > 0 ? (
                    <div className="space-y-6">
                        {Object.values(skillsByBloc).map(bloc => (
                            <Card key={bloc.title} className="break-inside-avoid">
                                <CardHeader className={cn("rounded-t-lg", bloc.colorClass)}>
                                    <CardTitle className="text-xl">{bloc.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <ul className="space-y-2">
                                        {Object.entries(bloc.skills).map(([id, {description, status}]) => (
                                            <li key={id} className="flex items-center justify-between p-2 bg-background/50 rounded-md">
                                                <div>
                                                    <span className="font-mono text-accent font-bold mr-3">{id}</span>
                                                    <span>{description}</span>
                                                </div>
                                                <span className={cn("font-bold font-mono px-3 py-1 rounded-full text-sm", status === 'A' ? 'bg-green-500/20 text-green-300' : 'bg-sky-500/20 text-sky-300')}>
                                                    {status === 'M' ? 'Maîtrisé' : 'Acquis'}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-8">Aucune compétence n'a encore été validée. Continuez les TP pour progresser !</p>
                )}
            </section>

             <section className="break-before-page">
                <h2 className="font-headline text-3xl tracking-wide flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8 text-primary"/>
                    Travaux Pratiques Validés
                </h2>
                {studentCompletedTps.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {studentCompletedTps.map(assignedTp => {
                            const tp = getTpById(assignedTp.id);
                            if (!tp) return null;
                            return (
                                <Card key={tp.id} className="bg-background/50 break-inside-avoid">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-headline text-accent">TP {tp.id} - {tp.titre}</CardTitle>
                                        <CardDescription>{tp.objectif}</CardDescription>
                                    </CardHeader>
                                </Card>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center py-8">Aucun travail pratique n'est encore terminé.</p>
                )}
            </section>
        </main>
    </div>
  );
}


export default function StudentPortfolioPage() {
    return (
        <Suspense fallback={<div>Chargement du portfolio...</div>}>
            <StudentPortfolio />
        </Suspense>
    )
}
