import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Link from 'next/link';
import { DashboardNav } from '@/components/dashboard-nav';
import { LogoutButton } from '@/components/logout-button';
import { Logo } from '@/components/logo';

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authCookie = cookies().get('teacher-auth');
  if (authCookie?.value !== 'true') {
    return redirect('/');
  }

  return (
    <div className="bg-background">
        <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl">
            <div className="container flex h-20 items-center justify-between">
                 <Link href="/teacher/dashboard" className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-primary to-racing-orange border-2 border-accent">
                        <Logo className="w-7 h-7 text-white" />
                    </div>
                    <div>
                         <h1 className="font-headline text-2xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text">
                            Racing Performance
                         </h1>
                         <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Rénovation 2025 • Seconde ▸ Première ▸ Terminale</p>
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    {/* Level Toggle and other actions will go here */}
                    <LogoutButton />
                </div>
            </div>
        </header>
        <main className="container grid grid-cols-1 md:grid-cols-[340px_1fr] gap-6 py-8">
            <aside className="space-y-6">
                {/* Sidebar content for TP filtering will go here */}
                <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                    <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Filtres</h3>
                </div>
                 <div className="p-4 rounded-lg bg-card border-2 border-primary/30 shadow-2xl">
                    <h3 className="font-headline text-lg text-accent uppercase tracking-wider border-b-2 border-primary/30 pb-2 mb-4">Liste des TP</h3>
                </div>
            </aside>
            <section className="bg-card rounded-lg border-2 border-primary/30 shadow-2xl p-6">
                {children}
            </section>
        </main>
    </div>
  );
}
