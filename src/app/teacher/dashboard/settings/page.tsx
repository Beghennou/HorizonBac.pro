
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings2, UserPlus, Save, AlertTriangle, Trash2, Upload, UserMinus, FolderMinus, ChevronsRight, Eraser } from "lucide-react";
import { useFirebase } from '@/firebase';
import { Student } from '@/lib/types';
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
import { collection, writeBatch, doc } from 'firebase/firestore';

const CsvImportSection = ({ title, onImport }: { title: string, onImport: (studentNames: string[]) => void }) => {
    const { toast } = useToast();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: false,
            skipEmptyLines: true,
            complete: (results) => {
                const studentNames = results.data
                    .map((row: any) => typeof row === 'string' ? row.trim() : (row[0] || '').trim())
                    .filter(name => name !== '');
                
                if (studentNames.length > 0) {
                    onImport(studentNames);
                } else {
                    toast({
                        variant: "destructive",
                        title: "Fichier CSV vide ou invalide",
                        description: "Aucun nom d'élève n'a été trouvé dans le fichier.",
                    });
                }
            },
            error: (error: any) => {
                toast({
                    variant: "destructive",
                    title: "Erreur de lecture du CSV",
                    description: "Impossible de lire le fichier. Veuillez vérifier son format.",
                });
            }
        });
        event.target.value = ''; // Reset file input
    };

    return (
        <div className="flex items-center gap-4">
            <Label className="flex-1 font-bold">{title}</Label>
            <Button asChild variant="outline" className="w-48">
                <label className="cursor-pointer">
                    <Upload className="mr-2" /> Importer CSV
                    <Input type="file" accept=".csv" className="sr-only" onChange={handleFileUpload} />
                </label>
            </Button>
        </div>
    );
};

