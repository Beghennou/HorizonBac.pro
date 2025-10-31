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
import type { TP as TP_CAP_1, Etape as Etape_CAP, EtudePrelim as EtudePrelim_CAP, EtudePrelimQCM as EtudePrelimQCM_CAP, EtudePrelimText as EtudePrelimText_CAP } from '@/lib/types/tp-types';
import type { TP as TP_CAP_2 } from '@/lib/types/tp-types';

export type { TP_CAP_1, TP_CAP_2, Etape_CAP, EtudePrelim_CAP, EtudePrelimQCM_CAP, EtudePrelimText_CAP };

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
