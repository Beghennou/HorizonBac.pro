import Image from 'next/image';
import Link from 'next/link';
import { simulations } from '@/lib/mock-data';
import { tpSeconde } from '@/lib/tp-seconde';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CheckeredFlag, RacingHelmet } from '@/components/icons';

export default function StudentPage() {
  const tpModules = Object.values(tpSeconde).map(tp => ({
    id: `tp-${tp.id}`,
    tpId: tp.id,
    title: tp.titre,
    description: tp.objectif,
    category: 'Mécanique', // Catégorie générique pour l'instant
    imageId: 'tp-engine', // imageId générique pour l'instant
  }));

  return (
    <div className="space-y-12">
      <section>
        <h1 className="font-headline text-5xl tracking-wide mb-2 text-accent">Mon Atelier</h1>
        <p className="text-muted-foreground">Votre parcours pour devenir un pro de la mécanique commence ici. Réalisez des TP et des évaluations pour monter en compétences.</p>
      </section>

      <section>
        <h2 className="font-headline text-4xl tracking-wide flex items-center gap-3 mb-6">
            <RacingHelmet className="w-8 h-8 text-primary"/>
            Mes Travaux Pratiques (TPs)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tpModules.map((module) => {
            const image = PlaceHolderImages.find(p => p.id === module.imageId) || PlaceHolderImages.find(p => p.id === 'tp-engine');
            return (
              <Card key={module.id} className="flex flex-col overflow-hidden bg-card border-primary/30 hover:border-accent/50 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-accent/20">
                <CardHeader className="p-0">
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
                </CardHeader>
                <div className="p-6 flex-grow flex flex-col">
                  <Badge variant="outline" className="w-fit mb-2 border-accent text-accent">{module.category}</Badge>
                  <CardTitle className="font-headline tracking-wider text-2xl text-gray-100">{module.title}</CardTitle>
                  <CardDescription className="mt-2 flex-grow">{module.description}</CardDescription>
                </div>
                <CardFooter>
                  <Button asChild className="w-full font-bold font-headline uppercase tracking-wider bg-gradient-to-r from-primary to-racing-orange hover:brightness-110">
                    <Link href={`/student/tp/${module.tpId}`}>Commencer le TP <ArrowRight className="ml-2"/></Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-headline text-4xl tracking-wide flex items-center gap-3 mb-6">
            <CheckeredFlag className="w-8 h-8 text-accent" />
            Évaluations &amp; Compétences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulations.map((sim) => {
             const image = PlaceHolderImages.find(p => p.id === sim.imageId);
            return (
               <Card key={sim.id} className="flex flex-col overflow-hidden bg-card border-primary/30 hover:border-accent/50 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-accent/20">
                <CardHeader className="p-0">
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
                </CardHeader>
                <div className="p-6 flex-grow flex flex-col">
                    <CardTitle className="font-headline tracking-wider text-2xl text-gray-100">{sim.track}</CardTitle>
                    <CardDescription className="mt-2 flex-grow">{sim.description}</CardDescription>
                    {sim.bestLap && <p className="text-sm text-accent mt-4">Votre meilleur score : <span className="font-mono font-bold">{sim.bestLap}</span></p>}
                </div>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full font-bold font-headline uppercase tracking-wider border-accent text-accent hover:bg-accent hover:text-black">
                    <Link href="#">Voir l'évaluation <ArrowRight className="ml-2"/></Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