export default function SettingsPage() {
  const { toast } = useToast();
  const { firestore, teacherName, setTeacherName, updateClassWithCsv, deleteClass, classes, resetAllStudentLists } = useFirebase();

  const classList = useMemo(() => {
    if (!classes) return {};
    return Object.fromEntries(classes.map(c => [c.id, c.studentNames || []]))
  }, [classes]);

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

  const [newSecondeClassName, setNewSecondeClassName] = useState('2MV_NEW');
  const [newPremiereClassName, setNewPremiereClassName] = useState('1VP_NEW');
  const [newTerminaleClassName, setNewTerminaleClassName] = useState('TVP_NEW');

  useEffect(() => {
    setLocalTeacherName(teacherName);
  }, [teacherName]);
  
  const handleAddStudent = async () => {
    if (!firstName || !lastName || (!newClassName && !selectedClass) || !firestore) {
      toast({
        variant: 'destructive',
        title: "Champs manquants",
        description: "Veuillez remplir le prénom, le nom et choisir ou créer une classe."
      });
      return;
    }

    const finalClassName = newClassName || selectedClass;
    const studentName = `${lastName.toUpperCase()} ${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()}`;
    
    const existingStudents = classList[finalClassName] || [];
    if (existingStudents.includes(studentName)) {
        toast({
            variant: 'destructive',
            title: "Élève déjà existant",
            description: `${studentName} est déjà dans la classe ${finalClassName}.`
        });
        return;
    }

    updateClassWithCsv(finalClassName, [...existingStudents, studentName]);

    toast({
      title: "Élève ajouté",
      description: `${studentName} a été ajouté à la classe ${finalClassName}.`,
    });

    setFirstName('');
    setLastName('');
    setNewClassName('');
    setSelectedClass('');
  };

  const handleSaveSettings = () => {
    setTeacherName(localTeacherName);
    toast({
      title: "Paramètres sauvegardés",
      description: "Le nom de l'enseignant a été mis à jour.",
    });
  };

  const handleResetData = () => {
    if (resetDataPassword === 'Mongy') {
        console.error("resetStudentData function is not available in this component's context.");
        toast({
            variant: 'destructive',
            title: 'Fonctionnalité non implémentée',
            description: 'La réinitialisation des données n\'est pas connectée dans cette interface.'
        });
        setResetDataPassword('');
    } else {
        toast({
            variant: 'destructive',
            title: "Mot de passe incorrect",
            description: "La réinitialisation a été annulée.",
        });
    }
  };

  const handleResetLists = () => {
    if (resetListsPassword === 'reset') {
        resetAllStudentLists();
        setResetListsPassword('');
    } else {
        toast({
            variant: 'destructive',
            title: "Mot de passe incorrect",
            description: "La réinitialisation a été annulée.",
        });
    }
  }
  
  const handleDeleteStudent = async () => {
      if (!studentToDelete || !deleteStudentClass || !firestore) return;
      
      const currentStudents = classList[deleteStudentClass] || [];
      const updatedStudents = currentStudents.filter((s: string) => s !== studentToDelete);

      updateClassWithCsv(deleteStudentClass, updatedStudents);

      setStudentToDelete('');
      setDeleteStudentClass('');
      toast({ title: "Élève retiré", description: `${studentToDelete} a été retiré de la classe.` });
  }
  
  const handleDeleteClass = async () => {
      if (!classToDelete || !firestore) return;
      deleteClass(classToDelete);
      setClassToDelete('');
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const finalImportClassName = newImportClassName || importClassName;

    if (!file) return;
    if (!finalImportClassName) {
        toast({
            variant: 'destructive',
            title: 'Classe non sélectionnée',
            description: "Veuillez choisir ou créer une classe pour l'importation."
        });
        return;
    }

    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const newStudentNames = results.data
          .map((row: any) => (Array.isArray(row) ? row[0] : row) as string)
          .filter(name => typeof name === 'string' && name.trim() !== '');

        if (newStudentNames.length === 0) {
            toast({
                variant: "destructive",
                title: "Aucun élève trouvé",
                description: "Le fichier CSV semble vide ou mal formaté.",
            });
            return;
        }

        updateClassWithCsv(finalImportClassName, newStudentNames);
        setImportClassName('');
        setNewImportClassName('');
      },
      error: (error: any) => {
        toast({
          variant: "destructive",
          title: "Erreur d'importation",
          description: "Impossible de lire le fichier CSV. Veuillez vérifier son format.",
        });
        console.error("CSV Parsing Error:", error);
      }
    });
    
    event.target.value = '';
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
          <CardDescription>Importez les listes CSV pour chaque niveau. Les élèves existants seront déplacés dans leur nouvelle classe et leurs données (évaluations, TPs) seront conservées. Les nouveaux élèves seront créés automatiquement.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Input value={newSecondeClassName} onChange={(e) => setNewSecondeClassName(e.target.value)} placeholder="Nom classe Seconde..."/>
                <CsvImportSection title="Nouvelles Classes de Seconde" onImport={(studentNames) => updateClassWithCsv(newSecondeClassName, studentNames)} />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Input value={newPremiereClassName} onChange={(e) => setNewPremiereClassName(e.target.value)} placeholder="Nom classe Première..."/>
                <CsvImportSection title="Nouvelles Classes de Première" onImport={(studentNames) => updateClassWithCsv(newPremiereClassName, studentNames)} />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <Input value={newTerminaleClassName} onChange={(e) => setNewTerminaleClassName(e.target.value)} placeholder="Nom classe Terminale..."/>
                <CsvImportSection title="Nouvelles Classes de Terminale" onImport={(studentNames) => updateClassWithCsv(newTerminaleClassName, studentNames)} />
            </div>
        </CardContent>
      </Card>


       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserPlus /> Ajouter un nouvel élève</CardTitle>
          <CardDescription>Remplissez le formulaire pour inscrire un nouvel élève et l'assigner à une classe.</CardDescription>
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
                    <Select onValueChange={setSelectedClass} value={selectedClass} disabled={!!newClassName}>
                        <SelectTrigger id="select-class">
                            <SelectValue placeholder="Choisir une classe..." />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(classList).sort().map(c => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-class">Ou créer une nouvelle classe</Label>
                    <Input id="new-class" placeholder="ex: 2MV6" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} disabled={!!selectedClass} />
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
          <CardTitle className="flex items-center gap-2"><Upload /> Importer des élèves (Ancienne méthode)</CardTitle>
          <CardDescription>
              Sélectionnez ou créez une classe, puis importez un fichier CSV. Seule la première colonne (nom de l'élève) sera utilisée.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                      <Label htmlFor="import-select-class">Choisir une classe de destination</Label>
                      <Select onValueChange={setImportClassName} value={importClassName} disabled={!!newImportClassName}>
                          <SelectTrigger id="import-select-class">
                              <SelectValue placeholder="Choisir une classe..." />
                          </SelectTrigger>
                          <SelectContent>
                              {Object.keys(classList).sort().map(c => (
                                  <SelectItem key={c} value={c}>{c}</SelectItem>
                              ))}
                          </SelectContent>
                      </Select>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="import-new-class">Ou créer une nouvelle classe</Label>
                      <Input id="import-new-class" placeholder="ex: 2MV6" value={newImportClassName} onChange={(e) => setNewImportClassName(e.target.value)} disabled={!!importClassName} />
                  </div>
              </div>

          <div className="flex items-center gap-4">
            <Label htmlFor="csv-upload" className="flex-grow">
              <Button asChild className="w-full cursor-pointer" disabled={!importClassName && !newImportClassName}>
                <label>
                  <Upload className="mr-2 h-4 w-4" />
                  Choisir un fichier CSV et Importer
                  <Input id="csv-upload" type="file" accept=".csv" className="sr-only" onChange={handleFileUpload} disabled={!importClassName && !newImportClassName}/>
                </label>
              </Button>
            </Label>
          </div>
           <p className="text-sm text-muted-foreground text-center">Les élèves existants seront ignorés mais ajoutés à la classe si besoin.</p>
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
          <CardDescription>Supprimez des élèves ou des classes entières de l'application.</CardDescription>
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
                            {Object.keys(classList).sort().map(c => (
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
                            {(classList[deleteStudentClass] || []).sort().map((s: string) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={!studentToDelete}><UserMinus className="mr-2" /> Supprimer cet élève</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                            <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer l'élève <strong>{studentToDelete}</strong> de la classe ? Ses données personnelles ne seront pas supprimées.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteStudent}>Supprimer</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2 md:col-span-2">
                     <Label htmlFor="delete-class-select-2">Classe à supprimer</Label>
                      <Select value={classToDelete} onValueChange={setClassToDelete}>
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
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={!classToDelete}><FolderMinus className="mr-2" /> Supprimer cette classe</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirmer la suppression de la classe</AlertDialogTitle>
                            <AlertDialogDescription>
                                Êtes-vous sûr de vouloir supprimer la classe <strong>{classToDelete}</strong> ? Tous les élèves de cette classe et leurs données seront définitivement effacés. Cette action est irréversible.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteClass}>Supprimer la classe</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </CardContent>
      </Card>

      <Card className="border-destructive">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle/> Zone de danger</CardTitle>
              <CardDescription>Ces actions sont irréversibles. Soyez certain avant de continuer.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
               <div className="flex justify-between items-center p-4 border border-destructive/50 rounded-lg">
                  <p>Vider les listes d'élèves de **toutes** les classes. Utile pour une réinitialisation avant une nouvelle année scolaire.</p>
                   <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <Button variant="destructive" outline>
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
