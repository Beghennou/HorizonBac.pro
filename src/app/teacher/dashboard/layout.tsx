import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Link from 'next/link';
import { SteeringWheel } from '@/components/icons';
import { DashboardNav } from '@/components/dashboard-nav';
import { LogoutButton } from '@/components/logout-button';

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCookie = cookies().get('teacher-auth');
  if (authCookie?.value !== 'true') {
    return redirect('/teacher');
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Link href="/teacher/dashboard" className="flex items-center gap-2 justify-center group-data-[collapsible=icon]:justify-center">
            <SteeringWheel className="h-8 w-8 text-primary group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10" />
            <span className="font-headline text-2xl tracking-wider text-primary group-data-[collapsible=icon]:hidden">FSG</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <DashboardNav />
        </SidebarContent>
        <SidebarFooter>
          <LogoutButton />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 sm:p-6 lg:p-8">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
