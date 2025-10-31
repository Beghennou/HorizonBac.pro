
import type { TP, Etape } from '@/lib/data-manager';

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

const tp: TP = {
    id: 310,
    duree: '2h30',
    titre: 'BAC PRO Terminale • Diagnostic système injection diesel',
    situation: 'Un véhicule diesel Common Rail présente le voyant moteur allumé, avec des pertes de puissance. Vous êtes chargé de mener un diagnostic avancé du système d\'injection pour identifier la source de la panne.',
    objectif: 'Analyser codes/paramètres, tester actionneurs et conclure. (Compétence C3.2)',
    materiel: ['Valise diag', 'Multimètre', 'Mano rampe', 'Oscilloscope', 'RTA'],
    etudePrelim: [
      { q: 'Quelle est la plage de pression typique dans une rampe commune au ralenti et en pleine charge ?', r: 'Environ 250-400 bars au ralenti, et jusqu\'à 1600-2500 bars en pleine charge.', type: 'text' },
      { q: 'Quel est le rôle du régulateur de pression de la rampe (aussi appelé IMV ou MPROP) ?', r: 'Il est commandé par le calculateur pour ajuster la pression dans la rampe en fonction des besoins du moteur, en régulant la quantité de carburant admise dans la pompe HP.', type: 'text' },
      { q: 'Quels sont les symptômes d\'un injecteur qui fuit ou qui a un débit de retour excessif ?', r: 'Difficultés de démarrage (chute de pression dans la rampe), claquements moteur, fumée, et un volume de retour de gasoil anormalement élevé lors du test des éprouvettes.', type: 'text' }
    ],
    activitePratique: [
      etape('Lecture diag', '30 min', [
        'Codes défauts + données figées.',
        'Historique et contexte.',
        'Effacement et re-test.'
      ]),
      etape('Paramètres', '50 min', [
        'Pression cible vs réelle.',
        'Débits injecteurs, T° gasoil.',
        'Capteurs PMH, MAP, pédale.'
      ]),
      etape('Actionneurs', '40 min', [
        'Commander régulateur.',
        'Activation injecteurs.',
        'Test EGR.',
        'Mesures ohmiques.'
      ]),
      etape('Synthèse', '30 min', [
        'Identifier élément en cause.',
        'Proposer corrections.',
        'Tracer.'
      ])
    ],
    securiteRangement: ['Déconnexions propres', 'Ranger outils', 'Archiver relevés'],
    pointsCles: ['Pression rampe clé', 'Codes + PIDs', 'Actionneurs confirment'],
    validationRequise: false,
  };

export default tp;
