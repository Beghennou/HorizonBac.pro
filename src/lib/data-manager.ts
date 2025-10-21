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
    'BLOC_1': { title: 'BLOC 1 : Réaliser l\'entretien périodique des véhicules', colorClass: 'bg-bloc1-color', items: { 'C1.1': 'Organiser un entretien périodique', 'C1.2': 'Identifier les anomalies dans le cadre d\'un entretien périodique', 'C1.3': 'Réaliser les opérations de remplacement, d\'ajustement dans le cadre de l\'entretien périodique', 'C1.4': 'Apporter des conseils techniques à la clientèle sur l\'entretien du véhicule' } }
  },
  premiere: {
    'BLOC_2': { title: 'BLOC 2 : Réaliser la maintenance corrective des véhicules', colorClass: 'bg-bloc2-color', items: { 'C2.1': 'Préparer une intervention corrective', 'C2.2': 'Réaliser le remplacement ou la réparation des composants', 'C2.3': 'Réaliser le réglage ou le paramétrage des systèmes', 'C2.4': 'Réaliser le contrôle qualité d\'une intervention corrective' } }
  },
  terminale: {
    'BLOC_3': { title: 'BLOC 3 : Réaliser le diagnostic des systèmes des véhicules', colorClass: 'bg-bloc3-color', items: { 'C3.1': 'Constater un dysfonctionnement', 'C3.2': 'Hiérarchiser les hypothèses', 'C3.3': 'Mettre en œuvre un protocole d\'intervention existant ou à définir', 'C3.4': 'Identifier les solutions correctives' } }
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
    "TVP1": [],
    "TVP2": [],
    "TVP3": [],
    "2MV2 - Carol Shelby": [],
    "2MV3 - Amédée Gordini": [],
    "2MV4 - Les frères Michelin": [],
    "2MV5 - Michèle Mouton": [],
    "2MV6 - Valentino Rossi": [],
    "TAPP 1": [],
    "TAPP 2": [],
    "1APP1": [],
    "1APP2": [],
    "1VP1": [],
    "1VP2": [],
    "1VP3": [],
    "2APP-RC/VP - John Coppe": [],
    "2MV1 - Pierre Latirgue": []
};

export const allBlocs: Record<string, CompetenceBloc> = {
    ...competencesParNiveau.seconde,
    ...competencesParNiveau.premiere,
    ...competencesParNiveau.terminale,
};
