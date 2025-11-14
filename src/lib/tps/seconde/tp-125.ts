
import type { TP } from '@/lib/types/tp-types';

const tp: TP = {
    id: 125,
    duree: '1h30',
    titre: 'Remplacement des Bougies de Préchauffage',
    niveau: 'seconde',
    situation: 'Un véhicule diesel démarre mal à froid et émet de la fumée blanche pendant les premières secondes. Le diagnostic indique une ou plusieurs bougies de préchauffage défectueuses.',
    objectif: 'Remplacer les bougies de préchauffage en minimisant le risque de casse. (Compétence C1.3)',
    materiel: ['Jeu de bougies neuves', 'Clé à bougie longue et fine', 'Clé dynamométrique', 'Graisse au cuivre ou céramique'],
    etudePrelim: [
        { type: 'text', q: 'Quel est le rôle principal des bougies de préchauffage ?', r: 'Elles chauffent l\'air dans la chambre de combustion pour faciliter l\'auto-inflammation du gazole lors des démarrages à froid.' },
        { type: 'text', q: 'Quel est le principal risque lors du démontage d\'une bougie de préchauffage et comment le réduire ?', r: 'Le risque est de la casser dans la culasse. Pour le réduire, il faut intervenir sur un moteur tiède et appliquer le couple de desserrage très progressivement.' }
    ],
    activitePratique: [
        {
            titre: 'Préparation et Test',
            duree: '30 min',
            etapes: [
                'Faire tourner le moteur pour qu\'il soit tiède.',
                'Débrancher le connecteur de chaque bougie.',
                'Tester la résistance de chaque bougie avec un multimètre (une bougie HS a une résistance infinie).'
            ]
        },
        {
            titre: 'Dépose et Remplacement',
            duree: '45 min',
            etapes: [
                'Nettoyer le puits de bougie.',
                'Dévisser très prudemment les bougies défectueuses.',
                'Appliquer une fine couche de graisse haute température sur le filetage de la bougie neuve.',
                'Visser la bougie neuve à la main, puis la serrer au couple très faible préconisé (environ 10-15 Nm).'
            ]
        },
        {
            titre: 'Finalisation',
            duree: '15 min',
            etapes: [
                'Reconnecter les alimentations.',
                'Mettre le contact plusieurs fois pour tester le cycle de préchauffage.',
                'Démarrer le moteur et vérifier l\'absence de fumée anormale.'
            ]
        }
    ],
    securiteRangement: [
        'Ne jamais forcer lors du démontage ou du montage.',
        'Respecter le couple de serrage très faible pour ne pas endommager la bougie ou la culasse.',
        'Utiliser une clé dynamométrique de faible capacité pour plus de précision.'
    ],
    pointsCles: [
        'Intervention sur moteur tiède.',
        'Application de graisse sur le filetage.',
        'Respect du couple de serrage très faible.'
    ],
    validationRequise: false,
};

export default tp;
