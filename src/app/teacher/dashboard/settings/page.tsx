
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings2, UserPlus, Save, AlertTriangle, Trash2, Upload, UserMinus, FolderMinus, ChevronsRight, Eraser } from "lucide-react";
import { useFirebase } from '@/firebase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Papa from 'papaparse';
import { studentLists, classNames } from '@/lib/class-data';


export default function SettingsPage() {
  const { toast } = useToast();
  const { firestore, teacherName, setTeacherName, updateClassWithCsv, deleteClass, resetAllStudentLists } = useFirebase();

  const [classList, setClassList] = useState<Record<string, string[]>>(studentLists);

  const [localTeacherName, setLocalTeacherName] = useState(teacherName);
  const [schoolName, setSchoolName] = useState('Lycée des Métiers de l\'Automobile');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [resetDataPassword, setResetDataPassword] = useState('');
  const [resetListsPassword, setResetListsPassword] = useState('');
  
  const [importClassName, setImportClassName] = useState('');
  const [newImportClassName, setNewImportClassName] = useState('');

  const [deleteStudentClass, setDeleteStudentClass] = useState('');
  const [studentToDelete, setStudentToDelete] = useState('');
  const [classToDelete, setClassToDelete] = useState('');

  const [newSecondeClassName, setNewSecondeClassName] = useState('2MV1');
  const [newPremiereClassName, setNewPremiereClassName] = useState('1VP1');
  const [newTerminaleClassName, setNewTerminaleClassName] = useState('TVP1');

  useEffect(() => {
    setLocalTeacherName(teacherName);
  }, [teacherName]);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, targetClassName: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!targetClassName) {
        toast({
            variant: 'destructive',
            title: 'Classe non sélectionnée',
            description: "Veuillez spécifier un nom de classe avant d'importer."
        });
        event.target.value = '';
        return;
    }

    Papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
            const studentNames = (results.data as string[][])
                .map(row => row[0]?.trim())
                .filter(name => name);
            
            if (studentNames.length > 0) {
                // Since this now updates a local variable, we don't call updateClassWithCsv from FirebaseProvider
                console.warn("CSV import now only works for show. Data is not persisted.");
                setClassList(prev => ({...prev, [targetClassName]: studentNames.sort((a,b) => a.localeCompare(b))}));
                toast({
                    title: "Importation réussie (simulation)",
                    description: `${studentNames.length} élèves importés dans la classe ${targetClassName}. Modifiez data-manager.ts pour sauvegarder.`,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Fichier CSV vide ou invalide",
                    description: "Aucun nom d'élève n'a été trouvé dans le fichier.",
                });
            }
        },
        error: () => {
            toast({
                variant: "destructive",
                title: "Erreur de lecture du CSV",
                description: "Impossible de lire le fichier. Veuillez vérifier son format.",
            });
        }
    });
    event.target.value = ''; // Reset file input
  };
  
  const handleAddStudent = async () => {
    toast({ variant: 'destructive', title: 'Fonctionnalité désactivée', description: 'Ajoutez les élèves dans le fichier `src/lib/data-manager.ts`.'});
  };

  const handleSaveSettings = () => {
    setTeacherName(localTeacherName);
    toast({
      title: "Paramètres sauvegardés",
      description: "Le nom de l'enseignant a été mis à jour.",
    });
  };

  const handleResetData = () => {
    console.error("Fonctionnalité non implémentée.");
     toast({ variant: 'destructive', title: 'Fonctionnalité non implémentée', description: 'La réinitialisation des données n\'est pas connectée dans cette interface.' });
  };

  const handleResetLists = () => {
     toast({ variant: 'destructive', title: 'Fonctionnalité désactivée', description: 'Gérez les listes dans le fichier `src/lib/data-manager.ts`.'});
  }
  
  const handleDeleteStudent = async () => {
      toast({ variant: 'destructive', title: 'Fonctionnalité désactivée', description: 'Gérez les listes dans le fichier `src/lib/data-manager.ts`.'});
  }
  
  const handleDeleteClass = async () => {
      toast({ variant: 'destructive', title: 'Fonctionnalité désactivée', description: 'Gérez les listes dans le fichier `src/lib/data-manager.ts`.'});
  }

  const handleLegacyCsvImport = (event: React.ChangeEvent<HTMLInputElement>) => {
      const finalImportClassName = newImportClassName || importClassName;
      handleFileUpload(event, finalImportClassName);
      setImportClassName('');
      setNewImportClassName('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl lg:text-5xl tracking-wide">Paramètres &amp; Configuration</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les paramètres de l'application, ajoutez de nouveaux élèves et mettez à jour les classes pour la nouvelle année.
        </p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ChevronsRight /> Mise à Jour Annuelle des Classes</CardTitle>
          <CardDescription>
            La gestion des élèves se fait maintenant directement dans le fichier <code>src/lib/class-data.ts</code>.
            Modifiez ce fichier pour mettre à jour les listes de manière permanente. Les imports CSV ne sont plus persistés.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Input value={newSecondeClassName} onChange={(e) => setNewSecondeClassName(e.target.value)} placeholder="Nom classe Seconde..."/>
                <Button asChild variant="outline">
                    <label className="cursor-pointer w-full">
                        <Upload className="mr-2 h-4 w-4" /> Importer CSV Seconde (simulation)
                        <Input type="file" accept=".csv" className="sr-only" onChange={(e) => handleFileUpload(e, newSecondeClassName)} />
                    </label>
                </Button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Input value={newPremiereClassName} onChange={(e) => setNewPremiereClassName(e.target.value)} placeholder="Nom classe Première..."/>
                 <Button asChild variant="outline">
                    <label className="cursor-pointer w-full">
                        <Upload className="mr-2 h-4 w-4" /> Importer CSV Première (simulation)
                        <Input type="file" accept=".csv" className="sr-only" onChange={(e) => handleFileUpload(e, newPremiereClassName)} />
                    </label>
                </Button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Input value={newTerminaleClassName} onChange={(e) => setNewTerminaleClassName(e.target.value)} placeholder="Nom classe Terminale..."/>
                 <Button asChild variant="outline">
                    <label className="cursor-pointer w-full">
                        <Upload className="mr-2 h-4 w-4" /> Importer CSV Terminale (simulation)
                        <Input type="file" accept=".csv" className="sr-only" onChange={(e) => handleFileUpload(e, newTerminaleClassName)} />
                    </label>
                </Button>
            </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserPlus /> Ajouter un nouvel élève</CardTitle>
          <CardDescription>Cette fonctionnalité est maintenant gérée dans <code>src/lib/class-data.ts</code>.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 opacity-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="first-name">Prénom de l'élève</Label>
                    <Input id="first-name" placeholder="ex: Adam" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="last-name">Nom de l'élève</Label>
                    <Input id="last-name" placeholder="ex: BAKHTAR" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled/>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                    <Label htmlFor="select-class">Assigner à une classe existante</Label>
                    <Select onValueChange={setSelectedClass} value={selectedClass} disabled>
                        <SelectTrigger id="select-class">
                            <SelectValue placeholder="Choisir une classe..." />
                        </SelectTrigger>
                        <SelectContent>
                            {classNames.sort().map(c => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-class">Ou créer une nouvelle classe</Label>
                    <Input id="new-class" placeholder="ex: 2MV6" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} disabled />
                </div>
            </div>
             <div className="flex justify-end">
                <Button onClick={handleAddStudent} disabled>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Ajouter l'élève
                </Button>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Settings2 /> Paramètres généraux</CardTitle>
          <CardDescription>Préférences de l'application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
              <Label htmlFor="teacher-name">Nom de l'enseignant</Label>
              <Input id="teacher-name" placeholder="ex: M. Dubois" value={localTeacherName} onChange={(e) => setLocalTeacherName(e.target.value)} />
          </div>
           <div className="space-y-2">
              <Label htmlFor="school-name">Nom de l'établissement</Label>
              <Input id="school-name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
          </div>
           <div className="flex justify-end">
                <Button size="lg" className="bg-gradient-to-r from-primary to-racing-orange text-white hover:brightness-110" onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder les paramètres
                </Button>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserMinus /> Gestion des données</CardTitle>
          <CardDescription>La suppression des élèves et des classes se fait maintenant dans <code>src/lib/class-data.ts</code>.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 opacity-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                    <Label htmlFor="delete-class-select">Classe</Label>
                    <Select value={deleteStudentClass} onValueChange={setDeleteStudentClass} disabled>
                        <SelectTrigger id="delete-class-select">
                            <SelectValue placeholder="Choisir une classe..."/>
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(classList).sort().map(c => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="delete-student-select">Élève à supprimer</Label>
                    <Select value={studentToDelete} onValueChange={setStudentToDelete} disabled>
                        <SelectTrigger id="delete-student-select">
                            <SelectValue placeholder="Choisir un élève..."/>
                        </SelectTrigger>
                        <SelectContent>
                            {(classList[deleteStudentClass] || []).sort().map((s: string) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="destructive" disabled><UserMinus className="mr-2" /> Supprimer cet élève</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2 md:col-span-2">
                     <Label htmlFor="delete-class-select-2">Vider une classe de ses élèves</Label>
                      <Select value={classToDelete} onValueChange={setClassToDelete} disabled>
                        <SelectTrigger id="delete-class-select-2">
                            <SelectValue placeholder="Choisir une classe..."/>
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(classList).sort().map(c => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <Button variant="destructive" disabled><FolderMinus className="mr-2" /> Vider cette classe</Button>
            </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle/> Zone de danger</CardTitle>
              <CardDescription>Ces actions sont irréversibles et affectent les données en base. Soyez certain avant de continuer.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
               <div className="flex justify-between items-center p-4 border border-destructive/50 rounded-lg">
                  <p>Vider les listes d'élèves de **toutes** les classes (en base de données).</p>
                   <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <Button variant="destructive" outline="true" disabled>
                              <Eraser className="mr-2 h-4 w-4" />
                              Vider toutes les listes
                          </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                  Cette action est irréversible. Toutes les listes d'élèves seront vidées. Pour confirmer, veuillez taper <strong>reset</strong> dans le champ ci-dessous.
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="space-y-2">
                            <Label htmlFor="reset-lists-password">Mot de passe de confirmation</Label>
                            <Input 
                                id="reset-lists-password" 
                                type="password"
                                value={resetListsPassword}
                                onChange={(e) => setResetListsPassword(e.target.value)}
                                placeholder="Entrez le mot de passe..."
                            />
                          </div>
                          <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setResetListsPassword('')}>Annuler</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={handleResetLists} 
                                disabled={resetListsPassword !== 'reset'}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Confirmer la réinitialisation
                              </AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
              </div>
              <div className="flex justify-between items-center p-4 border border-destructive/50 rounded-lg">
                  <p>Réinitialiser toutes les données des élèves (évaluations, TPs assignés, etc.) mais conserver les classes et les élèves.</p>
                   <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Réinitialiser les données
                          </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                  Cette action est irréversible. Toutes les données des élèves (progrès, évaluations) seront supprimées. Pour confirmer, veuillez taper <strong>Mongy</strong> dans le champ ci-dessous.
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="space-y-2">
                            <Label htmlFor="reset-data-password">Mot de passe de confirmation</Label>
                            <Input 
                                id="reset-data-password" 
                                type="password"
                                value={resetDataPassword}
                                onChange={(e) => setResetDataPassword(e.target.value)}
                                placeholder="Entrez le mot de passe..."
                            />
                          </div>
                          <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setResetDataPassword('')}>Annuler</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={handleResetData} 
                                disabled={resetDataPassword !== 'Mongy'}
                                className="bg-destructive hover:bg-destructive/90"
                              >
                                Confirmer la réinitialisation
                              </AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
              </div>
          </CardContent>
      </Card>
    </div>
  );
}
