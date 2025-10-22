

'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAssignments } from '@/contexts/AssignmentsContext';
import { allBlocs, getTpById } from '@/lib/data-manager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Printer, User, CheckCircle, FileText } from 'lucide-react';
import { LyceeLogo } from '@/components/lycee-logo';
import { cn } from '@/lib/utils';
import { Award } from '@/components/icons';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type EvaluationStatus = 'NA' | 'EC' | 'A' | 'M';

function StudentPortfolio() {
  const searchParams = useSearchParams();
  const studentName = searchParams.get('student');
  const { evaluations, assignedTps, storedEvals, feedbacks } = useAssignments();

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
  const studentStoredEvals = storedEvals[studentName] || {};

  const acquiredSkillsByBloc: Record<string, { title: string, colorClass: string, skills: Record<string, { description: string, history: EvaluationStatus[] }> }> = {};

  Object.entries(studentEvaluations).forEach(([competenceId, history]) => {
    if (history.length > 0) {
      const latestStatus = history[history.length - 1];
      if (latestStatus === 'A' || latestStatus === 'M') {
        for (const blocKey in allBlocs) {
          if (allBlocs[blocKey].items.hasOwnProperty(competenceId)) {
            if (!acquiredSkillsByBloc[blocKey]) {
              acquiredSkillsByBloc[blocKey] = {
                title: allBlocs[blocKey].title,
                colorClass: allBlocs[blocKey].colorClass,
                skills: {},
              };
            }
            acquiredSkillsByBloc[blocKey].skills[competenceId] = {
              description: allBlocs[blocKey].items[competenceId],
              history: history,
            };
            break;
          }
        }
      }
    }
  });


  const handlePrint = () => {
    window.print();
  };

  return (
    <TooltipProvider>
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

          <main className="space-y-12">
              <div className="flex justify-between items-center print-hidden">
                  <p className="text-muted-foreground">Ce document résume vos compétences acquises et vos travaux pratiques validés.</p>
                  <Button onClick={handlePrint}>
                      <Printer className="mr-2 h-4 w-4"/>
                      Imprimer ou Enregistrer en PDF
                  </Button>
              </div>
              
              <section className="break-before-page">
                  <h2 className="font-headline text-3xl tracking-wide flex items-center gap-3 mb-4">
                      <FileText className="w-8 h-8 text-primary"/>
                      Synthèse des Évaluations
                  </h2>
                  {Object.keys(studentStoredEvals).length > 0 ? (
                      <Card>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[30%]">TP Évalué</TableHead>
                              <TableHead className="text-center">Note Étude Préliminaire</TableHead>
                              <TableHead className="text-center">Note TP</TableHead>
                              <TableHead className="text-center">Date Évaluation</TableHead>
                              <TableHead>Appréciation de l'enseignant</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {Object.entries(studentStoredEvals).map(([tpId, evalData]) => {
                                const tp = getTpById(parseInt(tpId));
                                const teacherFeedback = feedbacks[studentName]?.[parseInt(tpId)]?.teacher;
                                if (!tp || !evalData.isFinal) return null;

                                return (
                                  <TableRow key={tpId} className="break-inside-avoid">
                                    <TableCell className="font-medium">{tp.titre}</TableCell>
                                    <TableCell className="text-center font-bold text-accent">{evalData.prelimNote ? `${evalData.prelimNote} / 10` : 'N/A'}</TableCell>
                                    <TableCell className="text-center font-bold text-accent">{evalData.tpNote ? `${evalData.tpNote} / 20` : 'N/A'}</TableCell>
                                    <TableCell className="text-center">{evalData.date}</TableCell>
                                    <TableCell className="text-muted-foreground italic">{teacherFeedback || "Aucune appréciation."}</TableCell>
                                  </TableRow>
                                )
                            })}
                          </TableBody>
                        </Table>
                      </Card>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">Aucun TP n'a encore été évalué par l'enseignant.</p>
                  )}
              </section>

              <section>
                  <h2 className="font-headline text-3xl tracking-wide flex items-center gap-3 mb-4">
                      <Award className="w-8 h-8 text-accent"/>
                      Compétences Acquises
                  </h2>
                  {Object.keys(acquiredSkillsByBloc).length > 0 ? (
                      <div className="space-y-6">
                          {Object.values(acquiredSkillsByBloc).map(bloc => (
                              <Card key={bloc.title} className="break-inside-avoid">
                                  <CardHeader className={cn("rounded-t-lg", bloc.colorClass)}>
                                      <CardTitle className="text-xl">{bloc.title}</CardTitle>
                                  </CardHeader>
                                  <CardContent className="p-4">
                                      <ul className="space-y-4">
                                          {Object.entries(bloc.skills).map(([id, {description, history}]) => {
                                              const latestStatus = history[history.length - 1];
                                              const masteryProgress = Math.min((history.length / 5) * 100, 100);
                                              return (
                                                  <li key={id} className="flex items-center justify-between p-3 bg-background/50 rounded-md">
                                                      <div className="flex-1">
                                                          <div className="flex items-center justify-between">
                                                            <div>
                                                              <span className="font-mono text-accent font-bold mr-3">{id}</span>
                                                              <span>{description}</span>
                                                            </div>
                                                            <span className={cn("font-bold font-mono px-3 py-1 rounded-full text-sm", latestStatus === 'A' ? 'bg-green-500/20 text-green-300' : 'bg-sky-500/20 text-sky-300')}>
                                                                {latestStatus === 'M' ? 'Maîtrisé' : 'Acquis'}
                                                            </span>
                                                          </div>
                                                          <Tooltip>
                                                              <TooltipTrigger asChild>
                                                                  <div className="mt-2">
                                                                      <Progress value={masteryProgress} className="h-2" indicatorClassName={masteryProgress === 100 ? "bg-gradient-to-r from-accent to-yellow-300" : "bg-primary"} />
                                                                  </div>
                                                              </TooltipTrigger>
                                                              <TooltipContent>
                                                                  <p>Niveau de maîtrise : {history.length}/5 évaluations.</p>
                                                                  {Array.isArray(history) && <p>Historique : {history.join(', ')}</p>}
                                                              </TooltipContent>
                                                          </Tooltip>
                                                      </div>
                                                  </li>
                                              )
                                          })}
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
    </TooltipProvider>
  );
}


export default function StudentPortfolioPage() {
    return (
        <Suspense fallback={<div>Chargement du portfolio...</div>}>
            <StudentPortfolio />
        </Suspense>
    )
}
