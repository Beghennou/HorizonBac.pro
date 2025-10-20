'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database, FileUp, Save, Settings2, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const handleSaveSettings = () => {
    // Logique de sauvegarde à implémenter
    console.log("Sauvegarde des paramètres...");
  };

  const handleImport = () => {
    // Logique d'importation à implémenter
    console.log("Importation des élèves...");
  };

  const handleBackup = () => {
    // Logique de sauvegarde des données à implémenter
    console.log("Sauvegarde des données...");
  };

  const handleReset = () => {
    // Logique de réinitialisation à implémenter
    if (window.confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.")) {
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
                 <Button variant="outline" onClick={handleImport}>
                    <FileUp className="mr-2 h-4 w-4" />
                    Importer une liste d'élèves (.csv)
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
