
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Frown, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-background text-foreground">
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center justify-center w-32 h-32 rounded-lg bg-gradient-to-br from-card to-background border-4 border-destructive shadow-lg">
          <Frown className="w-24 h-24 text-destructive" />
        </div>
      </div>
      <h1 className="font-headline text-6xl font-black uppercase tracking-widest text-destructive mb-2 text-center">
        404
      </h1>
      <p className="text-muted-foreground text-2xl mb-12 text-center">
        Oups... Page Introuvable
      </p>
      <p className="text-center text-muted-foreground max-w-md mb-8">
        La page que vous essayez de joindre n'existe pas, a été déplacée ou est temporairement indisponible.
      </p>
      <Button asChild size="lg" className="font-headline uppercase tracking-wider text-base border-2 border-accent bg-gradient-to-br from-primary to-racing-orange hover:brightness-110">
        <Link href="/">
            <ArrowLeft className="mr-2"/>
            Retour à l'accueil
        </Link>
      </Button>
    </div>
  );
}
