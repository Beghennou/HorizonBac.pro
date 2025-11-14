
import type { TP } from '@/lib/types/tp-types';

const tp: TP = {
    id: 120,
    duree: '2h00',
    titre: 'Remplacement d\'un Triangle de Suspension',
    niveau: 'seconde',
    situation: 'Un véhicule a heurté un trottoir et présente un défaut de tenue de route. L\'inspection visuelle révèle un triangle de suspension avant tordu. Le remplacement est nécessaire.',
    objectif: 'Remplacer un triangle de suspension en respectant les couples de serrage et les procédures de sécurité, puis valider la nécessité d\'un contrôle de géométrie. (Compétences C1.2, C1.3, C1.1)',
    materiel: ['Triangle de suspension neuf', 'Clé dynamométrique', 'Douilles et clés plates', 'Pont élévateur ou cric et chandelles', 'Levier ou barre de force', 'Extracteur de rotule'],
    etudePrelim: [
        { type: 'text', q: 'Quels sont les trois points de fixation d\'un triangle de suspension type MacPherson ?', r: '1. La rotule de suspension sur le porte-fusée. 2. La fixation avant sur le berceau (silentbloc). 3. La fixation arrière sur le berceau (silentbloc).' },
        { type: 'text', q: 'Pourquoi le serrage final des vis des silentblocs doit-il se faire impérativement véhicule au sol (ou roues pendantes en position de hauteur de route) ?', r: 'Pour serrer les silentblocs dans leur position de travail normale et éviter de leur appliquer une torsion permanente, ce qui entraînerait leur usure prématurée.' },
        { type: 'qcm', q: 'Après le remplacement d\'un triangle de suspension, quelle opération est obligatoire pour garantir la sécurité et le bon comportement du véhicule ?', options: ['Faire la vidange de la boîte de vitesses', 'Contrôler et régler la géométrie du train roulant', 'Nettoyer le moteur'], r: 'Contrôler et régler la géométrie du train roulant' }
    ],
    activitePratique: [
        {
            titre: 'Dépose du Triangle Usagé',
            duree: '45 min',
            etapes: [
                'Lever et sécuriser le véhicule, puis déposer la roue.',
                'Désaccoupler la rotule de suspension du porte-fusée à l\'aide d\'un extracteur.',
                'Desserrer et retirer les vis de fixation des deux silentblocs sur le berceau moteur.',
                'Déposer le triangle de suspension.'
            ]
        },
        {
            titre: 'Montage du Triangle Neuf',
            duree: '45 min',
            etapes: [
                'Comparer la pièce neuve avec l\'ancienne pour vérifier la conformité.',
                'Positionner le nouveau triangle.',
                'Engager les vis des silentblocs et la rotule de suspension sans les bloquer.',
                'Effectuer un pré-serrage des fixations.'
            ]
        },
        {
            titre: 'Serrage au Couple et Finalisation',
            duree: '30 min',
            etapes: [
                'Descendre le véhicule pour que les roues soient en appui au sol (ou simuler la hauteur de route sur le pont).',
                'Effectuer le serrage final de toutes les vis et écrous aux couples préconisés par le constructeur.',
                'Remonter la roue et la serrer au couple.',
                'Noter sur l\'ordre de réparation qu\'un contrôle de géométrie est indispensable.'
            ]
        }
    ],
    securiteRangement: [
        'Toujours utiliser un extracteur de rotule adapté pour ne pas endommager les pièces.',
        'Respecter scrupuleusement les couples de serrage.',
        'Ne jamais travailler sous un véhicule non sécurisé par des chandelles.',
        'Informer le client que le véhicule n\'est pas apte à rouler sur longue distance sans un contrôle de géométrie.'
    ],
    pointsCles: [
        'Le serrage final des silentblocs se fait roues au sol.',
        'Un contrôle de géométrie est obligatoire après l\'intervention.',
        'Respect des couples de serrage pour tous les éléments de liaison au sol.'
    ],
    validationRequise: false,
};

export default tp;
