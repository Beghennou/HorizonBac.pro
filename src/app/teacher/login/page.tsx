'use client';

import { useTransition } from 'react';
import { login } from '@/app/teacher/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LyceeLogo } from '@/components/lycee-logo';
import { LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleLogin = () => {
    startTransition(async () => {
      try {
        await login();
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Erreur de connexion',
          description: 'Une erreur est survenue lors de la tentative de connexion.',
        });
      }
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <Card className="w-full max-w-md bg-gradient-to-br from-card to-background border-2 border-primary shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-racing-orange border-4 border-accent shadow-lg">
              <LyceeLogo className="w-20 h-20 text-white" />
            </div>
          </div>
          <CardTitle className="font-headline text-3xl font-black uppercase tracking-widest text-accent">
            Accès Enseignant
          </CardTitle>
          <CardDescription>
            Veuillez vous connecter pour accéder au tableau de bord.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleLogin}>
            <Button
              type="submit"
              size="lg"
              className="w-full font-headline uppercase tracking-wider text-base border-2 border-accent bg-gradient-to-br from-primary to-racing-orange hover:brightness-110"
              disabled={isPending}
            >
              <LogIn className="mr-2" />
              {isPending ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
