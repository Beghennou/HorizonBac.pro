import Link from 'next/link';
import { Logo } from '@/components/logo';
import { AssignmentsProvider } from '@/contexts/AssignmentsContext';

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AssignmentsProvider>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl">
          <div className="container flex h-20 items-center">
            <Link href="/" className="flex items-center gap-4 mr-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-primary to-racing-orange border-2 border-accent">
                  <Logo className="w-7 h-7 text-white" />
              </div>
              <div>
                   <h1 className="font-headline text-2xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text">
                      Racing Performance
                   </h1>
                   <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Rénovation 2025 • Espace élève</p>
              </div>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-headline uppercase tracking-wider">
              <Link
                href="/student/select"
                className="transition-colors hover:text-accent text-foreground/80"
              >
                Mes TP
              </Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
      </div>
    </AssignmentsProvider>
  );
}
