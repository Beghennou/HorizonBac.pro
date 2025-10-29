
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import StudentSelector from '../student-selector';

export default function SelectStudentPage() {
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl text-accent">Identification Élève</CardTitle>
                    <CardDescription>Pour accéder à ton espace, sélectionne ton enseignant, ta classe et ton nom.</CardDescription>
                </CardHeader>
                <CardContent>
                    <StudentSelector />
                </CardContent>
            </Card>
        </div>
    );
}
