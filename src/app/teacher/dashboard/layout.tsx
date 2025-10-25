
'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getTpsByNiveau, Niveau } from '@/lib/data-manager';
import { DashboardNav } from '@/components/dashboard-nav';
import { LyceeLogo } from '@/components/lycee-logo';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { useFirebase } from '@/firebase';
import { TachometerAnimation } from '@/components/TachometerAnimation';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

function getLevelFromClassName(className: string | null): Niveau {
    if (!className) return 'seconde';
    const lowerCaseName = className.toLowerCase();
    if (lowerCaseName.startsWith('t')) return 'terminale';
    if (lowerCaseName.startsWith('1')) return 'premiere';
    return 'seconde';
}

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoaded: isFirebaseLoaded, classes } = useFirebase();

  const selectedClass = searchParams.get('class') || null;
  const level = getLevelFromClassName(selectedClass);

  const classNames = useMemo(() => classes.map(c => c.id).sort((a,b) => a.localeCompare(b)), [classes]);

  useEffect(() => {
    if (isFirebaseLoaded) {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      let needsRedirect = false;

      // 1. Ensure a class is selected if available
      if (!selectedClass && classNames.length > 0) {
          const firstClass = classNames[0];
          newSearchParams.set('class', firstClass);
          newSearchParams.set('level', getLevelFromClassName(firstClass));
          needsRedirect = true;
      }
      
      // 2. Ensure level is in sync with class
      const currentLevelInUrl = searchParams.get('level');
      const derivedLevel = getLevelFromClassName(selectedClass);
      if (currentLevelInUrl !== derivedLevel) {
          newSearchParams.set('level', derivedLevel);
          needsRedirect = true;
      }

      // 3. Perform redirect if necessary
      if (needsRedirect) {
          const targetPath = pathname === '/teacher/dashboard' ? '/teacher/dashboard/class-progress' : pathname;
          router.replace(`${targetPath}?${newSearchParams.toString()}`);
      }
    }
  }, [isFirebaseLoaded, classNames, selectedClass, searchParams, pathname, router]);
  
  const isLoaded = isFirebaseLoaded && selectedClass !== null;

  if (!isLoaded) {
    return <TachometerAnimation />;
  }

  const handleClassChange = (className: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('class', className);
    newSearchParams.set('level', getLevelFromClassName(className));
    newSearchParams.delete('student');
    
    const basePath = pathname.startsWith('/teacher/dashboard/student') ? '/teacher/dashboard/class-progress' : pathname;
    router.push(`${basePath}?${newSearchParams.toString()}`);
  };

  return (
      <SidebarProvider>
        <div className="bg-background min-h-screen">
          <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl">
            <div className="container flex h-20 items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden"/>
                <Link href="/" className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-primary to-racing-orange border-2 border-accent">
                    <LyceeLogo className="w-9 h-9 text-white" />
                  </div>
                  <div>
                    <h1 className="font-headline text-2xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text">
                      Horizon Bacpro
                    </h1>
                    <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Espace Enseignant • Lycée des métiers</p>
                  </div>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                 <Button variant="ghost" asChild className="text-muted-foreground hover:bg-primary/20 hover:text-accent">
                    <Link href="/">
                      <Home className="mr-2"/>
                      Accueil
                    </Link>
                </Button>
              </div>
            </div>
          </header>
          <SidebarInset>
              <div className="container flex flex-1 py-8">
                  <Sidebar>
                    <SidebarContent className="flex flex-col gap-4 p-0">
                       <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                        <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Sélection de la classe</h3>
                        {classNames.length > 0 ? (
                            <Select value={selectedClass || ''} onValueChange={handleClassChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choisir une classe..." />
                            </SelectTrigger>
                            <SelectContent>
                                {classNames.map(className => (
                                    <SelectItem key={className} value={className}>{className}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        ) : (
                            <p className="text-sm text-muted-foreground">Aucune classe pour ce niveau.</p>
                        )}
                      </div>

                      <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl flex-1">
                        <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Navigation</h3>
                        <DashboardNav />
                      </div>
                    </SidebarContent>
                  </Sidebar>
                  <main className="flex-1 bg-card rounded-lg border-2 border-primary/30 shadow-2xl p-6 ml-8">
                    {children}
                  </main>
              </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
  );
}

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<TachometerAnimation />}>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}
