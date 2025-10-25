
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
    { href: `/teacher/dashboard/class-progress`, label: 'Suivi Classe', icon: CheckSquare, base: '/teacher/dashboard/class-progress', exact: true },
    { href: '/teacher/dashboard/students', label: 'Assigner des TP', icon: Users, base: '/teacher/dashboard/students' },
    { href: '/teacher/dashboard/analytics', label: 'Analyses', icon: BarChart3, base: '/teacher/dashboard/analytics' },
    { href: '/teacher/dashboard/tp-designer', label: 'Concepteur TP', icon: DraftingCompass, base: '/teacher/dashboard/tp-designer' },
    { href: `/teacher/dashboard/settings`, label: 'Paramètres', icon: Cog, base: '/teacher/dashboard/settings' },
  ];

  const createUrl = (base: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (['/teacher/dashboard', '/teacher/dashboard/settings', '/teacher/dashboard/class-progress', '/teacher/dashboard/analytics', '/teacher/dashboard/tp-designer', '/teacher/dashboard/students'].includes(base)) {
      // Keep class and level, but remove student for general pages
      params.delete('student');
    }
    return `${base}?${params.toString()}`;
  }

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        
        let isActive = item.exact ? pathname === item.base : pathname.startsWith(item.base);
        
        // If we are on a student detail page, no nav item should be active.
        if (pathname.startsWith('/teacher/dashboard/student/')) {
          isActive = false;
        }

        const finalHref = createUrl(item.base);


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
