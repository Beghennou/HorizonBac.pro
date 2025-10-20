'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Database, FileUp, Save, Settings2, Trash2 } from "lucide-react";
import { useAssignments } from '@/contexts/AssignmentsContext';

export default function SettingsPage() {
  const { toast } = useToast();
  const { setStudents, setClasses } = useAssignments();

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
      const csvData = event.target?.result as string;
      // Ici, vous auriez la logique pour parser le CSV et mettre à jour l'état.
      // Pour l'instant, on simule avec un toast.
      console.log('CSV Data:', csvData);
      
      toast({
        title: "Fichier importé",
        description: `${file.name} a été chargé. La logique de mise à jour des élèves est à implémenter.`,
      });
    };
    reader.readAsText(file);
  };


  const handleBackup = () => {
     toast({
      title: "Sauvegarde effectuée",
      description: "Une sauvegarde de vos données a été créée.",
    });
    console.log("Sauvegarde des données...");
  };

  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.")) {
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
