import tp501 from './tp-501';
import tp502 from './tp-502';
import tp601 from './tp-601';
import tp602 from './tp-602';
import tp603 from './tp-603';
import { TP as TP_501 } from './tp-501';
import { TP as TP_502 } from './tp-502';
import { TP as TP_601 } from './tp-601';
import { TP as TP_602 } from './tp-602';
import { TP as TP_603 } from './tp-603';
import { Etape as Etape_501, EtudePrelim as EtudePrelim_501, EtudePrelimQCM as EtudePrelimQCM_501, EtudePrelimText as EtudePrelimText_501 } from './tp-501';

export type TP_CAP_1 = TP_501 | TP_502;
export type TP_CAP_2 = TP_601 | TP_602 | TP_603;

export type Etape_CAP = Etape_501;
export type EtudePrelim_CAP = EtudePrelim_501;
export type EtudePrelimQCM_CAP = EtudePrelimQCM_501;
export type EtudePrelimText_CAP = EtudePrelimText_501;


export const tps = {
    [tp501.id]: tp501,
    [tp502.id]: tp502,
    [tp601.id]: tp601,
    [tp602.id]: tp602,
    [tp603.id]: tp603,
};
