import { CircuitBoard, Wrench, Settings, Search, ShieldCheck, Trophy, Sparkles, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type Badge = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  criteria: (completedTps: number[]) => boolean;
};

export const allBadges: Badge[] = [
  {
    id: 'first_tp',
    title: 'Premier Pas',
    description: 'Terminer son tout premier Travail Pratique.',
    icon: CircuitBoard,
    criteria: (completedTps) => completedTps.length >= 1,
  },
  {
    id: 'safety_expert',
    title: 'Expert Sécurité',
    description: 'Terminer les TP sur le levage et la sécurité (101, 102, 103).',
    icon: ShieldCheck,
    criteria: (completedTps) => [101, 102, 103].every(tpId => completedTps.includes(tpId)),
  },
  {
    id: 'maintenance_initiate',
    title: 'Initié de l\'Entretien',
    description: 'Terminer 5 TP du bloc "Entretien périodique".',
    icon: Wrench,
    criteria: (completedTps) => completedTps.filter(id => id >= 101 && id < 200).length >= 5,
  },
  {
    id: 'diag_adept',
    title: 'Expert du Diagnostic',
    description: 'Terminer 5 TP du bloc "Diagnostic".',
    icon: Search,
    criteria: (completedTps) => completedTps.filter(id => id >= 1 && id < 101).length >= 5,
  },
  {
    id: 'repair_master',
    title: 'Maître de la Réparation',
    description: 'Terminer 5 TP du bloc "Réparation".',
    icon: Settings,
    criteria: (completedTps) => completedTps.filter(id => id >= 301).length >= 5,
  },
  {
    id: 'distribution_master',
    title: 'Maître de la Distribution',
    description: 'Réussir le TP sur le remplacement de la distribution (TP 14).',
    icon: Sparkles,
    criteria: (completedTps) => completedTps.includes(14),
  },
  {
    id: 'zero_fault',
    title: 'Zéro Faute',
    description: 'Réussir le TP sur le pré-contrôle technique (TP 16).',
    icon: CheckCircle,
    criteria: (completedTps) => completedTps.includes(16),
  },
  {
    id: 'grand_chelem',
    title: 'Grand Chelem',
    description: 'Terminer tous les TP disponibles pour un niveau.',
    icon: Trophy,
    criteria: (completedTps) => {
        // This is a placeholder, a real implementation would need to know the total TPs for a student's level
        return completedTps.length > 15; // Example criteria
    }
  },
];

type StudentProgress = {
  completedTps: number[];
  // Other data like evaluations could be added here
};

export const getBadgesForStudent = (progress: StudentProgress): Badge[] => {
  return allBadges.filter(badge => badge.criteria(progress.completedTps));
};
