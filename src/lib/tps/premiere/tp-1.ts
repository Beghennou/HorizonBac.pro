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

const tp: TP = {
  id: 1,
  duree: '2h00',
  titre: 'BAC PRO Première • Diagnostic par méthode du point-milieu',
  situation: 'Un client signale qu\'un équipement électrique (ex: feu stop, dégivrage) ne fonctionne plus. Plutôt que de tout tester au hasard, le chef d\'atelier vous demande d\'appliquer une méthode de diagnostic systématique pour trouver la panne efficacement.',
  objectif: 'Appliquer la méthode de diagnostic du point-milieu pour isoler rapidement un défaut dans un circuit électrique. (Compétences C3.1, C3.2, C3.3)',
  materiel: ['Multimètre', 'Schéma électrique du circuit concerné', 'Fiches de mesure'],
  etudePrelim: [
    {
      type: 'text',
      q: 'Expliquez avec vos mots le principe de la méthode du point-milieu. Pourquoi est-elle plus rapide qu\'un test linéaire de chaque composant ?',
      r: 'Elle consiste à diviser le circuit en deux et à tester le point central. Cela permet d\'éliminer la moitié du circuit à chaque mesure, réduisant ainsi exponentiellement le nombre de tests nécessaires.',
    },
    {
        type: 'qcm',
        q: 'Le démarreur ne tourne pas. Le circuit part de la batterie, passe par le neiman, puis va au démarreur. Où faites-vous votre première mesure selon la méthode du point-milieu ?',
        options: ['Directement aux bornes de la batterie', 'Sur la borne de commande du démarreur', 'Au niveau du neiman (contacteur à clé)'],
        r: 'Au niveau du neiman (contacteur à clé)',
    },
    {
      type: 'text',
      q: 'Quels sont les risques si l\'on ne suit pas une méthode structurée pour un diagnostic électrique (ex: piquer les fils au hasard) ?',
      r: 'Perte de temps, risque de créer un court-circuit, d\'endommager un calculateur, ou de passer à côté de la vraie panne.',
    },
  ],
  activitePratique: [
    etape('Observation et Préparation', '20 min', [
      'Constater le dysfonctionnement (ex: le feu de croisement droit ne s\'allume pas).',
      'Se procurer le schéma électrique correspondant.',
      'Identifier sur le schéma : la source (batterie), la protection (fusible), la commande (commodo), et le récepteur (ampoule).',
    ]),
    etape('Application de la Méthode - 1ère Division', '30 min', [
        'Identifier un point central dans le circuit (ex: un connecteur intermédiaire, la sortie du commodo).',
        'Mesurer la tension à ce point. (Contact mis, commande actionnée).',
        'Noter la valeur : si 12V présents, le problème est en aval (vers l\'ampoule). Si 0V, le problème est en amont (vers le fusible/batterie).',
    ]),
    etape('Application de la Méthode - 2ème Division', '30 min', [
      'Choisir un nouveau point-milieu dans la section défectueuse identifiée.',
      'Refaire une mesure de tension (ou de continuité si la section est hors tension).',
      'Continuer le processus jusqu\'à isoler le composant ou la portion de faisceau défaillante.',
    ]),
    etape('Validation et Conclusion', '20 min', [
      'Une fois la cause identifiée (ex: fil coupé, connecteur oxydé, masse défectueuse), effectuer la réparation.',
      'Vérifier que l\'équipement fonctionne à nouveau correctement.',
      'Expliquer la démarche et la panne trouvée sur la fiche d\'intervention.',
    ]),
  ],
  securiteRangement: [
    'Toujours couper le contact avant de mesurer une continuité (Ohmmètre).',
    'Ne jamais "piquer" un fil isolé, toujours se connecter sur une prise existante.',
    'Respecter les calibres du multimètre pour ne pas griller son fusible interne.',
  ],
  pointsCles: [
    'Diviser pour régner : la clé de la méthode.',
    'La lecture de schéma est la première étape indispensable.',
    'Une mesure à la fois, une conclusion à la fois.',
  ],
  validationRequise: false,
};

export default tp;
