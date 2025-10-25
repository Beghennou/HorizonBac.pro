
'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { useFirebase, useMemoFirebase } from '@/firebase';
import { TachometerAnimation } from '@/components/TachometerAnimation';
import { Home, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { collection } from 'firebase/firestore';

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoaded: isFirebaseLoaded, tps: allTps, classes } = useFirebase();

  const level = (searchParams.get('level') as Niveau) || 'seconde';
  const selectedClass = searchParams.get('class') || null;

  const classNames = useMemo(() => classes.map(c => c.id), [classes]);

  const classesForLevel = useMemo(() => {
    return classNames.filter(c => {
        const id = c.toLowerCase();
        if (level === 'seconde') return id.startsWith('2');
        if (level === 'premiere') return id.startsWith('1');
        if (level === 'terminale') return id.startsWith('t');
        return false;
    }).sort();
  }, [level, classNames]);

  useEffect(() => {
    if (isFirebaseLoaded) {
      const currentClass = searchParams.get('class');
      const currentLevel = searchParams.get('level') as Niveau;

      const newSearchParams = new URLSearchParams(searchParams.toString());
      let needsRedirect = false;

      // 1. Ensure level is set
      let effectiveLevel = currentLevel;
      if (!['seconde', 'premiere', 'terminale'].includes(effectiveLevel)) {
          effectiveLevel = 'seconde';
          newSearchParams.set('level', effectiveLevel);
          needsRedirect = true;
      }

      // 2. Ensure a class is selected if available for the level
      const classesForCurrentLevel = classNames.filter(c => {
          const id = c.toLowerCase();
          if (effectiveLevel === 'seconde') return id.startsWith('2');
          if (effectiveLevel === 'premiere') return id.startsWith('1');
          if (effectiveLevel === 'terminale') return id.startsWith('t');
          return false;
      }).sort();
      
      if (!currentClass && classesForCurrentLevel.length > 0) {
          newSearchParams.set('class', classesForCurrentLevel[0]);
          needsRedirect = true;
      }

      // 3. Perform redirect if necessary
      if (needsRedirect) {
          const targetPath = pathname === '/teacher/dashboard' ? '/teacher/dashboard/class-progress' : pathname;
          router.replace(`${targetPath}?${newSearchParams.toString()}`);
      }
    }
  }, [isFirebaseLoaded, classNames, searchParams, pathname, router]);
  
  const isLoaded = isFirebaseLoaded && selectedClass !== null;

  if (!isLoaded) {
    return <TachometerAnimation />;
  }

  const handleNiveauChange = (newNiveau: Niveau) => {
    const firstClassForLevel = classNames.filter(c => {
        const id = c.toLowerCase();
        if (newNiveau === 'seconde') return id.startsWith('2');
        if (newNiveau === 'premiere') return id.startsWith('1');
        if (newNiveau === 'terminale') return id.startsWith('t');
        return false;
    }).sort()[0] || null;
    
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('level', newNiveau);
    if (firstClassForLevel) {
      newSearchParams.set('class', firstClassForLevel);
    }
    
    const targetPath = pathname.startsWith('/teacher/dashboard/student') ? '/teacher/dashboard/class-progress' : pathname;
    router.push(`${targetPath}?${newSearchParams.toString()}`);
  };

  const handleClassChange = (className: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('class', className);
    newSearchParams.delete('student');
    
    const basePath = pathname.startsWith('/teacher/dashboard/student') ? '/teacher/dashboard/class-progress' : pathname;
    router.push(`${basePath}?${newSearchParams.toString()}`);
  };
  
  const handleTpSelect = (id: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('tp', id.toString());
    router.push(`/teacher/dashboard?${newSearchParams.toString()}`);
  };
  
  const handleEditTp = (tpId: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('editTp', tpId.toString());
    router.push(`/teacher/dashboard/tp-designer?${newSearchParams.toString()}`);
  };

  const tps = getTpsByNiveau(level, allTps);
  const selectedTpId = searchParams.get('tp') ? parseInt(searchParams.get('tp')!, 10) : null;

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
                <div className="flex border-2 border-primary rounded-md overflow-hidden bg-card">
                  {(['seconde', 'premiere', 'terminale'] as Niveau[]).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => handleNiveauChange(lvl)}
                      className={`px-4 py-2 font-headline uppercase tracking-wider text-sm transition-colors ${level === lvl ? 'bg-gradient-to-r from-primary to-racing-orange text-white' : 'hover:bg-primary/20'}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
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
                        <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Navigation</h3>
                        <DashboardNav />
                      </div>

                      <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                        <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Sélection de la classe</h3>
                        {classesForLevel.length > 0 ? (
                            <Select value={selectedClass || ''} onValueChange={handleClassChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choisir une classe..." />
                            </SelectTrigger>
                            <SelectContent>
                                {classesForLevel.map(className => (
                                    <SelectItem key={className} value={className}>{className}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        ) : (
                            <p className="text-sm text-muted-foreground">Aucune classe pour ce niveau.</p>
                        )}
                      </div>
                    
                      <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl flex-1">
                        <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Liste des TP ({level})</h3>
                        <ScrollArea className="h-[calc(100%-3rem)]">
                           <div className="space-y-2 pr-4">
                            {tps.map(tp => (
                              <div key={tp.id} 
                                className={`p-3 rounded-md bg-background/50 hover:bg-primary/10 border border-transparent hover:border-primary/50 transition-all group relative ${selectedTpId === tp.id ? 'bg-primary/20 border-accent' : ''}`}>
                                <div onClick={() => handleTpSelect(tp.id)} className="cursor-pointer">
                                  <p className="font-bold text-sm text-accent">TP {tp.id}</p>
                                  <p className="text-sm text-foreground/80">{tp.titre}</p>
                                </div>
                                {tp.id >= 1000 && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleEditTp(tp.id)}
                                    aria-label="Modifier le TP"
                                  >
                                    <Pencil className="h-4 w-4 text-accent"/>
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
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
