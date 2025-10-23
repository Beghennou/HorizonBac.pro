'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { LyceeLogo } from '@/components/lycee-logo';
import { Home, BookOpen } from 'lucide-react';
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


export default function StudentLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const studentName = searchParams.get('student');
  const className = searchParams.get('class');

  useEffect(() => {
    // Redirect to select page if no student is selected, and we are not on the select page
    if (!studentName && pathname !== '/student/select') {
      router.replace('/student/select');
    }
  }, [studentName, pathname, router]);

  return (
     <SidebarProvider>
        <div className="bg-background min-h-screen">
          <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl print-hidden">
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
                     <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                      {studentName ? `Élève • ${className}` : 'Rénovation 2025 • Espace élève'}
                    </p>
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
                  <main className="flex-1 bg-card rounded-lg border-2 border-primary/30 shadow-2xl p-6 ml-8">
                    {children}
                  </main>
              </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
  );
}
