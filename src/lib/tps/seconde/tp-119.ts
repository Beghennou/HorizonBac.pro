import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 119,
    duree: '1h30',
    titre: 'Remplacement des Amortisseurs Arrière',
    niveau: 'seconde',
    situation: 'Le véhicule du client présente une mauvaise tenue de route à l\'arrière et talonne facilement sur les ralentisseurs. Le contrôle visuel montre une fuite d\'huile sur l\'un des amortisseurs arrière.',
    objectif: 'Remplacer une paire d\'amortisseurs arrière classiques (dissociés du ressort) en respectant les couples de serrage. (Compétences C1.3, C1.1)',
    materiel: ['Amortisseurs neufs', 'Clé dynamométrique', 'Douilles et clés plates', 'Cric et chandelles'],
    etudePrelim: [
        { type: 'text', q: 'Sur un système où l\'amortisseur est séparé du ressort, est-il nécessaire d\'utiliser un compresseur de ressort pour remplacer l\'amortisseur ? Pourquoi ?', r: 'Non, ce n\'est pas nécessaire. L\'amortisseur ne soutient pas le ressort. Il suffit de détendre le train arrière pour pouvoir le retirer sans contrainte.' },
        { type: 'text', q: 'Pourquoi est-il impératif de remplacer les amortisseurs par paire (gauche et droit en même temps) ?', r: 'Pour garantir un comportement symétrique et équilibré du véhicule. Un amortisseur neuf et un usé sur le même essieu créeraient un déséquilibre dangereux pour la tenue de route.' },
        { type: 'qcm', q: 'Quelle est la dernière étape cruciale à effectuer avant de considérer l\'intervention comme terminée ?', options: ['Nettoyer les outils', 'Serrer toutes les fixations au couple final, avec le véhicule posé sur ses roues', 'Vérifier la pression des pneus'], r: 'Serrer toutes les fixations au couple final, avec le véhicule posé sur ses roues' }
    ],
    activitePratique: [
        {
            titre: 'Préparation et Dépose',
            duree: '30 min',
            etapes: [
                'Lever et sécuriser l\'arrière du véhicule sur des chandelles.',
                'Déposer la roue du côté à opérer.',
                'Identifier les points de fixation supérieur et inférieur de l\'amortisseur.',
                'Soutenir légèrement le train arrière avec un cric pour soulager la contrainte sur l\'amortisseur.',
                'Desserrer et retirer les vis de fixation supérieure et inférieure.'
            ]
        },
        {
            titre: 'Remplacement de l\'Amortisseur',
            duree: '25 min',
            etapes: [
                'Retirer l\'amortisseur usagé.',
                'Comparer l\'ancien et le nouvel amortisseur pour s\'assurer de leur conformité (longueur, fixations).',
                'Positionner le nouvel amortisseur.',
                'Engager les vis de fixation sans les bloquer complètement (pré-serrage).'
            ]
        },
        {
            titre: 'Serrage au Couple et Finalisation',
            duree: '25 min',
            etapes: [
                'Remonter la roue et descendre le véhicule pour qu\'il repose sur ses suspensions.',
                'Accéder aux vis de fixation (par le passage de roue ou l\'intérieur du coffre).',
                'Effectuer le serrage final au couple préconisé par le constructeur.',
                'Répéter l\'opération pour le côté opposé.',
                'Effectuer un essai routier pour valider le comportement du véhicule.'
            ]
        }
    ],
    securiteRangement: [
        'Toujours travailler sur un véhicule stable et sécurisé par des chandelles.',
        'Utiliser des clés adaptées pour ne pas endommager les têtes de vis.',
        'Respecter scrupuleusement les couples de serrage finaux, véhicule au sol.',
        'Remplacer systématiquement les écrous autofreinés.'
    ],
    pointsCles: [
        'Le serrage final au couple se fait impérativement roues au sol.',
        'Remplacement toujours par paire pour un essieu.',
        'Contrôle de la conformité des nouvelles pièces avant montage.'
    ],
    validationRequise: false,
};

export default tp;
