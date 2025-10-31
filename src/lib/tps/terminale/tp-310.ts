
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 310,
    duree: '2h30',
    titre: 'Diagnostic système injection diesel',
    niveau: 'terminale',
    situation: 'Un véhicule diesel Common Rail présente le voyant moteur allumé, avec des pertes de puissance. Vous êtes chargé de mener un diagnostic avancé du système d\'injection pour identifier la source de la panne.',
    objectif: 'Analyser codes/paramètres, tester actionneurs et conclure. (Compétence C3.2)',
    materiel: ['Valise diag', 'Multimètre', 'Mano rampe', 'Oscilloscope', 'RTA'],
    etudePrelim: [
      { q: 'Quelle est la plage de pression typique dans une rampe commune au ralenti et en pleine charge ?', r: 'Environ 250-400 bars au ralenti, et jusqu\'à 1600-2500 bars en pleine charge.', type: 'text' },
      { q: 'Quel est le rôle du régulateur de pression de la rampe (aussi appelé IMV ou MPROP) ?', r: 'Il est commandé par le calculateur pour ajuster la pression dans la rampe en fonction des besoins du moteur, en régulant la quantité de carburant admise dans la pompe HP.', type: 'text' },
      { q: 'Quels sont les symptômes d\'un injecteur qui fuit ou qui a un débit de retour excessif ?', r: 'Difficultés de démarrage (chute de pression dans la rampe), claquements moteur, fumée, et un volume de retour de gasoil anormalement élevé lors du test des éprouvettes.', type: 'text' }
    ],
    activitePratique: [
      {
        titre: 'Lecture diag',
        duree: '30 min',
        etapes: [
          'Codes défauts + données figées.',
          'Historique et contexte.',
          'Effacement et re-test.'
        ]
      },
      {
        titre: 'Paramètres',
        duree: '50 min',
        etapes: [
          'Pression cible vs réelle.',
          'Débits injecteurs, T° gasoil.',
          'Capteurs PMH, MAP, pédale.'
        ]
      },
      {
        titre: 'Actionneurs',
        duree: '40 min',
        etapes: [
          'Commander régulateur.',
          'Activation injecteurs.',
          'Test EGR.',
          'Mesures ohmiques.'
        ]
      },
      {
        titre: 'Synthèse',
        duree: '30 min',
        etapes: [
          'Identifier élément en cause.',
          'Proposer corrections.',
          'Tracer.'
        ]
      }
    ],
    securiteRangement: ['Déconnexions propres', 'Ranger outils', 'Archiver relevés'],
    pointsCles: ['Pression rampe clé', 'Codes + PIDs', 'Actionneurs confirment'],
    validationRequise: false,
  };

export default tp;
