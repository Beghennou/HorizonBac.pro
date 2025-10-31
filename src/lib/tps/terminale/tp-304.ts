
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 304,
    duree: '1h30',
    titre: 'Reconnaissance des valves de roues',
    niveau: 'terminale',
    situation: 'Malgré une pression des pneus correcte, le témoin TPMS (Tire Pressure Monitoring System) reste allumé. Vous devez diagnostiquer le système, identifier le capteur défaillant et le réappairer au calculateur.',
    objectif: 'Appairer capteurs, remplacer valve défectueuse et valider pressions. (Compétence C3.4)',
    materiel: ['Outil TPMS', 'Valise diag', 'Manomètre', 'Valves neuves'],
    etudePrelim: [
      { q: 'Quelle est la principale différence entre un système TPMS direct et indirect ?', r: 'Le TPMS direct utilise des capteurs de pression dans chaque roue. Le TPMS indirect utilise les capteurs ABS pour détecter des différences de vitesse de rotation entre les roues, signe d\'un sous-gonflage.', type: 'text' },
      { q: 'Pourquoi faut-il souvent réapprendre les capteurs après une permutation de roues ?', r: 'Le calculateur doit savoir quel ID de capteur correspond à quelle position (AVG, AVD, ARG, ARD) pour afficher l\'alerte au bon endroit.', type: 'text' },
      { q: 'Quelle est la durée de vie moyenne de la pile d\'un capteur TPMS ?', r: 'Environ 5 à 7 ans. La pile n\'est généralement pas remplaçable, il faut changer le capteur complet.', type: 'text' }
    ],
    activitePratique: [
      {
        titre: 'Identification',
        duree: '25 min',
        etapes: [
          'Lire IDs via outil TPMS.',
          'Comparer pressions affichées/réelles.',
          'Contrôler état valves/joints.'
        ]
      },
      {
        titre: 'Remplacement',
        duree: '40 min',
        etapes: [
          'Démonter pneu si nécessaire.',
          'Remplacer valve, serrage 4–6 Nm.',
          'Programmer ID capteur.'
        ]
      },
      {
        titre: 'Apprentissage',
        duree: '25 min',
        etapes: [
          'Lancer procédure calculateur.',
          'Activer capteurs AVG→AVD→ARD→ARG.',
          'Valider extinction voyant TPMS.'
        ]
      }
    ],
    securiteRangement: ['Couples respectés', 'Étiqueter IDs', 'Ranger outil TPMS'],
    pointsCles: ['Apprentissage', 'Ordre roues', 'Pressions correctes'],
    validationRequise: false,
  };

export default tp;
