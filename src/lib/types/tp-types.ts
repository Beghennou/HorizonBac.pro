
// Unified TP type definitions
import type { TP_CAP_1, TP_CAP_2, Etape_CAP, EtudePrelim_CAP, EtudePrelimQCM_CAP, EtudePrelimText_CAP } from '@/lib/tps/cap';
import type { TP_PREMIERE, Etape_PREMIERE, EtudePrelim_PREMIERE, EtudePrelimQCM_PREMIERE, EtudePrelimText_PREMIERE } from '@/lib/tps/premiere';
import type { TP_SECONDE, Etape_SECONDE, EtudePrelim_SECONDE, EtudePrelimQCM_SECONDE, EtudePrelimText_SECONDE } from '@/lib/tps/seconde';
import type { TP_TERMINALE, Etape_TERMINALE, EtudePrelim_TERMINALE, EtudePrelimQCM_TERMINALE, EtudePrelimText_TERMINALE } from '@/lib/tps/terminale';


export type EtudePrelimQCM = EtudePrelimQCM_SECONDE | EtudePrelimQCM_PREMIERE | EtudePrelimQCM_TERMINALE | EtudePrelimQCM_CAP;
export type EtudePrelimText = EtudePrelimText_SECONDE | EtudePrelimText_PREMIERE | EtudePrelimText_TERMINALE | EtudePrelimText_CAP;

export type Etape = Etape_SECONDE | Etape_PREMIERE | Etape_TERMINALE | Etape_CAP;
export type EtudePrelim = EtudePrelim_SECONDE | EtudePrelim_PREMIERE | EtudePrelim_TERMINALE | EtudePrelim_CAP;

// Unified TP type
export type TP = (TP_SECONDE | TP_PREMIERE | TP_TERMINALE | TP_CAP_1 | TP_CAP_2) & {
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
