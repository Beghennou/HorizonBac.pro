export type Etape = {
  titre: string;
  duree: string;
  etapes: string[];
};

export type EtudePrelim = {
    q: string;
    r: string;
};

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
  100: {
    id: 100,
    duree: '2h30',
    titre: 'CA 301 • Contrôle des pressions. Recharge d\'une climatisation',
    situation: 'Contrôle du bon fonctionnement du circuit de climatisation et procédure de recharge selon normes environnementales.',
    objectif: 'Mesurer pressions HP/BP, diagnostiquer fuites, effectuer recharge et traçabilité fluide frigorigène.',
    materiel: ['Station clim agréée', 'Manomètres', 'Détecteur de fuites', 'Fluide R134a/R1234yf', 'EPIs', 'Fiches traçabilité'],
    etudePrelim: [
      { q: 'Différence R134a vs R1234yf (environnement, pression, sécurité) ?', r: '' },
      { q: 'Plages de pression HP/BP à 20°C ?', r: '' },
      { q: 'Obligations légales récupération et traçabilité ?', r: '' }
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
  200: {
    id: 200,
    duree: '2h00',
    titre: 'CA 306 • Diagnostic et remplacement airbag',
    situation: 'Diagnostic et remplacement d’un airbag suite à déclenchement ou défaut.',
    objectif: 'Appliquer procédures sécurité, déposer/reposer airbag, effacer défauts et valider.',
    materiel: ['Outil diag', 'Airbag neuf', 'Clé dynamométrique', 'EPIs'],
    etudePrelim: [
      { q: 'Pourquoi débrancher batterie et attendre 5 minutes ?', r: '' },
      { q: 'Risques générateurs pyrotechniques ?', r: '' },
      { q: 'Recyclage airbag déployé ?', r: '' }
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
  300: {
    id: 300,
    duree: '2h00',
    titre: 'CA 305 • Essuyage automatique des vitres. Allumage automatique',
    situation: 'Diagnostic des systèmes essuyage automatique et allumage auto des feux.',
    objectif: 'Tester capteurs pluie/lumière, calibrer et valider.',
    materiel: ['Valise diag', 'Multimètre', 'Schéma', 'Vaporisateur'],
    etudePrelim: [
      { q: 'Principe capteur de pluie (IR/réflexion) ?', r: '' },
      { q: 'Seuils déclenchement capteur crépusculaire ?', r: '' },
      { q: 'Localisation et propreté zone capteur ?', r: '' }
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
  400: {
    id: 400,
    duree: '1h30',
    titre: 'CA 303 • Reconnaissance des valves de roues',
    situation: 'Identification et diagnostic des valves TPMS.',
    objectif: 'Appairer capteurs, remplacer valve défectueuse et valider pressions.',
    materiel: ['Outil TPMS', 'Valise diag', 'Manomètre', 'Valves neuves'],
    etudePrelim: [
      { q: 'TPMS direct vs indirect ?', r: '' },
      { q: 'Procédure apprentissage ?', r: '' },
      { q: 'Durée de vie pile capteur ?', r: '' }
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
  500: {
    id: 500,
    duree: '2h00',
    titre: 'CA 311 • Phares au xénon',
    situation: 'Diagnostic et réglage des phares au xénon.',
    objectif: 'Contrôler ballasts, ampoules, correcteur auto et réglage faisceau.',
    materiel: ['Valise diag', 'Régloscope', 'EPIs diélectriques'],
    etudePrelim: [
      { q: 'Tension d’amorçage xénon (~20 kV) ?', r: '' },
      { q: 'Rôle ballast et risques HT ?', r: '' },
      { q: 'Pourquoi correcteur auto obligatoire ?', r: '' }
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
  600: {
    id: 600,
    duree: '3h00',
    titre: 'MTE 303 • Remplacement distribution et pompe à eau',
    situation: 'Remplacement distribution + pompe à eau.',
    objectif: 'Respecter calage/couples et purge circuit.',
    materiel: ['Kit distri', 'Piges calage', 'Clé dynamométrique', 'LR'],
    etudePrelim: [
      { q: 'Pourquoi ne pas tourner vilebrequin seul en DOHC ?', r: '' },
      { q: 'Repères PMH/AAC et sens courroie ?', r: '' },
      { q: 'Couples critiques (tendeur, vilo, AAC) ?', r: '' }
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
  700: {
    id: 700,
    duree: '1h45',
    titre: 'MA 305 • Relevé de pressions de suralimentation',
    situation: 'Relevé/analyse pressions de suralimentation.',
    objectif: 'Comparer pressions aux valeurs constructeur, identifier fuites/wastegate/VGT.',
    materiel: ['Mano turbo', 'Valise diag', 'T de dérivation', 'Fumigène'],
    etudePrelim: [
      { q: 'Pression turbo typique pleine charge ?', r: '' },
      { q: 'Rôle wastegate/VGT ?', r: '' },
      { q: 'Symptômes fuite suralimentation ?', r: '' }
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
  800: {
    id: 800,
    duree: '2h00',
    titre: 'MA 307 • Contrôle du circuit basse pression diesel',
    situation: 'Contrôle basse pression gasoil jusqu’à pompe HP.',
    objectif: 'Mesurer pression/dépression, détecter bulles et colmatage.',
    materiel: ['Mano BP', 'Tuyau transparent', 'Filtre gasoil', 'Valise diag'],
    etudePrelim: [
      { q: 'Pression gavage typique (3–6 bar) ?', r: '' },
      { q: 'Effet air dans circuit ?', r: '' },
      { q: 'Rôle clapet anti-retour ?', r: '' }
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
    securiteRangement: ['Nettoyer gasoil', 'Élimination déchets', 'Tracer'],
    pointsCles: ['Pas d’air', 'Pression correcte', 'Filtre propre']
  },
  900: {
    id: 900,
    duree: '2h00',
    titre: 'L 307 • Diagnostic géométrie',
    situation: 'Diagnostic géométrie trains roulants.',
    objectif: 'Mesurer et interpréter angles, régler parallélisme.',
    materiel: ['Banc géométrie 3D', 'Clés réglage', 'Fiche constructeur'],
    etudePrelim: [
      { q: 'Définir parallélisme, carrossage, chasse, pivot ?', r: '' },
      { q: 'Effets mauvais parallélisme ?', r: '' },
      { q: 'Pressions pneus et charge standard ?', r: '' }
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
  1000: {
    id: 1000,
    duree: '2h30',
    titre: 'MA 303 • Diagnostic système injection diesel',
    situation: 'Diagnostic injection diesel common rail.',
    objectif: 'Analyser codes/paramètres, tester actionneurs et conclure.',
    materiel: ['Valise diag', 'Multimètre', 'Mano rampe', 'Oscilloscope', 'RTA'],
    etudePrelim: [
      { q: 'Pression rampe au ralenti/charge ?', r: '' },
      { q: 'Rôle régulateur rampe (IMV/MPROP) ?', r: '' },
      { q: 'Signes injecteur défectueux ?', r: '' }
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
  1100: {
    id: 1100,
    duree: '2h00',
    titre: 'MP 303 • Diagnostic et mesures de paramètres antipollution',
    situation: 'Diagnostic dispositifs antipollution (lambda, EGR, catalyseur, FAP).',
    objectif: 'Mesurer émissions et vérifier fonctionnement des organes.',
    materiel: ['Analyseur 4/5 gaz', 'Opacimètre', 'Valise diag', 'Thermo IR'],
    etudePrelim: [
      { q: 'Limites Euro CO/HC/NOx (essence/diesel) ?', r: '' },
      { q: 'Rôle catalyseur 3 voies + sondes amont/aval ?', r: '' },
      { q: 'Principe régénération FAP ?', r: '' }
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
  1200: {
    id: 1200,
    duree: '2h00',
    titre: 'UE 304 • Utilisation d\'un oscilloscope',
    situation: 'Prise en main oscilloscope automobile.',
    objectif: 'Paramétrer, capter et interpréter des signaux capteurs/actionneurs.',
    materiel: ['Oscilloscope', 'Sondes diff', 'Pince ampèremétrique', 'Schémas'],
    etudePrelim: [
      { q: 'Différence multimètre vs oscilloscope ?', r: '' },
      { q: 'Base de temps, V/div, trigger ?', r: '' },
      { q: 'Exemples signaux (PMH, injecteur, lambda) ?', r: '' }
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
  1300: {
    id: 1300,
    duree: '2h00',
    titre: 'MA 306 • Contrôle des injecteurs moteur à rampe commune 1',
    situation: 'Contrôle injecteurs common rail — partie 1 (électrique/retours).',
    objectif: 'Mesurer résistances, contrôler retours et étanchéité.',
    materiel: ['Multimètre', 'Éprouvettes', 'Valise diag', 'Chiffons'],
    etudePrelim: [
      { q: 'Résistance bobine piézo/électro (Ω) ?', r: '' },
      { q: 'Symptômes fuite injecteur ?', r: '' },
      { q: 'Pourquoi mesurer retours ?', r: '' }
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
  1400: {
    id: 1400,
    duree: '2h00',
    titre: 'MA 311 • Contrôle des injecteurs moteur à rampe commune 2',
    situation: 'Contrôle injecteurs common rail — partie 2 (banc et codage).',
    objectif: 'Mesurer débits/étanchéité sur banc et coder corrections (IMA/IQA).',
    materiel: ['Banc injecteurs', 'Éprouvettes', 'Valise diag', 'RTA'],
    etudePrelim: [
      { q: 'Pression/durée test banc ?', r: '' },
      { q: 'Tolérance débit (±5%) ?', r: '' },
      { q: 'Codage IMA/IQA: rôle ?', r: '' }
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
  1500: {
    id: 1500,
    duree: '2h30',
    titre: 'F 307 • Diagnostic du système ABS (contrôle des éléments)',
    situation: 'Diagnostic complet ABS: capteurs, ECU, groupe hydraulique et essais.',
    objectif: 'Identifier défauts par codes, mesures et tests actionneurs.',
    materiel: ['Valise ABS', 'Multimètre', 'Oscillo', 'Banc freinage'],
    etudePrelim: [
      { q: 'Rôle ABS/capteurs roue ?', r: '' },
      { q: 'Valeurs capteurs passifs/actifs ?', r: '' },
      { q: 'Auto-test au démarrage ?', r: '' }
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
  1600: {
    id: 1600,
    duree: '2h00',
    titre: 'L 311 • Direction assistée électrique et hydraulique',
    situation: 'Direction assistée électrique/hydraulique: découverte et diag.',
    objectif: 'Identifier système, lire codes, mesurer pression/params et valider.',
    materiel: ['Valise DAE', 'Mano 0–150 bar', 'Multimètre', 'Fluide DA'],
    etudePrelim: [
      { q: 'Hydraulique vs électrique ?', r: '' },
      { q: 'Capteurs DAE (angle, couple, vitesse) ?', r: '' },
      { q: 'Pression hydraulique typique braqué ?', r: '' }
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
  1700: {
    id: 1700,
    duree: '2h00',
    titre: 'L 312 • Diagnostiquer un système de suspension pilotée',
    situation: 'Suspension pilotée (amortissement variable/pneumatique).',
    objectif: 'Diagnostiquer via codes/paramètres, tester actionneurs, valider comportement dynamique.',
    materiel: ['Valise suspension', 'Mano pneumatique', 'Multimètre', 'Schéma'],
    etudePrelim: [
      { q: 'Types de suspension pilotée ?', r: '' },
      { q: 'Rôle capteurs d’assiette/accélération ?', r: '' },
      { q: 'Modes confort/sport/auto/rehausse ?', r: '' }
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
  1800: {
    id: 1800,
    duree: '2h30',
    titre: 'T 307 • Diagnostic BV robotisée',
    situation: 'BV robotisée: commande embrayage et sélection pilotée.',
    objectif: 'Lire paramètres, tester actionneurs, réaliser apprentissages et valider passages.',
    materiel: ['Valise constructeur', 'Multimètre', 'Schéma BV robotisée', 'EPIs'],
    etudePrelim: [
      { q: 'Différence robotisée vs auto classique ?', r: '' },
      { q: 'Rôle ECU BV et capteurs position ?', r: '' },
      { q: 'Procédure apprentissage point de débrayage ?', r: '' }
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
});

window.TITRES = window.TITRES || {};
Object.assign(window.TITRES, TITRES_TERM);