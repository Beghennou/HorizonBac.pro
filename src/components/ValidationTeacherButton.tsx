'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { useFirebase } from '@/firebase/provider';
import { cn } from '@/lib/utils';

interface ValidationTeacherButtonProps {
  studentName: string;
  tpId: number;
  validationId: string; // e.g., 'prelim' or 'etape-0', 'etape-1'
  validationData?: {
    teacherName: string;
    date: string;
  };
}

const TEACHER_PASSWORD = 'Mongy';

export function ValidationTeacherButton({
  studentName,
  tpId,
  validationId,
  validationData,
}: ValidationTeacherButtonProps) {
  const { teacherName, saveTpValidation } = useFirebase();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleValidate = () => {
    if (password === TEACHER_PASSWORD) {
      if (!teacherName) {
        toast({
          variant: 'destructive',
          title: 'Enseignant non identifié',
          description: "Veuillez vous connecter en tant qu'enseignant pour valider.",
        });
        return;
      }
      saveTpValidation(studentName, tpId, validationId, teacherName);
      toast({
        title: 'Étape Validée',
        description: `L'étape a été marquée comme validée par ${teacherName}.`,
      });
      setPassword('');
      setIsOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Mot de passe incorrect',
      });
      setPassword('');
    }
  };
  
  if (validationData) {
      return (
         <div className="mt-4 flex items-center justify-center gap-2 rounded-md border border-green-500 bg-green-500/10 p-3 text-green-400">
            <CheckCircle className="h-6 w-6" />
            <div className="text-center">
                <p className="font-bold">Étape validée par {validationData.teacherName}</p>
                <p className="text-sm">Le {validationData.date}</p>
            </div>
        </div>
      )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <ShieldCheck className="mr-2 h-4 w-4" />
          Validation Enseignant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Validation Enseignant</DialogTitle>
          <DialogDescription>
            Cette action est réservée à l'enseignant. Veuillez entrer votre mot de passe pour confirmer la validation de cette étape.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleValidate}>Valider</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
