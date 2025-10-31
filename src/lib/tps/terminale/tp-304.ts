
import type { TP } from './tp-301';

function etape(titre: string, duree: string, etapes: string[]): any {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 304,
    duree: '1h30',
    titre: 'BAC PRO Terminale • Reconnaissance des valves de roues',
    situation: 'Malgré une pression des pneus correcte, le témoin TPMS (Tire Pressure Monitoring System) reste allumé. Vous devez diagnostiquer le système, identifier le capteur défaillant et le réappairer au calculateur.',
    objectif: 'Appairer capteurs, remplacer valve défectueuse et valider pressions. (Compétence C3.4)',
    materiel: ['Outil TPMS', 'Valise diag', 'Manomètre', 'Valves neuves'],
    etudePrelim: [
      { q: 'Quelle est la principale différence entre un système TPMS direct et indirect ?', r: 'Le TPMS direct utilise des capteurs de pression dans chaque roue. Le TPMS indirect utilise les capteurs ABS pour détecter des différences de vitesse de rotation entre les roues, signe d\'un sous-gonflage.', type: 'text' },
      { q: 'Pourquoi faut-il souvent réapprendre les capteurs après une permutation de roues ?', r: 'Le calculateur doit savoir quel ID de capteur correspond à quelle position (AVG, AVD, ARG, ARD) pour afficher l\'alerte au bon endroit.', type: 'text' },
      { q: 'Quelle est la durée de vie moyenne de la pile d\'un capteur TPMS ?', r: 'Environ 5 à 7 ans. La pile n\'est généralement pas remplaçable, il faut changer le capteur complet.', type: 'text' }
    ],
    activitePratique: [
      etape('Identification', '25 min', [
        'Lire IDs via outil TPMS.',
        'Comparer pressions affichées/réelles.',
        'Contrôler état valves/joints.'
      ]),
      etape('Remplacement', '40 min', [
        'Démonter pneu si nécessaire.',
        'Remplacer valve, serrage 4–6 Nm.',
        'Programmer ID capteur.'
      ]),
      etape('Apprentissage', '25 min', [
        'Lancer procédure calculateur.',
        'Activer capteurs AVG→AVD→ARD→ARG.',
        'Valider extinction voyant TPMS.'
      ])
    ],
    securiteRangement: ['Couples respectés', 'Étiqueter IDs', 'Ranger outil TPMS'],
    pointsCles: ['Apprentissage', 'Ordre roues', 'Pressions correctes'],
    validationRequise: false,
  };

export default tp;
