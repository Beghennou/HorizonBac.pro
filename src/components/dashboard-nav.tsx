'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Book, Cog, Users, CheckSquare, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function DashboardNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const studentId = searchParams.get('student');

  const navItems = [
    { href: `/teacher/dashboard?${searchParams.toString()}`, label: 'Fiches TP', icon: Book, requiredParams: [] },
    { href: `/teacher/dashboard/students?${searchParams.toString()}`, label: 'Élèves', icon: Users, requiredParams: [] },
    { href: `/teacher/dashboard/student/${studentId}?${searchParams.toString()}`, label: 'Dossier Élève', icon: FileText, requiredParams: ['student'] },
    { href: `/teacher/dashboard/settings?${searchParams.toString()}`, label: 'Paramètres', icon: Cog, requiredParams: [] },
  ];

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        // Condition pour afficher l'élément de navigation
        if (item.requiredParams.length > 0 && !item.requiredParams.every(p => searchParams.has(p))) {
            return null;
        }

        const Icon = item.icon;
        const baseHref = item.href.split('?')[0];
        
        // Gérer la classe active pour les routes dynamiques
        const isActive = item.label === 'Dossier Élève' ? pathname.startsWith('/teacher/dashboard/student/') : pathname === baseHref;
        
        return (
          <Button
            key={item.href}
            asChild
            variant={isActive ? 'default' : 'ghost'}
            className={cn(
              'justify-start gap-3 text-base h-12 px-4',
              isActive
                ? 'bg-gradient-to-r from-primary to-racing-orange text-white'
                : 'hover:bg-primary/10 hover:text-accent'
            )}
          >
            <Link href={item.href}>
              <Icon className="h-5 w-5" />
              <span className="font-headline tracking-wider">{item.label}</span>
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
