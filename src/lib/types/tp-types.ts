
// Base types for a single practical work (TP)
// This file should have NO EXTERNAL DEPENDENCIES to avoid circular imports.

export type Niveau = 'seconde' | 'premiere' | 'terminale' | 'cap1' | 'cap2';
export type Cursus = 'bacpro' | 'cap';
export type TpStatus = 'non-commencé' | 'en-cours' | 'terminé' | 'à-refaire';

export interface Etape {
  titre: string;
  duree: string;
  etapes: string[];
}

export interface EtudePrelimText {
  type: 'text';
  q: string;
  r: string;
}

export interface EtudePrelimQCM {
  type: 'qcm';
  q: string;
  r: string;
  options: string[];
}

export type EtudePrelim = EtudePrelimText | EtudePrelimQCM;

export interface CompetenceBloc {
  title: string;
  colorClass: string;
  items: Record<string, string>;
}

export interface ClassData {
    id: string;
    studentNames: string[];
    cursus: Cursus;
    niveau: Niveau;
};

// This is the base shape of a TP object.
// The final unified TP type is assembled in data-manager.ts
export interface TP_BASE {
    id: number;
    duree: string;
    titre: string;
    situation: string;
    objectif: string;
    materiel: string[];
    etudePrelim: EtudePrelim[];
    activitePratique: Etape[];
    securiteRangement: string[];
    pointsCles: string[];
    author?: string;
    creationDate?: string;
    niveau?: Niveau;
    ressources?: string[];
    validationRequise?: boolean;
}
