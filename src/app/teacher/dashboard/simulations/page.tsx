import { adaptSimulationDifficulty } from "@/ai/flows/adaptive-simulation-difficulty";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { students } from "@/lib/mock-data";
import { Bot, SlidersHorizontal } from "lucide-react";

async function AdaptiveDifficultyForm() {

  async function handleSubmit(formData: FormData) {
    'use server';
    const studentId = formData.get('studentId') as string;
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    // In a real app, this would be dynamic simulation data
    const performanceData = {
        averageLapTime: 92.5,
        numCompletedLaps: 10,
        numCollisions: 3,
        averageSpeed: 185,
    };
    
    try {
        const result = await adaptSimulationDifficulty({ studentId, performanceData });
        // Here you would update the student's simulation settings in the database
        console.log('AI Recommended adjustments:', result);
    } catch (error) {
        console.error("Error adapting simulation difficulty:", error);
    }
  }

  return (
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Bot />
                Adaptive Difficulty AI
            </CardTitle>
            <CardDescription>
                Select a student to let the AI analyze their latest performance and suggest new difficulty settings.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="student">Student</Label>
                    <Select name="studentId">
                        <SelectTrigger id="student">
                            <SelectValue placeholder="Select a student" />
                        </SelectTrigger>
                        <SelectContent>
                            {students.map(student => (
                                <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" className="w-full">
                    Analyze and Adapt Difficulty
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
        <h1 className="font-headline text-5xl tracking-wide">Simulations Hub</h1>
        <p className="text-muted-foreground">
          Configure racing simulations and manage adaptive difficulty settings.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><SlidersHorizontal/>Global Simulation Parameters</CardTitle>
                    <CardDescription>These settings apply to all students unless overridden by adaptive difficulty.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>AI Opponent Skill (1-100)</Label>
                        <Input type="number" defaultValue="85" />
                    </div>
                     <div className="space-y-2">
                        <Label>Traction Control</Label>
                        <Select defaultValue="medium">
                            <SelectTrigger>
                                <SelectValue/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="off">Off</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button>Save Global Settings</Button>
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
