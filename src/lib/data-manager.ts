import { tpSeconde, TP as TPSeconde } from './tp-seconde';
// Importations pour Première et Terminale seront ajoutées ici

export type TP = TPSeconde; // Union des types de TP quand ils seront disponibles

export type Niveau = 'seconde' | 'premiere' | 'terminale';

const allTPs: Record<number, TP> = {
  ...tpSeconde,
  // Les TPs de première et terminale seront ajoutés ici
};

const tpsByNiveau: Record<Niveau, TP[]> = {
  seconde: Object.values(tpSeconde),
  premiere: [], // Sera rempli avec les TPs de première
  terminale: [], // Sera rempli avec les TPs de terminale
};

export const getTpsByNiveau = (niveau: Niveau): TP[] => {
  return tpsByNiveau[niveau] || [];
};

export const getTpById = (id: number): TP | undefined => {
  return allTPs[id];
};

export const classes = {
    "2nde A": ["Jean Dupont", "Marie Curie", "Pierre Martin"],
    "2nde B": ["Alice Lemoine", "Bob Marley", "Charlie Chaplin"],
    "1ere A": ["David Bowie", "Elon Musk", "Frank Zappa"],
    "Tle B": ["Grace Kelly", "Hans Zimmer", "Isaac Newton"]
}

export type Classe = keyof typeof classes;
