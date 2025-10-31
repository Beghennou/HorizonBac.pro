
import type { TP, Etape } from '@/lib/types/tp-types';

const tp: TP = {
    id: 106,
    duree: '1h45',
    titre: 'Contrôle et Remplacement des Ampoules',
    niveau: 'seconde',
    situation: 'Un client a été alerté par les forces de l\'ordre d\'un feu stop défectueux. Il demande un contrôle complet de l\'éclairage et le remplacement de toutes les ampoules nécessaires.',
    objectif: 'Identifier et remplacer les ampoules défectueuses. (Compétences C1.1, C1.2, C1.3)',
    materiel: ['Jeu d\'ampoules de rechange variées', 'Tournevis adaptés', 'Chiffon microfibre propre', 'Gants de protection', 'Assistant pour les tests'],
    etudePrelim: [
        { type: 'text', q: 'Pourquoi ne faut-il jamais toucher le verre d\'une ampoule halogène (H4, H7...) avec les doigts ?', r: 'La graisse des doigts crée un point chaud sur le verre, qui peut faire éclater l\'ampoule lorsqu\'elle chauffe.' },
        { type: 'text', q: 'Comment identifier le type exact d\'une ampoule défectueuse ?', r: 'En lisant les inscriptions gravées sur son culot (ex: P21W, H7 55W).' }
    ],
    activitePratique: [
        {
            titre: 'Contrôle systématique complet de l\'éclairage',
            duree: '30 min',
            etapes: [
                'Avec l\'aide d\'une deuxième personne ou d\'un miroir, tester méthodiquement toutes les fonctions d\'éclairage.',
                'Vérifier le bon fonctionnement des veilleuses avant et arrière.',
                'Contrôler les feux de croisement et les feux de route (commutation correcte).',
                'Tester les clignotants avant, arrière et répétiteurs latéraux des deux côtés.',
                'Vérifier tous les feux stop (y compris le 3ème feu stop central).',
                'Contrôler le feu de recul et les feux antibrouillard avant/arrière.',
                'Noter précisément toutes les ampoules défectueuses sur une fiche de contrôle.'
            ]
        },
        {
            titre: 'Remplacement d\'une ampoule de signalisation arrière',
            duree: '40 min',
            etapes: [
                'Accéder au bloc optique arrière (généralement par l\'intérieur du coffre).',
                'Identifier et déconnecter le porte-ampoules en le tournant ou en le déclipsant selon le système.',
                'Identifier précisément le type d\'ampoule défectueuse (exemple: P21/5W pour feu stop/veilleuse).',
                'Remplacer l\'ampoule en vérifiant le bon positionnement des ergots de guidage.',
                'Vérifier que la nouvelle ampoule fonctionne correctement avant le remontage complet.',
                'Remonter le porte-ampoules et re-tester l\'ensemble des fonctions.'
            ]
        },
        {
            titre: 'Remplacement d\'une ampoule de phare avant (type H7)',
            duree: '35 min',
            etapes: [
                'Accéder à l\'arrière du projecteur en retirant le cache étanche en caoutchouc.',
                'Débrancher délicatement le connecteur électrique de l\'ampoule défectueuse.',
                'Dégrafer l\'ampoule en actionnant le ressort de maintien métallique.',
                'Installer la nouvelle ampoule H7 en utilisant un chiffon propre, SANS jamais toucher le verre.',
                'Vérifier le bon positionnement de l\'ampoule dans son logement.',
                'Remettre l\'agrafe de maintien, reconnecter le connecteur électrique et remonter le cache étanche.',
                'Tester immédiatement le fonctionnement de l\'éclairage avant finalisation.'
            ]
        }
    ],
    securiteRangement: [
        'Ne jamais toucher le verre des ampoules halogènes avec les doigts (risque de surchauffe)',
        'Utiliser systématiquement des gants propres ou un chiffon non pelucheux',
        'Vérifier impérativement la conformité de la nouvelle ampoule (type, puissance)',
        'Éliminer les anciennes ampoules selon la réglementation (recyclage spécialisé)'
    ],
    pointsCles: [
        'Contrôle exhaustif de toutes les fonctions d\'éclairage',
        'Remplacement correct sans contamination du verre',
        'Test systématique de chaque fonction après intervention',
        'Documentation complète des ampoules remplacées'
    ],
    validationRequise: false,
};

export default tp;
