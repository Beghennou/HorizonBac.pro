import Link from 'next/link';
import { SteeringWheel } from '@/components/icons';

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <SteeringWheel className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold tracking-wider text-primary">
              Garage F1 Pédagogique
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/student"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Tableau de bord
            </Link>
          </nav>
        </div>
      </header>
      <main className="container py-8">{children}</main>
    </div>
  );
}
