
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 111,
    duree: '1h15',
    titre: 'Remplacement d\'une Roue',
    situation: 'Un client a crevé et a utilisé sa roue de secours. Il vient à l\'atelier pour faire réparer son pneu et remonter la roue d\'origine. Vous devez effectuer le changement de roue en toute sécurité en utilisant le cric de bord du véhicule.',
    objectif: 'Maîtriser la procédure sécurisée de remplacement d\'une roue en utilisant les outils fournis avec le véhicule. (Compétence C1.1)',
    materiel: ['Cric de bord', 'Clé de roue', 'Cales de roues', 'Roue de secours/réparée', 'Gants de protection', 'Clé dynamométrique'],
    etudePrelim: [
        { type: 'qcm', q: 'Avant de soulever le véhicule avec le cric, quelle est l\'action prioritaire à effectuer ?', options: ['Ouvrir le coffre', 'Allumer les feux de détresse', 'Serrer le frein à main et caler les roues'], r: 'Serrer le frein à main et caler les roues' },
        { type: 'text', q: 'Dans quel ordre faut-il serrer les écrous de roue et pourquoi ?', r: 'En étoile (ou en croix). Pour assurer un placage uniforme de la roue contre le moyeu et éviter de la voiler.' }
    ],
    activitePratique: [
        etape('Préparation du Véhicule', '20 min', [
            'Stationner le véhicule sur une surface plane et stable.',
            'Serrer le frein à main et engager une vitesse (ou la position P).',
            'Placer les cales sur la roue diagonalement opposée à celle à changer.',
            'Desserrer les écrous de la roue à déposer d\'un quart de tour (roue encore au sol).'
        ]),
        etape('Levage et Remplacement', '25 min', [
            'Positionner le cric de bord sur le point de levage constructeur.',
            'Lever le véhicule jusqu\'à ce que la roue ne touche plus le sol.',
            'Déposer complètement les écrous et retirer la roue.',
            'Positionner la nouvelle roue et visser les écrous à la main sans forcer.'
        ]),
        etape('Descente et Serrage Final', '15 min', [
            'Descendre le véhicule jusqu\'à ce que la roue touche légèrement le sol.',
            'Effectuer un pré-serrage des écrous en étoile avec la clé de roue.',
            'Descendre complètement le véhicule et retirer le cric.',
            'Effectuer le serrage final au couple préconisé avec une clé dynamométrique.'
        ])
    ],
    securiteRangement: [
        'Ne jamais se positionner sous un véhicule soutenu par un cric de bord.',
        'Toujours travailler sur une surface stable.',
        'Respecter l\'ordre de serrage en étoile.',
        'Vérifier le couple de serrage final avec une clé dynamométrique.'
    ],
    pointsCles: [
        'Serrage au couple en étoile',
        'Utilisation correcte des points de levage',
        'Procédure de sécurité (cales, frein à main)',
        'Contrôle final du serrage'
    ],
    validationRequise: false,
};

export default tp;
