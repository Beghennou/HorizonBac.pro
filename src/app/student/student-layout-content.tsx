'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { LyceeLogo } from '@/components/lycee-logo';
import { TachometerAnimation } from '@/components/TachometerAnimation';
import { Home, UserCircle, BookOpen } from 'lucide-react';
import { Award } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function StudentLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <TachometerAnimation />;
  }

  const studentParams = new URLSearchParams(searchParams.toString());
  const portfolioHref = `/student/portfolio?${studentParams.toString()}`;
  const mesTpHref = `/student?${studentParams.toString()}`;


  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl print-hidden">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-4 mr-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-primary to-racing-orange border-2 border-accent">
                <LyceeLogo className="w-9 h-9 text-white" />
              </div>
              <div>
                <h1 className="font-headline text-2xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text">
                  Horizon Bacpro
                </h1>
                <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Rénovation 2025 • Espace élève
                </p>
              </div>
            </Link>
          </div>
          <nav className="flex items-center gap-6 text-sm font-headline uppercase tracking-wider">
             <Button variant="ghost" asChild className="text-muted-foreground hover:bg-primary/20 hover:text-accent">
                <Link href="/">
                  <Home className="mr-2"/>
                  Accueil
                </Link>
            </Button>
            <Button variant="ghost" asChild className="text-muted-foreground hover:bg-primary/20 hover:text-accent">
                <Link href={mesTpHref}>
                    <BookOpen />
                    Mes TP
                </Link>
            </Button>
             <Button variant="ghost" asChild className="text-muted-foreground hover:bg-primary/20 hover:text-accent">
                <Link href={portfolioHref}>
                    <Award className="h-5 w-5"/>
                    Mon Portfolio
                </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="container py-8">{children}</main>
    </div>
  );
}
