'use client';

import { Suspense } from 'react';

// Ce layout minimaliste est spécifiquement pour la vue d'impression des fiches TP.
// Il n'inclut pas les barres de navigation ou autres éléments d'interface.
export default function TpFicheLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Suspense fallback={<div>Chargement de la fiche...</div>}>
        {children}
      </Suspense>
  );
}
