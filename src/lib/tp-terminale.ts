
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
  301: {
    id: 301,
    duree: '2h30',
    titre: 'CA 301 • Contrôle des pressions. Recharge d\'une climatisation',
    situation: 'Un client se plaint que sa climatisation ne produit plus d\'air froid. Il demande un diagnostic complet et une intervention avant son départ en vacances. Vous devez prendre en charge le diagnostic du circuit de climatisation en respectant les normes environnementales.',
    objectif: 'Mesurer pressions HP/BP, diagnostiquer fuites, effectuer recharge et traçabilité fluide frigorigène. (Compétence C3.1)',
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
  302: {
    id: 302,
    duree: '2h00',
    titre: 'CA 306 • Diagnostic et remplacement airbag',
    situation: 'Le témoin d\'airbag d\'un véhicule reste allumé en permanence. Le client s\'inquiète pour sa sécurité. Votre mission est de diagnostiquer le système de retenue programmée et de remplacer le composant défectueux en suivant un protocole de sécurité strict.',
    objectif: 'Appliquer procédures sécurité, déposer/reposer airbag, effacer défauts et valider. (Compétence C3.3)',
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
  303: {
    id: 303,
    duree: '2h00',
    titre: 'CA 305 • Essuyage automatique des vitres. Allumage automatique',
    situation: 'Un client rapporte que ses essuie-glaces se déclenchent de manière aléatoire et que ses phares ne s\'allument plus automatiquement dans les tunnels. Vous devez diagnostiquer les capteurs de pluie et de luminosité.',
    objectif: 'Tester capteurs pluie/lumière, calibrer et valider. (Compétence C3.1)',
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
  304: {
    id: 304,
    duree: '1h30',
    titre: 'CA 303 • Reconnaissance des valves de roues',
    situation: 'Malgré une pression des pneus correcte, le témoin TPMS (Tire Pressure Monitoring System) reste allumé. Vous devez diagnostiquer le système, identifier le capteur défaillant et le réappairer au calculateur.',
    objectif: 'Appairer capteurs, remplacer valve défectueuse et valider pressions. (Compétence C3.4)',
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
  305: {
    id: 305,
    duree: '2h00',
    titre: 'CA 311 • Phares au xénon',
    situation: 'Un client se plaint d\'un éclairage faible sur son véhicule équipé de phares au xénon. De plus, le faisceau semble trop bas. Vous devez diagnostiquer le système haute tension et le correcteur d\'assiette automatique.',
    objectif: 'Contrôler ballasts, ampoules, correcteur auto et réglage faisceau. (Compétence C3.3)',
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
  306: {
    id: 306,
    duree: '3h00',
    titre: 'MTE 303 • Remplacement distribution et pompe à eau',
    situation: 'Un véhicule entre à l\'atelier pour son entretien majeur, incluant le remplacement préventif de la courroie de distribution et de la pompe à eau. L\'intervention demande une rigueur absolue pour garantir la fiabilité du moteur.',
    objectif: 'Respecter calage/couples et purge circuit. (Compétence C3.3)',
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
  307: {
    id: 307,
    duree: '1h45',
    titre: 'MA 305 • Relevé de pressions de suralimentation',
    situation: 'Un client rapporte une perte de puissance significative et un sifflement anormal à l\'accélération sur son moteur turbo. Vous êtes chargé de contrôler le circuit de suralimentation pour identifier la cause du problème.',
    objectif: 'Comparer pressions aux valeurs constructeur, identifier fuites/wastegate/VGT. (Compétence C3.1)',
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
  308: {
    id: 308,
    duree: '2h00',
    titre: 'MA 307 • Contrôle du circuit basse pression diesel',
    situation: 'Un moteur diesel présente des difficultés de démarrage et des coupures moteur intermittentes. Vous suspectez un problème d\'alimentation et devez contrôler le circuit basse pression pour confirmer votre diagnostic.',
    objectif: 'Mesurer pression/dépression, détecter bulles et colmatage. (Compétence C3.1)',
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
  310: {
    id: 310,
    duree: '2h30',
    titre: 'MA 303 • Diagnostic système injection diesel',
    situation: 'Un véhicule diesel Common Rail présente le voyant moteur allumé, avec des pertes de puissance. Vous êtes chargé de mener un diagnostic avancé du système d\'injection pour identifier la source de la panne.',
    objectif: 'Analyser codes/paramètres, tester actionneurs et conclure. (Compétence C3.2)',
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
  311: {
    id: 311,
    duree: '2h00',
    titre: 'MP 303 • Diagnostic et mesures de paramètres antipollution',
    situation: 'Le véhicule a été refusé au contrôle technique pour pollution excessive. Vous devez diagnostiquer les systèmes antipollution (lambda, EGR, FAP) pour trouver la cause et valider la conformité après réparation.',
    objectif: 'Mesurer émissions et vérifier fonctionnement des organes. (Compétence C3.1)',
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
  312: {
    id: 312,
    duree: '2h00',
    titre: 'UE 304 • Utilisation d\'un oscilloscope',
    situation: 'Pour diagnostiquer des pannes électroniques complexes, la maîtrise de l\'oscilloscope est indispensable. Cet atelier vise à vous former à la capture et à l\'analyse de signaux électriques automobiles.',
    objectif: 'Paramétrer, capter et interpréter des signaux capteurs/actionneurs. (Compétence C3.3)',
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
  313: {
    id: 313,
    duree: '2h00',
    titre: 'MA 306 • Contrôle des injecteurs moteur à rampe commune 1',
    situation: 'Un moteur Common Rail claque et fume. Le chef d\'atelier vous missionne pour la première phase du diagnostic injecteur : les contrôles électriques et l\'analyse des retours de fuite.',
    objectif: 'Mesurer résistances, contrôler retours et étanchéité. (Compétence C3.1)',
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
  314: {
    id: 314,
    duree: '2h00',
    titre: 'MA 311 • Contrôle des injecteurs moteur à rampe commune 2',
    situation: 'Suite au diagnostic précédent, un injecteur a été identifié comme défectueux. Vous devez le déposer, le tester sur banc, et coder le nouvel injecteur dans le calculateur moteur.',
    objectif: 'Mesurer débits/étanchéité sur banc et coder corrections (IMA/IQA). (Compétence C3.4)',
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
  315: {
    id: 315,
    duree: '2h30',
    titre: 'F 307 • Diagnostic du système ABS (contrôle des éléments)',
    situation: 'Le témoin ABS est allumé. Le client signale une sensation étrange à la pédale. Vous devez mener un diagnostic complet pour assurer la sécurité du système de freinage antiblocage.',
    objectif: 'Identifier défauts par codes, mesures et tests actionneurs. (Compétence C3.2)',
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
  316: {
    id: 316,
    duree: '2h00',
    titre: 'L 311 • Direction assistée électrique et hydraulique',
    situation: 'Un client se plaint d\'une direction dure par moments et de bruits au braquage. Vous devez identifier le type de direction assistée (hydraulique ou électrique) et mener le diagnostic approprié.',
    objectif: 'Identifier système, lire codes, mesurer pression/params et valider. (Compétence C3.2)',
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
  317: {
    id: 317,
    duree: '2h00',
    titre: 'L 312 • Diagnostiquer un système de suspension pilotée',
    situation: 'Le véhicule, équipé d\'une suspension pilotée, est "bloqué" en position basse ou présente un confort très dégradé. Votre mission est de diagnostiquer le système électronique et pneumatique/hydraulique.',
    objectif: 'Diagnostiquer via codes/paramètres, tester actionneurs, valider comportement dynamique. (Compétence C3.2)',
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
  318: {
    id: 318,
    duree: '2h30',
    titre: 'T 307 • Diagnostic BV robotisée',
    situation: 'Les vitesses passent mal sur une boîte robotisée : passages lents, à-coups, ou blocage sur un rapport. Vous devez diagnostiquer le système de commande électro-hydraulique et effectuer les apprentissages nécessaires.',
    objectif: 'Lire paramètres, tester actionneurs, réaliser apprentissages et valider passages. (Compétence C3.4)',
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
};

    