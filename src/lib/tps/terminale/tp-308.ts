
import type { TP } from './tp-301';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 308,
    duree: '2h00',
    titre: 'MA 307 • Contrôle du circuit basse pression diesel',
    situation: 'Un moteur diesel présente des difficultés de démarrage et des coupures moteur intermittentes. Vous suspectez un problème d\'alimentation et devez contrôler le circuit basse pression pour confirmer votre diagnostic.',
    objectif: 'Mesurer pression/dépression, détecter bulles et colmatage. (Compétence C3.3)',
    materiel: ['Mano BP', 'Tuyau transparent', 'Filtre gasoil', 'Valise diag'],
    etudePrelim: [
      { q: 'Quelle est la pression typique du circuit de gavage (basse pression) sur un diesel moderne ?', r: 'Entre 3 et 6 bars, pour garantir une alimentation constante de la pompe haute pression.', type: 'text' },
      { q: 'Quel est l\'effet de la présence d\'air dans le circuit de gasoil ?', r: 'L\'air est compressible, contrairement au gasoil. Sa présence provoque des à-coups, un ralenti instable, des difficultés de démarrage et peut endommager la pompe HP.', type: 'text' },
      { q: 'Quel est le rôle du clapet anti-retour souvent intégré au support de filtre ?', r: 'Il empêche le circuit de se désamorcer en maintenant le gasoil dans les tuyaux lorsque le moteur est à l\'arrêt, facilitant ainsi les démarrages.', type: 'text' }
    ],
    activitePratique: [
      etape('Visuel', '30 min', [
        'Durites/colliers/fuites.',
        'Propreté filtre.',
        'Niveau carburant.'
      ]),
      etape('Mesures', '50 min', [
        'Mano en sortie filtre/entrée pompe HP.',
        'Ralenti/accélération.',
        'Comparer RTA.',
        'Stabilité de la pression.'
      ]),
      etape('Bulles/purge', '40 min', [
        'Tuyau transparent en retour.',
        'Observer bulles.',
        'Purger circuit.',
        'Remplacer filtre si colmaté.'
      ])
    ],
    securiteRangement: ['Nettoyer gasoil', 'Éliminer déchets', 'Tracer'],
    pointsCles: ['Pas d’air', 'Pression correcte', 'Filtre propre'],
    validationRequise: false,
  };

export default tp;
