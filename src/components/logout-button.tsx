'use client';

import { logout } from '@/app/teacher/actions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  return (
    <form action={logout}>
       <Button type="submit" variant="ghost" className="text-muted-foreground hover:bg-primary/20 hover:text-accent">
         <LogOut className="mr-2"/>
         Déconnexion
       </Button>
    </form>
  );
}
