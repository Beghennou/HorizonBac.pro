
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings2, UserPlus, Save, AlertTriangle, Trash2, Upload, UserMinus, FolderMinus, ChevronsRight, Eraser, PlusCircle, FolderPlus, FolderClosed, UserCog, Pencil } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Cursus } from '@/lib/data-manager';


export default function SettingsPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const { firestore, classes, teacherName, setTeacherName, updateClassWithCsv, deleteStudent, emptyClass, resetAllStudentLists, createClass, deleteClass, addTeacher, deleteTeacher, teachers, updateStudentName } = useFirebase();

  const [localTeacherName, setLocalTeacherName] = useState(teacherName);
  const [schoolName, setSchoolName] = useState('Lycée des Métiers de l\'Automobile');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newClassNameForStudent, setNewClassNameForStudent] = useState('');
  const [selectedClassForStudent, setSelectedClassForStudent] = useState('');
  
  const [newClassName, setNewClassName] = useState('');
  const [classToDelete, setClassToDelete] = useState('');

  const [resetDataPassword, setResetDataPassword] = useState('');
  const [resetListsPassword, setResetListsPassword] = useState('');
  
  const [importClassName, setImportClassName] = useState('');
  const [newImportClassName, setNewImportClassName] = useState('');

  const [deleteStudentClass, setDeleteStudentClass] = useState('');
  const [studentToDelete, setStudentToDelete] = useState('');
  const [classToEmpty, setClassToEmpty] = useState('');
  
  const [classStudents, setClassStudents] = useState<string[]>([]);
  const [secondeClassToUpdate, setSecondeClassToUpdate] = useState('');
  const [premiereClassToUpdate, setPremiereClassToUpdate] = useState('');
  const [terminaleClassToUpdate, setTerminaleClassToUpdate] = useState('');
  const [cap1ClassToUpdate, setCap1ClassToUpdate] = useState('');
  const [cap2ClassToUpdate, setCap2ClassToUpdate] = useState('');
  
  const [newTeacherName, setNewTeacherName] = useState('');
  const [teacherToDelete, setTeacherToDelete] = useState('');
  
  const [editStudentClass, setEditStudentClass] = useState('');
  const [studentToEdit, setStudentToEdit] = useState('');
  const [newStudentFirstName, setNewStudentFirstName] = useState('');
  const [newStudentLastName, setNewStudentLastName] = useState('');

  const cursus = (searchParams.get('cursus') as Cursus) || 'bacpro';

  const classNames = useMemo(() => classes
    .map(c => c.id)
    .filter(name => {
        const upperCaseName = name.toUpperCase();
        if (cursus === 'cap') {
            return upperCaseName.includes('CAP');
        }
        // Pour bacpro, on exclut les CAPs
        return upperCaseName.includes('BAC') && !upperCaseName.includes('CAP');
    })
    .sort(), [classes, cursus]);

  const teacherList = useMemo(() => teachers.filter(t => t.cursus === cursus).sort((a,b) => a.name.localeCompare(b.name)), [teachers, cursus]);

  const secondeClasses = useMemo(() => classNames.filter(name => name.startsWith('2BAC')), [classNames]);
  const premiereClasses = useMemo(() => classNames.filter(name => name.startsWith('1BAC')), [classNames]);
  const terminaleClasses = useMemo(() => classNames.filter(name => name.startsWith('TBAC')), [classNames]);
  const cap1Classes = useMemo(() => classNames.filter(name => name.startsWith('1CAP')), [classNames]);
  const cap2Classes = useMemo(() => classNames.filter(name => name.startsWith('2CAP')), [classNames]);


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
      const targetClass = newClassNameForStudent.trim() || selectedClassForStudent;

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
      setNewClassNameForStudent('');
  };
  
  const handleCreateClass = () => {
    if (!newClassName.trim()) {
        toast({ variant: 'destructive', title: 'Nom de classe vide', description: 'Veuillez entrer un nom pour la nouvelle classe.' });
        return;
    }
    if (classes.map(c=>c.id).includes(newClassName.trim())) {
        toast({ variant: 'destructive', title: 'Classe existante', description: 'Une classe avec ce nom existe déjà.' });
        return;
    }
    createClass(newClassName.trim());
    setNewClassName('');
  };

  const handleDeleteClass = () => {
    if (!classToDelete) {
        toast({ variant: 'destructive', title: 'Aucune classe sélectionnée', description: 'Veuillez sélectionner une classe à supprimer.' });
        return;
    }
    deleteClass(classToDelete);
    setClassToDelete('');
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
  
  const handleEmptyClass = async () => {
      if (!classToEmpty) {
          toast({variant: 'destructive', title: 'Sélection manquante', description: 'Veuillez sélectionner une classe à vider.'});
          return;
      }
      emptyClass(classToEmpty);
  }

  const handleLegacyCsvImport = (event: React.ChangeEvent<HTMLInputElement>) => {
      const finalImportClassName = newImportClassName || importClassName;
      handleFileUpload(event, finalImportClassName);
      setImportClassName('');
      setNewImportClassName('');
  };
  
  const handleAddTeacher = () => {
      if (!newTeacherName.trim()) {
          toast({ variant: 'destructive', title: 'Le nom ne peut pas être vide.' });
          return;
      }
      addTeacher(newTeacherName.trim(), cursus);
      setNewTeacherName('');
  };
  
  const handleDeleteTeacher = () => {
      if (!teacherToDelete) {
          toast({ variant: 'destructive', title: 'Aucun enseignant sélectionné.' });
          return;
      }
      deleteTeacher(teacherToDelete);
      setTeacherToDelete('');
  }
  
  useEffect(() => {
    const classData = classes.find(c => c.id === deleteStudentClass);
    setClassStudents(classData?.studentNames.sort((a:string,b:string) => a.localeCompare(b)) || []);
  }, [deleteStudentClass, classes]);
  
  useEffect(() => {
    const classData = classes.find(c => c.id === editStudentClass);
    setClassStudents(classData?.studentNames.sort((a:string,b:string) => a.localeCompare(b)) || []);
  }, [editStudentClass, classes]);
  
  const handleEditStudent = () => {
      if (!editStudentClass || !studentToEdit || !newStudentFirstName || !newStudentLastName) {
          toast({ variant: 'destructive', title: 'Champs manquants', description: "Veuillez sélectionner une classe, un élève et entrer le nouveau nom."});
          return;
      }
      const newFullName = `${newStudentFirstName.trim()} ${newStudentLastName.trim().toUpperCase()}`;
      updateStudentName(studentToEdit, newFullName, editStudentClass);
      setStudentToEdit('');
      setNewStudentFirstName('');
      setNewStudentLastName('');
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl lg:text-5xl tracking-wide">Paramètres &amp; Configuration ({cursus.toUpperCase()})</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les paramètres de l'application, les élèves et les classes pour la nouvelle année.
        </p>
      </div>

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
          <CardTitle className="flex items-center gap-2"><UserCog /> Gestion des Enseignants ({cursus.toUpperCase()})</CardTitle>
          <CardDescription>Ajoutez ou supprimez des profils d'enseignants pour ce cursus.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="add">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add"><UserPlus className="mr-2"/>Ajouter un enseignant</TabsTrigger>
              <TabsTrigger value="delete"><UserMinus className="mr-2"/>Supprimer un enseignant</TabsTrigger>
            </TabsList>
            <TabsContent value="add" className="pt-4">
              <div className="space-y-2">
                <Label htmlFor="new-teacher-name">Nom du nouvel enseignant</Label>
                <div className="flex items-center gap-2">
                    <Input id="new-teacher-name" placeholder="ex: Mme. Leroy" value={newTeacherName} onChange={e => setNewTeacherName(e.target.value)} />
                    <Button onClick={handleAddTeacher}><PlusCircle className="mr-2" /> Ajouter</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="delete" className="pt-4">
               <div className="space-y-2">
                <Label htmlFor="delete-teacher-select">Enseignant à supprimer</Label>
                <div className="flex items-center gap-2">
                    <Select value={teacherToDelete} onValueChange={setTeacherToDelete}>
                        <SelectTrigger id="delete-teacher-select">
                            <SelectValue placeholder="Choisir un enseignant..."/>
                        </SelectTrigger>
                        <SelectContent>
                            {teacherList.map(t => (
                                <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" disabled={!teacherToDelete}><Trash2 className="mr-2" /> Supprimer</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Voulez-vous vraiment supprimer cet enseignant ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Cette action est irréversible et supprimera le profil de l'enseignant de la base de données.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteTeacher} className="bg-destructive hover:bg-destructive/90">Confirmer</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserPlus /> Gestion des Élèves ({cursus.toUpperCase()})</CardTitle>
          <CardDescription>Ajoutez, modifiez ou supprimez des élèves manuellement.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="add">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="add"><UserPlus className="mr-2"/>Ajouter</TabsTrigger>
              <TabsTrigger value="edit"><Pencil className="mr-2"/>Modifier</TabsTrigger>
              <TabsTrigger value="delete"><UserMinus className="mr-2"/>Supprimer</TabsTrigger>
            </TabsList>
            <TabsContent value="add" className="pt-4">
              <div className="space-y-4">
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
                          <Label htmlFor="select-class-student">Assigner à une classe existante</Label>
                          <Select onValueChange={setSelectedClassForStudent} value={selectedClassForStudent} >
                              <SelectTrigger id="select-class-student">
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
                          <Label htmlFor="new-class-student">Ou créer une nouvelle classe pour l'élève</Label>
                          <Input id="new-class-student" placeholder="ex: 2MV6" value={newClassNameForStudent} onChange={(e) => setNewClassNameForStudent(e.target.value)} />
                      </div>
                  </div>
                  <div className="flex justify-end">
                      <Button onClick={handleAddStudent}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Ajouter l'élève
                      </Button>
                  </div>
              </div>
            </TabsContent>
            <TabsContent value="edit" className="pt-4">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="edit-class-select">Classe</Label>
                            <Select value={editStudentClass} onValueChange={setEditStudentClass}>
                                <SelectTrigger id="edit-class-select">
                                    <SelectValue placeholder="Choisir une classe..."/>
                                </SelectTrigger>
                                <SelectContent>
                                    {classNames.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-student-select">Élève à modifier</Label>
                            <Select value={studentToEdit} onValueChange={setStudentToEdit} disabled={!editStudentClass}>
                                <SelectTrigger id="edit-student-select">
                                    <SelectValue placeholder="Choisir un élève..."/>
                                </SelectTrigger>
                                <SelectContent>
                                    {classStudents.map((s: string) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-first-name">Nouveau Prénom</Label>
                            <Input id="new-first-name" value={newStudentFirstName} onChange={(e) => setNewStudentFirstName(e.target.value)} disabled={!studentToEdit} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-last-name">Nouveau Nom</Label>
                            <Input id="new-last-name" value={newStudentLastName} onChange={(e) => setNewStudentLastName(e.target.value)} disabled={!studentToEdit} />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={handleEditStudent} disabled={!studentToEdit || !newStudentFirstName || !newStudentLastName}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Modifier le nom
                        </Button>
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="delete" className="pt-4">
              <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
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
                  </div>
                   <div className="flex justify-end">
                      <Button variant="destructive" onClick={handleDeleteStudent}><UserMinus className="mr-2" /> Supprimer cet élève</Button>
                   </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ChevronsRight /> Gestion des Classes ({cursus.toUpperCase()})</CardTitle>
          <CardDescription>
            Créez, supprimez, importez les listes d'élèves ou videz une classe pour le cursus sélectionné.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2 p-4 border rounded-lg">
                <Label className="font-bold">Créer une nouvelle classe</Label>
                <div className="flex items-center gap-2">
                    <Input placeholder="Nom de la nouvelle classe, ex: 1CAP-A" value={newClassName} onChange={e => setNewClassName(e.target.value)} />
                    <Button onClick={handleCreateClass}><PlusCircle className="mr-2" /> Créer</Button>
                </div>
            </div>
             <div className="space-y-2 p-4 border rounded-lg">
                <Label className="font-bold">Importer des listes d'élèves par niveau</Label>
                <Tabs defaultValue={cursus}>
                    <TabsList className="grid w-full grid-cols-2 mt-2">
                        <TabsTrigger value="bacpro" disabled={cursus !== 'bacpro'}>BAC PRO</TabsTrigger>
                        <TabsTrigger value="cap" disabled={cursus !== 'cap'}>CAP</TabsTrigger>
                    </TabsList>
                    <TabsContent value="bacpro" className="pt-4">
                        <div className="space-y-3">
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
                        </div>
                    </TabsContent>
                    <TabsContent value="cap" className="pt-4">
                        <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                <Select value={cap1ClassToUpdate} onValueChange={setCap1ClassToUpdate}>
                                    <SelectTrigger><SelectValue placeholder="Choisir une classe de 1ère année CAP..."/></SelectTrigger>
                                    <SelectContent>
                                        {cap1Classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <Button asChild variant="outline">
                                    <label className="cursor-pointer w-full">
                                        <Upload className="mr-2 h-4 w-4" /> Importer CSV 1ère Année CAP
                                        <Input type="file" accept=".csv" className="sr-only" onChange={(e) => handleFileUpload(e, cap1ClassToUpdate)} />
                                    </label>
                                </Button>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                <Select value={cap2ClassToUpdate} onValueChange={setCap2ClassToUpdate}>
                                    <SelectTrigger><SelectValue placeholder="Choisir une classe de 2ème année CAP..."/></SelectTrigger>
                                    <SelectContent>
                                        {cap2Classes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <Button asChild variant="outline">
                                    <label className="cursor-pointer w-full">
                                        <Upload className="mr-2 h-4 w-4" /> Importer CSV 2ème Année CAP
                                        <Input type="file" accept=".csv" className="sr-only" onChange={(e) => handleFileUpload(e, cap2ClassToUpdate)} />
                                    </label>
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 p-4 border rounded-lg">
                    <Label className="font-bold">Vider une classe</Label>
                    <div className="flex items-center gap-2">
                        <Select value={classToEmpty} onValueChange={setClassToEmpty}>
                            <SelectTrigger id="empty-class-select">
                                <SelectValue placeholder="Choisir une classe..."/>
                            </SelectTrigger>
                            <SelectContent>
                                {classNames.map(c => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="destructive" onClick={handleEmptyClass} disabled={!classToEmpty}><FolderMinus className="mr-2" /> Vider</Button>
                    </div>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                    <Label className="font-bold text-destructive">Supprimer une classe</Label>
                    <div className="flex items-center gap-2">
                         <Select value={classToDelete} onValueChange={setClassToDelete}>
                            <SelectTrigger id="delete-class-select-main">
                                <SelectValue placeholder="Choisir une classe..."/>
                            </SelectTrigger>
                            <SelectContent>
                                {classNames.map(c => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" disabled={!classToDelete}><Trash2 className="mr-2" /> Supprimer</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Voulez-vous vraiment supprimer la classe "{classToDelete}" ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Cette action est irréversible. Tous les élèves seront dissociés mais leurs données ne seront pas supprimées.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteClass} className="bg-destructive hover:bg-destructive/90">Confirmer</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
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
                  <div>
                    <p className="font-medium">Vider les listes d'élèves de **toutes** les classes</p>
                    <p className="text-sm text-muted-foreground">Utilisez cette fonction en fin d'année pour préparer la prochaine rentrée. Attention, ceci affecte TOUS les cursus.</p>
                  </div>
                   <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <Button variant="outline" className={cn("border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground")}>
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
                 <div>
                    <p className="font-medium">Réinitialiser les données des élèves</p>
                    <p className="text-sm text-muted-foreground">Supprime les évaluations et TP assignés, mais conserve les listes de classes et d'élèves.</p>
                 </div>
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

    
