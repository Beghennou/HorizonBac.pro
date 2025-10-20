import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, CheckCircle, TrendingUp, PlusCircle, Settings, FileText } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const chartData = [
  { module: "Aéro", progress: 82 },
  { module: "Moteur", progress: 75 },
  { module: "Châssis", progress: 68 },
  { module: "Stratégie", progress: 91 },
  { module: "Données", progress: 78 },
];

const chartConfig = {
  progress: {
    label: "Progression",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function DashboardPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="font-headline text-5xl tracking-wide">Tableau de bord</h1>
        <p className="text-muted-foreground">Aperçu en direct des performances et de la progression de vos élèves.</p>
       </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Élèves actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">+5 par rapport au dernier semestre</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compétence moyenne</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+3.2% ce mois-ci</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meilleure progression</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Emily White</div>
            <p className="text-xs text-muted-foreground">+15% de progression cette semaine</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/40">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Alerte IA : lacunes</CardTitle>
            <BarChart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Élèves</div>
            <p className="text-xs text-primary/80">Parcours personnalisés identifiés</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline tracking-wider text-2xl">Aperçu de la progression des modules</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="module" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }}/>
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="progress" fill="var(--color-progress)" radius={4} />
                 </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="font-headline tracking-wider text-2xl">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
             <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
                <Link href="/teacher/dashboard/students">
                    <Users className="w-6 h-6 text-primary"/>
                    <span className="font-semibold">Gérer les élèves</span>
                </Link>
             </Button>
             <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
                <Link href="/teacher/dashboard/tp-designer">
                    <PlusCircle className="w-6 h-6 text-primary"/>
                    <span className="font-semibold">Créer un nouveau TP</span>
                </Link>
             </Button>
             <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
                <Link href="#">
                    <FileText className="w-6 h-6 text-primary"/>
                    <span className="font-semibold">Générer des rapports</span>
                </Link>
             </Button>
             <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
                <Link href="/teacher/dashboard/settings">
                    <Settings className="w-6 h-6 text-primary"/>
                    <span className="font-semibold">Ajuster les paramètres</span>
                </Link>
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
