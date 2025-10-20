import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DraftingCompass, PlusCircle, Save } from "lucide-react";

export default function TPDesignerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-5xl tracking-wide">Concepteur de modules TP</h1>
        <p className="text-muted-foreground">
          Créez et partagez des modules TP personnalisés avec des simulations de course intégrées.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DraftingCompass />
            Nouveau Module TP
          </CardTitle>
          <CardDescription>
            Remplissez les détails ci-dessous pour créer un nouveau module pratique pour vos élèves.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="title">Titre du module</Label>
                    <Input id="title" placeholder="ex: Aérodynamique avancée" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select>
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="aerodynamics">Aérodynamique</SelectItem>
                            <SelectItem value="powertrain">Groupe motopropulseur</SelectItem>
                            <SelectItem value="chassis">Châssis</SelectItem>
                            <SelectItem value="strategy">Stratégie de course</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Décrivez les objectifs d'apprentissage de ce module." />
            </div>
             <div className="space-y-2">
                <Label htmlFor="simulation">Simulation intégrée</Label>
                 <Select>
                    <SelectTrigger id="simulation">
                        <SelectValue placeholder="Lier une simulation (optionnel)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sim-1">Circuit de Monza</SelectItem>
                        <SelectItem value="sim-2">Spa-Francorchamps</SelectItem>
                         <SelectItem value="none">Aucune</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end gap-4">
                <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder en brouillon
                </Button>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Créer le module
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
