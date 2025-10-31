
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { School, UserCog } from 'lucide-react';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const [cursus, setCursus] = useState('bacpro');

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 bg-hero-image">
      <div className="absolute inset-0 bg-black/60 z-10" />

      <main className="z-20 flex flex-col items-center justify-center text-center text-white w-full max-w-4xl">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-racing-orange border-2 border-accent shadow-lg">
            <Logo className="w-20 h-20 text-white" />
          </div>
        </div>

        <h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-widest text-shadow-lg">
          HORIZON
        </h1>
        <p className="font-headline text-2xl md:text-3xl font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text mb-4 text-shadow">
          BAC. PRO. & CAP
        </p>
        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mb-10 text-shadow">
          La plateforme de suivi des compétences pour la nouvelle génération de techniciens automobiles.
        </p>

        <Card className="w-full max-w-lg bg-black/50 backdrop-blur-lg border-2 border-primary/50 shadow-2xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold font-headline text-accent mb-4">Choisissez votre parcours</h2>
            <Tabs defaultValue="bacpro" value={cursus} onValueChange={setCursus} className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bacpro">Bac Pro</TabsTrigger>
                <TabsTrigger value="cap">CAP</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button asChild size="lg" className="h-20 text-lg w-full font-headline uppercase tracking-wider border-2 border-accent bg-gradient-to-br from-primary to-racing-orange hover:brightness-125 transition-all duration-300 transform hover:scale-105">
                <Link href={`/teacher/select?cursus=${cursus}`}>
                  <div className="flex flex-col items-center">
                    <UserCog className="h-8 w-8 mb-1"/>
                    <span>Enseignant</span>
                  </div>
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-20 text-lg w-full font-headline uppercase tracking-wider border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-black transition-all duration-300 transform hover:scale-105">
                <Link href={`/student/select?cursus=${cursus}`}>
                  <div className="flex flex-col items-center">
                    <School className="h-8 w-8 mb-1"/>
                    <span>Élève</span>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 flex gap-4">
            <Button asChild variant="link" className="text-accent hover:text-yellow-300">
                <Link href="/tutorial">
                    Comment ça marche ?
                </Link>
            </Button>
            <Button asChild variant="link" className="text-neutral-400 hover:text-white">
                <Link href="/privacy">
                    Confidentialité
                </Link>
            </Button>
        </div>
      </main>
      
      <style jsx>{`
        .text-shadow-lg {
          text-shadow: 0 0 15px rgba(0,0,0,0.7);
        }
        .text-shadow {
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
}
