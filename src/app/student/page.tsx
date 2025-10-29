

'use client';
import { Suspense, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { TP } from '@/lib/data-manager';
import type { TpStatus } from '@/firebase/provider';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RacingHelmet } from '@/components/icons';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { cn } from '@/lib/utils';
import { collection } from 'firebase/firestore';

function StudentDashboard() {
  const searchParams = useSearchParams();
  const studentName = searchParams.get('student');
  const { firestore, assignedTps, tps: allTps } = useFirebase();

  const { data: studentStoredEvals } = useCollection(useMemoFirebase(() => firestore && studentName ? collection(firestore, `students/${studentName}/storedEvals`) : null, [firestore, studentName]));

  const storedEvalsForStudent = useMemo(() => {
    const data: Record<string, any> = {};
    if (studentStoredEvals) {
        studentStoredEvals.forEach(doc => {
          data[doc.id] = doc;
        });
    }
    return data;
  }, [studentStoredEvals]);


  if (!studentName) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="font-headline text-3xl text-accent">Veuillez vous identifier</h1>
        <p className="text-muted-foreground mt-2">Retournez à la page de sélection pour choisir votre classe et votre nom.</p>
        <Button asChild className="mt-4">
          <Link href="/student/select">Retour à la sélection</Link>
        </Button>
      </div>
    );
  }

  const studentTps = assignedTps[studentName] || [];

  const tpModules = studentTps.map(assignedTp => {
    const tp = allTps[assignedTp.id];
    const isEvaluated = storedEvalsForStudent[tp?.id.toString()]?.isFinal;
    return tp ? { ...tp, status: assignedTp.status, isEvaluated } : null;
  }).filter((tp): tp is TP & { status: TpStatus; isEvaluated: boolean } => tp !== null);

  const getTpCategory = (tpId: number): string => {
    if (tpId >= 1000) return "TP Personnalisé";
    if (tpId >= 301) return 'Terminale / Diagnostic Avancé';
    if (tpId >= 1 && tpId < 101) return 'Première / Maintenance Corrective';
    if (tpId >= 101) return 'Seconde / Entretien Périodique';
    return 'Général';
  };
  
  const getTpImage = (tpTitre: string): ImagePlaceholder | undefined => {
    const lowerCaseTitre = tpTitre.toLowerCase();
    if (lowerCaseTitre.includes('frein') || lowerCaseTitre.includes('disques') || lowerCaseTitre.includes('plaquettes')) {
      return PlaceHolderImages.find(p => p.id === 'tp-suspension');
    }
    if (lowerCaseTitre.includes('pneu') || lowerCaseTitre.includes('roue') || lowerCaseTitre.includes('géométrie')) {
      return PlaceHolderImages.find(p => p.id === 'tp-aero');
    }
    if (lowerCaseTitre.includes('climatisation')) {
        return PlaceHolderImages.find(p => p.id === 'tp-air-conditioning');
    }
    if (lowerCaseTitre.includes('distribution') || lowerCaseTitre.includes('moteur') || lowerCaseTitre.includes('injection') || lowerCaseTitre.includes('vidange') || lowerCaseTitre.includes('huile')) {
      return PlaceHolderImages.find(p => p.id === 'tp-engine');
    }
    if (lowerCaseTitre.includes('électrique') || lowerCaseTitre.includes('batterie') || lowerCaseTitre.includes('câblage') || lowerCaseTitre.includes('ampoules') || lowerCaseTitre.includes('essuie-glace') || lowerCaseTitre.includes('phares')) {
        return PlaceHolderImages.find(p => p.id === 'tp-electrical');
    }
    return PlaceHolderImages.find(p => p.id === 'tp-engine');
  };

  const statusInfo = {
    'non-commencé': { text: 'Non commencé', icon: <ArrowRight className="ml-2"/>, buttonText: 'Commencer le TP', variant: 'default' as const, className: 'bg-gradient-to-r from-primary to-racing-orange hover:brightness-110'},
    'en-cours': { text: 'En cours', icon: <Clock className="mr-2" />, buttonText: 'Continuer le TP', variant: 'outline' as const, className: 'border-accent text-accent hover:bg-accent hover:text-black'},
    'terminé': { text: 'Terminé', icon: <CheckCircle className="mr-2" />, buttonText: 'Revoir le TP', variant: 'outline' as const, className: 'border-green-500 text-green-400 hover:bg-green-500 hover:text-black'},
  };

  return (
    <div className="space-y-8">
      <div>
          <h1 className="font-headline text-4xl lg:text-5xl tracking-wide">Mon Atelier</h1>
          <p className="text-muted-foreground mt-2">
              Votre parcours pour devenir un pro de la mécanique. Réalisez les TP et les évaluations pour monter en compétences.
          </p>
      </div>

      {tpModules.length > 0 ? (
        <section>
          <h2 className="font-headline text-3xl tracking-wide flex items-center gap-3 mb-6">
              <RacingHelmet className="w-8 h-8 text-primary"/>
              Mes Travaux Pratiques Assignés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tpModules.map((module) => {
              const image = getTpImage(module.titre);
              const currentStatusInfo = statusInfo[module.status as keyof typeof statusInfo] || statusInfo['non-commencé'];
              return (
                <Card key={module.id} className="flex flex-col overflow-hidden bg-card border-primary/30 hover:border-accent/50 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-accent/20">
                  <CardHeader className="p-0 relative">
                     {image && (
                       <Image
                          src={image.imageUrl}
                          alt={image.description}
                          width={400}
                          height={225}
                          className="w-full h-48 object-cover"
                          data-ai-hint={image.imageHint}
                        />
                     )}
                     <div className="absolute top-2 right-2 flex gap-2">
                        {module.isEvaluated && (
                            <Badge className="bg-sky-500 text-white">Évalué</Badge>
                        )}
                        <Badge className={cn(currentStatusInfo.className)}>{currentStatusInfo.text}</Badge>
                     </div>
                  </CardHeader>
                  <div className="p-6 flex-grow flex flex-col">
                    <Badge variant="outline" className="w-fit mb-2 border-accent text-accent">{getTpCategory(module.id)}</Badge>
                    <CardTitle className="font-headline tracking-wider text-2xl text-gray-100">{module.titre}</CardTitle>
                    <CardDescription className="mt-2 flex-grow">{module.objectif}</CardDescription>
                  </div>
                  <CardFooter>
                    <Button asChild className={cn("w-full font-bold font-headline uppercase tracking-wider", currentStatusInfo.className)} variant={currentStatusInfo.variant}>
                      <Link href={`/student/tp/${module.id}?student=${encodeURIComponent(studentName)}`}>
                        {currentStatusInfo.buttonText} 
                        {module.status === 'non-commencé' && currentStatusInfo.icon}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="text-center py-16 bg-card rounded-lg border-2 border-primary/30">
            <h2 className="font-headline text-3xl tracking-wide">Aucun TP assigné</h2>
            <p className="text-muted-foreground mt-2">Votre enseignant ne vous a pas encore assigné de travaux pratiques.</p>
        </section>
      )}

    </div>
  );
}

export default function StudentPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <StudentDashboard />
    </Suspense>
  )
}
