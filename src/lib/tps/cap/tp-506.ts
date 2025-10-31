
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 506,
    duree: '1h00',
    titre: 'CAP 1ère Année • Contrôle et Remplacement des Ampoules',
    situation: "Un client signale qu'un de ses feux ne fonctionne plus. Vous devez effectuer un contrôle complet de l'éclairage et remplacer les ampoules défectueuses.",
    objectif: 'Identifier et remplacer les ampoules défectueuses. (Compétences C1.2, C1.3)',
    materiel: ['Jeu d\'ampoules de rechange', 'Tournevis', 'Chiffon microfibre', 'Gants'],
    etudePrelim: [
        { type: 'text', q: 'Pourquoi ne faut-il jamais toucher le verre d\'une ampoule halogène (H4, H7...) avec les doigts ?', r: 'La graisse des doigts crée un point chaud sur le verre, qui peut faire éclater l\'ampoule lorsqu\'elle chauffe.' },
        { type: 'text', q: 'Comment identifier le type exact d\'une ampoule défectueuse ?', r: 'En lisant les inscriptions gravées sur son culot (ex: P21W, H7 55W).' }
    ],
    activitePratique: [
        etape('Contrôle systématique', '20 min', [
            'Avec un assistant, tester toutes les fonctions : veilleuses, croisement, route, clignotants, stop, recul.',
            'Noter précisément toutes les ampoules défectueuses.'
        ]),
        etape('Remplacement d\'une ampoule', '25 min', [
            'Accéder au bloc optique concerné (par le coffre ou le compartiment moteur).',
            'Déposer le porte-ampoules ou le cache de protection.',
            'Remplacer l\'ampoule défectueuse par un modèle identique neuf.',
            'Tester le fonctionnement avant de tout remonter.'
        ]),
        etape('Validation', '15 min', [
            'Remonter tous les éléments.',
            'Refaire un test complet de toutes les fonctions d\'éclairage.',
            'Informer le client de l\'intervention.'
        ])
    ],
    securiteRangement: [
        'Ne jamais toucher le verre des ampoules halogènes.',
        'Utiliser des ampoules de type et de puissance conformes.',
        'Éliminer les anciennes ampoules dans les bacs de recyclage appropriés.'
    ],
    pointsCles: [
        'Contrôle exhaustif de toutes les fonctions.',
        'Remplacement sans contamination du verre.',
        'Test systématique après intervention.'
    ],
    validationRequise: false,
};

export default tp;
