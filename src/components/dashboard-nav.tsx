'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Users, DraftingCompass, Settings } from 'lucide-react';
import { SteeringWheel } from './icons';

const navItems = [
  { href: '/teacher/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/teacher/dashboard/students', label: 'Élèves', icon: Users },
  { href: '/teacher/dashboard/tp-designer', label: 'Concepteur de TP', icon: DraftingCompass },
  { href: '/teacher/dashboard/simulations', label: 'Simulations', icon: SteeringWheel },
  { href: '/teacher/dashboard/settings', label: 'Paramètres', icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <Link href={item.href}>
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
