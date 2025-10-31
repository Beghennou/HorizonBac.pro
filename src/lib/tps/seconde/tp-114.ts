
import type { TP, Etape } from '@/lib/types/tp-types';

function etape(titre: string, duree: string, etapes: string[]): Etape {
  return { titre, duree, etapes };
}

const tp: TP = {
    id: 114,
    duree: '2h00',
    titre: 'Remplacement Plaquettes et Disques de Frein Arrière',
    situation: 'Lors d\'une visite d\'entretien, vous constatez que les freins arrière à disques sont usés. Le frein de stationnement est un modèle électrique intégré à l\'étrier. Le client valide le remplacement.',
    objectif: 'Remplacer les plaquettes et disques arrière en utilisant l\'outil de diagnostic pour gérer le frein de stationnement électrique (EPB). (Compétences C1.2, C1.3, C1.1)',
    materiel: ['Valise de diagnostic', 'Repousse-piston (pneumatique ou manuel)', 'Jeu de plaquettes et disques neufs', 'Nettoyant frein', 'Clé dynamométrique'],
    etudePrelim: [
        { type: 'text', q: 'Quelle est l\'étape indispensable à réaliser avec l\'outil de diagnostic avant toute intervention sur un étrier avec frein de stationnement électrique (EPB) ?', r: 'Mettre le système en "mode maintenance" ou "mode atelier". Cela rétracte complètement le moteur électrique et le piston pour permettre le remplacement.' },
        { type: 'text', q: 'Pourquoi ne faut-il jamais essayer de repousser manuellement le piston d\'un étrier EPB sans passer par le mode maintenance ?', r: 'Forcer le piston endommagerait irréversiblement le mécanisme interne du moteur électrique, ce qui obligerait à remplacer l\'étrier complet.' },
        { type: 'qcm', q: 'Après le remontage, quelle est la dernière étape à réaliser avec la valise de diagnostic ?', options: ['Effacer tous les codes défauts du véhicule', 'Sortir du mode maintenance et ré-initialiser le système', 'Vérifier la pression des pneus'], r: 'Sortir du mode maintenance et ré-initialiser le système' },
        { type: 'text', q: 'Le repousse-piston pour un étrier arrière a souvent une fonction rotative en plus de la poussée. Pourquoi ?', r: 'Sur de nombreux systèmes, le piston doit être tourné en même temps qu\'il est repoussé pour suivre le filetage du mécanisme de rattrapage de jeu du frein à main (même pour les systèmes non électriques).' },
        { type: 'text', q: 'Un disque de frein arrière intègre souvent la piste pour le roulement de roue. Quelle précaution supplémentaire cela impose-t-il lors du remplacement ?', r: 'Il faut s\'assurer de transférer le roulement ou d\'en installer un neuf avec précaution, en respectant le couple de serrage de l\'écrou central, qui est crucial pour la sécurité.' }
    ],
    activitePratique: [
        etape('Mise en Mode Maintenance', '20 min', [
            'Brancher la valise de diagnostic et identifier le véhicule.',
            'Naviguer dans le calculateur de freinage pour trouver la fonction "Mode Maintenance EPB".',
            'Activer le mode maintenance et attendre la confirmation de la rétraction des pistons.',
            'Mettre le véhicule sur pont et déposer les roues arrière.'
        ]),
        etape('Dépose et Nettoyage', '40 min', [
            'Déposer l\'étrier de frein (sans débrancher le connecteur électrique si possible) et le suspendre.',
            'Retirer les plaquettes et le disque usés.',
            'Nettoyer et inspecter le moyeu et le support d\'étrier.',
            'Vérifier l\'état des colonnettes et du soufflet de piston.'
        ]),
        etape('Remontage et Serrage', '40 min', [
            'Installer le disque neuf.',
            'Installer les nouvelles plaquettes.',
            'Remonter l\'étrier et serrer les vis de fixation au couple préconisé.',
            'Remonter les roues et les serrer au couple.'
        ]),
        etape('Sortie du Mode Maintenance et Validation', '20 min', [
            'Redescendre le véhicule.',
            'Avec la valise de diagnostic, sortir du mode maintenance et lancer la procédure de calibrage.',
            'Actionner plusieurs fois le frein de service et le frein de stationnement.',
            'Vérifier l\'absence de code défaut et effectuer un essai routier.'
        ])
    ],
    securiteRangement: [
        'Ne jamais intervenir sur un système EPB sans l\'outil de diagnostic adapté.',
        'Suivre scrupuleusement la procédure constructeur pour le mode maintenance.',
        'Porter des EPI (gants, lunettes).',
        'Respecter les couples de serrage.'
    ],
    pointsCles: [
        'Utilisation impérative de l\'outil de diagnostic pour l\'EPB.',
        'Procédure en 3 temps : Entrée en maintenance / Remplacement / Sortie de maintenance.',
        'Propreté du moyeu et inspection des colonnettes.',
        'Serrage au couple et essai fonctionnel indispensables.'
    ],
    validationRequise: false,
};

export default tp;
