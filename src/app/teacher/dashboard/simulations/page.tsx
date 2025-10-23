
'use client';
import { useState } from 'react';
import { adaptSimulationDifficulty } from "@/ai/flows/adaptive-simulation-difficulty";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFirebase } from '@/firebase/provider';
import { Bot, SlidersHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AdaptiveDifficultyForm() {
  const { students } = useFirebase();
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const { toast } = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedStudentId) {
        toast({
            variant: "destructive",
            title: "Aucun élève sélectionné",
            description: "Veuillez sélectionner un élève avant de lancer l'analyse.",
        });
        return;
    }
    
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) return;

    // Dans une vraie application, ce seraient des données de simulation dynamiques
    const performanceData = {
        averageLapTime: 92.5,
        numCompletedLaps: 10,
        numCollisions: 3,
        averageSpeed: 185,
    };
    
    try {
        const result = await adaptSimulationDifficulty({ studentId: student.id, performanceData });
        // Ici, vous mettriez à jour les paramètres de simulation de l'élève dans la base de données
        console.log('Ajustements recommandés par l\'IA:', result);
        toast({
            title: "Analyse IA terminée",
            description: `Nouveau niveau pour ${student.name}: ${result.newDifficultyLevel}. Suggestions: ${result.suggestedAdjustments}`,
        });
    } catch (error) {
        console.error("Erreur lors de l'adaptation de la difficulté de la simulation:", error);
         toast({
            variant: "destructive",
            title: "Erreur de l'IA",
            description: "L'adaptation de la difficulté a échoué.",
        });
    }
  }

  return (
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Bot />
                IA de difficulté adaptative
            </CardTitle>
            <CardDescription>
                Sélectionnez un élève pour que l'IA analyse ses dernières performances et suggère de nouveaux paramètres de difficulté.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="student">Élève</Label>
                    <Select name="studentId" onValueChange={setSelectedStudentId} value={selectedStudentId}>
                        <SelectTrigger id="student">
                            <SelectValue placeholder="Sélectionnez un élève" />
                        </SelectTrigger>
                        <SelectContent>
                            {students.map(student => (
                                <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" className="w-full">
                    Analyser et adapter la difficulté
                </Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default function SimulationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-5xl tracking-wide">Hub de simulations</h1>
        <p className="text-muted-foreground">
          Configurez les simulations de course et gérez les paramètres de difficulté adaptative.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><SlidersHorizontal/>Paramètres de simulation globaux</CardTitle>
                    <CardDescription>Ces paramètres s'appliquent à tous les élèves, sauf s'ils sont remplacés par la difficulté adaptative.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Niveau de l'adversaire IA (1-100)</Label>
                        <Input type="number" defaultValue="85" />
                    </div>
                     <div className="space-y-2">
                        <Label>Antipatinage</Label>
                        <Select defaultValue="medium">
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="high">Élevé</SelectItem>
                                <SelectItem value="medium">Moyen</SelectItem>
                                <SelectItem value="low">Faible</SelectItem>
                                <SelectItem value="off">Désactivé</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button>Sauvegarder les paramètres globaux</Button>
                </CardContent>
            </Card>
        </div>
        <div>
            <AdaptiveDifficultyForm />
        </div>
      </div>
    </div>
  );
}
