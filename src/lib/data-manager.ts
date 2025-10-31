

import { tpSeconde, TP as TPSeconde } from './tp-seconde';
import { tpPremiere, TP as TPPremiere } from './tp-premiere';
import { tpTerminale, TP as TPTerminale } from './tp-terminale';
import { tpCap, TP as TPCap } from './tp-cap';
import { competencesParNiveau as bacProCompetences } from './bac-pro-data';
import { competencesParNiveau as capCompetences } from './cap-data';
import type { EtudePrelim as EtudePrelimSeconde } from './tp-seconde';
import type { EtudePrelim as EtudePrelimPremiere } from './tp-premiere';
import type { EtudePrelimQCM as EtudePrelimQCMTerminale, EtudePrelimText as EtudePrelimTextTerminale } from './tp-terminale';


export type EtudePrelimQCM = EtudePrelimQCMTerminale;
export type EtudePrelimText = EtudePrelimTextTerminale;

export type Etape = TPSeconde['activitePratique'][0];
export type EtudePrelim = EtudePrelimSeconde | EtudePrelimPremiere | EtudePrelimQCM | EtudePrelimText;

export type TP = Omit<TPSeconde, 'etudePrelim'> & {
    etudePrelim: EtudePrelim[];
    author?: string;
    creationDate?: string;
    niveau?: Niveau;
    ressources?: string[];
    validationRequise?: boolean;
};

export type Niveau = 'seconde' | 'premiere' | 'terminale' | 'cap1' | 'cap2';
export type Cursus = 'bacpro' | 'cap';
export type TpStatus = 'non-commencé' | 'en-cours' | 'terminé' | 'à-refaire';

export type CompetenceBloc = {
  title: string;
  colorClass: string;
  items: Record<string, string>;
};

export type ClassData = {
    id: string;
    studentNames: string[];
    cursus: Cursus;
    niveau: Niveau;
};

export const competencesParNiveau: Record<Niveau, Record<string, CompetenceBloc>> = {
  ...bacProCompetences,
  ...capCompetences
};


export const initialTps: Record<number, TP> = {
  ...tpSeconde,
  ...tpPremiere,
  ...tpTerminale,
  ...tpCap,
};

const isTpOfNiveau = (tp: TP, niveau: Niveau): boolean => {
    if (!tp) return false;
    const tpId = tp.id;

    if (tp.niveau) {
        return tp.niveau === niveau;
    }

    switch (niveau) {
        case 'seconde': return tpId >= 101 && tpId < 200;
        case 'premiere': return tpId >= 1 && tpId < 101;
        case 'terminale': return tpId >= 301 && tpId < 500;
        case 'cap1': return tpId >= 501 && tpId < 600; // Assuming CAP TPs start at 501
        case 'cap2': return tpId >= 601 && tpId < 700; // Assuming CAP 2nd year TPs start at 601
        default: return false;
    }
}

export const getTpsByNiveau = (niveau: Niveau, allTpsFromContext?: Record<number, TP>): TP[] => {
  const sourceTps = allTpsFromContext ? Object.values(allTpsFromContext) : Object.values(initialTps);

  let niveauxToShow: Niveau[] = [];
  switch (niveau) {
    case 'terminale':
      niveauxToShow = ['terminale', 'premiere', 'seconde'];
      break;
    case 'premiere':
      niveauxToShow = ['premiere', 'seconde'];
      break;
    case 'seconde':
      niveauxToShow = ['seconde'];
      break;
    case 'cap2':
        niveauxToShow = ['cap2', 'cap1'];
        break;
    case 'cap1':
        niveauxToShow = ['cap1'];
        break;
  }

  return sourceTps.filter(tp => {
    if (!tp) return false;
    return niveauxToShow.some(n => isTpOfNiveau(tp, n));
  }).sort((a,b) => a.id - b.id);
};

export const getTpById = (id: number, all?: boolean, allTpsFromContext?: Record<number, TP>): TP | Record<number, TP> | undefined => {
    const sourceTps = allTpsFromContext || initialTps;
    if (all) {
        return sourceTps;
    }
    return sourceTps[id];
};

export const allBlocs: Record<string, CompetenceBloc> = Object.values(competencesParNiveau).reduce((acc, curr) => {
    return { ...acc, ...curr };
}, {});

export const NIVEAUX_BACPRO: { value: Niveau, label: string, prefix: string }[] = [
    { value: 'seconde', label: 'Seconde', prefix: '2BAC' },
    { value: 'premiere', label: 'Première', prefix: '1BAC' },
    { value: 'terminale', label: 'Terminale', prefix: 'TBAC' },
];

export const NIVEAUX_CAP: { value: Niveau, label: string, prefix: string }[] = [
    { value: 'cap1', label: '1ère Année CAP', prefix: '1CAP' },
    { value: 'cap2', label: '2ème Année CAP', prefix: '2CAP' },
];

export const NIVEAUX: Record<Cursus, { value: Niveau, label: string, prefix: string }[]> = {
    bacpro: NIVEAUX_BACPRO,
    cap: NIVEAUX_CAP,
};
