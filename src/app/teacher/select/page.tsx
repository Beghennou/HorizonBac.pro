'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, UserPlus, LogIn } from 'lucide-react';

export default function SelectTeacherPage() {
    const { isLoaded, teachers, setTeacherName, addTeacher } = useFirebase();
    const router = useRouter();
    const { toast } = useToast();

    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [newTeacherName, setNewTeacherName] = useState('');

    useEffect(() => {
        const isAuth = sessionStorage.getItem('teacher_auth');
        if (isAuth !== 'true') {
            router.replace('/teacher/login');
            return;
        }

        const pendingTeacher = sessionStorage.getItem('pendingTeacherName');
        if (pendingTeacher && teachers.some(t => t.name === pendingTeacher)) {
            setSelectedTeacher(pendingTeacher);
            sessionStorage.removeItem('pendingTeacherName');
        }
    }, [router, teachers]);

    if (!isLoaded) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }
    
    const handleSelectTeacher = () => {
        if (!selectedTeacher) {
            toast({ variant: 'destructive', title: 'Veuillez sélectionner un enseignant.' });
            return;
        }
        setTeacherName(selectedTeacher);
        router.push('/teacher/dashboard');
    };
    
    const handleAddTeacher = async () => {
        const teacherNameToAdd = newTeacherName.trim();
        if (!teacherNameToAdd) {
            toast({ variant: 'destructive', title: 'Le nom ne peut pas être vide.' });
            return;
        }
        if (teachers.some(t => t.name === teacherNameToAdd)) {
            toast({ variant: 'destructive', title: 'Ce nom existe déjà', description: 'Veuillez choisir un autre nom ou sélectionner ce profil dans la liste.' });
            return;
        }

        try {
            await addTeacher(teacherNameToAdd);
            toast({ title: 'Profil créé', description: `Veuillez sélectionner ${teacherNameToAdd} dans la liste pour vous connecter.` });
            sessionStorage.setItem('pendingTeacherName', teacherNameToAdd);
            // We don't redirect here. We let the useEffect handle the selection on reload.
            // The data refresh will be handled by Firebase's realtime listener.
            setNewTeacherName('');
        } catch (error) {
            console.error("Failed to add teacher", error);
            toast({ variant: 'destructive', title: 'Erreur', description: "La création du profil a échoué." });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Sélectionner un Profil</CardTitle>
                        <CardDescription>Choisissez votre nom dans la liste pour continuer.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="teacher-select">Nom de l'enseignant</Label>
                            <Select onValueChange={setSelectedTeacher} value={selectedTeacher}>
                                <SelectTrigger id="teacher-select">
                                    <SelectValue placeholder="Choisir un profil..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {teachers.sort((a,b) => a.name.localeCompare(b.name)).map(teacher => (
                                        <SelectItem key={teacher.id} value={teacher.name}>{teacher.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleSelectTeacher} className="w-full" disabled={!selectedTeacher}>
                            <LogIn className="mr-2" /> Accéder au tableau de bord
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Créer un Nouveau Profil</CardTitle>
                        <CardDescription>Si votre nom n'est pas dans la liste, créez un nouveau profil.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                             <Label htmlFor="new-teacher-name">Nom du nouvel enseignant</Label>
                             <Input 
                                id="new-teacher-name" 
                                placeholder="ex: M. Dupont" 
                                value={newTeacherName}
                                onChange={e => setNewTeacherName(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleAddTeacher} variant="outline" className="w-full" disabled={!newTeacherName.trim()}>
                            <UserPlus className="mr-2" /> Créer le profil
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
