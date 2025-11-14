
import type { TP } from '@/lib/types/tp-types';

const tp: TP = {
    id: 124,
    duree: '1h00',
    titre: 'Remplacement des Bougies d\'Allumage',
    niveau: 'seconde',
    situation: 'Un moteur essence présente des ratés à l\'accélération. Dans le cadre de l\'entretien, le remplacement des bougies d\'allumage est préconisé.',
    objectif: 'Remplacer un jeu de bougies d\'allumage en respectant le couple de serrage et les bonnes pratiques. (Compétence C1.3)',
    materiel: ['Jeu de bougies neuves', 'Clé à bougie', 'Clé dynamométrique', 'Soufflette (recommandé)'],
    etudePrelim: [
        { type: 'text', q: 'Pourquoi est-il important de nettoyer le puits de bougie avant de la démonter ?', r: 'Pour éviter que des impuretés (poussière, sable) ne tombent dans le cylindre, ce qui pourrait causer des dommages importants au moteur.' },
        { type: 'text', q: 'Que risque-t-on si l\'on serre trop fort une bougie d\'allumage ?', r: 'On risque d\'endommager ou de casser le filetage dans la culasse, ce qui représente une réparation très coûteuse.' }
    ],
    activitePratique: [
        {
            titre: 'Préparation et Dépose',
            duree: '20 min',
            etapes: [
                'Identifier l\'emplacement des bougies.',
                'Nettoyer les puits de bougies à l\'aide d\'une soufflette.',
                'Débrancher les bobines ou les fils de bougie dans l\'ordre.',
                'À l\'aide de la clé à bougie, dévisser et retirer les anciennes bougies.'
            ]
        },
        {
            titre: 'Contrôle et Repose',
            duree: '25 min',
            etapes: [
                'Comparer les anciennes bougies avec les neuves pour vérifier la conformité.',
                'Vérifier l\'écartement des électrodes des bougies neuves (si spécifié).',
                'Visser les bougies neuves à la main jusqu\'au contact pour bien engager le filetage.',
                'Effectuer le serrage final au couple préconisé par le constructeur à l\'aide de la clé dynamométrique.'
            ]
        },
        {
            titre: 'Finalisation',
            duree: '15 min',
            etapes: [
                'Reconnecter les bobines ou les fils de bougie.',
                'Démarrer le moteur pour vérifier son bon fonctionnement.',
                'Ranger les outils et recycler les anciennes bougies.'
            ]
        }
    ],
    securiteRangement: [
        'Intervenir sur un moteur froid pour éviter les brûlures.',
        'Respecter impérativement le couple de serrage.',
        'S\'assurer que les connecteurs des bobines sont bien verrouillés.'
    ],
    pointsCles: [
        'Propreté du puits de bougie avant dépose.',
        'Serrage à la main pour amorcer le filetage.',
        'Serrage final au couple dynamométrique.'
    ],
    validationRequise: false,
};

export default tp;
