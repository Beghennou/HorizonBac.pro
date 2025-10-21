'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings2, UserPlus, Save, AlertTriangle, Trash2, Upload, UserMinus, FolderMinus } from "lucide-react";
import { useAssignments } from '@/contexts/AssignmentsContext';
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

export default function SettingsPage() {
  const { toast } = useToast();
  const { students, classes, setStudents, setClasses, teacherName, setTeacherName, resetStudentData, deleteStudent, deleteClass } = useAssignments();

  const [localTeacherName, setLocalTeacherName] = useState(teacherName);
  const [schoolName, setSchoolName] = useState('Lycée des Métiers de l\'Automobile');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  
  const [importClassName, setImportClassName] = useState('');
  const [newImportClassName, setNewImportClassName] = useState('');

  const [deleteStudentClass, setDeleteStudentClass] = useState('');
  const [studentToDelete, setStudentToDelete] = useState('');
  const [classToDelete, setClassToDelete] = useState('');

  useEffect(() => {
    setLocalTeacherName(teacherName);
  }, [teacherName]);
  
  const handleAddStudent = () => {
    if (!firstName || !lastName || (!newClassName && !selectedClass)) {
      toast({
        variant: 'destructive',
        title: "Champs manquants",
        description: "Veuillez remplir le prénom, le nom et choisir ou créer une classe."
      });
      return;
    }

    const finalClassName = newClassName || selectedClass;
    const studentName = `${lastName.toUpperCase()} ${firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()}`;
    
    if (students.some(s => s.name === studentName)) {
      toast({
        variant: 'destructive',
        title: "Élève déjà existant",
        description: `${studentName} est déjà inscrit.`
      });
      return;
    }

    const newStudent: Student = {
        id: `student-${Date.now()}`,
        name: studentName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@school.com`,
        progress: 0,
        xp: 0
    };

    setStudents(prevStudents => [...prevStudents, newStudent]);

    setClasses(prevClasses => {
        const updatedClasses = { ...prevClasses };
        if (!updatedClasses[finalClassName]) {
            updatedClasses[finalClassName] = [];
        }
        updatedClasses[finalClassName].push(studentName);
        return updatedClasses;
    });

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

  const handleReset = () => {
    if (resetPassword === 'Mongy') {
        resetStudentData();
        setResetPassword('');
    } else {
        toast({
            variant: 'destructive',
            title: "Mot de passe incorrect",
            description: "La réinitialisation a été annulée.",
        });
    }
  };
  
  const handleDeleteStudent = () => {
      if (!studentToDelete) return;
      deleteStudent(studentToDelete);
      setStudentToDelete('');
      setDeleteStudentClass('');
  }
  
  const handleDeleteClass = () => {
      if (!classToDelete) return;
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
          .slice(1) // Skip header row
          .map((row: any) => row[0])
          .filter(name => typeof name === 'string' && name.trim() !== '');

        if (newStudentNames.length === 0) {
            toast({
                variant: "destructive",
                title: "Aucun élève trouvé",
                description: "Le fichier CSV semble vide ou mal formaté.",
            });
            return;
        }

        let addedCount = 0;
        const studentsToAdd: Student[] = [];
        const studentNamesToAddToClass: string[] = [];
        const existingStudentNames = new Set(students.map(s => s.name));

        newStudentNames.forEach(name => {
          studentNamesToAddToClass.push(name);
          if (!existingStudentNames.has(name)) {
            const nameParts = name.split(' ');
            const lastName = nameParts[0] || '';
            const firstName = nameParts.slice(1).join(' ') || 'Prénom';

            const newStudent: Student = {
              id: `student-${Date.now()}-${Math.random()}`,
              name: name,
              email: `${firstName.toLowerCase().replace(' ','.')}.${lastName.toLowerCase()}@school.com`,
              progress: 0,
              xp: 0,
            };
            studentsToAdd.push(newStudent);
            addedCount++;
          }
        });

        if (studentsToAdd.length > 0) {
            setStudents(prev => [...prev, ...studentsToAdd]);
        }
        
        setClasses(prevClasses => {
            const updatedClasses = { ...prevClasses };
            if (!updatedClasses[finalImportClassName]) {
                updatedClasses[finalImportClassName] = [];
            }
            const existingStudentsInClass = new Set(updatedClasses[finalImportClassName]);
            studentNamesToAddToClass.forEach(name => {
                if (!existingStudentsInClass.has(name)) {
                    updatedClasses[finalImportClassName].push(name);
                }
            });
            return updatedClasses;
        });

        toast({
          title: "Importation terminée",
          description: `${addedCount} élève(s) ont été ajouté(s). ${studentNamesToAddToClass.length} élève(s) ont été assigné(s) à la classe ${finalImportClassName}.`,
        });

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
          Gérez les paramètres de l'application, ajoutez de nouveaux élèves et importez des listes.
        </p>
      </div>

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
                            {Object.keys(classes).sort().map(c => (
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
          <CardTitle className="flex items-center gap-2"><Upload /> Importer des élèves</CardTitle>
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
                              {Object.keys(classes).sort().map(c => (
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
                            {Object.keys(classes).sort().map(c => (
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
                            {(classes[deleteStudentClass] || []).sort().map(s => (
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
                                Êtes-vous sûr de vouloir supprimer l'élève <strong>{studentToDelete}</strong> ? Toutes ses données (TPs, évaluations) seront définitivement perdues.
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
                            {Object.keys(classes).sort().map(c => (
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
              <CardDescription>Cette action est irréversible. Soyez certain avant de continuer.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
              <p>Réinitialiser toutes les données des élèves (évaluations, TP assignés, etc.) mais conserver les classes vides.</p>
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
                              Cette action est irréversible. Toutes les données des élèves seront supprimées. Pour confirmer, veuillez taper <strong>Mongy</strong> dans le champ ci-dessous.
                          </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="space-y-2">
                        <Label htmlFor="reset-password">Mot de passe de confirmation</Label>
                        <Input 
                            id="reset-password" 
                            type="password"
                            value={resetPassword}
                            onChange={(e) => setResetPassword(e.target.value)}
                            placeholder="Entrez le mot de passe..."
                        />
                      </div>
                      <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setResetPassword('')}>Annuler</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={handleReset} 
                            disabled={resetPassword !== 'Mongy'}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Confirmer la réinitialisation
                          </AlertDialogAction>
                      </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
          </CardContent>
      </Card>

    </div>
  );
}
