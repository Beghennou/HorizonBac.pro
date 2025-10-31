
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 317,
    duree: '2h00',
    titre: 'Diagnostiquer un système de suspension pilotée',
    niveau: 'terminale',
    situation: 'Le véhicule, équipé d\'une suspension pilotée, est "bloqué" en position basse ou présente un confort très dégradé. Votre mission est de diagnostiquer le système électronique et pneumatique/hydraulique.',
    objectif: 'Diagnostiquer via codes/paramètres, tester actionneurs, valider comportement dynamique. (Compétence C3.3)',
    materiel: ['Valise suspension', 'Mano pneumatique', 'Multimètre', 'Schéma'],
    etudePrelim: [
      { q: 'Citez deux types de technologies de suspension pilotée.', r: '1. Suspension pneumatique (soufflets d\'air). 2. Suspension hydropneumatique (sphères hydrauliques). 3. Amortisseurs magnéto-rhéologiques (fluidité variable).', type: 'text' },
      { q: 'Quel est le rôle des capteurs d\'assiette ?', r: 'Ils mesurent la hauteur de chaque coin du véhicule pour permettre au calculateur de corriger l\'assiette en fonction de la charge et de la route.', type: 'text' },
      { q: 'Dans un système pneumatique, quel composant est responsable de la production d\'air comprimé ?', r: 'Le compresseur de suspension.', type: 'text' }
    ],
    activitePratique: [
      {
        titre: 'Diagnostic initial',
        duree: '30 min',
        etapes: [
          'Lire codes calculateur.',
          'Observer assiettes AV/AR et pressions.',
          'Contrôle visuel fuites et connexions.'
        ]
      },
      {
        titre: 'Tests capteurs',
        duree: '35 min',
        etapes: [
          'Mesurer capteurs assiette.',
          'Contrôler capteurs d’accélération.',
          'Vérifier alimentations/signaux.'
        ]
      },
      {
        titre: 'Tests actionneurs',
        duree: '40 min',
        etapes: [
          'Activer électrovannes amortisseurs.',
          'Tester compresseur pneumatique (pression/temps).',
          'Contrôler électrovannes soufflets.',
          'Mesurer pression circuit (6–16 bar).',
          'Contrôler fuites.'
        ]
      },
      {
        titre: 'Validation dynamique',
        duree: '15 min',
        etapes: [
          'Essai route: changer de mode.',
          'Observer fermeté/correction assiette.',
          'Vérifier absence défauts.',
          'Tracer paramètres.'
        ]
      }
    ],
    securiteRangement: ['Dépressuriser avant intervention', 'Protéger soufflets', 'Ranger outils'],
    pointsCles: ['Modes fonctionnels', 'Correction active', 'Pas de fuites'],
    validationRequise: false,
  };

export default tp;
