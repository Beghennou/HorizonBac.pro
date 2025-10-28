
'use client';

import { useSearchParams } from 'next/navigation';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useFirebase } from '@/firebase';
import Loading from './loading';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const { isLoaded, classes } = useFirebase();
  const currentClass = searchParams.get('class');

  if (!isLoaded) {
    return <Loading />;
  }

  // If classes are loaded and there's no class selected, show a message.
  if (classes.length > 0 && !currentClass) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <AlertTriangle className="w-16 h-16 text-accent mb-4" />
        <h1 className="font-headline text-3xl tracking-wide text-accent">Aucune classe sélectionnée</h1>
        <p className="text-muted-foreground text-lg mt-2 max-w-md">
          Veuillez sélectionner une classe dans le menu à gauche pour commencer.
        </p>
        <ArrowLeft className="h-24 w-24 text-primary mx-auto mt-8 motion-safe:animate-pulse" />
      </div>
    );
  }

  // If there are no classes at all, guide the user to the settings page.
  if (classes.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
            <h1 className="font-headline text-3xl tracking-wide text-destructive">Aucune classe n'est configurée</h1>
            <p className="text-muted-foreground text-lg mt-2 max-w-md">
                Pour commencer, veuillez ajouter des classes et des élèves dans la page <strong>Paramètres</strong>.
            </p>
        </div>
      );
  }

  // If a class is selected but we are on this root page, it means a redirect is likely pending
  // or user landed here by mistake. A loading state is appropriate.
  return <Loading />;
}
