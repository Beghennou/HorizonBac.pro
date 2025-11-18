
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Book, Cog, Users, FileText, BarChart3, DraftingCompass, CheckSquare, ClipboardCheck, LayoutDashboard, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from './ui/sidebar';

export function DashboardNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const navItems = [
    { href: '/teacher/dashboard', label: 'Tableau de Bord', icon: LayoutDashboard, base: '/teacher/dashboard', exact: true },
    { href: `/teacher/dashboard/class-progress`, label: 'Progression', icon: CheckSquare, base: '/teacher/dashboard/class-progress' },
    { href: `/teacher/dashboard/tps-to-evaluate`, label: 'TP à Évaluer', icon: ClipboardCheck, base: '/teacher/dashboard/tps-to-evaluate' },
    { href: `/teacher/dashboard/summary`, label: 'Synthèse', icon: MessageSquare, base: '/teacher/dashboard/summary' },
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
    <SidebarMenu>
      {navItems.map((item) => {
        const Icon = item.icon;
        
        let isActive = false;
        if (item.exact) {
            isActive = pathname === item.base;
        } else {
            isActive = pathname.startsWith(item.base);
        }

        const finalHref = createUrl(item.href);

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={isActive}>
              <Link href={finalHref}>
                <Icon/>
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
