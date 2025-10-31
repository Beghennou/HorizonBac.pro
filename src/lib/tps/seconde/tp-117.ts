
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 117,
    duree: '2h00',
    titre: 'Entretien d\'une Tondeuse à Gazon Thermique',
    situation: 'Un client amène sa tondeuse thermique pour un entretien annuel avant la saison de tonte. Vous devez effectuer les opérations de maintenance préventive de base pour garantir son bon fonctionnement.',
    objectif: 'Réaliser les opérations d\'entretien préventif sur un moteur 4 temps de motoculture (vidange, filtre, bougie, lame). (Compétences C1.1, C1.2, C1.3)',
    materiel: [
        'Tondeuse à gazon', 'Clé à molette / Clés adaptées', 'Affûteuse ou lime', 'Filtre à air neuf', 'Huile moteur 4T',
        'Récipient pour vidange', 'Clé à bougie', 'Bougie de remplacement', 'Gants de protection', 'Lunettes de protection',
        'Manuel d’entretien de la tondeuse', 'Clé dynamométrique'
    ],
    etudePrelim: [
        { type: 'qcm', q: 'Quels équipements de sécurité sont indispensables pour cette intervention ?', options: ['Gants et lunettes de protection', 'Casque et chaussures de sécurité', 'Uniquement des gants'], r: 'Gants et lunettes de protection' },
        { type: 'text', q: 'Pourquoi doit-on débrancher la bougie avant toute intervention sur la lame ?', r: 'C\'est une sécurité essentielle pour empêcher tout démarrage accidentel du moteur pendant que l\'on manipule la lame tranchante.' },
        { type: 'text', q: 'À quoi sert l\'affûtage de la lame ? Quel est le risque d\'une lame mal équilibrée ?', r: 'Une lame bien affûtée coupe l\'herbe nettement. Une lame mal équilibrée provoque de fortes vibrations qui peuvent endommager le moteur et les fixations.' },
        { type: 'text', q: 'À quelle fréquence approximative doit-on remplacer le filtre à air sur une tondeuse ?', r: 'Toutes les 25 heures d’utilisation ou au moins une fois par saison.' },
        { type: 'text', q: 'Pourquoi est-il important de respecter le couple de serrage de la lame de coupe ?', r: 'Un serrage insuffisant peut entraîner le desserrage de la lame en fonctionnement (très dangereux). Un serrage excessif peut endommager la vis ou le support moteur. Le couple recommandé est souvent de 30 Nm.' }
    ],
    activitePratique: [
        etape('Dépose et affûtage de la lame', '25 min', [
            'Arrêter la tondeuse, débrancher le fil de la bougie et sécuriser.',
            'Basculer la tondeuse sur le côté (côté filtre à air vers le haut).',
            'Utiliser une clé adaptée pour déposer la lame (bloquer la lame avec une cale en bois).',
            'Affûter la lame en respectant un angle d\'environ 30°, puis vérifier l\'équilibrage.',
            'Remonter la lame et la serrer au couple recommandé (ex: 30 Nm).'
        ]),
        etape('Remplacement du filtre à air', '20 min', [
            'Localiser le boîtier du filtre à air.',
            'Déposer le filtre usagé.',
            'Nettoyer le boîtier et insérer le nouveau filtre.',
            'Vérifier l’étanchéité du couvercle.'
        ]),
        etape('Vidange de l\'huile moteur', '20 min', [
            'Placer le récipient sous le bouchon de vidange (ou basculer la tondeuse pour vidanger par l\'orifice de remplissage si pas de bouchon).',
            'Ouvrir le bouchon et laisser l’huile s’écouler.',
            'Remplacer par de l’huile neuve en respectant la quantité et les spécifications.',
            'Reposer le bouchon (couple 25 Nm si applicable) et vérifier le niveau d’huile.'
        ]),
        etape('Entretien de la bougie d\'allumage', '20 min', [
            'Localiser et déposer la bougie avec la clé à bougie.',
            'Vérifier son état (usure, dépôts) et l\'écartement des électrodes.',
            'Remplacer la bougie si nécessaire et la serrer au couple recommandé (ex: 20 Nm).',
            'Reconnecter l\'antiparasite.'
        ]),
         etape('Conclusion et nettoyage', '10 min', [
            'Nettoyer la zone de travail et les outils.',
            'Démarrer la tondeuse pour vérifier son bon fonctionnement.'
        ])
    ],
    securiteRangement: [
        'Toujours débrancher la bougie avant de toucher à la lame.',
        'Porter des gants et des lunettes de protection.',
        'Recycler l\'huile usagée et les anciennes pièces dans les bacs de dédiés.',
        'Respecter les couples de serrage (Lame: 30 Nm, Bouchon vidange: 25 Nm, Bougie: 20 Nm).'
    ],
    pointsCles: [
        'La sécurité prime : toujours débrancher la bougie.',
        'L\'équilibrage de la lame est aussi important que l\'affûtage.',
        'Respecter les types d\'huile et les couples de serrage.',
        'Un entretien régulier prolonge la vie du moteur.'
    ],
    ressources: [
        '[VIDÉO] Entretien complet tondeuse - https://youtu.be/sFxS0Zu5v5Y',
        '[VIDÉO] Nettoyage carburateur - https://youtu.be/ZkNqUXj08k8',
        '[ARTICLE] Affûtage et démontage lame - https://www.adepem.com/conseils-pratiques/comment-affuter-ou-changer-la-lame-de-ma-tondeuse-a-gazon'
    ],
    validationRequise: true,
};

export default tp;
