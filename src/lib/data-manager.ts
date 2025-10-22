
import { tpSeconde, TP as TPSeconde } from './tp-seconde';
import { tpPremiere, TP as TPPremiere } from './tp-premiere';
import { tpTerminale, TP as TPTerminale } from './tp-terminale';
import type { EtudePrelim as EtudePrelimSeconde } from './tp-seconde';
import type { EtudePrelim as EtudePrelimPremiere } from './tp-premiere';
import type { EtudePrelimQCM as EtudePrelimQCMTerminale, EtudePrelimText as EtudePrelimTextTerminale } from './tp-terminale';


export type EtudePrelimQCM = EtudePrelimQCMTerminale;
export type EtudePrelimText = EtudePrelimTextTerminale;

export type Etape = TPSeconde['activitePratique'][0];
export type EtudePrelim = EtudePrelimSeconde | EtudePrelimPremiere | EtudePrelimQCM | EtudePrelimText;

export type TP = Omit<TPSeconde, 'etudePrelim'> & {
    etudePrelim: EtudePrelim[];
};

export type Niveau = 'seconde' | 'premiere' | 'terminale';

export type CompetenceBloc = {
  title: string;
  colorClass: string;
  items: Record<string, string>;
};

export const competencesParNiveau: Record<Niveau, Record<string, CompetenceBloc>> = {
  seconde: {
    'BLOC_1': { title: 'BLOC 1 : Entretenir un véhicule', colorClass: 'bg-bloc1-color', items: { 'C1.1': 'Organiser un entretien périodique', 'C1.2': 'Identifier les anomalies dans le cadre d\'un entretien périodique', 'C1.3': 'Réaliser les opérations de remplacement, d\'ajustement dans le cadre de l\'entretien périodique', 'C1.4': 'Apporter des conseils techniques à la clientèle sur l\'entretien du véhicule' } }
  },
  premiere: {
    'BLOC_2': { title: 'BLOC 2 : Diagnostiquer un véhicule', colorClass: 'bg-bloc2-color', items: { 'C2.1': 'Préparer une intervention corrective', 'C2.2': 'Réaliser le remplacement ou la réparation des composants', 'C2.3': 'Réaliser le réglage ou le paramétrage des systèmes', 'C2.4': 'Réaliser le contrôle qualité d\'une intervention corrective' } }
  },
  terminale: {
    'BLOC_3': { title: 'BLOC 3 : Réparer un véhicule', colorClass: 'bg-bloc3-color', items: { 'C3.1': 'Constater un dysfonctionnement', 'C3.2': 'Hiérarchiser les hypothèses', 'C3.3': 'Mettre en œuvre un protocole d\'intervention existant ou à définir', 'C3.4': 'Identifier les solutions correctives' } }
  }
};


const allTPs: Record<number, TP> = {
  ...(tpSeconde as Record<number, TP>),
  ...(tpPremiere as Record<number, TP>),
  ...(tpTerminale as Record<number, TP>),
};

const tpsByNiveau: Record<Niveau, TP[]> = {
  seconde: Object.values(tpSeconde) as TP[],
  premiere: Object.values(tpPremiere) as TP[],
  terminale: Object.values(tpTerminale) as TP[],
};

export const getTpsByNiveau = (niveau: Niveau): TP[] => {
  return tpsByNiveau[niveau] || [];
};

export const getTpById = (id: number): TP | undefined => {
  return allTPs[id];
};

export const classes = {
    "TVP1": ["Dupont Jean", "Martin Paul"],
    "TVP2": ["Bernard Luc", "Robert Jacques"],
    "TVP3": ["Petit Pierre", "Dubois Michel"],
    "2MV2 - Carol Shelby": ["Durand Alain", "Leroy Philippe"],
    "2MV3 - Amédée Gordini": ["Moreau Louis", "Simon André"],
    "2MV4 - Les frères Michelin": ["Laurent Nicolas", "Lefebvre Marc"],
    "2MV5 - Michèle Mouton": ["Roux Julien", "Fournier David"],
    "2MV6 - Valentino Rossi": ["Girard Vincent", "Bonnet Christian"],
    "TAPP 1": ["Lambert Thierry", "Francois Patrick"],
    "TAPP 2": ["Martinez Serge", "Legrand Daniel"],
    "1APP1": ["Garnier Jean-Luc", "Faure Pascal"],
    "1APP2": ["Rousseau Olivier", "Blanc Frédéric"],
    "1VP1": ["Guerin Hervé", "Muller Christophe"],
    "1VP2": ["Henry Denis", "Leclercq Bruno"],
    "1VP3": ["Lecomte Fabrice", "Perez Alain"],
    "2APP-RC/VP - John Coppe": ["Marchand Éric", "Morel Stéphane"],
    "2MV1 - Pierre Latirgue": ["Chevalier Gilles", "Lambert Patrick", "Caron Jean-Michel", "Fontaine Dominique", "VINCENT Christophe", "GAUTIER Guillaume", "MASSON Antoine", "ETIENNE Yann", "TESSIER Sébastien", "MARIE Alexandre"]
};

export const allBlocs: Record<string, CompetenceBloc> = {
    ...competencesParNiveau.seconde,
    ...competencesParNiveau.premiere,
    ...competencesParNiveau.terminale,
};

