'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Database, FileUp, Save, Settings2, Trash2 } from "lucide-react";
import { useAssignments } from '@/contexts/AssignmentsContext';
import { Student } from '@/lib/types';

export default function SettingsPage() {
  const { toast } = useToast();
  const { setStudents, setClasses, students, classes: currentClasses } = useAssignments();

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été mises à jour.",
    });
    console.log("Sauvegarde des paramètres...");
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const rows = csvData.split('\n').filter(row => row.trim() !== '');
        const headers = rows[0].split(',').map(h => h.trim().toLowerCase());
        
        const prenomIndex = headers.indexOf('prénom');
        const nomIndex = headers.indexOf('nom');
        const classeIndex = headers.indexOf('classe');

        if (prenomIndex === -1 || nomIndex === -1 || classeIndex === -1) {
            toast({
                variant: 'destructive',
                title: "Format CSV incorrect",
                description: "Le fichier doit contenir les colonnes 'Prénom', 'Nom' et 'Classe'."
            });
            return;
        }
        
        const newStudents: Student[] = [];
        const newClasses: Record<string, string[]> = {};

        for (let i = 1; i < rows.length; i++) {
          const rowData = rows[i].split(',').map(d => d.trim());
          const prenom = rowData[prenomIndex];
          const nom = rowData[nomIndex];
          const classe = rowData[classeIndex];
          
          if (prenom && nom && classe) {
              const studentName = `${nom.toUpperCase()} ${prenom.charAt(0).toUpperCase() + prenom.slice(1).toLowerCase()}`;
              const student: Student = {
                  id: `student-${i}`,
                  name: studentName,
                  email: `${prenom.toLowerCase()}.${nom.toLowerCase()}@school.com`,
                  progress: 0,
                  xp: 0
              };
              newStudents.push(student);

              if (!newClasses[classe]) {
                  newClasses[classe] = [];
              }
              newClasses[classe].push(studentName);
          }
        }

        setStudents(newStudents);
        setClasses(newClasses);

        toast({
          title: "Importation réussie",
          description: `${newStudents.length} élèves ont été importés et répartis dans ${Object.keys(newClasses).length} classe(s).`,
        });

      } catch (error) {
        toast({
            variant: "destructive",
            title: "Erreur lors de l'importation",
            description: "Le fichier n'a pas pu être lu. Vérifiez son format.",
        });
        console.error("Erreur d'importation CSV:", error);
      }
    };
    reader.readAsText(file, 'UTF-8');
  };


  const handleBackup = () => {
    try {
        const studentData = students.map(({id, name, email, progress, xp}) => ({
            prénom: name.split(' ')[1] || '',
            nom: name.split(' ')[0] || '',
            classe: Object.keys(currentClasses).find(c => currentClasses[c].includes(name)) || '',
            email,
            progress,
            xp
        }));

        const csvHeader = "Prénom,Nom,Classe,Email,Progress,XP\n";
        const csvRows = studentData.map(s => `${s.prénom},${s.nom},${s.classe},${s.email},${s.progress},${s.xp}`).join('\n');
        const csvContent = csvHeader + csvRows;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            const date = new Date().toISOString().slice(0,10);
            link.setAttribute("download", `sauvegarde_eleves_${date}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        toast({
          title: "Sauvegarde effectuée",
          description: "Le fichier de sauvegarde des élèves a été téléchargé.",
        });
    } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur lors de la sauvegarde",
          description: "Les données n'ont pas pu être exportées.",
        });
    }
  };

  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.")) {
      setStudents([]);
      setClasses({});
      // Vous voudrez peut-être aussi réinitialiser les TPs et évaluations
      toast({
        variant: "destructive",
        title: "Données réinitialisées",
        description: "Toutes les données de l'application ont été effacées.",
      });
      console.log("Réinitialisation des données...");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl lg:text-5xl tracking-wide">Paramètres &amp; Configuration</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les données de l'application, les classes et les préférences globales.
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
              <Input id="teacher-name" placeholder="ex: M. Dubois" />
          </div>
           <div className="space-y-2">
              <Label htmlFor="school-name">Nom de l'établissement</Label>
              <Input id="school-name" placeholder="ex: Lycée des Métiers de l'Automobile" />
          </div>
        </CardContent>
      </Card>
      
       <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive"><Database /> Gestion des données</CardTitle>
            <CardDescription>Importez, sauvegardez ou réinitialisez les données des élèves et des classes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Ces actions peuvent être irréversibles. Veuillez procéder avec prudence.</p>
            <div className="flex flex-wrap gap-4">
                 <Button variant="outline" asChild>
                    <Label htmlFor="csv-upload" className="cursor-pointer">
                      <FileUp className="mr-2 h-4 w-4" />
                      Importer une liste d'élèves (.csv)
                      <Input id="csv-upload" type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                    </Label>
                 </Button>
                <Button variant="outline" onClick={handleBackup}>
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder les données
                </Button>
                <Button variant="destructive" onClick={handleReset}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Réinitialiser toutes les données
                </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg" className="bg-gradient-to-r from-primary to-racing-orange text-white hover:brightness-110" onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder tous les paramètres
            </Button>
        </div>
    </div>
  );
}
