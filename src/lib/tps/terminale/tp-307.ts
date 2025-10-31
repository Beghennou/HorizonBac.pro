
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 307,
    duree: '1h45',
    titre: 'BAC PRO Terminale • Relevé de pressions de suralimentation',
    situation: 'Un client rapporte une perte de puissance significative et un sifflement anormal à l\'accélération sur son moteur turbo. Vous êtes chargé de contrôler le circuit de suralimentation pour identifier la cause du problème.',
    objectif: 'Comparer pressions aux valeurs constructeur, identifier fuites/wastegate/VGT. (Compétences C3.1, C3.4)',
    materiel: ['Mano turbo', 'Valise diag', 'T de dérivation', 'Fumigène'],
    etudePrelim: [
      { q: 'Quelle est la pression de suralimentation typique en pleine charge pour un moteur standard ?', r: 'Généralement entre 0.8 et 1.5 bar de pression relative (au-dessus de la pression atmosphérique).', type: 'text' },
      { q: 'Quelle est la différence fondamentale entre une wastegate et un turbo à géométrie variable (VGT) ?', r: 'La wastegate est une soupape qui libère les gaz d\'échappement pour limiter la vitesse du turbo. Le VGT modifie l\'angle des ailettes de la turbine pour optimiser la réponse à bas et haut régime.', type: 'text' },
      { q: 'Quels sont les symptômes d\'une fuite sur le circuit de suralimentation ?', r: 'Perte de puissance, sifflement, fumée noire à l\'échappement (mélange trop riche en carburant), et mise en sécurité du moteur (mode dégradé).', type: 'text' }
    ],
    activitePratique: [
      etape('Montage mano', '25 min', [
        'T sur durite admission.',
        'Sécuriser raccords.',
        'Brancher diag.'
      ]),
      etape('Mesures', '50 min', [
        'Ralenti ~0 bar.',
        'Charge progressive: relever max.',
        'Comparer RTA ±0,2 bar.',
        'Observer commande wastegate.'
      ]),
      etape('Fuites', '30 min', [
        'Fumigène durites/intercooler.',
        'Serrer colliers.',
        'Tester électrovanne commande.'
      ])
    ],
    securiteRangement: ['Remettre durite d’origine', 'Serrer colliers', 'Tracer relevés'],
    pointsCles: ['Pression cible', 'Fuites = perte', 'Commande OK'],
    validationRequise: false,
  };

export default tp;
