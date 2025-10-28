

import { tpSeconde, TP as TPSeconde } from './tp-seconde';
import { tpPremiere, TP as TPPremiere } from './tp-premiere';
import { tpTerminale, TP as TPTerminale } from './tp-terminale';
import type { EtudePrelim as EtudePrelimSeconde } from './tp-seconde';
import type { EtudePrelim as EtudePrelimPremiere } from './tp-premiere';
import type { EtudePrelimQCM as EtudePrelimQCMTerminale, EtudePrelimText as EtudePrelimTextTerminale } from './tp-terminale';
import { Student } from './types';


export type EtudePrelimQCM = EtudePrelimQCMTerminale;
export type EtudePrelimText = EtudePrelimTextTerminale;

export type Etape = TPSeconde['activitePratique'][0];
export type EtudePrelim = EtudePrelimSeconde | EtudePrelimPremiere | EtudePrelimQCM | EtudePrelimText;

export type TP = Omit<TPSeconde, 'etudePrelim'> & {
    etudePrelim: EtudePrelim[];
    author?: string;
    creationDate?: string;
    niveau?: Niveau;
};

export type Niveau = 'seconde' | 'premiere' | 'terminale';
export type TpStatus = 'non-commencé' | 'en-cours' | 'terminé';

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


export const initialTps: Record<number, TP> = {
  ...tpSeconde,
  ...tpPremiere,
  ...tpTerminale,
};

export const getTpsByNiveau = (niveau: Niveau, allTpsFromContext?: Record<number, TP>): TP[] => {
  const sourceTps = allTpsFromContext ? Object.values(allTpsFromContext) : Object.values(initialTps);

  return sourceTps.filter(tp => {
    if(!tp) return false;
    const tpId = tp.id;
    
    // Prioritize the 'niveau' property if it exists (for custom TPs)
    if (tp.niveau) {
        return tp.niveau === niveau;
    }
    
    // Fallback for older TPs without a 'niveau' property based on ID ranges
    switch(niveau) {
        case 'seconde': return tpId >= 101 && tpId < 200;
        case 'premiere': return tpId >= 1 && tpId < 101;
        case 'terminale': return tpId >= 301 && tpId < 1000;
        default: return false;
    }
  });
};

export const getTpById = (id: number, all?: boolean, allTpsFromContext?: Record<number, TP>): TP | Record<number, TP> | undefined => {
    const sourceTps = allTpsFromContext || initialTps;
    if (all) {
        return sourceTps;
    }
    return sourceTps[id];
};

export const allBlocs: Record<string, CompetenceBloc> = {
    ...competencesParNiveau.seconde,
    ...competencesParNiveau.premiere,
    ...competencesParNiveau.terminale,
};
