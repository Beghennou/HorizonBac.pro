import { PlaceHolderImages } from './placeholder-images';

export type Student = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  progress: number;
  lastActive: string;
  performanceData: string;
};

export const students: Student[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex.j@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar1')?.imageUrl || '', progress: 85, lastActive: 'Il y a 2 heures', performanceData: 'TP-Freinage terminé avec 95% de précision. Temps moyen pour le changement de plaquettes : 25min. Montre une force dans la compréhension des systèmes hydrauliques.' },
  { id: '2', name: 'Maria Garcia', email: 'maria.g@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar2')?.imageUrl || '', progress: 62, lastActive: 'Il y a 1 jour', performanceData: 'Module TP-Moteur à 70%. Les données montrent une application incohérente du couple de serrage. Bonne technique de diagnostic.' },
  { id: '3', name: 'Sam Chen', email: 'sam.c@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar3')?.imageUrl || '', progress: 92, lastActive: 'Il y a 5 heures', performanceData: 'Excellente performance sur tous les TPs. Dans le top 5% des évaluations. Prêt pour les modules de diagnostic avancé.' },
  { id: '4', name: 'Emily White', email: 'emily.w@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar4')?.imageUrl || '', progress: 45, lastActive: 'Il y a 3 jours', performanceData: 'Difficultés avec les concepts de TP-Electricité (score de 55%). La simulation de diagnostic montre des erreurs dans la lecture des schémas. Recommander des exercices de base sur le multimètre.' },
  { id: '5', name: 'David Lee', email: 'david.l@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar5')?.imageUrl || '', progress: 78, lastActive: 'hier', performanceData: 'Performeur solide. Temps de vidange constants. Pourrait s\'améliorer sur la gestion des déchets et la propreté du poste de travail.' },
];

export type TPModule = {
  id: string;
  title: string;
  description: string;
  category: 'Entretien' | 'Corrective' | 'Diagnostic';
  imageId: string;
};

export const tpModules: TPModule[] = [
  { id: 'tp-1', title: 'Entretien Périodique 101', description: 'Comprendre les fondamentaux de la vidange et des filtres.', category: 'Entretien', imageId: 'tp-aero' },
  { id: 'tp-2', title: 'Système de Freinage', description: 'Apprendre à remplacer les plaquettes et disques de frein.', category: 'Corrective', imageId: 'tp-engine' },
  { id: 'tp-3', title: 'Diagnostic Électronique', description: 'Maîtriser les principes du diagnostic à la valise.', category: 'Diagnostic', imageId: 'tp-suspension' },
];

export type Simulation = {
  id: string;
  track: string;
  description: string;
  bestLap?: string;
  imageId: string;
};

export const simulations: Simulation[] = [
    { id: 'sim-1', track: 'Évaluation - BLOC 1', description: 'Évaluation des compétences liées à l\'entretien périodique.', imageId: 'sim-monza', bestLap: 'Acquis' },
    { id: 'sim-2', track: 'Évaluation - BLOC 2', description: 'Évaluation des compétences liées à la maintenance corrective.', imageId: 'sim-spa' },
];
