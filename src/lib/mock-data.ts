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

export const students = [
  {
    id: 'student-1',
    name: 'Alex Dubois',
    email: 'alex.dubois@school.com',
    avatar: '/avatars/01.png',
    progress: 85,
    lastActive: 'Hier',
    performanceData: `Résultats TP Aérodynamique : 92%
Résultats TP Moteur : 78%
Simulation Monza : 1:22.503
Forces : Très bonne compréhension des principes aérodynamiques. Rapide en ligne droite.
Faiblesses : Difficultés à maintenir une vitesse constante dans les virages longs. Tendance à freiner trop tard.`,
  },
  {
    id: 'student-2',
    name: 'Léa Martin',
    email: 'lea.martin@school.com',
    avatar: '/avatars/02.png',
    progress: 72,
    lastActive: 'Il y a 3 jours',
    performanceData: `Résultats TP Suspension : 88%
Résultats TP Stratégie : 65%
Simulation Spa : 1:46.112
Forces : Excellente gestion de l'usure des pneus. Trajectoires très précises.
Faiblesses : Manque de réactivité aux changements météo. Prise de décision sous pression à améliorer.`,
  },
  {
    id: 'student-3',
    name: 'Omar Cissé',
    email: 'omar.cisse@school.com',
    avatar: '/avatars/03.png',
    progress: 91,
    lastActive: 'Aujourd\'hui',
    performanceData: `Résultats TP Moteur : 95%
Résultats TP Données : 90%
Simulation Monza : 1:21.890
Forces : Optimisation moteur exceptionnelle. Analyse de la télémétrie très fine.
Faiblesses : Agressivité en piste menant à des collisions occasionnelles.`,
  },
    {
    id: 'student-4',
    name: 'Clara Petit',
    email: 'clara.petit@school.com',
    avatar: '/avatars/04.png',
    progress: 68,
    lastActive: 'Il y a 1 semaine',
    performanceData: `Résultats TP Aérodynamique : 70%
Résultats TP Suspension : 65%
Simulation Spa : 1:48.320
Forces : Pilotage fluide et régulier.
Faiblesses : Manque de vitesse pure. Difficulté à exploiter tout le potentiel de la voiture.`,
  },
];
