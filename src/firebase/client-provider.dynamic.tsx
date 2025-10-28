'use client';

import React, { useMemo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  // `useMemo` ensures Firebase is initialized only once per component lifecycle.
  const { firebaseApp, auth, firestore } = useMemo(() => {
    return initializeFirebase();
  }, []);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Ne rien rendre côté serveur
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
