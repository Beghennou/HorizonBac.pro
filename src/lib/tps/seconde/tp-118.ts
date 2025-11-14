import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 118,
    duree: '2h30',
    titre: 'Remplacement des Amortisseurs Avant (Jambe de Force)',
    niveau: 'seconde',
    situation: 'Un véhicule présente une mauvaise tenue de route et un pompage excessif après un passage sur un dos d\'âne. Le diagnostic confirme l\'usure des amortisseurs avant, qui doivent être remplacés.',
    objectif: 'Remplacer une paire d\'amortisseurs avant de type MacPherson en utilisant un compresseur de ressort en toute sécurité. (Compétences C1.2, C1.3, C1.1)',
    materiel: ['Amortisseurs neufs', 'Compresseur de ressorts', 'Clé à chocs (recommandée)', 'Clé dynamométrique', 'Outillage de base'],
    etudePrelim: [
        { type: 'text', q: 'Quel est le risque mortel associé à une mauvaise utilisation d\'un compresseur de ressort ?', r: 'Le ressort, une fois comprimé, emmagasine une énergie considérable. S\'il est mal positionné ou si l\'outil cède, il peut se détendre violemment et être projeté, causant des blessures graves ou mortelles.' },
        { type: 'text', q: 'Quels sont les éléments qui composent une jambe de force de type MacPherson ?', r: 'L\'amortisseur, le ressort, la coupelle supérieure (butée de suspension) et le roulement de coupelle.' },
        { type: 'qcm', q: 'Après le remplacement des amortisseurs avant, quelle opération de maintenance est fortement recommandée ?', options: ['Une vidange moteur', 'Un contrôle et réglage de la géométrie du train avant', 'Un nettoyage de l\'habitacle'], r: 'Un contrôle et réglage de la géométrie du train avant' }
    ],
    activitePratique: [
        {
            titre: 'Dépose de la Jambe de Force',
            duree: '45 min',
            etapes: [
                'Lever et sécuriser le véhicule, puis déposer la roue concernée.',
                'Déconnecter la biellette de barre stabilisatrice et le flexible de frein de la jambe de force.',
                'Desserrer les vis de fixation de la jambe de force sur le porte-fusée.',
                'Soutenir le train roulant, puis déposer les vis de fixation supérieures de la coupelle dans le compartiment moteur.',
                'Extraire l\'ensemble de la jambe de force.'
            ]
        },
        {
            titre: 'Désassemblage et Remplacement de l\'Amortisseur',
            duree: '60 min',
            etapes: [
                'Installer la jambe de force dans le compresseur de ressort en respectant les consignes de sécurité.',
                'Comprimer le ressort jusqu\'à ce qu\'il ne soit plus en appui sur la coupelle supérieure.',
                'Desserrer l\'écrou central de l\'amortisseur (souvent avec une clé spéciale).',
                'Déposer la coupelle, le roulement et le ressort.',
                'Transférer les éléments sur le nouvel amortisseur (ou les remplacer si le kit est complet).',
                'Remonter l\'ensemble et resserrer l\'écrou central au couple.'
            ]
        },
        {
            titre: 'Remontage et Finalisation',
            duree: '45 min',
            etapes: [
                'Décompresser lentement le ressort et retirer la jambe de force de l\'outil.',
                'Repositionner la jambe de force sur le véhicule et serrer les vis de la coupelle supérieure.',
                'Remonter la fixation sur le porte-fusée et reconnecter la biellette et le flexible.',
                'Remonter la roue et la serrer au couple.',
                'Répéter l\'opération pour le côté opposé.'
            ]
        }
    ],
    securiteRangement: [
        'Utilisation obligatoire des cages de sécurité avec le compresseur de ressort.',
        'Ne jamais se positionner dans l\'axe du ressort lors de la compression/décompression.',
        'Respecter tous les couples de serrage (roues, coupelles, porte-fusée).',
        'Contrôler la géométrie du train avant après intervention.'
    ],
    pointsCles: [
        'Sécurité absolue lors de l\'utilisation du compresseur de ressort.',
        'Repérage de l\'orientation des pièces avant démontage.',
        'Remplacement systématique des écrous autofreinés.',
        'Contrôle de géométrie post-intervention.'
    ],
    validationRequise: false,
};

export default tp;
