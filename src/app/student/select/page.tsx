
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Suspense } from 'react';
import StudentSelector from '../student-selector';
import { Loader2 } from 'lucide-react';

function SelectStudentPageContent() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
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


export default function SelectStudentPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin text-primary"/></div>}>
            <SelectStudentPageContent />
        </Suspense>
    );
}
