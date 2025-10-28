import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import dynamic from 'next/dynamic';
import "./globals.css";

const FirebaseClientProvider = dynamic(
  () => import('@/firebase/client-provider.dynamic').then(mod => mod.FirebaseClientProvider),
  { ssr: false }
);


export const metadata: Metadata = {
  title: "Horizon Bacpro • Suivi des compétences",
  description: "Suivi des compétences pour la maintenance automobile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
            {children}
            <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
