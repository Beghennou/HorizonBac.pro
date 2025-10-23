'use client';

import { useTransition } from 'react';
import { login, signInWithGoogle } from '@/app/teacher/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LyceeLogo } from '@/components/lycee-logo';
import { LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 48 48" width="24px" height="24px" {...props}>
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
    );
}


export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleLogin = (provider: 'password' | 'google') => {
    startTransition(async () => {
      try {
        if (provider === 'google') {
          await signInWithGoogle();
        } else {
          await login();
        }
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
        <CardContent className="space-y-4">
          <Button
              onClick={() => handleLogin('google')}
              size="lg"
              variant="outline"
              className="w-full font-headline uppercase tracking-wider text-base border-2 border-accent/50 bg-white text-black hover:bg-gray-100"
              disabled={isPending}
            >
              <GoogleIcon className="mr-2" />
              {isPending ? 'Connexion...' : 'Se connecter avec Google'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted-foreground" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Ou
              </span>
            </div>
          </div>

          <Button
            onClick={() => handleLogin('password')}
            size="lg"
            className="w-full font-headline uppercase tracking-wider text-base border-2 border-accent bg-gradient-to-br from-primary to-racing-orange hover:brightness-110"
            disabled={isPending}
          >
            <LogIn className="mr-2" />
            {isPending ? 'Connexion...' : 'Se connecter (Mode Démo)'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
