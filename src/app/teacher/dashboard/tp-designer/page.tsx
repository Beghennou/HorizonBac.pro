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
        <h1 className="font-headline text-5xl tracking-wide">TP Module Designer</h1>
        <p className="text-muted-foreground">
          Create and share customized TP modules with integrated racing simulations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DraftingCompass />
            New TP Module
          </CardTitle>
          <CardDescription>
            Fill in the details below to create a new practical module for your students.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label htmlFor="title">Module Title</Label>
                    <Input id="title" placeholder="e.g., Advanced Aerodynamics" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="aerodynamics">Aerodynamics</SelectItem>
                            <SelectItem value="powertrain">Powertrain</SelectItem>
                            <SelectItem value="chassis">Chassis</SelectItem>
                            <SelectItem value="strategy">Race Strategy</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the learning objectives of this module." />
            </div>
             <div className="space-y-2">
                <Label htmlFor="simulation">Integrated Simulation</Label>
                 <Select>
                    <SelectTrigger id="simulation">
                        <SelectValue placeholder="Link a simulation (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sim-1">Monza Circuit</SelectItem>
                        <SelectItem value="sim-2">Spa-Francorchamps</SelectItem>
                         <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end gap-4">
                <Button variant="outline">
                    <Save className="mr-2 h-4 w-4" />
                    Save as Draft
                </Button>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Module
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
