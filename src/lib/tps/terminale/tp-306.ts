
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 306,
    duree: '3h00',
    titre: 'Diagnostic d\'un Système d\'Injection (Type E33)',
    niveau: 'terminale',
    situation: 'Un client se présente à l\'atelier car le voyant d\'injection de son véhicule reste allumé en permanence. Le moteur semble manquer de puissance à l\'accélération. Vous devez prendre en charge le véhicule, effectuer un diagnostic complet du système d\'injection et identifier la cause du dysfonctionnement.',
    objectif: 'Appliquer une méthodologie de diagnostic sur un système piloté pour identifier une panne. (Compétences C2.3 Effectuer le diagnostic d’un système piloté, C3.2 Effectuer les mesures sur le véhicule)',
    materiel: ['Valise de diagnostic', 'Multimètre avec pointes de touche IP2X', 'Oscilloscope', 'Documentation technique du véhicule (RTA, schémas)', 'Fiche de diagnostic'],
    etudePrelim: [
        { type: 'text', q: 'Quelle est la première étape indispensable avant de commencer tout diagnostic sur un système électronique et pourquoi ?', r: 'La première étape est de brancher la valise de diagnostic pour lire les codes défauts (DTC) enregistrés par le calculateur. Cela donne une orientation initiale sur la nature et l\'origine de la panne.' },
        { type: 'qcm', q: 'Un code défaut "P0130 - Sonde Lambda (Ligne 1, Capteur 1) - Panne du circuit" est présent. Quelle est votre hypothèse la plus probable ?', options: ['Le moteur est en panne', 'Le catalyseur est bouché', 'La sonde lambda en amont du catalyseur a un problème électrique ou est défectueuse'], r: 'La sonde lambda en amont du catalyseur a un problème électrique ou est défectueuse' },
        { type: 'text', q: 'À quoi servent les "données figées" (freeze frame) associées à un code défaut ?', r: 'Elles enregistrent les valeurs des principaux paramètres moteur (régime, température, charge, etc.) au moment exact où le défaut est apparu, ce qui aide à comprendre les conditions de la panne.' }
    ],
    activitePratique: [
        {
            titre: 'Phase 1 : Lecture et Interprétation des Données (Diagnostic)',
            duree: '60 min',
            etapes: [
                'Prendre en charge le véhicule et mettre en place les protections.',
                'Connecter l\'outil de diagnostic et effectuer une lecture complète des codes défauts du calculateur d\'injection.',
                'Noter précisément les codes défauts et leur statut (permanent, intermittent).',
                'Analyser les données figées associées au défaut principal.',
                'Accéder aux paramètres moteur et analyser les valeurs clés à l\'arrêt et au ralenti (température, pression d\'admission, correction lambda...).'
            ]
        },
        {
            titre: 'Phase 2 : Contrôles et Mesures sur le Véhicule',
            duree: '75 min',
            etapes: [
                'À l\'aide de la documentation technique, localiser le composant incriminé par le code défaut (ex: une sonde lambda).',
                'Contrôler visuellement le connecteur et le faisceau du composant.',
                'Avec le multimètre, vérifier l\'alimentation électrique du composant (si applicable).',
                'Mesurer la résistance du composant si la procédure le demande (ex: résistance du réchauffeur de la sonde).',
                'Utiliser l\'oscilloscope pour visualiser le signal du capteur et vérifier sa conformité (forme, amplitude, fréquence).'
            ]
        },
        {
            titre: 'Phase 3 : Conclusion et Proposition d\'Intervention',
            duree: '45 min',
            etapes: [
                'Synthétiser tous les résultats obtenus (codes, paramètres, mesures).',
                'Poser un diagnostic final en identifiant avec certitude l\'élément défaillant.',
                'Proposer la procédure de remise en conformité (ex: remplacement de la sonde lambda).',
                'Effacer les codes défauts après réparation et effectuer un essai routier pour valider que le voyant ne se rallume pas et que les paramètres sont corrects.'
            ]
        }
    ],
    securiteRangement: [
        'Utiliser un mainteneur de charge pour la batterie pendant l\'utilisation de l\'outil de diagnostic.',
        'Toujours couper le contact avant de brancher ou débrancher un composant électronique.',
        'Consigner la démarche de diagnostic et les mesures sur la fiche d\'intervention.',
        'Ranger les appareils de mesure après utilisation.'
    ],
    pointsCles: [
        'La lecture des codes défauts n\'est qu\'une orientation, pas un diagnostic final.',
        'La validation du diagnostic se fait par la mesure directe sur le composant.',
        'La documentation technique est indispensable pour connaître les valeurs de référence.',
        'Une réparation n\'est validée qu\'après un essai et une nouvelle lecture des codes.'
    ],
    validationRequise: true,
};

export default tp;
