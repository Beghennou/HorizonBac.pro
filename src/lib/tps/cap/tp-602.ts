
import type { TP } from './tp-501';

function etape(titre: string, duree: string, etapes: string[]): any {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 602,
    duree: '1h30',
    titre: 'CAP • Diagnostic Simple : Feux Stop',
    situation: 'Un client signale que ses feux stop ne fonctionnent plus. Vous devez réaliser un diagnostic de premier niveau.',
    objectif: 'Identifier la cause d\'une panne simple sur le circuit d\'éclairage. (Compétence C2.5)',
    materiel: ['Multimètre', 'Jeu d\'ampoules neuves', 'Jeu de fusibles'],
    etudePrelim: [
        { type: 'text', q: 'Quels sont les trois éléments à contrôler en premier en cas de panne sur un circuit d\'éclairage ?', r: '1. Les ampoules. 2. Le fusible. 3. Le contacteur (ici, contacteur de pédale de frein).' }
    ],
    activitePratique: [
        etape('Contrôle des fusibles et ampoules', '20 min', ['Identifier et contrôler le fusible des feux stop.', 'Inspecter visuellement les ampoules de feux stop.']),
        etape('Contrôle du contacteur', '30 min', ['Localiser le contacteur sur le pédalier.', 'Tester son fonctionnement électrique avec un multimètre (continuité).']),
        etape('Conclusion', '10 min', ['Déterminer l\'élément défaillant et proposer la réparation.'])
    ],
    securiteRangement: ['Couper le contact avant de manipuler les fusibles.', 'Utiliser des ampoules de puissance identique.'],
    pointsCles: ['Méthodologie de diagnostic (simple vers complexe)'],
    validationRequise: false,
};

export default tp;
