
'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { KeyRound, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';

const TEACHER_PASSWORD = 'Mongy';

export default function TeacherLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const cursus = searchParams.get('cursus') || 'bacpro';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === TEACHER_PASSWORD) {
            toast({
                title: 'Accès autorisé',
                description: 'Bienvenue dans l\'espace enseignant.',
            });
            sessionStorage.setItem('teacher_auth', 'true');
            router.push(`/teacher/select?cursus=${cursus}`);
        } else {
            setError('Mot de passe incorrect.');
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
             <div className="flex items-center justify-center mb-8">
                <div className="flex items-center justify-center w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-racing-orange border-4 border-accent shadow-lg">
                    <Logo className="w-16 h-16 text-white" />
                </div>
            </div>
            <Card className="w-full max-w-md border-primary shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-3xl text-accent">Accès Enseignant ({cursus.toUpperCase()})</CardTitle>
                    <CardDescription>Veuillez entrer le mot de passe pour continuer.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de Passe</Label>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-10"
                                    required
                                />
                            </div>
                            {error && <p className="text-sm text-destructive">{error}</p>}
                        </div>
                        <Button type="submit" className="w-full font-headline uppercase tracking-wider">
                            Entrer <ArrowRight className="ml-2"/>
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
