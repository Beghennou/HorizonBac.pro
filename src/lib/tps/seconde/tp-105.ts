
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 105,
    duree: '1h00',
    titre: 'Contrôle des Niveaux et Appoint des Fluides',
    situation: 'Lors d\'une réception véhicule pour un entretien courant, vous devez effectuer les contrôles systématiques des niveaux des différents fluides du compartiment moteur selon la check-list atelier.',
    objectif: 'Identifier les anomalies et réaliser les ajustements. (Compétences C1.1, C1.2, C1.3, C1.4)',
    materiel: ['Liquide de refroidissement spécifié', 'Produit lave-glace concentré', 'Liquide de frein DOT4 ou 5.1', 'Entonnoirs de différentes tailles', 'Chiffons propres non pelucheux'],
    etudePrelim: [
        { type: 'text', q: 'Pourquoi est-il crucial de contrôler les niveaux sur une surface plane ?', r: 'Pour garantir une lecture exacte des niveaux et éviter une fausse interprétation (trop bas ou trop haut).' },
        { type: 'text', q: 'Un niveau de liquide de frein bas peut indiquer quel problème autre qu\'une fuite ?', r: 'Une usure avancée des plaquettes de frein, car les pistons d\'étrier sortent davantage, ce qui fait baisser le niveau dans le bocal.' }
    ],
    activitePratique: [
        etape('Contrôle du système de refroidissement', '20 min', [
            'S\'assurer que le moteur est parfaitement froid avant toute manipulation.',
            'Contrôler le niveau du liquide de refroidissement dans le vase d\'expansion transparent.',
            'Vérifier que le niveau se situe correctement entre les repères MINI et MAXI gravés.',
            'Identifier le type de liquide utilisé par sa couleur et vérifier sa spécification.',
            'Effectuer l\'appoint nécessaire avec le liquide de refroidissement préconisé par le constructeur.',
            'Vérifier visuellement l\'absence de fuite sur les durites, colliers et radiateur.'
        ]),
        etape('Contrôle des circuits de freinage et lave-glace', '25 min', [
            'Contrôler minutieusement le niveau du liquide de frein dans le réservoir maître-cylindre.',
            'ATTENTION: Un niveau bas peut indiquer une usure avancée des plaquettes (anomalie à signaler impérativement).',
            'Examiner attentivement la couleur du liquide de frein (doit être clair, non brunâtre).',
            'Remplir complètement le réservoir de lave-glace avec un produit adapté à la saison.',
            'Tester le bon fonctionnement des gicleurs avant et arrière (si équipé).',
            'Vérifier l\'absence de fuite sur les circuits et la propreté des zones de remplissage.'
        ]),
        etape('Finalisation et restitution au client', '15 min', [
            'Signaler immédiatement au client toute anomalie constatée lors des contrôles.',
            'Expliquer l\'importance vitale de chaque fluide pour la sécurité et la fiabilité.',
            'Conseiller au client une surveillance régulière des niveaux entre les entretiens.',
            'Documenter précisément tous les appoints effectués sur la fiche d\'intervention.',
            'Nettoyer soigneusement le compartment moteur et fermer tous les bouchons.'
        ])
    ],
    securiteRangement: [
        'Effectuer tous les contrôles exclusivement moteur froid',
        'Ne jamais mélanger différents types ou marques de fluides',
        'Porter des gants de protection pour manipuler le liquide de frein (corrosif)',
        'Nettoyer immédiatement toute éclaboussure de liquide de frein sur la peinture'
    ],
    pointsCles: [
        'Tous les niveaux maintenus entre les repères MINI et MAXI',
        'Anomalies détectées et immédiatement signalées',
        'Fluides utilisés conformes aux spécifications constructeur',
        'Traçabilité complète de tous les appoints effectués'
    ],
    validationRequise: false,
};

export default tp;
