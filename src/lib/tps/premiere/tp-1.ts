
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

const tp: TP = { id: 1, duree:'2h00', titre:'AS 207 • Accueillir le client et restituer le véhicule', situation:'Un client se présente à l\'atelier sans rendez-vous. Son véhicule est immobilisé. Vous êtes chargé de l\'accueillir, de prendre en charge le véhicule en créant un Ordre de Réparation (OR) complet et de lui expliquer la procédure à suivre.', objectif:'Réaliser un accueil et une restitution professionnels, avec OR et traçabilité. (Compétence C2.1)', materiel:['OR','Grille d’état','Tablette atelier','Documents garantie'], 
    etudePrelim:[
        {type: 'text', q:"Analyse de scénario : Un client arrive, sa voiture ne démarre plus. Il n'a pas de rendez-vous et semble pressé. Quelle est votre première action pour le rassurer tout en respectant la procédure de l'atelier ?",r:'Écouter activement, montrer de l\'empathie, puis expliquer les étapes à venir (prise en charge, diagnostic initial).'},
        {type: 'text', q:"L'OR est un contrat. Citez les 3 informations les plus critiques à y faire figurer pour protéger à la fois le client et l'atelier. Justifiez vos choix.",r:'1. Identité client/véhicule (immat, km). 2. Demande claire du client (symptôme). 3. Date et signature pour accord. Cela évite les litiges.'},
        {type: 'qcm', q:"Le client vous dit : 'Le problème est apparu juste après votre dernière intervention, ça doit être sous garantie !'. Comment réagissez-vous ?", options: ["Je confirme que c'est sous garantie pour le calmer.", "Je lui dis que ce n'est pas possible.", "Je reste factuel, vérifie l'historique et lui explique que nous allons diagnostiquer la cause avant de parler de garantie."], r:"Je reste factuel, vérifie l'historique et lui explique que nous allons diagnostiquer la cause avant de parler de garantie."}
    ], 
    activitePratique:[ etape('Accueil et Prise en Charge','30 min',['Accueillir le client avec professionnalisme et courtoisie.','Écouter activement les symptômes décrits par le client.','Effectuer une inspection visuelle du véhicule en présence du client.','Rédiger un Ordre de Réparation (OR) complet incluant immatriculation, kilométrage et demande précise.']), etape('Suivi de l\'Intervention','30 min',['Informer le client des délais prévisionnels.','Obtenir un accord écrit pour les travaux complémentaires.']), etape('Restitution du Véhicule','40 min',['Expliquer clairement la facture au client.','Donner des conseils d\'entretien et planifier le prochain rendez-vous.','Archiver le dossier et s\'assurer de la satisfaction du client.']) ], securiteRangement:['Protection des données personnelles (RGPD)','Archivage méthodique des OR','Maintien d\'un espace d\'accueil propre et ordonné'], pointsCles:['Clarté de l\'OR','Traçabilité des interventions','Posture professionnelle'], validationRequise: false, };

export default tp;
