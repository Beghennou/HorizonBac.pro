'use client';

import { logout } from '@/app/teacher/actions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { SidebarMenuButton } from './ui/sidebar';

export function LogoutButton() {
  return (
    <form action={logout}>
       <SidebarMenuButton type="submit" className="w-full">
         <LogOut />
         <span>Logout</span>
       </SidebarMenuButton>
    </form>
  );
}
