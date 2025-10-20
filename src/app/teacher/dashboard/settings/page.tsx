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
        <h1 className="font-headline text-5xl tracking-wide">Settings &amp; Configuration</h1>
        <p className="text-muted-foreground">
          Adjust parameters for TPs, simulations, and scoring to tailor the learning experience.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Scale /> Scoring Parameters</CardTitle>
            <CardDescription>Define how student competence is calculated.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>TP Completion Weight</Label>
              <Input type="number" defaultValue="60" />
              <p className="text-sm text-muted-foreground">Percentage weight for TP scores in final grade.</p>
            </div>
            <div className="space-y-2">
              <Label>Simulation Performance Weight</Label>
              <Input type="number" defaultValue="40" />
              <p className="text-sm text-muted-foreground">Percentage weight for simulation results in final grade.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings2 /> General Settings</CardTitle>
            <CardDescription>Application-wide preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="enable-leaderboards" defaultChecked/>
              <Label htmlFor="enable-leaderboards">Enable Simulation Leaderboards</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="share-modules" />
              <Label htmlFor="share-modules">Allow sharing TP modules with other teachers</Label>
            </div>
          </CardContent>
        </Card>
      </div>
      
       <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive"><Database /> Data Management</CardTitle>
            <CardDescription>Record, save, or reset student data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">These actions are irreversible. Please proceed with caution.</p>
            <div className="flex flex-wrap gap-4">
                 <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Save All Progress
                </Button>
                <Button variant="destructive">Reset All Data for New Semester</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button size="lg">
                <Save className="mr-2 h-4 w-4" />
                Save All Settings
            </Button>
        </div>
    </div>
  );
}
