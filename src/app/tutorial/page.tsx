import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookCopy, FileText, Settings, ArrowRight, User, GraduationCap, Bot } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TutorialPage() {
  return (
    <div className="bg-background min-h-screen text-foreground">
        <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl">
            <div className="container flex h-20 items-center justify-between">
                 <h1 className="font-headline text-3xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text">
                    Tutoriel TP Atelier Pro
                 </h1>
                 <Button asChild>
                    <Link href="/">Retour à l'accueil</Link>
                 </Button>
            </div>
        </header>

        <main className="container py-12 space-y-12">
            <section className="text-center">
                <h2 className="font-headline text-5xl tracking-wide text-accent">Bienvenue sur TP Atelier Pro</h2>
                <p className="text-muted-foreground text-xl mt-2 max-w-3xl mx-auto">
                    Votre plateforme tout-en-un pour le suivi des compétences en maintenance automobile. Choisissez votre profil pour démarrer.
                </p>
            </section>

            <Tabs defaultValue="enseignant" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="enseignant" className="font-headline text-lg uppercase tracking-wider"><Users className="mr-2"/>Espace Enseignant</TabsTrigger>
                    <TabsTrigger value="eleve" className="font-headline text-lg uppercase tracking-wider"><GraduationCap className="mr-2"/>Espace Élève</TabsTrigger>
                </TabsList>
                
                <TabsContent value="enseignant" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Guide pour l'Enseignant</CardTitle>
                            <CardDescription>Apprenez à gérer vos classes, assigner des travaux et suivre la progression de vos élèves.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-xl font-headline">1. Configuration de l'environnement</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Avant de commencer, allez dans la page <strong>Paramètres</strong> :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Ajoutez vos classes et élèves :</strong> Vous pouvez ajouter des élèves manuellement ou utiliser la fonction d'importation CSV pour peupler rapidement vos classes.</li>
                                            <li><strong>Personnalisez votre nom :</strong> Mettez à jour votre nom d'enseignant pour qu'il apparaisse sur les fiches TP.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-xl font-headline">2. Assignation des Travaux Pratiques (TP)</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Une fois vos élèves inscrits, rendez-vous sur la page <strong>Suivi des Classes</strong> :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Sélectionnez la bonne classe et le bon niveau (Seconde, Première, Terminale).</li>
                                            <li>Cochez la case sur la carte des élèves concernés.</li>
                                            <li>Utilisez le menu déroulant "Assigner un TP" pour choisir le travail à affecter. Le TP est maintenant lié à l'élève.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-xl font-headline">3. Évaluation et Suivi</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Le cœur du suivi se fait dans le dossier de l'élève :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Depuis la page "Suivi des Classes", cliquez sur un élève pour ouvrir son <strong>dossier personnel</strong>.</li>
                                            <li>Dans son dossier, sélectionnez un TP assigné pour afficher la grille d'évaluation correspondante.</li>
                                            <li>Évaluez chaque compétence (NA, EC, A, M). Les points d'expérience (XP) et la barre de progression se mettront à jour automatiquement.</li>
                                            <li>Sauvegardez l'évaluation pour conserver la progression.</li>
                                             <li>Vous pouvez envoyer ou renvoyer la fiche TP par e-mail directement depuis cette page.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="item-4">
                                    <AccordionTrigger className="text-xl font-headline">4. Visualisation des Fiches TP</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                       <p className="mb-4">Pour consulter, imprimer ou envoyer une fiche TP vierge :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Allez sur la page principale du tableau de bord (via l'onglet "Fiches TP").</li>
                                            <li>Sélectionnez un TP dans la liste de gauche pour l'afficher.</li>
                                            <li>Pour le contextualiser, sélectionnez une classe et un élève via les menus. Le nom de l'élève et de l'enseignant apparaîtront sur la fiche.</li>
                                            <li>Utilisez les boutons pour envoyer la fiche par e-mail ou l'imprimer.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="eleve" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Guide pour l'Élève</CardTitle>
                            <CardDescription>Découvrez comment accéder à vos TP et utiliser les outils à votre disposition.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-xl font-headline">1. Se connecter</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Pour accéder à ton espace personnel :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Depuis la page d'accueil, clique sur "Espace Élève".</li>
                                            <li>Sur la page de sélection, choisis d'abord ta **classe** dans le premier menu déroulant.</li>
                                            <li>Ensuite, sélectionne ton **nom** dans le second menu qui apparaît.</li>
                                            <li>Clique sur "Accéder à mes TP" pour entrer dans ton tableau de bord.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-xl font-headline">2. Consulter ses TP</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Ton tableau de bord te montre tous les TP que ton enseignant t'a assignés.</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Chaque TP a un statut : "Non commencé", "En cours" ou "Terminé".</li>
                                            <li>Clique sur "Commencer le TP" pour ouvrir la fiche de travail.</li>
                                            <li>Tu pourras voir tous les détails : objectif, matériel, étapes à suivre...</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-xl font-headline">3. Utiliser l'Assistant IA</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Si tu es bloqué pendant un TP, l'assistant IA est là pour t'aider.</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Sur la page du TP, tu trouveras un encadré "Assistant Pédagogique IA".</li>
                                            <li>Pose ta question dans la zone de texte. Par exemple : "Je ne comprends pas l'étape 3".</li>
                                            <li>L'assistant te donnera un indice ou te posera une question pour te guider, **sans jamais donner la réponse directe**.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    </div>
  );
}
