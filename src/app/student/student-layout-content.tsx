
'use client';

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { LyceeLogo } from '@/components/lycee-logo';
import { Home, BookOpen, Book } from 'lucide-react';
import { Award } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import StudentSelector from './student-selector';
import { useFirebase } from '@/firebase';
import { TachometerAnimation } from '@/components/TachometerAnimation';
import { LogoutButton } from '@/components/logout-button';
import { Card } from '@/components/ui/card';


function StudentNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createUrl = (base: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return `${base}?${params.toString()}`;
  };

  const navItems = [
    { href: '/student', label: 'Mes TP', icon: BookOpen, base: '/student', exact: true },
    { href: '/student/tp-list', label: 'Fiches TP', icon: Book, base: '/student/tp-list' },
    { href: '/student/portfolio', label: 'Mon Portfolio', icon: Award, base: '/student/portfolio' },
  ];

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.exact ? pathname === item.base : pathname.startsWith(item.base);
        const finalHref = createUrl(item.href);

        return (
          <Button
            key={item.href}
            asChild
            variant={isActive ? 'default' : 'ghost'}
            className={`justify-start gap-3 text-base h-12 px-4 ${
              isActive
                ? 'bg-gradient-to-r from-primary to-racing-orange text-white'
                : 'hover:bg-primary/10 hover:text-accent'
            }`}
          >
            <Link href={finalHref}>
              <Icon className="h-5 w-5" />
              <span className="font-headline tracking-wider">{item.label}</span>
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}


function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const studentName = searchParams.get('student');
    const { isLoaded } = useFirebase();

    useEffect(() => {
        if (isLoaded && !studentName && pathname !== '/student/select') {
            router.replace('/student/select');
        }
    }, [studentName, pathname, router, isLoaded]);

    if (!isLoaded) {
        return <TachometerAnimation />;
    }

    return <>{children}</>;
}


export default function StudentLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const studentName = searchParams.get('student');
  const className = searchParams.get('class');
  const teacherName = searchParams.get('teacher');

  return (
     <SidebarProvider>
      <LayoutWrapper>
        <div className="bg-background min-h-screen">
          <header className="sticky top-0 z-40 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl print-hidden">
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
              <div className="flex items-center gap-4">
                 <Button variant="ghost" asChild className="text-muted-foreground hover:bg-primary/20 hover:text-accent">
                    <Link href="/">
                      <Home className="mr-2"/>
                      Accueil
                    </Link>
                </Button>
                <LogoutButton />
              </div>
            </div>
          </header>
          <SidebarInset>
              <div className="container flex flex-1 py-8">
                  <Sidebar>
                    <SidebarContent className="flex flex-col gap-4 p-0">
                      <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                        <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Identification</h3>
                        <StudentSelector />
                      </div>
                      {studentName && (
                        <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                          <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Navigation</h3>
                          <StudentNav />
                        </div>
                      )}
                    </SidebarContent>
                  </Sidebar>
                  <main className="flex-1 md:ml-8 flex flex-col gap-6">
                    <Card className="bg-card border-2 border-primary/30 shadow-2xl">
                       <div className="p-4 flex justify-between items-center">
                           <div>
                               <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                                   Élève
                               </p>
                               <h2 className="font-headline text-2xl font-bold text-accent">{studentName}</h2>
                           </div>
                           <div className="text-right">
                               <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Classe</p>
                               <h2 className="font-headline text-2xl font-bold text-accent">{className}</h2>
                           </div>
                           <div className="text-right">
                               <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Enseignant</p>
                               <h2 className="font-headline text-2xl font-bold text-accent">{teacherName}</h2>
                           </div>
                       </div>
                    </Card>
                    <div className="flex-1 bg-card rounded-lg border-2 border-primary/30 shadow-2xl p-6">
                       {children}
                   </div>
                 </main>
              </div>
          </SidebarInset>
        </div>
      </LayoutWrapper>
    </SidebarProvider>
  );
}
