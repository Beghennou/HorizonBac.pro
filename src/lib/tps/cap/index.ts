import tp501 from './tp-501';
import tp502 from './tp-502';
import tp503 from './tp-503';
import tp504 from './tp-504';
import tp505 from './tp-505';
import tp506 from './tp-506';
import tp507 from './tp-507';
import tp601 from './tp-601';
import tp602 from './tp-602';
import tp603 from './tp-603';
import { TP as TP_501 } from './tp-501';
import { TP as TP_502 } from './tp-502';
import { TP as TP_503 } from './tp-503';
import { TP as TP_504 } from './tp-504';
import { TP as TP_505 } from './tp-505';
import { TP as TP_506 } from './tp-506';
import { TP as TP_507 } from './tp-507';
import { TP as TP_601 } from './tp-601';
import { TP as TP_602 } from './tp-602';
import { TP as TP_603 } from './tp-603';
import { Etape as Etape_501, EtudePrelim as EtudePrelim_501, EtudePrelimQCM as EtudePrelimQCM_501, EtudePrelimText as EtudePrelimText_501 } from './tp-501';

export type TP_CAP_1 = TP_501 | TP_502 | TP_503 | TP_504 | TP_505 | TP_506 | TP_507;
export type TP_CAP_2 = TP_601 | TP_602 | TP_603;

export type Etape_CAP = Etape_501;
export type EtudePrelim_CAP = EtudePrelim_501;
export type EtudePrelimQCM_CAP = EtudePrelimQCM_501;
export type EtudePrelimText_CAP = EtudePrelimText_501;


export const tps = {
    [tp501.id]: tp501,
    [tp502.id]: tp502,
    [tp503.id]: tp503,
    [tp504.id]: tp504,
    [tp505.id]: tp505,
    [tp506.id]: tp506,
    [tp507.id]: tp507,
    [tp601.id]: tp601,
    [tp602.id]: tp602,
    [tp603.id]: tp603,
};
