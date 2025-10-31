
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 101,
    duree: '2h00',
    titre: 'Sécurité et Organisation du Poste de Travail',
    situation: 'Un nouveau mécanicien intègre l\'équipe. Avant sa première intervention, le chef d\'atelier lui demande de préparer son poste et de réviser les règles de sécurité fondamentales.',
    objectif: 'Organiser son espace de travail de manière sûre et efficace, en identifiant les risques et en utilisant les Équipements de Protection Individuelle (EPI). (Compétences C1.1, C1.4)',
    materiel: ['Bleu de travail', 'Chaussures de sécurité', 'Lunettes de protection', 'Gants', 'Chariot à outils', 'Extincteur (localisation)', 'Zone de tri des déchets'],
    etudePrelim: [
        { type: 'text', q: 'Quels sont les 3 EPI (Équipements de Protection Individuelle) obligatoires en permanence dans l\'atelier ?', r: 'Chaussures de sécurité, bleu de travail, lunettes de protection.' },
        { type: 'text', q: 'Décrivez la procédure à suivre en cas de déversement d\'huile sur le sol.', r: 'Signaler la zone, utiliser de l\'absorbant pour contenir et nettoyer, puis jeter l\'absorbant souillé dans le bac dédié.' }
    ],
    activitePratique: [
        etape('Préparation et organisation de la zone', '30 min', [
            'Vérifier la propreté et l\'éclairage du poste de travail.',
            'Localiser les issues de secours et les équipements de première urgence (douche, lavage oculaire).',
            'S\'équiper avec les EPI obligatoires (bleu de travail, chaussures de sécurité, lunettes).',
            'Organiser le chariot à outils de façon méthodique.',
            'Identifier et repérer les différents bacs de tri sélectif.'
        ]),
        etape('Simulation d\'intervention type', '45 min', [
            'Préparer et organiser les outils nécessaires selon l\'intervention simulée.',
            'Mettre en place les protections pour le véhicule (housse de siège, tapis de protection).',
            'Adopter les bonnes postures de travail pour éviter les TMS.',
            'Identifier les bacs de tri pour les futurs déchets (huiles usagées, filtres, chiffons souillés).',
            'Vérifier l\'état et la disponibilité des équipements de protection.'
        ]),
        etape('Simulation d\'incident et procédures d\'urgence', '30 min', [
            'Simuler un départ de feu et expliquer la procédure PASS (Pointer, Appuyer, Secouer, Suivre).',
            'Simuler un déversement d\'huile et utiliser correctement l\'absorbant à disposition.',
            'Exercice d\'évacuation de l\'atelier en cas d\'urgence.',
            'Localiser et tester les équipements de lavage d\'urgence (douche, rince-œil).',
            'Simuler la procédure d\'alerte des secours.'
        ]),
        etape('Évaluation et finalisation', '15 min', [
            'Vérifier le bon rangement du poste de travail.',
            'Contrôler le tri des déchets effectué durant l\'exercice.',
            'Valider la conformité de la zone avec les standards de sécurité.',
            'Compléter la fiche de contrôle sécurité du poste.'
        ])
    ],
    securiteRangement: [
        'Port des EPI obligatoire en permanence',
        'Tri sélectif des déchets respecté selon la réglementation',
        'Zone de travail maintenue dégagée et propre',
        'Connaissance parfaite de l\'emplacement des équipements de sécurité'
    ],
    pointsCles: [
        'Organisation méthodique du poste de travail',
        'Respect strict des consignes de sécurité',
        'Utilisation correcte et systématique des EPI',
        'Gestion écologique et réglementaire des déchets'
    ],
    validationRequise: false,
};

export default tp;
