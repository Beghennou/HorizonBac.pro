

'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookCopy, FileText, Settings, ArrowRight, User, GraduationCap, Bot, ChevronsRight, MessageSquare, Award, BarChart3, DraftingCompass, ClipboardCheck, LayoutDashboard, CheckSquare, CircuitBoard, ShieldCheck, Wrench, Search, Sparkles, CheckCircle, Trophy, Printer } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getTpsByNiveau, Cursus, Niveau, NIVEAUX_BACPRO, NIVEAUX_CAP } from '@/lib/data-manager';


export default function TutorialPage() {
  
  const handlePrint = () => {
    window.print();
  };

  const renderTpTable = (niveaux: { value: Niveau, label: string }[]) => {
    return (
      <Accordion type="single" collapsible className="w-full">
        {niveaux.map(niveau => {
          // Utilisation de la fonction getTpsByNiveau pour un filtrage correct et complet
          const tpsForLevel = getTpsByNiveau(niveau.value);

          return (
            <AccordionItem value={niveau.value} key={niveau.value}>
              <AccordionTrigger className="text-xl font-headline">{niveau.label} ({tpsForLevel.length} TP)</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Titre du TP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tpsForLevel.map(tp => (
                      <TableRow key={tp.id}>
                        <TableCell className="font-medium">{tp.id}</TableCell>
                        <TableCell>
                          <Link href={`/tp-fiche/${tp.id}`} target="_blank" className="hover:underline hover:text-accent">
                            {tp.titre}
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  };

  return (
    <div className="bg-background min-h-screen text-foreground">
        <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-gradient-to-b from-card to-background shadow-2xl print-hidden">
            <div className="container flex h-20 items-center justify-between">
                 <h1 className="font-headline text-3xl font-black uppercase tracking-widest bg-gradient-to-r from-primary to-racing-orange text-transparent bg-clip-text">
                    Tutoriel HORIZON BAC. PRO.
                 </h1>
                 <div className="flex items-center gap-4">
                    <Button onClick={handlePrint} variant="outline" className="print-hidden">
                        <Printer className="mr-2"/>
                        Imprimer
                    </Button>
                    <Button asChild>
                        <Link href="/">Retour à l'accueil</Link>
                    </Button>
                 </div>
            </div>
        </header>

        <main className="container py-12 space-y-12">
            <section className="text-center">
                <h2 className="font-headline text-5xl tracking-wide text-accent">Bienvenue sur HORIZON BAC. PRO.</h2>
                <p className="text-muted-foreground text-lg mt-4 max-w-4xl mx-auto">
                    Conçue par des enseignants en maintenance des véhicules, HORIZON BAC. PRO. est votre plateforme tout-en-un pour le suivi des compétences en maintenance automobile. Le nom "HORIZON BAC. PRO." a été choisi pour évoquer la progression, l'avenir et le parcours de formation des élèves. Choisissez votre profil pour démarrer.
                </p>
            </section>

            <Tabs defaultValue="enseignant" className="w-full max-w-5xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 print-hidden">
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
                                    <AccordionTrigger className="text-xl font-headline">1. Configuration & Gestion Annuelle</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">La page <Settings className="inline h-5 w-5"/> <strong>Paramètres</strong> est le centre névralgique pour préparer votre année :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Gérer les Enseignants :</strong> Ajoutez votre profil ou celui de vos collègues. Vous pouvez également en supprimer.</li>
                                            <li><strong>Gérer les Classes :</strong> Créez ou supprimez des classes. Vous pouvez vider une classe de ses élèves pour la préparer pour une nouvelle année.</li>
                                            <li><strong>Gérer les Élèves :</strong> Vous pouvez ajouter ou supprimer des élèves manuellement, ou utiliser la fonction la plus puissante : **l'importation CSV par niveau**. Pour la rentrée, il suffit de sélectionner une classe et d'importer la liste de vos nouveaux élèves. L'application mettra à jour la classe automatiquement.</li>
                                            <li><strong>Zone de danger :</strong> Des outils sont disponibles pour vider toutes les listes d'élèves en fin d'année, afin de préparer la rentrée suivante en un clic.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-xl font-headline">2. Tableau de Bord et Progression</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Après avoir sélectionné une classe, vous arrivez sur le <LayoutDashboard className="inline h-5 w-5"/> <strong>Tableau de Bord</strong>. Il vous offre une vue d'ensemble avec :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Des statistiques clés : nombre d'élèves, TP à évaluer, et progression moyenne de la classe.</li>
                                            <li>Des accès rapides pour assigner des TP ou évaluer les élèves.</li>
                                            <li>Un aperçu de la progression de chaque élève. La sélection de la classe reste active lorsque vous naviguez entre les différents écrans.</li>
                                            <li>Pour une vue détaillée, allez dans l'onglet <CheckSquare className="inline h-5 w-5"/> <strong>Progression</strong>, qui vous montre une grille complète de l'avancement de chaque élève sur chaque TP assigné.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-xl font-headline">3. Assigner des TP</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Une fois vos élèves inscrits, rendez-vous sur la page <Users className="inline h-5 w-5"/> <strong>Assigner des TP</strong> :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Sélectionnez la classe concernée dans le menu en haut.</li>
                                            <li>Cochez les cases des élèves que vous souhaitez concerner (ou "Tout sélectionner").</li>
                                             <li>Utilisez le menu déroulant pour choisir le TP à leur affecter.</li>
                                             <li>Cliquez sur "Assigner". Le TP apparaît instantanément sur le tableau de bord de chaque élève sélectionné.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="text-xl font-headline">4. Évaluer les TP Terminés</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Quand un élève termine un TP, il apparaît dans l'onglet <ClipboardCheck className="inline h-5 w-5"/> <strong>TP à Évaluer</strong>.</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>Cliquez sur le nom d'un élève pour voir la liste des TP qu'il a soumis.</li>
                                            <li>Choisissez un TP pour accéder à la page d'évaluation.</li>
                                            <li><strong>Corrigez l'Étude Préliminaire :</strong> Consultez les réponses de l'élève et la correction. Attribuez une note sur 10.</li>
                                            <li><strong>Évaluez les compétences :</strong> Remplissez la grille d'évaluation pour les compétences ciblées (NA, EC, A, M).</li>
                                            <li><strong>Laissez un feedback :</strong> Laissez une appréciation qui sera visible par l'élève.</li>
                                            <li><strong>Note globale et sauvegarde :</strong> Donnez une note finale sur 20. Vous pouvez "Enregistrer le brouillon" ou "Finaliser et Rendre l'évaluation" pour que le statut "Évalué" apparaisse chez l'élève.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                 <AccordionItem value="item-5">
                                    <AccordionTrigger className="text-xl font-headline">5. Créer ses Propres TP</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">L'onglet <DraftingCompass className="inline h-5 w-5 text-accent"/> <strong>Concepteur TP</strong> vous donne une autonomie totale pour créer des travaux pratiques sur mesure.</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Informations Générales :</strong> Donnez un ID unique (>1000), un titre, une durée, et assignez un niveau (Seconde, Première, Terminale).</li>
                                            <li><strong>Compétences :</strong> Associez votre TP à une ou plusieurs compétences du référentiel en cochant les cases correspondantes.</li>
                                            <li><strong>Sections dynamiques :</strong> Utilisez les boutons "Ajouter" pour créer autant de champs que nécessaire pour le matériel, l'étude préliminaire (questions texte ou QCM), les étapes pratiques, les points clés et les consignes de sécurité.</li>
                                            <li><strong>Sauvegarde :</strong> Une fois le formulaire rempli, cliquez sur "Créer le Travail Pratique". Votre nouveau TP sera automatiquement disponible dans la liste d'assignation pour le niveau que vous avez sélectionné.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-6">
                                    <AccordionTrigger className="text-xl font-headline">6. Analyser la Progression</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                       <p className="mb-4">L'onglet <BarChart3 className="inline h-5 w-5"/> <strong>Analyses</strong> vous offre une vue d'ensemble de la performance de vos classes :</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li>**Progression Moyenne :** Visualisez rapidement le niveau d'avancement global de la classe sélectionnée.</li>
                                            <li>**Maîtrise des Compétences :** Identifiez en un coup d'œil les 5 compétences les mieux et les moins bien maîtrisées par le groupe, idéal pour adapter votre pédagogie.</li>
                                            <li>**Comparaison des Classes :** Comparez la progression moyenne entre les différentes classes d'un même niveau (bientôt disponible).</li>
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
                                            <li>Sur la page de sélection, choisis d'abord ton **enseignant**, puis ta **classe**.</li>
                                            <li>Ensuite, sélectionne ton **nom** dans le dernier menu qui apparaît.</li>
                                            <li>Clique sur "Valider" pour entrer dans ton tableau de bord.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-xl font-headline">2. Réaliser un TP</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Ton tableau de bord ("Mes TP") te montre tous les TP que ton enseignant t'a assignés.</p>
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
                                 <AccordionItem value="item-5">
                                    <AccordionTrigger className="text-xl font-headline">4. Consulter son Portfolio</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">L'onglet <Award className="inline h-5 w-5"/> <strong>Mon Portfolio</strong> est ton carnet de réussites personnel. C'est un document que tu peux imprimer ou enregistrer en PDF pour le montrer lors de tes recherches de stage ou d'emploi.</p>
                                        <ul className="list-disc pl-6 space-y-2">
                                            <li><strong>Badges et Récompenses :</strong> En terminant des TP et en acquérant des compétences, tu débloqueras des badges qui valorisent tes accomplissements.</li>
                                            <li><strong>Synthèse des Évaluations :</strong> Retrouve ici toutes les notes et appréciations que ton enseignant t'a laissées pour chaque TP évalué.</li>
                                            <li><strong>Compétences Acquises :</strong> Visualise toutes les compétences que tu as validées ("Acquis" ou "Maîtrisé"), classées par grands blocs professionnels.</li>
                                            <li><strong>TP Validés :</strong> La liste de tous les travaux pratiques que tu as terminés avec succès.</li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-6">
                                    <AccordionTrigger className="text-xl font-headline">5. Les Badges et Récompenses</AccordionTrigger>
                                    <AccordionContent className="text-base text-muted-foreground p-4">
                                        <p className="mb-4">Terminer des TP te permet de débloquer des badges qui prouvent tes compétences et ta persévérance. Voici la liste des badges que tu peux obtenir :</p>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-4">
                                                <CircuitBoard className="w-8 h-8 text-accent mt-1 flex-shrink-0"/>
                                                <div>
                                                    <h4 className="font-bold text-foreground">Premier Pas</h4>
                                                    <p className="text-sm">Terminer son tout premier Travail Pratique.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <ShieldCheck className="w-8 h-8 text-accent mt-1 flex-shrink-0"/>
                                                <div>
                                                    <h4 className="font-bold text-foreground">Expert Sécurité</h4>
                                                    <p className="text-sm">Terminer les TP sur le levage et la sécurité (TP 101, 102, 103).</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <Wrench className="w-8 h-8 text-accent mt-1 flex-shrink-0"/>
                                                <div>
                                                    <h4 className="font-bold text-foreground">Initié de l'Entretien</h4>
                                                    <p className="text-sm">Terminer 5 TP du bloc "Entretien périodique" (niveau Seconde).</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <Search className="w-8 h-8 text-accent mt-1 flex-shrink-0"/>
                                                <div>
                                                    <h4 className="font-bold text-foreground">Expert du Diagnostic</h4>
                                                    <p className="text-sm">Terminer 5 TP du bloc "Diagnostic" (niveau Première).</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <Settings className="w-8 h-8 text-accent mt-1 flex-shrink-0"/>
                                                <div>
                                                    <h4 className="font-bold text-foreground">Maître de la Réparation</h4>
                                                    <p className="text-sm">Terminer 5 TP du bloc "Réparation" (niveau Terminale).</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <Sparkles className="w-8 h-8 text-accent mt-1 flex-shrink-0"/>
                                                <div>
                                                    <h4 className="font-bold text-foreground">Maître de la Distribution</h4>
                                                    <p className="text-sm">Réussir le TP sur le remplacement de la distribution (TP 14).</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4">
                                                <CheckCircle className="w-8 h-8 text-accent mt-1 flex-shrink-0"/>
                                                <div>
                                                    <h4 className="font-bold text-foreground">Zéro Faute</h4>
                                                    <p className="text-sm">Réussir le TP sur le pré-contrôle technique (TP 16).</p>
                                                </div>
                                            </div>
                                             <div className="flex items-start gap-4">
                                                <Trophy className="w-8 h-8 text-accent mt-1 flex-shrink-0"/>
                                                <div>
                                                    <h4 className="font-bold text-foreground">Grand Chelem</h4>
                                                    <p className="text-sm">Terminer tous les TP disponibles pour ton niveau.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <section>
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-4xl tracking-wide text-accent">Liste des Travaux Pratiques</CardTitle>
                        <CardDescription>
                            Aperçu de tous les TP disponibles dans la plateforme, classés par cursus et niveau. Cliquez sur un titre pour ouvrir sa fiche détaillée dans une nouvelle fenêtre.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="bacpro">
                            <TabsList className="grid w-full grid-cols-2 print-hidden">
                                <TabsTrigger value="bacpro">BAC PRO</TabsTrigger>
                                <TabsTrigger value="cap">CAP</TabsTrigger>
                            </TabsList>
                            <TabsContent value="bacpro" className="mt-4">
                                {renderTpTable(NIVEAUX_BACPRO)}
                            </TabsContent>
                            <TabsContent value="cap" className="mt-4">
                                {renderTpTable(NIVEAUX_CAP)}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </section>

        </main>
    </div>
  );
}
