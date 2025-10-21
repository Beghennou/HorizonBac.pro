import { LyceeLogo } from '@/components/lycee-logo';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { School, UserCog } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center justify-center w-32 h-32 rounded-lg bg-gradient-to-br from-primary to-racing-orange border-4 border-accent shadow-lg">
          <LyceeLogo className="w-24 h-24 text-white" />
        </div>
      </div>
      <h1 className="font-headline text-5xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text mb-2 text-center">
        TP Atelier Pro
      </h1>
      <p className="text-muted-foreground text-xl mb-12 text-center">Plateforme de suivi des compétences pour la maintenance automobile</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="bg-gradient-to-br from-card to-background border-2 border-primary shadow-2xl hover:border-accent transition-all transform hover:-translate-y-1">
          <CardHeader className="text-center">
            <UserCog className="mx-auto h-12 w-12 text-accent mb-4" />
            <CardTitle className="font-headline text-3xl font-black uppercase tracking-widest text-accent">
              Espace Enseignant
            </CardTitle>
            <CardDescription>Gérez les classes, assignez les TP et suivez la progression de vos élèves.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="w-full font-headline uppercase tracking-wider text-base border-2 border-accent bg-gradient-to-br from-primary to-racing-orange hover:brightness-110">
              <Link href="/teacher/dashboard/students">Accéder au tableau de bord</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-background border-2 border-primary shadow-2xl hover:border-accent transition-all transform hover:-translate-y-1">
          <CardHeader className="text-center">
            <School className="mx-auto h-12 w-12 text-accent mb-4" />
            <CardTitle className="font-headline text-3xl font-black uppercase tracking-widest text-accent">
              Espace Élève
            </CardTitle>
            <CardDescription>Consultez vos travaux pratiques assignés et suivez votre parcours de formation.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button asChild size="lg" className="w-full font-headline uppercase tracking-wider text-base border-accent text-accent" variant="outline">
              <Link href="/student/select">Consulter mes TP</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
       <div className="mt-12 text-center">
            <Button asChild variant="link" className="text-accent">
                <Link href="/tutorial">
                    Comment ça marche ? (Tutoriel)
                </Link>
            </Button>
        </div>
    </div>
  );
}
