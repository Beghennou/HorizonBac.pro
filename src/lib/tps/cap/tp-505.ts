import type { TP, Etape } from './tp-501';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 505,
    duree: '1h15',
    titre: 'CAP • Vidange et Remplacement du Filtre à Huile',
    situation: "Un véhicule se présente pour sa vidange annuelle. Vous devez effectuer l'opération en respectant les procédures, le type d'huile et le recyclage des déchets.",
    objectif: "Réaliser une vidange moteur dans les règles de l'art. (Compétences C1.2, C1.4)",
    materiel: ['Huile moteur préconisée', 'Filtre à huile neuf', 'Joint de vidange neuf', 'Clé à filtre', 'Récupérateur d\'huile usagée', 'Clé dynamométrique'],
    etudePrelim: [
        { type: 'text', q: 'Où se trouvent les informations sur le type d\'huile et la quantité préconisées pour un véhicule ?', r: 'Dans le carnet d\'entretien du véhicule ou dans la documentation technique (RTA).' },
        { type: 'text', q: 'Pourquoi est-il indispensable de remplacer le joint du bouchon de vidange à chaque fois ?', r: 'Pour garantir une étanchéité parfaite et éviter les fuites. Le joint s\'écrase au serrage et n\'est plus réutilisable.' }
    ],
    activitePratique: [
        etape('Préparation et Vidange', '30 min', [
            'Faire tourner le moteur quelques minutes pour fluidifier l\'huile.',
            'Placer le récupérateur d\'huile sous le carter.',
            'Desserrer et retirer le bouchon de vidange.',
            'Laisser l\'huile s\'écouler complètement.'
        ]),
        etape('Remplacement du Filtre et Remplissage', '30 min', [
            'Déposer l\'ancien filtre à huile.',
            'Huiler légèrement le joint du nouveau filtre.',
            'Visser le nouveau filtre à la main, puis serrer d\'un quart de tour supplémentaire.',
            'Nettoyer la portée du bouchon de vidange, mettre un joint neuf et serrer au couple.',
            'Remplir avec la quantité d\'huile préconisée.'
        ]),
        etape('Contrôle Final', '15 min', [
            'Démarrer le moteur, laisser tourner 1 minute.',
            'Couper le moteur, attendre 5 minutes.',
            'Faire le niveau d\'huile à la jauge et ajuster si nécessaire.',
            'Vérifier l\'absence de fuite au bouchon et au filtre.'
        ])
    ],
    securiteRangement: [
        'Utiliser un récupérateur d\'huile étanche',
        'Manipuler l\'huile chaude avec précaution (gants)',
        'Stocker l\'huile et le filtre usagés dans les bacs de recyclage dédiés'
    ],
    pointsCles: [
        'Utilisation de l\'huile préconisée',
        'Remplacement systématique du joint et du filtre',
        'Serrage au couple du bouchon de vidange'
    ],
    validationRequise: false,
};

export default tp;
