'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { classes, getTpsByNiveau, Niveau } from '@/lib/data-manager';
import { LogoutButton } from '@/components/logout-button';
import { DashboardNav } from '@/components/dashboard-nav';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [niveau, setNiveau] = useState<Niveau>('seconde');
  const [selectedClass, setSelectedClass] = useState<string>(Object.keys(classes)[0]);
  
  const selectedTpId = searchParams.get('tp') ? parseInt(searchParams.get('tp')!, 10) : null;
  
  const tps = getTpsByNiveau(niveau);

  const handleNiveauChange = (newNiveau: Niveau) => {
    setNiveau(newNiveau);
    const firstClassForLevel = Object.keys(classes).find(c => {
        if (newNiveau === 'seconde') return c.startsWith('2nde');
        if (newNiveau === 'premiere') return c.startsWith('1ere');
        if (newNiveau === 'terminale') return c.startsWith('Term');
        return false;
    }) || Object.keys(classes)[0];
    setSelectedClass(firstClassForLevel);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('tp');
    if (!pathname.includes('competences')) {
        newSearchParams.delete('student');
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };
  
  const handleTpSelect = (id: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('tp', id.toString());
    newSearchParams.set('level', niveau);
    
    // Only redirect to main dashboard if we are not on a student/competence page
    const targetPath = (pathname.startsWith('/teacher/dashboard/students') || pathname.startsWith('/teacher/dashboard/competences'))
      ? pathname
      : '/teacher/dashboard';

    router.push(`${targetPath}?${newSearchParams.toString()}`);
  }

  const handleStudentSelect = (studentName: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('student', studentName);
      newSearchParams.set('level', niveau);
      const targetPath = pathname.startsWith('/teacher/dashboard/students') || pathname.startsWith('/teacher/dashboard/competences')
        ? pathname
        : '/teacher/dashboard/students';
      router.push(`${targetPath}?${newSearchParams.toString()}`);
  }

  const studentsInClass = classes[selectedClass as keyof typeof classes] || [];


  return (
    <SidebarProvider>
      <div className="bg-background min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl">
          <div className="container flex h-20 items-center justify-between">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden"/>
                <Link href="/teacher/dashboard" className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-primary to-racing-orange border-2 border-accent">
                    <Logo className="w-7 h-7 text-white" />
                </div>
                <div>
                    <h1 className="font-headline text-2xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text">
                    Racing Performance
                    </h1>
                    <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Rénovation 2025 • Lycée des métiers</p>
                </div>
                </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex border-2 border-primary rounded-md overflow-hidden bg-card">
                   {(['seconde', 'premiere', 'terminale'] as Niveau[]).map((lvl) => (
                      <button
                          key={lvl}
                          onClick={() => handleNiveauChange(lvl)}
                          className={`px-4 py-2 font-headline uppercase tracking-wider text-sm transition-colors ${niveau === lvl ? 'bg-gradient-to-r from-primary to-racing-orange text-white' : 'hover:bg-primary/20'}`}
                      >
                          {lvl}
                      </button>
                  ))}
              </div>
              <LogoutButton />
            </div>
          </div>
        </header>
        <div className="container grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr] gap-6 py-8">
            <aside className="hidden md:block">
              <div className="sticky top-24 space-y-6">
                <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                    <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Navigation</h3>
                    <DashboardNav />
                </div>

                <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                  <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Sélection de la classe</h3>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger>
                          <SelectValue placeholder="Choisir une classe..." />
                      </SelectTrigger>
                      <SelectContent>
                          {Object.keys(classes).map(className => (
                              <SelectItem key={className} value={className}>{className}</SelectItem>
                          ))}
                      </SelectContent>
                  </Select>
                </div>
                <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                    <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Élèves de {selectedClass}</h3>
                    <ScrollArea className="h-60">
                        <div className="space-y-2">
                            {studentsInClass.map(student => (
                                <div key={student}
                                    onClick={() => handleStudentSelect(student)}
                                    className={`p-3 rounded-md bg-background/50 hover:bg-primary/10 border border-transparent hover:border-primary/50 cursor-pointer transition-all ${decodeURIComponent(searchParams.get('student') || '') === student ? 'bg-primary/20 border-accent' : ''}`}>
                                    <p className="font-semibold text-sm text-foreground/90">{student}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                  <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Liste des TP ({niveau})</h3>
                  <ScrollArea className="h-96">
                      <div className="space-y-2">
                          {tps.map(tp => (
                              <div key={tp.id} 
                                  onClick={() => handleTpSelect(tp.id)}
                                  className={`p-3 rounded-md bg-background/50 hover:bg-primary/10 border border-transparent hover:border-primary/50 cursor-pointer transition-all ${selectedTpId === tp.id ? 'bg-primary/20 border-accent' : ''}`}>
                                  <p className="font-bold text-sm text-accent">TP {tp.id}</p>
                                  <p className="text-sm text-foreground/80">{tp.titre}</p>
                              </div>
                          ))}
                      </div>
                  </ScrollArea>
                </div>
              </div>
          </aside>
          <main className="bg-card rounded-lg border-2 border-primary/30 shadow-2xl p-6">
            {children}
          </main>
        </div>
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-primary to-racing-orange border-2 border-accent">
                        <Logo className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="font-headline text-xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text">
                        RP 2025
                        </h1>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="flex flex-col gap-4">
                 <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                    <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Navigation</h3>
                    <DashboardNav />
                </div>
                
                <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                  <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Élèves de {selectedClass}</h3>
                    <ScrollArea className="h-60">
                        <div className="space-y-2">
                            {studentsInClass.map(student => (
                                <div key={student}
                                    onClick={() => handleStudentSelect(student)}
                                    className={`p-3 rounded-md bg-background/50 hover:bg-primary/10 border border-transparent hover:border-primary/50 cursor-pointer transition-all ${decodeURIComponent(searchParams.get('student') || '') === student ? 'bg-primary/20 border-accent' : ''}`}>
                                    <p className="font-semibold text-sm text-foreground/90">{student}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                  <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Liste des TP ({niveau})</h3>
                  <ScrollArea className="h-96">
                      <div className="space-y-2">
                          {tps.map(tp => (
                              <div key={tp.id} 
                                  onClick={() => handleTpSelect(tp.id)}
                                  className={`p-3 rounded-md bg-background/50 hover:bg-primary/10 border border-transparent hover:border-primary/50 cursor-pointer transition-all ${selectedTpId === tp.id ? 'bg-primary/20 border-accent' : ''}`}>
                                  <p className="font-bold text-sm text-accent">TP {tp.id}</p>
                                  <p className="text-sm text-foreground/80">{tp.titre}</p>
                              </div>
                          ))}
                      </div>
                  </ScrollArea>
                </div>
            </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
