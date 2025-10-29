
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Database, UserCog, Contact, Trash2, Pencil } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen text-foreground py-12">
      <div className="container max-w-4xl mx-auto">
        <header className="text-center mb-12">
            <Shield className="mx-auto h-16 w-16 text-primary mb-4"/>
            <h1 className="font-headline text-5xl tracking-wide text-accent">Politique de Confidentialité</h1>
            <p className="text-muted-foreground text-lg mt-2">Dernière mise à jour : 28/07/2024</p>
        </header>

        <main className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Database className="text-accent"/>Données que nous collectons</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-2">
                    <p>Dans le cadre du fonctionnement de la plateforme "Horizon Bacpro", nous collectons les données suivantes :</p>
                    <ul className="list-disc pl-6">
                        <li><strong>Pour les enseignants :</strong> Nom et prénom, afin de vous identifier en tant que créateur de contenu et gestionnaire de classe.</li>
                        <li><strong>Pour les élèves :</strong> Nom et prénom (fournis par l'enseignant), pour vous associer à une classe et suivre votre progression.</li>
                        <li><strong>Données de progression :</strong> Statut des Travaux Pratiques (non commencé, en cours, terminé), réponses aux études préliminaires, notes et appréciations données par l'enseignant, compétences évaluées.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><UserCog className="text-accent"/>Finalité de la collecte</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-2">
                    <p>Ces données sont collectées dans l'unique et exclusif but de :</p>
                    <ul className="list-disc pl-6">
                        <li>Permettre le suivi pédagogique individualisé des élèves.</li>
                        <li>Fournir aux enseignants des outils pour gérer leurs classes et évaluer les compétences.</li>
                        <li>Permettre aux élèves de consulter leurs TP, leur progression et leur portfolio de compétences.</li>
                    </ul>
                    <p>Aucune donnée n'est utilisée à des fins commerciales, publicitaires, ou partagée avec des tiers.</p>
                </CardContent>
            </Card>
            
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Pencil className="text-accent"/>Vos Droits</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-2">
                    <p>Conformément au RGPD, vous disposez des droits suivants concernant vos données :</p>
                    <ul className="list-disc pl-6">
                        <li><strong>Droit d'accès :</strong> Vous pouvez demander à consulter les données vous concernant.</li>
                        <li><strong>Droit de rectification :</strong> Vous pouvez demander la correction de données inexactes.</li>
                        <li><strong>Droit à l'effacement (droit à l'oubli) :</strong> Les enseignants ont la possibilité de supprimer des profils élèves ou des classes via la page "Paramètres", ce qui entraîne la suppression des données associées.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-3"><Trash2 className="text-accent"/>Durée de conservation</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                    <p>Les données sont conservées sur la plateforme tant que l'enseignant ne procède pas à leur suppression. Il est de la responsabilité de l'établissement ou de l'enseignant de gérer le cycle de vie des données (par exemple, en supprimant les données des élèves en fin d'année scolaire via les outils fournis dans les "Paramètres").</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Contact className="text-accent"/>Contact</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                    <p>Pour toute question relative à la protection de vos données, veuillez contacter le responsable du traitement des données de votre établissement ou l'administrateur de cette plateforme.</p>
                </CardContent>
            </Card>

             <div className="text-center mt-12">
                 <Button asChild>
                    <Link href="/">Retour à l'accueil</Link>
                 </Button>
            </div>
        </main>
      </div>
    </div>
  );
}
