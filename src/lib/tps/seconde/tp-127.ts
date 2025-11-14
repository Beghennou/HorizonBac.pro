
import type { TP } from '@/lib/types/tp-types';

const tp: TP = {
    id: 127,
    duree: '4h00',
    titre: 'Remplacement Distribution et Pompe à Eau',
    niveau: 'seconde',
    situation: 'Un véhicule arrive à l\'échéance de remplacement de sa courroie de distribution. L\'intervention inclut préventivement le remplacement de la pompe à eau.',
    objectif: 'Appliquer la méthode de remplacement d\'un kit de distribution en respectant le calage et les couples de serrage. (Compétences C1.1, C1.3)',
    materiel: ['Kit de distribution neuf (courroie, galets)', 'Pompe à eau neuve', 'Jeu de piges de calage', 'Clé dynamométrique', 'Liquide de refroidissement'],
    etudePrelim: [
        { type: 'text', q: 'Quel est le rôle de la courroie de distribution ?', r: 'Elle synchronise le mouvement du vilebrequin (pistons) avec celui de ou des arbre(s) à cames (soupapes).' },
        { type: 'text', q: 'Quelle est la conséquence d\'une rupture de la courroie de distribution sur la plupart des moteurs ?', r: 'Une collision entre les pistons et les soupapes, ce qui entraîne une casse moteur très grave et coûteuse.' },
        { type: 'text', q: 'Pourquoi est-il crucial d\'effectuer deux tours de moteur à la main après avoir monté la nouvelle courroie ?', r: 'Pour s\'assurer qu\'il n\'y a aucun point dur (signe d\'une collision piston/soupape due à un mauvais calage) et pour vérifier que les repères de calage reviennent parfaitement en face.' }
    ],
    activitePratique: [
        {
            titre: 'Calage et Préparation',
            duree: '60 min',
            etapes: [
                'Déposer les carters de protection et la courroie d\'accessoires.',
                'Tourner le moteur pour aligner les repères de calage du vilebrequin et de l\'arbre à cames.',
                'Insérer les piges de calage pour bloquer les arbres en position.',
                'Desserrer le galet tendeur et déposer l\'ancienne courroie.'
            ]
        },
        {
            titre: 'Remplacement des Composants',
            duree: '90 min',
            etapes: [
                'Déposer et remplacer la pompe à eau (vidanger le LDR au préalable).',
                'Remplacer le ou les galets tendeurs et enrouleurs fournis dans le kit.',
                'Installer la nouvelle courroie en respectant le sens de rotation et l\'ordre de pose.',
                'Tendre la courroie à la valeur préconisée à l\'aide de l\'outil spécifique ou du repère sur le galet tendeur.'
            ]
        },
        {
            titre: 'Contrôle et Finalisation',
            duree: '60 min',
            etapes: [
                'Retirer les piges et effectuer deux tours complets du vilebrequin à la main.',
                'Vérifier que les piges peuvent être réinsérées parfaitement.',
                'Remonter tous les carters et la courroie d\'accessoires.',
                'Remplir et purger le circuit de refroidissement.',
                'Démarrer le moteur et contrôler l\'absence de bruits anormaux.'
            ]
        }
    ],
    securiteRangement: [
        'Ne jamais forcer sur les piges de calage.',
        'Respecter scrupuleusement les couples de serrage.',
        'La propreté de la zone de travail est essentielle.'
    ],
    pointsCles: [
        'Calage parfait du moteur.',
        'Tension correcte de la courroie.',
        'Remplacement de tous les composants du kit (galets).'
    ],
    validationRequise: false,
};

export default tp;
