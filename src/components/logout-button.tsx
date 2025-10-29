
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
    <Button 
      onClick={handleLogout} 
      className="w-full justify-start text-base h-12 px-4 bg-gradient-to-br from-primary to-racing-orange text-white hover:brightness-110 font-headline uppercase tracking-wider"
    >
      <LogOut />
      <span>Déconnexion</span>
    </Button>
  );
}
