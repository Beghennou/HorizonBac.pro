import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, CheckCircle, TrendingUp, PlusCircle, Settings, FileText } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button";
import Link from "next/link";

const chartData = [
  { module: "Aero", progress: 82 },
  { module: "Engine", progress: 75 },
  { module: "Chassis", progress: 68 },
  { module: "Strategy", progress: 91 },
  { module: "Data", progress: 78 },
];

const chartConfig = {
  progress: {
    label: "Progress",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export default function DashboardPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="font-headline text-5xl tracking-wide">Dashboard Cockpit</h1>
        <p className="text-muted-foreground">Live overview of your students' performance and progress.</p>
       </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">+5 from last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Competence</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+3.2% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Improved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Emily White</div>
            <p className="text-xs text-muted-foreground">+15% progress this week</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/40">
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">AI Skill Gap Alert</CardTitle>
            <BarChart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Students</div>
            <p className="text-xs text-primary/80">Identified for personalized paths</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline tracking-wider text-2xl">Module Progress Overview</CardTitle>
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
            <CardTitle className="font-headline tracking-wider text-2xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
             <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
                <Link href="/teacher/dashboard/students">
                    <Users className="w-6 h-6 text-primary"/>
                    <span className="font-semibold">Manage Students</span>
                </Link>
             </Button>
             <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
                <Link href="/teacher/dashboard/tp-designer">
                    <PlusCircle className="w-6 h-6 text-primary"/>
                    <span className="font-semibold">Create New TP</span>
                </Link>
             </Button>
             <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
                <Link href="#">
                    <FileText className="w-6 h-6 text-primary"/>
                    <span className="font-semibold">Generate Reports</span>
                </Link>
             </Button>
             <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
                <Link href="/teacher/dashboard/settings">
                    <Settings className="w-6 h-6 text-primary"/>
                    <span className="font-semibold">Adjust Parameters</span>
                </Link>
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
