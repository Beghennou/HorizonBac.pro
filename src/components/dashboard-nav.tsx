
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Book, Cog, Users, FileText, BarChart3, DraftingCompass, CheckSquare, ClipboardCheck, LayoutDashboard } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function DashboardNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const navItems = [
    { href: '/teacher/dashboard', label: 'Tableau de Bord', icon: LayoutDashboard, base: '/teacher/dashboard', exact: true },
    { href: `/teacher/dashboard/class-progress`, label: 'Progression', icon: CheckSquare, base: '/teacher/dashboard/class-progress' },
    { href: `/teacher/dashboard/tps-to-evaluate`, label: 'TP à Évaluer', icon: ClipboardCheck, base: '/teacher/dashboard/tps-to-evaluate' },
    { href: '/teacher/dashboard/students', label: 'Assigner des TP', icon: Users, base: '/teacher/dashboard/students' },
    { href: '/teacher/dashboard/analytics', label: 'Analyses', icon: BarChart3, base: '/teacher/dashboard/analytics' },
    { href: '/teacher/dashboard/tp-designer', label: 'Concepteur TP', icon: DraftingCompass, base: '/teacher/dashboard/tp-designer' },
    { href: `/teacher/dashboard/settings`, label: 'Paramètres', icon: Cog, base: '/teacher/dashboard/settings' },
  ];

  const createUrl = (base: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('student'); // Ensure student is removed for general nav
    return `${base}?${params.toString()}`;
  }

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        
        let isActive = false;
        if (item.exact) {
            isActive = pathname === item.base;
        } else if (item.base === '/teacher/dashboard/class-progress') {
            // "Progression" is active for class-progress, students, and student detail pages
            isActive = pathname.startsWith('/teacher/dashboard/class-progress') || 
                       pathname.startsWith('/teacher/dashboard/students') || 
                       pathname.startsWith('/teacher/dashboard/evaluate');
        }
        else {
            isActive = pathname.startsWith(item.base);
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
