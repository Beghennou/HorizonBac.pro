'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SelectStudentPage() {
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl text-accent">Veuillez vous identifier</CardTitle>
                    <CardDescription>Pour accéder à votre espace, veuillez sélectionner votre classe et votre nom dans le menu de gauche.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ArrowLeft className="h-16 w-16 text-primary mx-auto motion-safe:animate-pulse" />
                    <p className="mt-4 text-muted-foreground">Utilisez la barre latérale pour continuer.</p>
                </CardContent>
            </Card>
        </div>
    );
}
