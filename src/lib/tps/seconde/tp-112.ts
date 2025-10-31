
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 112,
    duree: '1h15',
    titre: 'BAC PRO Seconde • Contrôle et Remplacement d\'une Batterie',
    situation: 'Un client se plaint de difficultés de démarrage le matin. Vous devez contrôler la batterie et la remplacer si le diagnostic le confirme.',
    objectif: 'Diagnostiquer l\'état d\'une batterie, la remplacer en toute sécurité et initialiser le nouveau composant si nécessaire. (Compétence C1.2, C1.3)',
    materiel: ['Multimètre', 'Testeur de batterie', 'Jeu de clés', 'Graisse pour cosses', 'Sauvegarde mémoire (si nécessaire)', 'Batterie neuve'],
    etudePrelim: [
        { type: 'qcm', q: 'Dans quel ordre faut-il débrancher les cosses de la batterie pour éviter un court-circuit ?', options: ['D\'abord la cosse Positive (+)', 'D\'abord la cosse Négative (-)', 'Peu importe l\'ordre'], r: 'D\'abord la cosse Négative (-)' },
        { type: 'text', q: 'Qu\'est-ce que le test "CCA" (Cold Cranking Amps) effectué par un testeur de batterie ?', r: 'C\'est une mesure de la capacité de la batterie à fournir un courant élevé au démarrage, à froid. C\'est un indicateur clé de son état de santé.' },
        { type: 'text', q: 'Pourquoi peut-il être nécessaire d\'utiliser un appareil de sauvegarde mémoire avant de débrancher la batterie sur un véhicule moderne ?', r: 'Pour éviter de perdre les données des calculateurs (autoradio, horloge, adaptations moteur, initialisation de vitres électriques, etc.).' }
    ],
    activitePratique: [
        etape('Diagnostic de la Batterie', '25 min', [
            'Inspecter visuellement la batterie (propreté, absence de fuite, date).',
            'Mesurer la tension à vide avec un multimètre (doit être > 12.4V).',
            'Effectuer un test complet avec le testeur de batterie (état de santé et état de charge).',
            'Contrôler la bonne fixation de la batterie et des cosses.'
        ]),
        etape('Remplacement de la Batterie', '30 min', [
            'Brancher une sauvegarde mémoire si nécessaire.',
            'Débrancher la cosse négative (-), puis la cosse positive (+).',
            'Déposer le système de fixation et retirer l\'ancienne batterie.',
            'Nettoyer les cosses et le support de batterie.',
            'Installer la nouvelle batterie, la fixer correctement.',
            'Brancher la cosse positive (+), puis la cosse négative (-).',
            'Graisser les cosses pour les protéger de la corrosion.'
        ]),
        etape('Initialisation et Validation', '20 min', [
            'Débrancher la sauvegarde mémoire.',
            'Effectuer les réinitialisations nécessaires (horloge, vitres électriques...) selon la procédure constructeur.',
            'Démarrer le véhicule et contrôler la tension de charge de l\'alternateur (entre 13.5V et 14.8V).'
        ])
    ],
    securiteRangement: [
        'Porter des gants et des lunettes de protection.',
        'Respecter l\'ordre de débranchement/rebranchement des cosses.',
        'Manipuler la batterie avec précaution (lourde et contient de l\'acide).',
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
