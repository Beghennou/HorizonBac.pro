'use client';

import { useFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const { customSignOut } = useFirebase();
  const router = useRouter();

  const handleLogout = async () => {
    await customSignOut();
    router.push('/');
  };

  return (
    <Button onClick={handleLogout} variant="ghost" className="text-muted-foreground hover:bg-primary/20 hover:text-accent">
      <LogOut className="mr-2"/>
      Déconnexion
    </Button>
  );
}
