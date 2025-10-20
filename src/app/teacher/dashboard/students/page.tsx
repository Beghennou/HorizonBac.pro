'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { students as allStudents } from '@/lib/mock-data';
import { classes } from '@/lib/data-manager';
import { Badge } from '@/components/ui/badge';
import { Award, BookCheck, ChevronDown, User, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getTpsByNiveau, Niveau } from '@/lib/data-manager';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';


const StudentDetails = ({ student, level, assignedTps, onAssignTp }: { student: any, level: Niveau, assignedTps: number[], onAssignTp: (tpId: number, tpTitle: string) => void }) => {
    const tps = getTpsByNiveau(level);
    const { toast } = useToast();

    const handleAssign = (tpId: number, tpTitle: string) => {
        onAssignTp(tpId, tpTitle);
        toast({
            title: "TP Assigné",
            description: `Le TP "${tpTitle}" a été assigné à ${student.name}.`,
        });
    };

    const assignedTpsDetails = assignedTps.map(id => {
        const tp = getTpsByNiveau(level).find(t => t.id === id) || getTpsByNiveau('seconde').find(t => t.id === id) || getTpsByNiveau('premiere').find(t => t.id === id) || getTpsByNiveau('terminale').find(t => t.id === id);
        return tp ? { ...tp, status: 'Non commencé' } : null; // Statut mocké
    }).filter(Boolean);


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <User />
                    Détails de {student.name}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Progression:</strong> {student.progress}%</p>
                </div>

                <div className="space-y-2">
                    <h4 className="font-bold">Assigner un TP:</h4>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                                Choisir un TP ({level}) <ChevronDown/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                            {tps.map(tp => (
                                <DropdownMenuItem key={tp.id} onSelect={() => handleAssign(tp.id, tp.titre)} disabled={assignedTps.includes(tp.id)}>
                                    <span className="font-bold mr-2">TP {tp.id}</span>
                                    <span>{tp.titre}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                
                <div className="space-y-4">
                     <h4 className="font-bold flex items-center gap-2"><BookCheck /> TPs Assignés</h4>
                     {assignedTpsDetails.length > 0 ? (
                        <div className="space-y-2">
                            {assignedTpsDetails.map(tp => tp && (
                                <div key={tp.id} className="flex justify-between items-center p-2 rounded-md bg-background/50">
                                    <p className="text-sm font-semibold">{tp.titre}</p>
                                    <Badge variant="secondary">{tp.status}</Badge>
                                </div>
                            ))}
                        </div>
                     ) : (
                        <p className="text-sm text-muted-foreground">Aucun TP assigné pour le moment.</p>
                     )}
                </div>

            </CardContent>
        </Card>
    );
};

export default function StudentsPage() {
    const searchParams = useSearchParams();
    const studentName = searchParams.get('student');
    const level = (searchParams.get('level') as Niveau) || 'seconde';
    const className = searchParams.get('class') || Object.keys(classes)[0];
    
    // Filter students based on the selected class
    const studentNamesInClass = classes[className as keyof typeof classes] || [];
    const studentsInClass = allStudents.filter(student => studentNamesInClass.includes(student.name));


    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    
    const [assignedTps, setAssignedTps] = useState<Record<string, number[]>>({
        'Alex Dubois': [101], // Mock initial data
    });

    const { toast } = useToast();

    const tps = getTpsByNiveau(level);

    const handleAssignTpToSelected = (tpId: number, tpTitle: string) => {
        if (selectedStudents.length === 0) {
            toast({
                variant: 'destructive',
                title: "Aucun élève sélectionné",
                description: "Veuillez sélectionner au moins un élève pour assigner un TP.",
            });
            return;
        }

        setAssignedTps(prev => {
            const newAssignedTps = { ...prev };
            selectedStudents.forEach(studentId => {
                const studentTps = newAssignedTps[studentId] || [];
                if (!studentTps.includes(tpId)) {
                    newAssignedTps[studentId] = [...studentTps, tpId];
                }
            });
            return newAssignedTps;
        });

        toast({
            title: "TP Assigné",
            description: `Le TP "${tpTitle}" a été assigné à ${selectedStudents.length} élève(s).`,
        });
    };
    
    const handleStudentSelection = (studentId: string, isSelected: boolean) => {
        setSelectedStudents(prev => {
            if (isSelected) {
                return [...prev, studentId];
            } else {
                return prev.filter(id => id !== studentId);
            }
        });
    };

    const selectedStudentDetails = allStudents.find(s => s.name === studentName);


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-3"><Users /> Vue de la classe: {className}</CardTitle>
                        {selectedStudents.length > 0 && (
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        Assigner un TP à {selectedStudents.length} élève(s) <ChevronDown/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                                    {tps.map(tp => (
                                        <DropdownMenuItem key={tp.id} onSelect={() => handleAssignTpToSelected(tp.id, tp.titre)}>
                                            <span className="font-bold mr-2">TP {tp.id}</span>
                                            <span>{tp.titre}</span>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead>Classement</TableHead>
                                    <TableHead>Élève</TableHead>
                                    <TableHead>XP / Progression</TableHead>
                                    <TableHead className="text-center">Statut</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {studentsInClass.sort((a,b) => b.progress - a.progress).map((student, index) => (
                                    <TableRow key={student.id}>
                                        <TableCell>
                                            <Checkbox
                                                id={`select-${student.id}`}
                                                onCheckedChange={(checked) => handleStudentSelection(student.name, !!checked)}
                                                checked={selectedStudents.includes(student.name)}
                                            />
                                        </TableCell>
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
                {selectedStudentDetails ? (
                    <StudentDetails 
                        student={selectedStudentDetails} 
                        level={level}
                        assignedTps={assignedTps[selectedStudentDetails.name] || []}
                        onAssignTp={(tpId, tpTitle) => {
                             setAssignedTps(prev => {
                                const currentTps = prev[selectedStudentDetails.name] || [];
                                if (currentTps.includes(tpId)) return prev; // Do not add if already assigned
                                return {
                                    ...prev,
                                    [selectedStudentDetails.name]: [...currentTps, tpId]
                                };
                            });
                            toast({
                                title: "TP Assigné",
                                description: `Le TP "${tpTitle}" a été assigné à ${selectedStudentDetails.name}.`,
                            });
                        }}
                    />
                ) : (
                    <Card className="flex items-center justify-center h-full">
                        <CardContent className="text-center text-muted-foreground p-6">
                            <p>Sélectionnez un ou plusieurs élèves dans la liste pour leur assigner des TPs.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
