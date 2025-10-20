import { students } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, PlusCircle, User } from 'lucide-react';
import Link from 'next/link';

export default function StudentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-5xl tracking-wide">Liste des élèves</h1>
          <p className="text-muted-foreground">Suivez, évaluez et gérez vos élèves.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un élève
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tous les élèves</CardTitle>
          <CardDescription>Liste de tous les élèves du semestre en cours.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Élève</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead className="hidden lg:table-cell">Dernière activité</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="person portrait" />
                        <AvatarFallback><User /></AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{student.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{student.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={student.progress} className="w-24" />
                      <span className="text-sm font-medium text-muted-foreground">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">{student.lastActive}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                          <Link href={`/teacher/dashboard/students/${student.id}`}>Voir détails & Analyse IA</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Réinitialiser les données</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">Supprimer l'élève</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
