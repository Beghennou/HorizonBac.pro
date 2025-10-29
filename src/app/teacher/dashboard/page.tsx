
'use client';

import { useSearchParams } from 'next/navigation';
import { AlertTriangle, ArrowLeft, Users, ClipboardCheck, Percent, UserCheck, BookOpen } from 'lucide-react';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import Loading from './loading';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { doc } from 'firebase/firestore';
import React, { useMemo } from 'react';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export default function DashboardPage() {
  const searchParams = useSearchParams();
  const { firestore, isLoaded, classes, assignedTps } = useFirebase();
  const currentClassName = searchParams.get('class');
  
  const { data: classData, isLoading: isClassLoading } = useDoc(useMemoFirebase(() => {
      if (currentClassName && firestore) {
        return doc(firestore, 'classes', currentClassName);
      }
      return null;
    }, [currentClassName, firestore]));

  const studentsInClass = useMemo(() => {
    if (classData && classData.studentNames) {
        return (classData.studentNames as string[]).sort((a: string, b: string) => a.localeCompare(b));
    }
    return [];
  }, [classData]);

  const stats = useMemo(() => {
    if (!isLoaded || !studentsInClass || !assignedTps) {
      return { studentCount: 0, tpsToEvaluate: 0, overallProgress: 0 };
    }

    let tpsToEvaluate = 0;
    let totalAssignedTps = 0;
    let totalCompletedTps = 0;

    studentsInClass.forEach(studentName => {
      const studentTps = assignedTps[studentName];
      if (studentTps && Array.isArray(studentTps)) {
        totalAssignedTps += studentTps.length;
        studentTps.forEach(tp => {
          if (tp.status === 'terminé') {
            totalCompletedTps++;
            // This logic should be refined to check if the TP has already been evaluated.
            // For now, we count all completed TPs.
            tpsToEvaluate++;
          }
        });
      }
    });

    const overallProgress = totalAssignedTps > 0 ? Math.round((totalCompletedTps / totalAssignedTps) * 100) : 0;

    return {
      studentCount: studentsInClass.length,
      tpsToEvaluate,
      overallProgress,
    };
  }, [studentsInClass, assignedTps, isLoaded]);
  
  const studentProgressList = useMemo(() => {
     if (!isLoaded || !studentsInClass || !assignedTps) return [];
    
    return studentsInClass.map(studentName => {
        const studentTps = assignedTps[studentName] || [];
        const completedCount = studentTps.filter(tp => tp.status === 'terminé').length;
        const progress = studentTps.length > 0 ? (completedCount / studentTps.length) * 100 : 0;
        return {
            name: studentName,
            progress,
            assignedCount: studentTps.length,
            completedCount,
        }
    })
  }, [studentsInClass, assignedTps, isLoaded]);


  if (!isLoaded || (currentClassName && isClassLoading)) {
    return <Loading />;
  }

  // If classes are loaded and there's no selected class, show a message.
  if (classes && classes.length > 0 && !currentClassName) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <AlertTriangle className="w-16 h-16 text-accent mb-4" />
        <h1 className="font-headline text-3xl tracking-wide text-accent">Aucune classe sélectionnée</h1>
        <p className="text-muted-foreground text-lg mt-2 max-w-md">
          Veuillez sélectionner une classe dans le menu à gauche pour commencer.
        </p>
        <ArrowLeft className="h-24 w-24 text-primary mx-auto mt-8 motion-safe:animate-pulse" />
      </div>
    );
  }

  // If there are no classes at all, guide the user to the settings page.
  if (classes && classes.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
            <h1 className="font-headline text-3xl tracking-wide text-destructive">Aucune classe n'est configurée</h1>
            <p className="text-muted-foreground text-lg mt-2 max-w-md">
                Pour commencer, veuillez ajouter des classes et des élèves dans la page <strong>Paramètres</strong>.
            </p>
        </div>
      );
  }
  
  const createUrl = (base: string) => {
    const params = new URLSearchParams(searchParams.toString());
    return `${base}?${params.toString()}`;
  }

  return (
    <div className="space-y-8">
        <div>
            <h1 className="font-headline text-4xl lg:text-5xl tracking-wide">Tableau de Bord : Classe {currentClassName}</h1>
            <p className="text-muted-foreground mt-2">
                Vue d'ensemble de l'activité et de la progression de votre classe.
            </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Nombre d'Élèves</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.studentCount}</div>
                    <p className="text-xs text-muted-foreground">élèves inscrits dans cette classe</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">TPs à Évaluer</CardTitle>
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.tpsToEvaluate}</div>
                     <p className="text-xs text-muted-foreground">TP terminés en attente de votre évaluation</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Progression Moyenne</CardTitle>
                    <Percent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.overallProgress}%</div>
                     <p className="text-xs text-muted-foreground">des TP assignés sont terminés par la classe</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Accès Rapide</CardTitle>
                     <CardDescription>Actions les plus fréquentes pour gérer votre classe.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                     <Button asChild size="lg" className="justify-start">
                        <Link href={createUrl('/teacher/dashboard/students')}>
                            <BookOpen className="mr-2"/> Assigner un TP
                        </Link>
                    </Button>
                    <Button asChild size="lg" className="justify-start">
                         <Link href={createUrl('/teacher/dashboard/tps-to-evaluate')}>
                            <UserCheck className="mr-2"/> Évaluer les élèves
                         </Link>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Vue d'ensemble des élèves</CardTitle>
                    <CardDescription>Progression individuelle des élèves de la classe.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="max-h-64 overflow-y-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Élève</TableHead>
                                    <TableHead className="text-right">Progression</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {studentProgressList.map(student => (
                                    <TableRow key={student.name}>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <span className="text-sm font-bold w-12">{Math.round(student.progress)}%</span>
                                                <Progress value={student.progress} className="w-24 h-2" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
