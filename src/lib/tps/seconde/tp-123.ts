
import type { TP } from '@/lib/types/tp-types';

const tp: TP = {
    id: 123,
    duree: '4h00',
    titre: 'Découverte Moteur : Métrologie du Bas Moteur',
    niveau: 'seconde',
    situation: 'Suite au démontage de la culasse, vous devez maintenant contrôler les éléments du bas moteur (cylindres et équipage mobile) sur un moteur pédagogique pour évaluer leur usure.',
    objectif: 'Utiliser les outils de métrologie (palmer, alésomètre) pour mesurer l\'usure des cylindres, des pistons et du vilebrequin. (Compétences C1.2, C2.1)',
    materiel: ['Moteur sur support (sans culasse)', 'Palmer (micromètre)', 'Alésomètre (comparateur d\'alésage)', 'Jeu de cales plastigage', 'Documentation technique (cotes et tolérances)', 'Pied à coulisse'],
    etudePrelim: [
        { type: 'text', q: 'Qu\'est-ce que l\'ovalisation et la conicité d\'un cylindre ?', r: 'L\'ovalisation est l\'usure inégale du cylindre, qui n\'est plus parfaitement rond. La conicité est l\'usure inégale du cylindre sur sa hauteur (plus large en haut qu\'en bas).' },
        { type: 'text', q: 'À quoi sert le Plastigage ?', r: 'C\'est un fil calibré que l\'on écrase entre le coussinet et le maneton/tourillon pour mesurer le jeu de fonctionnement, c\'est-à-dire l\'épaisseur du film d\'huile.' },
        { type: 'qcm', q: 'Quel outil est le plus précis pour mesurer le diamètre extérieur d\'une jupe de piston ?', options: ['Un pied à coulisse', 'Un alésomètre', 'Un palmer (micromètre)'], r: 'Un palmer (micromètre)' }
    ],
    activitePratique: [
        {
            titre: 'Contrôle des Cylindres',
            duree: '60 min',
            etapes: [
                'Nettoyer les cylindres.',
                'À l\'aide de l\'alésomètre, mesurer le diamètre de chaque cylindre à trois hauteurs différentes et sur deux axes perpendiculaires.',
                'Noter les 6 mesures pour chaque cylindre.',
                'Calculer l\'ovalisation (différence entre les 2 axes) et la conicité (différence entre le haut et le bas).'
            ]
        },
        {
            titre: 'Contrôle des Pistons',
            duree: '45 min',
            etapes: [
                'Déposer un ensemble bielle-piston.',
                'À l\'aide du palmer, mesurer le diamètre de la jupe du piston perpendiculairement à l\'axe.',
                'Comparer la mesure à la cote constructeur pour déterminer l\'usure et le jeu piston/cylindre.'
            ]
        },
        {
            titre: 'Contrôle du Vilebrequin (Jeu de Coussinets)',
            duree: '75 min',
            etapes: [
                'Déposer un chapeau de bielle ou de palier de vilebrequin.',
                'Nettoyer les surfaces.',
                'Placer un morceau de Plastigage sur le maneton ou le tourillon.',
                'Remonter et serrer le chapeau au couple préconisé.',
                'Redémonter et comparer la largeur du fil écrasé avec l\'échelle fournie pour déterminer le jeu.',
                'Comparer le jeu mesuré aux tolérances constructeur.'
            ]
        }
    ],
    securiteRangement: [
        'Manipuler les outils de mesure avec le plus grand soin.',
        'Nettoyer les pièces et les outils avant et après chaque mesure.',
        'Respecter les couples de serrage pour les mesures au Plastigage.'
    ],
    pointsCles: [
        'La précision et la propreté sont les clés de la métrologie.',
        'Comparer systématiquement chaque mesure aux tolérances de la documentation technique.',
        'Le Plastigage est une méthode simple et efficace pour mesurer un jeu interne.'
    ],
    validationRequise: false,
};

export default tp;
