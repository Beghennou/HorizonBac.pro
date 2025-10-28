'use client';

import { useFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';

export function LogoutButton() {
  const { auth } = useFirebase();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
      // The onAuthStateChanged listener in FirebaseProvider will handle the redirect.
    }
  };

  return (
    <Button onClick={handleLogout} variant="ghost" className="text-muted-foreground hover:bg-primary/20 hover:text-accent">
      <LogOut className="mr-2"/>
      Déconnexion
    </Button>
  );
}
