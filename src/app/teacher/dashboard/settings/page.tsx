import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Database, FileUp, Save, Scale, Settings2, Trash2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-4xl lg:text-5xl tracking-wide">Paramètres &amp; Configuration</h1>
        <p className="text-muted-foreground mt-2">
          Gérez les données de l'application, les barèmes et les préférences globales.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Scale /> Barèmes de notation</CardTitle>
            <CardDescription>Définissez les poids pour le calcul de l'XP et des compétences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tp-weight">Poids de la complétion des TP (%)</Label>
              <Input id="tp-weight" type="number" defaultValue="70" />
              <p className="text-sm text-muted-foreground">Part des TPs dans le calcul total de l'XP.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sim-weight">Poids de la performance en simulation (%)</Label>
              <Input id="sim-weight" type="number" defaultValue="30" />
              <p className="text-sm text-muted-foreground">Part des simulations dans le calcul total de l'XP.</p>
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
          </CardContent>
        </Card>
      </div>
      
       <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive"><Database /> Gestion des données</CardTitle>
            <CardDescription>Importez, sauvegardez ou réinitialisez les données des élèves et des classes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Ces actions peuvent être irréversibles. Veuillez procéder avec prudence.</p>
            <div className="flex flex-wrap gap-4">
                 <Button variant="outline">
                    <FileUp className="mr-2 h-4 w-4" />
                    Importer une liste d'élèves (.csv)
                </Button>
                <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder les données
                </Button>
                <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Réinitialiser toutes les données
                </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg" className="bg-gradient-to-r from-primary to-racing-orange text-white hover:brightness-110">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder tous les paramètres
            </Button>
        </div>
    </div>
  );
}
