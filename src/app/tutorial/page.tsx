import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookCopy, FileText, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TutorialPage() {
  return (
    <div className="bg-background min-h-screen text-foreground">
        <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl">
            <div className="container flex h-20 items-center justify-between">
                 <h1 className="font-headline text-3xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text">
                    Tutoriel Racing Performance
                 </h1>
                 <Button asChild>
                    <Link href="/">Retour à la connexion</Link>
                 </Button>
            </div>
        </header>

        <main className="container py-12 space-y-12">
            <section className="text-center">
                <h2 className="font-headline text-5xl tracking-wide text-accent">Bienvenue sur TP Atelier Pro</h2>
                <p className="text-muted-foreground text-xl mt-2 max-w-3xl mx-auto">
                    Votre plateforme tout-en-un pour le suivi des compétences en maintenance automobile. Voici un guide pour vous aider à démarrer.
                </p>
            </section>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users className="text-primary"/>Gestion des Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Commencez par organiser vos élèves. Vous pouvez créer des classes, ajouter des élèves un par un ou importer une liste complète via un fichier CSV.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BookCopy className="text-accent"/>Assignation des TP</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Assignez des travaux pratiques (TP) à vos élèves en quelques clics. Sélectionnez une ou plusieurs personnes et choisissez un TP dans la liste correspondant à leur niveau.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FileText className="text-green-400"/>Suivi Individualisé</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Accédez au "Dossier de l'élève" pour une vue complète de sa progression, de ses évaluations et des TP qui lui sont assignés sur les 3 années de formation.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Settings className="text-blue-400"/>Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Personnalisez l'application en modifiant votre nom, le nom de l'établissement et gérez les données des élèves depuis la page des paramètres.</p>
                    </CardContent>
                </Card>
            </div>

            <section>
                <h3 className="font-headline text-4xl tracking-wide mb-6 text-center">Guide pas à pas</h3>
                <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
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
                            <p className="mb-4">Une fois vos élèves inscrits, rendez-vous sur la page <strong>Élèves</strong> :</p>
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
                                <li>Depuis la page "Élèves", cliquez sur un élève pour ouvrir son <strong>dossier personnel</strong>.</li>
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
                                <li>Allez sur la page principale du tableau de bord (<strong>Fiches TP</strong>).</li>
                                <li>Sélectionnez un TP dans la liste de gauche pour l'afficher.</li>
                                <li>Pour le contextualiser, sélectionnez une classe et un élève via les menus. Le nom de l'élève et de l'enseignant apparaîtront sur la fiche.</li>
                                <li>Utilisez les boutons pour envoyer la fiche par e-mail ou l'imprimer.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
        </main>
    </div>
  );
}
