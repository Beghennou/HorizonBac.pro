'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings2, UserPlus, Save, AlertTriangle, Trash2, Upload } from "lucide-react";
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
  const { students, classes, setStudents, setClasses, teacherName, setTeacherName, resetStudentData } = useAssignments();

  const [localTeacherName, setLocalTeacherName] = useState(teacherName);
  const [schoolName, setSchoolName] = useState('Lycée des Métiers de l\'Automobile');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [resetPassword, setResetPassword] = useState('');

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
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

        const existingStudentNames = new Set(students.map(s => s.name));
        let addedCount = 0;

        const studentsToAdd: Student[] = [];

        newStudentNames.forEach(name => {
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
            existingStudentNames.add(name);
            addedCount++;
          }
        });

        if (studentsToAdd.length > 0) {
            setStudents(prev => [...prev, ...studentsToAdd]);
        }

        toast({
          title: "Importation terminée",
          description: `${addedCount} élève(s) ont été ajoutés. ${newStudentNames.length - addedCount} doublon(s) ignoré(s).`,
        });
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
    
    // Reset file input
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
          <CardDescription>Ajoutez des élèves en masse à partir d'un fichier CSV. Seule la première colonne (nom de l'élève) sera importée.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Label htmlFor="csv-upload" className="flex-grow">
              <Button asChild className="w-full cursor-pointer">
                <label>
                  <Upload className="mr-2 h-4 w-4" />
                  Choisir un fichier CSV
                  <Input id="csv-upload" type="file" accept=".csv" className="sr-only" onChange={handleFileUpload} />
                </label>
              </Button>
            </Label>
            <p className="text-sm text-muted-foreground">Les élèves existants seront ignorés.</p>
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

      <Card className="border-destructive">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle/> Zone de danger</CardTitle>
              <CardDescription>Ces actions sont irréversibles. Soyez certain avant de continuer.</CardDescription>
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
