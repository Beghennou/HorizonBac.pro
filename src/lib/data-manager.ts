

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
  ...tpSeconde,
  ...tpPremiere,
  ...tpTerminale,
};

export const getTpsByNiveau = (niveau: Niveau, allTpsFromContext?: Record<number, TP>): TP[] => {
  const sourceTps = allTpsFromContext ? Object.values(allTpsFromContext) : Object.values(allTPs);

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
    const sourceTps = allTpsFromContext || allTPs;
    if (all) {
        return sourceTps;
    }
    return sourceTps[id];
};

export const initialClasses: Record<string, string[]> = {
    // Terminale
    "TVP1": ["ACCART Gabin", "BACQUET Tristan", "BOUTILLIER Maxence", "CALIPPE Anthonin", "CLAUDE Mathis"],
    "TVP2": ["DELCROIX Tom", "DUBOIS Lucas", "DUPORGE Tyméo", "FOURNIER Leo", "GALLET Leo"],
    "TVP3": ["GOSSELIN Leo", "GUILBERT Louis", "HAGNERE Arthur", "LACHEREY Mathis", "LAVOINE Clement"],
    "TAPP 1": ["LECAT Sandro", "LEFEBVRE Thomas", "LEGRAND Francois", "LENGAIGNE Enzo"],
    "TAPP 2": ["MACRELLE Mathis", "MARIETTE Come", "MARTINACHE Aurelien", "MASSET Théo", "POUILLY Kylian", "PRUVOT Nicolas"],
    // Première
    "1APP1": ["ROUSSEL Antonin", "SAILLY Clement", "SELLIER Enzo", "TETU Thomas", "VASSEUR Emilien"],
    "1APP2": ["VASSEUR Erwan", "VERGULT Remi", "WAYMEL Quentin", "ZWICKI Evan", "ALEXANDRE Brian", "ALI HASSAN Amir"],
    "1VP1": ["BAILLY Alexis", "BERNARD Matheis", "BOUCLY Leo", "BOULANGER Luigi", "BREBION Kameron"],
    "1VP2": ["CARON Enzo", "CHOCHOIS Lucas", "CODRON Enzo", "COQUERELLE Tom", "DE SAINTE MARESVILLE Ewan"],
    "1VP3": ["DEBEUGNY Lucas", "DELATTRE Leo", "DELPIERRE Mathis", "DEPLANQUES Valentin", "DESCAMPS Anthonin"],
    // Seconde
    "2MV1 - Pierre Latirgue": ["DUCROCQ Mathis", "DUFOUR Clement", "DUHAMEL Enzo", "DUPONT Evan", "FASQUELLE Matheo"],
    "2MV2 - Carol Shelby": ["FEUTRELLE Nathan", "FLAMENT Leo", "FONTAINE Lucas", "FOURDIN Tom", "FOURNIER Hugo"],
    "2MV3 - Amédée Gordini": ["FROIDEVAL Noah", "GALLET Nolan", "GARBE Nathan", "Gourdin Aymeric", "Gressier Evan"],
    "2MV4 - Les frères Michelin": ["GUFFROY Hugo", "HERICOURT Mathis", "HERMEL Leo", "HERNAULT Evan", "KRASNIQI Florian"],
    "2MV5 - Michèle Mouton": ["LAVOGIEZ Hugo", "LEFEBVRE Axel", "LEFEBVRE Noa", "LEULLIEUX Hugo", "MACRON Leo"],
    "2MV6 - Valentino Rossi": ["Magnier Enzo", "MAILLARD Axel", "MANIEZ Matheo", "MARCOTTE Matheo", "MERCIER Jeremy"],
    "2APP-RCVP - John Copper": ["Milliot Erwan", "MOREL Leo", "NOEL Ethan", "PARENT Charles", "PERARD Loann", "PETIT Maxence", "POHIE Nathan"],
};

export const allBlocs: Record<string, CompetenceBloc> = {
    ...competencesParNiveau.seconde,
    ...competencesParNiveau.premiere,
    ...competencesParNiveau.terminale,
};

