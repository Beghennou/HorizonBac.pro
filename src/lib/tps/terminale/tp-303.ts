
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 303,
    duree: '2h00',
    titre: 'Essuyage automatique des vitres. Allumage automatique',
    niveau: 'terminale',
    situation: 'Un client rapporte que ses essuie-glaces se déclenchent de manière aléatoire et que ses phares ne s\'allument plus automatiquement dans les tunnels. Vous devez diagnostiquer les capteurs de pluie et de luminosité.',
    objectif: 'Tester capteurs pluie/lumière, calibrer et valider. (Compétence C3.1)',
    materiel: ['Valise diag', 'Multimètre', 'Schéma', 'Vaporisateur'],
    etudePrelim: [
      { q: 'Comment fonctionne un capteur de pluie à infrarouge ?', r: 'Il émet un faisceau infrarouge qui est réfléchi par la surface intérieure du pare-brise. Les gouttes d\'eau modifient l\'angle de réflexion, ce qui est détecté par le capteur.', type: 'text' },
      { q: 'Pourquoi la zone du pare-brise devant le capteur doit-elle être impeccablement propre ?', r: 'Toute saleté, fissure ou bulle d\'air peut fausser la mesure de réflexion infrarouge et provoquer des déclenchements intempestifs ou une absence de détection.', type: 'text' },
      { q: 'À quoi sert la procédure de calibrage du capteur via la valise de diagnostic ?', r: 'Elle permet de définir le point "zéro" (pare-brise sec et propre) pour que le calculateur puisse interpréter correctement les variations de signal dues à la pluie.', type: 'text' }
    ],
    activitePratique: [
      {
        titre: 'Essuyage auto',
        duree: '40 min',
        etapes: [
          'Lire défauts capteur pluie.',
          'Tester alimentation et signal.',
          'Simuler pluie et observer réaction.'
        ]
      },
      {
        titre: 'Feux auto',
        duree: '40 min',
        etapes: [
          'Lire paramètres luminosité.',
          'Varier lumière et observer délais.',
          'Ajuster sensibilité si possible.'
        ]
      },
      {
        titre: 'Étalonnage',
        duree: '40 min',
        etapes: [
          'Lancer calibration via valise.',
          'Régler sensibilités.',
          'Valider sur conditions variées.'
        ]
      }
    ],
    securiteRangement: ['Nettoyer pare-brise capteurs', 'Rebrancher connecteurs', 'Tracer paramètres'],
    pointsCles: ['Propreté zone', 'Calibration', 'Test réel'],
    validationRequise: false,
  };

export default tp;
