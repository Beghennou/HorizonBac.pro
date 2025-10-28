
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DraftingCompass, PlusCircle, Save, Trash2, X, FilePenLine } from "lucide-react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { allBlocs, competencesParNiveau, Niveau, TP } from "@/lib/data-manager";
import { useFirebase } from '@/firebase/provider';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const etapeSchema = z.object({
    titre: z.string().min(1, "Le titre est requis."),
    duree: z.string().min(1, "La durée est requise."),
    etapes: z.array(z.string().min(1, "La description de la sous-étape est requise.")).min(1, "Au moins une sous-étape est requise."),
});

const etudePrelimSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    q: z.string().min(1, "La question est requise."),
    r: z.string().min(1, "La réponse est requise."),
  }),
  z.object({
    type: z.literal("qcm"),
    q: z.string().min(1, "La question est requise."),
    r: z.string().min(1, "La réponse est requise."),
    options: z.array(z.string().min(1, "L'option ne peut être vide.")).min(1, "Au moins une option est requise pour un QCM."),
  }),
]);

const tpFormSchema = z.object({
    id: z.number().int().positive("L'ID doit être un nombre positif."),
    titre: z.string().min(5, "Le titre doit faire au moins 5 caractères."),
    duree: z.string().min(3, "La durée est requise."),
    niveau: z.enum(['seconde', 'premiere', 'terminale']),
    situation: z.string().min(10, "La situation doit faire au moins 10 caractères."),
    objectif: z.string().min(10, "L'objectif doit faire au moins 10 caractères."),
    competences: z.array(z.string()).min(1, "Au moins une compétence doit être sélectionnée."),
    materiel: z.array(z.object({ value: z.string().min(1, "Le nom du matériel est requis.") })).min(1, "Au moins un matériel est requis."),
    etudePrelim: z.array(etudePrelimSchema),
    activitePratique: z.array(etapeSchema).min(1, "Au moins une étape pratique est requise."),
    pointsCles: z.array(z.object({ value: z.string().min(1, "Le point clé est requis.") })).min(1, "Au moins un point clé est requis."),
    securiteRangement: z.array(z.object({ value: z.string().min(1, "La consigne de sécurité est requise.") })).min(1, "Au moins une consigne de sécurité est requise."),
});

type TpFormValues = z.infer<typeof tpFormSchema>;

