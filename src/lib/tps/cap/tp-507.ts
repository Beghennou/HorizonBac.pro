
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 507,
    duree: '1h00',
    titre: "CAP 1ère Année • Contrôle et Remplacement d'une Batterie",
    situation: "Un client se plaint de difficultés de démarrage le matin. Vous devez contrôler la batterie et la remplacer si le diagnostic le confirme.",
    objectif: "Diagnostiquer l'état d'une batterie et la remplacer en toute sécurité. (Compétences C1.2, C1.3)",
    materiel: ['Multimètre', 'Testeur de batterie', 'Jeu de clés', 'Graisse pour cosses', 'Batterie neuve'],
    etudePrelim: [
        { type: 'qcm', q: 'Dans quel ordre faut-il débrancher les cosses de la batterie pour éviter un court-circuit ?', options: ['D\'abord la cosse Positive (+)', 'D\'abord la cosse Négative (-)', 'Peu importe l\'ordre'], r: 'D\'abord la cosse Négative (-)' },
        { type: 'text', q: 'Quelle tension minimale doit avoir une batterie en bon état, moteur coupé ?', r: 'Elle doit être supérieure à 12.4 Volts.' }
    ],
    activitePratique: [
        etape('Diagnostic de la Batterie', '20 min', [
            'Inspecter visuellement la batterie (propreté, absence de fuite).',
            'Mesurer la tension à vide avec un multimètre.',
            'Effectuer un test complet avec le testeur de batterie (état de santé et de charge).'
        ]),
        etape('Remplacement de la Batterie', '25 min', [
            'Débrancher la cosse négative (-), puis la cosse positive (+).',
            'Déposer le système de fixation et retirer l\'ancienne batterie.',
            'Nettoyer les cosses et le support de batterie.',
            'Installer la nouvelle batterie, la fixer.',
            'Brancher la cosse positive (+), puis la cosse négative (-).',
            'Graisser les cosses pour les protéger de la corrosion.'
        ]),
        etape('Validation', '15 min', [
            'Démarrer le véhicule.',
            'Contrôler la tension de charge de l\'alternateur (entre 13.5V et 14.8V).'
        ])
    ],
    securiteRangement: [
        'Porter des gants et des lunettes de protection.',
        'Respecter l\'ordre de débranchement/rebranchement des cosses.',
        'Stocker l\'ancienne batterie dans la zone de recyclage dédiée.'
    ],
    pointsCles: [
        'Test de santé avec un testeur dédié',
        'Ordre de déconnexion : Négatif en premier',
        'Ordre de connexion : Positif en premier',
        'Serrage ferme des cosses et de la fixation'
    ],
    validationRequise: false,
};

export default tp;
