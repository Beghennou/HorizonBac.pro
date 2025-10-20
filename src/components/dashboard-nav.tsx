'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, Cog, DraftingCompass, Users } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/teacher/dashboard', label: 'Fiches TP', icon: Book },
  { href: '/teacher/dashboard/students', label: 'Élèves', icon: Users },
  { href: '/teacher/dashboard/competences', label: 'Compétences', icon: DraftingCompass },
  { href: '/teacher/dashboard/settings', label: 'Paramètres', icon: Cog },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
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
