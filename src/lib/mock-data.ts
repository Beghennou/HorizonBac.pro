import { Student } from './types';

export const tpModules = [
  {
    id: 'tp-aero',
    title: 'Aérodynamique et Carrosserie',
    description: 'Analyse des flux d\'air et optimisation des appendices aérodynamiques pour une performance maximale.',
    category: 'Châssis',
    imageId: 'tp-aero',
  },
  {
    id: 'tp-engine',
    title: 'Optimisation Groupe Motopropulseur',
    description: 'Réglage fin du moteur et de la transmission pour un gain de puissance et de fiabilité.',
    category: 'Moteur',
    imageId: 'tp-engine',
  },
  {
    id: 'tp-suspension',
    title: 'Réglage des Suspensions',
    description: 'Ajustement de la géométrie, de la dureté et de la réponse des suspensions pour un comportement optimal.',
    category: 'Châssis',
    imageId: 'tp-suspension',
  },
];

export const simulations = [
  {
    id: 'sim-monza',
    track: 'Circuit de Monza',
    description: 'Évaluation de la vitesse de pointe et de la stabilité au freinage sur le temple de la vitesse.',
    bestLap: '1:21.046',
    imageId: 'sim-monza',
  },
  {
    id: 'sim-spa',
    track: 'Spa-Francorchamps',
    description: 'Test d\'endurance et de performance sur un circuit technique et exigeant.',
    bestLap: '1:44.298',
    imageId: 'sim-spa',
  },
  {
    id: 'sim-generic',
    track: 'Analyse de compétence générale',
    description: 'Évaluez vos compétences de base en mécanique à travers une série de questions.',
    bestLap: null,
    imageId: 'tp-engine',
  },
]

export const students: Student[] = [];
