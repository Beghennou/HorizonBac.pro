
'use client';

import { useEffect, Suspense, useCallback, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Home, BookOpen, Book, User, LogOut } from 'lucide-react';
import { Award } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
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
     <SidebarMenu>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.exact ? pathname === item.base : pathname.startsWith(item.base);
        const finalHref = createUrl(item.href);

        return (
          <SidebarMenuItem key={item.href}>
             <SidebarMenuButton asChild isActive={isActive}>
                <Link href={finalHref}>
                  <Icon />
                  <span>{item.label}</span>
                </Link>
             </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}


function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const studentName = searchParams.get('student');
    const { isLoaded } = useFirebase();
    const [isAnimationTimeElapsed, setIsAnimationTimeElapsed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsAnimationTimeElapsed(true);
        }, 3000); 

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isLoaded && !studentName && pathname !== '/student/select') {
            router.replace('/student/select');
        }
    }, [studentName, pathname, router, isLoaded]);

    if (!isLoaded || !isAnimationTimeElapsed) {
        return <TachometerAnimation />;
    }

    // Si on est sur la page de sélection, on n'affiche pas le layout complet
    if (pathname === '/student/select') {
        return <div className="flex items-center justify-center min-h-screen bg-background">{children}</div>;
    }

    return <>{children}</>;
}


export default function StudentLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { customSignOut } = useFirebase();
  const studentName = searchParams.get('student');
  const className = searchParams.get('class');

  const handleLogout = useCallback(async () => {
    await customSignOut();
    router.push('/');
  }, [customSignOut, router]);

  return (
     <SidebarProvider>
      <LayoutWrapper>
        <div className="bg-background min-h-screen">
          <header className="sticky top-0 z-40 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl print-hidden">
            <div className="container flex h-20 items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden"/>
                <Link href="/" className="flex items-center gap-4">
                  <h1 className="font-headline text-2xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text">
                    HORIZON BAC. PRO.
                  </h1>
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-primary to-racing-orange border-2 border-accent">
                    <Logo className="w-10 h-10 text-white" />
                  </div>
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
                            <div className="px-2">
                                <h2 className="font-headline text-lg tracking-wider text-accent">{studentName}</h2>
                                <p className="text-sm text-muted-foreground">{className}</p>
                            </div>
                            {studentName && <StudentNav />}
                        </div>
                    </SidebarContent>
                    <SidebarFooter className="p-4 flex-col gap-4">
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
      </LayoutWrapper>
    </SidebarProvider>
  );
}
