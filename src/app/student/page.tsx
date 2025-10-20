import Image from 'next/image';
import Link from 'next/link';
import { simulations, tpModules } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CheckeredFlag, RacingHelmet } from '@/components/icons';

export default function StudentPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="font-headline text-5xl tracking-wide mb-2">Mon Garage</h1>
        <p className="text-muted-foreground">Votre voyage vers l'ingénierie F1 commence ici. Complétez des modules et des simulations pour affiner vos compétences.</p>
      </section>

      <section>
        <h2 className="font-headline text-4xl tracking-wide flex items-center gap-3 mb-6">
            <RacingHelmet className="w-8 h-8"/>
            Travaux Pratiques (TPs)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tpModules.map((module) => {
            const image = PlaceHolderImages.find(p => p.id === module.imageId);
            return (
              <Card key={module.id} className="flex flex-col overflow-hidden hover:border-primary/50 transition-colors">
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
                  <Badge variant="secondary" className="w-fit mb-2">{module.category}</Badge>
                  <CardTitle className="font-headline tracking-wider text-2xl">{module.title}</CardTitle>
                  <CardDescription className="mt-2 flex-grow">{module.description}</CardDescription>
                </div>
                <CardFooter>
                  <Button asChild className="w-full font-bold">
                    <Link href="#">Commencer le module <ArrowRight className="ml-2"/></Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-headline text-4xl tracking-wide flex items-center gap-3 mb-6">
            <CheckeredFlag className="w-8 h-8" />
            Simulations de Course
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulations.map((sim) => {
             const image = PlaceHolderImages.find(p => p.id === sim.imageId);
            return (
              <Card key={sim.id} className="flex flex-col overflow-hidden hover:border-accent/50 transition-colors">
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
                    <CardTitle className="font-headline tracking-wider text-2xl">{sim.track}</CardTitle>
                    <CardDescription className="mt-2 flex-grow">{sim.description}</CardDescription>
                    {sim.bestLap && <p className="text-sm text-accent mt-4">Votre meilleur tour : <span className="font-mono font-bold">{sim.bestLap}</span></p>}
                </div>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full font-bold border-accent text-accent hover:bg-accent hover:text-black">
                    <Link href="#">Aller sur le circuit <ArrowRight className="ml-2"/></Link>
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
