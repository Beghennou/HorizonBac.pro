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
  { id: '1', name: 'Alex Johnson', email: 'alex.j@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar1')?.imageUrl || '', progress: 85, lastActive: 'Il y a 2 heures', performanceData: 'TP-Aéro terminé avec 95% de précision. Temps moyen au tour en simulation : 1:32.5. Montre une force dans la compréhension de l\'aérodynamique mais a des difficultés avec les virages à grande vitesse.' },
  { id: '2', name: 'Maria Garcia', email: 'maria.g@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar2')?.imageUrl || '', progress: 62, lastActive: 'Il y a 1 jour', performanceData: 'Module TP-Moteur à 70%. Les données de simulation montrent une application incohérente de l\'accélérateur. Bonne technique de freinage.' },
  { id: '3', name: 'Sam Chen', email: 'sam.c@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar3')?.imageUrl || '', progress: 92, lastActive: 'Il y a 5 heures', performanceData: 'Excellente performance sur tous les TPs. Dans le top 5% des classements de simulation. Prêt pour les modules avancés.' },
  { id: '4', name: 'Emily White', email: 'emily.w@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar4')?.imageUrl || '', progress: 45, lastActive: 'Il y a 3 jours', performanceData: 'Difficultés avec les concepts de TP-Suspension (score de 55%). La simulation montre une perte de traction fréquente. Recommander des exercices de base sur la dynamique du véhicule.' },
  { id: '5', name: 'David Lee', email: 'david.l@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar5')?.imageUrl || '', progress: 78, lastActive: 'hier', performanceData: 'Performeur solide. Temps au tour constants. Pourrait s\'améliorer sur la gestion des pneus lors des runs de simulation plus longs.' },
];

export type TPModule = {
  id: string;
  title: string;
  description: string;
  category: 'Aérodynamique' | 'Groupe motopropulseur' | 'Châssis';
  imageId: string;
};

export const tpModules: TPModule[] = [
  { id: 'tp-1', title: 'Aérodynamique 101', description: 'Comprendre les fondamentaux de la déportance et de la traînée.', category: 'Aérodynamique', imageId: 'tp-aero' },
  { id: 'tp-2', title: 'Réglage performance moteur', description: 'Apprenez à optimiser les paramètres du moteur pour la puissance et l\'efficacité.', category: 'Groupe motopropulseur', imageId: 'tp-engine' },
  { id: 'tp-3', title: 'Géométrie de la suspension', description: 'Maîtrisez les principes de carrossage, de chasse et de pincement.', category: 'Châssis', imageId: 'tp-suspension' },
];

export type Simulation = {
  id: string;
  track: string;
  description: string;
  bestLap?: string;
  imageId: string;
};

export const simulations: Simulation[] = [
    { id: 'sim-1', track: 'Circuit de Monza', description: 'Le temple de la vitesse. Testez vos performances en ligne droite.', imageId: 'sim-monza', bestLap: '1:21.046' },
    { id: 'sim-2', track: 'Spa-Francorchamps', description: 'Un circuit classique pour pilotes avec des dénivelés difficiles.', imageId: 'sim-spa' },
];