export default function TPDesignerPage() {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { addTp, teacherName, tps } = useFirebase(); 
    const [isEditMode, setIsEditMode] = useState(false);
    
    const form = useForm<TpFormValues>({
        resolver: zodResolver(tpFormSchema),
        defaultValues: {
            id: Math.floor(1000 + Math.random() * 9000),
            titre: "",
            duree: "2h00",
            niveau: "seconde",
            situation: "",
            objectif: "",
            competences: [],
            materiel: [{ value: "" }],
            etudePrelim: [],
            activitePratique: [{ titre: "", duree: "30 min", etapes: [""] }],
            pointsCles: [{ value: "" }],
            securiteRangement: [{ value: "" }],
        },
    });

    useEffect(() => {
        const editTpId = searchParams.get('editTp');
        if (editTpId && tps) {
            const tpToEdit = tps[parseInt(editTpId, 10)];
            if (tpToEdit) {
                setIsEditMode(true);
                const competences = tpToEdit.objectif.match(/C\d\.\d/g) || [];
                const objectifWithoutCompetences = tpToEdit.objectif.split(' (Compétence')[0];

                form.reset({
                    ...tpToEdit,
                    etudePrelim: tpToEdit.etudePrelim.map(e => ({
                        ...e,
                        options: e.type === 'qcm' ? e.options : undefined
                    })),
                    materiel: tpToEdit.materiel.map(m => ({ value: m })),
                    pointsCles: tpToEdit.pointsCles.map(pc => ({ value: pc })),
                    securiteRangement: tpToEdit.securiteRangement.map(sr => ({ value: sr })),
                    objectif: objectifWithoutCompetences,
                    competences,
                });
            }
        }
    }, [searchParams, tps, form]);

    const { fields: materielFields, append: appendMateriel, remove: removeMateriel } = useFieldArray({ control: form.control, name: "materiel" });
    const { fields: etudePrelimFields, append: appendEtudePrelim, remove: removeEtudePrelim } = useFieldArray({ control: form.control, name: "etudePrelim" });
    const { fields: activitePratiqueFields, append: appendActivitePratique, remove: removeActivitePratique } = useFieldArray({ control: form.control, name: "activitePratique" });
    const { fields: pointsClesFields, append: appendPointsCles, remove: removePointsCles } = useFieldArray({ control: form.control, name: "pointsCles" });
    const { fields: securiteRangementFields, append: appendSecuriteRangement, remove: removeSecuriteRangement } = useFieldArray({ control: form.control, name: "securiteRangement" });

    const selectedNiveau = form.watch('niveau');

    const onSubmit = (data: TpFormValues) => {
        const fullObjectif = `${data.objectif} (Compétences ${data.competences.join(', ')})`;
        
        const finalData: TP = {
          ...data,
          objectif: fullObjectif,
          materiel: data.materiel.map(item => item.value),
          pointsCles: data.pointsCles.map(item => item.value),
          securiteRangement: data.securiteRangement.map(item => item.value),
          etudePrelim: data.etudePrelim.map(e => {
            if (e.type === 'qcm') {
              return { type: 'qcm', q: e.q, r: e.r, options: e.options };
            }
            return { type: 'text', q: e.q, r: e.r };
          }),
          author: teacherName,
          creationDate: new Date().toISOString(),
        };
        
        addTp(finalData);

        toast({
            title: isEditMode ? "TP mis à jour !" : "TP Créé avec succès !",
            description: `Le TP "${data.titre}" a été sauvegardé.`,
        });

        if (!isEditMode) {
          form.reset();
           form.reset({
            id: Math.floor(1000 + Math.random() * 9000),
            titre: "",
            duree: "2h00",
            niveau: "seconde",
            situation: "",
            objectif: "",
            competences: [],
            materiel: [{ value: "" }],
            etudePrelim: [],
            activitePratique: [{ titre: "", duree: "30 min", etapes: [""] }],
            pointsCles: [{ value: "" }],
            securiteRangement: [{ value: "" }],
        });
        } else {
            router.push('/teacher/dashboard/tp-designer');
        }
    };

    return (
        <div className="space-y-8">
            <div>
                 <h1 className="font-headline text-5xl tracking-wide flex items-center gap-4">
                    {isEditMode ? <FilePenLine className="w-12 h-12 text-primary" /> : <DraftingCompass className="w-12 h-12 text-primary" />}
                    {isEditMode ? 'Éditeur de TP' : 'Concepteur de modules TP'}
                </h1>
                <p className="text-muted-foreground mt-2">
                    {isEditMode ? 'Modifiez les détails de ce travail pratique.' : 'Créez et partagez des modules TP personnalisés avec des simulations de course intégrées.'}
                </p>
            </div>
            
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DraftingCompass />
                            Informations Générales
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           <FormField control={form.control} name="id" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID du TP</FormLabel>
                                    <FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} readOnly={isEditMode} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                           )} />
                           <FormField control={form.control} name="titre" render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Titre du TP</FormLabel>
                                    <FormControl><Input placeholder="ex: Contrôle du circuit de charge" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                           )} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField control={form.control} name="duree" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Durée estimée</FormLabel>
                                    <FormControl><Input placeholder="ex: 2h30" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                           )} />
                           <FormField control={form.control} name="niveau" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Niveau</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Sélectionnez un niveau" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="seconde">Seconde</SelectItem>
                                            <SelectItem value="premiere">Première</SelectItem>
                                            <SelectItem value="terminale">Terminale</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                           )} />
                        </div>
                        <FormField control={form.control} name="situation" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Situation Professionnelle</FormLabel>
                                <FormControl><Textarea placeholder="Décrivez le scénario de départ..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="objectif" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Objectif Pédagogique</FormLabel>
                                <FormControl><Textarea placeholder="Décrivez ce que l'élève doit être capable de faire à la fin..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="competences" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Compétences Associées</FormLabel>
                                {Object.entries(competencesParNiveau[selectedNiveau] || {}).map(([blocKey, bloc]) => (
                                    <div key={blocKey}>
                                        <h4 className="font-semibold mt-2">{bloc.title}</h4>
                                        {Object.entries(bloc.items).map(([competenceId, description]) => (
                                            <FormField key={competenceId} control={form.control} name="competences" render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(competenceId)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, competenceId])
                                                                    : field.onChange(field.value?.filter((value) => value !== competenceId))
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">{competenceId}: {description}</FormLabel>
                                                </FormItem>
                                            )} />
                                        ))}
                                    </div>
                                ))}
                                <FormMessage />
                            </FormItem>
                        )} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Matériel Requis</span>
                            <Button type="button" variant="outline" size="sm" onClick={() => appendMateriel({ value: "" })}><PlusCircle className="mr-2"/>Ajouter</Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {materielFields.map((field, index) => (
                             <FormField key={field.id} control={form.control} name={`materiel.${index}.value`} render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center gap-2">
                                        <FormControl><Input {...field} /></FormControl>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeMateriel(index)}><Trash2 /></Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                             )} />
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Étude Préliminaire</span>
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" size="sm" onClick={() => appendEtudePrelim({ type: 'text', q: '', r: ''})}><PlusCircle className="mr-2"/>Question Texte</Button>
                                <Button type="button" variant="outline" size="sm" onClick={() => appendEtudePrelim({ type: 'qcm', q: '', r: '', options: [''] })}><PlusCircle className="mr-2"/>Question QCM</Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {etudePrelimFields.map((field, index) => (
                            <div key={field.id} className="p-4 border rounded-lg bg-card/50 relative">
                                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeEtudePrelim(index)}><X/></Button>
                                <FormField control={form.control} name={`etudePrelim.${index}.q`} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Question {index + 1}</FormLabel>
                                        <FormControl><Textarea {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                {field.type === 'qcm' && (
                                     <div className="mt-2 space-y-2">
                                        <Label>Options de réponse</Label>
                                        <Controller control={form.control} name={`etudePrelim.${index}.options`} render={({ field: optionsField }) => (
                                            <>
                                                {optionsField.value?.map((opt, optIndex) => (
                                                    <div key={optIndex} className="flex items-center gap-2">
                                                        <Input defaultValue={opt} onChange={e => {
                                                            const newOptions = [...optionsField.value!];
                                                            newOptions[optIndex] = e.target.value;
                                                            optionsField.onChange(newOptions);
                                                        }} />
                                                         <Button type="button" size="icon" variant="ghost" onClick={() => {
                                                             const newOptions = [...optionsField.value!];
                                                             newOptions.splice(optIndex, 1);
                                                             optionsField.onChange(newOptions);
                                                         }}><Trash2 className="text-destructive"/></Button>
                                                    </div>
                                                ))}
                                                <Button type="button" variant="ghost" size="sm" onClick={() => optionsField.onChange([...(optionsField.value || []), ''])}>Ajouter une option</Button>
                                            </>
                                        )} />
                                     </div>
                                )}
                                <FormField control={form.control} name={`etudePrelim.${index}.r`} render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>Réponse Correcte</FormLabel>
                                        <FormControl><Input {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Activité Pratique</span>
                            <Button type="button" variant="outline" size="sm" onClick={() => appendActivitePratique({ titre: "", duree: "30 min", etapes: [""] })}><PlusCircle className="mr-2"/>Ajouter une étape</Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {activitePratiqueFields.map((field, index) => (
                            <div key={field.id} className="p-4 border rounded-lg bg-card/50 relative">
                                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => removeActivitePratique(index)}><X/></Button>
                                <h4 className="font-bold mb-2">Étape {index + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                     <FormField control={form.control} name={`activitePratique.${index}.titre`} render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Titre de l'étape</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                     <FormField control={form.control} name={`activitePratique.${index}.duree`} render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Durée</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <div className="mt-2 space-y-2">
                                    <Label>Sous-étapes</Label>
                                    <Controller control={form.control} name={`activitePratique.${index}.etapes`} render={({ field: subStepsField }) => (
                                        <>
                                            {subStepsField.value.map((subStep, subIndex) => (
                                                 <div key={subIndex} className="flex items-center gap-2">
                                                    <Input defaultValue={subStep} onChange={e => {
                                                        const newSubSteps = [...subStepsField.value];
                                                        newSubSteps[subIndex] = e.target.value;
                                                        subStepsField.onChange(newSubSteps);
                                                    }} />
                                                     <Button type="button" size="icon" variant="ghost" onClick={() => {
                                                        const newSubSteps = [...subStepsField.value];
                                                        newSubSteps.splice(subIndex, 1);
                                                        subStepsField.onChange(newSubSteps);
                                                     }}><Trash2 className="text-destructive"/></Button>
                                                </div>
                                            ))}
                                            <Button type="button" variant="ghost" size="sm" onClick={() => subStepsField.onChange([...subStepsField.value, ''])}>Ajouter une sous-étape</Button>
                                        </>
                                    )} />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Points Clés</span>
                                <Button type="button" variant="outline" size="sm" onClick={() => appendPointsCles({ value: "" })}><PlusCircle className="mr-2"/>Ajouter</Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {pointsClesFields.map((field, index) => (
                                <FormField key={field.id} control={form.control} name={`pointsCles.${index}.value`} render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center gap-2">
                                            <FormControl><Input {...field} /></FormControl>
                                            <Button type="button" variant="destructive" size="icon" onClick={() => removePointsCles(index)}><Trash2 /></Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            ))}
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Sécurité & Rangement</span>
                                <Button type="button" variant="outline" size="sm" onClick={() => appendSecuriteRangement({ value: "" })}><PlusCircle className="mr-2"/>Ajouter</Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {securiteRangementFields.map((field, index) => (
                                <FormField key={field.id} control={form.control} name={`securiteRangement.${index}.value`} render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center gap-2">
                                            <FormControl><Input {...field} /></FormControl>
                                            <Button type="button" variant="destructive" size="icon" onClick={() => removeSecuriteRangement(index)}><Trash2 /></Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            ))}
                        </CardContent>
                    </Card>
                 </div>

                <div className="flex justify-end">
                    <Button type="submit" size="lg">
                        <Save className="mr-2"/>
                        {isEditMode ? "Mettre à jour le TP" : "Créer le Travail Pratique"}
                    </Button>
                </div>
            </form>
            </Form>
        </div>
    );
}

    