export const initialStudents: Student[] = [
    { id: 'student-1', name: 'ACCART Gabin', email: 'gabin.accart@example.com', progress: 75, xp: 120, teacherId: 'M. Dubois' },
    { id: 'student-2', name: 'BACQUET Tristan', email: 'tristan.bacquet@example.com', progress: 60, xp: 95, teacherId: 'M. Dubois' },
    { id: 'student-3', name: 'BOUTILLIER Maxence', email: 'maxence.boutillier@example.com', progress: 85, xp: 150, teacherId: 'M. Dubois' },
    { id: 'student-4', name: 'CALIPPE Anthonin', email: 'anthonin.calippe@example.com', progress: 50, xp: 80, teacherId: 'M. Dubois' },
    { id: 'student-5', name: 'CLAUDE Mathis', email: 'mathis.claude@example.com', progress: 90, xp: 180, teacherId: 'M. Dubois' },
    { id: 'student-6', name: 'DELCROIX Tom', email: 'tom.delcroix@example.com', progress: 70, xp: 110, teacherId: 'M. Dubois' },
    { id: 'student-7', name: 'DUBOIS Lucas', email: 'lucas.dubois@example.com', progress: 65, xp: 100, teacherId: 'M. Dubois' },
    { id: 'student-8', name: 'DUPORGE Tyméo', email: 'tymeo.duporge@example.com', progress: 80, xp: 130, teacherId: 'M. Dubois' },
    { id: 'student-9', name: 'FOURNIER Leo', email: 'leo.fournier@example.com', progress: 55, xp: 85, teacherId: 'M. Dubois' },
    { id: 'student-10', name: 'GALLET Leo', email: 'leo.gallet@example.com', progress: 95, xp: 200, teacherId: 'M. Dubois' },
    { id: 'student-11', name: 'GOSSELIN Leo', email: 'leo.gosselin@example.com', progress: 78, xp: 125, teacherId: 'M. Dubois' },
    { id: 'student-12', name: 'GUILBERT Louis', email: 'louis.guilbert@example.com', progress: 62, xp: 98, teacherId: 'M. Dubois' },
    { id: 'student-13', name: 'HAGNERE Arthur', email: 'arthur.hagnere@example.com', progress: 88, xp: 160, teacherId: 'M. Dubois' },
    { id: 'student-14', name: 'LACHEREY Mathis', email: 'mathis.lacherey@example.com', progress: 52, xp: 82, teacherId: 'M. Dubois' },
    { id: 'student-15', name: 'LAVOINE Clement', email: 'clement.lavoine@example.com', progress: 92, xp: 190, teacherId: 'M. Dubois' },
    { id: 'student-16', name: 'LECAT Sandro', email: 'sandro.lecat@example.com', progress: 72, xp: 115, teacherId: 'M. Dubois' },
    { id: 'student-17', name: 'LEFEBVRE Thomas', email: 'thomas.lefebvre@example.com', progress: 68, xp: 105, teacherId: 'M. Dubois' },
    { id: 'student-18', name: 'LEGRAND Francois', email: 'francois.legrand@example.com', progress: 82, xp: 140, teacherId: 'M. Dubois' },
    { id: 'student-19', name: 'LENGAIGNE Enzo', email: 'enzo.lengaigne@example.com', progress: 58, xp: 90, teacherId: 'M. Dubois' },
    { id: 'student-20', name: 'MACRELLE Mathis', email: 'mathis.macrelle@example.com', progress: 98, xp: 220, teacherId: 'M. Dubois' },
    { id: 'student-21', name: 'MARIETTE Come', email: 'come.mariette@example.com', progress: 71, xp: 112, teacherId: 'M. Dubois' },
    { id: 'student-22', name: 'MARTINACHE Aurelien', email: 'aurelien.martinache@example.com', progress: 66, xp: 102, teacherId: 'M. Dubois' },
    { id: 'student-23', name: 'MASSET Théo', email: 'theo.masset@example.com', progress: 81, xp: 135, teacherId: 'M. Dubois' },
    { id: 'student-24', name: 'POUILLY Kylian', email: 'kylian.pouilly@example.com', progress: 56, xp: 88, teacherId: 'M. Dubois' },
    { id: 'student-25', name: 'PRUVOT Nicolas', email: 'nicolas.pruvot@example.com', progress: 96, xp: 210, teacherId: 'M. Dubois' },
    { id: 'student-26', name: 'ROUSSEL Antonin', email: 'antonin.roussel@example.com', progress: 73, xp: 118, teacherId: 'M. Dubois' },
    { id: 'student-27', name: 'SAILLY Clement', email: 'clement.sailly@example.com', progress: 69, xp: 108, teacherId: 'M. Dubois' },
    { id: 'student-28', name: 'SELLIER Enzo', email: 'enzo.sellier@example.com', progress: 83, xp: 145, teacherId: 'M. Dubois' },
    { id: 'student-29', name: 'TETU Thomas', email: 'thomas.tetu@example.com', progress: 59, xp: 92, teacherId: 'M. Dubois' },
    { id: 'student-30', name: 'VASSEUR Emilien', email: 'emilien.vasseur@example.com', progress: 93, xp: 195, teacherId: 'M. Dubois' },
    { id: 'student-31', name: 'VASSEUR Erwan', email: 'erwan.vasseur@example.com', progress: 74, xp: 122, teacherId: 'M. Dubois' },
    { id: 'student-32', name: 'VERGULT Remi', email: 'remi.vergult@example.com', progress: 64, xp: 99, teacherId: 'M. Dubois' },
    { id: 'student-33', name: 'WAYMEL Quentin', email: 'quentin.waymel@example.com', progress: 84, xp: 148, teacherId: 'M. Dubois' },
    { id: 'student-34', name: 'ZWICKI Evan', email: 'evan.zwicki@example.com', progress: 45, xp: 75, teacherId: 'M. Dubois' },
    { id: 'student-35', name: 'ALEXANDRE Brian', email: 'brian.alexandre@example.com', progress: 40, xp: 60, teacherId: 'M. Dubois' },
    { id: 'student-36', name: 'ALI HASSAN Amir', email: 'amir.alihassan@example.com', progress: 35, xp: 50, teacherId: 'M. Dubois' },
    { id: 'student-37', name: 'BAILLY Alexis', email: 'alexis.bailly@example.com', progress: 30, xp: 45, teacherId: 'M. Dubois' },
    { id: 'student-38', name: 'BERNARD Matheis', email: 'matheis.bernard@example.com', progress: 25, xp: 40, teacherId: 'M. Dubois' },
    { id: 'student-39', name: 'BOUCLY Leo', email: 'leo.boucly@example.com', progress: 20, xp: 35, teacherId: 'M. Dubois' },
    { id: 'student-40', name: 'BOULANGER Luigi', email: 'luigi.boulanger@example.com', progress: 15, xp: 30, teacherId: 'M. Dubois' },
    { id: 'student-41', name: 'BREBION Kameron', email: 'kameron.brebion@example.com', progress: 10, xp: 25, teacherId: 'M. Dubois' },
    { id: 'student-42', name: 'CARON Enzo', email: 'enzo.caron@example.com', progress: 5, xp: 20, teacherId: 'M. Dubois' },
    { id: 'student-43', name: 'CHOCHOIS Lucas', email: 'lucas.chochois@example.com', progress: 0, xp: 15, teacherId: 'M. Dubois' },
    { id: 'student-44', name: 'CODRON Enzo', email: 'enzo.codron@example.com', progress: 0, xp: 10, teacherId: 'M. Dubois' },
    { id: 'student-45', name: 'COQUERELLE Tom', email: 'tom.coquerelle@example.com', progress: 0, xp: 5, teacherId: 'M. Dubois' },
    { id: 'student-46', name: 'DE SAINTE MARESVILLE Ewan', email: 'ewan.desaintemaresville@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-47', name: 'DEBEUGNY Lucas', email: 'lucas.debeugny@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-48', name: 'DELATTRE Leo', email: 'leo.delattre@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-49', name: 'DELPIERRE Mathis', email: 'mathis.delpierre@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-50', name: 'DEPLANQUES Valentin', email: 'valentin.deplanques@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-51', name: 'DESCAMPS Anthonin', email: 'anthonin.descamps@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-52', name: 'DUCROCQ Mathis', email: 'mathis.ducrocq@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-53', name: 'DUFOUR Clement', email: 'clement.dufour@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-54', name: 'DUHAMEL Enzo', email: 'enzo.duhamel@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-55', name: 'DUPONT Evan', email: 'evan.dupont@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-56', name: 'FASQUELLE Matheo', email: 'matheo.fasquelle@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-57', name: 'FEUTRELLE Nathan', email: 'nathan.feutrelle@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-58', name: 'FLAMENT Leo', email: 'leo.flament@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-59', name: 'FONTAINE Lucas', email: 'lucas.fontaine@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-60', name: 'FOURDIN Tom', email: 'tom.fourdin@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-61', name: 'FOURNIER Hugo', email: 'hugo.fournier@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-62', name: 'FROIDEVAL Noah', email: 'noah.froideval@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-63', name: 'GALLET Nolan', email: 'nolan.gallet@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-64', name: 'GARBE Nathan', email: 'nathan.garbe@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-65', name: 'Gourdin Aymeric', email: 'aymeric.gourdin@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-66', name: 'Gressier Evan', email: 'evan.gressier@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-67', name: 'GUFFROY Hugo', email: 'hugo.guffroy@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-68', name: 'HERICOURT Mathis', email: 'mathis.hericourt@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-69', name: 'HERMEL Leo', email: 'leo.hermel@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-70', name: 'HERNAULT Evan', email: 'evan.hernault@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-71', name: 'KRASNIQI Florian', email: 'florian.krasniqi@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-72', name: 'LAVOGIEZ Hugo', email: 'hugo.lavogiez@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-73', name: 'LEFEBVRE Axel', email: 'axel.lefebvre@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-74', name: 'LEFEBVRE Noa', email: 'noa.lefebvre@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-75', name: 'LEULLIEUX Hugo', email: 'hugo.leullieux@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-76', name: 'MACRON Leo', email: 'leo.macron@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-77', name: 'Magnier Enzo', email: 'enzo.magnier@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-78', name: 'MAILLARD Axel', email: 'axel.maillard@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-79', name: 'MANIEZ Matheo', email: 'matheo.maniez@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-80', name: 'MARCOTTE Matheo', email: 'matheo.marcotte@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-81', name: 'MERCIER Jeremy', email: 'jeremy.mercier@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-82', name: 'Milliot Erwan', email: 'erwan.milliot@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-83', name: 'MOREL Leo', email: 'leo.morel@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-84', name: 'NOEL Ethan', email: 'ethan.noel@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-85', name: 'PARENT Charles', email: 'charles.parent@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-86', name: 'PERARD Loann', email: 'loann.perard@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-87', name: 'PETIT Maxence', email: 'maxence.petit@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
    { id: 'student-88', name: 'POHIE Nathan', email: 'nathan.pohie@example.com', progress: 0, xp: 0, teacherId: 'M. Dubois' },
];
