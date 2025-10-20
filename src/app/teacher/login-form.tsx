'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, KeyRound, Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="default" size="lg" className="w-full font-headline uppercase tracking-wider text-base border-2 border-accent bg-gradient-to-br from-primary to-racing-orange hover:brightness-110" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <KeyRound className="mr-2 h-4 w-4" />}
      Entrer
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, { error: undefined });

  return (
    <Card className="bg-gradient-to-br from-card to-background border-2 border-primary shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl font-black uppercase tracking-widest text-accent">
          Accès Sécurisé
        </CardTitle>
        <CardDescription>Veuillez entrer le mot de passe pour accéder à l'application.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-accent font-headline tracking-wider uppercase">Mot de passe</Label>
            <Input id="password" name="password" type="password" required className="text-center text-lg"/>
          </div>
          {state?.error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
