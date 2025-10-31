
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 110,
    duree: '1h00',
    titre: 'Contrôle et Remplacement du Filtre à Air',
    situation: 'Lors d\'un entretien, vous devez vérifier l\'état du filtre à air et le remplacer si nécessaire pour garantir une bonne respiration du moteur.',
    objectif: 'Évaluer l\'état du filtre à air et le remplacer si besoin. (Compétences C1.2, C1.3, C1.4)',
    materiel: ['Filtre à air neuf', 'Soufflette (optionnel, pour nettoyage boîtier)', 'Tournevis ou clés adaptés'],
    etudePrelim: [
        { type: 'qcm', q: 'Un filtre à air très encrassé peut provoquer :', options: ['Une surconsommation de carburant', 'Une augmentation de la puissance', 'Un meilleur refroidissement'], r: 'Une surconsommation de carburant' },
        { type: 'text', q: 'Peut-on nettoyer un filtre à air en papier avec une soufflette ? Pourquoi ?', r: 'Non, car l\'air comprimé endommage la structure du papier, créant des micro-déchirures qui laissent passer les poussières et annulent son pouvoir de filtration.' }
    ],
    activitePratique: [
        etape('Diagnostic', '20 min', [
            'Localiser le boîtier du filtre à air.',
            'Ouvrir le boîtier et extraire le filtre.',
            'Inspecter le filtre à la lumière : vérifier son encrassement et l\'absence de déchirure.'
        ]),
        etape('Intervention', '25 min', [
            'Nettoyer l\'intérieur du boîtier avec un chiffon ou une soufflette (vers l\'extérieur).',
            'Insérer le nouveau filtre en respectant son sens de montage.',
            'Refermer et visser correctement le couvercle du boîtier.'
        ]),
        etape('Conseil Client', '15 min', [
            'Montrer l\'ancien filtre au client pour justifier le remplacement.',
            'Expliquer l\'impact d\'un filtre encrassé sur la consommation et la performance.',
            'Noter l\'intervention sur la fiche de suivi du véhicule.'
        ])
    ],
    securiteRangement: [
        'S\'assurer de la parfaite étanchéité du boîtier après intervention',
        'Ne pas souffler d\'air comprimé à travers le filtre pour le "nettoyer"',
        'Jeter l\'ancien filtre dans le bac des déchets non recyclables'
    ],
    pointsCles: [
        'Diagnostic visuel fiable de l\'encrassement',
        'Bon positionnement du filtre neuf',
        'Justification du remplacement auprès du client'
    ],
    validationRequise: false,
};

export default tp;
