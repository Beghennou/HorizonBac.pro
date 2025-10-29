
'use client';

import { Suspense, useEffect, useCallback, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Niveau } from '@/lib/data-manager';
import { DashboardNav } from '@/components/dashboard-nav';
import { LyceeLogo } from '@/components/lycee-logo';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useFirebase } from '@/firebase';
import { TachometerAnimation } from '@/components/TachometerAnimation';
import { Home, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '@/components/logout-button';

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
  const { isLoaded, classes, teacherName, customSignOut } = useFirebase();

  const [isAnimationTimeElapsed, setIsAnimationTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationTimeElapsed(true);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  const selectedClass = searchParams.get('class') || '';
  const classNames = (classes || []).map(c => c.id).sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    if (isLoaded && !teacherName) {
      router.replace('/teacher/login');
    }
  }, [isLoaded, teacherName, router]);

  const handleLogout = useCallback(async () => {
    await customSignOut();
    router.push('/');
  }, [customSignOut, router]);

  if (!isLoaded || !isAnimationTimeElapsed) {
    return <TachometerAnimation />;
  }

  const handleClassChange = (className: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('class', className);
    newSearchParams.set('level', getLevelFromClassName(className));
    newSearchParams.delete('student');
    
    const targetPath = pathname === '/teacher/dashboard' ? '/teacher/dashboard/class-progress' : pathname;
    router.push(`${targetPath}?${newSearchParams.toString()}`);
  };

  return (
      <SidebarProvider>
        <div className="bg-background min-h-screen">
            <header className="sticky top-0 z-30 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl">
                <div className="container flex h-20 items-center justify-between">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="md:hidden"/>
                    <Link href="/" className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-primary to-racing-orange border-2 border-accent">
                        <LyceeLogo className="w-9 h-9 text-white" />
                    </div>
                     <h1 className="font-headline text-2xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text">
                        Horizon Bacpro
                    </h1>
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" asChild className="text-muted-foreground hover:bg-primary/20 hover:text-accent">
                        <Link href="/">
                        <Home className="mr-2"/>
                        Accueil
                        </Link>
                    </Button>
                    <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:bg-primary/20 hover:text-accent">
                        <LogOut className="mr-2"/>
                        Déconnexion
                    </Button>
                </div>
                </div>
            </header>
          <SidebarInset>
              <div className="container flex flex-1 py-8">
                  <Sidebar>
                    <SidebarContent className="p-2 justify-end">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-headline text-sm text-accent uppercase tracking-wider mb-1 px-2">Sélection classe :</h3>
                                {classNames.length > 0 ? (
                                    <div className="px-2">
                                        <Select value={selectedClass} onValueChange={handleClassChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choisir une classe..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {classNames.map(className => (
                                                <SelectItem key={className} value={className}>{className}</SelectItem>
                                            ))}
                                        </SelectContent>
                                        </Select>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground px-2">Aucune classe n'est configurée.</p>
                                )}
                            </div>
                            <DashboardNav />
                        </div>
                    </SidebarContent>
                    <SidebarFooter className="p-4 flex-col gap-4">
                        <Button variant="secondary" className="w-full justify-start text-base h-12 px-4">
                            <User /> <span>{teacherName}</span>
                        </Button>
                        <LogoutButton />
                    </SidebarFooter>
                  </Sidebar>
                  <main className="flex-1 md:ml-8 flex flex-col gap-6">
                        <div className="flex-1 bg-card rounded-lg border-2 border-primary/30 shadow-2xl p-6">
                        {children}
                    </div>
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
