'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Settings2, UserPlus, Save } from "lucide-react";
import { useAssignments } from '@/contexts/AssignmentsContext';
import { Student } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SettingsPage() {
  const { toast } = useToast();
  const { students, classes, setStudents, setClasses } = useAssignments();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  
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
    const newStudent: Student = {
        id: `student-${Date.now()}`,
        name: studentName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@school.com`,
        progress: 0,
        xp: 0
    };

    // Update students list
    setStudents(prevStudents => [...prevStudents, newStudent]);

    // Update classes list
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

    // Reset form
    setFirstName('');
    setLastName('');
    setNewClassName('');
    setSelectedClass('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl lg:text-5xl tracking-wide">Paramètres &amp; Configuration</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les paramètres de l'application et ajoutez de nouveaux élèves.
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
          <CardTitle className="flex items-center gap-2"><Settings2 /> Paramètres généraux</CardTitle>
          <CardDescription>Préférences de l'application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
              <Label htmlFor="teacher-name">Nom de l'enseignant</Label>
              <Input id="teacher-name" placeholder="ex: M. Dubois" />
          </div>
           <div className="space-y-2">
              <Label htmlFor="school-name">Nom de l'établissement</Label>
              <Input id="school-name" placeholder="ex: Lycée des Métiers de l'Automobile" />
          </div>
           <div className="flex justify-end">
                <Button size="lg" className="bg-gradient-to-r from-primary to-racing-orange text-white hover:brightness-110">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder les paramètres
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
