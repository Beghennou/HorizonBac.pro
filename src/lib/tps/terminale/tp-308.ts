
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 308,
    duree: '2h00',
    titre: 'Contrôle du circuit basse pression diesel',
    niveau: 'terminale',
    situation: 'Un moteur diesel présente des difficultés de démarrage et des coupures moteur intermittentes. Vous suspectez un problème d\'alimentation et devez contrôler le circuit basse pression pour confirmer votre diagnostic.',
    objectif: 'Mesurer pression/dépression, détecter bulles et colmatage. (Compétence C3.3)',
    materiel: ['Mano BP', 'Tuyau transparent', 'Filtre gasoil', 'Valise diag'],
    etudePrelim: [
      { q: 'Quelle est la pression typique du circuit de gavage (basse pression) sur un diesel moderne ?', r: 'Entre 3 et 6 bars, pour garantir une alimentation constante de la pompe haute pression.', type: 'text' },
      { q: 'Quel est l\'effet de la présence d\'air dans le circuit de gasoil ?', r: 'L\'air est compressible, contrairement au gasoil. Sa présence provoque des à-coups, un ralenti instable, des difficultés de démarrage et peut endommager la pompe HP.', type: 'text' },
      { q: 'Quel est le rôle du clapet anti-retour souvent intégré au support de filtre ?', r: 'Il empêche le circuit de se désamorcer en maintenant le gasoil dans les tuyaux lorsque le moteur est à l\'arrêt, facilitant ainsi les démarrages.', type: 'text' }
    ],
    activitePratique: [
      {
        titre: 'Visuel',
        duree: '30 min',
        etapes: [
          'Durites/colliers/fuites.',
          'Propreté filtre.',
          'Niveau carburant.'
        ]
      },
      {
        titre: 'Mesures',
        duree: '50 min',
        etapes: [
          'Mano en sortie filtre/entrée pompe HP.',
          'Ralenti/accélération.',
          'Comparer RTA.',
          'Stabilité de la pression.'
        ]
      },
      {
        titre: 'Bulles/purge',
        duree: '40 min',
        etapes: [
          'Tuyau transparent en retour.',
          'Observer bulles.',
          'Purger circuit.',
          'Remplacer filtre si colmaté.'
        ]
      }
    ],
    securiteRangement: ['Nettoyer gasoil', 'Éliminer déchets', 'Tracer'],
    pointsCles: ['Pas d’air', 'Pression correcte', 'Filtre propre'],
    validationRequise: false,
  };

export default tp;
