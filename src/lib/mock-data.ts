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
  { id: '1', name: 'Alex Johnson', email: 'alex.j@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar1')?.imageUrl || '', progress: 85, lastActive: '2 hours ago', performanceData: 'Completed TP-Aero with 95% accuracy. Simulation lap time average: 1:32.5. Shows strength in aerodynamics understanding but struggles with high-speed cornering.' },
  { id: '2', name: 'Maria Garcia', email: 'maria.g@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar2')?.imageUrl || '', progress: 62, lastActive: '1 day ago', performanceData: 'TP-Engine module at 70%. Simulation data shows inconsistent throttle application. Good braking technique.' },
  { id: '3', name: 'Sam Chen', email: 'sam.c@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar3')?.imageUrl || '', progress: 92, lastActive: '5 hours ago', performanceData: 'Excellent performance across all TPs. Top 5% in simulation leaderboards. Ready for advanced modules.' },
  { id: '4', name: 'Emily White', email: 'emily.w@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar4')?.imageUrl || '', progress: 45, lastActive: '3 days ago', performanceData: 'Struggling with TP-Suspension concepts (55% score). Simulation shows frequent loss of traction. Recommend foundational exercises on vehicle dynamics.' },
  { id: '5', name: 'David Lee', email: 'david.l@example.com', avatar: PlaceHolderImages.find(p => p.id === 'avatar5')?.imageUrl || '', progress: 78, lastActive: 'yesterday', performanceData: 'Solid performer. Consistent lap times. Could improve on tire management during longer simulation runs.' },
];

export type TPModule = {
  id: string;
  title: string;
  description: string;
  category: 'Aerodynamics' | 'Powertrain' | 'Chassis';
  imageId: string;
};

export const tpModules: TPModule[] = [
  { id: 'tp-1', title: 'Aerodynamics 101', description: 'Understand the fundamentals of downforce and drag.', category: 'Aerodynamics', imageId: 'tp-aero' },
  { id: 'tp-2', title: 'Engine Performance Tuning', description: 'Learn how to optimize engine parameters for power and efficiency.', category: 'Powertrain', imageId: 'tp-engine' },
  { id: 'tp-3', title: 'Suspension Geometry', description: 'Master the principles of camber, caster, and toe.', category: 'Chassis', imageId: 'tp-suspension' },
];

export type Simulation = {
  id: string;
  track: string;
  description: string;
  bestLap?: string;
  imageId: string;
};

export const simulations: Simulation[] = [
    { id: 'sim-1', track: 'Monza Circuit', description: 'The temple of speed. Test your straight-line performance.', imageId: 'sim-monza', bestLap: '1:21.046' },
    { id: 'sim-2', track: 'Spa-Francorchamps', description: 'A classic driver\'s circuit with challenging elevation changes.', imageId: 'sim-spa' },
];
