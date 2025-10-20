import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Database, Save, Scale, Settings2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-5xl tracking-wide">Paramètres &amp; Configuration</h1>
        <p className="text-muted-foreground">
          Ajustez les paramètres des TPs, des simulations et de la notation pour personnaliser l'expérience d'apprentissage.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Scale /> Paramètres de notation</CardTitle>
            <CardDescription>Définissez comment la compétence des élèves est calculée.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Poids de la complétion des TP</Label>
              <Input type="number" defaultValue="60" />
              <p className="text-sm text-muted-foreground">Poids en pourcentage pour les scores des TP dans la note finale.</p>
            </div>
            <div className="space-y-2">
              <Label>Poids de la performance en simulation</Label>
              <Input type="number" defaultValue="40" />
              <p className="text-sm text-muted-foreground">Poids en pourcentage pour les résultats des simulations dans la note finale.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings2 /> Paramètres généraux</CardTitle>
            <CardDescription>Préférences à l'échelle de l'application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="enable-leaderboards" defaultChecked/>
              <Label htmlFor="enable-leaderboards">Activer les classements de simulation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="share-modules" />
              <Label htmlFor="share-modules">Autoriser le partage des modules TP avec d'autres enseignants</Label>
            </div>
          </CardContent>
        </Card>
      </div>
      
       <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive"><Database /> Gestion des données</CardTitle>
            <CardDescription>Enregistrez, sauvegardez ou réinitialisez les données des élèves.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">Ces actions sont irréversibles. Veuillez procéder avec prudence.</p>
            <div className="flex flex-wrap gap-4">
                 <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder toute la progression
                </Button>
                <Button variant="destructive">Réinitialiser toutes les données pour le nouveau semestre</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder tous les paramètres
            </Button>
        </div>
    </div>
  );
}
