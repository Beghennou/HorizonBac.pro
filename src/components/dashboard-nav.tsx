
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Book, Cog, Users, FileText, BarChart3, DraftingCompass, CheckSquare } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function DashboardNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const studentName = searchParams.get('student');
  
  const navItems = [
    { href: `/teacher/dashboard/class-progress`, label: 'Suivi Classe', icon: CheckSquare, base: '/teacher/dashboard/class-progress'},
    { href: '/teacher/dashboard/students', label: 'Assigner des TPs', icon: Users, base: '/teacher/dashboard/students' },
    { href: `/teacher/dashboard/student/${studentName}`, label: 'Dossier Élève', icon: FileText, base: '/teacher/dashboard/student', requiredParam: 'student'},
    { href: '/teacher/dashboard/analytics', label: 'Analyses', icon: BarChart3, base: '/teacher/dashboard/analytics' },
    { href: '/teacher/dashboard', label: 'Fiches TP', icon: Book, base: '/teacher/dashboard', exact: true },
    { href: '/teacher/dashboard/tp-designer', label: 'Concepteur TP', icon: DraftingCompass, base: '/teacher/dashboard/tp-designer' },
    { href: `/teacher/dashboard/settings`, label: 'Paramètres', icon: Cog, base: '/teacher/dashboard/settings' },
  ];

  const createUrl = (base: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (['/teacher/dashboard', '/teacher/dashboard/settings', '/teacher/dashboard/class-progress', '/teacher/dashboard/analytics', '/teacher/dashboard/tp-designer', '/teacher/dashboard/students'].includes(base)) {
      params.delete('student');
    }
    return `${base}?${params.toString()}`;
  }

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        if (item.requiredParam && !searchParams.has(item.requiredParam)) {
            return null;
        }

        const Icon = item.icon;
        const isActive = item.exact ? pathname === item.base : pathname.startsWith(item.base);
        const finalHref = item.requiredParam && studentName 
            ? `/teacher/dashboard/student/${encodeURIComponent(studentName)}?${searchParams.toString()}` 
            : createUrl(item.base);

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
