
export type Etape = {
  titre: string;
  duree: string;
  etapes: string[];
};

export type EtudePrelimText = {
  type: 'text';
  q: string;
  r: string; // Correct answer
};

export type EtudePrelimQCM = {
  type: 'qcm';
  q: string;
  options: string[];
  r: string; // Correct answer
};

export type EtudePrelim = EtudePrelimText | EtudePrelimQCM;

export type TP = {
  id: number;
  duree: string;
  titre: string;
  situation: string;
  objectif: string;
  materiel: string[];
  etudePrelim: EtudePrelim[];
  activitePratique: Etape[];
  securiteRangement: string[];
  pointsCles: string[];
};

function etape(titre: string, duree: string, etapes: string[]): Etape {
    return { titre, duree, etapes };
}

export const tpTerminale: Record<number, TP> = {
  301: {
    id: 301,
    duree: '2h30',
    titre: 'CA 301 • Contrôle des pressions. Recharge d\'une climatisation',
    situation: 'Un client se plaint que sa climatisation ne produit plus d\'air froid. Il demande un diagnostic complet et une intervention avant son départ en vacances. Vous devez prendre en charge le diagnostic du circuit de climatisation en respectant les normes environnementales.',
    objectif: 'Mesurer pressions HP/BP, diagnostiquer fuites, effectuer recharge et traçabilité fluide frigorigène. (Compétence C3.1)',
    materiel: ['Station clim agréée', 'Manomètres', 'Détecteur de fuites', 'Fluide R134a/R1234yf', 'EPIs', 'Fiches traçabilité'],
    etudePrelim: [
      { type: 'qcm', q: 'Quelle est la principale différence environnementale entre les fluides R134a et R1234yf ?', options: ['Le R1234yf est plus performant', 'Le R1234yf a un potentiel de réchauffement global (PRG) beaucoup plus faible', 'Le R134a est inflammable', 'Ils sont identiques'], r: 'Le R1234yf a un potentiel de réchauffement global (PRG) beaucoup plus faible' },
      { type: 'qcm', q: 'A 20°C, moteur à l\'arrêt, que doivent indiquer les manomètres HP et BP sur un circuit en bon état ?', options: ['HP=10 bar, BP=1 bar', 'Les deux pressions sont égales et correspondent à la pression de saturation du gaz (environ 5-6 bars)', 'HP=0 bar, BP=0 bar'], r: 'Les deux pressions sont égales et correspondent à la pression de saturation du gaz (environ 5-6 bars)' },
      { type: 'text', q: 'Pourquoi le tirage au vide du circuit avant la recharge est-il une étape absolument cruciale ? Citez deux raisons.', r: '1. Éliminer toute trace d\'humidité qui, mélangée au fluide, crée de l\'acidité et détruit le circuit. 2. Permettre un test d\'étanchéité : si le vide ne tient pas, il y a une fuite.' }
    ],
    activitePratique: [
      etape('Contrôles préalables', '30 min', [
        'Inspection visuelle: tuyaux, compresseur, condenseur.',
        'Branchement manomètres et relevé à l’arrêt.',
        'Test fuites (UV/électronique) sur jonctions.'
      ]),
      etape('Mesures en fonctionnement', '40 min', [
        'Démarrer moteur + clim MAX.',
        'Relever HP/BP à divers régimes.',
        'Observer embrayage compresseur et ventilateurs.'
      ]),
      etape('Recharge si nécessaire', '50 min', [
        'Raccorder station, tirage au vide, test étanchéité.',
        'Charger quantité constructeur avec traçabilité.',
        'Contrôle performances et températures.'
      ])
    ],
    securiteRangement: ['Gants et lunettes', 'Ventiler atelier', 'Traçabilité fluide obligatoire'],
    pointsCles: ['Pressions nominales', 'Étanchéité', 'Dossier réglementaire']
  },
  302: {
    id: 302,
    duree: '2h00',
    titre: 'CA 306 • Diagnostic et remplacement airbag',
    situation: 'Le témoin d\'airbag d\'un véhicule reste allumé en permanence. Le client s\'inquiète pour sa sécurité. Votre mission est de diagnostiquer le système de retenue programmée et de remplacer le composant défectueux en suivant un protocole de sécurité strict.',
    objectif: 'Appliquer procédures sécurité, déposer/reposer airbag, effacer défauts et valider. (Compétence C3.3)',
    materiel: ['Outil diag', 'Airbag neuf', 'Clé dynamométrique', 'EPIs'],
    etudePrelim: [
        { type: 'text', q: 'Pourquoi faut-il impérativement débrancher la batterie et attendre au moins 5 minutes avant toute intervention sur un système d\'airbag ?', r: 'Pour permettre aux condensateurs du calculateur d\'airbag de se décharger complètement, afin d\'éviter tout risque de déclenchement accidentel.'},
        { type: 'qcm', q: 'Comment doit-on manipuler et stocker un module d\'airbag non déployé ?', options: ['Face vers le bas pour le protéger', 'Coussin gonflable vers le haut, pour que le projectile parte vers le ciel en cas de déclenchement', 'Sur le côté pour plus de stabilité'], r: 'Coussin gonflable vers le haut, pour que le projectile parte vers le ciel en cas de déclenchement'},
        { type: 'text', q: 'Quelle est la procédure légale pour se débarrasser d\'un airbag déployé ou périmé ?', r: 'Il doit être neutralisé par un personnel habilité et éliminé via une filière de déchets pyrotechniques spécialisée et agréée.'}
    ],
    activitePratique: [
      etape('Préparation', '20 min', [
        'Débrancher batterie, attendre décharge.',
        'Lire codes défauts et sauvegarder.',
        'Accéder au module et déconnecter.'
      ]),
      etape('Dépose/repose', '50 min', [
        'Retirer airbag selon procédure.',
        'Contrôler connecteurs et câblage.',
        'Monter airbag neuf, couples respectés.'
      ]),
      etape('Validation', '30 min', [
        'Rebrancher, effacer défauts.',
        'Tester système via valise.',
        'Vérifier voyant TDB.'
      ])
    ],
    securiteRangement: ['Ne pas heurter airbag', 'Stocker face vers le haut', 'Filière agréée'],
    pointsCles: ['Attente 5 min', 'Couples serrage', 'Effacement défauts']
  },
   303: {
    id: 303,
    duree: '2h00',
    titre: 'CA 305 • Essuyage automatique des vitres. Allumage automatique',
    situation: 'Un client rapporte que ses essuie-glaces se déclenchent de manière aléatoire et que ses phares ne s\'allument plus automatiquement dans les tunnels. Vous devez diagnostiquer les capteurs de pluie et de luminosité.',
    objectif: 'Tester capteurs pluie/lumière, calibrer et valider. (Compétence C3.1)',
    materiel: ['Valise diag', 'Multimètre', 'Schéma', 'Vaporisateur'],
    etudePrelim: [
      { q: 'Comment fonctionne un capteur de pluie à infrarouge ?', r: 'Il émet un faisceau infrarouge qui est réfléchi par la surface intérieure du pare-brise. Les gouttes d\'eau modifient l\'angle de réflexion, ce qui est détecté par le capteur.', type: 'text' },
      { q: 'Pourquoi la zone du pare-brise devant le capteur doit-elle être impeccablement propre ?', r: 'Toute saleté, fissure ou bulle d\'air peut fausser la mesure de réflexion infrarouge et provoquer des déclenchements intempestifs ou une absence de détection.', type: 'text' },
      { q: 'À quoi sert la procédure de calibrage du capteur via la valise de diagnostic ?', r: 'Elle permet de définir le point "zéro" (pare-brise sec et propre) pour que le calculateur puisse interpréter correctement les variations de signal dues à la pluie.', type: 'text' }
    ],
    activitePratique: [
      etape('Essuyage auto', '40 min', [
        'Lire défauts capteur pluie.',
        'Tester alimentation et signal.',
        'Simuler pluie et observer réaction.'
      ]),
      etape('Feux auto', '40 min', [
        'Lire paramètres luminosité.',
        'Varier lumière et observer délais.',
        'Ajuster sensibilité si possible.'
      ]),
      etape('Étalonnage', '40 min', [
        'Lancer calibration via valise.',
        'Régler sensibilités.',
        'Valider sur conditions variées.'
      ])
    ],
    securiteRangement: ['Nettoyer pare-brise capteurs', 'Rebrancher connecteurs', 'Tracer paramètres'],
    pointsCles: ['Propreté zone', 'Calibration', 'Test réel']
  },
  304: {
    id: 304,
    duree: '1h30',
    titre: 'CA 303 • Reconnaissance des valves de roues',
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
    pointsCles: ['Apprentissage', 'Ordre roues', 'Pressions correctes']
  },
  305: {
    id: 305,
    duree: '2h00',
    titre: 'CA 311 • Phares au xénon',
    situation: 'Un client se plaint d\'un éclairage faible sur son véhicule équipé de phares au xénon. De plus, le faisceau semble trop bas. Vous devez diagnostiquer le système haute tension et le correcteur d\'assiette automatique.',
    objectif: 'Contrôler ballasts, ampoules, correcteur auto et réglage faisceau. (Compétence C3.2)',
    materiel: ['Valise diag', 'Régloscope', 'EPIs diélectriques'],
    etudePrelim: [
      { q: 'Quelle est la tension d\'amorçage d\'une ampoule au xénon et pourquoi est-elle si dangereuse ?', r: 'Environ 20 000 Volts. C\'est une tension mortelle qui nécessite des gants et des précautions d\'isolation.', type: 'text' },
      { q: 'Quel est le rôle du ballast ?', r: 'Il transforme le 12V du véhicule en haute tension pour l\'amorçage, puis régule le courant pour maintenir l\'arc lumineux.', type: 'text' },
      { q: 'Pourquoi le correcteur d\'assiette automatique est-il obligatoire avec les phares au xénon ?', r: 'Pour ajuster en temps réel la hauteur du faisceau en fonction de la charge du véhicule et éviter d\'éblouir les autres usagers.', type: 'text' }
    ],
    activitePratique: [
      etape('Sécurité/diag', '30 min', [
        'Batterie coupée avant ballast.',
        'Lire défauts xénon.',
        'Inspecter ampoules et câbles HT.'
      ]),
      etape('Contrôles', '40 min', [
        'Alim 12 V ballast OK.',
        'Test correcteur auto.',
        'Absence arc parasite.'
      ]),
      etape('Réglage', '20 min', [
        'Régloscope à 10 m.',
        'Ajuster hauteur/orientation.',
        'Valider coupure nette.'
      ])
    ],
    securiteRangement: ['Jamais manipuler sous tension', 'Élimination spécifique ampoules', 'Tracer réglage'],
    pointsCles: ['HT danger', 'Correcteur OK', 'Réglage anti-éblouissement']
  },
  306: {
    id: 306,
    duree: '3h00',
    titre: 'MTE 303 • Remplacement distribution et pompe à eau',
    situation: 'Un véhicule entre à l\'atelier pour son entretien majeur, incluant le remplacement préventif de la courroie de distribution et de la pompe à eau. L\'intervention demande une rigueur absolue pour garantir la fiabilité du moteur.',
    objectif: 'Respecter calage/couples et purge circuit. (Compétence C3.3)',
    materiel: ['Kit distri', 'Piges calage', 'Clé dynamométrique', 'LR'],
    etudePrelim: [
      { q: 'Sur un moteur DOHC (Double Arbre à Cames en Tête), pourquoi ne faut-il jamais faire tourner le vilebrequin si la courroie est déposée ?', r: 'Car les deux arbres à cames ne seraient plus synchronisés, et l\'un pourrait tourner librement, provoquant une collision entre les soupapes et les pistons.', type: 'text' },
      { q: 'Quel est le double objectif des deux tours moteur manuels effectués après la pose de la nouvelle courroie ?', r: '1. Vérifier qu\'il n\'y a aucun point dur ou blocage (contact soupape/piston). 2. S\'assurer que les repères de calage reviennent parfaitement à leur position initiale.', type: 'text' },
      { q: 'Quel est le risque de ne pas remplacer un galet tendeur lors du changement de la courroie ?', r: 'Le roulement du galet, ayant la même usure que la courroie, risque de gripper, de se bloquer ou de casser, provoquant la rupture de la courroie neuve et des dommages moteur graves.', type: 'text' }
    ],
    activitePratique: [
      etape('Calage', '30 min', [
        'Déposer carters.',
        'Repérer sens courroie.',
        'Mettre piges vilo/AAC.'
      ]),
      etape('Remplacement', '80 min', [
        'Changer galets et pompe.',
        'Poser courroie, tendre au procédé.',
        '2 tours moteur, recontrôle repères.'
      ]),
      etape('Finition', '30 min', [
        'Remplir/purger LR.',
        'Contrôler fuites/bruits.',
        'Tracer intervention.'
      ])
    ],
    securiteRangement: ['Batterie off', 'Couples stricts', 'Plans de joint propres'],
    pointsCles: ['Calage exact', 'Tension correcte', 'Purge LR']
  },
  307: {
    id: 307,
    duree: '1h45',
    titre: 'MA 305 • Relevé de pressions de suralimentation',
    situation: 'Un client rapporte une perte de puissance significative et un sifflement anormal à l\'accélération sur son moteur turbo. Vous êtes chargé de contrôler le circuit de suralimentation pour identifier la cause du problème.',
    objectif: 'Comparer pressions aux valeurs constructeur, identifier fuites/wastegate/VGT. (Compétence C3.4)',
    materiel: ['Mano turbo', 'Valise diag', 'T de dérivation', 'Fumigène'],
    etudePrelim: [
      { q: 'Quelle est la pression de suralimentation typique en pleine charge pour un moteur standard ?', r: 'Généralement entre 0.8 et 1.5 bar de pression relative (au-dessus de la pression atmosphérique).', type: 'text' },
      { q: 'Quelle est la différence fondamentale entre une wastegate et un turbo à géométrie variable (VGT) ?', r: 'La wastegate est une soupape qui libère les gaz d\'échappement pour limiter la vitesse du turbo. Le VGT modifie l\'angle des ailettes de la turbine pour optimiser la réponse à bas et haut régime.', type: 'text' },
      { q: 'Quels sont les symptômes d\'une fuite sur le circuit de suralimentation ?', r: 'Perte de puissance, sifflement, fumée noire à l\'échappement (mélange trop riche en carburant), et mise en sécurité du moteur (mode dégradé).', type: 'text' }
    ],
    activitePratique: [
      etape('Montage mano', '25 min', [
        'T sur durite admission.',
        'Sécuriser raccords.',
        'Brancher diag.'
      ]),
      etape('Mesures', '50 min', [
        'Ralenti ~0 bar.',
        'Charge progressive: relever max.',
        'Comparer RTA ±0,2 bar.',
        'Observer commande wastegate.'
      ]),
      etape('Fuites', '30 min', [
        'Fumigène durites/intercooler.',
        'Serrer colliers.',
        'Tester électrovanne commande.'
      ])
    ],
    securiteRangement: ['Remettre durite d’origine', 'Serrer colliers', 'Tracer relevés'],
    pointsCles: ['Pression cible', 'Fuites = perte', 'Commande OK']
  },
  308: {
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
    pointsCles: ['Pas d’air', 'Pression correcte', 'Filtre propre']
  },
  309: {
    id: 309,
    duree: '2h00',
    titre: 'L 307 • Diagnostic géométrie',
    situation: 'Le client se plaint que son véhicule tire à droite et que ses pneus avant s\'usent de manière irrégulière. Un diagnostic complet de la géométrie des trains roulants est nécessaire.',
    objectif: 'Mesurer et interpréter angles, régler parallélisme. (Compétence C3.4)',
    materiel: ['Banc géométrie 3D', 'Clés réglage', 'Fiche constructeur'],
    etudePrelim: [
      { q: 'Définissez brièvement : Parallélisme, Carrossage, Chasse.', r: 'Parallélisme: angle des roues dans le plan horizontal. Carrossage: inclinaison de la roue par rapport à la verticale. Chasse: inclinaison de l\'axe de pivot de la roue.', type: 'text' },
      { q: 'Un défaut de parallélisme (trop de pincement ou d\'ouverture) provoque quel type d\'usure sur les pneus ?', r: 'Une usure rapide et asymétrique sur les bords intérieurs ou extérieurs de la bande de roulement.', type: 'text' },
      { q: 'Pourquoi est-il crucial de vérifier les pressions des pneus et de les ajuster avant de commencer un contrôle de géométrie ?', r: 'Parce que des pressions incorrectes modifient la hauteur de caisse et l\'assiette du véhicule, ce qui fausse complètement toutes les mesures d\'angles.', type: 'text' }
    ],
    activitePratique: [
      etape('Préparation', '20 min', [
        'Pressions et jeux OK.',
        'Capteurs montés.',
        'Volant centré.'
      ]),
      etape('Mesures', '50 min', [
        'Compensation jantes.',
        'Lecture valeurs AV/AR.',
        'Comparer aux tolérances.'
      ]),
      etape('Réglages', '40 min', [
        'Ajuster biellettes AV (et AR si possible).',
        'Itérer jusqu’en vert.',
        'Centrer volant.'
      ]),
      etape('Validation', '10 min', [
        'Re-mesure complète.',
        'Imprimer avant/après.',
        'Essai court.'
      ])
    ],
    securiteRangement: ['Descendre du banc', 'Ranger capteurs', 'Archiver fiches'],
    pointsCles: ['Pressions base', 'Symétrie G/D', 'Réglage fin']
  },
  310: {
    id: 310,
    duree: '2h30',
    titre: 'MA 303 • Diagnostic système injection diesel',
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
    pointsCles: ['Pression rampe clé', 'Codes + PIDs', 'Actionneurs confirment']
  },
  311: {
    id: 311,
    duree: '2h00',
    titre: 'MP 303 • Diagnostic et mesures de paramètres antipollution',
    situation: 'Le véhicule a été refusé au contrôle technique pour pollution excessive. Vous devez diagnostiquer les systèmes antipollution (lambda, EGR, FAP) pour trouver la cause et valider la conformité après réparation.',
    objectif: 'Mesurer émissions et vérifier fonctionnement des organes. (Compétence C3.2)',
    materiel: ['Analyseur 4/5 gaz', 'Opacimètre', 'Valise diag', 'Thermo IR'],
    etudePrelim: [
      { q: 'Quel est le rôle d\'un catalyseur 3 voies ? Et celui des sondes lambda amont et aval ?', r: 'Le catalyseur transforme les gaz nocifs (CO, HC, NOx) en gaz inoffensifs. La sonde amont mesure l\'oxygène pour réguler le mélange. La sonde aval vérifie l\'efficacité du catalyseur.', type: 'text' },
      { q: 'Qu\'est-ce que la régénération du FAP et pourquoi est-elle nécessaire ?', r: 'C\'est une procédure qui consiste à augmenter la température des gaz d\'échappement pour brûler les particules de suie accumulées dans le Filtre À Particules, afin d\'éviter son colmatage.', type: 'text' },
      { q: 'Quel est le risque de supprimer ou de "défapper" un véhicule ?', r: 'C\'est illégal, très polluant, et le véhicule sera systématiquement refusé au contrôle technique. Cela peut aussi entraîner des pannes moteur.', type: 'text' }
    ],
    activitePratique: [
      etape('Analyse gaz', '40 min', [
        'Moteur chaud.',
        'Mesures ralenti + 2500 tr/min.',
        'Comparer normes et interpréter.'
      ]),
      etape('Sondes/EGR/FAP', '45 min', [
        'Lambda amont oscille, aval stable.',
        'Test EGR (commande/position).',
        'Lecture taux suie FAP, ΔP, régénération forcée si besoin.'
      ]),
      etape('Conclusion', '15 min', [
        'Déterminer organe en cause.',
        'Préconiser réparation.',
        'Tracer.'
      ])
    ],
    securiteRangement: ['Ventilation atelier', 'Précautions température', 'Archiver mesures'],
    pointsCles: ['Normes respectées', 'Lambda/EGR', 'FAP OK']
  },
  312: {
    id: 312,
    duree: '2h00',
    titre: 'UE 304 • Utilisation d\'un oscilloscope',
    situation: 'Pour diagnostiquer des pannes électroniques complexes, la maîtrise de l\'oscilloscope est indispensable. Cet atelier vise à vous former à la capture et à l\'analyse de signaux électriques automobiles.',
    objectif: 'Paramétrer, capter et interpréter des signaux capteurs/actionneurs. (Compétence C3.3)',
    materiel: ['Oscilloscope', 'Sondes diff', 'Pince ampèremétrique', 'Schémas'],
    etudePrelim: [
      { q: 'Quelle est la différence fondamentale d\'information entre un multimètre affichant "5V" et un oscilloscope affichant un signal ?', r: 'Le multimètre donne une valeur moyenne ou efficace à un instant T. L\'oscilloscope montre l\'évolution de cette tension dans le temps, révélant sa forme, sa fréquence et d\'éventuelles anomalies (parasites).', type: 'text' },
      { q: 'À quoi servent les réglages "base de temps" et "Volts/division" ?', r: 'La base de temps (axe X) ajuste la "fenêtre" de temps visualisée. Les Volts/division (axe Y) ajustent l\'échelle de tension pour que le signal soit visible à l\'écran.', type: 'text' },
      { q: 'Quel est le rôle du "trigger" (déclenchement) ?', r: 'Il stabilise l\'affichage en démarrant la capture du signal toujours au même niveau de tension, évitant que le signal ne "défile" de manière illisible sur l\'écran.', type: 'text' }
    ],
    activitePratique: [
      etape('Réglages', '25 min', [
        'Signal carré interne.',
        'Ajuster temps/tension.',
        'Stabiliser trigger.'
      ]),
      etape('Capteurs', '45 min', [
        'PMH (inductif/Hall).',
        'Lambda amont oscillante.',
        'AAC (forme, amplitude).'
      ]),
      etape('Actionneurs', '30 min', [
        'Commande injecteur (temps ouverture).',
        'PWM ventilateur/EGR.',
        'Repérer anomalies.'
      ]),
      etape('Interprétation', '20 min', [
        'Comparer références.',
        'Identifier défauts.',
        'Sauvegarder captures.'
      ])
    ],
    securiteRangement: ['Protéger sondes', 'Ne pas dépasser Vmax', 'Sauvegarder et ranger'],
    pointsCles: ['Réglages nets', 'Trigger stable', 'Lecture formes']
  },
  313: {
    id: 313,
    duree: '2h00',
    titre: 'MA 306 • Contrôle des injecteurs moteur à rampe commune 1',
    situation: 'Un moteur Common Rail claque et fume. Le chef d\'atelier vous missionne pour la première phase du diagnostic injecteur : les contrôles électriques et l\'analyse des retours de fuite.',
    objectif: 'Mesurer résistances, contrôler retours et étanchéité. (Compétence C3.1)',
    materiel: ['Multimètre', 'Éprouvettes', 'Valise diag', 'Chiffons'],
    etudePrelim: [
      { q: 'Quelle est la plage de résistance typique pour une bobine d\'injecteur (piézoélectrique vs électromagnétique) ?', r: 'Électromagnétique : environ 0,2 à 0,5 Ω. Piézoélectrique : environ 150 à 200 kΩ. Une valeur hors tolérance indique un défaut interne.', type: 'text' },
      { q: 'Pourquoi un retour de fuite excessif sur un injecteur peut-il empêcher le moteur de démarrer ?', r: 'Parce que la fuite est si importante que la pompe HP ne parvient pas à faire monter la pression dans la rampe commune au niveau requis pour le démarrage.', type: 'text' },
      { q: 'Quel test simple permet de vérifier l\'isolation électrique d\'un injecteur ?', r: 'Mesurer la résistance entre chaque borne de l\'injecteur et sa masse (corps métallique). La valeur doit être infinie (OL), sinon l\'injecteur est en court-circuit.', type: 'text' }
    ],
    activitePratique: [
      etape('Tests électriques', '40 min', [
        'Résistance bobine.',
        'Isolation masse.',
        'Commande calculateur (oscillo).'
      ]),
      etape('Retours gasoil', '50 min', [
        'Éprouvettes sur retours.',
        'Ralenti 30 s, mesurer volumes.',
        'Écart >30% = injecteur en cause.'
      ]),
      etape('Fuites externes', '30 min', [
        'Joints, suintements.',
        'Serrages et tuyaux HP.',
        'Tracer.'
      ])
    ],
    securiteRangement: ['Protéger zone', 'Éliminer gasoil', 'Tracer injecteurs'],
    pointsCles: ['Retours homogènes', 'Isolation OK', 'Joints sains']
  },
  314: {
    id: 314,
    duree: '2h00',
    titre: 'MA 311 • Contrôle des injecteurs moteur à rampe commune 2',
    situation: 'Suite au diagnostic précédent, un injecteur a été identifié comme défectueux. Vous devez le déposer, le tester sur banc, et coder le nouvel injecteur dans le calculateur moteur.',
    objectif: 'Mesurer débits/étanchéité sur banc et coder corrections (IMA/IQA). (Compétence C3.4)',
    materiel: ['Banc injecteurs', 'Éprouvettes', 'Valise diag', 'RTA'],
    etudePrelim: [
      { q: 'À quoi correspond le code IMA/IQA gravé sur un injecteur neuf ?', r: 'C\'est un code de correction qui décrit les caractéristiques précises de cet injecteur (débit, temps de réponse). Il permet au calculateur d\'ajuster sa commande pour un fonctionnement optimal.', type: 'text' },
      { q: 'Quels sont les différents débits mesurés lors d\'un test au banc ?', r: 'On mesure le débit principal, le débit de pré-injection, le débit de pleine charge et le retour de fuite à différentes pressions.', type: 'text' },
      { q: 'Que se passe-t-il si on monte un injecteur neuf sans le coder dans le calculateur ?', r: 'Le moteur peut mal tourner, claquer, fumer ou manquer de puissance car le calculateur utilise les corrections de l\'ancien injecteur, qui ne sont pas adaptées au nouveau.', type: 'text' }
    ],
    activitePratique: [
      etape('Dépose', '30 min', [
        'Dépressuriser rampe.',
        'Déposer injecteurs, nettoyer logements.',
        'Préparer joints neufs.'
      ]),
      etape('Tests banc', '60 min', [
        'Monter injecteur, lancer séquences.',
        'Mesurer débits et pulvérisation.',
        'Tester étanchéité.'
      ]),
      etape('Codage', '30 min', [
        'Relever codes IMA/IQA.',
        'Programmer dans ECU.',
        'Effacer défauts et valider.'
      ])
    ],
    securiteRangement: ['Joints neufs', 'Purge HP', 'Ranger banc'],
    pointsCles: ['Débit homogène', 'Codage fait', 'Étanchéité OK']
  },
  315: {
    id: 315,
    duree: '2h30',
    titre: 'F 307 • Diagnostic du système ABS (contrôle des éléments)',
    situation: 'Le témoin ABS est allumé. Le client signale une sensation étrange à la pédale. Vous devez mener un diagnostic complet pour assurer la sécurité du système de freinage antiblocage.',
    objectif: 'Identifier défauts par codes, mesures et tests actionneurs. (Compétence C3.2)',
    materiel: ['Valise ABS', 'Multimètre', 'Oscillo', 'Banc freinage'],
    etudePrelim: [
      { q: 'Quel est le rôle des capteurs de roue dans le système ABS ?', r: 'Ils mesurent la vitesse de rotation de chaque roue en temps réel et transmettent cette information au calculateur ABS pour qu\'il détecte tout début de blocage.', type: 'text' },
      { q: 'Quelle est la différence de signal entre un capteur ABS passif (inductif) et actif (magnéto-résistif ou à effet Hall) ?', r: 'Passif: génère un signal sinusoïdal dont la fréquence et l\'amplitude varient avec la vitesse. Actif: génère un signal carré de tension constante, dont seule la fréquence varie.', type: 'text' },
      { q: 'Que se passe-t-il lors de l\'auto-test du système ABS au démarrage (vers 15-20 km/h) ?', r: 'Le calculateur active brièvement la pompe hydraulique et les électrovannes pour vérifier leur fonctionnement, ce qui peut causer un bruit et une vibration perceptibles.', type: 'text' }
    ],
    activitePratique: [
      etape('Codes/figées', '25 min', [
        'Lire codes ABS/ESP.',
        'Analyser données figées.',
        'Effacement et re-test.'
      ]),
      etape('Capteurs', '50 min', [
        'Résistances et jeux capteur/couronne.',
        'Signal en rotation (oscillo).',
        'Continuité faisceaux.'
      ]),
      etape('Hydraulique', '40 min', [
        'Activer électrovannes.',
        'Tester moteur pompe.',
        'Mesurer alim relais.'
      ]),
      etape('Validation', '35 min', [
        'Essai ou banc.',
        'Vérifier voyant.',
        'Tracer résultats.'
      ])
    ],
    securiteRangement: ['Roues calées', 'Électricité sécurisée', 'Tracer'],
    pointsCles: ['Capteurs cohérents', 'Actionneurs OK', 'Voyant OFF']
  },
  316: {
    id: 316,
    duree: '2h00',
    titre: 'L 311 • Direction assistée électrique et hydraulique',
    situation: 'Un client se plaint d\'une direction dure par moments et de bruits au braquage. Vous devez identifier le type de direction assistée (hydraulique ou électrique) et mener le diagnostic approprié.',
    objectif: 'Identifier système, lire codes, mesurer pression/params et valider. (Compétence C3.4)',
    materiel: ['Valise DAE', 'Mano 0–150 bar', 'Multimètre', 'Fluide DA'],
    etudePrelim: [
      { q: 'Listez deux avantages de la direction assistée électrique (DAE) par rapport à l\'hydraulique.', r: '1. Économie de carburant (pas de pompe entraînée en permanence). 2. Possibilité d\'assistances variables et de fonctions avancées (parking auto, maintien de voie).', type: 'text' },
      { q: 'Quel est le rôle du capteur d\'angle volant dans un système DAE ?', r: 'Il informe le calculateur de la position et de la vitesse de rotation du volant pour ajuster le niveau d\'assistance en temps réel.', type: 'text' },
      { q: 'Quelle est la pression maximale typique dans un circuit de direction assistée hydraulique, atteinte en butée de braquage ?', r: 'Environ 100 à 140 bars.', type: 'text' }
    ],
    activitePratique: [
      etape('Identification', '20 min', [
        'Type système et lecture codes.',
        'Voyant et comportement.',
        'Niveau fluide si hydraulique.'
      ]),
      etape('Hydraulique', '40 min', [
        'Fuites pompe/crémaillère.',
        'Pression au mano (100–140 bar braqué).',
        'Courroie et bruits.'
      ]),
      etape('DAE', '50 min', [
        'Paramètres: angle/couple/vitesse.',
        'Assistance variable.',
        'Alimentation moteur DAE.',
        'Étalonnage angle volant si besoin.'
      ]),
      etape('Validation', '10 min', [
        'Essai route et centrage.',
        'Effacement défauts.',
        'Tracer.'
      ])
    ],
    securiteRangement: ['Compléter fluide', 'Serrer raccords', 'Ranger mano'],
    pointsCles: ['Type identifié', 'Pression OK', 'Capteurs étalonnés']
  },
  317: {
    id: 317,
    duree: '2h00',
    titre: 'L 312 • Diagnostiquer un système de suspension pilotée',
    situation: 'Le véhicule, équipé d\'une suspension pilotée, est "bloqué" en position basse ou présente un confort très dégradé. Votre mission est de diagnostiquer le système électronique et pneumatique/hydraulique.',
    objectif: 'Diagnostiquer via codes/paramètres, tester actionneurs, valider comportement dynamique. (Compétence C3.3)',
    materiel: ['Valise suspension', 'Mano pneumatique', 'Multimètre', 'Schéma'],
    etudePrelim: [
      { q: 'Citez deux types de technologies de suspension pilotée.', r: '1. Suspension pneumatique (soufflets d\'air). 2. Suspension hydropneumatique (sphères hydrauliques). 3. Amortisseurs magnéto-rhéologiques (fluidité variable).', type: 'text' },
      { q: 'Quel est le rôle des capteurs d\'assiette ?', r: 'Ils mesurent la hauteur de chaque coin du véhicule pour permettre au calculateur de corriger l\'assiette en fonction de la charge et de la route.', type: 'text' },
      { q: 'Dans un système pneumatique, quel composant est responsable de la production d\'air comprimé ?', r: 'Le compresseur de suspension.', type: 'text' }
    ],
    activitePratique: [
      etape('Diagnostic initial', '30 min', [
        'Lire codes calculateur.',
        'Observer assiettes AV/AR et pressions.',
        'Contrôle visuel fuites et connexions.'
      ]),
      etape('Tests capteurs', '35 min', [
        'Mesurer capteurs assiette.',
        'Contrôler capteurs d’accélération.',
        'Vérifier alimentations/signaux.'
      ]),
      etape('Tests actionneurs', '40 min', [
        'Activer électrovannes amortisseurs.',
        'Tester compresseur pneumatique (pression/temps).',
        'Contrôler électrovannes soufflets.',
        'Mesurer pression circuit (6–16 bar).',
        'Contrôler fuites.'
      ]),
      etape('Validation dynamique', '15 min', [
        'Essai route: changer de mode.',
        'Observer fermeté/correction assiette.',
        'Vérifier absence défauts.',
        'Tracer paramètres.'
      ])
    ],
    securiteRangement: ['Dépressuriser avant intervention', 'Protéger soufflets', 'Ranger outils'],
    pointsCles: ['Modes fonctionnels', 'Correction active', 'Pas de fuites']
  },
  318: {
    id: 318,
    duree: '2h30',
    titre: 'T 307 • Diagnostic BV robotisée',
    situation: 'Les vitesses passent mal sur une boîte robotisée : passages lents, à-coups, ou blocage sur un rapport. Vous devez diagnostiquer le système de commande électro-hydraulique et effectuer les apprentissages nécessaires.',
    objectif: 'Lire paramètres, tester actionneurs, réaliser apprentissages et valider passages. (Compétence C3.4)',
    materiel: ['Valise constructeur', 'Multimètre', 'Schéma BV robotisée', 'EPIs'],
    etudePrelim: [
      { q: 'Quelle est la différence majeure entre une boîte robotisée et une boîte automatique classique à convertisseur ?', r: 'La boîte robotisée est une boîte manuelle sur laquelle des actionneurs électro-hydrauliques gèrent l\'embrayage et le passage des rapports. La boîte auto a un convertisseur de couple hydraulique et des trains épicycloïdaux.', type: 'text' },
      { q: 'À quoi sert la procédure d\'apprentissage du "point de léchage" (ou point de contact) de l\'embrayage ?', r: 'Elle permet au calculateur de connaître précisément le point où l\'embrayage commence à "mordre" pour assurer des démarrages et des passages de vitesse doux et sans à-coups.', type: 'text' },
      { q: 'Quels capteurs sont essentiels au bon fonctionnement d\'une boîte robotisée ?', r: 'Les capteurs de position des actionneurs de sélection et d\'engagement, le capteur de position de l\'embrayage, et les capteurs de vitesse d\'entrée/sortie de boîte.', type: 'text' }
    ],
    activitePratique: [
      etape('Diagnostic initial', '30 min', [
        'Connexion valise et lecture codes.',
        'Observer PIDs (position, couple).',
        'Analyser données figées.'
      ]),
      etape('Tests actionneurs', '60 min', [
        'Activer embrayage électro-hydraulique.',
        'Tester sélecteurs 1→6.',
        'Mesurer tensions/résistances capteurs.',
        'Tester électrovannes.'
      ]),
      etape('Procédures spécifiques', '40 min', [
        'Apprentissage point de touche.',
        'Purge circuit si besoin.',
        'Validation banc/route.'
      ]),
      etape('Validation', '20 min', [
        'Tester tous les rapports.',
        'Vérifier douceur passages.',
        'Contrôler retour codes.',
        'Tracer opérations.'
      ])
    ],
    securiteRangement: ['Véhicule calé', 'Procédures constructeur', 'Limiter sollicitations', 'Ranger outils'],
    pointsCles: ['PIDs essentiels', 'Apprentissage obligatoire', 'Actionneurs OK']
  }
};

    
