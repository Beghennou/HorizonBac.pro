
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { Student } from '@/lib/types';


export default function SettingsPage() {
  const { toast } = useToast();
  const { firestore, classes, teacherName, setTeacherName, updateClassWithCsv, deleteStudent, deleteClass, resetAllStudentLists } = useFirebase();

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
  
  const [classStudents, setClassStudents] = useState<string[]>([]);
  const [secondeClassToUpdate, setSecondeClassToUpdate] = useState('');
  const [premiereClassToUpdate, setPremiereClassToUpdate] = useState('');
  const [terminaleClassToUpdate, setTerminaleClassToUpdate] = useState('');

  const classNames = useMemo(() => classes.map(c => c.id).sort(), [classes]);

  const secondeClasses = useMemo(() => classNames.filter(name => name.startsWith('2')), [classNames]);
  const premiereClasses = useMemo(() => classNames.filter(name => name.startsWith('1')), [classNames]);
  const terminaleClasses = useMemo(() => classNames.filter(name => name.startsWith('T')), [classNames]);

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
            description: "Veuillez choisir une classe dans le menu déroulant avant d'importer."
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
                updateClassWithCsv(targetClassName, studentNames.sort((a,b) => a.localeCompare(b)));
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
      const studentName = `${firstName.trim()} ${lastName.trim().toUpperCase()}`;
      const targetClass = newClassName.trim() || selectedClass;

      if (!firstName || !lastName || !targetClass) {
        toast({ variant: 'destructive', title: 'Champs manquants', description: 'Veuillez remplir tous les champs pour ajouter un élève.' });
        return;
      }
      
      const classData = classes.find(c => c.id === targetClass);
      const existingStudents = classData?.studentNames || [];
      const newStudentList = [...existingStudents, studentName];
      
      updateClassWithCsv(targetClass, newStudentList);

      toast({ title: 'Élève ajouté', description: `${studentName} a été ajouté à la classe ${targetClass}.` });
      setFirstName('');
      setLastName('');
      setNewClassName('');
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
     resetAllStudentLists();
  }
  
  const handleDeleteStudent = async () => {
    if (!deleteStudentClass || !studentToDelete) {
        toast({variant: 'destructive', title: 'Sélection manquante', description: 'Veuillez sélectionner une classe et un élève.'});
        return;
    }
    const classData = classes.find(c => c.id === deleteStudentClass);
    if (!classData) return;

    const newStudentList = (classData.studentNames as string[]).filter(name => name !== studentToDelete);
    updateClassWithCsv(deleteStudentClass, newStudentList);

    toast({ title: 'Élève supprimé', description: `${studentToDelete} a été retiré de la classe ${deleteStudentClass}.` });
    setStudentToDelete('');
  }
  
  const handleDeleteClass = async () => {
      if (!classToDelete) {
          toast({variant: 'destructive', title: 'Sélection manquante', description: 'Veuillez sélectionner une classe à vider.'});
          return;
      }
      deleteClass(classToDelete);
  }

  const handleLegacyCsvImport = (event: React.ChangeEvent<HTMLInputElement>) => {
      const finalImportClassName = newImportClassName || importClassName;
      handleFileUpload(event, finalImportClassName);
      setImportClassName('');
      setNewImportClassName('');
  };
  
  useEffect(() => {
    if (deleteStudentClass) {
        const classData = classes.find(c => c.id === deleteStudentClass);
        setClassStudents(classData?.studentNames || []);
    } else {
        setClassStudents([]);
    }
  }, [deleteStudentClass, classes]);

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
            Importez les listes d'élèves pour chaque niveau pour la nouvelle année scolaire.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Select value={secondeClassToUpdate} onValueChange={setSecondeClassToUpdate}>
                    <SelectTrigger><SelectValue placeholder="Choisir une classe de Seconde..."/></SelectTrigger>
                    <SelectContent>
                        {secondeClasses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Button asChild variant="outline">
                    <label className="cursor-pointer w-full">
                        <Upload className="mr-2 h-4 w-4" /> Importer CSV Seconde
                        <Input type="file" accept=".csv" className="sr-only" onChange={(e) => handleFileUpload(e, secondeClassToUpdate)} />
                    </label>
                </Button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Select value={premiereClassToUpdate} onValueChange={setPremiereClassToUpdate}>
                    <SelectTrigger><SelectValue placeholder="Choisir une classe de Première..."/></SelectTrigger>
                    <SelectContent>
                        {premiereClasses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                </Select>
                 <Button asChild variant="outline">
                    <label className="cursor-pointer w-full">
                        <Upload className="mr-2 h-4 w-4" /> Importer CSV Première
                        <Input type="file" accept=".csv" className="sr-only" onChange={(e) => handleFileUpload(e, premiereClassToUpdate)} />
                    </label>
                </Button>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Select value={terminaleClassToUpdate} onValueChange={setTerminaleClassToUpdate}>
                    <SelectTrigger><SelectValue placeholder="Choisir une classe de Terminale..."/></SelectTrigger>
                    <SelectContent>
                        {terminaleClasses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                </Select>
                 <Button asChild variant="outline">
                    <label className="cursor-pointer w-full">
                        <Upload className="mr-2 h-4 w-4" /> Importer CSV Terminale
                        <Input type="file" accept=".csv" className="sr-only" onChange={(e) => handleFileUpload(e, terminaleClassToUpdate)} />
                    </label>
                </Button>
            </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserPlus /> Ajouter un nouvel élève</CardTitle>
          <CardDescription>Ajoutez manuellement un élève à une classe existante ou créez une nouvelle classe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="first-name">Prénom de l'élève</Label>
                    <Input id="first-name" placeholder="ex: Adam" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="last-name">Nom de l'élève</Label>
                    <Input id="last-name" placeholder="ex: BAKHTAR" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                    <Label htmlFor="select-class">Assigner à une classe existante</Label>
                    <Select onValueChange={setSelectedClass} value={selectedClass} >
                        <SelectTrigger id="select-class">
                            <SelectValue placeholder="Choisir une classe..." />
                        </SelectTrigger>
                        <SelectContent>
                            {classNames.map(c => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-class">Ou créer une nouvelle classe</Label>
                    <Input id="new-class" placeholder="ex: 2MV6" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} />
                </div>
            </div>
             <div className="flex justify-end">
                <Button onClick={handleAddStudent}>
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
          <CardDescription>Supprimez un élève ou videz une classe entière.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                    <Label htmlFor="delete-class-select">Classe</Label>
                    <Select value={deleteStudentClass} onValueChange={setDeleteStudentClass}>
                        <SelectTrigger id="delete-class-select">
                            <SelectValue placeholder="Choisir une classe..."/>
                        </SelectTrigger>
                        <SelectContent>
                            {classNames.map(c => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="delete-student-select">Élève à supprimer</Label>
                    <Select value={studentToDelete} onValueChange={setStudentToDelete} disabled={!deleteStudentClass}>
                        <SelectTrigger id="delete-student-select">
                            <SelectValue placeholder="Choisir un élève..."/>
                        </SelectTrigger>
                        <SelectContent>
                            {classStudents.map((s: string) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="destructive" onClick={handleDeleteStudent}><UserMinus className="mr-2" /> Supprimer cet élève</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2 md:col-span-2">
                     <Label htmlFor="delete-class-select-2">Vider une classe de ses élèves</Label>
                      <Select value={classToDelete} onValueChange={setClassToDelete}>
                        <SelectTrigger id="delete-class-select-2">
                            <SelectValue placeholder="Choisir une classe..."/>
                        </SelectTrigger>
                        <SelectContent>
                            {classNames.map(c => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <Button variant="destructive" onClick={handleDeleteClass}><FolderMinus className="mr-2" /> Vider cette classe</Button>
            </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle/> Zone de danger</CardTitle>
              <CardDescription>Ces actions sont irréversibles et affectent les données en base de données. Soyez certain avant de continuer.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
               <div className="flex justify-between items-center p-4 border border-destructive/50 rounded-lg">
                  <p>Vider les listes d'élèves de **toutes** les classes (en base de données).</p>
                   <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <Button variant="destructive" outline="true">
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
                          <Button variant="destructive" disabled>
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
