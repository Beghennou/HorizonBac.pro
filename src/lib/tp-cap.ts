

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
  ressources?: string[];
  validationRequise?: boolean;
};

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

export const tpCap: Record<number, TP> = {
    501: {
        id: 501,
        duree: '1h30',
        titre: 'CAP • Contrôle et Mise à Niveau des Fluides',
        situation: 'Un véhicule est présenté pour un contrôle de routine. Vous devez vérifier l\'ensemble des niveaux des fluides et effectuer les appoints nécessaires.',
        objectif: 'Contrôler les niveaux d\'huile, de liquide de refroidissement, de frein et de lave-glace et réaliser les ajustements. (Compétences C1.2, C1.3)',
        materiel: ['Chiffons', 'Entonnoir', 'Huile moteur préconisée', 'Liquide de refroidissement', 'Liquide de frein', 'Produit lave-glace'],
        etudePrelim: [
            { type: 'text', q: 'Pourquoi doit-on contrôler le niveau d\'huile moteur à froid et sur un sol plat ?', r: 'Pour que toute l\'huile soit redescendue dans le carter et obtenir une lecture exacte à la jauge.' },
            { type: 'text', q: 'Quelle est la principale précaution à prendre avant d\'ouvrir le bouchon du vase d\'expansion ?', r: 'S\'assurer que le moteur est complètement froid pour éviter tout risque de brûlure par projection de liquide chaud sous pression.' }
        ],
        activitePratique: [
            etape('Contrôle Niveau d\'Huile', '15 min', ['Tirer la jauge, l\'essuyer, la replonger et lire le niveau.', 'S\'assurer que le niveau est entre le MIN et le MAX.', 'Effectuer l\'appoint si nécessaire.']),
            etape('Contrôle Liquide de Refroidissement', '15 min', ['Vérifier le niveau dans le vase d\'expansion (entre MIN et MAX).', 'Effectuer l\'appoint avec le liquide de même type.']),
            etape('Contrôle Liquide de Frein et Lave-Glace', '15 min', ['Vérifier le niveau de liquide de frein (proche du MAX).', 'Remplir le réservoir de lave-glace.'])
        ],
        securiteRangement: ['Ne jamais ouvrir un circuit de refroidissement chaud.', 'Utiliser des entonnoirs pour éviter les déversements.', 'Recycler les bidons vides.'],
        pointsCles: ['Respect des repères MIN/MAX', 'Utilisation des fluides préconisés', 'Contrôles à froid'],
        validationRequise: false,
    },
    502: {
        id: 502,
        duree: '1h00',
        titre: 'CAP • Remplacement du Filtre à Air',
        situation: 'Dans le cadre de l\'entretien périodique d\'un véhicule, le remplacement du filtre à air est préconisé.',
        objectif: 'Remplacer le filtre à air pour garantir une bonne qualité de l\'air admis par le moteur. (Compétence C1.3)',
        materiel: ['Filtre à air neuf', 'Tournevis', 'Chiffon'],
        etudePrelim: [
            { type: 'text', q: 'Quel est l\'impact d\'un filtre à air encrassé sur la consommation de carburant ?', r: 'Il augmente la consommation car le moteur doit forcer pour aspirer l\'air, ce qui enrichit le mélange.' },
        ],
        activitePratique: [
            etape('Dépose', '15 min', ['Localiser et ouvrir le boîtier du filtre à air.', 'Retirer l\'ancien filtre.']),
            etape('Nettoyage et Repose', '20 min', ['Nettoyer l\'intérieur du boîtier.', 'Installer le filtre neuf en respectant le sens de montage.', 'Refermer et visser le boîtier.']),
        ],
        securiteRangement: ['S\'assurer de la bonne étanchéité du boîtier.', 'Jeter l\'ancien filtre à la poubelle.'],
        pointsCles: ['Nettoyage du boîtier', 'Sens de montage du filtre'],
        validationRequise: false,
    },
    601: {
        id: 601,
        duree: '2h00',
        titre: 'CAP • Remplacement des Plaquettes de Frein Avant',
        situation: 'Un véhicule présente un témoin d\'usure des freins allumé. Le diagnostic confirme que les plaquettes de frein avant doivent être remplacées.',
        objectif: 'Remplacer les plaquettes de frein avant en respectant les règles de sécurité. (Compétence C2.2)',
        materiel: ['Jeu de plaquettes neuves', 'Repousse-piston', 'Nettoyant frein', 'Clé dynamométrique', 'Cric et chandelles'],
        etudePrelim: [
            { type: 'text', q: 'Pourquoi faut-il ouvrir le bocal de liquide de frein avant de repousser le piston de l\'étrier ?', r: 'Pour permettre au liquide de remonter sans mettre le circuit sous pression et sans faire déborder le bocal.' },
            { type: 'text', q: 'Quelle est la dernière action à faire impérativement avant de rendre le véhicule au client après un changement de plaquettes ?', r: 'Pomper plusieurs fois sur la pédale de frein pour rapprocher les plaquettes du disque.' },
        ],
        activitePratique: [
            etape('Dépose', '30 min', ['Lever le véhicule et déposer la roue.', 'Déposer l\'étrier de frein et le suspendre.', 'Retirer les anciennes plaquettes.']),
            etape('Nettoyage et Repose', '45 min', ['Nettoyer l\'étrier et repousser le piston.', 'Installer les nouvelles plaquettes.', 'Remonter l\'étrier et serrer au couple.']),
            etape('Finalisation', '15 min', ['Remonter la roue et serrer au couple.', 'Pomper sur la pédale de frein.', 'Vérifier le niveau de liquide de frein.'])
        ],
        securiteRangement: ['Suspendre l\'étrier, ne pas le laisser pendre par le flexible.', 'Respecter les couples de serrage.', 'Informer le client de la période de rodage.'],
        pointsCles: ['Nettoyage de l\'étrier', 'Pomper sur la pédale avant de rouler'],
        validationRequise: false,
    },
    602: {
        id: 602,
        duree: '1h30',
        titre: 'CAP • Diagnostic Simple : Feux Stop',
        situation: 'Un client signale que ses feux stop ne fonctionnent plus. Vous devez réaliser un diagnostic de premier niveau.',
        objectif: 'Identifier la cause d\'une panne simple sur le circuit d\'éclairage. (Compétence C2.5)',
        materiel: ['Multimètre', 'Jeu d\'ampoules neuves', 'Jeu de fusibles'],
        etudePrelim: [
            { type: 'text', q: 'Quels sont les trois éléments à contrôler en premier en cas de panne sur un circuit d\'éclairage ?', r: '1. Les ampoules. 2. Le fusible. 3. Le contacteur (ici, contacteur de pédale de frein).' }
        ],
        activitePratique: [
            etape('Contrôle des fusibles et ampoules', '20 min', ['Identifier et contrôler le fusible des feux stop.', 'Inspecter visuellement les ampoules de feux stop.']),
            etape('Contrôle du contacteur', '30 min', ['Localiser le contacteur sur le pédalier.', 'Tester son fonctionnement électrique avec un multimètre (continuité).']),
            etape('Conclusion', '10 min', ['Déterminer l\'élément défaillant et proposer la réparation.'])
        ],
        securiteRangement: ['Couper le contact avant de manipuler les fusibles.', 'Utiliser des ampoules de puissance identique.'],
        pointsCles: ['Méthodologie de diagnostic (simple vers complexe)'],
        validationRequise: false,
    },
     603: {
        id: 603,
        duree: '1h30',
        titre: 'CAP • Remplacement des Bougies d\'Allumage',
        situation: 'Le moteur d\'un véhicule essence présente des ratés. L\'entretien préconise le remplacement des bougies d\'allumage.',
        objectif: 'Remplacer les bougies d\'allumage en respectant le couple de serrage. (Compétence C2.2)',
        materiel: ['Jeu de bougies neuves', 'Clé à bougie', 'Clé dynamométrique'],
        etudePrelim: [
            { type: 'text', q: 'Quelle précaution prendre lors du démontage pour éviter que des impuretés ne tombent dans le cylindre ?', r: 'Nettoyer ou souffler autour du puits de bougie avant de la dévisser.' },
            { type: 'text', q: 'Pourquoi le serrage au couple est-il si important pour une bougie ?', r: 'Un serrage insuffisant cause une mauvaise dissipation de la chaleur et des fuites. Un serrage excessif peut endommager le filetage de la culasse.' }
        ],
        activitePratique: [
            etape('Dépose', '20 min', ['Nettoyer les puits de bougies.', 'Débrancher les bobines ou fils de bougies.', 'Dévisser et retirer les anciennes bougies.']),
            etape('Repose et Serrage', '25 min', ['Vérifier l\'écartement des électrodes des bougies neuves.', 'Visser les bougies neuves à la main, puis serrer au couple préconisé.']),
        ],
        securiteRangement: ['Travailler sur moteur froid.', 'Respecter impérativement le couple de serrage.'],
        pointsCles: ['Propreté des puits de bougie', 'Serrage au couple'],
        validationRequise: false,
    }
};
