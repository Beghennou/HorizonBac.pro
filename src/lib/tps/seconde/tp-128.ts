
import type { TP } from '@/lib/types/tp-types';

const tp: TP = {
    id: 128,
    duree: '1h30',
    titre: 'Réglage du Jeu aux Soupapes (Moteur TU)',
    niveau: 'seconde',
    situation: 'Un moteur essence de type TU (fréquent sur les véhicules PSA) présente un bruit de cliquetis caractéristique à froid. Un réglage du jeu aux soupapes est nécessaire.',
    objectif: 'Mesurer et régler le jeu de fonctionnement des soupapes à l\'aide d\'un jeu de cales. (Compétence C1.3)',
    materiel: ['Jeu de cales d\'épaisseur', 'Clé polygonale et tournevis plat', 'Documentation technique (valeurs de jeu)', 'Clé pour tourner le vilebrequin'],
    etudePrelim: [
        { type: 'text', q: 'Pourquoi un jeu aux soupapes est-il nécessaire ?', r: 'Pour compenser la dilatation des matériaux (queue de soupape, culbuteur) lorsque le moteur chauffe. Sans jeu, la soupape ne fermerait plus correctement à chaud.' },
        { type: 'text', q: 'Quel est le symptôme d\'un jeu trop important ? Et d\'un jeu insuffisant (ou nul) ?', r: 'Jeu trop grand : bruit de cliquetis, surtout à froid. Jeu insuffisant : perte de compression à chaud, risque de "griller" la soupape car elle ne se refroidit plus sur son siège.' },
        { type: 'text', q: 'Qu\'est-ce que la méthode de la "bascule" pour le réglage des soupapes ?', r: 'On met les soupapes du cylindre N°1 en bascule (fin échappement, début admission) pour régler celles du cylindre opposé (N°4 sur un 4 cylindres), et vice-versa.' }
    ],
    activitePratique: [
        {
            titre: 'Préparation',
            duree: '20 min',
            etapes: [
                'S\'assurer que le moteur est complètement froid.',
                'Déposer le couvre-culasse.',
                'Identifier les soupapes d\'admission et d\'échappement.'
            ]
        },
        {
            titre: 'Mesure et Réglage (Méthode en bascule)',
            duree: '50 min',
            etapes: [
                'Tourner le moteur pour mettre les soupapes du cylindre N°4 en bascule.',
                'Mesurer le jeu sur les deux soupapes du cylindre N°1 avec le jeu de cales.',
                'Si le jeu n\'est pas correct, desserrer le contre-écrou et ajuster la vis de réglage jusqu\'à obtenir le "léchage gras" de la cale.',
                'Bloquer la vis et resserrer le contre-écrou, puis re-vérifier le jeu.',
                'Tourner le moteur pour mettre le cylindre N°1 en bascule et régler le N°4.',
                'Répéter l\'opération pour les cylindres 2 et 3.'
            ]
        },
        {
            titre: 'Finalisation',
            duree: '20 min',
            etapes: [
                'Remonter le couvre-culasse avec un joint neuf si nécessaire.',
                'Démarrer le moteur et vérifier l\'absence de cliquetis anormal.',
                'Contrôler l\'absence de fuite d\'huile au couvre-culasse.'
            ]
        }
    ],
    securiteRangement: [
        'Intervenir uniquement sur moteur froid.',
        'Faire tourner le moteur dans son sens de rotation normal.',
        'La cale doit coulisser "gras", sans forcer ni être trop libre.'
    ],
    pointsCles: [
        'Réglage à froid.',
        'Méthode de la bascule pour un réglage rapide.',
        'Le "léchage gras" de la cale.'
    ],
    validationRequise: false,
};

export default tp;
