'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Book, Cog, Users, CheckSquare } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function DashboardNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const navItems = [
    { href: `/teacher/dashboard?${searchParams.toString()}`, label: 'Fiches TP', icon: Book },
    { href: `/teacher/dashboard/students?${searchParams.toString()}`, label: 'Élèves', icon: Users },
    { href: `/teacher/dashboard/competences?${searchParams.toString()}`, label: 'Évaluation', icon: CheckSquare },
    { href: `/teacher/dashboard/settings?${searchParams.toString()}`, label: 'Paramètres', icon: Cog },
  ];

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const baseHref = item.href.split('?')[0];
        const isActive = pathname === baseHref;
        
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
