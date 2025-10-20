'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { students } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Award, ChevronDown, User, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getTpsByNiveau, Niveau } from '@/lib/data-manager';
import { useToast } from '@/hooks/use-toast';


const StudentDetails = ({ student }: { student: any }) => {
    const searchParams = useSearchParams();
    const level = (searchParams.get('level') as Niveau) || 'seconde';
    const tps = getTpsByNiveau(level);
    const { toast } = useToast();

    const handleAssignTp = (tpId: number, tpTitle: string) => {
        // Logic to assign TP to student will be implemented here
        console.log(`Assigning TP ${tpId} to ${student.name}`);
        toast({
            title: "TP Assigné",
            description: `Le TP "${tpTitle}" a été assigné à ${student.name}.`,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <User />
                    Détails de {student.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Progression:</strong> {student.progress}%</p>
                <div className="mt-4 space-y-2">
                    <h4 className="font-bold">Assigner un TP:</h4>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                Choisir un TP <ChevronDown/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                            {tps.map(tp => (
                                <DropdownMenuItem key={tp.id} onSelect={() => handleAssignTp(tp.id, tp.titre)}>
                                    <span className="font-bold mr-2">TP {tp.id}</span>
                                    <span>{tp.titre}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardContent>
        </Card>
    );
};

export default function StudentsPage() {
    const searchParams = useSearchParams();
    const studentName = searchParams.get('student');
    const selectedStudent = students.find(s => s.name === studentName);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Users /> Vue de la classe</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Classement</TableHead>
                                    <TableHead>Élève</TableHead>
                                    <TableHead>XP / Progression</TableHead>
                                    <TableHead className="text-center">Statut</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.sort((a,b) => b.progress - a.progress).map((student, index) => (
                                    <TableRow key={student.id}>
                                        <TableCell className="font-bold text-lg text-accent">
                                            {index === 0 && <Award className="inline-block text-yellow-400 mr-2"/>}
                                            {index === 1 && <Award className="inline-block text-gray-400 mr-2"/>}
                                            {index === 2 && <Award className="inline-block text-orange-400 mr-2"/>}
                                            #{index + 1}
                                        </TableCell>
                                        <TableCell className="font-semibold">{student.name}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress value={student.progress} className="w-40 bg-muted/50" indicatorClassName="bg-gradient-to-r from-xp-color to-green-400"/>
                                                <span className="font-mono text-sm text-xp-color">{student.progress * 100} XP</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={student.lastActive === 'Aujourd\'hui' ? 'default' : 'secondary'} className={student.lastActive === 'Aujourd\'hui' ? 'bg-green-500/20 text-green-300 border-green-500/50' : ''}>
                                                {student.lastActive}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div>
                {selectedStudent ? (
                    <StudentDetails student={selectedStudent} />
                ) : (
                    <Card className="flex items-center justify-center h-64">
                        <CardContent className="text-center text-muted-foreground">
                            <p>Sélectionnez un élève pour voir les détails et assigner des TPs.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
