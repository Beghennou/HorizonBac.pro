import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookCopy, FileText, Settings, ArrowRight, User, GraduationCap, Bot, ChevronsRight, MessageSquare, Award, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TutorialPage() {
  return (
    <div className="bg-background min-h-screen text-foreground">
        <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl">
            <div className="container flex h-20 items-center justify-between">
                 <h1 className="font-headline text-3xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text">
                    Tutoriel Horizon Bacpro
                 </h1>
                 <Button asChild>
                    <Link href="/">Retour à l'accueil</Link>
                 </Button>
            </div>
        </header>

        <main className="container py-12 space-y-12">
            <section className="text-center">
                <h2 className="font-headline text-5xl tracking-wide text-accent">Bienvenue sur Horizon Bacpro</h2>
                <p className="text-muted-foreground text-lg mt-4 max-w-4xl mx-auto">
                    Conçue par des enseignants en maintenance des véhicules, Horizon Bacpro est votre plateforme tout-en-un pour le suivi des compétences en maintenance automobile. Le nom "Horizon Bacpro" a été choisi pour évoquer la progression, l'avenir et le parcours de formation des élèves. Choisissez votre profil pour démarrer.
                </p>
            </section>

            <Tabs defaultValue="enseignant" className="w-full max-w-5xl mx-auto">
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
                                 <AccordionItem value="item-5">
                                    <AccordionTrigger className="text-xl font-headline">2. Mise à Jour Annuelle des Classes</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Pour préparer la rentrée, la page <strong>Paramètres</strong> contient une section "Mise à Jour Annuelle des Classes" :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Importez vos listes :</strong> Pour chaque niveau (Seconde, Première, Terminale), importez votre nouvelle liste de classe au format CSV.</li>
                                            <li><strong>Conservation des données :</strong> Si un élève importé existe déjà, il est simplement déplacé dans sa nouvelle classe. Toutes ses évaluations et sa progression sont conservées.</li>
                                            <li><strong>Création automatique :</strong> Un nouvel élève dans votre fichier CSV sera automatiquement créé dans l'application.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-xl font-headline">3. Assignation des Travaux Pratiques (TP)</AccordionTrigger>
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
                                    <AccordionTrigger className="text-xl font-headline">4. Évaluation et Suivi</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Le cœur du suivi se fait dans le <strong>dossier de l'élève</strong>, accessible en cliquant sur sa carte depuis la page "Suivi des classes".</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Sélectionnez un TP :</strong> Choisissez un TP assigné pour afficher la grille d'évaluation et les réponses de l'élève.</li>
                                            <li><strong>Corrigez l'Étude Préliminaire :</strong> Si le TP en contient une, vous verrez les réponses de l'élève. Cliquez sur "Auto-correction" pour obtenir une note automatique. Vous pouvez ensuite **modifier cette note** si vous le souhaitez.</li>
                                            <li><strong>Laissez un feedback :</strong> Vous verrez le commentaire de l'élève sur le TP et vous pourrez lui répondre dans le champ "Feedback de l'enseignant". Ce retour sera visible par l'élève.</li>
                                            <li><strong>Évaluez les compétences :</strong> Remplissez la grille d'évaluation pour les compétences (NA, EC, A, M). L'expérience (XP) de l'élève se mettra à jour.</li>
                                            <li><strong>Enregistrez :</strong> Cliquez sur "Enregistrer l'évaluation" pour sauvegarder la note, les feedbacks et les compétences. Le badge "Évalué" apparaîtra alors chez l'élève.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="item-4">
                                    <AccordionTrigger className="text-xl font-headline">5. Visualisation des Fiches TP</AccordionTrigger>
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
                                <AccordionItem value="item-6">
                                    <AccordionTrigger className="text-xl font-headline">6. Analyser la Progression</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                       <p className="mb-4">L'onglet <strong>Analyses</strong> vous offre une vue d'ensemble de la performance de vos classes :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Progression Moyenne :</strong> Visualisez rapidement le niveau d'avancement global de la classe sélectionnée.</li>
                                            <li><strong>Maîtrise des Compétences :</strong> Identifiez en un coup d'œil les 5 compétences les mieux et les moins bien maîtrisées par le groupe, idéal pour adapter votre pédagogie.</li>
                                            <li><strong>Comparaison des Classes :</strong> Comparez la progression moyenne entre les différentes classes d'un même niveau (Seconde, Première, etc.).</li>
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
                            <CardDescription>Découvrez comment accéder à tes TP et utiliser les outils à ta disposition.</CardDescription>
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
                                    <AccordionTrigger className="text-xl font-headline">2. Réaliser un TP</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Ton tableau de bord te montre tous les TP que ton enseignant t'a assignés.</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Chaque TP a un statut : "Non commencé", "En cours" ou "Terminé". Le badge **"Évalué"** apparaîtra une fois que ton professeur aura corrigé ton travail.</li>
                                            <li>Clique sur "Commencer le TP". Le statut passe à "En cours".</li>
                                            <li>Si le TP a une **Étude Préliminaire**, réponds aux questions (QCM ou texte) directement sur la page. Tes réponses sont sauvegardées automatiquement.</li>
                                            <li>Laisse un commentaire sur le TP dans la section <MessageSquare className="inline h-4 w-4" /> **Commentaire sur le TP** pour partager tes impressions ou difficultés avec ton enseignant.</li>
                                            <li>Une fois le travail pratique terminé, clique sur "Terminer le TP". Ton professeur sera notifié.</li>
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
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="text-xl font-headline">4. Consulter son Feedback</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Une fois que ton enseignant a évalué ton TP :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Le badge **"Évalué"** apparaîtra sur la carte du TP.</li>
                                            <li>Retourne sur la page du TP pour lire le **feedback personnalisé** que ton enseignant t'a laissé. C'est un excellent moyen de progresser !</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger className="text-xl font-headline">5. Gagner des Badges et des Récompenses</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Ta progression est récompensée ! En terminant des TP et en acquérant des compétences, tu débloqueras des badges pour valoriser tes réussites.</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Comment ça marche ?</strong> Chaque badge a des critères précis. Par exemple, terminer ton premier TP, maîtriser tous les TP de sécurité, ou devenir un expert du diagnostic.</li>
                                            <li><strong>Quelques exemples de badges :</strong> "Premier Pas", "Expert Sécurité", "Expert du Diagnostic", "Maître de la Distribution", et bien d'autres.</li>
                                            <li><strong>Où les voir ?</strong> Tous les badges que tu as gagnés sont affichés dans ton <Link href="/student/portfolio" className="text-accent underline">Portfolio</Link>, dans la section <Award className="inline h-4 w-4"/> "Badges et Récompenses". C'est un excellent moyen de voir tes accomplissements !</li>
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
