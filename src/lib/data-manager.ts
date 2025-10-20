import { tpSeconde, TP as TPSeconde } from './tp-seconde';
import { tpPremiere, TP as TPPremiere } from './tp-premiere';
import { tpTerminale, TP as TPTerminale } from './tp-terminale';

export type TP = TPSeconde | TPPremiere | TPTerminale; // Union des types de TP

export type Niveau = 'seconde' | 'premiere' | 'terminale';

export type CompetenceBloc = {
  title: string;
  colorClass: string;
  items: Record<string, string>;
};

export const competencesParNiveau: Record<Niveau, Record<string, CompetenceBloc>> = {
  seconde: {
    'BLOC_1': { title: 'Bloc 1 : Réaliser l’entretien périodique', colorClass: 'bg-bloc1-color', items: { 'C1.1': 'Organiser un entretien périodique', 'C1.2': 'Identifier les anomalies', 'C1.3': 'Réaliser les opérations', 'C1.4': 'Apporter des conseils' } }
  },
  premiere: {
    'BLOC_2': { title: 'Bloc 2 : Réaliser la maintenance corrective', colorClass: 'bg-bloc2-color', items: { 'C2.1': 'Préparer une intervention', 'C2.2': 'Remplacer ou réparer', 'C2.3': 'Réaliser le réglage', 'C2.4': 'Contrôle qualité' } }
  },
  terminale: {
    'BLOC_3': { title: 'Bloc 3 : Réaliser le diagnostic', colorClass: 'bg-bloc3-color', items: { 'C3.1': 'Constater un dysfonctionnement', 'C3.2': 'Hiérarchiser les hypothèses', 'C3.3': 'Mettre en œuvre un protocole', 'C3.4': 'Identifier les solutions' } }
  }
};


const allTPs: Record<number, TP> = {
  ...tpSeconde,
  ...tpPremiere,
  ...tpTerminale,
};

const tpsByNiveau: Record<Niveau, TP[]> = {
  seconde: Object.values(tpSeconde),
  premiere: Object.values(tpPremiere),
  terminale: Object.values(tpTerminale),
};

export const getTpsByNiveau = (niveau: Niveau): TP[] => {
  return tpsByNiveau[niveau] || [];
};

export const getTpById = (id: number): TP | undefined => {
  return allTPs[id];
};

export const classes = {
    "2nde MVA": ["Jean Dupont", "Marie Curie", "Pierre Martin"],
    "2nde MVB": ["Alice Lemoine", "Bob Marley", "Charlie Chaplin"],
    "1ere MVA": ["David Bowie", "Elon Musk", "Frank Zappa"],
    "Term MVA": ["Grace Hopper", "Heidi Lamar", "Isaac Newton"],
};
